// ==UserScript==
// @name         UnverifiedV2 Player Compact
// @namespace    http://tampermonkey.net/
// @version      1.7.0
// @description  Compact single-bar YouTube player with song queue
// @match        https://miniblox.io/
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  const QK = 'uv2ytlmp-queue';
  const CK = 'uv2ytlmp-oembed-cache';
  const CLIM = 200;

  function loadQ() {
    try { return JSON.parse(localStorage.getItem(QK) || '[]'); } catch (e) { return []; }
  }
  function saveQ(q) { localStorage.setItem(QK, JSON.stringify(q)); }
  function loadC() {
    try { return JSON.parse(localStorage.getItem(CK) || '{}'); } catch (e) { return {}; }
  }
  function idle(fn) {
    if (typeof window.requestIdleCallback === 'function') window.requestIdleCallback(fn);
    else setTimeout(fn, 0);
  }
  function saveC(c) {
    idle(() => {
      const k = Object.keys(c);
      if (k.length > CLIM) k.slice(0, k.length - CLIM).forEach(x => delete c[x]);
      localStorage.setItem(CK, JSON.stringify(c));
    });
  }

  let cache = loadC();
  let queue = loadQ();

  function extractId(url) {
    const p = [
      /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
      /(?:youtu\.be\/)([\w-]{11})/,
      /(?:youtube\.com\/embed\/)([\w-]{11})/,
      /(?:youtube\.com\/shorts\/)([\w-]{11})/
    ];
    for (const r of p) { const m = url.match(r); if (m) return m[1]; }
    return null;
  }

  function hue(s) {
    let h = 0;
    for (let i = 0; i < s.length; i++) h = s.charCodeAt(i) + ((h << 5) - h);
    return Math.abs(h) % 360;
  }

  function fmt(s) {
    if (!isFinite(s) || s < 0) return '0:00';
    const m = Math.floor(s / 60), sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
  }

  function link(rel, href, as) {
    const l = document.createElement('link');
    l.rel = rel; l.href = href;
    if (as) l.as = as;
    document.head.appendChild(l);
  }
  link('preconnect', 'https://www.youtube.com');
  link('preconnect', 'https://i.ytimg.com');
  link('preload', 'https://www.youtube.com/iframe_api', 'script');

  const ic = {
    play: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7 7h10v3l4-4-4-4v3H5v6h2zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="none" stroke="currentColor" stroke-width="2" d="M12 21s-7-4.6-9.5-8.5C.7 9.3 2 5.5 6 5c2.2-.3 3.8 1 6 3.2C14.2 6 15.8 4.7 18 5c4 .5 5.3 4.3 3.5 7.5C19 16.4 12 21 12 21z"/></svg>',
    load: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M19 13v6H5v-6H3v8h18v-8zm-8-11v13.17l-4.59-4.58L5 12l7 7 7-7-1.41-1.41L13 15.17V2z"/></svg>',
    list: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/></svg>',
    note: '<svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M12 3v10.55A4 4 0 1 0 14 17V7h4V3z"/></svg>'
  };

  const st = document.createElement('style');
  st.textContent = `.u2c-fc{display:flex;align-items:center;justify-content:center}
#u2c-root{position:fixed;bottom:24px;right:24px;width:390px;background:#0a0a0a;border:1px solid rgba(255,255,255,.08);border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.55);font-family:'Segoe UI',sans-serif;color:#fff;z-index:99999;overflow:hidden;user-select:none}
#u2c-bar{display:flex;align-items:center;gap:12px;padding:14px 16px;cursor:move}
#u2c-mount{position:absolute;width:1px;height:1px;opacity:0;pointer-events:none;overflow:hidden}
#u2c-thumbwrap{width:48px;height:48px;border-radius:50%;background:#161616;flex-shrink:0;box-shadow:0 0 12px var(--u2c-glow,rgba(231,76,60,.4));overflow:hidden}
#u2c-thumb{width:100%;height:100%;object-fit:cover;display:none}
#u2c-thumbicon{color:#444}
#u2c-info{flex:1;min-width:0}
#u2c-title{font-size:17px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--u2c-primary,#fff)}
#u2c-meta{display:flex;align-items:baseline;gap:7px;margin-top:2px}
#u2c-artist{font-size:13px;color:#999;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px}
#u2c-timelabel{font-size:12px;color:#555;flex-shrink:0}
#u2c-controls{display:flex;align-items:center;gap:8px;flex-shrink:0}
#u2c-controls button{background:none;border:none;color:#999;cursor:pointer;padding:5px;transition:color .15s}
#u2c-controls button:hover{color:var(--u2c-primary,#fff)}
#u2c-playbtn{color:#fff!important}
#u2c-playbtn:hover{color:#ddd!important}
#u2c-repeatbtn.active,#u2c-favbtn.active,#u2c-listbtn.active{color:var(--u2c-primary,#e74c3c)}
#u2c-favbtn.active svg path{fill:currentColor}
#u2c-progressbar{width:100%;height:4px;background:#1a1a1a;cursor:pointer}
#u2c-progressfill{height:100%;width:0%;background:var(--u2c-primary,#e74c3c)}
#u2c-urlwrap{display:flex;padding:10px 12px;border-top:1px solid rgba(255,255,255,.06)}
#u2c-urlinput{flex:1;background:#161616;border:1px solid rgba(255,255,255,.07);color:#ccc;padding:8px 10px;font-size:12px;border-radius:6px 0 0 6px;outline:none}
#u2c-loadbtn{background:var(--u2c-primary,#e74c3c);color:#000;border:none;padding:8px 12px;border-radius:0 6px 6px 0;cursor:pointer}
#u2c-queue{max-height:0;overflow-y:auto;transition:max-height .2s ease;border-top:1px solid transparent}
#u2c-queue.open{max-height:200px;border-top:1px solid rgba(255,255,255,.06)}
#u2c-queue::-webkit-scrollbar{width:3px}
#u2c-queue::-webkit-scrollbar-thumb{background:var(--u2c-primary,#e74c3c)}
.u2c-row{display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;border-bottom:1px solid #141414}
.u2c-row:hover{background:#131313}
.u2c-row img{width:30px;height:30px;border-radius:5px;object-fit:cover;background:#1a1a1a;flex-shrink:0}
.u2c-row-text{flex:1;min-width:0}
.u2c-row-name{font-size:12.5px;color:#ddd;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.u2c-row-fav{background:none;border:none;cursor:pointer;font-size:13px;color:#444;flex-shrink:0}
.u2c-row-fav.active{color:#e74c3c}
.u2c-row-rm{color:#444;flex-shrink:0;background:none;border:none;cursor:pointer;font-size:13px}
.u2c-row-rm:hover{color:#e74c3c}
#u2c-msg{padding:13px;text-align:center;font-size:11px;color:#444}`;
  document.head.appendChild(st);

  const root = document.createElement('div');
  root.id = 'u2c-root';
  root.innerHTML = `<div id="u2c-mount"></div>
<div id="u2c-bar">
<div id="u2c-thumbwrap" class="u2c-fc"><img id="u2c-thumb" src="" alt="" fetchpriority="high" loading="eager"/><div id="u2c-thumbicon" class="u2c-fc">${ic.note}</div></div>
<div id="u2c-info"><div id="u2c-title">nothing loaded</div><div id="u2c-meta"><span id="u2c-artist">paste a link below</span><span id="u2c-timelabel">0:00 / 0:00</span></div></div>
<div id="u2c-controls"><button id="u2c-repeatbtn">${ic.repeat}</button><button id="u2c-playbtn">${ic.play}</button><button id="u2c-favbtn">${ic.heart}</button><button id="u2c-listbtn">${ic.list}</button></div>
</div>
<div id="u2c-progressbar"><div id="u2c-progressfill"></div></div>
<div id="u2c-urlwrap"><input id="u2c-urlinput" type="text" placeholder="paste youtube link..." autocomplete="off" spellcheck="false"/><button id="u2c-loadbtn">${ic.load}</button></div>
<div id="u2c-queue"><div id="u2c-msg">no songs yet</div></div>`;
  document.body.appendChild(root);

  const q = s => root.querySelector(s);
  const els = {
    mount: q('#u2c-mount'), bar: q('#u2c-bar'), thumb: q('#u2c-thumb'), thumbIcon: q('#u2c-thumbicon'),
    title: q('#u2c-title'), artist: q('#u2c-artist'), timeLabel: q('#u2c-timelabel'),
    progressBar: q('#u2c-progressbar'), progressFill: q('#u2c-progressfill'), playBtn: q('#u2c-playbtn'),
    repeatBtn: q('#u2c-repeatbtn'), favBtn: q('#u2c-favbtn'), listBtn: q('#u2c-listbtn'),
    urlInput: q('#u2c-urlinput'), loadBtn: q('#u2c-loadbtn'), queueEl: q('#u2c-queue')
  };

  let player = null, ready = false, pendingId = null, curId = null, curTitle = '', curArtist = '';
  let playing = false, repeatOn = false, timeInt = null, lastTime = '', lastPct = -1, queueOpen = false;

  function accent(id) {
    const c = `hsl(${hue(id)}, 78%, 58%)`;
    root.style.setProperty('--u2c-primary', c);
    root.style.setProperty('--u2c-glow', c);
  }

  function findQ(id) { return queue.find(x => x.id === id); }

  function updateFav() {
    const e = findQ(curId);
    els.favBtn.classList.toggle('active', !!(e && e.fav));
  }

  function renderQueue() {
    if (!queue.length) { els.queueEl.innerHTML = '<div id="u2c-msg">no songs yet</div>'; return; }
    els.queueEl.innerHTML = '';
    const frag = document.createDocumentFragment();
    queue.forEach(item => {
      const row = document.createElement('div');
      row.className = 'u2c-row';
      row.innerHTML = `<img src="https://i.ytimg.com/vi/${item.id}/default.jpg" alt="" loading="lazy"/>
<div class="u2c-row-text"><div class="u2c-row-name">${item.title}</div></div>
<button class="u2c-row-fav${item.fav ? ' active' : ''}">${ic.heart}</button>
<button class="u2c-row-rm">&#x2715;</button>`;
      row.addEventListener('click', e => {
        if (e.target.closest('.u2c-row-fav') || e.target.closest('.u2c-row-rm')) return;
        loadById(item.id, item.title, item.artist);
      });
      row.querySelector('.u2c-row-fav').addEventListener('click', () => {
        item.fav = !item.fav;
        saveQ(queue);
        renderQueue();
        updateFav();
      });
      row.querySelector('.u2c-row-rm').addEventListener('click', () => {
        queue = queue.filter(x => x.id !== item.id);
        saveQ(queue);
        renderQueue();
      });
      frag.appendChild(row);
    });
    els.queueEl.appendChild(frag);
  }

  function toggleFav() {
    const e = findQ(curId);
    if (!e) return;
    e.fav = !e.fav;
    saveQ(queue);
    updateFav();
    if (queueOpen) renderQueue();
  }

  function toggleQueue() {
    queueOpen = !queueOpen;
    els.queueEl.classList.toggle('open', queueOpen);
    els.listBtn.classList.toggle('active', queueOpen);
    if (queueOpen) renderQueue();
  }

  function addToQueue(id, title, artist) {
    if (findQ(id)) return;
    queue.push({ id, title, artist, fav: false });
    saveQ(queue);
    if (queueOpen) renderQueue();
  }

  function tick() {
    if (!player || !player.getCurrentTime) return;
    const c = player.getCurrentTime(), t = player.getDuration();
    const txt = `${fmt(c)} / ${fmt(t)}`;
    if (txt !== lastTime) { els.timeLabel.textContent = txt; lastTime = txt; }
    const pct = t > 0 ? Math.round((c / t) * 1000) / 10 : 0;
    if (pct !== lastPct) { els.progressFill.style.width = pct + '%'; lastPct = pct; }
  }

  function startTick() { stopTick(); timeInt = setInterval(tick, 1000); }
  function stopTick() { if (timeInt) { clearInterval(timeInt); timeInt = null; } }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopTick(); else if (playing) startTick();
  });

  function nowPlaying(id, title, artist) {
    curId = id; curTitle = title; curArtist = artist || 'unknown artist';
    els.title.textContent = title;
    els.artist.textContent = curArtist;
    els.thumb.src = `https://i.ytimg.com/vi/${id}/default.jpg`;
    els.thumb.style.display = 'block';
    els.thumbIcon.style.display = 'none';
    els.timeLabel.textContent = '0:00 / 0:00';
    els.progressFill.style.width = '0%';
    lastTime = '0:00 / 0:00'; lastPct = 0;
    accent(id);
    updateFav();
  }

  function fetchMeta(id, cb) {
    if (cache[id]) { cb(cache[id].title, cache[id].author); return; }
    fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
      .then(r => r.json())
      .then(d => {
        const title = d.title || id, author = d.author_name || 'unknown artist';
        cache[id] = { title, author };
        saveC(cache);
        cb(title, author);
      })
      .catch(() => cb(id, 'unknown artist'));
  }

  function loadById(id, kt, ka) {
    pendingId = id;
    if (kt) {
      nowPlaying(id, kt, ka);
      addToQueue(id, kt, ka);
    } else if (cache[id]) {
      nowPlaying(id, cache[id].title, cache[id].author);
      addToQueue(id, cache[id].title, cache[id].author);
    } else {
      nowPlaying(id, 'loading...', '');
      fetchMeta(id, (title, author) => {
        if (pendingId === id) { nowPlaying(id, title, author); addToQueue(id, title, author); }
      });
    }
    if (ready && player) player.loadVideoById(id);
  }

  function onReady() { ready = true; if (pendingId) player.loadVideoById(pendingId); }

  function onState(e) {
    const YT = window.YT;
    if (e.data === YT.PlayerState.PLAYING) { playing = true; els.playBtn.innerHTML = ic.pause; startTick(); }
    else if (e.data === YT.PlayerState.PAUSED) { playing = false; els.playBtn.innerHTML = ic.play; }
    else if (e.data === YT.PlayerState.ENDED) {
      playing = false; els.playBtn.innerHTML = ic.play; stopTick();
      if (repeatOn && curId) player.loadVideoById(curId);
    }
  }

  function createPlayer() {
    player = new window.YT.Player(els.mount, {
      height: '1', width: '1',
      playerVars: { autoplay: 0, controls: 0, disablekb: 1, modestbranding: 1, rel: 0 },
      events: { onReady, onStateChange: onState }
    });
  }

  function loadApi() {
    if (window.YT && window.YT.Player) { createPlayer(); return; }
    const s = document.createElement('script');
    s.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(s);
    window.onYouTubeIframeAPIReady = createPlayer;
  }
  loadApi();

  els.loadBtn.addEventListener('click', () => {
    const raw = els.urlInput.value.trim();
    if (!raw) return;
    const id = extractId(raw);
    if (!id) { els.title.textContent = 'invalid link'; els.artist.textContent = 'paste a valid youtube url'; return; }
    loadById(id);
    els.urlInput.value = '';
  });
  els.urlInput.addEventListener('keydown', e => { e.stopPropagation(); if (e.key === 'Enter') els.loadBtn.click(); });
  els.urlInput.addEventListener('keyup', e => e.stopPropagation());
  els.urlInput.addEventListener('keypress', e => e.stopPropagation());

  els.playBtn.addEventListener('click', () => {
    if (!player || !curId) return;
    if (playing) player.pauseVideo(); else player.playVideo();
  });
  els.repeatBtn.addEventListener('click', () => {
    repeatOn = !repeatOn;
    els.repeatBtn.classList.toggle('active', repeatOn);
  });
  els.favBtn.addEventListener('click', toggleFav);
  els.listBtn.addEventListener('click', toggleQueue);
  els.progressBar.addEventListener('click', e => {
    if (!player || !curId) return;
    const r = els.progressBar.getBoundingClientRect();
    const t = player.getDuration();
    if (t > 0) player.seekTo(t * ((e.clientX - r.left) / r.width), true);
  });

  let dragging = false, offX = 0, offY = 0, frame = null, pL = 0, pT = 0;

  function clamp(l, t) {
    const r = root.getBoundingClientRect();
    return { l: Math.min(Math.max(l, 0), window.innerWidth - r.width), t: Math.min(Math.max(t, 0), window.innerHeight - r.height) };
  }
  function applyDrag() {
    const c = clamp(pL, pT);
    root.style.left = c.l + 'px'; root.style.top = c.t + 'px';
    root.style.right = 'auto'; root.style.bottom = 'auto'; root.style.position = 'fixed';
    frame = null;
  }
  els.bar.addEventListener('mousedown', e => {
    if (e.target.closest('#u2c-controls')) return;
    dragging = true;
    offX = e.clientX - root.getBoundingClientRect().left;
    offY = e.clientY - root.getBoundingClientRect().top;
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!dragging) return;
    pL = e.clientX - offX; pT = e.clientY - offY;
    if (!frame) frame = requestAnimationFrame(applyDrag);
  });
  document.addEventListener('mouseup', () => { dragging = false; });
  window.addEventListener('resize', () => {
    const r = root.getBoundingClientRect();
    const c = clamp(r.left, r.top);
    if (c.l !== r.left || c.t !== r.top) {
      root.style.left = c.l + 'px'; root.style.top = c.t + 'px';
      root.style.right = 'auto'; root.style.bottom = 'auto'; root.style.position = 'fixed';
    }
  });
})();
