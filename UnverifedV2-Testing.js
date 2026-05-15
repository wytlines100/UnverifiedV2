// ==UserScript==
// @name         UnverifiedV2
// @namespace    http://tampermonkey.net/
// @version      v2.0.4
// @description  Look at my license before you modify, I WILL DMCA you.
// @icon         https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/logo.jpg
// @license      Proprietary License
// @author       wytlines, DeadFish7, andreypidd, jet, joudaALT!
// @match        https://miniblox.io/*
// @match        https://miniblox.org/*
// @match        https://miniblox.com/*
// @match        https://blockcraft.io/*
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      api.jamendo.com
// @connect      prod-1.storage.jamendo.com
// ==/UserScript==

const setStyles = (element, styles) => Object.assign(element.style, styles);
const createElement = (tag, props = {}, styles = {}, parent = null) => {
  const el = document.createElement(tag);
  Object.assign(el, props);
  setStyles(el, styles);
  if (parent) parent.appendChild(el);
  return el;
};
const makeDraggable = (target, handle = target) => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  const onMouseDown = event => {
    if (event.button !== 0) return;
    const rect = target.getBoundingClientRect();
    isDragging = true;
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
    event.preventDefault();
  };
  const onMouseMove = event => {
    if (!isDragging) return;
    target.style.left = `${event.clientX - offsetX}px`;
    target.style.top = `${event.clientY - offsetY}px`;
    target.style.bottom = 'auto';
  };
  const onMouseUp = () => { isDragging = false; };
  handle.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
  return () => {
    handle.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
};
const isElementNode = node => node && node.nodeType === Node.ELEMENT_NODE;
const forEachMatching = (root, selector, callback) => {
  if (root.matches && root.matches(selector)) callback(root);
  root.querySelectorAll(selector).forEach(callback);
};

class LurkerChecker {
  static lurkerInstalled() {
    return document.getElementById('_L7Banner') !== null;
  }
}

class UnverifiedIntro {
  constructor() {
    this.container = document.createElement("div");
    Object.assign(this.container.style, {
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      backgroundColor: "black", overflow: "hidden", zIndex: 9999,
    });
    this.check = document.createElement("div");
    this.check.textContent = "✓";
    Object.assign(this.check.style, {
      color: "red", fontSize: "5rem", opacity: 0.05,
      transition: "opacity 1s ease, transform 1s ease",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.circle = document.createElement("div");
    Object.assign(this.circle.style, {
      width: "100px", height: "100px", backgroundColor: "black",
      border: "2px solid red", borderRadius: "50%",
      boxShadow: "0 0 10px red, 0 0 20px red, 0 0 30px red",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: 0, transition: "opacity 1s ease, transform 1s ease",
    });
    this.circle.appendChild(this.check);
    this.container.appendChild(this.circle);
    this.unverifiedText = document.createElement("div");
    this.unverifiedText.textContent = "UnverifiedV2";
    Object.assign(this.unverifiedText.style, {
      color: "red", fontSize: "60px", opacity: 0, marginTop: "50px",
      transition: "opacity 0.8s ease",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.container.appendChild(this.unverifiedText);
    this.creditsText = document.createElement("div");
    this.creditsText.textContent = "\nBy wytlines, DeadFish7\nandreypidd, jet, joudaALT!";
    Object.assign(this.creditsText.style, {
      color: "red", fontSize: "30px", opacity: 0, transition: "opacity 0.8s ease",
      whiteSpace: 'pre-line', textAlign: "center",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.container.appendChild(this.creditsText);
  }
  playIntro() {
    document.body.appendChild(this.container);
    this.circle.style.opacity = 1;
    this.check.style.opacity = 1;
    setTimeout(() => { this.check.style.transform = "rotate(180deg)"; }, 500);
    setTimeout(() => {
      if (LurkerChecker.lurkerInstalled()) {
        this.unverifiedText.textContent = 'UnverifiedV2 x Lurker';
        document.title = 'UnverifiedV2 x Lurker';
      }
      this.unverifiedText.style.opacity = 1;
    }, 1000);
    setTimeout(() => { this.creditsText.style.opacity = 1; }, 1500);
    setTimeout(() => { this.container.style.transition = "opacity 1s ease"; this.container.style.opacity = 0; }, 2500);
    setTimeout(() => { this.container.remove(); }, 3000);
  }
  showInitializedNotif() {
    const n = document.createElement("div");
    n.classList.add('initialized-notification');
    n.textContent = "UnverifiedV2 Initialized";
    document.body.appendChild(n);
    setTimeout(() => { n.style.top = "10px"; n.style.opacity = "1"; }, 10);
    setTimeout(() => { n.style.top = "-50px"; n.style.opacity = "0"; }, 2000);
    setTimeout(() => { n.remove(); }, 3000);
  }
}

(function() {
  'use strict';
  const gameRef = {
    _game: null,
    get game() {
      if (this._game) return this._game;
      const reactRoot = document.querySelector("#react");
      if (!reactRoot) return null;
      try {
        const fiber = Object.values(reactRoot)[0];
        const game = fiber?.updateQueue?.baseState?.element?.props?.game;
        if (game) this._game = game;
        return game;
      } catch (e) { console.warn("[UnverifiedV2] Failed to get game object:", e); return null; }
    }
  };
  const waitForGame = setInterval(() => {
    const game = gameRef.game;
    if (game && game.chat && typeof game.chat.addChat === "function") {
      clearInterval(waitForGame);
      game.chat.addChat({ text: "\\#00FFFF\\[UnverifiedV2]\\reset\\ Hello, Thank You For Using The Unverified Client." });
    }
  }, 500);
})();

class UnverifiedStyler {
  constructor() {
    this.observer = null;
    this.background = new UnverifiedBackground();
    this.banner = new UnverifiedBanner();
    this.shortcutMenu = new UnverifiedShortcutMenu();
    this.visuallyRemoveSelectors = ['.chakra-image.css-1je8qb9', '.chakra-stack.css-7kkhgi'];
    this.backgroundSelectors = ['img.chakra-image.css-rkihvp', 'img.chakra-image.css-mohuzh', '.css-aznra0'];
    this.generalStylingSelectors = new Set([
      '.chakra-button.css-cuh8pi', '.chakra-button.css-32lhf4', '.chakra-button.css-5ov7ui',
      '.chakra-button.css-18wnugv', '.chakra-button.css-he6upe', '.chakra-button.css-1oxqv3t',
      '.chakra-button.css-1dkorm4', '.css-10y588r', 'button.chakra-button.css-livqej',
      'button.chakra-button.css-1jg2qv0', 'div.css-aidfhd', 'div.css-1kd330l',
      'button.chakra-button.css-14mkusw', 'button.chakra-button.css-8q1apo', '.css-1a6laq6',
      'button.chakra-button.css-1axaj8o', 'button.chakra-button.css-xircll', '.css-1xy2x8',
      '.css-i1x0qw', '.css-jnnvp4', '.css-hk5viu', '.css-55x3n6', '.css-n15lby',
      '.css-1xqsddr', '.css-1ibhl1y', '.chakra-stack.css-1c10cfa', '.chakra-form-control.css-1kxonj9',
      '.chakra-button.css-1dcrejx', '.chakra-button.css-1ote1yx', '.css-qkv95g', '.css-1r8eeg2',
      '.chakra-input.css-18whhxd', '.chakra-input.css-ypk59i', '.chakra-input.css-1oc9k70',
      '.css-nizmkx', '.css-r7134l', '.css-qzh2oi', '.chakra-button.css-137k3gn',
      '.chakra-button.css-1n378o7', '.css-1f34n7d', '.css-tncl4j', '.css-1tyymsb',
      '.css-ol7umz', '.chakra-button.css-12t4nq4',
    ]);
    this.specificStylingSelectors = new Map([
      ['button.chakra-button.css-1axaj8o', e => { e.style.fontSize = '24px'; e.style.padding = '1px 1px'; }],
      ['.chakra-button.css-cuh8pi', e => { e.style.fontSize = '20px'; }],
      ['.css-1xy2x8', e => { e.style.border = '2px solid purple'; e.style.padding = '0 10px'; }],
      ['.css-i1x0qw', e => { e.style.border = '2px solid green'; e.style.padding = '0 10px'; }],
      ['.css-jnnvp4', e => { e.style.border = '2px solid yellow'; e.style.padding = '0 10px'; }],
      ['.css-hk5viu', e => { e.style.border = '2px solid gray'; e.style.padding = '0 10px'; }],
      ['.css-qzh2oi', e => { e.style.border = '2px solid white'; }],
      ['.chakra-button.css-1iuk66d', e => { e.style.border = '1px solid white'; e.style.borderRadius = '12px'; }],
      ['.chakra-button.css-73nw7g', e => { e.style.border = '1px solid white'; e.style.borderRadius = '12px'; }],
      ['.css-55x3n6', e => { e.style.border = '2px solid white'; e.style.padding = '0 10px'; }],
      ['.css-n15lby', e => { e.style.border = '2px solid lime'; e.style.padding = '0 10px'; }],
      ['.css-1xqsddr', e => { e.style.border = '2px solid pink'; e.style.padding = '0 10px'; }],
      ['.css-1ibhl1y', e => { e.style.border = '2px solid orange'; e.style.padding = '0 10px'; }],
      ['.chakra-input.css-ypk59i', e => { e.style.border = 'none'; e.style.background = 'none'; }],
      ['.chakra-input.css-1oc9k70', e => { e.style.border = 'none'; e.style.background = 'none'; }],
      ['.chakra-input.css-18whhxd', e => { e.style.border = 'none'; e.style.background = 'none'; }],
      ['.css-nizmkx', e => { e.style.padding = '0 0'; }],
      ['.chakra-slider', e => { e.style.padding = '0 0'; e.style.borderRadius = '12px'; }],
      ['.css-1a6laq6', e => { e.style.padding = '0 0'; }],
      ['.chakra-slider__filled-track.css-li9pez', e => { e.style.borderRadius = '12px'; }],
    ]);
    this.blackBackgroundSelectors = [
      '.chakra-stack.css-1cklnv0', '.chakra-stack.css-oou8ol', '.chakra-stack.css-owjkmg',
      '.chakra-stack.css-15uwvcw', '.chakra-stack.css-1hj4r72', '.chakra-stack.css-10tqh5h',
      '.chakra-stack.css-wv1k6p', '.chakra-stack.css-b1sb84',
      '.chakra-modal__content.css-1n1g7m4', '.chakra-modal__content.css-1ah3qhl',
      '.chakra-modal__content.css-1yhxaze',
    ];
    this.skipMouseInOutListeners = new Set([
      '.chakra-input.css-ypk59i', '.chakra-input.css-1oc9k70', '.chakra-input.css-18whhxd',
    ]);
  }
  visuallyRemove(e) { if (!e) return; e.style.opacity = 0; e.style.zIndex = -1; }
  isMainScreen() { return this.shortcutMenu.getPlayButton() !== null; }
  addStyleObserver() {
    document.title = 'UnverifiedV2';
    this.observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        for (const node of mutation.addedNodes) {
          if (node.nodeType !== Node.ELEMENT_NODE) continue;
          for (const selector of this.visuallyRemoveSelectors) {
            forEachMatching(node, selector, element => this.visuallyRemove(element));
          }
          for (const selector of this.backgroundSelectors) {
            forEachMatching(node, selector, element => this.background.setBG(element));
          }
          for (const selector of this.generalStylingSelectors) {
            forEachMatching(node, selector, element => this.applyGeneralStyle(element, selector));
          }
          for (const selector of this.specificStylingSelectors.keys()) {
            forEachMatching(node, selector, element => this.applySpecificStyle(element, selector));
          }
          if (this.isMainScreen()) { this.shortcutMenu.addShortcutMenu(); this.banner.addBanner(); }
          else { this.shortcutMenu.removeShortcutMenu(); this.banner.removeBanner(); }
          for (const selector of this.blackBackgroundSelectors) {
            forEachMatching(node, selector, element => this.removeBlackBackground(element));
          }
        }
      }
    });
    this.observer.observe(document.body, { childList: true, subtree: true });
  }
  initialTriggerStyleObserver() {
    this.shortcutMenu.getPlayButton().click();
    setTimeout(() => { this.shortcutMenu.getExitButton().click(); }, 70);
  }
  applyGeneralStyle(e, selector) {
    e.style.padding = '10px 20px';
    e.style.backgroundColor = (!e.unverifiedMouseIn) ? 'rgba(211, 211, 211, 0.4)' : 'rgba(185, 185, 185, 0.4)';
    e.style.color = 'white'; e.style.border = '1px solid #D3D3D3'; e.style.borderRadius = '12px';
    e.style.fontSize = '16px'; e.style.cursor = 'pointer'; e.style.transition = 'transform 0.2s ease';
    e.style.outline = 'none'; e.style.boxShadow = 'none';
    if (!this.skipMouseInOutListeners.has(selector)) {
      e.addEventListener('mouseover', () => { e.unverifiedMouseIn = true; e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)'; });
      e.addEventListener('mouseout', () => { e.unverifiedMouseIn = false; e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)'; });
    }
  }
  applySpecificStyle(e, selector) { this.specificStylingSelectors.get(selector)(e); }
  removeBlackBackground(e) {
    e.style.background = 'transparent'; e.style.backgroundColor = 'none'; e.style.boxShadow = 'none';
    if (!e.textContent.startsWith('Browse')) { e.style.backdropFilter = 'blur(1px)'; e.style.webkitBackdropFilter = 'blur(1px)'; }
  }
}

class UnverifiedBackground {
  constructor() {
    this.bg1 = "https://w0.peakpx.com/wallpaper/810/395/HD-wallpaper-landscape-minecraft-shaders-minecraft.jpg";
    this.currentBG = this.bg1;
  }
  setBG(e) { e.src = this.currentBG; }
}

class UnverifiedBanner {
  constructor() {
    this.e = document.createElement('div');
    this.e.textContent = 'UnverifiedV2\n\nBy wytlines, DeadFish7, andreypidd, jet, joudaALT!';
    this.e.id = 'unverified-banner'; this.e.style.whiteSpace = 'pre-line'; this.e.style.textAlign = 'center';
    this.e.style.zIndex = 999; this.e.style.position = "absolute"; this.e.style.top = "11.5%";
    this.e.style.left = "50%"; this.e.style.transform = "translate(-50%, -50%)";
    this.e.style.padding = '10px 20px'; this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
    this.e.style.color = 'white'; this.e.style.border = '1px solid #D3D3D3'; this.e.style.borderRadius = '12px';
    this.e.style.fontSize = '24px'; this.e.style.cursor = 'pointer';
    this.e.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
    this.e.style.outline = 'none'; this.e.style.boxShadow = 'none';
    this.e.addEventListener('mouseover', () => { this.e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)'; });
    this.e.addEventListener('mouseout', () => { this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)'; });
    this.shown = false;
  }
  addBanner() { if (!this.shown) { document.body.appendChild(this.e); this.shown = true; } }
  removeBanner() { if (this.shown) { this.shown = false; this.e.remove(); } }
}

class UnverifiedShortcutMenu {
  constructor() {
    this.onclicks = [
      () => { this.getPlayButton().click(); setTimeout(() => this.getKitPVPButton().click(), 70); document.body.removeChild(this.container); },
      () => { this.getPlayButton().click(); setTimeout(() => this.getSkywarsButton().click(), 70); document.body.removeChild(this.container); },
      () => { this.getPlayButton().click(); setTimeout(() => this.getDoublesButton().click(), 70); document.body.removeChild(this.container); },
      () => { this.getPlayButton().click(); setTimeout(() => this.getQuadsButton().click(), 70); document.body.removeChild(this.container); },
      () => { this.getPlayButton().click(); setTimeout(() => this.getClassicPVPButton().click(), 70); document.body.removeChild(this.container); },
    ];
    this.container = document.createElement("div");
    Object.assign(this.container.style, {
      position: "absolute", top: "76%", left: "50%", transform: "translate(-50%, -50%)",
      padding: "20px", borderRadius: "12px", display: "flex", flexDirection: "row",
      gap: "10px", alignItems: "center", zIndex: "99"
    });
    let i = 0;
    ["KitPVP", "Skywars", "Doubles", "Quads", "ClassicPVP"].forEach(label => {
      const button = document.createElement("button");
      button.textContent = label;
      button.style.padding = '8px 16px'; button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
      button.style.color = 'white'; button.style.border = '1px solid #D3D3D3'; button.style.borderRadius = '6px';
      button.style.fontSize = '16px'; button.style.cursor = 'pointer';
      button.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
      button.style.outline = 'none'; button.style.boxShadow = 'none';
      button.addEventListener('mouseover', () => { button.style.backgroundColor = 'rgba(185, 185, 185, 0.4)'; button.style.transform = 'scale(1.01)'; });
      button.addEventListener('mouseout', () => { button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)'; button.style.transform = 'scale(1)'; });
      button.addEventListener('click', this.onclicks[i++]);
      this.container.appendChild(button);
    });
    this.shown = false;
  }
  getPlayButton() { return document.querySelector('.chakra-button.css-cuh8pi'); }
  getExitButton() { return document.querySelectorAll('.chakra-button.css-1axaj8o')[1]; }
  getKitPVPButton() { return document.querySelector('.css-1idq8wm'); }
  getSkywarsButton() { return document.querySelector('.css-rsqc3q'); }
  getDoublesButton() { return document.querySelector('.css-6umr0e'); }
  getQuadsButton() { return document.querySelector('.css-sbvzy'); }
  getClassicPVPButton() { return document.querySelector('.css-1w536sc'); }
  addShortcutMenu() { if (!this.shown) { this.shown = true; document.body.appendChild(this.container); } }
  removeShortcutMenu() { if (this.shown) { this.shown = false; document.body.removeChild(this.container); } }
}

(function() {
  'use strict';

  const intro = new UnverifiedIntro();
  intro.playIntro();
  intro.showInitializedNotif();
  const styler = new UnverifiedStyler();
  styler.addStyleObserver();
  try { styler.initialTriggerStyleObserver(); } catch (e) {}

  const style = document.createElement('style');
  style.innerHTML = `
    :root {
      --primary-grad: linear-gradient(135deg, #ff0000, #ffffff);
      --accent-color: #ff0000;
      --accent-color-alt: #ffffff;
      --bg-secondary: #0a0a0a;
    }
    .theme-default  { --primary-grad: linear-gradient(135deg, #ff0000, #ffffff); --accent-color: #ff0000; --accent-color-alt: #ffffff; }
    .theme-ocean    { --primary-grad: linear-gradient(135deg, #00c6ff, #0072ff); --accent-color: #00c6ff; --accent-color-alt: #0072ff; }
    .theme-beach    { --primary-grad: linear-gradient(135deg, #0080ff, #f4a460); --accent-color: #0080ff; --accent-color-alt: #f4a460; }
    .theme-frost    { --primary-grad: linear-gradient(135deg, #a8edea, #00008b); --accent-color: #a8edea; --accent-color-alt: #00008b; }
    .theme-lava     { --primary-grad: linear-gradient(135deg, #ff0000, #ff8c00); --accent-color: #ff4500; --accent-color-alt: #ff8c00; }
    .theme-rich     { --primary-grad: linear-gradient(135deg, #ffd700, #b8860b); --accent-color: #ffd700; --accent-color-alt: #b8860b; }
    .theme-midnight { --primary-grad: linear-gradient(135deg, #c471ed, #12c2e9); --accent-color: #c471ed; --accent-color-alt: #12c2e9; }
    .theme-aurora   { --primary-grad: linear-gradient(135deg, #43e97b, #38f9d7); --accent-color: #43e97b; --accent-color-alt: #38f9d7; }
    .theme-rose     { --primary-grad: linear-gradient(135deg, #f953c6, #b91d73); --accent-color: #f953c6; --accent-color-alt: #b91d73; }
    .theme-sunset   { --primary-grad: linear-gradient(135deg, #f7971e, #ffd200); --accent-color: #f7971e; --accent-color-alt: #ffd200; }
    .theme-forest   { --primary-grad: linear-gradient(135deg, #56ab2f, #a8e063); --accent-color: #56ab2f; --accent-color-alt: #a8e063; }
    .theme-neon     { --primary-grad: linear-gradient(135deg, #ff00ff, #00ffff); --accent-color: #ff00ff; --accent-color-alt: #00ffff; }
    .theme-holy     { --primary-grad: linear-gradient(135deg, #ffffff, #ffea4b); --accent-color: #ffffff; --accent-color-alt: #ffea4b; }

    @font-face {
      font-family: 'MinibloxFont';
      src: url('https://cdn.glitch.global/adb12490-d563-43cb-9711-2a69a8bb1c06/Faithful.ttf?v=1735593093308') format('truetype');
    }
    @keyframes uv2UIOpen {
      from { opacity: 0; transform: translate(-50%, -46%) scale(0.94); }
      to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes uv2UIClose {
      from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      to   { opacity: 0; transform: translate(-50%, -54%) scale(0.94); }
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes progressShrink {
      0%   { transform: scaleX(1); }
      100% { transform: scaleX(0); }
    }
    @keyframes notifFadeOut {
      0%   { opacity: 1; transform: translateX(0); }
      100% { opacity: 0; transform: translateX(50px); visibility: hidden; }
    }
    @keyframes afkPulse {
      0%,100% { opacity: 1; transform: scale(1); }
      50%      { opacity: 0.5; transform: scale(1.2); }
    }
    @keyframes unverified-rainbow {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .watermark-container {
      position: fixed; top: 20px; right: 25px; text-align: right;
      font-family: 'Segoe UI', sans-serif; z-index: 10001; pointer-events: none;
    }
    .watermark-main {
      font-size: 26px; font-weight: 900;
      background: var(--primary-grad) !important;
      -webkit-background-clip: text !important; background-clip: text !important;
      -webkit-text-fill-color: transparent !important; color: transparent !important;
      margin-bottom: 5px;
    }
    .active-modules { display: flex; flex-direction: column; gap: 4px; }
    .active-module-item {
      font-size: 16px; font-weight: 600;
      background: var(--primary-grad) !important;
      -webkit-background-clip: text !important; background-clip: text !important;
      -webkit-text-fill-color: transparent !important; color: transparent !important;
      animation: fadeIn 0.3s ease;
    }

    .notification {
      position: fixed; bottom: 24px; right: 24px; width: 360px;
      background: rgba(8,8,12,0.85); backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px); border-radius: 16px;
      border: 1px solid rgba(255,255,255,0.12); z-index: 10000;
      transition: all 0.4s cubic-bezier(0.34,1.2,0.64,1);
      transform: translateX(420px); opacity: 0; overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03);
    }
    .notification.show  { transform: translateX(0); opacity: 1; }
    .notification.hiding { animation: notifFadeOut 0.3s ease forwards !important; }
    .notif-inner { display: flex; align-items: center; gap: 14px; padding: 14px 16px; }
    .notif-icon-wrapper { flex-shrink: 0; }
    .notif-icon {
      width: 42px; height: 42px; background: rgba(255,255,255,0.08);
      border-radius: 12px; display: flex; align-items: center; justify-content: center;
      border: 1px solid rgba(255,255,255,0.15); transition: all 0.2s;
    }
    .notif-icon i { font-size: 20px; color: var(--accent-color); }
    .notification.notif-success-type .notif-icon { box-shadow: 0 0 18px color-mix(in srgb, var(--accent-color) 50%, transparent); }
    .notification.notif-info-type .notif-icon { box-shadow: 0 0 18px color-mix(in srgb, #00aaff 50%, transparent); }
    .notification.notif-info-type .notif-icon i { color: #00aaff; }
    .notification.notif-info-type .notif-icon { border-color: #00aaff; }
    .notif-content { flex: 1; min-width: 0; }
    .notif-header { display: flex; align-items: baseline; gap: 8px; margin-bottom: 4px; flex-wrap: wrap; }
    .notif-title { font-weight: 700; font-size: 14px; color: #fff; letter-spacing: -0.2px; }
    .notif-time { font-size: 10px; color: #888; font-weight: 500; }
    .notif-message { font-size: 13px; color: #ccc; line-height: 1.4; word-break: break-word; }
    .notif-close {
      background: rgba(255,255,255,0.05); border: none; width: 28px; height: 28px;
      border-radius: 8px; display: flex; align-items: center; justify-content: center;
      cursor: pointer; color: #aaa; transition: all 0.2s; flex-shrink: 0;
    }
    .notif-close:hover { background: rgba(255,255,255,0.15); color: #fff; }
    .notif-progress { position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: rgba(255,255,255,0.1); }
    .notif-progress-bar { width: 100%; height: 100%; background: var(--primary-grad); transform-origin: left; animation: progressShrink 3.5s linear forwards; }

    #uv2-main-ui {
      position: fixed; top: 50%; left: 50%; transform: translate(-50%,-50%);
      background-color: transparent; color: white; padding: 0; border-radius: 20px;
      display: none; z-index: 9999; text-align: center; box-shadow: none;
      font-family: 'MinibloxFont', sans-serif; max-height: 95vh; max-width: 100vw;
      overflow-y: auto; overflow-x: hidden;
    }
    #uv2-main-ui.uv2-animate-in { animation: uv2UIOpen 0.22s cubic-bezier(0.22,1,0.36,1) forwards; }
    #uv2-main-ui.uv2-animate-out { animation: uv2UIClose 0.18s cubic-bezier(0.22,1,0.36,1) forwards; }

    .curved-box {
      width: 950px; height: 580px; background-color: #000; border-radius: 20px;
      display: flex; overflow: hidden; border: 1px solid #333;
    }
    .sidebar {
      width: 180px; background-color: #0a0a0a; border-right: 1px solid #222;
      display: flex; flex-direction: column; padding: 20px 10px; flex-shrink: 0;
    }
    .gradient-text {
      font-size: 18px; margin-bottom: 30px; text-align: center; letter-spacing: -1px;
      background: var(--primary-grad) !important;
      -webkit-background-clip: text !important; background-clip: text !important;
      -webkit-text-fill-color: transparent !important; color: transparent !important;
      font-weight: bold; font-family: 'Segoe UI', sans-serif;
    }
    .tabs { display: flex; flex-direction: column; gap: 10px; }
    .tab-btn {
      position: relative; background: transparent; border: none; color: #888;
      padding: 12px 15px; text-align: left; font-size: 14px;
      font-family: 'Segoe UI', sans-serif; cursor: pointer; border-radius: 8px; transition: 0.3s;
    }
    .tab-btn i { margin-right: 10px; width: 20px; text-align: center; }
    .tab-btn:hover { background: #151515; color: #fff; }
    .tab-btn.active { background: #222; font-weight: bold; color: var(--accent-color); }
    .tab-btn.active::before {
      content: ''; position: absolute; left: 0; top: 20%; height: 60%; width: 3px;
      background: var(--primary-grad); border-radius: 0 3px 3px 0;
    }
    .main-content {
      flex: 1; padding: 25px; color: white; font-family: 'Segoe UI', sans-serif;
      overflow-y: auto; max-height: 100%;
    }
    .main-content::-webkit-scrollbar { width: 5px; }
    .main-content::-webkit-scrollbar-track { background: #000; }
    .main-content::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
    .main-content::-webkit-scrollbar-thumb:hover { background: var(--accent-color); }
    .tab-pane { display: none; animation: fadeIn 0.4s ease; }
    .tab-pane.active-pane { display: block; }
    .section-title {
      font-size: 24px; color: #fff; margin-bottom: 5px;
      padding-left: 15px; border-left: 4px solid var(--accent-color);
    }
    .settings-group-label {
      font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em;
      color: var(--accent-color); padding: 10px 4px 4px;
      font-family: 'Segoe UI', sans-serif; font-weight: 700; opacity: 0.85;
    }
    .settings-group-label i { margin-right: 6px; }
    .home-section { display: flex; flex-direction: column; gap: 15px; }
    .news-card {
      background: #0a0a0a; border: 1px solid #222; border-radius: 12px;
      padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);
    }
    .update-list { list-style: none; padding: 0; margin: 0; }
    .update-list li {
      font-size: 14px; color: #bbb; padding: 10px 0;
      border-bottom: 1px solid #1a1a1a; display: flex; align-items: center;
    }
    .update-list li:last-child { border-bottom: none; }
    .update-list li i { color: var(--accent-color); margin-right: 12px; font-size: 12px; }
    .module-container { display: flex; flex-direction: column; gap: 12px; }
    .module-card {
      background: #0a0a0a; border: 1px solid #222; border-radius: 12px;
      padding: 15px 20px; display: flex; justify-content: space-between;
      align-items: center; transition: 0.3s; cursor: pointer;
    }
    .module-card:hover {
      border-color: color-mix(in srgb, var(--accent-color) 40%, #444);
      box-shadow: 0 0 15px color-mix(in srgb, var(--accent-color) 10%, transparent);
    }
    .module-info { display: flex; align-items: center; gap: 10px; flex: 1; }
    .module-name {
      background: var(--primary-grad) !important;
      -webkit-background-clip: text !important; background-clip: text !important;
      -webkit-text-fill-color: transparent !important; color: transparent !important;
      font-weight: bold; font-size: 15px;
    }
    .module-separator { color: #444; }
    .module-desc { color: #888; font-size: 13px; }
    .switch { position: relative; display: inline-block; width: 40px; height: 20px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider {
      position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
      background-color: #222; transition: .4s; border-radius: 20px;
    }
    .slider:before {
      position: absolute; content: ""; height: 14px; width: 14px;
      left: 3px; bottom: 3px; background-color: white; transition: .4s;
      border-radius: 50%; z-index: 1;
    }
    input:checked + .slider { background: var(--primary-grad) !important; }
    input:checked + .slider:before { transform: translateX(20px); }
    .themes-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin-top: 10px; }
    .theme-option {
      background: #0a0a0a; border: 1px solid #222; border-radius: 12px;
      padding: 12px; cursor: pointer; transition: 0.3s;
      display: flex; flex-direction: column; gap: 8px; position: relative;
    }
    .theme-option:hover { border-color: #444; background: #0f0f0f; }
    .theme-option.selected {
      border-color: var(--accent-color) !important;
      box-shadow: 0 0 12px color-mix(in srgb, var(--accent-color) 30%, transparent);
    }
    .theme-option.selected .theme-check { opacity: 1 !important; background: var(--primary-grad) !important; }
    .theme-preview { height: 30px; border-radius: 6px; width: 100%; }
    .theme-label { font-size: 12px; color: #888; text-align: center; font-family: 'Segoe UI', sans-serif; }
    .theme-check {
      position: absolute; top: 6px; right: 6px; width: 16px; height: 16px;
      border-radius: 50%; opacity: 0; transition: opacity 0.3s;
      display: flex; align-items: center; justify-content: center;
    }
    .theme-check i { font-size: 8px; color: #000; }

    .bind-popup {
      position: absolute; background-color: #2c3e50; color: white;
      padding: 20px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.7);
      z-index: 10001; font-family: 'MinibloxFont', sans-serif; display: none; text-align: center;
    }
    .bind-popup input {
      background-color: #34495e; color: white; border: 2px solid #e74c3c;
      border-radius: 5px; padding: 10px; font-size: 18px; width: 200px;
    }
    .bind-popup button {
      background-color: #e74c3c; color: white; border: none;
      border-radius: 5px; padding: 10px 20px; margin-top: 10px; cursor: pointer;
    }
    .bind-popup button:hover { background-color: #c0392b; }
    .initialized-notification {
      font-family: 'MinibloxFont', sans-serif; font-size: 20px; color: #e74c3c;
      position: absolute; top: -50px; left: 50%; transform: translateX(-50%);
      padding: 10px 20px; background-color: black; border: 1px solid white;
      border-radius: 10px; z-index: 10000; opacity: 0; transition: top 1s ease, opacity 1s ease;
    }

    #unverified-music-player {
      position: fixed; bottom: 24px; left: 24px; width: 260px;
      background: #0f0f0f; border-left: 3px solid #e74c3c; z-index: 99999;
      font-family: 'MinibloxFont', sans-serif; color: white;
      box-shadow: 0 4px 24px rgba(0,0,0,0.8); user-select: none;
    }
    #unverified-music-player .mp-topbar {
      display: flex; align-items: center; justify-content: space-between;
      padding: 7px 10px; background: #0a0a0a; cursor: move; border-bottom: 1px solid #1f1f1f;
    }
    #unverified-music-player .mp-topbar-name { font-size: 9px; color: #e74c3c; letter-spacing: 3px; text-transform: uppercase; }
    #unverified-music-player .mp-topbar-close { background: none; border: none; color: #333; font-size: 14px; cursor: pointer; padding: 0; line-height: 1; transition: color 0.15s; }
    #unverified-music-player .mp-topbar-close:hover { color: #e74c3c; }
    #unverified-music-player .mp-nowplaying { display: flex; align-items: center; gap: 10px; padding: 10px; border-bottom: 1px solid #1a1a1a; }
    #unverified-music-player .mp-art { width: 44px; height: 44px; background: #1a1a1a; flex-shrink: 0; object-fit: cover; }
    #unverified-music-player .mp-info { flex: 1; min-width: 0; }
    #unverified-music-player .mp-title { font-size: 11px; color: #ddd; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #unverified-music-player .mp-sub { font-size: 10px; color: #3a3a3a; margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #unverified-music-player .mp-bar { height: 2px; background: #1a1a1a; }
    #unverified-music-player .mp-bar-fill { height: 100%; width: 0%; background: #e74c3c; transition: width 0.5s linear; }
    #unverified-music-player .mp-btns { display: flex; border-bottom: 1px solid #1a1a1a; }
    #unverified-music-player .mp-btn { flex: 1; background: none; border: none; border-right: 1px solid #1a1a1a; color: #444; padding: 9px 0; font-size: 13px; cursor: pointer; transition: color 0.15s, background 0.15s; display: flex; align-items: center; justify-content: center; }
    #unverified-music-player .mp-btn:last-child { border-right: none; }
    #unverified-music-player .mp-btn:hover { color: #fff; background: #1a1a1a; }
    #unverified-music-player .mp-btn.active { color: #e74c3c; }
    #unverified-music-player .mp-vol { display: flex; align-items: center; gap: 8px; padding: 7px 10px; border-bottom: 1px solid #1a1a1a; }
    #unverified-music-player .mp-vol-lbl { font-size: 9px; color: #2a2a2a; letter-spacing: 2px; flex-shrink: 0; }
    #unverified-music-player .mp-vol-slider { flex: 1; accent-color: #e74c3c; height: 2px; cursor: pointer; }
    #unverified-music-player .mp-vol-pct { font-size: 9px; color: #2a2a2a; min-width: 26px; text-align: right; }
    #unverified-music-player .mp-search-wrap { padding: 8px 10px; border-bottom: 1px solid #1a1a1a; display: flex; gap: 0; }
    #unverified-music-player .mp-search-in { flex: 1; background: #1a1a1a; color: #ccc; border: none; padding: 7px 9px; font-size: 10px; outline: none; font-family: 'MinibloxFont', sans-serif; }
    #unverified-music-player .mp-search-in::placeholder { color: #2a2a2a; }
    #unverified-music-player .mp-search-go { background: #e74c3c; color: white; border: none; padding: 7px 11px; font-size: 10px; cursor: pointer; font-family: 'MinibloxFont', sans-serif; letter-spacing: 1px; transition: background 0.15s; flex-shrink: 0; }
    #unverified-music-player .mp-search-go:hover { background: #c0392b; }
    #unverified-music-player .mp-results { max-height: 120px; overflow-y: auto; }
    #unverified-music-player .mp-results::-webkit-scrollbar { width: 2px; }
    #unverified-music-player .mp-results::-webkit-scrollbar-thumb { background: #e74c3c; }
    #unverified-music-player .mp-result { display: flex; align-items: center; gap: 8px; padding: 6px 10px; cursor: pointer; border-bottom: 1px solid #161616; transition: background 0.1s; }
    #unverified-music-player .mp-result:last-child { border-bottom: none; }
    #unverified-music-player .mp-result:hover { background: #1a1a1a; }
    #unverified-music-player .mp-result-img { width: 32px; height: 32px; object-fit: cover; flex-shrink: 0; background: #1a1a1a; }
    #unverified-music-player .mp-result-name { font-size: 10px; color: #bbb; font-family: 'MinibloxFont', sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    #unverified-music-player .mp-result-by { font-size: 9px; color: #333; margin-top: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'MinibloxFont', sans-serif; }
    #unverified-music-player .mp-msg { padding: 10px; color: #2a2a2a; font-size: 9px; letter-spacing: 1px; text-align: center; font-family: 'MinibloxFont', sans-serif; }
  `;
  document.head.appendChild(style);

  const fontawesome = document.createElement("link");
  fontawesome.rel = "stylesheet";
  fontawesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css";
  document.head.appendChild(fontawesome);

  const watermark = document.createElement("div");
  watermark.className = "watermark-container";
  watermark.innerHTML = `<div class="watermark-main">Unverified</div><div id="active-modules-list" class="active-modules"></div>`;
  document.body.appendChild(watermark);

  const notifEl = document.createElement("div");
  notifEl.id = "notification";
  notifEl.className = "notification";
  notifEl.innerHTML = `
    <div class="notif-inner">
      <div class="notif-icon-wrapper"><div class="notif-icon"><i class="fa-solid fa-check"></i></div></div>
      <div class="notif-content">
        <div class="notif-header">
          <span id="notif-title" class="notif-title">Unverified</span>
          <span class="notif-time">just now</span>
        </div>
        <div id="notif-message" class="notif-message">Action completed</div>
      </div>
      <button class="notif-close" aria-label="Close notification"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="notif-progress"><div class="notif-progress-bar"></div></div>
  `;
  document.body.appendChild(notifEl);

  const ui = document.createElement("div");
  ui.id = "uv2-main-ui";
  document.body.appendChild(ui);

  function addModuleTag(name) {
    const list = document.getElementById('active-modules-list');
    if (!list) return;
    const tag = document.createElement('div');
    tag.className = 'active-module-item';
    tag.id = `watermark-${name.replace(/\s/g, '')}`;
    tag.innerText = name;
    list.appendChild(tag);
  }

  function removeModuleTag(name) {
    const tag = document.getElementById(`watermark-${name.replace(/\s/g, '')}`);
    if (tag) tag.remove();
  }

  let notifTimeout = null;
  function showNotification(message, title = 'Unverified', type = 'success') {
    const notif = document.getElementById('notification');
    const notifTitle = document.getElementById('notif-title');
    const notifMessage = document.getElementById('notif-message');
    const notifTime = notif && notif.querySelector('.notif-time');
    const notifIcon = notif && notif.querySelector('.notif-icon i');
    const iconMap = { success: 'fa-check-circle', info: 'fa-info-circle', warning: 'fa-exclamation-triangle' };
    if (notifIcon) notifIcon.className = `fa-solid ${iconMap[type] || 'fa-bell'}`;
    if (notifTitle) notifTitle.innerText = title;
    if (notifMessage) notifMessage.innerText = message;
    if (notifTime) notifTime.innerText = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (notif) {
      if (type === 'success') { notif.classList.add('notif-success-type'); notif.classList.remove('notif-info-type'); }
      else if (type === 'info') { notif.classList.add('notif-info-type'); notif.classList.remove('notif-success-type'); }
      else { notif.classList.remove('notif-success-type','notif-info-type'); }
      notif.classList.remove('show','hiding');
      void notif.offsetWidth;
      notif.classList.add('show');
      const bar = notif.querySelector('.notif-progress-bar');
      if (bar) { bar.style.animation = 'none'; void bar.offsetWidth; bar.style.animation = 'progressShrink 3.5s linear forwards'; }
      if (notifTimeout) clearTimeout(notifTimeout);
      notifTimeout = setTimeout(() => hideNotification(), 3500);
    }
  }

  function hideNotification() {
    const notif = document.getElementById('notification');
    if (!notif) return;
    notif.classList.add('hiding');
    notif.classList.remove('show');
    setTimeout(() => notif.classList.remove('hiding'), 300);
  }

  notifEl.querySelector('.notif-close').addEventListener('click', e => {
    e.stopPropagation();
    if (notifTimeout) clearTimeout(notifTimeout);
    hideNotification();
  });

  ui.innerHTML = `
    <div class="curved-box">
      <aside class="sidebar">
        <h2 class="gradient-text">Unverified Client [V2.0.4]</h2>
        <nav class="tabs">
          <button class="tab-btn active" data-target="home"><i class="fa-solid fa-house"></i> Home</button>
          <button class="tab-btn" data-target="modules"><i class="fa-solid fa-code"></i> Modules</button>
          <button class="tab-btn" data-target="settings"><i class="fa-solid fa-gear"></i> Settings</button>
          <button class="tab-btn" data-target="themes"><i class="fa-solid fa-brush"></i> Themes</button>
        </nav>
      </aside>
      <main class="main-content">
        <section id="home" class="tab-pane active-pane">
          <div class="home-section">
            <h2 class="section-title">What's New?</h2>
            <article class="news-card">
              <ul class="update-list">
                <li><i class="fa-solid fa-pen-nib"></i> UI updated for a cleaner look</li>
                <li><i class="fa-solid fa-palette"></i> Added Themes</li>
                <li><i class="fa-solid fa-bell"></i> Updated Notification System</li>
              </ul>
              <p class="gradient-text" style="margin-top:10px;display:inline-block;">Updated by jet</p>
            </article>
            <h2 class="section-title">Info</h2>
            <article class="news-card">
              <ul class="update-list">
                <li><i class="fa-solid fa-wrench"></i> You're on Version v2.0.4</li>
                <li><i class="fa-solid fa-copyright"></i> You may not redistribute, copy, or modify any code of Unverified Client. Contact: rfd6108@gmail.com or wythvh (Discord).</li>
              </ul>
            </article>
            <h2 class="section-title">Developers</h2>
            <article class="news-card">
              <ul class="update-list">
                <li><i class="fa-solid fa-crown"></i> wytlines | Lead Developer</li>
                <li><i class="fa-solid fa-paintbrush"></i> jet | UI Designer</li>
                <li><i class="fa-solid fa-code"></i> joudaALT | Developer</li>
              </ul>
            </article>
          </div>
        </section>
        <section id="modules" class="tab-pane">
          <h2 class="section-title">Modules</h2>
          <div id="module-container" class="module-container"></div>
        </section>
        <section id="settings" class="tab-pane">
          <h2 class="section-title">Settings</h2>
          <div class="module-container">
            <div class="settings-group-label"><i class="fa-solid fa-volume-high"></i> Sound</div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Module Click Sounds</div><span class="module-separator"> | </span><span class="module-desc">Play a sound when toggling modules on or off</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-sounds"><span class="slider"></span></label>
            </div>
            <div class="settings-group-label"><i class="fa-solid fa-eye"></i> Interface</div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Show Watermark</div><span class="module-separator"> | </span><span class="module-desc">Show the Unverified Client's Watermark.</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-watermark"><span class="slider"></span></label>
            </div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Show Notifications</div><span class="module-separator"> | </span><span class="module-desc">Enable or Disable Notifcations appearing when toggling modules on or off.</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-notifs"><span class="slider"></span></label>
            </div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Animation</div><span class="module-separator"> | </span><span class="module-desc">Add animation to the opening and closing of the menu.</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-animation"><span class="slider"></span></label>
            </div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Save Modules</div><span class="module-separator"> | </span><span class="module-desc">Restore modules active apon reload.</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-saving"><span class="slider"></span></label>
            </div>
            <div class="settings-group-label"><i class="fa-solid fa-clock"></i> Auto AFK</div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Auto Enable</div><span class="module-separator"> | </span><span class="module-desc">Turns on Anti-AFK automatically after idling</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-autoafk"><span class="slider"></span></label>
            </div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">AFK Chat Message</div><span class="module-separator"> | </span><span class="module-desc">Sends a chat message when you go AFK</span></div></div>
              <label class="switch"><input type="checkbox" id="uv2-toggle-afkchat"><span class="slider"></span></label>
            </div>
            <div class="module-card">
              <div class="module-info"><div><div class="module-name">Idle Delay</div><span class="module-separator"> | </span><span class="module-desc">Seconds before Anti-AFK auto-enables (5-120)</span></div></div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                <input type="number" id="uv2-afkdelay-input" min="5" max="120" value="10" style="width:60px;background:#1a1a1a;color:white;border:1px solid #333;border-radius:6px;padding:5px 8px;font-size:14px;font-family:'Segoe UI',sans-serif;text-align:center;outline:none;">
                <span style="color:#888;font-size:13px;">s</span>
              </div>
            </div>
            <div class="settings-group-label"><i class="fa-solid fa-info-circle"></i> About</div>
            <div class="module-card" style="cursor:default;"><div class="module-info"><div><div class="module-name">Version</div><span class="module-separator"> — </span><span class="module-desc">v2.0.4</span></div></div></div>
            <div class="module-card" style="cursor:default;"><div class="module-info"><div><div class="module-name">Team</div><span class="module-separator"> — </span><span class="module-desc">wytlines, DeadFish7, andreypidd, jet, joudaALT!</span></div></div></div>
            <div class="module-card" style="cursor:default;"><div class="module-info"><div><div class="module-name">License</div><span class="module-separator"> — </span><span class="module-desc">Do not copy, reproduce, modify without permission.</span></div></div></div>
          </div>
        </section>
        <section id="themes" class="tab-pane">
          <h2 class="section-title">Themes</h2>
          <div class="themes-grid" id="themes-grid"></div>
        </section>
      </main>
    </div>
  `;

  const themeList = [
    { name: "Default",  cls: "theme-default",  grad: "linear-gradient(135deg, #ff0000, #ffffff)" },
    { name: "Ocean",    cls: "theme-ocean",     grad: "linear-gradient(135deg, #00c6ff, #0072ff)" },
    { name: "Beach",    cls: "theme-beach",     grad: "linear-gradient(135deg, #0080ff, #f4a460)" },
    { name: "Frost",    cls: "theme-frost",     grad: "linear-gradient(135deg, #a8edea, #00008b)" },
    { name: "Lava",     cls: "theme-lava",      grad: "linear-gradient(135deg, #ff0000, #ff8c00)" },
    { name: "Rich",     cls: "theme-rich",      grad: "linear-gradient(135deg, #ffd700, #b8860b)" },
    { name: "Midnight", cls: "theme-midnight",  grad: "linear-gradient(135deg, #c471ed, #12c2e9)" },
    { name: "Aurora",   cls: "theme-aurora",    grad: "linear-gradient(135deg, #43e97b, #38f9d7)" },
    { name: "Rose",     cls: "theme-rose",      grad: "linear-gradient(135deg, #f953c6, #b91d73)" },
    { name: "Sunset",   cls: "theme-sunset",    grad: "linear-gradient(135deg, #f7971e, #ffd200)" },
    { name: "Forest",   cls: "theme-forest",    grad: "linear-gradient(135deg, #56ab2f, #a8e063)" },
    { name: "Neon",     cls: "theme-neon",      grad: "linear-gradient(135deg, #ff00ff, #00ffff)" },
    { name: "Holy",     cls: "theme-holy",      grad: "linear-gradient(135deg, #ffffff, #ffea4b)" },
  ];

  const themesGrid = document.getElementById('themes-grid');
  themeList.forEach(t => {
    const opt = document.createElement('div');
    opt.className = 'theme-option';
    opt.setAttribute('data-theme', t.cls);
    opt.innerHTML = `<div class="theme-preview" style="background:${t.grad};"></div><div class="theme-label">${t.name}</div><div class="theme-check"><i class="fa-solid fa-check"></i></div>`;
    themesGrid.appendChild(opt);
  });

  const savedTheme = localStorage.getItem('uv2-theme') || 'theme-default';
  document.body.classList.add(savedTheme);
  const savedOpt = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
  if (savedOpt) savedOpt.classList.add('selected');

  document.querySelectorAll('.theme-option').forEach(opt => {
    opt.addEventListener('click', () => {
      const cls = opt.getAttribute('data-theme');
      document.body.classList.remove(...themeList.map(t => t.cls));
      document.body.classList.add(cls);
      document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      localStorage.setItem('uv2-theme', cls);
      showNotification(`${opt.querySelector('.theme-label').innerText} theme applied`, 'Theme', 'success');
    });
  });

  document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active-pane'));
      tab.classList.add('active');
      document.getElementById(targetId).classList.add('active-pane');
    });
  });

  const settings = {
    moduleSounds:      localStorage.getItem('uv2-setting-sounds')     !== 'false',
    showNotifications: localStorage.getItem('uv2-setting-notifs')     !== 'false',
    animateUI:         localStorage.getItem('uv2-setting-animation')  !== 'false',
    saving:            localStorage.getItem('uv2-setting-saving')     === 'true',
    autoAfk:           localStorage.getItem('uv2-setting-autoafk')   === 'true',
    afkChat:           localStorage.getItem('uv2-setting-afkchat')   !== 'false',
    showWatermark:     localStorage.getItem('uv2-setting-watermark')  !== 'false',
  };

  if (!settings.showWatermark) watermark.style.display = 'none';

  const soundsToggle    = document.getElementById('uv2-toggle-sounds');
  const notifsToggle    = document.getElementById('uv2-toggle-notifs');
  const watermarkToggle = document.getElementById('uv2-toggle-watermark');
  const animationToggle = document.getElementById('uv2-toggle-animation');
  const savingToggle    = document.getElementById('uv2-toggle-saving');
  const autoAfkToggle   = document.getElementById('uv2-toggle-autoafk');
  const afkChatToggle   = document.getElementById('uv2-toggle-afkchat');
  const afkDelayInput   = document.getElementById('uv2-afkdelay-input');

  if (soundsToggle)    soundsToggle.checked    = settings.moduleSounds;
  if (notifsToggle)    notifsToggle.checked    = settings.showNotifications;
  if (watermarkToggle) watermarkToggle.checked = settings.showWatermark;
  if (animationToggle) animationToggle.checked = settings.animateUI;
  if (savingToggle)    savingToggle.checked    = settings.saving;
  if (autoAfkToggle)   autoAfkToggle.checked   = settings.autoAfk;
  if (afkChatToggle)   afkChatToggle.checked   = settings.afkChat;

  const moduleContainer = document.getElementById('module-container');
  const moduleBindings  = {};
  let isBinding         = false;
  let lastKeyPressTime  = {};
  let uiVisible         = false;
  let uiAnimating       = false;
  let closeUITimeout    = null;
  let isRestoring       = false;

  function playModuleClickSound(turningOn) {
    if (!settings.moduleSounds) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const master = ctx.createGain(); master.gain.value = 0.6; master.connect(ctx.destination);
      if (turningOn) {
        const click = ctx.createOscillator(); click.type = "sine";
        click.frequency.setValueAtTime(80, now); click.frequency.exponentialRampToValueAtTime(40, now + 0.04);
        const cg = ctx.createGain(); cg.gain.setValueAtTime(0.5, now); cg.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        click.connect(cg); cg.connect(master); click.start(now); click.stop(now + 0.05);
        const t1 = ctx.createOscillator(); t1.type = "sine"; t1.frequency.setValueAtTime(520, now + 0.02);
        const g1 = ctx.createGain(); g1.gain.setValueAtTime(0.0, now + 0.02); g1.gain.linearRampToValueAtTime(0.4, now + 0.045); g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
        t1.connect(g1); g1.connect(master); t1.start(now + 0.02); t1.stop(now + 0.14);
        const t2 = ctx.createOscillator(); t2.type = "sine"; t2.frequency.setValueAtTime(880, now + 0.1); t2.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
        const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.0, now + 0.1); g2.gain.linearRampToValueAtTime(0.45, now + 0.13); g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        t2.connect(g2); g2.connect(master); t2.start(now + 0.1); t2.stop(now + 0.3);
      } else {
        const tone = ctx.createOscillator(); tone.type = "sine";
        tone.frequency.setValueAtTime(600, now); tone.frequency.exponentialRampToValueAtTime(280, now + 0.18);
        const gn = ctx.createGain(); gn.gain.setValueAtTime(0.35, now); gn.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        tone.connect(gn); gn.connect(master); tone.start(now); tone.stop(now + 0.22);
      }
      setTimeout(() => ctx.close(), 600);
    } catch(e) {}
  }

  function showModuleNotification(name, isOn) {
    if (!settings.showNotifications) return;
    showNotification(`${name} ${isOn ? 'was turned on' : 'was turned off'}`, 'Module', 'info');
  }

  function showBindPopup(moduleElement, moduleName) {
    const existing = document.querySelector('.bind-popup');
    if (existing) existing.remove();
    const popup = document.createElement("div");
    popup.classList.add("bind-popup");
    document.body.appendChild(popup);
    popup.innerHTML = `
      <h3>Bind Key for ${moduleName}</h3>
      <input type="text" placeholder="Press a key..." id="bind-input">
      <div style="display:flex;gap:10px;justify-content:center;margin-top:10px;">
        <button id="bind-btn">Bind</button>
        <button id="unbind-btn">Unbind</button>
        <button id="close-bind-btn">Close</button>
      </div>
    `;
    const input = popup.querySelector('#bind-input');
    if (moduleBindings[moduleName]) input.value = moduleBindings[moduleName];
    let keyBinding = null;
    input.addEventListener('keydown', e => { e.preventDefault(); keyBinding = e.key; input.value = e.key; });
    popup.querySelector('#bind-btn').addEventListener('click', () => {
      if (keyBinding) { moduleBindings[moduleName] = keyBinding; showNotification(`Bound ${moduleName} to ${keyBinding}`, 'Keybind', 'success'); }
      popup.remove(); isBinding = false;
    });
    popup.querySelector('#unbind-btn').addEventListener('click', () => {
      delete moduleBindings[moduleName]; showNotification(`${moduleName} unbound`, 'Keybind', 'info');
      popup.remove(); isBinding = false;
    });
    popup.querySelector('#close-bind-btn').addEventListener('click', () => { popup.remove(); isBinding = false; });
    const rect = moduleElement.getBoundingClientRect();
    popup.style.top  = `${rect.top  + window.scrollY + rect.height + 10}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.display = "block";
    isBinding = true;
  }

  function createModule(name, description) {
    const card = document.createElement("div");
    card.className = "module-card";
    card.dataset.moduleName = name;
    card._uv2Active = false;
    card.innerHTML = `
      <div class="module-info">
        <span class="module-name">${name}</span>
        <span class="module-separator">|</span>
        <span class="module-desc">${description}</span>
      </div>
      <label class="switch">
        <input type="checkbox" aria-label="Toggle ${name}">
        <span class="slider"></span>
      </label>
    `;
    const toggleInput = card.querySelector('input');
    const setActive = active => {
      card._uv2Active = active;
      toggleInput.checked = active;
      card.style.border = active ? "1px solid #2ecc71" : "1px solid #222";
      if (active) addModuleTag(name); else removeModuleTag(name);
    };
    setActive(false);
    const toggleState = () => {
      const isActive = !card._uv2Active;
      setActive(isActive);
      if (card._onToggle) card._onToggle(isActive);
      if (!isRestoring) {
        if (settings.saving) localStorage.setItem('uv2-module-' + name, isActive ? 'true' : 'false');
        playModuleClickSound(isActive);
        showModuleNotification(name, isActive);
      }
    };
    card.addEventListener("click", e => {
      if (!isBinding && e.target !== toggleInput && !e.target.classList.contains('slider')) toggleState();
    });
    toggleInput.addEventListener("click", e => { e.stopPropagation(); if (!isBinding) toggleState(); });
    card.addEventListener("contextmenu", e => { e.preventDefault(); showBindPopup(card, name); });
    moduleContainer.appendChild(card);
    return card;
  }

  const moduleCards = {};
  const moduleList = [
    { name: "Auto Fullscreen",   desc: "Automatically toggles Fullscreen" },
    { name: "Keystrokes",        desc: "Displays the keys you press in real-time." },
    { name: "FPS Counter",       desc: "Shows the frames per second (FPS) of the game." },
    { name: "CPS Counter",       desc: "Counts how many times you click per second." },
    { name: "Mute Chat",         desc: "Prevents other players messages from appearing in chat." },
    { name: "Ping Counter",      desc: "Shows the latency between your client and the server." },
    { name: "FPS Booster",       desc: "Changes settings to improve FPS (refresh page)" },
    { name: "Anti-Afk",          desc: "Presses WASD on its own to avoid being kicked for being AFK" },
    { name: "Keep Sprint",       desc: "Keeps you sprinting automatically." },
    { name: "Time Display",      desc: "Shows you the time so you dont have to exit full screen." },
    { name: "Music Player",      desc: "Plays music while you play." },
    { name: "Server Translator", desc: "Translates non-English server names to English." },
  ];
  moduleList.forEach(m => { moduleCards[m.name] = createModule(m.name, m.desc); });

  moduleCards["Auto Fullscreen"]._onToggle = isActive => {
    if (isActive) {
      (document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen || document.documentElement.msRequestFullscreen || (() => {})).call(document.documentElement);
    } else {
      (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen || (() => {})).call(document);
    }
  };

  moduleCards["Keystrokes"]._onToggle = isActive => {
    if (isActive) {
      if (document.getElementById('keystrokes-container')) document.getElementById('keystrokes-container').remove();
      const kc = document.createElement('div'); kc.id = 'keystrokes-container';
      kc.style.cssText = 'z-index:10000;width:300px;height:230px;position:fixed;opacity:100%;background-color:transparent;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;user-select:none;';
      const savedL = localStorage.getItem('ks-left'), savedT = localStorage.getItem('ks-top');
      kc.style.left = (savedL ? parseInt(savedL) : window.innerWidth/2) + 'px';
      kc.style.top  = (savedT ? parseInt(savedT) : window.innerHeight/2) + 'px';
      document.body.appendChild(kc);
      let isDragging = false;
      kc.addEventListener('mousedown', e => { if (e.target.nodeName !== 'INPUT') isDragging = true; });
      document.addEventListener('mousemove', e => { if (isDragging) { kc.style.left = e.clientX+'px'; kc.style.top = e.clientY+'px'; localStorage.setItem('ks-left', e.clientX); localStorage.setItem('ks-top', e.clientY); } });
      document.addEventListener('mouseup', () => { isDragging = false; });
      const mkKey = (text, s={}) => {
        const k = document.createElement('div'); k.textContent = text;
        Object.assign(k.style, { position:'absolute', color:'#fff', fontWeight:'bold', borderRadius:'0', backgroundColor:'rgba(128,128,128,0.7)', border:'3px solid #333', fontSize:'18px', height:'50px', width:'50px', textAlign:'center', lineHeight:'50px', fontFamily:'Roboto Mono, monospace', zIndex:'10000', ...s });
        return k;
      };
      const wkey  = mkKey('W',     {top:'0px',  left:'125px'});
      const akey  = mkKey('A',     {top:'55px', left:'70px'});
      const skey  = mkKey('S',     {top:'55px', left:'125px'});
      const dkey  = mkKey('D',     {top:'55px', left:'180px'});
      const lmb   = mkKey('LMB',   {top:'110px',left:'70px', width:'79px'});
      const rmb   = mkKey('RMB',   {top:'110px',left:'150px',width:'79px'});
      const space = mkKey('_____', {top:'170px',left:'70px', width:'160px'});
      kc.append(wkey,akey,skey,dkey,lmb,rmb,space);
      const DOWN = '#8B0000', UP = 'rgba(128,128,128,0.7)';
      document.addEventListener('keydown', e => { if(e.code==='KeyW') wkey.style.backgroundColor=DOWN; if(e.code==='KeyS') skey.style.backgroundColor=DOWN; if(e.code==='KeyA') akey.style.backgroundColor=DOWN; if(e.code==='KeyD') dkey.style.backgroundColor=DOWN; if(e.code==='Space') space.style.backgroundColor=DOWN; });
      document.addEventListener('keyup',   e => { if(e.code==='KeyW') wkey.style.backgroundColor=UP;   if(e.code==='KeyS') skey.style.backgroundColor=UP;   if(e.code==='KeyA') akey.style.backgroundColor=UP;   if(e.code==='KeyD') dkey.style.backgroundColor=UP;   if(e.code==='Space') space.style.backgroundColor=UP; });
      document.addEventListener('mousedown', e => { if(e.button===0) lmb.style.backgroundColor=DOWN; if(e.button===2) rmb.style.backgroundColor=DOWN; });
      document.addEventListener('mouseup',   e => { if(e.button===0) lmb.style.backgroundColor=UP;   if(e.button===2) rmb.style.backgroundColor=UP; });
    } else {
      const kc = document.getElementById('keystrokes-container'); if (kc) kc.remove();
    }
  };

  let isFPSVisible = false, fpsElement = null, lastFrameTime = performance.now(), frameCount = 0;
  moduleCards["FPS Counter"]._onToggle = isActive => {
    isFPSVisible = isActive;
    if (isFPSVisible) {
      fpsElement = document.createElement("div"); fpsElement.id = "fps-counter";
      fpsElement.style.cssText = "position:fixed;top:60px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:99999;cursor:move;user-select:none;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
      const fpsDot = document.createElement("div"); fpsDot.id = "fps-dot"; fpsDot.style.cssText = "width:10px;height:10px;border-radius:50%;background-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,0.9);transition:all 0.3s ease;";
      const fpsVal = document.createElement("div"); fpsVal.id = "fps-value"; fpsVal.textContent = "0 FPS"; fpsVal.style.cssText = "font-size:16px;font-weight:700;color:#fff;letter-spacing:0.5px;transition:color 0.3s ease;";
      fpsElement.appendChild(fpsDot); fpsElement.appendChild(fpsVal); document.body.appendChild(fpsElement);
      let offX=0,offY=0,isDrag=false;
      fpsElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-fpsElement.getBoundingClientRect().left; offY=e.clientY-fpsElement.getBoundingClientRect().top; e.preventDefault(); });
      document.addEventListener("mousemove", e => { if(isDrag){ fpsElement.style.left=`${e.clientX-offX}px`; fpsElement.style.top=`${e.clientY-offY}px`; } });
      document.addEventListener("mouseup", () => { isDrag=false; });
      const updateFPS = () => {
        const now = performance.now(); frameCount++;
        if (now - lastFrameTime >= 1000) {
          const fps = frameCount; const v = document.getElementById("fps-value"); const d = document.getElementById("fps-dot");
          if (v&&d) { v.textContent=`${fps} FPS`; const c=fps>=60?"#4CAF50":fps>=45?"#8BC34A":fps>=30?"#FFC107":fps>=20?"#FF9800":"#F44336"; v.style.color=c; d.style.backgroundColor=c; d.style.boxShadow=`0 0 12px ${c}99`; }
          frameCount = 0; lastFrameTime = now;
        }
        if (isFPSVisible) requestAnimationFrame(updateFPS);
      };
      requestAnimationFrame(updateFPS);
    } else if (fpsElement) { fpsElement.remove(); fpsElement = null; }
  };

  let isMouseActive=false, clickTimes=[], mouseElement=null;
  const strokeColor="#FFFFFF", idleFill="rgba(255,255,255,0.1)", activeFill="rgba(255,255,255,0.8)";
  moduleCards["CPS Counter"]._onToggle = isActive => {
    isMouseActive = isActive;
    if (isMouseActive) {
      if (!mouseElement) {
        mouseElement = document.createElement("div"); mouseElement.id = "mouse-strokes-hud";
        mouseElement.style.cssText = "position:fixed;top:100px;left:20px;padding:10px;z-index:99999;user-select:none;cursor:move;display:flex;flex-direction:column;align-items:center;gap:5px;filter:drop-shadow(0px 0px 8px rgba(0,0,0,0.8));";
        mouseElement.innerHTML = `<svg id="mouse-svg" width="70" height="95" viewBox="0 0 100 140"><path id="m-left" d="M10 40 Q 10 10, 48 10 L 48 65 L 10 65 Z" fill="${idleFill}" stroke="${strokeColor}" stroke-width="6"/><path id="m-right" d="M90 40 Q 90 10, 52 10 L 52 65 L 90 65 Z" fill="${idleFill}" stroke="${strokeColor}" stroke-width="6"/><path d="M10 65 L 90 65 Q 90 130, 50 130 Q 10 130, 10 65" fill="none" stroke="${strokeColor}" stroke-width="6"/><rect x="43" y="22" width="14" height="24" rx="7" fill="${strokeColor}"/></svg><div id="cps-display" style="color:white;font-size:20px;font-weight:900;text-shadow:0 0 10px rgba(0,0,0,1);">0 CPS</div>`;
        document.body.appendChild(mouseElement);
        let isDrag=false,offX,offY;
        mouseElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-mouseElement.getBoundingClientRect().left; offY=e.clientY-mouseElement.getBoundingClientRect().top; });
        document.addEventListener("mousemove", e => { if(isDrag){ mouseElement.style.left=(e.clientX-offX)+"px"; mouseElement.style.top=(e.clientY-offY)+"px"; } });
        document.addEventListener("mouseup", () => isDrag=false);
      }
      const handleInteraction = e => {
        if (e.type==="mousedown") { if(e.button===0) document.getElementById("m-left").setAttribute("fill",activeFill); if(e.button===2) document.getElementById("m-right").setAttribute("fill",activeFill); clickTimes.push(Date.now()); }
        else { if(e.button===0) document.getElementById("m-left").setAttribute("fill",idleFill); if(e.button===2) document.getElementById("m-right").setAttribute("fill",idleFill); }
      };
      document.addEventListener("mousedown", handleInteraction); document.addEventListener("mouseup", handleInteraction);
      document.addEventListener("contextmenu", e => e.preventDefault());
      function updateLoop() {
        const now=Date.now(); clickTimes=clickTimes.filter(t=>now-t<=1000);
        const d=document.getElementById("cps-display"); if(d) d.textContent=`${clickTimes.length} CPS`;
        if(isMouseActive) requestAnimationFrame(updateLoop);
      }
      updateLoop(); moduleCards["CPS Counter"]._handler = handleInteraction;
    } else {
      if (mouseElement) { mouseElement.remove(); mouseElement=null; }
      if (moduleCards["CPS Counter"]._handler) { document.removeEventListener("mousedown",moduleCards["CPS Counter"]._handler); document.removeEventListener("mouseup",moduleCards["CPS Counter"]._handler); }
    }
  };

  let isMuteChatActive=false, originalAddChat=null;
  moduleCards["Mute Chat"]._onToggle = isActive => {
    isMuteChatActive = isActive;
    const reactRoot = document.querySelector("#react"); if (!reactRoot) return;
    try {
      const fiber = Object.values(reactRoot)[0];
      const game = fiber?.updateQueue?.baseState?.element?.props?.game;
      if (game && game.chat) {
        if (isMuteChatActive) { if(!originalAddChat) originalAddChat=game.chat.addChat; game.chat.addChat=function(){}; }
        else { if(originalAddChat) game.chat.addChat=originalAddChat; }
      }
    } catch(e) {}
  };

  let isPingActive=false, pingElement=null, pingInterval=null;
  moduleCards["Ping Counter"]._onToggle = isActive => {
    isPingActive = isActive;
    if (isPingActive) {
      pingElement = document.createElement("div"); pingElement.id="ping-counter";
      pingElement.style.cssText = "position:fixed;top:20px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:10000;cursor:move;user-select:none;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
      const pingDot = document.createElement("div"); pingDot.id="ping-dot"; pingDot.style.cssText="width:10px;height:10px;border-radius:50%;background-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,0.9);transition:all 0.3s ease;";
      const pingVal = document.createElement("div"); pingVal.id="ping-value"; pingVal.textContent="--- ms"; pingVal.style.cssText="font-size:16px;font-weight:700;color:#fff;letter-spacing:0.5px;transition:color 0.3s ease;";
      pingElement.appendChild(pingDot); pingElement.appendChild(pingVal); document.body.appendChild(pingElement);
      let isDrag=false,offX=0,offY=0;
      pingElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-pingElement.getBoundingClientRect().left; offY=e.clientY-pingElement.getBoundingClientRect().top; e.preventDefault(); });
      document.addEventListener("mousemove", e => { if(isDrag){ pingElement.style.left=`${e.clientX-offX}px`; pingElement.style.top=`${e.clientY-offY}px`; } });
      document.addEventListener("mouseup", () => { isDrag=false; });
      const updatePing = () => {
        const start=Date.now();
        fetch(window.location.href,{method:'HEAD',cache:"no-cache"}).then(()=>{
          const ping=Date.now()-start; const v=document.getElementById("ping-value"); const d=document.getElementById("ping-dot");
          if(v&&d){ v.textContent=`${ping} ms`; const c=ping<50?"#4CAF50":ping<100?"#8BC34A":ping<150?"#FFC107":ping<200?"#FF9800":"#F44336"; v.style.color=c; d.style.backgroundColor=c; d.style.boxShadow=`0 0 12px ${c}99`; }
        }).catch(()=>{ const v=document.getElementById("ping-value"); const d=document.getElementById("ping-dot"); if(v&&d){ v.textContent="N/A"; v.style.color="#9E9E9E"; d.style.backgroundColor="#9E9E9E"; } });
      };
      updatePing(); pingInterval=setInterval(updatePing,1000);
    } else { if(pingElement){ pingElement.remove(); pingElement=null; } clearInterval(pingInterval); }
  };

  let isAntiAfkActive=false, antiAfkInterval=null, antiAfkBox=null;
  moduleCards["Anti-Afk"]._onToggle = isActive => {
    isAntiAfkActive = isActive;
    if (isAntiAfkActive) {
      antiAfkBox = document.createElement("div"); antiAfkBox.id="anti-afk-counter";
      antiAfkBox.style.cssText = "position:fixed;top:100px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:9999;cursor:move;user-select:none;font-family:'Segoe UI',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
      const afkDot = document.createElement("div"); afkDot.style.cssText="width:10px;height:10px;border-radius:50%;background-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,0.9);animation:afkPulse 1.5s infinite;";
      const afkTxt = document.createElement("div"); afkTxt.textContent="Anti-AFK"; afkTxt.style.cssText="font-size:16px;font-weight:700;color:#4CAF50;letter-spacing:0.5px;";
      antiAfkBox.appendChild(afkDot); antiAfkBox.appendChild(afkTxt); document.body.appendChild(antiAfkBox);
      let isDrag=false,offX=0,offY=0;
      antiAfkBox.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-antiAfkBox.getBoundingClientRect().left; offY=e.clientY-antiAfkBox.getBoundingClientRect().top; e.preventDefault(); });
      document.addEventListener("mousemove", e => { if(isDrag){ antiAfkBox.style.left=`${e.clientX-offX}px`; antiAfkBox.style.top=`${e.clientY-offY}px`; } });
      document.addEventListener("mouseup", () => { isDrag=false; });
      const keys=[['w','KeyW',87],['a','KeyA',65],['s','KeyS',83],['d','KeyD',68],[' ','Space',32]]; let idx=0;
      antiAfkInterval = setInterval(() => {
        const [key,code,keyCode]=keys[idx]; idx=(idx+1)%keys.length;
        const t=document.activeElement||document.body;
        t.dispatchEvent(new KeyboardEvent('keydown',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true}));
        setTimeout(()=>t.dispatchEvent(new KeyboardEvent('keyup',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true})),50);
      },500);
    } else { if(antiAfkInterval) clearInterval(antiAfkInterval); if(antiAfkBox) antiAfkBox.remove(); }
  };

  let isTimeVisible=false, timeElement=null;
  moduleCards["Time Display"]._onToggle = isActive => {
    isTimeVisible = isActive;
    if (isTimeVisible) {
      timeElement = document.createElement("div"); timeElement.id="fullscreen-clock";
      timeElement.style.cssText = "position:fixed;bottom:20px;right:20px;background-color:rgba(0,0,0,0.7);color:white;padding:10px 15px;border-radius:8px;font-size:18px;font-family:monospace;z-index:99999;cursor:move;";
      let isDrag=false,offX=0,offY=0;
      timeElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-timeElement.getBoundingClientRect().left; offY=e.clientY-timeElement.getBoundingClientRect().top; e.preventDefault(); });
      document.addEventListener("mousemove", e => { if(isDrag){ timeElement.style.left=`${e.clientX-offX}px`; timeElement.style.top=`${e.clientY-offY}px`; timeElement.style.bottom="auto"; timeElement.style.right="auto"; } });
      document.addEventListener("mouseup", () => { isDrag=false; });
      document.body.appendChild(timeElement);
      const updateClock = () => { if(timeElement) timeElement.textContent = new Date().toLocaleTimeString(); };
      updateClock(); timeElement._interval = setInterval(updateClock,1000);
    } else if (timeElement) { clearInterval(timeElement._interval); timeElement.remove(); timeElement=null; }
  };

  let musicPlayerEl=null, musicAudio=null, musicIsPlaying=false, isMusicPlayerActive=false;
  const JAMENDO_KEY = "0c5e9d9e";
  function jamendoSearch(query) {
    return new Promise((resolve,reject) => {
      GM_xmlhttpRequest({
        method:"GET",
        url:`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_KEY}&format=json&limit=10&search=${encodeURIComponent(query)}&include=musicinfo`,
        timeout:8000,
        onload(r){ try{ resolve(JSON.parse(r.responseText).results||[]); }catch(e){ reject(e); } },
        onerror(){ reject(new Error("Network error")); },
        ontimeout(){ reject(new Error("Timeout")); }
      });
    });
  }
  moduleCards["Music Player"]._onToggle = isActive => {
    isMusicPlayerActive = isActive;
    if (isMusicPlayerActive) {
      musicPlayerEl = document.createElement("div"); musicPlayerEl.id="unverified-music-player";
      musicPlayerEl.innerHTML = `
        <div class="mp-topbar"><span class="mp-topbar-name">UV2</span><button class="mp-topbar-close" id="mp-close">&#x2715;</button></div>
        <div class="mp-nowplaying"><img class="mp-art" id="mp-album-art" src="" alt=""/><div class="mp-info"><div class="mp-title" id="mp-song-title">nothing playing</div><div class="mp-sub" id="mp-artist">—</div></div></div>
        <div class="mp-bar"><div class="mp-bar-fill" id="mp-progress-bar"></div></div>
        <div class="mp-btns"><button class="mp-btn" id="mp-prev-btn">&#9664;&#9664;</button><button class="mp-btn active" id="mp-play-btn">&#9654;</button><button class="mp-btn" id="mp-stop-btn">&#9632;</button></div>
        <div class="mp-vol"><span class="mp-vol-lbl">VOL</span><input class="mp-vol-slider" id="mp-volume" type="range" min="0" max="100" value="70"/><span class="mp-vol-pct" id="mp-vol-label">70%</span></div>
        <div class="mp-search-wrap"><input class="mp-search-in" id="mp-search-input" type="text" placeholder="search a song..." autocomplete="off" spellcheck="false"/><button class="mp-search-go" id="mp-search-btn">GO</button></div>
        <div class="mp-search-wrap" style="border-top:none;padding-top:0;"><input class="mp-search-in" id="mp-url-input" type="text" placeholder="or paste audio url (.mp3, .ogg...)" autocomplete="off" spellcheck="false"/><button class="mp-search-go" id="mp-url-btn">PLAY</button></div>
        <div class="mp-results" id="mp-results" style="display:none;"></div>`;
      document.body.appendChild(musicPlayerEl);
      const playBtn=musicPlayerEl.querySelector("#mp-play-btn"), stopBtn=musicPlayerEl.querySelector("#mp-stop-btn"), prevBtn=musicPlayerEl.querySelector("#mp-prev-btn");
      const volSlider=musicPlayerEl.querySelector("#mp-volume"), volLabel=musicPlayerEl.querySelector("#mp-vol-label");
      const songTitle=musicPlayerEl.querySelector("#mp-song-title"), artistEl=musicPlayerEl.querySelector("#mp-artist");
      const progressBar=musicPlayerEl.querySelector("#mp-progress-bar"), header=musicPlayerEl.querySelector(".mp-topbar"), albumArt=musicPlayerEl.querySelector("#mp-album-art");
      const searchInput=musicPlayerEl.querySelector("#mp-search-input"), searchBtn=musicPlayerEl.querySelector("#mp-search-btn"), resultsBox=musicPlayerEl.querySelector("#mp-results");
      const urlInput=musicPlayerEl.querySelector("#mp-url-input"), urlBtn=musicPlayerEl.querySelector("#mp-url-btn");
      musicPlayerEl.querySelector("#mp-close").addEventListener("click",()=>{
        if(musicAudio){musicAudio.pause();musicAudio.src="";musicAudio=null;}
        musicIsPlaying=false;isMusicPlayerActive=false;musicPlayerEl.remove();musicPlayerEl=null;
        const toggle=moduleCards["Music Player"].querySelector('input');
        if(toggle&&toggle.checked){ moduleCards["Music Player"].querySelector('.slider').click(); }
      });
      let isDrag=false,offX=0,offY=0;
      header.addEventListener("mousedown",e=>{isDrag=true;offX=e.clientX-musicPlayerEl.getBoundingClientRect().left;offY=e.clientY-musicPlayerEl.getBoundingClientRect().top;e.preventDefault();});
      document.addEventListener("mousemove",e=>{if(!isDrag)return;musicPlayerEl.style.left=(e.clientX-offX)+"px";musicPlayerEl.style.top=(e.clientY-offY)+"px";musicPlayerEl.style.bottom="auto";});
      document.addEventListener("mouseup",()=>{isDrag=false;});
      function loadAudioSrc(src,title,artist,imageUrl){
        if(musicAudio){musicAudio.pause();musicAudio.src="";musicAudio=null;}
        musicIsPlaying=false;playBtn.innerHTML="&#9654;";
        songTitle.textContent=title||src;artistEl.textContent=artist||"—";albumArt.src=imageUrl||"";
        musicAudio=new Audio();musicAudio.crossOrigin="anonymous";musicAudio.volume=volSlider.value/100;musicAudio.src=src;
        musicAudio.addEventListener("timeupdate",()=>{if(musicAudio.duration)progressBar.style.width=((musicAudio.currentTime/musicAudio.duration)*100).toFixed(2)+"%";});
        musicAudio.addEventListener("ended",()=>{playBtn.innerHTML="&#9654;";musicIsPlaying=false;});
        musicAudio.addEventListener("error",()=>{songTitle.textContent="failed to load";playBtn.innerHTML="&#9654;";musicIsPlaying=false;});
        musicAudio.play().then(()=>{playBtn.innerHTML="&#9646;&#9646;";musicIsPlaying=true;}).catch(()=>{});
      }
      async function doSearch(){
        const q=searchInput.value.trim();if(!q)return;
        resultsBox.innerHTML=`<div class="mp-msg">searching...</div>`;resultsBox.style.display="block";
        let tracks;try{tracks=await jamendoSearch(q);}catch(e){tracks=[];}
        resultsBox.innerHTML="";
        if(!tracks.length){resultsBox.innerHTML=`<div class="mp-msg">nothing found</div>`;return;}
        tracks.forEach(track=>{
          const row=document.createElement("div");row.className="mp-result";
          row.innerHTML=`<img class="mp-result-img" src="${track.image||""}" alt="" loading="lazy"/><div class="mp-result-info"><div class="mp-result-name">${track.name}</div><div class="mp-result-by">${track.artist_name}</div></div>`;
          row.addEventListener("click",()=>{resultsBox.style.display="none";resultsBox.innerHTML="";loadAudioSrc(`https://prod-1.storage.jamendo.com/?trackid=${track.id}&format=mp31&from=app-97dab294`,track.name,track.artist_name,track.image||null);});
          resultsBox.appendChild(row);
        });
      }
      function playFromUrl(){
        const raw=urlInput.value.trim();if(!raw)return;
        resultsBox.innerHTML="";
        const prev=document.createElement("div");prev.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid #161616;background:#111;";
        const icon=document.createElement("div");icon.style.cssText="width:32px;height:32px;flex-shrink:0;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:18px;color:#e74c3c;";icon.textContent="♪";
        const info=document.createElement("div");info.style.cssText="flex:1;min-width:0;";
        const name=document.createElement("div");name.style.cssText="font-size:10px;color:#bbb;font-family:MinibloxFont,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";name.textContent=raw.split("/").pop().split("?")[0]||"audio file";
        const sub=document.createElement("div");sub.style.cssText="font-size:9px;color:#333;margin-top:2px;font-family:MinibloxFont,sans-serif;";sub.textContent="direct url";
        info.appendChild(name);info.appendChild(sub);prev.appendChild(icon);prev.appendChild(info);
        resultsBox.style.display="block";resultsBox.appendChild(prev);
        loadAudioSrc(raw,name.textContent,"direct url",null);
      }
      searchBtn.addEventListener("click",doSearch);
      urlBtn.addEventListener("click",playFromUrl);
      urlInput.addEventListener("keydown",e=>{e.stopPropagation();if(e.key==="Enter")playFromUrl();if(e.key==="Escape")resultsBox.style.display="none";});
      urlInput.addEventListener("keyup",e=>e.stopPropagation());urlInput.addEventListener("keypress",e=>e.stopPropagation());
      searchInput.addEventListener("keydown",e=>{e.stopPropagation();if(e.key==="Enter")doSearch();if(e.key==="Escape")resultsBox.style.display="none";});
      searchInput.addEventListener("keyup",e=>e.stopPropagation());searchInput.addEventListener("keypress",e=>e.stopPropagation());
      playBtn.addEventListener("click",()=>{if(!musicAudio)return;if(musicIsPlaying){musicAudio.pause();playBtn.innerHTML="&#9654;";musicIsPlaying=false;}else{musicAudio.play();playBtn.innerHTML="&#9646;&#9646;";musicIsPlaying=true;}});
      stopBtn.addEventListener("click",()=>{if(musicAudio){musicAudio.pause();musicAudio.src="";musicAudio=null;}musicIsPlaying=false;playBtn.innerHTML="&#9654;";songTitle.textContent="nothing playing";artistEl.textContent="—";albumArt.src="";progressBar.style.width="0%";});
      prevBtn.addEventListener("click",()=>{if(musicAudio){musicAudio.currentTime=0;if(!musicIsPlaying){musicAudio.play();playBtn.innerHTML="&#9646;&#9646;";musicIsPlaying=true;}}});
      volSlider.addEventListener("input",()=>{const v=parseInt(volSlider.value,10);volLabel.textContent=v+"%";if(musicAudio)musicAudio.volume=v/100;});
    } else {
      if(musicAudio){musicAudio.pause();musicAudio.src="";musicAudio=null;}
      if(musicPlayerEl){musicPlayerEl.remove();musicPlayerEl=null;}
      musicIsPlaying=false;
    }
  };

  moduleCards["Server Translator"]._onToggle = isActive => {
    const active = isActive;
    if (active) {
      async function detectAndTranslate(text) {
        try {
          const res=await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
          const data=await res.json(); return {translated:data[0].map(x=>x[0]).join(''),detectedLang:data[2]};
        } catch {
          try {
            const res=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|en`);
            const data=await res.json(); return {translated:data.responseData.translatedText,detectedLang:'unknown'};
          } catch { return {translated:text,detectedLang:'en'}; }
        }
      }
      async function processElement(el) {
        if(el.dataset.uvTranslate) return;
        const text=el.textContent.trim();
        if(!text||text.length<2||!/[^\x00-\x7F\s]/.test(text)) return;
        el.dataset.uvTranslate='true';
        const {detectedLang}=await detectAndTranslate(text);
        if(detectedLang==='en') return;
        const original=text;
        const btn=document.createElement('button');
        btn.textContent='Translate';
        btn.style.cssText='margin-left:8px;background:#e74c3c;color:white;border:none;border-radius:5px;padding:3px 10px;cursor:pointer;font-size:13px;font-weight:bold;font-family:MinibloxFont,sans-serif;vertical-align:middle;';
        btn.onclick=async e=>{
          e.stopPropagation();btn.textContent='...';btn.disabled=true;
          const {translated}=await detectAndTranslate(original);
          el.textContent=`${translated} (${original})`;
          const unBtn=document.createElement('button');
          unBtn.textContent='Untranslate';
          unBtn.style.cssText='margin-left:8px;background:#7b3f3f;color:white;border:none;border-radius:5px;padding:3px 10px;cursor:pointer;font-size:13px;font-weight:bold;font-family:MinibloxFont,sans-serif;vertical-align:middle;';
          unBtn.onclick=e=>{e.stopPropagation();el.textContent=original;unBtn.remove();el.parentElement?.appendChild(btn);btn.textContent='Translate';btn.disabled=false;};
          btn.remove();el.parentElement?.appendChild(unBtn);
        };
        el.parentElement?.appendChild(btn);
      }
      moduleCards["Server Translator"]._observer=new MutationObserver(mutations=>{
        mutations.forEach(m=>{m.addedNodes.forEach(n=>{
          if(n.nodeType!==1)return;
          if(n.children.length===0)processElement(n);
          else n.querySelectorAll('*').forEach(el=>{if(el.children.length===0)processElement(el);});
        });});
      });
      moduleCards["Server Translator"]._observer.observe(document.body,{childList:true,subtree:true});
      document.querySelectorAll('*').forEach(el=>{if(el.children.length===0)processElement(el);});
    } else {
      if(moduleCards["Server Translator"]._observer){moduleCards["Server Translator"]._observer.disconnect();moduleCards["Server Translator"]._observer=null;}
      document.querySelectorAll('[data-uv-translate]').forEach(el=>{delete el.dataset.uvTranslate;});
    }
  };

  moduleCards["Keep Sprint"]._onToggle = isActive => {
  if (isActive) {
    moduleCards["Keep Sprint"]._handler = e => {
      if (!['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) return;
      const t = document.activeElement || document.body;
      t.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift', code: 'ShiftLeft', keyCode: 16, which: 16, location: 1, bubbles: true, cancelable: true }));
    };
    document.addEventListener('keydown', moduleCards["Keep Sprint"]._handler);
  } else {
    if (moduleCards["Keep Sprint"]._handler) {
      document.removeEventListener('keydown', moduleCards["Keep Sprint"]._handler);
      moduleCards["Keep Sprint"]._handler = null;
    }
  }
};

  function openUI() {
    ui.style.display = "block";
    if (settings.animateUI) { ui.classList.remove("uv2-animate-in","uv2-animate-out"); void ui.offsetWidth; ui.classList.add("uv2-animate-in"); }
  }
  function closeUI() {
    if (closeUITimeout) { clearTimeout(closeUITimeout); closeUITimeout=null; }
    if (settings.animateUI) {
      uiAnimating=true; ui.classList.remove("uv2-animate-in"); void ui.offsetWidth; ui.classList.add("uv2-animate-out");
      closeUITimeout=setTimeout(()=>{ ui.style.display="none"; ui.classList.remove("uv2-animate-out"); uiAnimating=false; closeUITimeout=null; },180);
    } else { ui.classList.remove("uv2-animate-in","uv2-animate-out"); ui.style.display="none"; uiAnimating=false; }
  }
  function toggleUI() {
    if (uiAnimating) return;
    if (uiVisible) { closeUI(); uiVisible=false; } else { openUI(); uiVisible=true; }
  }

  document.addEventListener("keydown", event => {
    if (event.key==="Shift" && event.location===2) toggleUI();
    for (let moduleName in moduleBindings) {
      if (moduleBindings[moduleName]===event.key) {
        const now=Date.now();
        if (!lastKeyPressTime[moduleName]||now-lastKeyPressTime[moduleName]>200) {
          const mc=document.querySelector(`.module-card[data-module-name="${moduleName}"]`);
          if(mc){const ti=mc.querySelector('input');if(ti)ti.click();}
          lastKeyPressTime[moduleName]=now;
        }
      }
    }
  });

  function restoreModuleStates() {
    if (!settings.saving) return;
    isRestoring=true;
    document.querySelectorAll('.module-card').forEach(mc=>{
      const n=mc.dataset.moduleName; if(!n)return;
      const val=localStorage.getItem('uv2-module-'+n);
      const ti=mc.querySelector('input');
      if(val==='true'&&!mc._uv2Active&&ti) ti.click();
      else if(val==='false'&&mc._uv2Active&&ti) ti.click();
    });
    isRestoring=false;
  }
  setTimeout(restoreModuleStates,3400);

  let afkTimer=null, afkTriggered=false, afkAntiAfkWasOff=false, afkGraceUntil=0;
  let afkDelay=parseInt(localStorage.getItem('uv2-setting-afkdelay')||'10',10);
  if(isNaN(afkDelay)||afkDelay<5) afkDelay=5;
  if(afkDelay>120) afkDelay=120;
  if(afkDelayInput) afkDelayInput.value=afkDelay;

  function showAfkToast() {
    const ex=document.getElementById('uv2-afk-toast');if(ex)ex.remove();
    const t=document.createElement('div');t.id='uv2-afk-toast';t.textContent='You are idle, Anti-AFK enabled.';
    Object.assign(t.style,{position:'fixed',top:'-60px',left:'50%',transform:'translateX(-50%)',background:'#e74c3c',color:'#fff',padding:'10px 22px',borderRadius:'8px',fontSize:'15px',fontFamily:'MinibloxFont,sans-serif',zIndex:'99999',transition:'top 0.5s ease,opacity 0.5s ease',opacity:'0',whiteSpace:'nowrap',boxShadow:'0 4px 16px rgba(0,0,0,0.5)'});
    document.body.appendChild(t);
    setTimeout(()=>{t.style.top='18px';t.style.opacity='1';},20);
    setTimeout(()=>{t.style.top='-60px';t.style.opacity='0';},3500);
    setTimeout(()=>{if(t.parentNode)t.remove();},4200);
  }
  function showReturnToast() {
    const ex=document.getElementById('uv2-return-toast');if(ex)ex.remove();
    const t=document.createElement('div');t.id='uv2-return-toast';t.textContent='Welcome back, Anti-AFK disabled.';
    Object.assign(t.style,{position:'fixed',top:'-60px',left:'50%',transform:'translateX(-50%)',background:'#2ecc71',color:'#fff',padding:'10px 22px',borderRadius:'8px',fontSize:'15px',fontFamily:'MinibloxFont,sans-serif',zIndex:'99999',transition:'top 0.5s ease,opacity 0.5s ease',opacity:'0',whiteSpace:'nowrap',boxShadow:'0 4px 16px rgba(0,0,0,0.5)'});
    document.body.appendChild(t);
    setTimeout(()=>{t.style.top='18px';t.style.opacity='1';},20);
    setTimeout(()=>{t.style.top='-60px';t.style.opacity='0';},3500);
    setTimeout(()=>{if(t.parentNode)t.remove();},4200);
  }
  function sendAfkChatMessage(msg) {
    try {
      const inputs=document.querySelectorAll("input"); let chatInput=null;
      inputs.forEach(i=>{if(i.placeholder&&i.placeholder.toLowerCase().includes('chat'))chatInput=i;});
      if(chatInput){
        const pk=Object.keys(chatInput).find(k=>k.startsWith("__reactProps")||k.startsWith("__reactFiber"));
        if(pk){const p=chatInput[pk];const rp=p&&p.memoizedProps?p.memoizedProps:p;if(rp&&rp.onChange){rp.onChange({target:{value:msg}});setTimeout(()=>{if(rp.onKeyDown)rp.onKeyDown({key:'Enter',keyCode:13,which:13,bubbles:true,preventDefault:()=>{}});},300);return;}}
      }
    } catch(e){}
    try {
      const reactRoot=document.querySelector("#react");if(!reactRoot)return;
      const fiber=Object.values(reactRoot)[0];
      const game=fiber&&fiber.updateQueue&&fiber.updateQueue.baseState&&fiber.updateQueue.baseState.element&&fiber.updateQueue.baseState.element.props&&fiber.updateQueue.baseState.element.props.game;
      if(game&&game.chat&&typeof game.chat.addChat==="function")game.chat.addChat({text:msg});
    } catch(e){}
  }
  function onAfkTriggered() {
    if(afkTriggered)return;afkTriggered=true;afkGraceUntil=Date.now()+2000;showAfkToast();
    if(settings.afkChat)sendAfkChatMessage("I'm currently AFK, This Is An Auto Message, Please Hold On.");
    const afkMod=moduleCards["Anti-Afk"];
    if(afkMod&&!afkMod._uv2Active){afkAntiAfkWasOff=true;const ti=afkMod.querySelector('input');if(ti)ti.click();}
    else afkAntiAfkWasOff=false;
  }
  function onUserReturn() {
    if(!afkTriggered)return;afkTriggered=false;
    if(afkAntiAfkWasOff){const afkMod=moduleCards["Anti-Afk"];if(afkMod&&afkMod._uv2Active){const ti=afkMod.querySelector('input');if(ti)ti.click();showReturnToast();}afkAntiAfkWasOff=false;}
  }
  function _afkActivityHandler(e) {
    if(!settings.autoAfk||!e.isTrusted||Date.now()<afkGraceUntil)return;
    onUserReturn();clearTimeout(afkTimer);afkTimer=setTimeout(onAfkTriggered,afkDelay*1000);
  }
  const _afkEvents=['mousemove','keydown','mousedown','wheel'];
  function startAfkDetector(){_afkEvents.forEach(evt=>window.addEventListener(evt,_afkActivityHandler));clearTimeout(afkTimer);afkTimer=setTimeout(onAfkTriggered,afkDelay*1000);}
  function stopAfkDetector(){
    _afkEvents.forEach(evt=>window.removeEventListener(evt,_afkActivityHandler));clearTimeout(afkTimer);afkTimer=null;
    if(afkTriggered){afkTriggered=false;if(afkAntiAfkWasOff){const m=moduleCards["Anti-Afk"];if(m&&m._uv2Active){const ti=m.querySelector('input');if(ti)ti.click();}afkAntiAfkWasOff=false;}}
  }
  if(settings.autoAfk)startAfkDetector();

  if(soundsToggle)    soundsToggle.addEventListener('change',    function(){settings.moduleSounds=this.checked;localStorage.setItem('uv2-setting-sounds',this.checked);});
  if(notifsToggle)    notifsToggle.addEventListener('change',    function(){settings.showNotifications=this.checked;localStorage.setItem('uv2-setting-notifs',this.checked);});
  if(watermarkToggle) watermarkToggle.addEventListener('change', function(){settings.showWatermark=this.checked;watermark.style.display=this.checked?'':'none';localStorage.setItem('uv2-setting-watermark',this.checked?'true':'false');});
  if(animationToggle) animationToggle.addEventListener('change', function(){settings.animateUI=this.checked;localStorage.setItem('uv2-setting-animation',this.checked);});
  if(savingToggle)    savingToggle.addEventListener('change',    function(){settings.saving=this.checked;localStorage.setItem('uv2-setting-saving',this.checked?'true':'false');});
  if(autoAfkToggle)   autoAfkToggle.addEventListener('change',  function(){settings.autoAfk=this.checked;localStorage.setItem('uv2-setting-autoafk',this.checked?'true':'false');if(this.checked)startAfkDetector();else stopAfkDetector();});
  if(afkChatToggle)   afkChatToggle.addEventListener('change',  function(){settings.afkChat=this.checked;localStorage.setItem('uv2-setting-afkchat',this.checked);});
  if(afkDelayInput)   afkDelayInput.addEventListener('change',  function(){let v=parseInt(this.value,10);if(isNaN(v)||v<5)v=5;if(v>120)v=120;this.value=v;afkDelay=v;localStorage.setItem('uv2-setting-afkdelay',afkDelay);if(settings.autoAfk){clearTimeout(afkTimer);afkTimer=setTimeout(onAfkTriggered,afkDelay*1000);}});

  ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach(evt=>{
    document.addEventListener(evt,()=>{
      const isFS=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement;
      ui.style.maxHeight=isFS?"95vh":"95vh";ui.style.padding=isFS?"0":"0";
    });
  });
})();

(function(){
  'use strict';
  window.requestAnimationFrame=function(callback){return setTimeout(function(){callback(performance.now());},0);};
})();
