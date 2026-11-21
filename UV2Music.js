// ==UserScript==
// @name         UV2 Music
// @namespace    music4life
// @version      3.6
// @description  Vibe 2 Your Playlist while playing miniblox. Simple YT -> UV2 Music Player.
// @author       TheM1ddleM1n
// @match        https://miniblox.io/
// @grant        none
// ==/UserScript==

(function() {
'use strict';
const QK = 'uv2ytlmp-queue';
const CK = 'uv2ytlmp-oembed-cache';
const CLIM = 200;

let rawQ, rawC;
try { rawQ = JSON.parse(localStorage.getItem(QK) || '[]'); } catch { rawQ = []; }
try { rawC = JSON.parse(localStorage.getItem(CK) || '{}'); } catch { rawC = {}; }

let cache = rawC;
let queue = rawQ;

function saveQ() { localStorage.setItem(QK, JSON.stringify(queue)); }
function saveC() {
  const k = Object.keys(cache);
  if (k.length > CLIM) k.slice(0, k.length - CLIM).forEach(x => delete cache[x]);
  localStorage.setItem(CK, JSON.stringify(cache));
}

const ID_RE = [
  /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
  /(?:youtu\.be\/)([\w-]{11})/,
  /(?:youtube\.com\/embed\/)([\w-]{11})/,
  /(?:youtube\.com\/shorts\/)([\w-]{11})/
];

function extractId(url) {
  for (const r of ID_RE) { const m = url.match(r); if (m) return m[1]; }
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
#u2c-root{position:fixed;bottom:24px;right:24px;width:390px;background:#0a0a0a;border:1px solid rgba(255,255,255,.08);border-radius:12px;box-shadow:0 8px 28px rgba(0,0,0,.55);font-family:'Segoe UI',sans-serif;color:#fff;z-index:99999;overflow:hidden;user-select:none;contain:layout style}
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
#u2c-progressfill{height:100%;width:0%;background:var(--u2c-primary,#e74c3c);will-change:width}
#u2c-urlwrap{display:flex;padding:10px 12px;border-top:1px solid rgba(255,255,255,.06)}
#u2c-urlinput{flex:1;background:#161616;border:1px solid rgba(255,255,255,.07);color:#ccc;padding:8px 10px;font-size:12px;border-radius:6px 0 0 6px;outline:none}
#u2c-loadbtn{background:var(--u2c-primary,#e74c3c);color:#000;border:none;padding:8px 12px;border-radius:0 6px 6px 0;cursor:pointer}
#u2c-queue{max-height:0;overflow-y:auto;transition:max-height .2s ease;border-top:1px solid transparent;contain:content}
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

const qs = s => root.querySelector(s);
const els = {
  mount: qs('#u2c-mount'),
  bar: qs('#u2c-bar'),
  thumb: qs('#u2c-thumb'),
  thumbIcon: qs('#u2c-thumbicon'),
  title: qs('#u2c-title'),
  artist: qs('#u2c-artist'),
  timeLabel: qs('#u2c-timelabel'),
  progressBar: qs('#u2c-progressbar'),
  progressFill: qs('#u2c-progressfill'),
  playBtn: qs('#u2c-playbtn'),
  repeatBtn: qs('#u2c-repeatbtn'),
  favBtn: qs('#u2c-favbtn'),
  listBtn: qs('#u2c-listbtn'),
  urlInput: qs('#u2c-urlinput'),
  loadBtn: qs('#u2c-loadbtn'),
  queueEl: qs('#u2c-queue')
};

let player = null, ready = false, pendingId = null, curId = null;
let playing = false, repeatOn = false, rafId = null, queueOpen = false;
let lastTime = '', lastPct = -1;

function accent(id) {
  const c = `hsl(${hue(id)},78%,58%)`;
  root.style.setProperty('--u2c-primary', c);
  root.style.setProperty('--u2c-glow', c);
}

function findQ(id) { return queue.find(x => x.id === id); }

function updateFav() {
  const e = findQ(curId);
  els.favBtn.classList.toggle('active', !!(e && e.fav));
}

function renderQueue() {
  if (!queue.length) {
    els.queueEl.innerHTML = '<div id="u2c-msg">no songs yet</div>';
    return;
  }
  const frag = document.createDocumentFragment();
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i];
    const row = document.createElement('div');
    row.className = 'u2c-row';
    row.dataset.id = item.id;
    const img = document.createElement('img');
    img.src = `https://i.ytimg.com/vi/${item.id}/default.jpg`;
    img.width = 30;
    img.height = 30;
    img.loading = 'lazy';
    const txt = document.createElement('div');
    txt.className = 'u2c-row-text';
    const name = document.createElement('div');
    name.className = 'u2c-row-name';
    name.textContent = item.title;
    txt.appendChild(name);
    const fav = document.createElement('button');
    fav.className = 'u2c-row-fav' + (item.fav ? ' active' : '');
    fav.innerHTML = ic.heart;
    const rm = document.createElement('button');
    rm.className = 'u2c-row-rm';
    rm.textContent = '\u2715';
    row.appendChild(img);
    row.appendChild(txt);
    row.appendChild(fav);
    row.appendChild(rm);
    frag.appendChild(row);
  }
  els.queueEl.innerHTML = '';
  els.queueEl.appendChild(frag);
}

els.queueEl.addEventListener('click', e => {
  const row = e.target.closest('.u2c-row');
  if (!row) return;
  const id = row.dataset.id;
  if (e.target.closest('.u2c-row-rm')) {
    queue = queue.filter(x => x.id !== id);
    saveQ();
    renderQueue();
    return;
  }
  if (e.target.closest('.u2c-row-fav')) {
    const item = findQ(id);
    if (!item) return;
    item.fav = !item.fav;
    saveQ();
    e.target.closest('.u2c-row-fav').classList.toggle('active', item.fav);
    updateFav();
    return;
  }
  const item = findQ(id);
  if (item) loadById(item.id, item.title, item.artist);
});

function toggleFav() {
  const e = findQ(curId);
  if (!e) return;
  e.fav = !e.fav;
  saveQ();
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
  saveQ();
  if (queueOpen) renderQueue();
}

function tick() {
  if (!player || !player.getCurrentTime) { rafId = null; return; }
  const c = player.getCurrentTime(), t = player.getDuration();
  const txt = `${fmt(c)} / ${fmt(t)}`;
  if (txt !== lastTime) { els.timeLabel.textContent = txt; lastTime = txt; }
  const pct = t > 0 ? (c / t) * 100 : 0;
  const rpct = Math.round(pct * 10) / 10;
  if (rpct !== lastPct) { els.progressFill.style.width = rpct + '%'; lastPct = rpct; }
  if (playing) rafId = requestAnimationFrame(tick);
}

function startTick() {
  if (rafId) return;
  rafId = requestAnimationFrame(tick);
}

function stopTick() {
  if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) stopTick(); else if (playing) startTick();
});

function nowPlaying(id, title, artist) {
  curId = id;
  els.title.textContent = title;
  els.artist.textContent = artist || 'unknown artist';
  els.thumb.src = `https://i.ytimg.com/vi/${id}/default.jpg`;
  els.thumb.style.display = 'block';
  els.thumbIcon.style.display = 'none';
  els.timeLabel.textContent = '0:00 / 0:00';
  els.progressFill.style.width = '0%';
  lastTime = '0:00 / 0:00'; lastPct = 0;
  accent(id);
  updateFav();
}

const inflight = new Set();

function fetchMeta(id, cb) {
  if (cache[id]) { cb(cache[id].title, cache[id].author); return; }
  if (inflight.has(id)) return;
  inflight.add(id);
  fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`)
    .then(r => r.json())
    .then(d => {
      const title = d.title || id, author = d.author_name || 'unknown artist';
      cache[id] = { title, author };
      saveC();
      inflight.delete(id);
      cb(title, author);
    })
    .catch(() => { inflight.delete(id); cb(id, 'unknown artist'); });
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
  const S = window.YT.PlayerState;
  if (e.data === S.PLAYING) {
    playing = true;
    els.playBtn.innerHTML = ic.pause;
    startTick();
  } else if (e.data === S.PAUSED) {
    playing = false;
    els.playBtn.innerHTML = ic.play;
    stopTick();
  } else if (e.data === S.ENDED) {
    playing = false;
    els.playBtn.innerHTML = ic.play;
    stopTick();
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

if (window.YT && window.YT.Player) {
  createPlayer();
} else {
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
  window.onYouTubeIframeAPIReady = createPlayer;
}

els.loadBtn.addEventListener('click', () => {
  const raw = els.urlInput.value.trim();
  if (!raw) return;
  const id = extractId(raw);
  if (!id) {
    els.title.textContent = 'invalid link';
    els.artist.textContent = 'paste a valid youtube url';
    return;
  }
  loadById(id);
  els.urlInput.value = '';
});

els.urlInput.addEventListener('keydown', e => {
  e.stopPropagation();
  if (e.key === 'Enter') els.loadBtn.click();
});
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

let dragging = false, offX = 0, offY = 0, rafDrag = null, pL = 0, pT = 0;
function clamp(l, t) {
  const r = root.getBoundingClientRect();
  return {
    l: Math.min(Math.max(l, 0), window.innerWidth - r.width),
    t: Math.min(Math.max(t, 0), window.innerHeight - r.height)
  };
}
function applyDrag() {
  const c = clamp(pL, pT);
  root.style.left = c.l + 'px';
  root.style.top = c.t + 'px';
  root.style.right = 'auto';
  root.style.bottom = 'auto';
  root.style.position = 'fixed';
  rafDrag = null;
}
els.bar.addEventListener('mousedown', e => {
  if (e.target.closest('#u2c-controls')) return;
  dragging = true;
  const r = root.getBoundingClientRect();
  offX = e.clientX - r.left;
  offY = e.clientY - r.top;
  e.preventDefault();
});
document.addEventListener('mousemove', e => {
  if (!dragging) return;
  pL = e.clientX - offX;
  pT = e.clientY - offY;
  if (!rafDrag) rafDrag = requestAnimationFrame(applyDrag);
});
document.addEventListener('mouseup', () => { dragging = false; });
window.addEventListener('resize', () => {
  const r = root.getBoundingClientRect();
  const c = clamp(r.left, r.top);
  if (c.l !== r.left || c.t !== r.top) {
    root.style.left = c.l + 'px';
    root.style.top = c.t + 'px';
    root.style.right = 'auto';
    root.style.bottom = 'auto';
    root.style.position = 'fixed';
  }
});
})();
