// ==UserScript==
// @name         UnverifiedV2
// @namespace    http://tampermonkey.net/
// @version      2.0.7
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
// @connect      cdnjs.cloudflare.com
// ==/UserScript==

class LurkerChecker {
  static lurkerInstalled() {
    return document.getElementById('_L7Banner') !== null;
  }
}
class UnverifiedIntro {
  constructor() {
    this.container = document.createElement("div");
    Object.assign(this.container.style, {
      position: "fixed",
      top: 0, left: 0, width: "100vw", height: "100vh",
      display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
      backgroundColor: "black",
      overflow: "hidden", zIndex: 9999,
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
            if (node.matches(selector)) this.visuallyRemove(node);
            node.querySelectorAll(selector).forEach(e => this.visuallyRemove(node));
          }
          for (const selector of this.backgroundSelectors) {
            if (node.matches(selector)) this.background.setBG(node);
            node.querySelectorAll(selector).forEach(e => this.background.setBG());
          }
          for (const selector of this.generalStylingSelectors) {
            if (node.matches(selector)) this.applyGeneralStyle(node, selector);
            node.querySelectorAll(selector).forEach(e => this.applyGeneralStyle(e, selector));
          }
          for (const selector of this.specificStylingSelectors.keys()) {
            if (node.matches(selector)) this.applySpecificStyle(node, selector);
            node.querySelectorAll(selector).forEach(e => this.applySpecificStyle(e, selector));
          }
          if (this.isMainScreen()) { this.shortcutMenu.addShortcutMenu(); this.banner.addBanner(); }
          else { this.shortcutMenu.removeShortcutMenu(); this.banner.removeBanner(); }
          for (const selector of this.blackBackgroundSelectors) {
            if (node.matches(selector)) this.removeBlackBackground(node);
            node.querySelectorAll(selector).forEach(e => this.removeBlackBackground(e));
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
    e.style.color = 'white'; e.style.border = '1px solid #D3D3D3'; e.style.borderRadius = '8px';
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
    this.e.style.color = 'white'; this.e.style.border = '1px solid #D3D3D3'; this.e.style.borderRadius = '8px';
    this.e.style.fontSize = '24px'; this.e.style.cursor = 'pointer';
    this.e.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
    this.e.style.outline = 'none'; this.e.style.boxShadow = 'none';
    this.e.addEventListener('mouseover', () => { this.e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)'; this.e.style.top = "11.5%"; this.e.style.left = "50%"; });
    this.e.addEventListener('mouseout', () => { this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)'; this.e.style.top = "11.5%"; this.e.style.left = "50%"; });
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
      padding: "20px", borderRadius: "8px", display: "flex", flexDirection: "row",
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
    #uv2-main-ui.uv2-animate-in {
      animation: uv2UIOpen 0.22s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    #uv2-main-ui.uv2-animate-out {
      animation: uv2UIClose 0.18s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    }
    @keyframes uv2-title-spin {
      0%   { transform: rotate(0deg) scale(1); }
      40%  { transform: rotate(380deg) scale(1.18); }
      70%  { transform: rotate(350deg) scale(1.12); }
      100% { transform: rotate(360deg) scale(1); }
    }
    @keyframes uv2-title-sweep {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes notificationProgress {
      0% { width: 100%; }
      100% { width: 0%; }
    }
    .bind-popup { position:absolute; background-color:#2c3e50; color:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.7); z-index:10001; font-family:'MinibloxFont',sans-serif; display:none; text-align:center; }
    .bind-popup input { background-color:#34495e; color:white; border:2px solid #e74c3c; border-radius:5px; padding:10px; font-size:18px; width:200px; }
    .bind-popup button { background-color:#e74c3c; color:white; border:none; border-radius:5px; padding:10px 20px; margin-top:10px; cursor:pointer; }
    .bind-popup button:hover { background-color:#c0392b; }
    .module-tooltip { visibility:hidden; position:absolute; background-color:#2c3e50; color:white; padding:5px 10px; border-radius:5px; font-size:14px; z-index:10000; opacity:0; transition:opacity 0.3s ease; }
    .initialized-notification { font-family:'MinibloxFont',sans-serif; font-size:20px; color:#e74c3c; position:absolute; top:-50px; left:50%; transform:translateX(-50%); padding:10px 20px; background-color:black; border:1px solid white; border-radius:10px; z-index:10000; opacity:0; transition:top 1s ease,opacity 1s ease; }
    .other-notification { font-family:'MinibloxFont',sans-serif; font-size:14px; color:white; background:linear-gradient(135deg, #e74c3c, #c0392b); padding:12px 24px; border-radius:8px; margin-bottom:12px; box-shadow:0 4px 15px rgba(0,0,0,0.3); transition:opacity 0.4s ease, transform 0.4s ease; opacity:0; transform:translateX(100%); border-left:4px solid #ffcc00; font-weight:500; letter-spacing:0.5px; position:relative; overflow:hidden; }
    .notification-progress { position:absolute; bottom:0; left:0; height:3px; background:#ffcc00; width:100%; animation: notificationProgress 3s linear forwards; }
    .settings-icon { width:30px; height:30px; fill:white; transition:transform 0.3s ease; }
    .settings-icon:hover { transform:rotate(90deg); }
    #uv2-sidebar { box-sizing:border-box; }
    #uv2-page-settings-content { box-sizing:border-box; }
    #uv2-settings-panel { width:100% !important; height:100% !important; max-height:none !important; border-radius:0 !important; border:none !important; box-shadow:none !important; background:#000000 !important; }
    #uv2-settings-titlebar { background:#000000 !important; border-bottom:1px solid rgba(255,255,255,0.07) !important; }
    #uv2-settings-overlay { display:none !important; }
    #uv2-settings-panel { width:560px; max-height:80vh; background:#202020; border-radius:10px; border:1px solid #3a3a3a; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.7); font-family:'Segoe UI',sans-serif; color:#fff; }
    #uv2-settings-titlebar { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#000000; border-bottom:1px solid #2d2d2d; }
    #uv2-settings-titlebar span { font-size:15px; font-weight:600; display:flex; align-items:center; gap:8px; }
    #uv2-settings-titlebar span svg { fill:#e74c3c; }
    #uv2-settings-close { background:none; border:none; color:#aaa; font-size:20px; cursor:pointer; line-height:1; padding:2px 6px; border-radius:4px; transition:background 0.2s,color 0.2s; }
    #uv2-settings-close:hover { background:#e74c3c; color:#fff; }
    #uv2-settings-body { display:flex; flex:1; overflow:hidden; }
    #uv2-settings-nav { display:none; }
    #uv2-settings-content { flex:1; overflow-y:auto; padding:16px 20px; }
    .uv2-settings-page { display:block; }
    .uv2-settings-page + .uv2-settings-page { border-top:1px solid rgba(255,255,255,0.08); margin-top:16px; padding-top:4px; }
    .uv2-section-title { font-size:10px; text-transform:uppercase; letter-spacing:0.1em; color:#555; margin:16px 0 8px; padding-left:4px; }
    .uv2-setting-row { display:flex; align-items:center; height:52px; padding:0 16px; border-radius:8px; background:linear-gradient(135deg,#222222,#191919); border:1px solid rgba(255,255,255,0.07); margin-bottom:8px; box-shadow:0 1px 4px rgba(0,0,0,0.35); transition:background 0.15s ease; box-sizing:border-box; border-bottom:1px solid rgba(255,255,255,0.07); }
    .uv2-setting-row:last-child { margin-bottom:0; }
    .uv2-setting-row:hover { background:linear-gradient(135deg,#2a2a2a,#202020); }
    .uv2-setting-row > div:first-child { display:flex; align-items:center; flex:1; min-width:0; }
    .uv2-setting-label { font-size:13px; color:#ccc; min-width:155px; flex-shrink:0; padding-right:16px; border-right:1px solid rgba(255,255,255,0.09); font-family:'MinibloxFont',sans-serif; white-space:nowrap; }
    .uv2-setting-desc { font-size:11.5px; color:#555; padding-left:16px; flex:1; font-family:'MinibloxFont',sans-serif; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .uv2-toggle { position:relative; width:42px; height:22px; flex-shrink:0; }
    .uv2-toggle input { display:none; }
    .uv2-toggle-track { position:absolute; inset:0; background:#444; border-radius:999px; cursor:pointer; transition:background 0.2s; }
    .uv2-toggle-track::after { content:''; position:absolute; top:3px; left:3px; width:16px; height:16px; background:#fff; border-radius:50%; transition:transform 0.2s; }
    .uv2-toggle input:checked + .uv2-toggle-track { background:#e74c3c; }
    .uv2-toggle input:checked + .uv2-toggle-track::after { transform:translateX(20px); }
    #unverified-music-player { position:fixed; bottom:24px; left:24px; width:260px; background:#0f0f0f; border-left:3px solid #e74c3c; z-index:99999; font-family:'MinibloxFont',sans-serif; color:white; box-shadow:0 4px 24px rgba(0,0,0,0.8); user-select:none; border-radius:8px; }
    #unverified-music-player .mp-topbar { display:flex; align-items:center; justify-content:space-between; padding:7px 10px; background:#0a0a0a; cursor:move; border-bottom:1px solid #1f1f1f; border-radius:8px 8px 0 0; }
    #unverified-music-player .mp-topbar-name { font-size:9px; color:#e74c3c; letter-spacing:3px; text-transform:uppercase; }
    #unverified-music-player .mp-topbar-close { background:none; border:none; color:#333; font-size:14px; cursor:pointer; padding:0; line-height:1; transition:color 0.15s; }
    #unverified-music-player .mp-topbar-close:hover { color:#e74c3c; }
    #unverified-music-player .mp-nowplaying { display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #1a1a1a; }
    #unverified-music-player .mp-art { width:44px; height:44px; background:#1a1a1a; flex-shrink:0; object-fit:cover; border-radius:4px; }
    #unverified-music-player .mp-info { flex:1; min-width:0; }
    #unverified-music-player .mp-title { font-size:11px; color:#ddd; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'MinibloxFont',sans-serif; }
    #unverified-music-player .mp-sub { font-size:10px; color:#3a3a3a; margin-top:3px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'MinibloxFont',sans-serif; }
    #unverified-music-player .mp-bar { height:2px; background:#1a1a1a; }
    #unverified-music-player .mp-bar-fill { height:100%; width:0%; background:#e74c3c; transition:width 0.5s linear; }
    #unverified-music-player .mp-btns { display:flex; border-bottom:1px solid #1a1a1a; }
    #unverified-music-player .mp-btn { flex:1; background:none; border:none; border-right:1px solid #1a1a1a; color:#444; padding:9px 0; font-size:13px; cursor:pointer; transition:color 0.15s,background 0.15s; display:flex; align-items:center; justify-content:center; }
    #unverified-music-player .mp-btn:last-child { border-right:none; }
    #unverified-music-player .mp-btn:hover { color:#fff; background:#1a1a1a; }
    #unverified-music-player .mp-btn.active { color:#e74c3c; }
    #unverified-music-player .mp-vol { display:flex; align-items:center; gap:8px; padding:7px 10px; border-bottom:1px solid #1a1a1a; }
    #unverified-music-player .mp-vol-lbl { font-size:9px; color:#2a2a2a; letter-spacing:2px; flex-shrink:0; }
    #unverified-music-player .mp-vol-slider { flex:1; accent-color:#e74c3c; height:2px; cursor:pointer; }
    #unverified-music-player .mp-vol-pct { font-size:9px; color:#2a2a2a; min-width:26px; text-align:right; }
    #unverified-music-player .mp-search-wrap { padding:8px 10px; border-bottom:1px solid #1a1a1a; display:flex; gap:0; }
    #unverified-music-player .mp-search-in { flex:1; background:#1a1a1a; color:#ccc; border:none; padding:7px 9px; font-size:10px; outline:none; font-family:'MinibloxFont',sans-serif; }
    #unverified-music-player .mp-search-in::placeholder { color:#2a2a2a; }
    #unverified-music-player .mp-search-go { background:#e74c3c; color:white; border:none; padding:7px 11px; font-size:10px; cursor:pointer; font-family:'MinibloxFont',sans-serif; letter-spacing:1px; transition:background 0.15s; flex-shrink:0; border-radius:4px; }
    #unverified-music-player .mp-search-go:hover { background:#c0392b; }
    #unverified-music-player .mp-results { max-height:120px; overflow-y:auto; }
    #unverified-music-player .mp-results::-webkit-scrollbar { width:2px; }
    #unverified-music-player .mp-results::-webkit-scrollbar-thumb { background:#e74c3c; }
    #unverified-music-player .mp-result { display:flex; align-items:center; gap:8px; padding:6px 10px; cursor:pointer; border-bottom:1px solid #161616; transition:background 0.1s; }
    #unverified-music-player .mp-result:last-child { border-bottom:none; }
    #unverified-music-player .mp-result:hover { background:#1a1a1a; }
    #unverified-music-player .mp-result-img { width:32px; height:32px; object-fit:cover; flex-shrink:0; background:#1a1a1a; border-radius:4px; }
    #unverified-music-player .mp-result-name { font-size:10px; color:#bbb; font-family:'MinibloxFont',sans-serif; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    #unverified-music-player .mp-result-by { font-size:9px; color:#333; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'MinibloxFont',sans-serif; }
    #unverified-music-player .mp-msg { padding:10px; color:#2a2a2a; font-size:9px; letter-spacing:1px; text-align:center; font-family:'MinibloxFont',sans-serif; }

    /* Module container styles - rectangle with slight curve */
    .module-container {
      border-radius: 8px !important;
    }
    .module-container:hover {
      border-radius: 8px !important;
    }

    /* Updated notification styles with progress bar */
    .other-notification {
      font-family: 'MinibloxFont', sans-serif;
      font-size: 14px;
      color: white;
      background: linear-gradient(135deg, #e74c3c, #c0392b);
      padding: 12px 24px;
      border-radius: 8px;
      margin-bottom: 12px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.3);
      transition: opacity 0.4s ease, transform 0.4s ease;
      opacity: 0;
      transform: translateX(100%);
      border-left: 4px solid #ffcc00;
      font-weight: 500;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
    }
    .notification-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      background: #ffcc00;
      width: 100%;
      animation: notificationProgress 3s linear forwards;
    }

    /* Animation for module toggles */
    .module-toggle-animation {
      animation: modulePulse 0.3s ease;
    }
    @keyframes modulePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }

    select, .uv2-setting-row select, #gui-text-grad-dir, .config-select {
      background: #2a2a2a !important;
      color: white !important;
      border: 1px solid #444 !important;
      border-radius: 6px !important;
      padding: 6px 10px !important;
      font-family: 'MinibloxFont', sans-serif !important;
      cursor: pointer !important;
      transition: all 0.2s ease !important;
    }
    select:hover, .uv2-setting-row select:hover {
      background: #3a3a3a !important;
      border-color: #e74c3c !important;
    }
    select option {
      background: #2a2a2a !important;
      color: white !important;
    }
  `;
  document.head.appendChild(style);
  const ui = document.createElement("div");
  ui.id = "uv2-main-ui";
  ui.style.position = "fixed";
  ui.style.top = "50%";
  ui.style.left = "50%";
  ui.style.transform = "translate(-50%, -50%)";
  ui.style.backgroundColor = "#000000";
  ui.style.color = "white";
  ui.style.padding = "0";
  ui.style.borderRadius = "10px";
  ui.style.display = "none";
  ui.style.flexDirection = "row";
  ui.style.zIndex = "9999";
  ui.style.boxShadow = "0 32px 80px rgba(0,0,0,0.95), 0 0 0 1px rgba(231,76,60,0.15), inset 0 1px 0 rgba(255,255,255,0.04)";
  ui.style.fontFamily = 'MinibloxFont, sans-serif';
  ui.style.maxHeight = "90vh";
  ui.style.maxWidth = "92vw";
  ui.style.width = "960px";
  ui.style.borderTop = "2px solid rgba(231,76,60,0.8)";
  ui.style.overflow = "hidden";
  document.body.appendChild(ui);

  const faLink = document.createElement("link");
  faLink.rel = "stylesheet";
  faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  document.head.appendChild(faLink);

  const uv2Sidebar = document.createElement("div");
  uv2Sidebar.id = "uv2-sidebar";
  uv2Sidebar.style.cssText = [
    "width:160px;min-width:160px;background:#000000;display:flex;flex-direction:column;",
    "border-right:1px solid rgba(255,255,255,0.06);overflow:hidden;flex-shrink:0;",
    "border-radius:0 0 0 10px;"
  ].join("");

  const uv2SidebarLogo = document.createElement("div");
  uv2SidebarLogo.style.cssText = [
    "padding:18px 14px 16px;border-bottom:1px solid rgba(255,255,255,0.06);",
    "display:flex;align-items:center;gap:9px;"
  ].join("");
  uv2SidebarLogo.innerHTML = [
    '<img src="https://i.postimg.cc/Mpm1dY6X/logo.jpg" style="width:28px;height:28px;border-radius:6px;object-fit:cover;flex-shrink:0;border:1px solid rgba(231,76,60,0.4);">',
    '<span style="color:#e74c3c;font-size:10px;letter-spacing:2px;text-transform:uppercase;',
    'font-family:MinibloxFont,sans-serif;line-height:1.2;">UV2</span>'
  ].join("");
  uv2Sidebar.appendChild(uv2SidebarLogo);


  const uv2ProfileCard = document.createElement("div");
  uv2ProfileCard.id = "uv2-profile-card";
  uv2ProfileCard.style.cssText = "padding:10px;margin:10px;display:flex;flex-direction:column;align-items:center;gap:8px;";

  const profileWrapper = document.createElement("div");
  profileWrapper.style.cssText = "position:relative;width:50px;height:50px;";

  const profileCircle = document.createElement("div");
  profileCircle.id = "uv2-country-circle";
  profileCircle.style.cssText = "width:50px;height:50px;border-radius:50%;border:2px solid #e74c3c;background-size:cover;background-position:center;display:flex;align-items:center;justify-content:center;font-size:20px;";
  profileCircle.textContent = "🌍";
  profileWrapper.appendChild(profileCircle);

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "✕";
  removeBtn.style.cssText = "position:absolute;top:-5px;right:-5px;background:#e74c3c;color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;opacity:0;transition:opacity 0.2s;";
  removeBtn.addEventListener("click", () => {
    const randomImages = [
      "https://i.pravatar.cc/150?img=" + Math.floor(Math.random()*70),
      "https://api.dicebear.com/7.x/avataaars/svg?seed=" + Math.random(),
      "https://api.dicebear.com/7.x/pixel-art/svg?seed=" + Math.random()
    ];
    const randomImage = randomImages[Math.floor(Math.random()*randomImages.length)];
    profileCircle.style.backgroundImage = `url('${randomImage}')`;
    profileCircle.textContent = "";
    localStorage.setItem("uv2-profile-image", randomImage);
  });
  profileWrapper.appendChild(removeBtn);

  const uploadBtn = document.createElement("button");
  uploadBtn.textContent = "⬆";
  uploadBtn.style.cssText = "position:absolute;top:-5px;left:-5px;background:#4CAF50;color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;opacity:0;transition:opacity 0.2s;";

  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.cssText = "display:none;";
  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        profileCircle.style.backgroundImage = `url('${event.target.result}')`;
        profileCircle.textContent = "";
        localStorage.setItem("uv2-profile-image", event.target.result);
        console.log("Custom profile uploaded!");
      };
      reader.readAsDataURL(file);
    }
  });
  document.body.appendChild(fileInput);

  uploadBtn.addEventListener("click", () => {
    fileInput.click();
  });
  profileWrapper.appendChild(uploadBtn);

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "↻";
  resetBtn.style.cssText = "position:absolute;bottom:-5px;right:-5px;background:#888;color:white;border:none;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:12px;opacity:0;transition:opacity 0.2s;";
  resetBtn.addEventListener("click", () => {
    fetch('https://ipapi.co/json/').then(r => r.json()).then(d => {
      const countryCode = d.country_code;
      profileCircle.style.backgroundImage = `url('https://flagcdn.com/256x192/${countryCode.toLowerCase()}.png')`;
      profileCircle.textContent = "";
      localStorage.removeItem("uv2-profile-image");
    });
  });
  profileWrapper.appendChild(resetBtn);

  profileWrapper.style.cursor = "pointer";
  profileWrapper.addEventListener("mouseenter", () => {
    removeBtn.style.opacity = "1";
    uploadBtn.style.opacity = "1";
    resetBtn.style.opacity = "1";
  });
  profileWrapper.addEventListener("mouseleave", () => {
    removeBtn.style.opacity = "0";
    uploadBtn.style.opacity = "0";
    resetBtn.style.opacity = "0";
  });

  uv2ProfileCard.appendChild(profileWrapper);

  const userDiv = document.createElement("div");
  userDiv.textContent = "User" + Math.floor(Math.random()*100000);
  userDiv.style.cssText = "font-size:11px;color:#888;";
  uv2ProfileCard.appendChild(userDiv);

  uv2Sidebar.appendChild(uv2ProfileCard);

  fetch('https://ipapi.co/json/').then(r => r.json()).then(d => {
    const savedImage = localStorage.getItem("uv2-profile-image");
    if (savedImage) {
      profileCircle.style.backgroundImage = `url('${savedImage}')`;
      profileCircle.textContent = "";
    } else {
      const countryCode = d.country_code;
      profileCircle.style.backgroundImage = `url('https://flagcdn.com/256x192/${countryCode.toLowerCase()}.png')`;
      profileCircle.textContent = "";
    }
  }).catch(() => {});

  const savedImage = localStorage.getItem("uv2-profile-image");
  if (savedImage) {
    profileCircle.style.backgroundImage = `url('${savedImage}')`;
    profileCircle.textContent = "";
  }
  const uv2NavDefs = [
    { page: 'main',       label: 'Modules',    icon: 'fa-th-large' },
    { page: 'alt',        label: 'Custom Modules', icon: 'fa-code'},
    { page: 'gui',        label: 'Themes',     icon: 'fa-paint-brush' },
    { page: 'config',     label: 'Config',     icon: 'fa-cog' },
    { page: 'settings',   label: 'Settings',   icon: 'fa-sliders' },
  ];

  const uv2NavEls = {};
  const uv2SidebarNav = document.createElement("div");
  uv2SidebarNav.style.cssText = "display:flex;flex-direction:column;padding:8px 0;flex:1;";

  uv2NavDefs.forEach(def => {
    const el = document.createElement("div");
    el.dataset.page = def.page;
    el.style.cssText = [
      "display:flex;align-items:center;gap:10px;padding:11px 16px;cursor:pointer;",
      "font-size:13px;color:#666;border-left:2px solid transparent;",
      "transition:all 0.15s ease;font-family:MinibloxFont,sans-serif;user-select:none;"
    ].join("");
    el.innerHTML = `<i class="fa ${def.icon}" style="font-size:15px;width:18px;text-align:center;flex-shrink:0;"></i><span>${def.label}</span>`;
    el.addEventListener("mouseenter", () => {
      if (el.dataset.active !== "1") { el.style.color = "#ccc"; el.style.backgroundColor = "rgba(255,255,255,0.04)"; }
    });
    el.addEventListener("mouseleave", () => {
      if (el.dataset.active !== "1") { el.style.color = "#666"; el.style.backgroundColor = ""; }
    });
    el.addEventListener("click", () => switchUv2Page(def.page));
    uv2NavEls[def.page] = el;
    uv2SidebarNav.appendChild(el);
  });
  uv2Sidebar.appendChild(uv2SidebarNav);


  const uv2SidebarFooter = document.createElement("div");
  uv2SidebarFooter.style.cssText = [
    "padding:12px 14px;border-top:1px solid rgba(255,255,255,0.05);",
    "font-size:9px;color:#333;letter-spacing:1.5px;text-transform:uppercase;",
    "font-family:MinibloxFont,sans-serif;text-align:center;"
  ].join("");
  uv2SidebarFooter.textContent = "v2.0.7";
  uv2Sidebar.appendChild(uv2SidebarFooter);

  ui.appendChild(uv2Sidebar);



  const uv2ContentArea = document.createElement("div");
  uv2ContentArea.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;";
  ui.appendChild(uv2ContentArea);


  const uv2MainPage = document.createElement("div");
  uv2MainPage.id = "uv2-page-main-content";
  uv2MainPage.style.cssText = "flex:1;display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2MainPage);

  const uv2CModulesPage = document.createElement("div");
  uv2CModulesPage.id = "uv2-cmodules-content";
  uv2CModulesPage.style.cssText = "flex:1;display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;gap:12px;";
  uv2ContentArea.appendChild(uv2CModulesPage);

  (function buildCustomModulesEditor(){
    const header = document.createElement('h2'); header.textContent = 'Custom Modules'; header.style.cssText = 'font-size:24px;margin:0;color:#fff;font-family:MinibloxFont,sans-serif;';
    uv2CModulesPage.appendChild(header);

    const nameRow = document.createElement('div'); nameRow.style.cssText = 'display:flex;gap:8px;align-items:center;margin-top:8px;';
    const nameInput = document.createElement('input'); nameInput.placeholder = 'Module Name';
    Object.assign(nameInput.style, { padding:'8px 10px', background:'#191919', color:'#fff', border:'1px solid #333', borderRadius:'6px', flex:'0 0 260px', fontFamily:'MinibloxFont,sans-serif' });
    nameRow.appendChild(nameInput);
    const descInput = document.createElement('input'); descInput.placeholder = 'Short description of your module. (optional)';
    Object.assign(descInput.style, { padding:'8px 10px', background:'#191919', color:'#ccc', border:'1px solid #333', borderRadius:'6px', flex:'1', fontFamily:'MinibloxFont,sans-serif' });
    nameRow.appendChild(descInput);
    uv2CModulesPage.appendChild(nameRow);

    // --- CodeMirror 5 editor ---
    // Inject CodeMirror CSS (One Dark theme)
    const cmCSS = document.createElement('link');
    cmCSS.rel = 'stylesheet';
    cmCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css';
    document.head.appendChild(cmCSS);

    const cmThemeCSS = document.createElement('style');
    cmThemeCSS.textContent = `
      .uv2-cm-wrap .CodeMirror {
        height: 240px;
        margin-top: 10px;
        border: 1px solid #333;
        border-radius: 8px;
        font-family: Monaco, Consolas, monospace;
        font-size: 13px;
        line-height: 1.5;
        background: #0d0d0d;
        color: #e6e6e6;
      }
      .uv2-cm-wrap .CodeMirror-scroll { border-radius: 8px; }
      .uv2-cm-wrap .CodeMirror-cursor { border-left: 2px solid #e6e6e6 !important; }
      .uv2-cm-wrap .CodeMirror-selected { background: rgba(255,255,255,0.1) !important; }
      .uv2-cm-wrap .CodeMirror-gutters { background: #111; border-right: 1px solid #2a2a2a; }
      .uv2-cm-wrap .CodeMirror-linenumber { color: #444; }
      /* One Dark–style token colours */
      .uv2-cm-wrap .cm-keyword   { color: #c678dd; }
      .uv2-cm-wrap .cm-def       { color: #61afef; }
      .uv2-cm-wrap .cm-variable  { color: #e6e6e6; }
      .uv2-cm-wrap .cm-variable-2{ color: #e06c75; }
      .uv2-cm-wrap .cm-property  { color: #e6e6e6; }
      .uv2-cm-wrap .cm-operator  { color: #56b6c2; }
      .uv2-cm-wrap .cm-string    { color: #98c379; }
      .uv2-cm-wrap .cm-string-2  { color: #98c379; }
      .uv2-cm-wrap .cm-number    { color: #d19a66; }
      .uv2-cm-wrap .cm-atom      { color: #d19a66; }
      .uv2-cm-wrap .cm-comment   { color: #5c6370; font-style: italic; }
      .uv2-cm-wrap .cm-tag       { color: #e06c75; }
      .uv2-cm-wrap .cm-bracket   { color: #abb2bf; }
      .uv2-cm-wrap .cm-builtin   { color: #e6c07b; }
      .uv2-cm-wrap .cm-error     { color: #e06c75; }
      .uv2-cm-wrap .CodeMirror-matchingbracket { color: #fff !important; background: rgba(255,255,255,0.15); border-radius: 2px; }
    `;
    document.head.appendChild(cmThemeCSS);

    const cmWrap = document.createElement('div');
    cmWrap.className = 'uv2-cm-wrap';
    uv2CModulesPage.appendChild(cmWrap);

    // Hidden textarea — CodeMirror replaces it; we read .getValue() instead
    const editorTextarea = document.createElement('textarea');
    editorTextarea.placeholder = 'Build your custom module here....';
    cmWrap.appendChild(editorTextarea);

    // Load CodeMirror JS then JS mode, then init
    let cmInstance = null;
    function getEditorValue() { return cmInstance ? cmInstance.getValue() : editorTextarea.value; }
    function setEditorValue(v) { if (cmInstance) cmInstance.setValue(v); else editorTextarea.value = v; }

    function initCM() {
      if (typeof CodeMirror === 'undefined') return;
      if (cmInstance) return;
      cmInstance = CodeMirror.fromTextArea(editorTextarea, {
        mode: 'javascript',
        lineNumbers: true,
        matchBrackets: true,
        indentWithTabs: false,
        indentUnit: 2,
        tabSize: 2,
        lineWrapping: true,
        autofocus: false,
        extraKeys: {
          // Auto-insert space after {
          '{': function(cm) {
            cm.replaceSelection('{ ');
          }
        }
      });
    }

    function loadScript(src, cb) {
      if (document.querySelector('script[src="' + src + '"]')) { cb(); return; }
      const s = document.createElement('script'); s.src = src;
      s.onload = cb; s.onerror = cb;
      document.head.appendChild(s);
    }

    const CM_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/';
    loadScript(CM_BASE + 'codemirror.min.js', () => {
      loadScript(CM_BASE + 'mode/javascript/javascript.min.js', () => {
        loadScript(CM_BASE + 'addon/edit/matchbrackets.min.js', () => {
          initCM();
        });
      });
    });
    // --- end CodeMirror editor ---

    const btnRow = document.createElement('div'); btnRow.style.cssText = 'display:flex;gap:8px;margin-top:8px;';
    const saveDraftBtn = document.createElement('button'); saveDraftBtn.textContent = 'Save Draft';
    const loadDraftBtn = document.createElement('button'); loadDraftBtn.textContent = 'Load Draft';
    const addModuleBtn = document.createElement('button'); addModuleBtn.textContent = 'Add Module';
    [saveDraftBtn, loadDraftBtn, addModuleBtn].forEach(b => { b.style.cssText = 'padding:8px 12px;border-radius:6px;background:#222;border:1px solid #333;color:#fff;cursor:pointer;font-family:MinibloxFont,sans-serif;'; btnRow.appendChild(b); });
    uv2CModulesPage.appendChild(btnRow);

    saveDraftBtn.addEventListener('click', () => {
      const draft = { name: nameInput.value || '', desc: descInput.value || '', code: getEditorValue() };
      localStorage.setItem('uv2-cmod-draft', JSON.stringify(draft));
      showNotification('Custom module draft saved', true);
    });
    loadDraftBtn.addEventListener('click', () => {
      const d = localStorage.getItem('uv2-cmod-draft'); if (!d) { showNotification('No draft found', false); return; }
      try { const draft = JSON.parse(d); nameInput.value = draft.name || ''; descInput.value = draft.desc || ''; setEditorValue(draft.code || ''); showNotification('Draft loaded', true); } catch(e){ showNotification('Failed to load draft', false); }
    });
    addModuleBtn.addEventListener('click', () => {
      const name = nameInput.value.trim() || ('Custom Module ' + (Math.floor(Math.random()*9000)+1000));
      const desc = descInput.value.trim() || 'Custom module';
      const mc = createModule(name, desc);
      mc._customCode = getEditorValue();
      mc._isCustom = true;
      if (mc._deleteBtn) { mc._deleteBtn.style.opacity = '1'; mc._deleteBtn.style.pointerEvents = 'auto'; }
      // persist custom module code if saving enabled
      const saved = JSON.parse(localStorage.getItem('uv2-custom-modules') || '[]');
      saved.push({ name, desc, code: mc._customCode });
      localStorage.setItem('uv2-custom-modules', JSON.stringify(saved));
      showNotification(`${name} added`, true);
    });
  })();


  const uv2GUIPage = document.createElement("div");
  uv2GUIPage.id = "uv2-page-gui-content";
  uv2GUIPage.style.cssText = "flex:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2GUIPage);



  const uv2ConfigPage = document.createElement("div");
  uv2ConfigPage.id = "uv2-page-config-content";
  uv2ConfigPage.style.cssText = "flex:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2ConfigPage);


  const uv2SettingsPage = document.createElement("div");
  uv2SettingsPage.id = "uv2-page-settings-content";
  uv2SettingsPage.style.cssText = "flex:1;display:none;overflow:hidden;";
  uv2ContentArea.appendChild(uv2SettingsPage);

  const UV2_THEMES = [
    {
      id:         'frost',
      name:       'Frost',
      primary:    '#4fc3f7',
      background: '#000000',
      text:       '#e0f7ff',
      gradient:   'linear-gradient(135deg, #1565c0, #0d47a1, #4fc3f7)',
    },
    {
      id:         'crimson',
      name:       'Default',
      primary:    '#e74c3c',
      background: '#000000',
      text:       '#ffffff',
      gradient:   'linear-gradient(135deg, #e74c3c, #c0392b)',
    },
    {
      id:         'emerald',
      name:       'Emerald',
      primary:    '#2ecc71',
      background: '#000000',
      text:       '#eaffef',
      gradient:   'linear-gradient(135deg, #1a7a45, #2ecc71)',
    },
    {
      id:         'violet',
      name:       'Violet',
      primary:    '#9b59b6',
      background: '#000000',
      text:       '#f5eeff',
      gradient:   'linear-gradient(135deg, #6c3483, #9b59b6)',
    },
    {
      id:         'gold',
      name:       'Gold',
      primary:    '#f39c12',
      background: '#000000',
      text:       '#fff8e7',
      gradient:   'linear-gradient(135deg, #b7770d, #f39c12)',
    },
  ];

  let activeThemeId = localStorage.getItem('uv2-theme-id') || 'default';

  function getTheme(id) {
    return UV2_THEMES.find(t => t.id === id) || UV2_THEMES[0];
  }

  function applyTheme(themeId) {
    const theme = getTheme(themeId);
    activeThemeId    = themeId;
    guiPrimaryColor  = theme.primary;
    guiBackgroundColor = theme.background;
    guiTextColor     = theme.text;
    localStorage.setItem('uv2-theme-id', themeId);
    localStorage.setItem('uv2-gui-primary-color', guiPrimaryColor);
    localStorage.setItem('uv2-gui-bg-color', guiBackgroundColor);
    localStorage.setItem('uv2-gui-text-color', guiTextColor);
    applyGUIStyles();
    buildGUIPage();
    try { closeButton.style.background = guiPrimaryColor; } catch(e) {}
  }

  const _loadedTheme  = getTheme(activeThemeId);
  let guiPrimaryColor    = localStorage.getItem('uv2-gui-primary-color')    || _loadedTheme.primary;
  let guiBackgroundColor = localStorage.getItem('uv2-gui-bg-color')         || _loadedTheme.background;
  let guiTextColor       = localStorage.getItem('uv2-gui-text-color')       || _loadedTheme.text;

  function applyGUIStyles() {
    ui.style.backgroundColor = guiBackgroundColor;
    ui.style.color = guiTextColor;

    ui.querySelectorAll('.mp-search-go').forEach(btn => {
      btn.style.backgroundColor = guiPrimaryColor;
    });

    ui.querySelectorAll('.module-container').forEach(mc => {
      const span = mc.querySelector('span');
      if (span) {
        span.style.color = guiPrimaryColor;
        span.style.textShadow = `0 0 18px ${guiPrimaryColor}40`;
      }
      if (mc._uv2Active) {
        mc.style.border = `1px solid ${guiPrimaryColor}80`;
        mc.style.boxShadow = `0 0 0 3px ${guiPrimaryColor}14, 0 1px 4px rgba(0,0,0,0.4)`;
        const tw = mc._toggleWrap;
        const tk = mc._toggleKnob;
        if (tw) { tw.style.background = `${guiPrimaryColor}40`; tw.style.borderColor = `${guiPrimaryColor}60`; }
        if (tk) tk.style.background = guiPrimaryColor;
      }
    });

    let toggleStyle = document.getElementById('uv2-dynamic-toggle-style');
    if (!toggleStyle) {
      toggleStyle = document.createElement('style');
      toggleStyle.id = 'uv2-dynamic-toggle-style';
      document.head.appendChild(toggleStyle);
    }
    toggleStyle.textContent = `.uv2-toggle input:checked + .uv2-toggle-track { background: ${guiPrimaryColor} !important; }`;

    Object.values(uv2NavEls).forEach(el => {
      if (el.dataset.active === "1") {
        el.style.color = guiPrimaryColor;
        el.style.borderLeftColor = guiPrimaryColor;
        el.style.backgroundColor = `${guiPrimaryColor}14`;
        const icon = el.querySelector('i');
        if (icon) icon.style.color = guiPrimaryColor;
      }
    });

    if (typeof title !== 'undefined' && title) {
      title.style.color = guiPrimaryColor;
    }

    try { closeButton.style.background = guiPrimaryColor; closeButton.style.boxShadow = `0 2px 14px ${guiPrimaryColor}73`; } catch(e) {}

    ['#save-config-btn', '#load-config-btn'].forEach(sel => {
      const btn = document.querySelector(sel);
      if (btn) { btn.style.background = guiPrimaryColor; btn.style.backgroundColor = guiPrimaryColor; }
    });

    document.querySelectorAll('select').forEach(select => {
      select.style.backgroundColor = guiBackgroundColor;
      select.style.color = guiTextColor;
      select.style.borderColor = guiPrimaryColor;
    });
  }

  function buildGUIPage() {
    uv2GUIPage.innerHTML = '';

    const heading = document.createElement('h2');
    heading.textContent = 'Themes';
    heading.style.cssText = 'font-size:28px;font-family:MinibloxFont,sans-serif;margin:0 0 20px 0;text-align:center;color:#fff;';
    uv2GUIPage.appendChild(heading);

    const sectionLabel = document.createElement('div');
    sectionLabel.className = 'uv2-section-title';
    sectionLabel.textContent = 'Select a theme';
    sectionLabel.style.marginTop = '0';
    uv2GUIPage.appendChild(sectionLabel);

    const grid = document.createElement('div');
    grid.style.cssText = 'display:flex;flex-wrap:wrap;gap:14px;padding:4px 0 20px 0;';
    uv2GUIPage.appendChild(grid);

    UV2_THEMES.forEach(theme => {
      const isActive = theme.id === activeThemeId;

      const card = document.createElement('div');
      card.style.cssText = [
        'display:flex;flex-direction:column;align-items:center;gap:10px;',
        'padding:16px 20px;border-radius:10px;cursor:pointer;min-width:110px;',
        'transition:all 0.2s ease;position:relative;',
        isActive
          ? `border:2px solid ${theme.primary};box-shadow:0 0 0 3px ${theme.primary}33,0 4px 18px rgba(0,0,0,0.5);background:#111;`
          : 'border:2px solid rgba(255,255,255,0.09);background:#0d0d0d;',
      ].join('');

      const swatch = document.createElement('div');
      swatch.style.cssText = `width:64px;height:36px;border-radius:7px;background:${theme.gradient};box-shadow:0 2px 8px rgba(0,0,0,0.4);`;

      const label = document.createElement('span');
      label.textContent = theme.name;
      label.style.cssText = `font-size:13px;font-family:MinibloxFont,sans-serif;color:${isActive ? theme.primary : '#aaa'};`;

      if (isActive) {
        const check = document.createElement('div');
        check.textContent = '✓';
        check.style.cssText = `position:absolute;top:6px;right:8px;font-size:11px;color:${theme.primary};font-weight:bold;`;
        card.appendChild(check);
      }

      card.appendChild(swatch);
      card.appendChild(label);

      card.addEventListener('mouseenter', () => {
        if (theme.id !== activeThemeId) card.style.borderColor = 'rgba(255,255,255,0.2)';
      });
      card.addEventListener('mouseleave', () => {
        if (theme.id !== activeThemeId) card.style.borderColor = 'rgba(255,255,255,0.09)';
      });
      card.addEventListener('click', () => applyTheme(theme.id));

      grid.appendChild(card);
    });
  }

  function buildConfigPage() {
    uv2ConfigPage.innerHTML = `
      <h2 style="font-size:30px;font-family:MinibloxFont,sans-serif;margin:0 0 20px 0;text-align:center;">Config Management</h2>
      <div class="uv2-section-title">Save / Load Configuration</div>
      <div class="uv2-setting-row" style="display:flex;flex-direction:column;height:auto;padding:16px;gap:16px;">
        <button id="save-config-btn" style="background:${guiPrimaryColor};color:white;border:none;border-radius:6px;padding:12px 20px;cursor:pointer;font-family:MinibloxFont,sans-serif;">Save Current Settings as JSON</button>
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
          <label for="config-file-input" style="background:#444;color:white;border:none;border-radius:6px;padding:12px 20px;cursor:pointer;font-family:MinibloxFont,sans-serif;">Select JSON File</label>
          <input type="file" id="config-file-input" accept=".json" style="display:none;">
          <button id="load-config-btn" style="background:${guiPrimaryColor};color:white;border:none;border-radius:6px;padding:12px 20px;cursor:pointer;font-family:MinibloxFont,sans-serif;">Load Selected File</button>
        </div>
      </div>
    `;

    const saveBtn = uv2ConfigPage.querySelector('#save-config-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        const config = {
          version: '2.39',
          gui: {
            themeId: activeThemeId,
            primaryColor: guiPrimaryColor,
            backgroundColor: guiBackgroundColor,
            textColor: guiTextColor,
          },
          settings: {
            moduleSounds: settings.moduleSounds,
            showNotifications: settings.showNotifications,
            animateUI: settings.animateUI,
            saving: settings.saving,
            autoAfk: settings.autoAfk,
            afkChat: settings.afkChat,
            afkDelay: afkDelay,
          },
          moduleBindings: moduleBindings,
          moduleStates: {},
        };

        [...gridContainer.children].forEach(mc => {
          const name = mc.dataset.moduleName;
          if (name) config.moduleStates[name] = mc._uv2Active;
        });
        const jsonStr = JSON.stringify(config, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `unverified-config-${new Date().toISOString().slice(0,19)}.json`;
        a.click();
        URL.revokeObjectURL(url);
        showNotification('Configuration saved successfully!', true);
      });
    }

    const fileInput = uv2ConfigPage.querySelector('#config-file-input');
    const loadBtn = uv2ConfigPage.querySelector('#load-config-btn');
    if (fileInput && loadBtn) {
      loadBtn.addEventListener('click', () => {
        fileInput.click();
      });
      fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const config = JSON.parse(event.target.result);

            if (config.gui) {
              if (config.gui.themeId) {
                applyTheme(config.gui.themeId);
              } else {
                if (config.gui.primaryColor) {
                  guiPrimaryColor = config.gui.primaryColor;
                  localStorage.setItem('uv2-gui-primary-color', guiPrimaryColor);
                }
                if (config.gui.backgroundColor) {
                  guiBackgroundColor = config.gui.backgroundColor;
                  localStorage.setItem('uv2-gui-bg-color', guiBackgroundColor);
                }
                if (config.gui.textColor) {
                  guiTextColor = config.gui.textColor;
                  localStorage.setItem('uv2-gui-text-color', guiTextColor);
                }
                applyGUIStyles();
                buildGUIPage();
              }
            }

            if (config.settings) {
              if (typeof config.settings.moduleSounds === 'boolean') {
                settings.moduleSounds = config.settings.moduleSounds;
                localStorage.setItem('uv2-setting-sounds', settings.moduleSounds);
                const soundsToggle = document.querySelector("#uv2-toggle-sounds");
                if (soundsToggle) soundsToggle.checked = settings.moduleSounds;
              }
              if (typeof config.settings.showNotifications === 'boolean') {
                settings.showNotifications = config.settings.showNotifications;
                localStorage.setItem('uv2-setting-notifs', settings.showNotifications);
                const notifsToggle = document.querySelector("#uv2-toggle-notifs");
                if (notifsToggle) notifsToggle.checked = settings.showNotifications;
              }
              if (typeof config.settings.animateUI === 'boolean') {
                settings.animateUI = config.settings.animateUI;
                localStorage.setItem('uv2-setting-animation', settings.animateUI);
                const animToggle = document.querySelector("#uv2-toggle-animation");
                if (animToggle) animToggle.checked = settings.animateUI;
              }
              if (typeof config.settings.saving === 'boolean') {
                settings.saving = config.settings.saving;
                localStorage.setItem('uv2-setting-saving', settings.saving ? 'true' : 'false');
                const savingToggle = document.querySelector("#uv2-toggle-saving");
                if (savingToggle) savingToggle.checked = settings.saving;
              }
              if (typeof config.settings.autoAfk === 'boolean') {
                settings.autoAfk = config.settings.autoAfk;
                localStorage.setItem('uv2-setting-autoafk', settings.autoAfk ? 'true' : 'false');
                const autoAfkToggle = document.querySelector("#uv2-toggle-autoafk");
                if (autoAfkToggle) autoAfkToggle.checked = settings.autoAfk;
                if (settings.autoAfk) startAfkDetector(); else stopAfkDetector();
              }
              if (typeof config.settings.afkChat === 'boolean') {
                settings.afkChat = config.settings.afkChat;
                localStorage.setItem('uv2-setting-afkchat', settings.afkChat);
                const afkChatToggle = document.querySelector("#uv2-toggle-afkchat");
                if (afkChatToggle) afkChatToggle.checked = settings.afkChat;
              }
              if (typeof config.settings.afkDelay === 'number') {
                afkDelay = Math.min(120, Math.max(5, config.settings.afkDelay));
                localStorage.setItem('uv2-setting-afkdelay', afkDelay);
                if (afkDelayInput) afkDelayInput.value = afkDelay;
              }
            }

            if (config.moduleBindings) {
              moduleBindings = config.moduleBindings;
            }

            setTimeout(() => {
              if (config.moduleStates) {
                isRestoring = true;
                [...gridContainer.children].forEach(mc => {
                  const name = mc.dataset.moduleName;
                  if (name && config.moduleStates[name] !== undefined) {
                    if (config.moduleStates[name] && !mc._uv2Active) mc.click();
                    else if (!config.moduleStates[name] && mc._uv2Active) mc.click();
                  }
                });
                isRestoring = false;
              }
            }, 500);
            showNotification('Configuration loaded successfully!', true);
          } catch (err) {
            console.error(err);
            showNotification('Failed to load config: invalid JSON', false);
          }
        };
        reader.readAsText(file);
        fileInput.value = '';
      });
    }
  }


  function switchUv2Page(page) {
    uv2MainPage.style.display        = page === 'main'         ? 'flex' : 'none';
    uv2GUIPage.style.display         = page === 'gui'          ? 'flex' : 'none';
    uv2ConfigPage.style.display      = page === 'config'       ? 'flex' : 'none';
    uv2SettingsPage.style.display    = page === 'settings'     ? 'flex' : 'none';
    uv2CModulesPage.style.display    = page === 'alt'          ? 'flex' : 'none';
    Object.entries(uv2NavEls).forEach(([p, el]) => {
      const active = p === page;
      el.dataset.active       = active ? "1" : "0";
      el.style.color          = active ? guiPrimaryColor : "#666";
      el.style.backgroundColor = active ? `${guiPrimaryColor}14` : "";
      el.style.borderLeft     = active ? `2px solid ${guiPrimaryColor}` : "2px solid transparent";
      const icon = el.querySelector("i");
      if (icon) icon.style.color = active ? guiPrimaryColor : "";
    });
  }



  const headerRow = document.createElement("div");
  headerRow.style.cssText = "display:flex;align-items:center;justify-content:center;margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.07);position:relative;";
  uv2MainPage.appendChild(headerRow);

  const title = document.createElement("h2");
  title.textContent = "UnverifiedV2";
  title.style.fontSize = "30px"; title.style.color = guiPrimaryColor;
  title.style.fontFamily = 'MinibloxFont, sans-serif'; title.style.margin = "0";
  title.style.letterSpacing = "1px";
  title.style.textAlign = "center";
  title.style.cursor = "pointer";
  title.style.userSelect = "none";
  headerRow.appendChild(title);


  const languageDropdown = document.createElement("select");
  languageDropdown.style.cssText = `background:${guiBackgroundColor};color:${guiTextColor};border:1px solid ${guiPrimaryColor};border-radius:8px;padding:8px 14px;font-size:13px;cursor:pointer;font-family:'MinibloxFont',sans-serif;position:absolute;right:0;top:50%;transform:translateY(-50%);`;
  headerRow.appendChild(languageDropdown);


  let titleClickCount = 0;
  let titleEggCycle = 0;
  let titleEggBusy = false;
  const sweepPalettes = [
    ['#e74c3c', '#ffffff', '#ffcccc', '#e74c3c'],
    ['#e74c3c', '#ffd700', '#fff', '#e74c3c'],
    ['#e74c3c', '#00ffff', '#fff', '#e74c3c'],
    ['#e74c3c', '#ff69b4', '#ffe0f0', '#e74c3c'],
    ['#e74c3c', '#7fff00', '#f0ffe0', '#e74c3c'],
  ];
  title.addEventListener('click', () => {
    if (titleEggBusy) return;
    titleClickCount++;
    if (titleClickCount < 10) return;
    titleClickCount = 0;
    titleEggBusy = true;
    const effect = titleEggCycle % 2;
    titleEggCycle++;
    if (effect === 0) {
      title.style.transformOrigin = 'center center';
      title.style.animation = 'uv2-title-spin 0.72s cubic-bezier(0.22,1,0.36,1) forwards';
      setTimeout(() => {
        title.style.animation = '';
        titleEggBusy = false;
      }, 750);
    } else {
      const paletteIndex = Math.floor(titleEggCycle / 2) % sweepPalettes.length;
      const [c0, c1, c2, c3] = sweepPalettes[paletteIndex];
      title.style.backgroundImage = `linear-gradient(90deg, ${c0} 15%, ${c1} 42%, ${c2} 55%, ${c3} 85%)`;
      title.style.backgroundSize = '200% auto';
      title.style.backgroundClip = 'text';
      title.style.webkitBackgroundClip = 'text';
      title.style.webkitTextFillColor = 'transparent';
      title.style.color = 'transparent';
      title.style.animation = 'uv2-title-sweep 0.9s ease forwards';
      setTimeout(() => {
        title.style.animation = '';
        title.style.backgroundImage = '';
        title.style.backgroundClip = '';
        title.style.webkitBackgroundClip = '';
        title.style.webkitTextFillColor = '';
        title.style.color = guiPrimaryColor;
        titleEggBusy = false;
      }, 960);
    }
  });


  const settingsOverlay = document.createElement("div");
  settingsOverlay.id = "uv2-settings-overlay";
  settingsOverlay.innerHTML = `
    <div id="uv2-settings-panel">
      <div id="uv2-settings-titlebar">
        <span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94zM12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>Settings</span>
        <button id="uv2-settings-close">✕</button>
      </div>
      <div id="uv2-settings-body">
        <div id="uv2-settings-content">
          <div class="uv2-settings-page" id="uv2-page-audio">
            <div class="uv2-section-title">Sound</div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Module Click Sounds</div><div class="uv2-setting-desc">Play a sound when toggling modules on or off</div></div>
              <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-sounds"><div class="uv2-toggle-track"></div></label>
            </div>
          </div>
          <div class="uv2-settings-page" id="uv2-page-visuals">
            <div class="uv2-section-title">Interface</div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Show Notifications</div><div class="uv2-setting-desc">Display toast notifications when modules toggle</div></div>
              <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-notifs"><div class="uv2-toggle-track"></div></label>
            </div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Animation</div><div class="uv2-setting-desc">Animate the menu when opening and closing</div></div>
              <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-animation"><div class="uv2-toggle-track"></div></label>
            </div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Save Modules</div><div class="uv2-setting-desc">Restore your active modules after a page reload</div></div>
              <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-saving"><div class="uv2-toggle-track"></div></label>
            </div>
            <div class="uv2-section-title" style="margin-top:14px;">Auto AFK</div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Auto Enable</div><div class="uv2-setting-desc">Turns on Anti-AFK automatically after idling</div></div>
              <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-autoafk"><div class="uv2-toggle-track"></div></label>
            </div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Sends AFK Message In Chat</div><div class="uv2-setting-desc">Sends a chat message when you go AFK</div></div>
              <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-afkchat"><div class="uv2-toggle-track"></div></label>
            </div>
            <div class="uv2-setting-row">
              <div><div class="uv2-setting-label">Idle Delay</div><div class="uv2-setting-desc">Seconds before Anti-AFK auto-enables (5–120)</div></div>
              <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
                <input type="number" id="uv2-afkdelay-input" min="5" max="120" value="10" style="width:60px;background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:5px 8px;font-size:14px;font-family:'MinibloxFont',sans-serif;text-align:center;outline:none;">
                <span style="color:#888;font-size:13px;">s</span>
              </div>
            </div>
          </div>
          <div class="uv2-settings-page" id="uv2-page-about">
            <div class="uv2-section-title">Info</div>
            <div class="uv2-setting-row"><div><div class="uv2-setting-label">Version</div><div class="uv2-setting-desc">2.0.7</div></div></div>
            <div class="uv2-setting-row"><div><div class="uv2-setting-label">Authors</div><div class="uv2-setting-desc">wytlines, DeadFish7, andreypidd, jet, joudaALT!</div></div></div>
            <div class="uv2-setting-row"><div><div class="uv2-setting-label">License</div><div class="uv2-setting-desc">Proprietary, do not redistribute</div></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(settingsOverlay);


  const uv2InlineSettings = settingsOverlay.querySelector('#uv2-settings-panel');
  if (uv2InlineSettings) {
    uv2InlineSettings.style.width      = "100%";
    uv2InlineSettings.style.height     = "100%";
    uv2InlineSettings.style.maxHeight  = "none";
    uv2InlineSettings.style.borderRadius = "0";
    uv2InlineSettings.style.border     = "none";
    uv2InlineSettings.style.boxShadow  = "none";
    uv2SettingsPage.appendChild(uv2InlineSettings);
  }
  settingsOverlay.style.display        = "none";
  settingsOverlay.style.pointerEvents  = "none";


  buildGUIPage();
  buildConfigPage();
  applyGUIStyles();


  switchUv2Page('main');


  ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach(evt => {
    document.addEventListener(evt, () => {
      const isFS = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      ui.style.maxHeight = isFS ? "95vh" : "90vh";
    });
  });


  document.querySelector("#uv2-settings-close")?.addEventListener("click", () => switchUv2Page('main'));
  document.querySelector("#uv2-toggle-sounds")?.addEventListener("change", function() {
    settings.moduleSounds = this.checked;
    localStorage.setItem('uv2-setting-sounds', this.checked);
  });
  document.querySelector("#uv2-toggle-notifs")?.addEventListener("change", function() {
    settings.showNotifications = this.checked;
    localStorage.setItem('uv2-setting-notifs', this.checked);
  });
  document.querySelector("#uv2-toggle-animation")?.addEventListener("change", function() {
    settings.animateUI = this.checked;
    localStorage.setItem('uv2-setting-animation', this.checked);
  });
  document.querySelector("#uv2-toggle-saving")?.addEventListener("change", function() {
    settings.saving = this.checked;
    localStorage.setItem('uv2-setting-saving', this.checked ? 'true' : 'false');
    if (this.checked) {
      saveAllModuleStates();
    } else {
      Object.keys(localStorage).filter(k => k.startsWith('uv2-module-')).forEach(k => localStorage.removeItem(k));
    }
  });
  document.querySelector("#uv2-toggle-autoafk")?.addEventListener("change", function() {
    settings.autoAfk = this.checked;
    localStorage.setItem('uv2-setting-autoafk', this.checked ? 'true' : 'false');
    if (this.checked) startAfkDetector(); else stopAfkDetector();
  });
  document.querySelector("#uv2-toggle-afkchat")?.addEventListener("change", function() {
    settings.afkChat = this.checked;
    localStorage.setItem('uv2-setting-afkchat', this.checked);
  });

  let moduleBindings = {};
  let isBinding = false;
  let lastKeyPressTime = {};
  let uiVisible = false;
  let uiAnimating = false;
  let closeUITimeout = null;
  let musicPlayerEl = null;
  let musicAudio = null;
  let musicIsPlaying = false;
  let isMusicPlayerActive = false;
  let isRestoring = false;

  const settings = {
    moduleSounds:      localStorage.getItem('uv2-setting-sounds')    !== 'false',
    showNotifications: localStorage.getItem('uv2-setting-notifs')    !== 'false',
    animateUI:         localStorage.getItem('uv2-setting-animation') !== 'false',
    saving:            localStorage.getItem('uv2-setting-saving')    === 'true',
    autoAfk:           localStorage.getItem('uv2-setting-autoafk')  === 'true',
    afkChat:           localStorage.getItem('uv2-setting-afkchat')  !== 'false',
  };


  const soundsToggle = document.querySelector("#uv2-toggle-sounds");
  if (soundsToggle) soundsToggle.checked = settings.moduleSounds;
  const notifsToggle = document.querySelector("#uv2-toggle-notifs");
  if (notifsToggle) notifsToggle.checked = settings.showNotifications;
  const animToggle = document.querySelector("#uv2-toggle-animation");
  if (animToggle) animToggle.checked = settings.animateUI;
  const savingToggle = document.querySelector("#uv2-toggle-saving");
  if (savingToggle) savingToggle.checked = settings.saving;
  const autoAfkToggle = document.querySelector("#uv2-toggle-autoafk");
  if (autoAfkToggle) autoAfkToggle.checked = settings.autoAfk;
  const afkChatToggle = document.querySelector("#uv2-toggle-afkchat");
  if (afkChatToggle) afkChatToggle.checked = settings.afkChat;

  let afkDelay = parseInt(localStorage.getItem('uv2-setting-afkdelay') || '10', 10);
  if (isNaN(afkDelay) || afkDelay < 5) afkDelay = 5;
  if (afkDelay > 120) afkDelay = 120;
  let afkTimer = null;
  const afkDelayInput = document.querySelector("#uv2-afkdelay-input");
  if (afkDelayInput) afkDelayInput.value = afkDelay;
  afkDelayInput?.addEventListener("change", function() {
    let val = parseInt(this.value, 10);
    if (isNaN(val) || val < 5) val = 5;
    if (val > 120) val = 120;
    this.value = val;
    afkDelay = val;
    localStorage.setItem('uv2-setting-afkdelay', afkDelay);
    if (settings.autoAfk) {
      clearTimeout(afkTimer);
      afkTimer = setTimeout(onAfkTriggered, afkDelay * 1000);
    }
  });

  function playModuleClickSound(turningOn) {
    if (!settings.moduleSounds) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const master = ctx.createGain(); master.gain.value = 0.6; master.connect(ctx.destination);
      if (turningOn) {
        const click = ctx.createOscillator(); click.type = "sine";
        click.frequency.setValueAtTime(80, now); click.frequency.exponentialRampToValueAtTime(40, now + 0.04);
        const clickGain = ctx.createGain(); clickGain.gain.setValueAtTime(0.5, now); clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        click.connect(clickGain); clickGain.connect(master); click.start(now); click.stop(now + 0.05);
        const tone1 = ctx.createOscillator(); tone1.type = "sine"; tone1.frequency.setValueAtTime(520, now + 0.02);
        const gain1 = ctx.createGain(); gain1.gain.setValueAtTime(0.0, now + 0.02); gain1.gain.linearRampToValueAtTime(0.4, now + 0.045); gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
        tone1.connect(gain1); gain1.connect(master); tone1.start(now + 0.02); tone1.stop(now + 0.14);
        const tone2 = ctx.createOscillator(); tone2.type = "sine"; tone2.frequency.setValueAtTime(880, now + 0.1); tone2.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
        const gain2 = ctx.createGain(); gain2.gain.setValueAtTime(0.0, now + 0.1); gain2.gain.linearRampToValueAtTime(0.45, now + 0.13); gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        tone2.connect(gain2); gain2.connect(master); tone2.start(now + 0.1); tone2.stop(now + 0.3);
      } else {
        const tone = ctx.createOscillator(); tone.type = "sine";
        tone.frequency.setValueAtTime(600, now); tone.frequency.exponentialRampToValueAtTime(280, now + 0.18);
        const gainNode = ctx.createGain(); gainNode.gain.setValueAtTime(0.35, now); gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        tone.connect(gainNode); gainNode.connect(master); tone.start(now); tone.stop(now + 0.22);
      }
      setTimeout(() => ctx.close(), 600);
    } catch(e) {}
  }


  const translations = {
    en: { languageName:"English", title:"UnverifiedV2", autoFullscreen:"Auto Fullscreen", autoFullscreenDesc:"Automatically toggles Fullscreen", keystrokes:"Keystrokes", keystrokesDesc:"Displays the keys you press in real-time.", fpsCounter:"FPS Counter", fpsCounterDesc:"Shows the frames per second (FPS) of the game.", cpsCounter:"CPS Counter", cpsCounterDesc:"Counts how many times you click per second.", muteChat:"Mute Chat", muteChatDesc:"Prevents other players messages from appearing in chat.", pingCounter:"Ping Counter", pingCounterDesc:"Shows the latency between your client and the server.", fpsBooster:"FPS Booster", fpsBoosterDesc:"Changes settings to improve FPS (refresh page)", antiAfk:"Anti-Afk", antiAfkDesc:"Presses WASD on its own to avoid being kicked for being AFK", keepSprint:"Keep Sprint", keepSprintDesc:"Keeps you sprinting automatically.", timeDisplay:"Time Display", timeDisplayDesc:"Shows you the time so you dont have to exit full screen.", musicPlayer:"Music Player", musicPlayerDesc:"Plays music while you play.", closeUI:"Close UI", turnedOn:"was turned on", turnedOff:"was turned off", tooltipBind:"right-click to bind" },
    es: { languageName:"Espanol", title:"UnverifiedV2", autoFullscreen:"Pantalla Completa Automática", autoFullscreenDesc:"Activa/desactiva automáticamente la pantalla completa", keystrokes:"Teclas", keystrokesDesc:"Muestra las teclas que presionas en tiempo real.", fpsCounter:"Contador de FPS", fpsCounterDesc:"Muestra los fotogramas por segundo (FPS) del juego.", cpsCounter:"Contador de CPS", cpsCounterDesc:"Cuenta cuántas veces haces clic por segundo.", muteChat:"Silenciar Chat", muteChatDesc:"Evita que aparezcan mensajes de otros jugadores en el chat.", pingCounter:"Contador de Ping", pingCounterDesc:"Muestra la latencia entre tu cliente y el servidor.", fpsBooster:"Mejorador de FPS", fpsBoosterDesc:"Cambia la configuración para mejorar los FPS (actualiza la página)", antiAfk:"Anti-Inactividad", antiAfkDesc:"Presiona WASD automáticamente para evitar ser expulsado por inactividad", keepSprint:"Mantener Sprint", keepSprintDesc:"Te mantiene corriendo automáticamente.", timeDisplay:"Mostrar Hora", timeDisplayDesc:"Te muestra la hora para que no tengas que salir de pantalla completa.", musicPlayer:"Reproductor de Música", musicPlayerDesc:"Reproduce música mientras juegas.", closeUI:"Cerrar UI", turnedOn:"fue activado", turnedOff:"fue desactivado", tooltipBind:"clic derecho para vincular" },

  };

  let currentLanguage = localStorage.getItem('unverified-language') || 'en';
  Object.keys(translations).forEach(langCode => {
    const option = document.createElement("option");
    option.value = langCode; option.textContent = translations[langCode].languageName;
    if (langCode === currentLanguage) option.selected = true;
    languageDropdown.appendChild(option);
  });
  languageDropdown.addEventListener("change", e => { currentLanguage = e.target.value; localStorage.setItem('unverified-language', currentLanguage); updateLanguage(); });


  const MODULE_NAMES = {
    AUTO_FULLSCREEN: "Auto Fullscreen",
    KEYSTROKES:      "Keystrokes",
    FPS_COUNTER:     "FPS Counter",
    CPS_COUNTER:     "CPS Counter",
    MUTE_CHAT:       "Mute Chat",
    PING_COUNTER:    "Ping Counter",
    FPS_BOOSTER:     "FPS Booster",
    ANTI_AFK:        "Anti-Afk",
    KEEP_SPRINT:     "Keep Sprint",
    TIME_DISPLAY:    "Time Display",
    MUSIC_PLAYER:    "Music Player",
  };

  const gridContainer = document.createElement("div");
  gridContainer.style.display = "flex";
  gridContainer.style.flexDirection = "column";
  gridContainer.style.gap = "8px";
  gridContainer.style.marginTop = "16px";
  uv2MainPage.appendChild(gridContainer);

  const notificationContainer = document.createElement("div");
  notificationContainer.style.cssText = "position:fixed;bottom:1in;right:20px;z-index:10000;display:flex;flex-direction:column-reverse;align-items:flex-end;";
  document.body.appendChild(notificationContainer);

  function showNotification(message, isOn) {
    if (!settings.showNotifications) return;
    const notification = document.createElement("div");
    const moduleName = message.split(' was ')[0];
    notification.textContent = `${moduleName} ${isOn ? (translations[currentLanguage]?.turnedOn || "was turned on") : (translations[currentLanguage]?.turnedOff || "was turned off")}`;
    notification.classList.add('other-notification');
    const progressBar = document.createElement("div");
    progressBar.classList.add("notification-progress");
    notification.appendChild(progressBar);
    notificationContainer.appendChild(notification);
    setTimeout(() => { notification.style.transform = "translateX(0)"; notification.style.opacity = "1"; }, 10);
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"; notification.style.opacity = "0";
      setTimeout(() => { notificationContainer.removeChild(notification); }, 500);
    }, 3000);
  }

  function showCustomNotification(message, success = true) {
    if (!settings.showNotifications) return;
    const notification = document.createElement('div');
    notification.classList.add('other-notification');
    notification.textContent = message;
    const progressBar = document.createElement('div');
    progressBar.classList.add('notification-progress');
    notification.appendChild(progressBar);
    notificationContainer.appendChild(notification);
    setTimeout(() => { notification.style.transform = 'translateX(0)'; notification.style.opacity = '1'; }, 10);
    setTimeout(() => { notification.style.transform = 'translateX(100%)'; notification.style.opacity = '0'; setTimeout(() => { notificationContainer.removeChild(notification); }, 500); }, 3000);
  }

  function showBindPopup(moduleElement, moduleName) {
    const existingPopup = document.querySelector('.bind-popup');
    if (existingPopup) existingPopup.remove();
    const popup = document.createElement("div"); popup.classList.add("bind-popup"); document.body.appendChild(popup);
    const popupTitle = document.createElement("h3"); popupTitle.textContent = `Bind Key for ${moduleName}`; popup.appendChild(popupTitle);
    const inputBox = document.createElement("input"); inputBox.placeholder = "Press a key...";
    if (moduleBindings[moduleName]) inputBox.value = moduleBindings[moduleName];
    popup.appendChild(inputBox);
    const bindButton = document.createElement("button"); bindButton.textContent = "Bind";
    const resetButton = document.createElement("button"); resetButton.textContent = "Unbind";
    const closeBtn = document.createElement("button"); closeBtn.textContent = "Close";
    popup.appendChild(bindButton); popup.appendChild(resetButton); popup.appendChild(closeBtn);
    closeBtn.addEventListener("click", () => { popup.style.display = "none"; isBinding = false; });
    let keyBinding = null;
    inputBox.addEventListener("keydown", e => { e.preventDefault(); keyBinding = e.key; inputBox.value = e.key; });
    bindButton.addEventListener("click", () => { if (keyBinding) { moduleBindings[moduleName] = keyBinding; showNotification(`Bound ${moduleName} to ${keyBinding}`, true); } popup.style.display = "none"; isBinding = false; });
    resetButton.addEventListener("click", () => { delete moduleBindings[moduleName]; showNotification(`${moduleName} unbound`, false); popup.style.display = "none"; isBinding = false; });
    const rect = moduleElement.getBoundingClientRect();
    popup.style.top = `${rect.top + window.scrollY + rect.height + 10}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
    popup.style.display = "block"; isBinding = true;
  }

  function createModule(name, description) {
    const moduleContainer = document.createElement("div");
    moduleContainer.style.cssText = [
      "display:flex;align-items:center;height:52px;padding:0 16px;",
      "border-radius:8px;background:linear-gradient(135deg,#242424,#1c1c1c);",
      "border:1px solid rgba(255,255,255,0.07);cursor:pointer;",
      "transition:all 0.18s ease;box-shadow:0 1px 4px rgba(0,0,0,0.4);",
      "position:relative;user-select:none;width:100%;box-sizing:border-box;flex-shrink:0;"
    ].join("");
    moduleContainer.classList.add('module-container');
    moduleContainer.dataset.moduleName = name;
    moduleContainer._uv2Active = false;

    const nameSection = document.createElement("div");
    nameSection.style.cssText = "min-width:155px;flex-shrink:0;display:flex;align-items:center;gap:9px;";
    const moduleTitleEl = document.createElement("span");
    moduleTitleEl.textContent = name;
    moduleTitleEl.style.cssText = `color:${guiPrimaryColor};font-size:13.5px;font-family:MinibloxFont,sans-serif;white-space:nowrap;text-shadow:0 0 18px ${guiPrimaryColor}40;`;
    nameSection.appendChild(moduleTitleEl);
    moduleContainer.appendChild(nameSection);

    const divider = document.createElement("div");
    divider.style.cssText = "width:1px;height:22px;background:rgba(255,255,255,0.09);flex-shrink:0;margin:0 16px;";
    moduleContainer.appendChild(divider);

    const descEl = document.createElement("p");
    descEl.textContent = description;
    descEl.style.cssText = "flex:1;color:#555;font-size:12px;font-family:MinibloxFont,sans-serif;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
    moduleContainer.appendChild(descEl);

    const toggleWrap = document.createElement("div");
    toggleWrap.style.cssText = "width:36px;height:20px;border-radius:10px;background:#252525;flex-shrink:0;margin-left:14px;position:relative;transition:background 0.2s ease;border:1px solid rgba(255,255,255,0.07);";
    const toggleKnob = document.createElement("div");
    toggleKnob.style.cssText = "position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#4a4a4a;transition:all 0.2s ease;";
    toggleWrap.appendChild(toggleKnob);
    moduleContainer.appendChild(toggleWrap);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.title = "Delete module";
    deleteBtn.style.cssText = [
      "display:none;margin-left:10px;flex-shrink:0;",
      "width:22px;height:22px;border-radius:5px;",
      "background:rgba(231,76,60,0.15);border:1px solid rgba(231,76,60,0.35);",
      "color:#e74c3c;font-size:12px;line-height:1;cursor:pointer;",
      "transition:background 0.15s ease,border-color 0.15s ease;",
      "display:flex;align-items:center;justify-content:center;padding:0;",
      "opacity:0;pointer-events:none;"
    ].join("");
    deleteBtn.addEventListener("mouseenter", () => { deleteBtn.style.background = "rgba(231,76,60,0.35)"; deleteBtn.style.borderColor = "#e74c3c"; });
    deleteBtn.addEventListener("mouseleave", () => { deleteBtn.style.background = "rgba(231,76,60,0.15)"; deleteBtn.style.borderColor = "rgba(231,76,60,0.35)"; });
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!moduleContainer._isCustom) return;
      const saved = JSON.parse(localStorage.getItem('uv2-custom-modules') || '[]');
      const updated = saved.filter(s => s.name !== name);
      localStorage.setItem('uv2-custom-modules', JSON.stringify(updated));
      localStorage.removeItem('uv2-module-' + name);
      if (moduleContainer._uv2Active) {
        try { const offFn = moduleContainer._customExports?.OnToggledOff; if (typeof offFn === 'function') offFn(); } catch(ex) {}
        if (moduleContainer._customStop) { try { moduleContainer._customStop(); } catch(ex) {} moduleContainer._customStop = null; }
      }
      moduleContainer.remove();
      showNotification(`${name} deleted`, false);
    });
    moduleContainer.appendChild(deleteBtn);
    moduleContainer._deleteBtn = deleteBtn;

    const tooltip = document.createElement("div");
    tooltip.classList.add("module-tooltip");
    tooltip.textContent = translations[currentLanguage]?.tooltipBind || "right-click to bind";
    moduleContainer.appendChild(tooltip);

    moduleContainer._toggleWrap = toggleWrap;
    moduleContainer._toggleKnob = toggleKnob;

    gridContainer.appendChild(moduleContainer);

    let tooltipTimeout;
    moduleContainer.addEventListener("mouseenter", () => {
      tooltipTimeout = setTimeout(() => { tooltip.style.visibility = "visible"; tooltip.style.opacity = 1; }, 1500);
      if (!moduleContainer._uv2Active) moduleContainer.style.background = "linear-gradient(135deg,#2c2c2c,#222222)";
    });
    moduleContainer.addEventListener("mouseleave", () => {
      clearTimeout(tooltipTimeout); tooltip.style.visibility = "hidden"; tooltip.style.opacity = 0;
      if (!moduleContainer._uv2Active) moduleContainer.style.background = "linear-gradient(135deg,#242424,#1c1c1c)";
    });
    moduleContainer.addEventListener("click", () => {
      if (!isBinding) {
        moduleContainer._uv2Active = !moduleContainer._uv2Active;
        const isActive = moduleContainer._uv2Active;
        moduleContainer.classList.add('module-toggle-animation');
        setTimeout(() => moduleContainer.classList.remove('module-toggle-animation'), 300);
        if (!isRestoring) {
          if (settings.saving) localStorage.setItem('uv2-module-' + name, isActive ? 'true' : 'false');
          playModuleClickSound(isActive);
        }
        if (isActive) {
          moduleContainer.style.border = `1px solid ${guiPrimaryColor}80`;
          moduleContainer.style.background = "linear-gradient(135deg,#1d2b1f,#182018)";
          moduleContainer.style.boxShadow = `0 0 0 3px ${guiPrimaryColor}14, 0 1px 4px rgba(0,0,0,0.4)`;
          toggleWrap.style.background = `${guiPrimaryColor}40`; toggleWrap.style.borderColor = `${guiPrimaryColor}60`;
          toggleKnob.style.background = guiPrimaryColor; toggleKnob.style.transform = "translateX(16px)";
          if (!isRestoring) showNotification(`${name} was turned on`, true);
          if (moduleContainer._isCustom && moduleContainer._customCode) {
            try {
              const unv = {
                CustomNotification: (msg, success = true) => showCustomNotification(msg, success),
                CustomNotifcation: (msg, success = true) => showCustomNotification(msg, success)
              };
              const wrapped = new Function('unv', moduleContainer._customCode + '\nreturn { OnToggledOn: typeof OnToggledOn === "function" ? OnToggledOn : null, OnToggledOff: typeof OnToggledOff === "function" ? OnToggledOff : null };');
              moduleContainer._customExports = wrapped(unv) || {};
              const onFn = moduleContainer._customExports.OnToggledOn;
              if (typeof onFn === 'function') {
                const res = onFn();
                if (typeof res === 'function') moduleContainer._customStop = res;
              }
            } catch (err) { console.error('[uv2] custom module error', err); showCustomNotification(`${name} error`, false); }
          }
        } else {
          moduleContainer.style.border = "1px solid rgba(255,255,255,0.07)";
          moduleContainer.style.background = "linear-gradient(135deg,#242424,#1c1c1c)";
          moduleContainer.style.boxShadow = "0 1px 4px rgba(0,0,0,0.4)";
          toggleWrap.style.background = "#252525"; toggleWrap.style.borderColor = "rgba(255,255,255,0.07)";
          toggleKnob.style.background = "#4a4a4a"; toggleKnob.style.transform = "translateX(0)";
          if (!isRestoring) showNotification(`${name} was turned off`, false);
          if (moduleContainer._isCustom) {
            try { const offFn = moduleContainer._customExports?.OnToggledOff; if (typeof offFn === 'function') offFn(); } catch (e) { console.error('[uv2] custom module OnToggledOff error', e); }}
            if (moduleContainer._customStop) { try { moduleContainer._customStop(); } catch (e) { console.error('[uv2] custom module cleanup error', e); } moduleContainer._customStop = null; }
            moduleContainer._customExports = null;
        }
      }
    });
    moduleContainer.addEventListener("contextmenu", event => { event.preventDefault(); showBindPopup(moduleContainer, name); });
    return moduleContainer;
  }
  (function restoreCustomModules(){
    try {
      const saved = JSON.parse(localStorage.getItem('uv2-custom-modules') || '[]');
      if (Array.isArray(saved)) {
        saved.forEach(s => {
          try {
            const mc = createModule(s.name || ('Custom Module ' + (Math.floor(Math.random()*9000)+1000)), s.desc || 'Custom module');
            mc._isCustom = true;
            mc._customCode = s.code || '';
            if (mc._deleteBtn) { mc._deleteBtn.style.opacity = '1'; mc._deleteBtn.style.pointerEvents = 'auto'; }
            if (settings.saving && localStorage.getItem('uv2-module-' + mc.dataset.moduleName) === 'true') {
              mc.click();
            }
          } catch(e){ console.error('[uv2] restore custom module error', e); }
        });
      }
    } catch(e) { console.error('[uv2] failed to parse saved custom modules', e); }
  })();

  function updateLanguage() {
    title.textContent = translations[currentLanguage]?.title || "UnverifiedV2";
    closeButton.textContent = translations[currentLanguage]?.closeUI || "Close UI";
    const modules = gridContainer.children;
    const moduleKeys = ['autoFullscreen','keystrokes','fpsCounter','cpsCounter','muteChat','pingCounter','fpsBooster','antiAfk','keepSprint','timeDisplay','musicPlayer'];
    for (let i = 0; i < modules.length; i++) {
      const moduleTitle = modules[i].querySelector("span");
      const moduleDesc = modules[i].querySelector("p");
      const tooltip = modules[i].querySelector(".module-tooltip");
      if (moduleTitle && moduleKeys[i]) {
        moduleTitle.textContent = translations[currentLanguage]?.[moduleKeys[i]] || moduleKeys[i];
        moduleDesc.textContent = translations[currentLanguage]?.[moduleKeys[i] + 'Desc'] || "";
        tooltip.textContent = translations[currentLanguage]?.tooltipBind || "right-click to bind";
      }
    }
  }


  const autoFullscreenModule = createModule(MODULE_NAMES.AUTO_FULLSCREEN, "Automatically toggles Fullscreen");
  let isAutoFullscreenActive = false;
  autoFullscreenModule.addEventListener("click", () => {
    isAutoFullscreenActive = !isAutoFullscreenActive;
    if (isAutoFullscreenActive) {
      (document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen || document.documentElement.msRequestFullscreen || (() => {})).call(document.documentElement);
    } else {
      (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen || (() => {})).call(document);
    }
  });

  const keystrokesModule = createModule(MODULE_NAMES.KEYSTROKES, "Displays the keys you press in real-time.");
  let isKeystrokesActive = false;
  keystrokesModule.addEventListener("click", () => {
    isKeystrokesActive = !isKeystrokesActive;
    if (isKeystrokesActive) {
      if (document.getElementById('keystrokes-container')) document.getElementById('keystrokes-container').remove();
      const kc = document.createElement('div'); kc.id = 'keystrokes-container';
      kc.style.cssText = 'z-index:10000;width:300px;height:230px;position:fixed;opacity:100%;box-shadow:none;background-color:transparent;transform:translate(-50%,-50%);display:flex;flex-direction:column;align-items:center;user-select:none;';
      const savedL = localStorage.getItem('left'), savedT = localStorage.getItem('top');
      kc.style.left = (savedL ? parseInt(savedL) : window.innerWidth/2) + 'px';
      kc.style.top = (savedT ? parseInt(savedT) : window.innerHeight/2) + 'px';
      document.body.appendChild(kc);
      let isDragging = false;
      kc.addEventListener('mousedown', e => { if (e.target.nodeName !== 'INPUT') isDragging = true; });
      document.addEventListener('mousemove', e => { if (isDragging) { kc.style.left = e.clientX + 'px'; kc.style.top = e.clientY + 'px'; localStorage.setItem('left', e.clientX); localStorage.setItem('top', e.clientY); } });
      document.addEventListener('mouseup', () => { isDragging = false; });
      const createKey = (text, style = {}) => {
        const key = document.createElement('div'); key.textContent = text;
        Object.assign(key.style, { position:'absolute', color:'#ffffff', fontWeight:'bold', borderRadius:'0', backgroundColor:'rgba(128,128,128,0.7)', border:'3px solid #333333', fontSize:'18px', height:'50px', width:'50px', textAlign:'center', lineHeight:'50px', fontFamily:'Roboto Mono, monospace', zIndex:'10000', ...style });
        return key;
      };
      const wkey = createKey('W', {top:'0px',left:'125px'}), akey = createKey('A', {top:'55px',left:'70px'}), skey = createKey('S', {top:'55px',left:'125px'}), dkey = createKey('D', {top:'55px',left:'180px'});
      const lmb = createKey('LMB', {top:'110px',left:'70px',width:'79px'}), rmb = createKey('RMB', {top:'110px',left:'150px',width:'79px'}), space = createKey('_____', {top:'170px',left:'70px',width:'160px'});
      kc.append(wkey, akey, skey, dkey, lmb, rmb, space);
      const downColor = '#8B0000', upColor = 'rgba(128,128,128,0.7)';
      document.addEventListener('keydown', e => { if(e.code==='KeyW') wkey.style.backgroundColor=downColor; if(e.code==='KeyS') skey.style.backgroundColor=downColor; if(e.code==='KeyA') akey.style.backgroundColor=downColor; if(e.code==='KeyD') dkey.style.backgroundColor=downColor; if(e.code==='Space') space.style.backgroundColor=downColor; });
      document.addEventListener('keyup', e => { if(e.code==='KeyW') wkey.style.backgroundColor=upColor; if(e.code==='KeyS') skey.style.backgroundColor=upColor; if(e.code==='KeyA') akey.style.backgroundColor=upColor; if(e.code==='KeyD') dkey.style.backgroundColor=upColor; if(e.code==='Space') space.style.backgroundColor=upColor; });
      document.addEventListener('mousedown', e => { if(e.button===0) lmb.style.backgroundColor=downColor; if(e.button===2) rmb.style.backgroundColor=downColor; });
      document.addEventListener('mouseup', e => { if(e.button===0) lmb.style.backgroundColor=upColor; if(e.button===2) rmb.style.backgroundColor=upColor; });
    } else {
      const kc = document.getElementById('keystrokes-container'); if (kc) kc.remove();
    }
  });

  createModule(MODULE_NAMES.FPS_COUNTER, "Shows the frames per second (FPS) of the game.");
  const fpsModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.FPS_COUNTER);
  let isFPSVisible = false, fpsElement = null, lastFrameTime = performance.now(), frameCount = 0;
  if (fpsModule) {
    fpsModule.addEventListener("click", () => {
      isFPSVisible = !isFPSVisible;
      if (isFPSVisible) {
        fpsElement = document.createElement("div"); fpsElement.id = "fps-counter";
        fpsElement.style.cssText = "position:fixed;top:60px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:99999;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
        const fpsDot = document.createElement("div"); fpsDot.id = "fps-dot"; fpsDot.style.cssText = `width:10px;height:10px;border-radius:50%;background-color:${guiPrimaryColor};box-shadow:0 0 12px ${guiPrimaryColor}99;transition:all 0.3s ease;`;
        const fpsValue = document.createElement("div"); fpsValue.id = "fps-value"; fpsValue.textContent = "0 FPS"; fpsValue.style.cssText = "font-size:16px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;transition:color 0.3s ease;";
        fpsElement.appendChild(fpsDot); fpsElement.appendChild(fpsValue); document.body.appendChild(fpsElement);
        let offX=0, offY=0, isDrag=false;
        fpsElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-fpsElement.getBoundingClientRect().left; offY=e.clientY-fpsElement.getBoundingClientRect().top; e.preventDefault(); });
        document.addEventListener("mousemove", e => { if(isDrag){ fpsElement.style.left=`${e.clientX-offX}px`; fpsElement.style.top=`${e.clientY-offY}px`; } });
        document.addEventListener("mouseup", () => { isDrag=false; });
        const updateFPS = () => {
          const now = performance.now(); frameCount++;
          if (now - lastFrameTime >= 1000) {
            const fps = frameCount; const v = document.getElementById("fps-value"); const d = document.getElementById("fps-dot");
            if (v && d) { v.textContent = `${fps} FPS`; const c = fps>=60?"#4CAF50":fps>=45?"#8BC34A":fps>=30?"#FFC107":fps>=20?"#FF9800":"#F44336"; v.style.color=c; d.style.backgroundColor=c; d.style.boxShadow=`0 0 12px ${c}99`; }
            frameCount = 0; lastFrameTime = now;
          }
          if (isFPSVisible) requestAnimationFrame(updateFPS);
        };
        requestAnimationFrame(updateFPS);
      } else if (fpsElement) { fpsElement.remove(); fpsElement = null; }
    });
  }

  const mouseModule = createModule(MODULE_NAMES.CPS_COUNTER, "Counts how many times you click per second.");
  let isMouseActive=false, clickTimes=[], mouseElement=null;
  const strokeColor="#FFFFFF", idleFill="rgba(255,255,255,0.1)", activeFill="rgba(255,255,255,0.8)";
  mouseModule.addEventListener("click", () => {
    isMouseActive = !isMouseActive;
    if (isMouseActive) {
      if (!mouseElement) {
        mouseElement = document.createElement("div"); mouseElement.id = "mouse-strokes-hud";
        mouseElement.style.cssText = "position:fixed;top:100px;left:20px;padding:10px;z-index:99999;user-select:none;cursor:move;display:flex;flex-direction:column;align-items:center;gap:5px;filter:drop-shadow(0px 0px 8px rgba(0,0,0,0.8));";
        mouseElement.innerHTML = `<svg id="mouse-svg" width="70" height="95" viewBox="0 0 100 140"><path id="m-left" d="M10 40 Q 10 10, 48 10 L 48 65 L 10 65 Z" fill="${idleFill}" stroke="${strokeColor}" stroke-width="6"/><path id="m-right" d="M90 40 Q 90 10, 52 10 L 52 65 L 90 65 Z" fill="${idleFill}" stroke="${strokeColor}" stroke-width="6"/><path d="M10 65 L 90 65 Q 90 130, 50 130 Q 10 130, 10 65" fill="none" stroke="${strokeColor}" stroke-width="6"/><rect x="43" y="22" width="14" height="24" rx="7" fill="${strokeColor}"/></svg><div id="cps-display" style="color:white;font-size:20px;font-weight:900;text-shadow:0px 0px 10px rgba(0,0,0,1);">0 CPS</div>`;
        document.body.appendChild(mouseElement);
        let isDrag=false, offX, offY;
        mouseElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-mouseElement.getBoundingClientRect().left; offY=e.clientY-mouseElement.getBoundingClientRect().top; });
        document.addEventListener("mousemove", e => { if(isDrag){ mouseElement.style.left=(e.clientX-offX)+"px"; mouseElement.style.top=(e.clientY-offY)+"px"; } });
        document.addEventListener("mouseup", () => isDrag=false);
      }
      const handleInteraction = e => {
        if (e.type==="mousedown") { if(e.button===0) document.getElementById("m-left").setAttribute("fill",activeFill); if(e.button===2) document.getElementById("m-right").setAttribute("fill",activeFill); clickTimes.push(Date.now()); }
        else if (e.type==="mouseup") { if(e.button===0) document.getElementById("m-left").setAttribute("fill",idleFill); if(e.button===2) document.getElementById("m-right").setAttribute("fill",idleFill); }
      };
      document.addEventListener("mousedown", handleInteraction); document.addEventListener("mouseup", handleInteraction);
      document.addEventListener("contextmenu", e => e.preventDefault());
      function updateLoop() { const now=Date.now(); clickTimes=clickTimes.filter(t=>now-t<=1000); const d=document.getElementById("cps-display"); if(d) d.textContent=`${clickTimes.length} CPS`; if(isMouseActive) requestAnimationFrame(updateLoop); }
      updateLoop(); mouseModule._handler = handleInteraction;
    } else {
      if (mouseElement) { mouseElement.remove(); mouseElement=null; }
      if (mouseModule._handler) { document.removeEventListener("mousedown",mouseModule._handler); document.removeEventListener("mouseup",mouseModule._handler); }
    }
  });

  const muteChatModule = createModule(MODULE_NAMES.MUTE_CHAT, "Prevents other players messages from appearing in chat.");
  let isMuteChatActive=false, originalAddChat=null;
  muteChatModule.addEventListener("click", () => {
    isMuteChatActive = !isMuteChatActive;
    const reactRoot = document.querySelector("#react"); if (!reactRoot) return;
    try {
      const fiber = Object.values(reactRoot)[0];
      const game = fiber?.updateQueue?.baseState?.element?.props?.game;
      if (game && game.chat) {
        if (isMuteChatActive) { if(!originalAddChat) originalAddChat=game.chat.addChat; game.chat.addChat=function(){}; }
        else { if(originalAddChat) game.chat.addChat=originalAddChat; }
      }
    } catch(e) {}
  });

  const pingModule = createModule(MODULE_NAMES.PING_COUNTER, "Shows the latency between your client and the server.");
  let isPingActive=false, pingElement=null, pingInterval=null;
  pingModule.addEventListener("click", () => {
    isPingActive = !isPingActive;
    if (isPingActive) {
      pingElement = document.createElement("div"); pingElement.id="ping-counter";
      pingElement.style.cssText = "position:fixed;top:20px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:10000;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
      const pingDot = document.createElement("div"); pingDot.id="ping-dot"; pingDot.style.cssText = `width:10px;height:10px;border-radius:50%;background-color:${guiPrimaryColor};box-shadow:0 0 12px ${guiPrimaryColor}99;transition:all 0.3s ease;`;
      const pingValue = document.createElement("div"); pingValue.id="ping-value"; pingValue.textContent="--- ms"; pingValue.style.cssText="font-size:16px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;transition:color 0.3s ease;";
      pingElement.appendChild(pingDot); pingElement.appendChild(pingValue); document.body.appendChild(pingElement);
      let isDrag=false, offX=0, offY=0;
      pingElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-pingElement.getBoundingClientRect().left; offY=e.clientY-pingElement.getBoundingClientRect().top; e.preventDefault(); });
      document.addEventListener("mousemove", e => { if(isDrag){ pingElement.style.left=`${e.clientX-offX}px`; pingElement.style.top=`${e.clientY-offY}px`; } });
      document.addEventListener("mouseup", () => { isDrag=false; });
      const updatePing = () => {
        const start = Date.now();
        fetch(window.location.href, {method:'HEAD',cache:"no-cache"}).then(() => {
          const ping=Date.now()-start; const v=document.getElementById("ping-value"); const d=document.getElementById("ping-dot");
          if(v&&d){ v.textContent=`${ping} ms`; const c=ping<50?"#4CAF50":ping<100?"#8BC34A":ping<150?"#FFC107":ping<200?"#FF9800":"#F44336"; v.style.color=c; d.style.backgroundColor=c; d.style.boxShadow=`0 0 12px ${c}99`; }
        }).catch(() => { const v=document.getElementById("ping-value"); const d=document.getElementById("ping-dot"); if(v&&d){ v.textContent="N/A"; v.style.color="#9E9E9E"; d.style.backgroundColor="#9E9E9E"; } });
      };
      updatePing(); pingInterval = setInterval(updatePing, 1000);
    } else { if(pingElement){ pingElement.remove(); pingElement=null; } clearInterval(pingInterval); }
  });

  createModule(MODULE_NAMES.FPS_BOOSTER, "Changes settings to improve FPS (refresh page)");
  createModule(MODULE_NAMES.ANTI_AFK, "Presses WASD on its own to avoid being kicked for being AFK");
  const antiAfkModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
  let isAntiAfkActive=false, antiAfkInterval=null, antiAfkBox=null;
  if (antiAfkModule) {
    antiAfkModule.addEventListener("click", () => {
      isAntiAfkActive = !isAntiAfkActive;
      if (isAntiAfkActive) {
        antiAfkBox = document.createElement("div"); antiAfkBox.id="anti-afk-counter";
        antiAfkBox.style.cssText = "position:fixed;top:100px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:9999;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
        const afkDot = document.createElement("div"); afkDot.style.cssText = `width:10px;height:10px;border-radius:50%;background-color:${guiPrimaryColor};box-shadow:0 0 12px ${guiPrimaryColor}99;animation:afkPulse 1.5s infinite;`;
        const afkText = document.createElement("div"); afkText.textContent="Anti-AFK"; afkText.style.cssText = `font-size:16px;font-weight:700;color:${guiPrimaryColor};letter-spacing:0.5px;`;
        antiAfkBox.appendChild(afkDot); antiAfkBox.appendChild(afkText);
        const afkStyle = document.createElement("style"); afkStyle.textContent="@keyframes afkPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.2)}}"; document.head.appendChild(afkStyle);
        document.body.appendChild(antiAfkBox);
        let isDrag=false, offX=0, offY=0;
        antiAfkBox.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-antiAfkBox.getBoundingClientRect().left; offY=e.clientY-antiAfkBox.getBoundingClientRect().top; e.preventDefault(); });
        document.addEventListener("mousemove", e => { if(isDrag){ antiAfkBox.style.left=`${e.clientX-offX}px`; antiAfkBox.style.top=`${e.clientY-offY}px`; } });
        document.addEventListener("mouseup", () => { isDrag=false; });
        const keys=[['w','KeyW',87],['a','KeyA',65],['s','KeyS',83],['d','KeyD',68],[' ','Space',32]]; let idx=0;
        antiAfkInterval = setInterval(() => {
          const [key,code,keyCode]=keys[idx]; idx=(idx+1)%keys.length;
          const t=document.activeElement||document.body;
          t.dispatchEvent(new KeyboardEvent('keydown',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true}));
          setTimeout(()=>t.dispatchEvent(new KeyboardEvent('keyup',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true})),50);
        }, 500);
      } else { if(antiAfkInterval) clearInterval(antiAfkInterval); if(antiAfkBox) antiAfkBox.remove(); }
    });
  }

  createModule(MODULE_NAMES.KEEP_SPRINT, "Keeps you sprinting automatically.");
  const keepSprintModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.KEEP_SPRINT);
  let keepSprintHandler = null;
  if (keepSprintModule) {
    keepSprintModule.addEventListener("click", () => {
      const isActive = keepSprintModule._uv2Active;
      if (isActive) {
        keepSprintHandler = e => {
          if (!['KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) return;
          const t = document.activeElement || document.body;
          t.dispatchEvent(new KeyboardEvent('keydown', {
            key: 'Shift', code: 'ShiftLeft', keyCode: 16, which: 16,
            location: 1, bubbles: true, cancelable: true,
          }));
        };
        document.addEventListener('keydown', keepSprintHandler);
      } else {
        if (keepSprintHandler) {
          document.removeEventListener('keydown', keepSprintHandler);
          keepSprintHandler = null;
        }
      }
    });
  }

  createModule(MODULE_NAMES.TIME_DISPLAY, "Shows you the time so you dont have to exit full screen.");
  const timeModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.TIME_DISPLAY);
  let isTimeVisible=false, timeElement=null;
  if (timeModule) {
    timeModule.addEventListener("click", () => {
      isTimeVisible = !isTimeVisible;
      if (isTimeVisible) {
        timeElement = document.createElement("div"); timeElement.id="fullscreen-clock";
        timeElement.style.cssText = `position:fixed;bottom:20px;right:20px;background-color:${guiBackgroundColor}CC;color:${guiTextColor};padding:10px 15px;border-radius:8px;font-size:18px;font-family:monospace;z-index:99999;cursor:move;border:1px solid ${guiPrimaryColor};`;
        let isDrag=false, offX=0, offY=0;
        timeElement.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-timeElement.getBoundingClientRect().left; offY=e.clientY-timeElement.getBoundingClientRect().top; e.preventDefault(); });
        document.addEventListener("mousemove", e => { if(isDrag){ timeElement.style.left=`${e.clientX-offX}px`; timeElement.style.top=`${e.clientY-offY}px`; timeElement.style.bottom="auto"; timeElement.style.right="auto"; } });
        document.addEventListener("mouseup", () => { isDrag=false; });
        document.body.appendChild(timeElement);
        const updateClock = () => { timeElement.textContent = new Date().toLocaleTimeString(); };
        updateClock(); timeElement._interval = setInterval(updateClock, 1000);
      } else if (timeElement) { clearInterval(timeElement._interval); timeElement.remove(); timeElement=null; }
    });
  }

  createModule(MODULE_NAMES.MUSIC_PLAYER, "Plays music while you play.");
  const musicModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.MUSIC_PLAYER);
  const JAMENDO_KEY = "0c5e9d9e";
  function jamendoSearch(query) {
    return new Promise((resolve, reject) => {
      GM_xmlhttpRequest({
        method: "GET",
        url: `https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_KEY}&format=json&limit=10&search=${encodeURIComponent(query)}&include=musicinfo`,
        timeout: 8000,
        onload(r) { try { resolve(JSON.parse(r.responseText).results || []); } catch(e) { reject(e); } },
        onerror() { reject(new Error("Network error")); },
        ontimeout() { reject(new Error("Timeout")); }
      });
    });
  }
  if (musicModule) {
    musicModule.addEventListener("click", () => {
      isMusicPlayerActive = !isMusicPlayerActive;
      if (isMusicPlayerActive) {
        musicPlayerEl = document.createElement("div"); musicPlayerEl.id = "unverified-music-player";
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
        musicPlayerEl.querySelector("#mp-close").addEventListener("click", () => {
          if (musicAudio) { musicAudio.pause(); musicAudio.src=""; musicAudio=null; }
          musicIsPlaying=false; isMusicPlayerActive=false; musicPlayerEl.remove(); musicPlayerEl=null;
        });
        let isDrag=false, offX=0, offY=0;
        header.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-musicPlayerEl.getBoundingClientRect().left; offY=e.clientY-musicPlayerEl.getBoundingClientRect().top; e.preventDefault(); });
        document.addEventListener("mousemove", e => { if(!isDrag) return; musicPlayerEl.style.left=(e.clientX-offX)+"px"; musicPlayerEl.style.top=(e.clientY-offY)+"px"; musicPlayerEl.style.bottom="auto"; });
        document.addEventListener("mouseup", () => { isDrag=false; });
        function loadAudioSrc(src, title, artist, imageUrl) {
          if (musicAudio) { musicAudio.pause(); musicAudio.src=""; musicAudio=null; }
          musicIsPlaying=false; playBtn.innerHTML="&#9654;";
          songTitle.textContent=title||src; artistEl.textContent=artist||"—"; albumArt.src=imageUrl||"";
          musicAudio = new Audio(); musicAudio.crossOrigin="anonymous"; musicAudio.volume=volSlider.value/100; musicAudio.src=src;
          musicAudio.addEventListener("timeupdate", () => { if(musicAudio.duration) progressBar.style.width=((musicAudio.currentTime/musicAudio.duration)*100).toFixed(2)+"%"; });
          musicAudio.addEventListener("ended", () => { playBtn.innerHTML="&#9654;"; musicIsPlaying=false; });
          musicAudio.addEventListener("error", () => { songTitle.textContent="failed to load"; playBtn.innerHTML="&#9654;"; musicIsPlaying=false; });
          musicAudio.play().then(() => { playBtn.innerHTML="&#9646;&#9646;"; musicIsPlaying=true; }).catch(()=>{});
        }
        async function doSearch() {
          const q=searchInput.value.trim(); if(!q) return;
          resultsBox.innerHTML=`<div class="mp-msg">searching...</div>`; resultsBox.style.display="block";
          let tracks; try { tracks=await jamendoSearch(q); } catch(e) { tracks=[]; }
          resultsBox.innerHTML="";
          if (!tracks.length) { resultsBox.innerHTML=`<div class="mp-msg">nothing found</div>`; return; }
          tracks.forEach(track => {
            const row=document.createElement("div"); row.className="mp-result";
            row.innerHTML=`<img class="mp-result-img" src="${track.image||""}" alt="" loading="lazy"/><div class="mp-result-info"><div class="mp-result-name">${track.name}</div><div class="mp-result-by">${track.artist_name}</div></div>`;
            row.addEventListener("click", () => { resultsBox.style.display="none"; resultsBox.innerHTML=""; loadAudioSrc(`https://prod-1.storage.jamendo.com/?trackid=${track.id}&format=mp31&from=app-97dab294`, track.name, track.artist_name, track.image||null); });
            resultsBox.appendChild(row);
          });
        }
        searchBtn.addEventListener("click", doSearch);
        const urlInput=musicPlayerEl.querySelector("#mp-url-input"), urlBtn=musicPlayerEl.querySelector("#mp-url-btn");
        function playFromUrl() {
          const raw=urlInput.value.trim(); if(!raw) return;
          const previewBox=musicPlayerEl.querySelector("#mp-url-preview"); if(previewBox) previewBox.remove();
          const preview=document.createElement("div"); preview.id="mp-url-preview";
          preview.style.cssText="display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid #161616;background:#111;";
          const icon=document.createElement("div"); icon.style.cssText="width:32px;height:32px;flex-shrink:0;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:18px;color:#e74c3c;"; icon.textContent="♪";
          const info=document.createElement("div"); info.style.cssText="flex:1;min-width:0;";
          const name=document.createElement("div"); name.style.cssText="font-size:10px;color:#bbb;font-family:MinibloxFont,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"; name.textContent=raw.split("/").pop().split("?")[0]||"audio file";
          const sub=document.createElement("div"); sub.style.cssText="font-size:9px;color:#333;margin-top:2px;font-family:MinibloxFont,sans-serif;"; sub.textContent="direct url";
          info.appendChild(name); info.appendChild(sub); preview.appendChild(icon); preview.appendChild(info);
          resultsBox.style.display="block"; resultsBox.innerHTML=""; resultsBox.appendChild(preview);
          loadAudioSrc(raw, name.textContent, "direct url", null);
        }
        urlBtn.addEventListener("click", playFromUrl);
        urlInput.addEventListener("keydown", e => { e.stopPropagation(); if(e.key==="Enter") playFromUrl(); if(e.key==="Escape") resultsBox.style.display="none"; });
        urlInput.addEventListener("keyup", e => e.stopPropagation()); urlInput.addEventListener("keypress", e => e.stopPropagation());
        searchInput.addEventListener("keydown", e => { e.stopPropagation(); if(e.key==="Enter") doSearch(); if(e.key==="Escape") resultsBox.style.display="none"; });
        searchInput.addEventListener("keyup", e => e.stopPropagation()); searchInput.addEventListener("keypress", e => e.stopPropagation());
        playBtn.addEventListener("click", () => { if(!musicAudio) return; if(musicIsPlaying){ musicAudio.pause(); playBtn.innerHTML="&#9654;"; musicIsPlaying=false; } else { musicAudio.play(); playBtn.innerHTML="&#9646;&#9646;"; musicIsPlaying=true; } });
        stopBtn.addEventListener("click", () => { if(musicAudio){ musicAudio.pause(); musicAudio.src=""; musicAudio=null; } musicIsPlaying=false; playBtn.innerHTML="&#9654;"; songTitle.textContent="nothing playing"; artistEl.textContent="—"; albumArt.src=""; progressBar.style.width="0%"; });
        prevBtn.addEventListener("click", () => { if(musicAudio){ musicAudio.currentTime=0; if(!musicIsPlaying){ musicAudio.play(); playBtn.innerHTML="&#9646;&#9646;"; musicIsPlaying=true; } } });
        volSlider.addEventListener("input", () => { const v=parseInt(volSlider.value,10); volLabel.textContent=v+"%"; if(musicAudio) musicAudio.volume=v/100; });
      } else {
        if(musicAudio){ musicAudio.pause(); musicAudio.src=""; musicAudio=null; }
        if(musicPlayerEl){ musicPlayerEl.remove(); musicPlayerEl=null; }
        musicIsPlaying=false;
      }
    });
  }

  const bottomRow = document.createElement("div");
  bottomRow.style.cssText = "display:flex;align-items:center;justify-content:center;gap:8px;margin-top:18px;";
  uv2MainPage.appendChild(bottomRow);
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close UI";
  closeButton.style.cssText = `background:${guiPrimaryColor};color:white;border:none;border-radius:6px;padding:10px 30px;font-size:15px;cursor:pointer;font-family:'MinibloxFont',sans-serif;letter-spacing:0.5px;box-shadow:0 2px 14px ${guiPrimaryColor}73;transition:all 0.2s ease;`;
  bottomRow.appendChild(closeButton);

  function openUI() {
    ui.style.display = "flex";
    if (musicPlayerEl) musicPlayerEl.style.display = "block";
    if (settings.animateUI) {
      ui.classList.remove("uv2-animate-in", "uv2-animate-out");
      void ui.offsetWidth;
      ui.classList.add("uv2-animate-in");
    }
  }
  function closeUI() {
    switchUv2Page('main');
    if (closeUITimeout) { clearTimeout(closeUITimeout); closeUITimeout = null; }
    if (settings.animateUI) {
      uiAnimating = true;
      ui.classList.remove("uv2-animate-in");
      void ui.offsetWidth;
      ui.classList.add("uv2-animate-out");
      closeUITimeout = setTimeout(() => {
        ui.style.display = "none";
        ui.classList.remove("uv2-animate-out");
        if (musicPlayerEl) musicPlayerEl.style.display = "none";
        uiAnimating = false;
        closeUITimeout = null;
      }, 180);
    } else {
      ui.classList.remove("uv2-animate-in", "uv2-animate-out");
      ui.style.display = "none";
      if (musicPlayerEl) musicPlayerEl.style.display = "none";
      uiAnimating = false;
    }
  }
  function toggleUI() {
    if (uiAnimating) return;
    if (uiVisible) { closeUI(); uiVisible = false; }
    else { openUI(); uiVisible = true; }
  }
  document.addEventListener("keydown", event => {
    if (event.key === "Shift" && event.location === 2) toggleUI();
    for (let moduleName in moduleBindings) {
      if (moduleBindings[moduleName] === event.key) {
        const now = Date.now();
        if (!lastKeyPressTime[moduleName] || now - lastKeyPressTime[moduleName] > 200) {
          const mc = [...gridContainer.children].find(c => c.dataset.moduleName === moduleName);
          if (mc) mc.click();
          lastKeyPressTime[moduleName] = now;
        }
      }
    }
  });
  closeButton.addEventListener("click", () => { closeUI(); uiVisible = false; });

  function restoreModuleStates() {
    if (!settings.saving) return;
    isRestoring = true;
    [...gridContainer.children].forEach(mc => {
      const savedName = mc.dataset.moduleName;
      if (!savedName) return;
      const savedVal = localStorage.getItem('uv2-module-' + savedName);
      if (savedVal === 'true' && !mc._uv2Active) mc.click();
      else if (savedVal === 'false' && mc._uv2Active) mc.click();
    });
    isRestoring = false;
  }
  function saveAllModuleStates() {
    [...gridContainer.children].forEach(mc => {
      const savedName = mc.dataset.moduleName;
      if (!savedName) return;
      localStorage.setItem('uv2-module-' + savedName, mc._uv2Active ? 'true' : 'false');
    });
  }
  setTimeout(restoreModuleStates, 3400);

  let afkTriggered = false;
  let afkAntiAfkWasOff = false;
  let afkGraceUntil = 0;
  function showAfkToast() {
    const existing = document.getElementById('uv2-afk-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'uv2-afk-toast';
    toast.textContent = 'You are idle, Anti-AFK enabled.';
    Object.assign(toast.style, {
      position: 'fixed', top: '-60px', left: '50%', transform: 'translateX(-50%)',
      background: '#e74c3c', color: '#fff', padding: '10px 22px',
      borderRadius: '8px', fontSize: '15px', fontFamily: 'MinibloxFont, sans-serif',
      zIndex: '99999', transition: 'top 0.5s ease, opacity 0.5s ease', opacity: '0',
      whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.top = '18px'; toast.style.opacity = '1'; }, 20);
    setTimeout(() => { toast.style.top = '-60px'; toast.style.opacity = '0'; }, 3500);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 4200);
  }
  function showReturnToast() {
    const existing = document.getElementById('uv2-return-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'uv2-return-toast';
    toast.textContent = 'Welcome back, Anti-AFK disabled.';
    Object.assign(toast.style, {
      position: 'fixed', top: '-60px', left: '50%', transform: 'translateX(-50%)',
      background: '#2ecc71', color: '#fff', padding: '10px 22px',
      borderRadius: '8px', fontSize: '15px', fontFamily: 'MinibloxFont, sans-serif',
      zIndex: '99999', transition: 'top 0.5s ease, opacity 0.5s ease', opacity: '0',
      whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
    });
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.top = '18px'; toast.style.opacity = '1'; }, 20);
    setTimeout(() => { toast.style.top = '-60px'; toast.style.opacity = '0'; }, 3500);
    setTimeout(() => { if (toast.parentNode) toast.remove(); }, 4200);
  }
  function sendAfkChatMessage(msg) {
    try {
      const inputs = document.querySelectorAll("input");
      let chatInput = null;
      inputs.forEach(i => {
        if (i.placeholder && i.placeholder.toLowerCase().includes('chat')) chatInput = i;
      });
      if (chatInput) {
        const propsKey = Object.keys(chatInput).find(k => k.startsWith("__reactProps") || k.startsWith("__reactFiber"));
        if (propsKey) {
          const props = chatInput[propsKey];
          const reactProps = props && props.memoizedProps ? props.memoizedProps : props;
          if (reactProps && reactProps.onChange) {
            reactProps.onChange({ target: { value: msg } });
            setTimeout(() => {
              if (reactProps.onKeyDown) reactProps.onKeyDown({ key: 'Enter', keyCode: 13, which: 13, bubbles: true, preventDefault: () => {} });
            }, 300);
            return;
          }
        }
      }
    } catch(e) {}
    try {
      const reactRoot = document.querySelector("#react");
      if (!reactRoot) return;
      const fiber = Object.values(reactRoot)[0];
      const game = fiber && fiber.updateQueue && fiber.updateQueue.baseState && fiber.updateQueue.baseState.element && fiber.updateQueue.baseState.element.props && fiber.updateQueue.baseState.element.props.game;
      if (game && game.chat && typeof game.chat.addChat === "function") {
        game.chat.addChat({ text: msg });
      }
    } catch(e) {}
  }
  function onAfkTriggered() {
    if (afkTriggered) return;
    afkTriggered = true;
    afkGraceUntil = Date.now() + 2000;
    showAfkToast();
    if (settings.afkChat) sendAfkChatMessage("I'm currently AFK, This Is An Auto Message, Please Hold On.");
    const afkMod = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
    if (afkMod && !afkMod._uv2Active) {
      afkAntiAfkWasOff = true;
      afkMod.click();
    } else {
      afkAntiAfkWasOff = false;
    }
  }
  function onUserReturn() {
    if (!afkTriggered) return;
    afkTriggered = false;
    if (afkAntiAfkWasOff) {
      const afkMod = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
      if (afkMod && afkMod._uv2Active) {
        afkMod.click();
        showReturnToast();
      }
      afkAntiAfkWasOff = false;
    }
  }
  function _afkActivityHandler(e) {
    if (!settings.autoAfk) return;
    if (!e.isTrusted) return;
    if (Date.now() < afkGraceUntil) return;
    onUserReturn();
    clearTimeout(afkTimer);
    afkTimer = setTimeout(onAfkTriggered, afkDelay * 1000);
  }
  const _afkEvents = ['mousemove', 'keydown', 'mousedown', 'wheel'];
  function startAfkDetector() {
    _afkEvents.forEach(evt => window.addEventListener(evt, _afkActivityHandler));
    clearTimeout(afkTimer);
    afkTimer = setTimeout(onAfkTriggered, afkDelay * 1000);
  }
  function stopAfkDetector() {
    _afkEvents.forEach(evt => window.removeEventListener(evt, _afkActivityHandler));
    clearTimeout(afkTimer);
    afkTimer = null;
    if (afkTriggered) {
      afkTriggered = false;
      if (afkAntiAfkWasOff) {
        const afkMod = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
        if (afkMod && afkMod._uv2Active) afkMod.click();
        afkAntiAfkWasOff = false;
      }
    }
  }
  if (settings.autoAfk) startAfkDetector();
})();
(function() {
  'use strict';
  window.requestAnimationFrame = function(callback) { return setTimeout(function() { callback(performance.now()); }, 0); };
})();
