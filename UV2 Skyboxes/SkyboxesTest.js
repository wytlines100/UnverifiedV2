// ==UserScript==
// @name         Mblx Skyboxes
// @namespace    tampogmonkey
// @version      3
// @description  Skyboxes :D. Credit to whoever made Candy!
// @author       TheMysteryMan
// @match        https://miniblox.io/*
// @match        https://*.miniblox.io/*
// @grant        none
// @noframes     false
// ==/UserScript==
(() => {
  'use strict';

  const FACES = [0, 1, 2, 3, 4, 5];
  const CUBE_MAP = 'https://raw.githubusercontent.com/wytlines100/UnverifiedV2/main/UV2%20Skyboxes/candy';

  const ghBase = u => {
    u = String(u || '').trim();
    let m = u.match(/^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:tree|blob)\/([^/]+)\/(.+?)\/?$/i);
    if (m) return `https://raw.githubusercontent.com/${m[1]}/${m[2]}/${m[3]}/${m[4]}`;
    if (/^https?:\/\/raw\.githubusercontent\.com\/[^/]+\/[^/]+\/[^/]+\/.+/i.test(u) && !/\.[a-z0-9]+(\?|$)/i.test(u))
      return u.replace(/\/+$/, '');
    return null;
  };

  const makeCustom = url => {
    url = String(url || '').trim();
    if (!url) return null;
    if (/^data:image\//i.test(url) || /\.(png|jpe?g|webp|avif|gif|bmp)(\?|#|$)/i.test(url))
      return { label: 'Custom Sky', equirect: url };
    const base = ghBase(url) || (/^https?:\/\//i.test(url) ? url.replace(/\/+$/, '') : null);
    if (base) return { label: 'Custom Cubemap', cube: FACES.map(i => `${base}/cubemap_${i}.png`) };
    return null;
  };

  const PRESETS = {
    vanilla: { label: ' Vanilla (off)' },
    candy: {
      label: 'UV2 Candy',
      cube: FACES.map(i => `${CUBE_MAP}/cubemap_${i}.png`),
    },
    park: {
      label: 'Park Panorama',
      equirect: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/2294472375_24a3b8ef46_o.jpg',
    },
    sky360: {
      label: 'Sky 360',
      equirect: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/kandao3.jpg',
    },
    blaze: {
      label: 'Blaze Sunset', time: null,
      day:   { z: '#3a7bd5', h: '#aee3ff', g: '#fff1b8' },
      dusk:  { z: '#5b1f8f', h: '#ff7e33', g: '#ffd27a' },
      night: { z: '#0b1026', h: '#16204a', g: '#8fa8ff' },
      cloud: { tint: '#ffb27a', mix: 0.35 }, stars: 1.2,
    },
    synthwave: {
      label: 'Synthwave', time: 'dusk', dayFactor: 0.12,
      day:   { z: '#14002e', h: '#ff2fb9', g: '#00eaff' },
      dusk:  { z: '#14002e', h: '#ff2fb9', g: '#00eaff' },
      night: { z: '#14002e', h: '#ff2fb9', g: '#00eaff' },
      cloud: { tint: '#ff4fd8', mix: 0.45 }, stars: 2.2,
    },
    bloodmoon: {
      label: 'Blood Moon', time: 'night', dayFactor: 0.05,
      day:   { z: '#0d0000', h: '#7a0b0b', g: '#ff4040' },
      dusk:  { z: '#0d0000', h: '#7a0b0b', g: '#ff4040' },
      night: { z: '#0d0000', h: '#7a0b0b', g: '#ff4040' },
      cloud: { tint: '#b03030', mix: 0.40 }, stars: 1.8,
    },
    deepspace: {
      label: 'Deep Space', time: 'night', dayFactor: 0.04,
      day:   { z: '#01030a', h: '#0a1230', g: '#2244aa' },
      dusk:  { z: '#01030a', h: '#0a1230', g: '#2244aa' },
      night: { z: '#01030a', h: '#0a1230', g: '#2244aa' },
      cloud: { tint: '#3a4a7a', mix: 0.30 }, stars: 3.0,
    },
    matrix: {
      label: 'Matrix', time: 'night', dayFactor: 0.25,
      day:   { z: '#000803', h: '#004d13', g: '#00ff66' },
      dusk:  { z: '#000803', h: '#004d13', g: '#00ff66' },
      night: { z: '#000803', h: '#004d13', g: '#00ff66' },
      cloud: { tint: '#0a5f22', mix: 0.40 }, stars: 1.5,
    },
    cherry: {
      label: 'Cherry Blossom', time: null,
      day:   { z: '#ff8fc7', h: '#ffe1ef', g: '#fff3f8' },
      dusk:  { z: '#b0509a', h: '#ff9ec4', g: '#ffd7ea' },
      night: { z: '#2a0f26', h: '#4a1d3d', g: '#c58fd0' },
      cloud: { tint: '#ffc4dd', mix: 0.40 }, stars: 1.3,
    },
    golden: {
      label: 'Golden Hour', time: 'dusk', dayFactor: 0.55,
      day:   { z: '#4a6db5', h: '#ffd27a', g: '#ffedaa' },
      dusk:  { z: '#4a6db5', h: '#ffd27a', g: '#ffedaa' },
      night: { z: '#4a6db5', h: '#ffd27a', g: '#ffedaa' },
      cloud: { tint: '#ffdfa8', mix: 0.35 }, stars: 1.0,
    },
    arctic: {
      label: 'Arctic Frost', time: null,
      day:   { z: '#7fb8e8', h: '#eaffff', g: '#ffffff' },
      dusk:  { z: '#5a7fae', h: '#ffc4a0', g: '#ffe9d6' },
      night: { z: '#0a1626', h: '#1a2c48', g: '#b8d8ff' },
      cloud: { tint: '#eaf8ff', mix: 0.40 }, stars: 1.4,
    },
    midnight: {
      label: 'Midnight Blue', time: 'night', dayFactor: 0.08,
      day:   { z: '#050818', h: '#101c3a', g: '#7c9dff' },
      dusk:  { z: '#050818', h: '#101c3a', g: '#7c9dff' },
      night: { z: '#050818', h: '#101c3a', g: '#7c9dff' },
      cloud: { tint: '#2a3a66', mix: 0.35 }, stars: 2.5,
    },
    toxic: {
      label: 'Toxic Haze', time: 'night', dayFactor: 0.25,
      day:   { z: '#1a2b00', h: '#6a8f00', g: '#d4ff00' },
      dusk:  { z: '#1a2b00', h: '#6a8f00', g: '#d4ff00' },
      night: { z: '#1a2b00', h: '#6a8f00', g: '#d4ff00' },
      cloud: { tint: '#6a8f1a', mix: 0.40 }, stars: 1.6,
    },
  };

  const LS = 'mbxSky.';
  const settings = {
    preset:     localStorage.getItem(LS + 'preset') || 'vanilla',
    customURL:  localStorage.getItem(LS + 'customURL') || '',
    cloudMix:  parseFloat(localStorage.getItem(LS + 'cloudMix') ?? '1'),
    starBoost: parseFloat(localStorage.getItem(LS + 'starBoost') ?? '1'),
  };
  const save = () => {
    for (const k of ['preset', 'customURL', 'cloudMix', 'starBoost'])
      try { localStorage.setItem(LS + k, String(settings[k])); } catch (e) {}
  };

  const srgb2lin = v => v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const hex2lin = h => {
    const n = parseInt(h.slice(1), 16);
    return {
      r: srgb2lin((n >> 16 & 255) / 255),
      g: srgb2lin((n >> 8 & 255) / 255),
      b: srgb2lin((n & 255) / 255),
    };
  };
  const lerp = (a, b, t) => a + (b - a) * t;
  const mixPal = (P, Q, t) => ({ r: lerp(P.r, Q.r, t), g: lerp(P.g, Q.g, t), b: lerp(P.b, Q.b, t) });
  const smooth = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  const rgbCache = new Map();
  const rgbOf = p => {
    if (!rgbCache.has(p)) rgbCache.set(p, { z: hex2lin(p.z), h: hex2lin(p.h), g: hex2lin(p.g) });
    return rgbCache.get(p);
  };
  const prepare = p => p && (p.day || p.equirect || p.cube) ? {
    day: p.day ? rgbOf(p.day) : null,
    dusk: p.dusk ? rgbOf(p.dusk) : null,
    night: p.night ? rgbOf(p.night) : null,
    cloud: p.cloud ? { tint: hex2lin(p.cloud.tint), mix: p.cloud.mix } : null,
    stars: p.stars || 1, time: p.time || null, dayFactor: p.dayFactor,
    equirect: p.equirect || null, cube: p.cube || null,
    hideCelestial: p.hideCelestial !== false,
  } : null;

  function findGame() {
    try {
      const node = document.querySelector('#react');
      if (!node) return null;
      for (const v of Object.values(node)) {
        const g =
          v?.updateQueue?.baseState?.element?.props?.game ||
          v?.memoizedProps?.game ||
          v?.stateNode?.updateQueue?.baseState?.element?.props?.game;
        if (g?.gameScene) return g;
      }
    } catch (e) {}
    return null;
  }

  let colorCtor = null, texCtor = null, bgCol = null;
  const texCache = new Map();

  function ensureCtors(sky) {
    if (!sky) return;
    if (!colorCtor && sky.uniforms?.zenithColor?.value)
      colorCtor = sky.uniforms.zenithColor.value.constructor;
    if (!texCtor) {
      const m = sky.sun?.sun?.material || sky.sun?.moon?.material;
      if (m?.map?.isTexture) texCtor = m.map.constructor;
      else if (sky.gameScene?.scene) {
        let f = null;
        sky.gameScene.scene.traverse(o => { if (!f && o.material?.map?.isTexture) f = o.material.map.constructor; });
        texCtor = f;
      }
    }
  }

  function buildCube(faces) {
    const t = new texCtor(faces);
    t.isCubeTexture = true;
    t.flipY = false;
    t.mapping = 301;
    t.wrapS = t.wrapT = 1000;
    t.magFilter = t.minFilter = 1006;
    t.generateMipmaps = false;
    if ('colorSpace' in t) t.colorSpace = 'srgb';
    else if ('encoding' in t) t.encoding = 3001;
    t.needsUpdate = true;
    return t;
  }

  function buildPano(img) {
    const t = new texCtor(img);
    t.mapping = 303;
    if ('colorSpace' in t) t.colorSpace = 'srgb';
    else if ('encoding' in t) t.encoding = 3001;
    t.needsUpdate = true;
    return t;
  }

  function loadFaces(urls, cacheKey, kind) {
    const faces = [];
    let done = 0, dead = false;
    texCache.set(cacheKey, { ok: false });
    urls.forEach((u, i) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        if (dead) return;
        faces[i] = img;
        if (++done < urls.length) return;
        let t = null;
        try { t = kind === 'cube' ? buildCube(faces) : buildPano(faces[0]); }
        catch (e) { t = null; }
        texCache.set(cacheKey, t ? { ok: true, tex: t } : { ok: false, err: 1 });
        showToast(t ? (kind === 'cube' ? 'cubemap ready' : 'panorama ready') : 'texture build failed');
      };
      img.onerror = () => {
        dead = true;
        texCache.set(cacheKey, { ok: false, err: 1 });
        showToast(kind === 'cube' ? 'cubemap failed — CORS or bad URL' : 'panorama failed — CORS or bad URL');
      };
      img.src = u;
    });
  }

  function kickLoad(p) {
    if (!texCtor) return;
    if (p.cube) {
      if (!texCache.has(p.cube[0])) loadFaces(p.cube, p.cube[0], 'cube');
      return;
    }
    if (p.equirect && !texCache.has(p.equirect)) loadFaces([p.equirect], p.equirect, 'pano');
  }

  function hideCelestial(sky) {
    if (sky.atmosphere) sky.atmosphere.visible = false;
    const s = sky.sun;
    if (s) {
      if (s.sun) s.sun.visible = false;
      if (s.moon) s.moon.visible = false;
    }
    const st = sky.gameScene?.stars || sky.stars;
    if (st?.stars) st.stars.visible = false;
  }
  function unhideCelestial(sky) {
    if (sky.atmosphere) sky.atmosphere.visible = true;
    const s = sky.sun;
    if (s) {
      if (s.sun) s.sun.visible = true;
      if (s.moon) s.moon.visible = true;
    }
    const st = sky.gameScene?.stars || sky.stars;
    if (st?.stars) st.stars.visible = true;
  }

  function guardBackground(scene) {
    if (!scene || scene.userData.__mbxBgGuard) return;
    scene.userData.__mbxBgGuard = 1;
    let v = scene.background;
    scene.userData.__mbxSetBg = nv => { v = nv; };
    Object.defineProperty(scene, 'background', {
      configurable: true,
      get() { return v; },
      set(nv) { if (cur) return; v = nv; },
    });
  }

  const baseOpacity = new WeakMap();
  let cur = null, weHid = false;

  function applySky(sky) {
    const p = cur;
    const scene = sky.gameScene?.scene;
    if (!p) {
      if (scene && scene.userData.__mbxCap) scene.userData.__mbxSetBg(scene.userData.__mbxOrigBg);
      if (weHid) { unhideCelestial(sky); weHid = false; }
      return;
    }
    ensureCtors(sky);
    if (p.cube || p.equirect) {
      kickLoad(p);
      const key = p.cube ? p.cube[0] : p.equirect;
      const e = texCache.get(key);
      if (e?.ok && scene) {
        scene.userData.__mbxSetBg(e.tex);
        if (p.hideCelestial) { hideCelestial(sky); weHid = true; }
      }
      return;
    }
    if (!p.day || !p.night) return;
    if (weHid) { unhideCelestial(sky); weHid = false; }
    const u = sky.uniforms;
    if (!u?.zenithColor) return;
    let dayF, duskF;
    const elev = u.sunDirection?.value?.y ?? 1;
    if (p.time === 'day')        { dayF = 1;    duskF = 0; }
    else if (p.time === 'night') { dayF = 0;    duskF = 0; }
    else if (p.time === 'dusk')  { dayF = 0.30; duskF = 1; }
    else {
      dayF  = smooth(-0.06, 0.32, elev);
      duskF = Math.max(0, 1 - Math.abs(elev) / 0.30);
    }
    const zen = mixPal(mixPal(p.night.z, p.day.z, dayF), p.dusk.z, duskF * 0.65);
    const hor = mixPal(mixPal(p.night.h, p.day.h, dayF), p.dusk.h, duskF);
    const glo = mixPal(mixPal(p.night.g, p.day.g, dayF), p.dusk.g, duskF);
    const put = (uni, c) => {
      const v = uni.value;
      if (typeof v.setRGB === 'function') v.setRGB(c.r, c.g, c.b);
      else v.set(`rgb(${c.r * 255 | 0},${c.g * 255 | 0},${c.b * 255 | 0})`);
    };
    put(u.zenithColor, zen);
    put(u.horizonColor, hor);
    put(u.sunGlowColor, glo);
    if (p.dayFactor !== undefined && u.dayFactor) u.dayFactor.value = p.dayFactor;
    if (colorCtor && scene) {
      if (!bgCol) bgCol = new colorCtor();
      bgCol.setRGB(hor.r, hor.g, hor.b);
      scene.userData.__mbxSetBg(bgCol);
    }
  }

  function applyClouds(clouds) {
    const p = cur; if (!p || !p.cloud) return;
    const t = p.cloud.mix * settings.cloudMix;
    for (const key of ['_dayColor', '_nightColor', '_dayShadow', '_nightShadow',
                       '_sunsetColor', '_sunsetShadow', '_sunGlowColor',
                       '_duskColor', '_duskShadow', '_moonGlowColor']) {
      const c = clouds[key];
      if (!c) continue;
      if (c.isColor) {
        const mixed = mixPal({ r: c.r, g: c.g, b: c.b }, p.cloud.tint, t);
        if (typeof c.setRGB === 'function') c.setRGB(mixed.r, mixed.g, mixed.b);
      } else if (typeof c === 'string') {
        clouds[key] = '#' + [p.cloud.tint.r, p.cloud.tint.g, p.cloud.tint.b]
          .map(x => Math.round(Math.pow(x, 1 / 2.4) * 255).toString(16).padStart(2, '0')).join('');
      }
    }
  }

  function applyStars(stars) {
    const p = cur;
    const mat = stars.stars?.material; if (!mat) return;
    if (!baseOpacity.has(mat)) baseOpacity.set(mat, mat.opacity ?? 1);
    if (!p || p.cube || p.equirect) { mat.opacity = baseOpacity.get(mat); return; }
    mat.opacity = Math.min(1, baseOpacity.get(mat) * p.stars * settings.starBoost);
  }

  const hooked = new WeakSet();
  function patch(obj, method, after) {
    const proto = Object.getPrototypeOf(obj);
    if (!proto || typeof proto[method] !== 'function') return;
    if (hooked.has(proto[method])) return;
    const orig = proto[method];
    proto[method] = function (...args) {
      const r = orig.apply(this, args);
      try { after(this, args); } catch (e) {}
      return r;
    };
    hooked.add(proto[method]);
  }
  function hookScene(gs) {
    if (!gs?.sky || !gs.scene) return false;
    if (!gs.scene.userData.__mbxCap) {
      gs.scene.userData.__mbxOrigBg = gs.scene.background ?? null;
      gs.scene.userData.__mbxCap = 1;
    }
    guardBackground(gs.scene);
    patch(gs.sky, 'update', self => applySky(self));
    if (gs.clouds) patch(gs.clouds, 'update', self => applyClouds(self));
    if (gs.stars)  patch(gs.stars,  'update', self => applyStars(self));
    return true;
  }

  let lastSky = null, frame = 0;
  function watchdog() {
    if ((frame++ % 30) === 0) {
      try {
        const gs = findGame()?.gameScene;
        if (gs?.sky) {
          if (gs.sky !== lastSky) {
            lastSky = gs.sky;
            hookScene(gs);
          }
          applySky(gs.sky);
        }
      } catch (e) {}
    }
    requestAnimationFrame(watchdog);
  }

  const css = document.createElement('style');
  css.textContent = `
    #mbx-sky-toast{position:fixed;left:12px;bottom:12px;z-index:999999;background:#0e1420e6;
      color:#9fe8ff;font:12px/1.4 ui-monospace,Consolas,monospace;padding:8px 14px;border-radius:8px;
      border:1px solid #2a3a55;pointer-events:none;opacity:0;transition:opacity .25s}
    #mbx-sky-panel{position:fixed;right:12px;bottom:12px;z-index:999999;display:none;width:252px;
      max-height:80vh;overflow-y:auto;background:#0e1420f2;color:#d7e3f4;font:12px/1.5 ui-monospace,Consolas,monospace;
      border:1px solid #2a3a55;border-radius:10px;padding:10px 12px;user-select:none}
    #mbx-sky-panel h3{margin:0 0 6px;font-size:12px;color:#7fd0ff;letter-spacing:.5px}
    #mbx-sky-panel .grid{display:grid;grid-template-columns:1fr 1fr;gap:4px;margin-bottom:8px}
    #mbx-sky-panel button{all:unset;cursor:pointer;padding:3px 6px;border-radius:6px;text-align:center;
      background:#1a2438;border:1px solid #2a3a55}
    #mbx-sky-panel button:hover{background:#243352}
    #mbx-sky-panel button.on{background:#1d5a7a;border-color:#4fc3ff;color:#bff0ff}
    #mbx-sky-panel .crow{display:flex;gap:4px;margin:6px 0}
    #mbx-sky-panel input[type=text]{flex:1;background:#1a2438;border:1px solid #2a3a55;border-radius:6px;
      color:#d7e3f4;font:11px ui-monospace,Consolas,monospace;padding:3px 6px;min-width:0}
    #mbx-sky-panel label{display:flex;align-items:center;gap:6px;margin:2px 0;color:#9fb2cc}
    #mbx-sky-panel input[type=range]{flex:1;accent-color:#4fc3ff;height:10px}
    #mbx-sky-panel .hint{color:#5d7292;margin-top:6px;font-size:10px}`;
  document.documentElement.appendChild(css);

  const toast = document.createElement('div');
  toast.id = 'mbx-sky-toast';
  document.documentElement.appendChild(toast);
  let toastTimer = 0;
  function showToast(msg) {
    toast.textContent = ' 🌤 ' + msg;
    toast.style.opacity = 1;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (toast.style.opacity = 0), 2200);
  }

  let panel = null;
  function buildPanel() {
    const el = document.createElement('div');
    el.id = 'mbx-sky-panel';
    el.innerHTML = '<h3>🌤 SKYBOXES!</h3>';
    const grid = document.createElement('div');
    grid.className = 'grid';
    const refresh = () => {
      for (const b of grid.children)
        b.classList.toggle('on', b.dataset.p === settings.preset);
      for (const s of el.querySelectorAll('input[type=range]')) s.value = settings[s.dataset.k];
    };
    el._refresh = refresh;
    for (const [id, p] of Object.entries(PRESETS)) {
      const b = document.createElement('button');
      b.textContent = p.label || id;
      b.dataset.p = id;
      b.onclick = () => setPreset(id);
      grid.appendChild(b);
    }
    el.appendChild(grid);
    const row = document.createElement('div');
    row.className = 'crow';
    const url = document.createElement('input');
    url.type = 'text';
    url.placeholder = 'panorama / cubemap folder URL…';
    url.value = settings.customURL;
    const go = document.createElement('button');
    go.textContent = 'load';
    go.onclick = () => setCubemapURL(url.value);
    row.appendChild(url);
    row.appendChild(go);
    el.appendChild(row);
    const slider = (k, label, min, max, step) => {
      const lab = document.createElement('label');
      lab.textContent = label;
      const inp = document.createElement('input');
      inp.type = 'range'; inp.min = min; inp.max = max; inp.step = step;
      inp.dataset.k = k;
      inp.oninput = () => { settings[k] = parseFloat(inp.value); save(); };
      inp.onchange = () => showToast('saved');
      lab.appendChild(inp);
      el.appendChild(lab);
    };
    slider('cloudMix', 'cloud', 0, 1, 0.05);
    slider('starBoost', 'stars', 0, 3, 0.1);
    const hint = document.createElement('div');
    hint.className = 'hint';
    hint.textContent = '\\ panel   ` cycle   __mbxSky in console';
    el.appendChild(hint);
    document.documentElement.appendChild(el);
    return el;
  }
  function togglePanel(force) {
    if (!panel) panel = buildPanel();
    const show = force !== undefined ? force : panel.style.display !== 'block';
    panel.style.display = show ? 'block' : 'none';
    if (show) panel._refresh();
  }

  function setPreset(id) {
    if (!PRESETS[id]) return false;
    settings.preset = id;
    cur = id === 'vanilla' ? null : prepare(PRESETS[id]);
    save();
    if (cur?.cube || cur?.equirect) {
      ensureCtors(findGame()?.gameScene?.sky);
      kickLoad(cur);
      showToast('loading ' + (cur.cube ? 'cubemap' : 'panorama') + '…');
    } else {
      showToast((PRESETS[id].label || id) + (id === 'vanilla' ? '' : ' [in-world]'));
    }
    if (panel) panel._refresh();
    return true;
  }
  function cyclePreset() {
    const ids = Object.keys(PRESETS);
    setPreset(ids[(ids.indexOf(settings.preset) + 1) % ids.length]);
  }
  function setCubemapURL(url) {
    const p = makeCustom(url);
    if (!p) { showToast('need an image or folder URL'); return false; }
    settings.customURL = String(url).trim();
    save();
    PRESETS.custom = p;
    if (panel) { panel.remove(); panel = null; }
    setPreset('custom');
    togglePanel(true);
    return true;
  }

  addEventListener('keydown', e => {
    if (e.isComposing) return;
    const a = document.activeElement;
    const typing = a && (a.tagName === 'INPUT' || a.tagName === 'TEXTAREA' || a.isContentEditable);
    if (typing) return;
    if (e.code === 'Backslash') { e.preventDefault(); togglePanel(); }
    else if (e.code === 'Backquote') { e.preventDefault(); cyclePreset(); }
    else if (e.code === 'Escape' && panel) togglePanel(false);
  }, true);

  window.__mbxSky = {
    set: setPreset,
    cycle: cyclePreset,
    cubemap: setCubemapURL,
    presets: () => Object.keys(PRESETS).map(k => `${k} — ${PRESETS[k].label || 'vanilla'}`),
    off: () => setPreset('vanilla'),
    panel: () => togglePanel(),
    game: () => findGame(),
    get config() { return { ...settings }; },
  };

  if (settings.customURL) {
    const p = makeCustom(settings.customURL);
    if (p) PRESETS.custom = p;
  }
  setPreset(settings.preset);
  setTimeout(() => showToast('ready — \\ panel / ` cycle'), 1200);
  requestAnimationFrame(watchdog);
})();
