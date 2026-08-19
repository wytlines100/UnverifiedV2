// ==UserScript==
// @name         UnverifiedV2 Music Player
// @namespace    http://tampermonkey.net/
// @version      1.4.0
// @description  Compact Music Player with track, artist, live time, collapsible favorites, viewport clamping, and fast loading
// @author       TheM1ddleM1n
// @match        https://miniblox.io/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const FAVORITES_KEY = 'uv2ytlmp-favorites';
  const OEMBED_CACHE_KEY = 'uv2ytlmp-oembed-cache';
  const OEMBED_CACHE_LIMIT = 200;

  function loadFavorites() {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(list) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(list));
  }

  function loadOEmbedCache() {
    try {
      return JSON.parse(localStorage.getItem(OEMBED_CACHE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function scheduleIdle(callback) {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(callback);
    } else {
      setTimeout(callback, 0);
    }
  }

  function saveOEmbedCache(cache) {
    scheduleIdle(() => {
      const keys = Object.keys(cache);
      if (keys.length > OEMBED_CACHE_LIMIT) {
        const excess = keys.length - OEMBED_CACHE_LIMIT;
        keys.slice(0, excess).forEach(k => delete cache[k]);
      }
      localStorage.setItem(OEMBED_CACHE_KEY, JSON.stringify(cache));
    });
  }

  let oEmbedCache = loadOEmbedCache();

  function extractVideoId(url) {
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
      /(?:youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/embed\/)([\w-]{11})/,
      /(?:youtube\.com\/shorts\/)([\w-]{11})/
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  function hashStringToHue(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash) % 360;
  }

  function colorForVideo(id) {
    const hue = hashStringToHue(id);
    return {
      primary: `hsl(${hue}, 78%, 58%)`
    };
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  function addPreconnect(href) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = href;
    document.head.appendChild(link);
  }

  function addPreload(href, as) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  }

  addPreconnect('https://www.youtube.com');
  addPreconnect('https://i.ytimg.com');
  addPreload('https://www.youtube.com/iframe_api', 'script');

  const icons = {
    play: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
    next: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M16 6h2v12h-2zM6 6l8.5 6L6 18z"/></svg>',
    repeatOff: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z"/></svg>',
    repeatOn: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2zM12 9.5v5l3.5-2.5z"/></svg>',
    heartOutline: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 21s-7-4.6-9.5-8.5C.7 9.3 2 5.5 6 5c2.2-.3 3.8 1 6 3.2C14.2 6 15.8 4.7 18 5c4 .5 5.3 4.3 3.5 7.5C19 16.4 12 21 12 21z"/></svg>',
    heartFilled: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 21s-7-4.6-9.5-8.5C.7 9.3 2 5.5 6 5c2.2-.3 3.8 1 6 3.2C14.2 6 15.8 4.7 18 5c4 .5 5.3 4.3 3.5 7.5C19 16.4 12 21 12 21z"/></svg>',
    load: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 13v6H5v-6H3v8h18v-8zm-8-11v13.17l-4.59-4.58L5 12l7 7 7-7-1.41-1.41L13 15.17V2z"/></svg>',
    list: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>',
    musicNote: '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/></svg>'
  };

  const style = document.createElement('style');
  style.textContent = `
    #uv2ytc-root {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 390px;
      background: #0a0a0a;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      box-shadow: 0 8px 28px rgba(0,0,0,0.55);
      font-family: 'Segoe UI', sans-serif;
      color: #fff;
      z-index: 99999;
      overflow: hidden;
      user-select: none;
    }
    #uv2ytc-bar {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 16px;
      cursor: move;
    }
    #uv2ytc-ytmount {
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
      overflow: hidden;
    }
    #uv2ytc-thumbwrap {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #161616;
      flex-shrink: 0;
      box-shadow: 0 0 12px var(--uv2ytc-glow, rgba(231,76,60,0.4));
      transition: box-shadow 0.4s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    #uv2ytc-thumb {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: none;
    }
    #uv2ytc-thumbicon {
      color: #444;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #uv2ytc-info {
      flex: 1;
      min-width: 0;
    }
    #uv2ytc-title {
      font-size: 17px;
      font-weight: 700;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: var(--uv2ytc-primary, #fff);
    }
    #uv2ytc-meta {
      display: flex;
      align-items: baseline;
      gap: 7px;
      margin-top: 2px;
    }
    #uv2ytc-artist {
      font-size: 13px;
      color: #999;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 140px;
    }
    #uv2ytc-timelabel {
      font-size: 12px;
      color: #555;
      flex-shrink: 0;
    }
    #uv2ytc-controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    #uv2ytc-controls button {
      background: none;
      border: none;
      color: #999;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      transition: color 0.15s ease, transform 0.15s ease;
    }
    #uv2ytc-controls button:hover {
      color: var(--uv2ytc-primary, #fff);
      transform: scale(1.1);
    }
    #uv2ytc-playbtn {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      background: var(--uv2ytc-primary, #e74c3c);
      color: #000 !important;
    }
    #uv2ytc-playbtn:hover {
      color: #000 !important;
      transform: scale(1.06);
    }
    #uv2ytc-repeatbtn.active, #uv2ytc-favbtn.active, #uv2ytc-listbtn.active {
      color: var(--uv2ytc-primary, #e74c3c);
    }
    #uv2ytc-progressbar {
      width: 100%;
      height: 4px;
      background: #1a1a1a;
      cursor: pointer;
    }
    #uv2ytc-progressfill {
      height: 100%;
      width: 0%;
      background: var(--uv2ytc-primary, #e74c3c);
    }
    #uv2ytc-urlwrap {
      display: flex;
      gap: 0;
      padding: 10px 12px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    #uv2ytc-urlinput {
      flex: 1;
      background: #161616;
      border: 1px solid rgba(255,255,255,0.07);
      color: #ccc;
      padding: 8px 10px;
      font-size: 12px;
      border-radius: 6px 0 0 6px;
      outline: none;
    }
    #uv2ytc-loadbtn {
      background: var(--uv2ytc-primary, #e74c3c);
      color: #000;
      border: none;
      padding: 8px 12px;
      border-radius: 0 6px 6px 0;
      cursor: pointer;
      display: flex;
      align-items: center;
    }
    #uv2ytc-favlist {
      max-height: 0;
      overflow-y: auto;
      transition: max-height 0.2s ease;
      border-top: 1px solid transparent;
    }
    #uv2ytc-favlist.open {
      max-height: 180px;
      border-top: 1px solid rgba(255,255,255,0.06);
    }
    #uv2ytc-favlist::-webkit-scrollbar {
      width: 3px;
    }
    #uv2ytc-favlist::-webkit-scrollbar-thumb {
      background: var(--uv2ytc-primary, #e74c3c);
    }
    .uv2ytc-favrow {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      cursor: pointer;
      border-bottom: 1px solid #141414;
    }
    .uv2ytc-favrow:hover {
      background: #131313;
    }
    .uv2ytc-favrow img {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      object-fit: cover;
      background: #1a1a1a;
      flex-shrink: 0;
    }
    .uv2ytc-favrow-text {
      flex: 1;
      min-width: 0;
    }
    .uv2ytc-favrow-name {
      font-size: 12.5px;
      color: #ddd;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .uv2ytc-favrow-remove {
      color: #444;
      flex-shrink: 0;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 13px;
    }
    .uv2ytc-favrow-remove:hover {
      color: #e74c3c;
    }
    #uv2ytc-msg {
      padding: 13px;
      text-align: center;
      font-size: 11px;
      color: #444;
    }
  `;
  document.head.appendChild(style);

  const root = document.createElement('div');
  root.id = 'uv2ytc-root';
  root.innerHTML = `
    <div id="uv2ytc-ytmount"></div>
    <div id="uv2ytc-bar">
      <div id="uv2ytc-thumbwrap">
        <img id="uv2ytc-thumb" src="" alt="" fetchpriority="high" loading="eager" />
        <div id="uv2ytc-thumbicon">${icons.musicNote}</div>
      </div>
      <div id="uv2ytc-info">
        <div id="uv2ytc-title">nothing loaded</div>
        <div id="uv2ytc-meta">
          <span id="uv2ytc-artist">paste a link below</span>
          <span id="uv2ytc-timelabel">0:00 / 0:00</span>
        </div>
      </div>
      <div id="uv2ytc-controls">
        <button id="uv2ytc-repeatbtn" title="repeat">${icons.repeatOff}</button>
        <button id="uv2ytc-playbtn" title="play">${icons.play}</button>
        <button id="uv2ytc-favbtn" title="favorite">${icons.heartOutline}</button>
        <button id="uv2ytc-listbtn" title="favorites list">${icons.list}</button>
      </div>
    </div>
    <div id="uv2ytc-progressbar">
      <div id="uv2ytc-progressfill"></div>
    </div>
    <div id="uv2ytc-urlwrap">
      <input id="uv2ytc-urlinput" type="text" placeholder="paste youtube link..." autocomplete="off" spellcheck="false" />
      <button id="uv2ytc-loadbtn">${icons.load}</button>
    </div>
    <div id="uv2ytc-favlist"><div id="uv2ytc-msg">no favorites yet</div></div>
  `;
  document.body.appendChild(root);

  const els = {
    mount: root.querySelector('#uv2ytc-ytmount'),
    bar: root.querySelector('#uv2ytc-bar'),
    thumb: root.querySelector('#uv2ytc-thumb'),
    thumbIcon: root.querySelector('#uv2ytc-thumbicon'),
    title: root.querySelector('#uv2ytc-title'),
    artist: root.querySelector('#uv2ytc-artist'),
    timeLabel: root.querySelector('#uv2ytc-timelabel'),
    progressBar: root.querySelector('#uv2ytc-progressbar'),
    progressFill: root.querySelector('#uv2ytc-progressfill'),
    playBtn: root.querySelector('#uv2ytc-playbtn'),
    repeatBtn: root.querySelector('#uv2ytc-repeatbtn'),
    favBtn: root.querySelector('#uv2ytc-favbtn'),
    listBtn: root.querySelector('#uv2ytc-listbtn'),
    urlInput: root.querySelector('#uv2ytc-urlinput'),
    loadBtn: root.querySelector('#uv2ytc-loadbtn'),
    favList: root.querySelector('#uv2ytc-favlist')
  };

  let player = null;
  let playerReady = false;
  let pendingVideoId = null;
  let currentVideoId = null;
  let currentTitle = '';
  let currentArtist = '';
  let isPlaying = false;
  let repeatOn = false;
  let favorites = loadFavorites();
  let timeInterval = null;
  let lastTimeText = '';
  let lastProgressPct = -1;
  let favListOpen = false;

  function setAccentColor(id) {
    const c = colorForVideo(id);
    root.style.setProperty('--uv2ytc-primary', c.primary);
    root.style.setProperty('--uv2ytc-glow', c.primary);
  }

  function updateFavButton() {
    const isFav = favorites.some(f => f.id === currentVideoId);
    els.favBtn.classList.toggle('active', isFav);
    els.favBtn.innerHTML = isFav ? icons.heartFilled : icons.heartOutline;
  }

  function renderFavorites() {
    if (!favorites.length) {
      els.favList.innerHTML = '<div id="uv2ytc-msg">no favorites yet</div>';
      return;
    }
    els.favList.innerHTML = '';
    const fragment = document.createDocumentFragment();
    favorites.forEach(fav => {
      const row = document.createElement('div');
      row.className = 'uv2ytc-favrow';
      row.innerHTML = `
        <img src="https://i.ytimg.com/vi/${fav.id}/default.jpg" alt="" loading="lazy" />
        <div class="uv2ytc-favrow-text">
          <div class="uv2ytc-favrow-name">${fav.title}</div>
        </div>
        <button class="uv2ytc-favrow-remove" title="remove">&#x2715;</button>
      `;
      row.addEventListener('click', e => {
        if (e.target.closest('.uv2ytc-favrow-remove')) return;
        loadVideoById(fav.id, fav.title, fav.artist);
      });
      row.querySelector('.uv2ytc-favrow-remove').addEventListener('click', () => {
        favorites = favorites.filter(f => f.id !== fav.id);
        saveFavorites(favorites);
        renderFavorites();
        updateFavButton();
      });
      fragment.appendChild(row);
    });
    els.favList.appendChild(fragment);
  }

  function toggleFavorite() {
    if (!currentVideoId) return;
    const exists = favorites.some(f => f.id === currentVideoId);
    if (exists) {
      favorites = favorites.filter(f => f.id !== currentVideoId);
    } else {
      favorites.push({ id: currentVideoId, title: currentTitle, artist: currentArtist });
    }
    saveFavorites(favorites);
    updateFavButton();
    if (favListOpen) renderFavorites();
  }

  function toggleFavList() {
    favListOpen = !favListOpen;
    els.favList.classList.toggle('open', favListOpen);
    els.listBtn.classList.toggle('active', favListOpen);
    if (favListOpen) renderFavorites();
  }

  function tickTime() {
    if (!player || !player.getCurrentTime) return;
    const current = player.getCurrentTime();
    const total = player.getDuration();
    const timeText = `${formatTime(current)} / ${formatTime(total)}`;
    if (timeText !== lastTimeText) {
      els.timeLabel.textContent = timeText;
      lastTimeText = timeText;
    }
    const pct = total > 0 ? (current / total) * 100 : 0;
    const roundedPct = Math.round(pct * 10) / 10;
    if (roundedPct !== lastProgressPct) {
      els.progressFill.style.width = roundedPct + '%';
      lastProgressPct = roundedPct;
    }
  }

  function startTimeTracking() {
    stopTimeTracking();
    timeInterval = setInterval(tickTime, 1000);
  }

  function stopTimeTracking() {
    if (timeInterval) {
      clearInterval(timeInterval);
      timeInterval = null;
    }
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopTimeTracking();
    } else if (isPlaying) {
      startTimeTracking();
    }
  });

  function updateNowPlaying(id, title, artist) {
    currentVideoId = id;
    currentTitle = title;
    currentArtist = artist || 'unknown artist';
    els.title.textContent = title;
    els.artist.textContent = currentArtist;
    els.thumb.src = `https://i.ytimg.com/vi/${id}/default.jpg`;
    els.thumb.style.display = 'block';
    els.thumbIcon.style.display = 'none';
    els.timeLabel.textContent = '0:00 / 0:00';
    els.progressFill.style.width = '0%';
    lastTimeText = '0:00 / 0:00';
    lastProgressPct = 0;
    setAccentColor(id);
    updateFavButton();
  }

  function fetchOEmbed(id, callback) {
    if (oEmbedCache[id]) {
      callback(oEmbedCache[id].title, oEmbedCache[id].author);
      return;
    }
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
      .then(r => r.json())
      .then(data => {
        const title = data.title || id;
        const author = data.author_name || 'unknown artist';
        oEmbedCache[id] = { title, author };
        saveOEmbedCache(oEmbedCache);
        callback(title, author);
      })
      .catch(() => callback(id, 'unknown artist'));
  }

  function loadVideoById(id, knownTitle, knownArtist) {
    pendingVideoId = id;
    if (knownTitle) {
      updateNowPlaying(id, knownTitle, knownArtist);
    } else if (oEmbedCache[id]) {
      updateNowPlaying(id, oEmbedCache[id].title, oEmbedCache[id].author);
    } else {
      updateNowPlaying(id, 'loading...', '');
      fetchOEmbed(id, (title, author) => {
        if (pendingVideoId === id) {
          updateNowPlaying(id, title, author);
        }
      });
    }
    if (playerReady && player) {
      player.loadVideoById(id);
    }
  }

  function onPlayerReady() {
    playerReady = true;
    if (pendingVideoId) {
      player.loadVideoById(pendingVideoId);
    }
  }

  function onPlayerStateChange(event) {
    const YT = window.YT;
    if (event.data === YT.PlayerState.PLAYING) {
      isPlaying = true;
      els.playBtn.innerHTML = icons.pause;
      startTimeTracking();
    } else if (event.data === YT.PlayerState.PAUSED) {
      isPlaying = false;
      els.playBtn.innerHTML = icons.play;
    } else if (event.data === YT.PlayerState.ENDED) {
      isPlaying = false;
      els.playBtn.innerHTML = icons.play;
      stopTimeTracking();
      if (repeatOn && currentVideoId) {
        player.loadVideoById(currentVideoId);
      }
    }
  }

  function createPlayer() {
    player = new window.YT.Player(els.mount, {
      height: '1',
      width: '1',
      playerVars: {
        autoplay: 0,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange
      }
    });
  }

  function loadYouTubeIframeApi() {
    if (window.YT && window.YT.Player) {
      createPlayer();
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = createPlayer;
  }

  loadYouTubeIframeApi();

  els.loadBtn.addEventListener('click', () => {
    const raw = els.urlInput.value.trim();
    if (!raw) return;
    const id = extractVideoId(raw);
    if (!id) {
      els.title.textContent = 'invalid link';
      els.artist.textContent = 'paste a valid youtube url';
      return;
    }
    loadVideoById(id);
    els.urlInput.value = '';
  });

  els.urlInput.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.key === 'Enter') els.loadBtn.click();
  });
  els.urlInput.addEventListener('keyup', e => e.stopPropagation());
  els.urlInput.addEventListener('keypress', e => e.stopPropagation());

  els.playBtn.addEventListener('click', () => {
    if (!player || !currentVideoId) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  });

  els.repeatBtn.addEventListener('click', () => {
    repeatOn = !repeatOn;
    els.repeatBtn.classList.toggle('active', repeatOn);
    els.repeatBtn.innerHTML = repeatOn ? icons.repeatOn : icons.repeatOff;
  });

  els.favBtn.addEventListener('click', toggleFavorite);
  els.listBtn.addEventListener('click', toggleFavList);

  els.progressBar.addEventListener('click', e => {
    if (!player || !currentVideoId) return;
    const rect = els.progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const total = player.getDuration();
    if (total > 0) {
      player.seekTo(total * pct, true);
    }
  });

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let dragFrame = null;
  let pendingLeft = 0;
  let pendingTop = 0;

  function clampToViewport(left, top) {
    const rect = root.getBoundingClientRect();
    const maxLeft = window.innerWidth - rect.width;
    const maxTop = window.innerHeight - rect.height;
    let clampedLeft = left;
    let clampedTop = top;
    if (clampedLeft < 0) clampedLeft = 0;
    if (clampedTop < 0) clampedTop = 0;
    if (clampedLeft > maxLeft) clampedLeft = maxLeft;
    if (clampedTop > maxTop) clampedTop = maxTop;
    return { left: clampedLeft, top: clampedTop };
  }

  function applyDragPosition() {
    const clamped = clampToViewport(pendingLeft, pendingTop);
    root.style.left = clamped.left + 'px';
    root.style.top = clamped.top + 'px';
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    root.style.position = 'fixed';
    dragFrame = null;
  }

  els.bar.addEventListener('mousedown', e => {
    if (e.target.closest('#uv2ytc-controls')) return;
    isDragging = true;
    offsetX = e.clientX - root.getBoundingClientRect().left;
    offsetY = e.clientY - root.getBoundingClientRect().top;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    pendingLeft = e.clientX - offsetX;
    pendingTop = e.clientY - offsetY;
    if (!dragFrame) {
      dragFrame = requestAnimationFrame(applyDragPosition);
    }
  });
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('resize', () => {
    const rect = root.getBoundingClientRect();
    const clamped = clampToViewport(rect.left, rect.top);
    if (clamped.left !== rect.left || clamped.top !== rect.top) {
      root.style.left = clamped.left + 'px';
      root.style.top = clamped.top + 'px';
      root.style.right = 'auto';
      root.style.bottom = 'auto';
      root.style.position = 'fixed';
    }
  });
})();
