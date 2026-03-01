// ==UserScript==
// @name         UnverifiedV2
// @namespace    http://tampermonkey.net/
// @version      2.35
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
      width: "100px",
      height: "100px",
      backgroundColor: "black",
      border: "2px solid red",
      borderRadius: "50%",
      boxShadow: "0 0 10px red, 0 0 20px red, 0 0 30px red",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      opacity: 0,
      transition: "opacity 1s ease, transform 1s ease",
    });
    this.circle.appendChild(this.check);
    this.container.appendChild(this.circle);

    this.unverifiedText = document.createElement("div");
    this.unverifiedText.textContent = "UnverifiedV2";
    Object.assign(this.unverifiedText.style, {
      color: "red", fontSize: "60px", opacity: 0,
      marginTop: "50px",
      transition: "opacity 0.8s ease",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.container.appendChild(this.unverifiedText);

    this.creditsText = document.createElement("div");
    this.creditsText.textContent = "\nBy wytlines, DeadFish7\nandreypidd, jet, joudaALT!";
    Object.assign(this.creditsText.style, {
      color: "red", fontSize: "30px", opacity: 0, transition: "opacity 0.8s ease",
      whiteSpace: 'pre-line',
      textAlign: "center",
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
    setTimeout(() => {
      this.container.style.transition = "opacity 1s ease";
      this.container.style.opacity = 0;
    }, 2500);
    setTimeout(() => { this.container.remove(); }, 3000);
  }

  showInitializedNotif() {
    const initializedNotification = document.createElement("div");
    initializedNotification.classList.add('initialized-notification');
    initializedNotification.textContent = "UnverifiedV2 Initialized";
    document.body.appendChild(initializedNotification);
    setTimeout(() => {
      initializedNotification.style.top = "10px";
      initializedNotification.style.opacity = "1";
    }, 10);
    setTimeout(() => {
      initializedNotification.style.top = "-50px";
      initializedNotification.style.opacity = "0";
    }, 2000);
    setTimeout(() => { initializedNotification.remove(); }, 3000);
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
      } catch (e) {
        console.warn("[UnverifiedV2] Failed to get game object:", e);
        return null;
      }
    }
  };

  const waitForGame = setInterval(() => {
    const game = gameRef.game;
    if (game && game.chat && typeof game.chat.addChat === "function") {
      clearInterval(waitForGame);
      game.chat.addChat({ text: "\\#00FFFF\\[UnverifiedV2]\\reset\\ Hello, Thank You For Using The Unverified Client." });
      console.log("[UnverifiedV2] Sent Welcome Message");
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

  visuallyRemove(e) {
    if (!e) return;
    e.style.opacity = 0;
    e.style.zIndex = -1;
  }

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
          if (this.isMainScreen()) {
            this.shortcutMenu.addShortcutMenu();
            this.banner.addBanner();
          } else {
            this.shortcutMenu.removeShortcutMenu();
            this.banner.removeBanner();
          }
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
    e.style.color = 'white';
    e.style.border = '1px solid #D3D3D3';
    e.style.borderRadius = '12px';
    e.style.fontSize = '16px';
    e.style.cursor = 'pointer';
    e.style.transition = 'transform 0.2s ease';
    e.style.outline = 'none';
    e.style.boxShadow = 'none';
    if (!this.skipMouseInOutListeners.has(selector)) {
      e.addEventListener('mouseover', () => { e.unverifiedMouseIn = true; e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)'; });
      e.addEventListener('mouseout', () => { e.unverifiedMouseIn = false; e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)'; });
    }
  }

  applySpecificStyle(e, selector) { this.specificStylingSelectors.get(selector)(e); }

  removeBlackBackground(e) {
    e.style.background = 'transparent';
    e.style.backgroundColor = 'none';
    e.style.boxShadow = 'none';
    if (!e.textContent.startsWith('Browse')) {
      e.style.backdropFilter = 'blur(1px)';
      e.style.webkitBackdropFilter = 'blur(1px)';
    }
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
    this.e.id = 'unverified-banner';
    this.e.style.whiteSpace = 'pre-line';
    this.e.style.textAlign = 'center';
    this.e.style.zIndex = 999;
    this.e.style.position = "absolute";
    this.e.style.top = "11.5%";
    this.e.style.left = "50%";
    this.e.style.transform = "translate(-50%, -50%)";
    this.e.style.padding = '10px 20px';
    this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
    this.e.style.color = 'white';
    this.e.style.border = '1px solid #D3D3D3';
    this.e.style.borderRadius = '12px';
    this.e.style.fontSize = '24px';
    this.e.style.cursor = 'pointer';
    this.e.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
    this.e.style.outline = 'none';
    this.e.style.boxShadow = 'none';
    this.e.addEventListener('mouseover', () => {
      this.e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
      this.e.style.top = "11.5%"; this.e.style.left = "50%";
    });
    this.e.addEventListener('mouseout', () => {
      this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
      this.e.style.top = "11.5%"; this.e.style.left = "50%";
    });
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
      position: "absolute", top: "76%", left: "50%",
      transform: "translate(-50%, -50%)", padding: "20px", borderRadius: "12px",
      display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", zIndex: "99"
    });
    let i = 0;
    ["KitPVP", "Skywars", "Doubles", "Quads", "ClassicPVP"].forEach(label => {
      const button = document.createElement("button");
      button.textContent = label;
      button.style.padding = '8px 16px';
      button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
      button.style.color = 'white';
      button.style.border = '1px solid #D3D3D3';
      button.style.borderRadius = '6px';
      button.style.fontSize = '16px';
      button.style.cursor = 'pointer';
      button.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
      button.style.outline = 'none';
      button.style.boxShadow = 'none';
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
    .bind-popup { position:absolute; background-color:#2c3e50; color:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.7); z-index:10001; font-family:'MinibloxFont',sans-serif; display:none; text-align:center; }
    .bind-popup input { background-color:#34495e; color:white; border:2px solid #e74c3c; border-radius:5px; padding:10px; font-size:18px; width:200px; }
    .bind-popup button { background-color:#e74c3c; color:white; border:none; border-radius:5px; padding:10px 20px; margin-top:10px; cursor:pointer; }
    .bind-popup button:hover { background-color:#c0392b; }
    .module-tooltip { visibility:hidden; position:absolute; background-color:#2c3e50; color:white; padding:5px 10px; border-radius:5px; font-size:14px; z-index:10000; opacity:0; transition:opacity 0.3s ease; }
    .initialized-notification { font-family:'MinibloxFont',sans-serif; font-size:20px; color:#e74c3c; position:absolute; top:-50px; left:50%; transform:translateX(-50%); padding:10px 20px; background-color:black; border:1px solid white; border-radius:10px; z-index:10000; opacity:0; transition:top 1s ease,opacity 1s ease; }
    .other-notification { font-family:'MinibloxFont',sans-serif; font-size:16px; color:#e74c3c; background-color:black; padding:10px 20px; border:1px solid white; border-radius:10px; margin-bottom:10px; box-shadow:0 0 10px rgba(0,0,0,0.5); transition:opacity 0.5s ease,transform 0.5s ease; opacity:0; transform:translateX(100%); }
    .settings-icon { width:30px; height:30px; fill:white; transition:transform 0.3s ease; }
    .settings-icon:hover { transform:rotate(90deg); }
    #uv2-settings-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.55); z-index:99999; align-items:center; justify-content:center; }
    #uv2-settings-overlay.uv2-open { display:flex; }
    #uv2-settings-panel { width:560px; max-height:80vh; background:#202020; border-radius:10px; border:1px solid #3a3a3a; display:flex; flex-direction:column; overflow:hidden; box-shadow:0 24px 60px rgba(0,0,0,0.7); font-family:'Segoe UI',sans-serif; color:#fff; }
    #uv2-settings-titlebar { display:flex; align-items:center; justify-content:space-between; padding:14px 18px; background:#161616; border-bottom:1px solid #2d2d2d; }
    #uv2-settings-titlebar span { font-size:15px; font-weight:600; display:flex; align-items:center; gap:8px; }
    #uv2-settings-titlebar span svg { fill:#e74c3c; }
    #uv2-settings-close { background:none; border:none; color:#aaa; font-size:20px; cursor:pointer; line-height:1; padding:2px 6px; border-radius:4px; transition:background 0.2s,color 0.2s; }
    #uv2-settings-close:hover { background:#e74c3c; color:#fff; }
    #uv2-settings-body { display:flex; flex:1; overflow:hidden; }
    #uv2-settings-nav { width:160px; background:#181818; border-right:1px solid #2d2d2d; padding:10px 0; flex-shrink:0; }
    .uv2-nav-item { padding:10px 18px; cursor:pointer; font-size:13px; color:#bbb; border-left:3px solid transparent; transition:all 0.15s; display:flex; align-items:center; gap:9px; }
    .uv2-nav-item svg { fill:#888; flex-shrink:0; }
    .uv2-nav-item:hover { background:#242424; color:#fff; }
    .uv2-nav-item:hover svg { fill:#ccc; }
    .uv2-nav-item.uv2-nav-active { background:#2a2a2a; color:#fff; border-left-color:#e74c3c; }
    .uv2-nav-item.uv2-nav-active svg { fill:#e74c3c; }
    #uv2-settings-content { flex:1; overflow-y:auto; padding:20px; }
    .uv2-settings-page { display:none; }
    .uv2-settings-page.uv2-page-active { display:block; }
    .uv2-section-title { font-size:11px; text-transform:uppercase; letter-spacing:0.08em; color:#888; margin-bottom:12px; margin-top:4px; }
    .uv2-setting-row { display:flex; align-items:center; justify-content:space-between; padding:13px 0; border-bottom:1px solid #2d2d2d; }
    .uv2-setting-row:last-child { border-bottom:none; }
    .uv2-setting-label { font-size:13.5px; color:#ddd; }
    .uv2-setting-desc { font-size:11.5px; color:#777; margin-top:2px; }
    .uv2-toggle { position:relative; width:42px; height:22px; flex-shrink:0; }
    .uv2-toggle input { display:none; }
    .uv2-toggle-track { position:absolute; inset:0; background:#444; border-radius:999px; cursor:pointer; transition:background 0.2s; }
    .uv2-toggle-track::after { content:''; position:absolute; top:3px; left:3px; width:16px; height:16px; background:#fff; border-radius:50%; transition:transform 0.2s; }
    .uv2-toggle input:checked + .uv2-toggle-track { background:#e74c3c; }
    .uv2-toggle input:checked + .uv2-toggle-track::after { transform:translateX(20px); }
    #unverified-music-player { position:fixed; bottom:24px; left:24px; width:260px; background:#0f0f0f; border-left:3px solid #e74c3c; z-index:99999; font-family:'MinibloxFont',sans-serif; color:white; box-shadow:0 4px 24px rgba(0,0,0,0.8); user-select:none; }
    #unverified-music-player .mp-topbar { display:flex; align-items:center; justify-content:space-between; padding:7px 10px; background:#0a0a0a; cursor:move; border-bottom:1px solid #1f1f1f; }
    #unverified-music-player .mp-topbar-name { font-size:9px; color:#e74c3c; letter-spacing:3px; text-transform:uppercase; }
    #unverified-music-player .mp-topbar-close { background:none; border:none; color:#333; font-size:14px; cursor:pointer; padding:0; line-height:1; transition:color 0.15s; }
    #unverified-music-player .mp-topbar-close:hover { color:#e74c3c; }
    #unverified-music-player .mp-nowplaying { display:flex; align-items:center; gap:10px; padding:10px; border-bottom:1px solid #1a1a1a; }
    #unverified-music-player .mp-art { width:44px; height:44px; background:#1a1a1a; flex-shrink:0; object-fit:cover; }
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
    #unverified-music-player .mp-search-go { background:#e74c3c; color:white; border:none; padding:7px 11px; font-size:10px; cursor:pointer; font-family:'MinibloxFont',sans-serif; letter-spacing:1px; transition:background 0.15s; flex-shrink:0; }
    #unverified-music-player .mp-search-go:hover { background:#c0392b; }
    #unverified-music-player .mp-results { max-height:120px; overflow-y:auto; }
    #unverified-music-player .mp-results::-webkit-scrollbar { width:2px; }
    #unverified-music-player .mp-results::-webkit-scrollbar-thumb { background:#e74c3c; }
    #unverified-music-player .mp-result { display:flex; align-items:center; gap:8px; padding:6px 10px; cursor:pointer; border-bottom:1px solid #161616; transition:background 0.1s; }
    #unverified-music-player .mp-result:last-child { border-bottom:none; }
    #unverified-music-player .mp-result:hover { background:#1a1a1a; }
    #unverified-music-player .mp-result-img { width:32px; height:32px; object-fit:cover; flex-shrink:0; background:#1a1a1a; }
    #unverified-music-player .mp-result-name { font-size:10px; color:#bbb; font-family:'MinibloxFont',sans-serif; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    #unverified-music-player .mp-result-by { font-size:9px; color:#333; margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; font-family:'MinibloxFont',sans-serif; }
    #unverified-music-player .mp-msg { padding:10px; color:#2a2a2a; font-size:9px; letter-spacing:1px; text-align:center; font-family:'MinibloxFont',sans-serif; }
  `;
  document.head.appendChild(style);

  const ui = document.createElement("div");
  ui.style.position = "fixed";
  ui.style.top = "50%";
  ui.style.left = "50%";
  ui.style.transform = "translate(-50%, -50%)";
  ui.style.backgroundColor = "#1a1a1a";
  ui.style.color = "white";
  ui.style.padding = "28px";
  ui.style.borderRadius = "15px";
  ui.style.display = "none";
  ui.style.zIndex = "9999";
  ui.style.textAlign = "center";
  ui.style.boxShadow = "0 0 10px rgba(0,0,0,0.7)";
  ui.style.fontFamily = 'MinibloxFont, sans-serif';
  ui.style.maxHeight = "90vh";
  ui.style.maxWidth = "90vw";
  ui.style.overflowY = "auto";
  ui.style.overflowX = "hidden";
  document.body.appendChild(ui);

  ['fullscreenchange','webkitfullscreenchange','mozfullscreenchange'].forEach(evt => {
    document.addEventListener(evt, () => {
      const isFS = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
      ui.style.maxHeight = isFS ? "95vh" : "90vh";
      ui.style.padding = isFS ? "22px" : "28px";
    });
  });

  const headerRow = document.createElement("div");
  headerRow.style.cssText = "display:flex;align-items:center;justify-content:space-between;margin-bottom:15px;";
  ui.appendChild(headerRow);

  const title = document.createElement("h2");
  title.textContent = "UnverifiedV2";
  title.style.fontSize = "34px";
  title.style.color = "#e74c3c";
  title.style.fontFamily = 'MinibloxFont, sans-serif';
  title.style.margin = "0";
  title.style.flex = "1";
  title.style.textAlign = "center";
  headerRow.appendChild(title);

  const headerLeft = document.createElement("div");
  headerLeft.style.cssText = "display:flex;align-items:center;gap:8px;flex-shrink:0;";
  headerRow.insertBefore(headerLeft, title);

  const settingsIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  settingsIcon.setAttribute("viewBox", "0 0 24 24");
  settingsIcon.style.cssText = "cursor:pointer;width:28px;height:28px;fill:white;transition:transform 0.3s ease;flex-shrink:0;";
  settingsIcon.innerHTML = `<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94zM12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>`;
  settingsIcon.addEventListener("mouseover", () => settingsIcon.style.transform = "rotate(90deg)");
  settingsIcon.addEventListener("mouseout", () => settingsIcon.style.transform = "rotate(0deg)");
  headerLeft.appendChild(settingsIcon);

  const languageDropdown = document.createElement("select");
  languageDropdown.style.cssText = "background-color:#e74c3c;color:white;border:none;border-radius:5px;padding:8px 12px;font-size:14px;cursor:pointer;font-family:'MinibloxFont',sans-serif;flex-shrink:0;";
  headerRow.appendChild(languageDropdown);

  const settingsOverlay = document.createElement("div");
  settingsOverlay.id = "uv2-settings-overlay";
  settingsOverlay.innerHTML = `
    <div id="uv2-settings-panel">
      <div id="uv2-settings-titlebar">
        <span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94zM12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></svg>Settings</span>
        <button id="uv2-settings-close">✕</button>
      </div>
      <div id="uv2-settings-body">
        <div id="uv2-settings-nav">
          <div class="uv2-nav-item uv2-nav-active" data-page="audio"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>Audio</div>
          <div class="uv2-nav-item" data-page="visuals"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>Visuals</div>
          <div class="uv2-nav-item" data-page="about"><svg width="15" height="15" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>About</div>
        </div>
        <div id="uv2-settings-content">
          <div class="uv2-settings-page uv2-page-active" id="uv2-page-audio">
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
          </div>
          <div class="uv2-settings-page" id="uv2-page-about">
            <div class="uv2-section-title">Info</div>
            <div class="uv2-setting-row"><div><div class="uv2-setting-label">Version</div><div class="uv2-setting-desc">2.35</div></div></div>
            <div class="uv2-setting-row"><div><div class="uv2-setting-label">Authors</div><div class="uv2-setting-desc">wytlines, DeadFish7, andreypidd, jet, joudaALT!</div></div></div>
            <div class="uv2-setting-row"><div><div class="uv2-setting-label">License</div><div class="uv2-setting-desc">Proprietary, do not redistribute</div></div></div>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(settingsOverlay);

  let moduleBindings = {};
  let isBinding = false;
  let lastKeyPressTime = {};
  let uiVisible = false;
  let musicPlayerEl = null;
  let musicAudio = null;
  let musicIsPlaying = false;
  let isMusicPlayerActive = false;

  const settings = {
    moduleSounds: localStorage.getItem('uv2-setting-sounds') !== 'false',
    showNotifications: localStorage.getItem('uv2-setting-notifs') !== 'false',
  };

  settingsOverlay.querySelector("#uv2-toggle-sounds").checked = settings.moduleSounds;

  settingsOverlay.querySelector("#uv2-toggle-notifs").checked = settings.showNotifications;

  settingsIcon.addEventListener("click", () => settingsOverlay.classList.toggle("uv2-open"));
  settingsOverlay.querySelector("#uv2-settings-close").addEventListener("click", () => settingsOverlay.classList.remove("uv2-open"));
  settingsOverlay.addEventListener("click", e => { if (e.target === settingsOverlay) settingsOverlay.classList.remove("uv2-open"); });
  settingsOverlay.querySelectorAll(".uv2-nav-item").forEach(item => {
    item.addEventListener("click", () => {
      settingsOverlay.querySelectorAll(".uv2-nav-item").forEach(n => n.classList.remove("uv2-nav-active"));
      settingsOverlay.querySelectorAll(".uv2-settings-page").forEach(p => p.classList.remove("uv2-page-active"));
      item.classList.add("uv2-nav-active");
      settingsOverlay.querySelector("#uv2-page-" + item.dataset.page).classList.add("uv2-page-active");
    });
  });
  settingsOverlay.querySelector("#uv2-toggle-sounds").addEventListener("change", function() {
    settings.moduleSounds = this.checked;
    localStorage.setItem('uv2-setting-sounds', this.checked);
  });

  settingsOverlay.querySelector("#uv2-toggle-notifs").addEventListener("change", function() {
    settings.showNotifications = this.checked;
    localStorage.setItem('uv2-setting-notifs', this.checked);
  });

  function playModuleClickSound(turningOn) {
    if (!settings.moduleSounds) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const now = ctx.currentTime;
      const master = ctx.createGain();
      master.gain.value = 0.6;
      master.connect(ctx.destination);

      if (turningOn) {
        const click = ctx.createOscillator();
        click.type = "sine";
        click.frequency.setValueAtTime(80, now);
        click.frequency.exponentialRampToValueAtTime(40, now + 0.04);
        const clickGain = ctx.createGain();
        clickGain.gain.setValueAtTime(0.5, now);
        clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        click.connect(clickGain); clickGain.connect(master);
        click.start(now); click.stop(now + 0.05);

        const tone1 = ctx.createOscillator();
        tone1.type = "sine";
        tone1.frequency.setValueAtTime(520, now + 0.02);
        const gain1 = ctx.createGain();
        gain1.gain.setValueAtTime(0.0, now + 0.02);
        gain1.gain.linearRampToValueAtTime(0.4, now + 0.045);
        gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
        tone1.connect(gain1); gain1.connect(master);
        tone1.start(now + 0.02); tone1.stop(now + 0.14);

        const tone2 = ctx.createOscillator();
        tone2.type = "sine";
        tone2.frequency.setValueAtTime(880, now + 0.1);
        tone2.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
        const gain2 = ctx.createGain();
        gain2.gain.setValueAtTime(0.0, now + 0.1);
        gain2.gain.linearRampToValueAtTime(0.45, now + 0.13);
        gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
        tone2.connect(gain2); gain2.connect(master);
        tone2.start(now + 0.1); tone2.stop(now + 0.3);

      } else {
        const tone = ctx.createOscillator();
        tone.type = "sine";
        tone.frequency.setValueAtTime(600, now);
        tone.frequency.exponentialRampToValueAtTime(280, now + 0.18);
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.35, now);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
        tone.connect(gainNode); gainNode.connect(master);
        tone.start(now); tone.stop(now + 0.22);
      }

      setTimeout(() => ctx.close(), 600);
    } catch(e) {}
  }

  const translations = {
    en: { languageName:"English", title:"UnverifiedV2", autoFullscreen:"Auto Fullscreen", autoFullscreenDesc:"Automatically toggles Fullscreen", keystrokes:"Keystrokes", keystrokesDesc:"Displays the keys you press in real-time.", fpsCounter:"FPS Counter", fpsCounterDesc:"Shows the frames per second (FPS) of the game.", cpsCounter:"CPS Counter", cpsCounterDesc:"Counts how many times you click per second.", muteChat:"Mute Chat", muteChatDesc:"Prevents other players messages from appearing in chat.", pingCounter:"Ping Counter", pingCounterDesc:"Shows the latency between your client and the server.", fpsBooster:"FPS Booster", fpsBoosterDesc:"Changes settings to improve FPS (refresh page)", antiAfk:"Anti-Afk", antiAfkDesc:"Presses WASD on its own to avoid being kicked for being AFK", timeDisplay:"Time Display", timeDisplayDesc:"Shows you the time so you dont have to exit full screen.", musicPlayer:"Music Player", musicPlayerDesc:"Plays music while you play.", closeUI:"Close UI", turnedOn:"was turned on", turnedOff:"was turned off", tooltipBind:"right-click to bind" },
    es: { languageName:"Espanol", title:"UnverifiedV2", autoFullscreen:"Pantalla Completa Automática", autoFullscreenDesc:"Activa/desactiva automáticamente la pantalla completa", keystrokes:"Teclas", keystrokesDesc:"Muestra las teclas que presionas en tiempo real.", fpsCounter:"Contador de FPS", fpsCounterDesc:"Muestra los fotogramas por segundo (FPS) del juego.", cpsCounter:"Contador de CPS", cpsCounterDesc:"Cuenta cuántas veces haces clic por segundo.", muteChat:"Silenciar Chat", muteChatDesc:"Evita que aparezcan mensajes de otros jugadores en el chat.", pingCounter:"Contador de Ping", pingCounterDesc:"Muestra la latencia entre tu cliente y el servidor.", fpsBooster:"Mejorador de FPS", fpsBoosterDesc:"Cambia la configuración para mejorar los FPS (actualiza la página)", antiAfk:"Anti-Inactividad", antiAfkDesc:"Presiona WASD automáticamente para evitar ser expulsado por inactividad", timeDisplay:"Mostrar Hora", timeDisplayDesc:"Te muestra la hora para que no tengas que salir de pantalla completa.", musicPlayer:"Reproductor de Música", musicPlayerDesc:"Reproduce música mientras juegas.", closeUI:"Cerrar UI", turnedOn:"fue activado", turnedOff:"fue desactivado", tooltipBind:"clic derecho para vincular" },
    fr: { languageName:"Francais", title:"UnverifiedV2", autoFullscreen:"Plein Écran Automatique", autoFullscreenDesc:"Active/désactive automatiquement le plein écran", keystrokes:"Touches", keystrokesDesc:"Affiche les touches que vous appuyez en temps réel.", fpsCounter:"Compteur FPS", fpsCounterDesc:"Affiche les images par seconde (FPS) du jeu.", cpsCounter:"Compteur CPS", cpsCounterDesc:"Compte combien de fois vous cliquez par seconde.", muteChat:"Couper le Chat", muteChatDesc:"Empêche les messages des autres joueurs d'apparaître dans le chat.", pingCounter:"Compteur de Ping", pingCounterDesc:"Affiche la latence entre votre client et le serveur.", fpsBooster:"Booster FPS", fpsBoosterDesc:"Modifie les paramètres pour améliorer les FPS (actualiser la page)", antiAfk:"Anti-Inactivité", antiAfkDesc:"Appuie sur WASD automatiquement pour éviter d'être expulsé pour inactivité", timeDisplay:"Afficher l'Heure", timeDisplayDesc:"Affiche l'heure pour que vous n'ayez pas à quitter le plein écran.", musicPlayer:"Lecteur de Musique", musicPlayerDesc:"Joue de la musique pendant que vous jouez.", closeUI:"Fermer UI", turnedOn:"a été activé", turnedOff:"a été désactivé", tooltipBind:"clic droit pour lier" },
    de: { languageName:"Deutsch", title:"UnverifiedV2", autoFullscreen:"Auto-Vollbild", autoFullscreenDesc:"Schaltet Vollbild automatisch ein/aus", keystrokes:"Tastenanschläge", keystrokesDesc:"Zeigt die Tasten an, die Sie in Echtzeit drücken.", fpsCounter:"FPS-Zähler", fpsCounterDesc:"Zeigt die Bilder pro Sekunde (FPS) des Spiels an.", cpsCounter:"CPS-Zähler", cpsCounterDesc:"Zählt, wie oft Sie pro Sekunde klicken.", muteChat:"Chat Stumm", muteChatDesc:"Verhindert, dass Nachrichten anderer Spieler im Chat erscheinen.", pingCounter:"Ping-Zähler", pingCounterDesc:"Zeigt die Latenz zwischen Ihrem Client und dem Server an.", fpsBooster:"FPS-Booster", fpsBoosterDesc:"Ändert Einstellungen zur Verbesserung der FPS (Seite aktualisieren)", antiAfk:"Anti-Inaktiv", antiAfkDesc:"Drückt WASD automatisch, um nicht wegen Inaktivität gekickt zu werden", timeDisplay:"Zeitanzeige", timeDisplayDesc:"Zeigt die Zeit an, damit Sie den Vollbildmodus nicht verlassen müssen.", musicPlayer:"Musik-Player", musicPlayerDesc:"Spielt Musik ab, während Sie spielen.", closeUI:"UI Schließen", turnedOn:"wurde eingeschaltet", turnedOff:"wurde ausgeschaltet", tooltipBind:"Rechtsklick zum Binden" },
    ar: { languageName:"Arabic", title:"UnverifiedV2", autoFullscreen:"ملء الشاشة التلقائي", autoFullscreenDesc:"يبدل ملء الشاشة تلقائيًا", keystrokes:"ضغطات المفاتيح", keystrokesDesc:"يعرض المفاتيح التي تضغط عليها في الوقت الفعلي.", fpsCounter:"عداد الإطارات", fpsCounterDesc:"يعرض الإطارات في الثانية (FPS) للعبة.", cpsCounter:"عداد النقرات", cpsCounterDesc:"يحسب عدد مرات النقر في الثانية.", muteChat:"كتم الدردشة", muteChatDesc:"يمنع ظهور رسائل اللاعبين الآخرين في الدردشة.", pingCounter:"عداد البينج", pingCounterDesc:"يعرض زمن الاستجابة بين العميل والخادم.", fpsBooster:"معزز الإطارات", fpsBoosterDesc:"يغير الإعدادات لتحسين FPS (قم بتحديث الصفحة)", antiAfk:"مضاد الخمول", antiAfkDesc:"يضغط WASD تلقائيًا لتجنب الطرد بسبب الخمول", timeDisplay:"عرض الوقت", timeDisplayDesc:"يعرض الوقت حتى لا تضطر للخروج من ملء الشاشة.", musicPlayer:"مشغل الموسيقى", musicPlayerDesc:"يشغل الموسيقى أثناء اللعب.", closeUI:"إغلاق الواجهة", turnedOn:"تم تشغيله", turnedOff:"تم إيقافه", tooltipBind:"انقر بزر الماوس الأيمن للربط" },
    pt: { languageName:"Portugues", title:"UnverifiedV2", autoFullscreen:"Tela Cheia Automática", autoFullscreenDesc:"Ativa/desativa a tela cheia automaticamente", keystrokes:"Teclas", keystrokesDesc:"Exibe as teclas que você pressiona em tempo real.", fpsCounter:"Contador de FPS", fpsCounterDesc:"Mostra os quadros por segundo (FPS) do jogo.", cpsCounter:"Contador de CPS", cpsCounterDesc:"Conta quantas vezes você clica por segundo.", muteChat:"Silenciar Chat", muteChatDesc:"Impede que mensagens de outros jogadores apareçam no chat.", pingCounter:"Contador de Ping", pingCounterDesc:"Mostra a latência entre seu cliente e o servidor.", fpsBooster:"Melhorador de FPS", fpsBoosterDesc:"Altera configurações para melhorar os FPS (atualize a página)", antiAfk:"Anti-Inatividade", antiAfkDesc:"Pressiona WASD automaticamente para evitar ser expulso por inatividade", timeDisplay:"Exibir Hora", timeDisplayDesc:"Mostra a hora para que você não precise sair da tela cheia.", musicPlayer:"Reprodutor de Música", musicPlayerDesc:"Toca música enquanto você joga.", closeUI:"Fechar UI", turnedOn:"foi ativado", turnedOff:"foi desativado", tooltipBind:"clique direito para vincular" },
    ru: { languageName:"Russian", title:"UnverifiedV2", autoFullscreen:"Автополноэкранный режим", autoFullscreenDesc:"Автоматически переключает полноэкранный режим", keystrokes:"Нажатия клавиш", keystrokesDesc:"Отображает нажимаемые клавиши в реальном времени.", fpsCounter:"Счетчик FPS", fpsCounterDesc:"Показывает количество кадров в секунду (FPS) игры.", cpsCounter:"Счетчик CPS", cpsCounterDesc:"Считает, сколько раз вы кликаете в секунду.", muteChat:"Отключить чат", muteChatDesc:"Предотвращает появление сообщений других игроков в чате.", pingCounter:"Счетчик пинга", pingCounterDesc:"Показывает задержку между вашим клиентом и сервером.", fpsBooster:"Усилитель FPS", fpsBoosterDesc:"Изменяет настройки для улучшения FPS (обновите страницу)", antiAfk:"Анти-АФК", antiAfkDesc:"Автоматически нажимает WASD, чтобы избежать кика за неактивность", timeDisplay:"Показать время", timeDisplayDesc:"Показывает время, чтобы вам не нужно было выходить из полноэкранного режима.", musicPlayer:"Музыкальный плеер", musicPlayerDesc:"Воспроизводит музыку во время игры.", closeUI:"Закрыть UI", turnedOn:"включен", turnedOff:"выключен", tooltipBind:"правый клик для привязки" },
    it: { languageName:"Italiano", title:"UnverifiedV2", autoFullscreen:"Schermo Intero Automatico", autoFullscreenDesc:"Attiva/disattiva automaticamente lo schermo intero", keystrokes:"Tasti", keystrokesDesc:"Mostra i tasti che premi in tempo reale.", fpsCounter:"Contatore FPS", fpsCounterDesc:"Mostra i fotogrammi al secondo (FPS) del gioco.", cpsCounter:"Contatore CPS", cpsCounterDesc:"Conta quante volte fai clic al secondo.", muteChat:"Silenzia Chat", muteChatDesc:"Impedisce che i messaggi degli altri giocatori appaiano nella chat.", pingCounter:"Contatore Ping", pingCounterDesc:"Mostra la latenza tra il tuo client e il server.", fpsBooster:"Potenziatore FPS", fpsBoosterDesc:"Modifica le impostazioni per migliorare gli FPS (aggiorna la pagina)", antiAfk:"Anti-Inattività", antiAfkDesc:"Preme WASD automaticamente per evitare di essere espulso per inattività", timeDisplay:"Mostra Ora", timeDisplayDesc:"Mostra l'ora in modo da non dover uscire dallo schermo intero.", musicPlayer:"Lettore Musicale", musicPlayerDesc:"Riproduce musica mentre giochi.", closeUI:"Chiudi UI", turnedOn:"è stato attivato", turnedOff:"è stato disattivato", tooltipBind:"clic destro per associare" },
    ja: { languageName:"Japanese", title:"UnverifiedV2", autoFullscreen:"自動フルスクリーン", autoFullscreenDesc:"フルスクリーンを自動的に切り替えます", keystrokes:"キーストローク", keystrokesDesc:"押したキーをリアルタイムで表示します。", fpsCounter:"FPSカウンター", fpsCounterDesc:"ゲームのフレームレート（FPS）を表示します。", cpsCounter:"CPSカウンター", cpsCounterDesc:"1秒あたりのクリック数をカウントします。", muteChat:"チャットミュート", muteChatDesc:"他のプレイヤーのメッセージがチャットに表示されないようにします。", pingCounter:"Pingカウンター", pingCounterDesc:"クライアントとサーバー間のレイテンシを表示します。", fpsBooster:"FPSブースター", fpsBoosterDesc:"FPSを改善するための設定を変更します（ページを更新）", antiAfk:"アンチAFK", antiAfkDesc:"WASDを自動的に押してAFKでキックされるのを防ぎます", timeDisplay:"時刻表示", timeDisplayDesc:"フルスクリーンを終了せずに時刻を表示します。", musicPlayer:"音楽プレーヤー", musicPlayerDesc:"プレイ中に音楽を再生します。", closeUI:"UIを閉じる", turnedOn:"がオンになりました", turnedOff:"がオフになりました", tooltipBind:"右クリックでバインド" },
    zh: { languageName:"Chinese", title:"UnverifiedV2", autoFullscreen:"自动全屏", autoFullscreenDesc:"自动切换全屏", keystrokes:"按键显示", keystrokesDesc:"实时显示您按下的按键。", fpsCounter:"FPS计数器", fpsCounterDesc:"显示游戏的每秒帧数（FPS）。", cpsCounter:"CPS计数器", cpsCounterDesc:"统计您每秒点击的次数。", muteChat:"静音聊天", muteChatDesc:"防止其他玩家的消息出现在聊天中。", pingCounter:"Ping计数器", pingCounterDesc:"显示您的客户端与服务器之间的延迟。", fpsBooster:"FPS提升器", fpsBoosterDesc:"更改设置以提高FPS（刷新页面）", antiAfk:"防挂机", antiAfkDesc:"自动按下WASD以避免因挂机而被踢出", timeDisplay:"时间显示", timeDisplayDesc:"显示时间，这样您就不必退出全屏。", musicPlayer:"音乐播放器", musicPlayerDesc:"在游戏时播放音乐。", closeUI:"关闭UI", turnedOn:"已开启", turnedOff:"已关闭", tooltipBind:"右键绑定" },
    ko: { languageName:"Korean", title:"UnverifiedV2", autoFullscreen:"자동 전체화면", autoFullscreenDesc:"전체화면을 자동으로 전환합니다", keystrokes:"키 입력", keystrokesDesc:"실시간으로 누른 키를 표시합니다.", fpsCounter:"FPS 카운터", fpsCounterDesc:"게임의 초당 프레임 수(FPS)를 표시합니다.", cpsCounter:"CPS 카운터", cpsCounterDesc:"초당 클릭 횟수를 계산합니다.", muteChat:"채팅 음소거", muteChatDesc:"다른 플레이어의 메시지가 채팅에 나타나지 않도록 합니다.", pingCounter:"핑 카운터", pingCounterDesc:"클라이언트와 서버 간의 지연 시간을 표시합니다.", fpsBooster:"FPS 부스터", fpsBoosterDesc:"FPS를 향상시키기 위해 설정을 변경합니다 (페이지 새로고침)", antiAfk:"자리비움 방지", antiAfkDesc:"자리비움으로 인한 강퇴를 방지하기 위해 WASD를 자동으로 누릅니다", timeDisplay:"시간 표시", timeDisplayDesc:"전체화면을 종료하지 않고도 시간을 표시합니다.", musicPlayer:"음악 플레이어", musicPlayerDesc:"게임하는 동안 음악을 재생합니다.", closeUI:"UI 닫기", turnedOn:"이(가) 켜졌습니다", turnedOff:"이(가) 꺼졌습니다", tooltipBind:"우클릭하여 바인딩" },
    nl: { languageName:"Nederlands", title:"UnverifiedV2", autoFullscreen:"Auto Volledig Scherm", autoFullscreenDesc:"Schakelt automatisch volledig scherm in/uit", keystrokes:"Toetsaanslagen", keystrokesDesc:"Toont de toetsen die je in realtime indrukt.", fpsCounter:"FPS-teller", fpsCounterDesc:"Toont de frames per seconde (FPS) van het spel.", cpsCounter:"CPS-teller", cpsCounterDesc:"Telt hoeveel keer je per seconde klikt.", muteChat:"Chat Dempen", muteChatDesc:"Voorkomt dat berichten van andere spelers in de chat verschijnen.", pingCounter:"Ping-teller", pingCounterDesc:"Toont de latentie tussen je client en de server.", fpsBooster:"FPS-booster", fpsBoosterDesc:"Wijzigt instellingen om FPS te verbeteren (pagina vernieuwen)", antiAfk:"Anti-Afwezig", antiAfkDesc:"Drukt automatisch op WASD om te voorkomen dat je wordt gekickt wegens inactiviteit", timeDisplay:"Tijd Weergeven", timeDisplayDesc:"Toont de tijd zodat je niet uit volledig scherm hoeft te gaan.", musicPlayer:"Muziekspeler", musicPlayerDesc:"Speelt muziek af terwijl je speelt.", closeUI:"UI Sluiten", turnedOn:"is ingeschakeld", turnedOff:"is uitgeschakeld", tooltipBind:"rechtermuisklik om te binden" },
    tr: { languageName:"Turkce", title:"UnverifiedV2", autoFullscreen:"Otomatik Tam Ekran", autoFullscreenDesc:"Tam ekranı otomatik olarak değiştirir", keystrokes:"Tuş Vuruşları", keystrokesDesc:"Bastığınız tuşları gerçek zamanlı olarak gösterir.", fpsCounter:"FPS Sayacı", fpsCounterDesc:"Oyunun saniyedeki kare sayısını (FPS) gösterir.", cpsCounter:"CPS Sayacı", cpsCounterDesc:"Saniyede kaç kez tıkladığınızı sayar.", muteChat:"Sohbeti Kapat", muteChatDesc:"Diğer oyuncuların mesajlarının sohbette görünmesini engeller.", pingCounter:"Ping Sayacı", pingCounterDesc:"İstemciniz ile sunucu arasındaki gecikmeyi gösterir.", fpsBooster:"FPS Güçlendirici", fpsBoosterDesc:"FPS'yi artırmak için ayarları değiştirir (sayfayı yenileyin)", antiAfk:"Anti-AFK", antiAfkDesc:"AFK nedeniyle atılmayı önlemek için otomatik olarak WASD'ye basar", timeDisplay:"Saat Göster", timeDisplayDesc:"Tam ekrandan çıkmak zorunda kalmadan saati gösterir.", musicPlayer:"Müzik Çalar", musicPlayerDesc:"Oyun oynarken müzik çalar.", closeUI:"UI'yi Kapat", turnedOn:"açıldı", turnedOff:"kapandı", tooltipBind:"bağlamak için sağ tıklayın" },
    pl: { languageName:"Polski", title:"UnverifiedV2", autoFullscreen:"Automatyczny Pełny Ekran", autoFullscreenDesc:"Automatycznie przełącza pełny ekran", keystrokes:"Naciśnięcia Klawiszy", keystrokesDesc:"Wyświetla klawisze, które naciskasz w czasie rzeczywistym.", fpsCounter:"Licznik FPS", fpsCounterDesc:"Pokazuje liczbę klatek na sekundę (FPS) gry.", cpsCounter:"Licznik CPS", cpsCounterDesc:"Liczy, ile razy klikasz na sekundę.", muteChat:"Wycisz Czat", muteChatDesc:"Zapobiega pojawianiu się wiadomości innych graczy na czacie.", pingCounter:"Licznik Pingu", pingCounterDesc:"Pokazuje opóźnienie między klientem a serwerem.", fpsBooster:"Wzmacniacz FPS", fpsBoosterDesc:"Zmienia ustawienia w celu poprawy FPS (odśwież stronę)", antiAfk:"Anti-AFK", antiAfkDesc:"Automatycznie naciska WASD, aby uniknąć wyrzucenia za bezczynność", timeDisplay:"Wyświetl Czas", timeDisplayDesc:"Pokazuje czas, więc nie musisz wychodzić z pełnego ekranu.", musicPlayer:"Odtwarzacz Muzyki", musicPlayerDesc:"Odtwarza muzykę podczas gry.", closeUI:"Zamknij UI", turnedOn:"został włączony", turnedOff:"został wyłączony", tooltipBind:"kliknij prawym przyciskiem, aby powiązać" },
    sv: { languageName:"Svenska", title:"UnverifiedV2", autoFullscreen:"Auto Helskärm", autoFullscreenDesc:"Växlar automatiskt helskärm", keystrokes:"Tangenttryckningar", keystrokesDesc:"Visar tangenterna du trycker på i realtid.", fpsCounter:"FPS-räknare", fpsCounterDesc:"Visar spelets bilder per sekund (FPS).", cpsCounter:"CPS-räknare", cpsCounterDesc:"Räknar hur många gånger du klickar per sekund.", muteChat:"Tysta Chatt", muteChatDesc:"Förhindrar att andra spelares meddelanden visas i chatten.", pingCounter:"Ping-räknare", pingCounterDesc:"Visar latensen mellan din klient och servern.", fpsBooster:"FPS-förbättrare", fpsBoosterDesc:"Ändrar inställningar för att förbättra FPS (uppdatera sidan)", antiAfk:"Anti-AFK", antiAfkDesc:"Trycker automatiskt på WASD för att undvika att bli kickad för inaktivitet", timeDisplay:"Visa Tid", timeDisplayDesc:"Visar tiden så att du inte behöver lämna helskärm.", musicPlayer:"Musikspelare", musicPlayerDesc:"Spelar musik medan du spelar.", closeUI:"Stäng UI", turnedOn:"aktiverades", turnedOff:"inaktiverades", tooltipBind:"högerklicka för att binda" },
  };

  let currentLanguage = localStorage.getItem('unverified-language') || 'en';
  Object.keys(translations).forEach(langCode => {
    const option = document.createElement("option");
    option.value = langCode;
    option.textContent = translations[langCode].languageName;
    if (langCode === currentLanguage) option.selected = true;
    languageDropdown.appendChild(option);
  });
  languageDropdown.addEventListener("change", e => { currentLanguage = e.target.value; localStorage.setItem('unverified-language', currentLanguage); updateLanguage(); });

  const gridContainer = document.createElement("div");
  gridContainer.style.display = "grid";
  gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
  gridContainer.style.gridGap = "18px";
  gridContainer.style.marginTop = "18px";
  ui.appendChild(gridContainer);

  const notificationContainer = document.createElement("div");
  notificationContainer.style.cssText = "position:fixed;bottom:1in;right:20px;z-index:10000;display:flex;flex-direction:column-reverse;align-items:flex-end;";
  document.body.appendChild(notificationContainer);

  function showNotification(message, isOn) {
    if (!settings.showNotifications) return;
    const notification = document.createElement("div");
    const moduleName = message.split(' was ')[0];
    notification.textContent = `${moduleName} ${isOn ? translations[currentLanguage].turnedOn : translations[currentLanguage].turnedOff}`;
    notification.classList.add('other-notification');
    notificationContainer.appendChild(notification);
    setTimeout(() => { notification.style.transform = "translateX(0)"; notification.style.opacity = "1"; }, 10);
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"; notification.style.opacity = "0";
      setTimeout(() => { notificationContainer.removeChild(notification); }, 500);
    }, 3000);
  }

  function showBindPopup(moduleElement, moduleName) {
    const existingPopup = document.querySelector('.bind-popup');
    if (existingPopup) existingPopup.remove();
    const popup = document.createElement("div");
    popup.classList.add("bind-popup");
    document.body.appendChild(popup);
    const popupTitle = document.createElement("h3");
    popupTitle.textContent = `Bind Key for ${moduleName}`;
    popup.appendChild(popupTitle);
    const inputBox = document.createElement("input");
    inputBox.placeholder = "Press a key...";
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
    popup.style.display = "block";
    isBinding = true;
  }

  function createModule(name, description) {
    const moduleContainer = document.createElement("div");
    moduleContainer.style.padding = "19px";
    moduleContainer.style.borderRadius = "10px";
    moduleContainer.style.boxShadow = "0 0 10px rgba(0,0,0,0.5)";
    moduleContainer.style.cursor = "pointer";
    moduleContainer.style.transition = "border-color 0.3s ease";
    moduleContainer.style.border = "5px solid transparent";
    moduleContainer.style.minHeight = "185px";
    moduleContainer.style.width = "100%";
    moduleContainer.style.display = "flex";
    moduleContainer.style.flexDirection = "column";
    moduleContainer.style.justifyContent = "flex-start";
    moduleContainer.classList.add('module-container');
    const moduleTitle = document.createElement("h3");
    moduleTitle.textContent = name;
    moduleTitle.style.color = "#e74c3c"; moduleTitle.style.fontSize = "23px";
    moduleTitle.style.margin = "0 0 10px 0"; moduleTitle.style.fontFamily = 'MinibloxFont, sans-serif';
    moduleContainer.appendChild(moduleTitle);
    const moduleDescription = document.createElement("p");
    moduleDescription.textContent = description;
    moduleDescription.style.color = "#bdc3c7"; moduleDescription.style.fontSize = "14px";
    moduleDescription.style.margin = "0"; moduleDescription.style.lineHeight = "1.45";
    moduleDescription.style.fontFamily = 'MinibloxFont, sans-serif';
    moduleContainer.appendChild(moduleDescription);
    gridContainer.appendChild(moduleContainer);
    const tooltip = document.createElement("div");
    tooltip.classList.add("module-tooltip");
    tooltip.textContent = "right-click to bind";
    moduleContainer.appendChild(tooltip);
    let isActive = false;
    let tooltipTimeout;
    moduleContainer.addEventListener("mouseenter", () => { tooltipTimeout = setTimeout(() => { tooltip.style.visibility = "visible"; tooltip.style.opacity = 1; }, 1500); });
    moduleContainer.addEventListener("mouseleave", () => { clearTimeout(tooltipTimeout); tooltip.style.visibility = "hidden"; tooltip.style.opacity = 0; });
    moduleContainer.addEventListener("click", () => {
      if (!isBinding) {
        isActive = !isActive;
        playModuleClickSound(isActive);
        if (isActive) { moduleContainer.style.border = "5px solid #2ecc71"; showNotification(`${name} was turned on`, true); }
        else { moduleContainer.style.border = "5px solid transparent"; showNotification(`${name} was turned off`, false); }
      }
    });
    moduleContainer.addEventListener("contextmenu", event => { event.preventDefault(); showBindPopup(moduleContainer, name); });
    return moduleContainer;
  }

  function updateLanguage() {
    title.textContent = translations[currentLanguage].title;
    closeButton.textContent = translations[currentLanguage].closeUI;
    const modules = gridContainer.children;
    const moduleKeys = ['autoFullscreen','keystrokes','fpsCounter','cpsCounter','muteChat','pingCounter','fpsBooster','antiAfk','timeDisplay','musicPlayer'];
    for (let i = 0; i < modules.length; i++) {
      const moduleTitle = modules[i].querySelector("h3");
      const moduleDesc = modules[i].querySelector("p");
      const tooltip = modules[i].querySelector(".module-tooltip");
      if (moduleTitle && moduleKeys[i]) {
        moduleTitle.textContent = translations[currentLanguage][moduleKeys[i]];
        moduleDesc.textContent = translations[currentLanguage][moduleKeys[i] + 'Desc'];
        tooltip.textContent = translations[currentLanguage].tooltipBind;
      }
    }
  }

  const autoFullscreenModule = createModule("Auto Fullscreen", "Automatically toggles Fullscreen");
  let isAutoFullscreenActive = false;
  autoFullscreenModule.addEventListener("click", () => {
    isAutoFullscreenActive = !isAutoFullscreenActive;
    if (isAutoFullscreenActive) {
      (document.documentElement.requestFullscreen || document.documentElement.mozRequestFullScreen || document.documentElement.webkitRequestFullscreen || document.documentElement.msRequestFullscreen || (() => {})).call(document.documentElement);
    } else {
      (document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen || (() => {})).call(document);
    }
  });

  const keystrokesModule = createModule("Keystrokes", "Displays the keys you press in real-time.");
  let isKeystrokesActive = false;
  keystrokesModule.addEventListener("click", () => {
    isKeystrokesActive = !isKeystrokesActive;
    if (isKeystrokesActive) {
      if (document.getElementById('keystrokes-container')) document.getElementById('keystrokes-container').remove();
      const kc = document.createElement('div');
      kc.id = 'keystrokes-container';
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
        const key = document.createElement('div');
        key.textContent = text;
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
      const kc = document.getElementById('keystrokes-container');
      if (kc) kc.remove();
    }
  });

  createModule("FPS Counter", "Shows the frames per second (FPS) of the game.");
  const fpsModule = [...gridContainer.children].find(c => c.querySelector("h3")?.textContent === "FPS Counter");
  let isFPSVisible = false, fpsElement = null, lastFrameTime = performance.now(), frameCount = 0;
  if (fpsModule) {
    fpsModule.addEventListener("click", () => {
      isFPSVisible = !isFPSVisible;
      if (isFPSVisible) {
        fpsElement = document.createElement("div");
        fpsElement.id = "fps-counter";
        fpsElement.style.cssText = "position:fixed;top:60px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:99999;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
        const fpsDot = document.createElement("div"); fpsDot.id = "fps-dot"; fpsDot.style.cssText = "width:10px;height:10px;border-radius:50%;background-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,0.9);transition:all 0.3s ease;";
        const fpsValue = document.createElement("div"); fpsValue.id = "fps-value"; fpsValue.textContent = "0 FPS"; fpsValue.style.cssText = "font-size:16px;font-weight:700;color:#FFFFFF;letter-spacing:0.5px;transition:color 0.3s ease;";
        fpsElement.appendChild(fpsDot); fpsElement.appendChild(fpsValue);
        document.body.appendChild(fpsElement);
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

  const mouseModule = createModule("CPS Counter", "Counts how many times you click per second.");
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

  const muteChatModule = createModule("Mute Chat", "Prevents other players messages from appearing in chat.");
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

  const pingModule = createModule("Ping Counter", "Shows the latency between your client and the server.");
  let isPingActive=false, pingElement=null, pingInterval=null;
  pingModule.addEventListener("click", () => {
    isPingActive = !isPingActive;
    if (isPingActive) {
      pingElement = document.createElement("div"); pingElement.id="ping-counter";
      pingElement.style.cssText = "position:fixed;top:20px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:10000;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
      const pingDot = document.createElement("div"); pingDot.id="ping-dot"; pingDot.style.cssText="width:10px;height:10px;border-radius:50%;background-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,0.9);transition:all 0.3s ease;";
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

  createModule("FPS Booster", "Changes settings to improve FPS (refresh page)");

  createModule("Anti-Afk", "Presses WASD on its own to avoid being kicked for being AFK");
  const antiAfkModule = [...gridContainer.children].find(c => c.querySelector("h3")?.textContent === "Anti-Afk");
  let isAntiAfkActive=false, antiAfkInterval=null, antiAfkBox=null;
  if (antiAfkModule) {
    antiAfkModule.addEventListener("click", () => {
      isAntiAfkActive = !isAntiAfkActive;
      if (isAntiAfkActive) {
        antiAfkBox = document.createElement("div"); antiAfkBox.id="anti-afk-counter";
        antiAfkBox.style.cssText = "position:fixed;top:100px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:9999;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
        const afkDot = document.createElement("div"); afkDot.style.cssText="width:10px;height:10px;border-radius:50%;background-color:#4CAF50;box-shadow:0 0 12px rgba(76,175,80,0.9);animation:afkPulse 1.5s infinite;";
        const afkText = document.createElement("div"); afkText.textContent="Anti-AFK"; afkText.style.cssText="font-size:16px;font-weight:700;color:#4CAF50;letter-spacing:0.5px;";
        antiAfkBox.appendChild(afkDot); antiAfkBox.appendChild(afkText);
        const afkStyle = document.createElement("style"); afkStyle.textContent="@keyframes afkPulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.5;transform:scale(1.2)}}"; document.head.appendChild(afkStyle);
        document.body.appendChild(antiAfkBox);
        let isDrag=false, offX=0, offY=0;
        antiAfkBox.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-antiAfkBox.getBoundingClientRect().left; offY=e.clientY-antiAfkBox.getBoundingClientRect().top; e.preventDefault(); });
        document.addEventListener("mousemove", e => { if(isDrag){ antiAfkBox.style.left=`${e.clientX-offX}px`; antiAfkBox.style.top=`${e.clientY-offY}px`; } });
        document.addEventListener("mouseup", () => { isDrag=false; });
        const keys=[['w','KeyW',87],['a','KeyA',65],['s','KeyS',83],['d','KeyD',68],[' ','Space',32]];
        let idx=0;
        antiAfkInterval = setInterval(() => {
          const [key,code,keyCode]=keys[idx]; idx=(idx+1)%keys.length;
          const t=document.activeElement||document.body;
          t.dispatchEvent(new KeyboardEvent('keydown',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true}));
          setTimeout(()=>t.dispatchEvent(new KeyboardEvent('keyup',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true})),50);
        }, 500);
      } else { if(antiAfkInterval) clearInterval(antiAfkInterval); if(antiAfkBox) antiAfkBox.remove(); }
    });
  }

  createModule("Time Display", "Shows you the time so you dont have to exit full screen.");
  const timeModule = [...gridContainer.children].find(c => c.querySelector("h3")?.textContent === "Time Display");
  let isTimeVisible=false, timeElement=null;
  if (timeModule) {
    timeModule.addEventListener("click", () => {
      isTimeVisible = !isTimeVisible;
      if (isTimeVisible) {
        timeElement = document.createElement("div"); timeElement.id="fullscreen-clock";
        timeElement.style.cssText = "position:fixed;bottom:20px;right:20px;background-color:rgba(0,0,0,0.7);color:white;padding:10px 15px;border-radius:8px;font-size:18px;font-family:monospace;z-index:99999;cursor:move;";
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

  createModule("Music Player", "Plays music while you play.");
  const musicModule = [...gridContainer.children].find(c => c.querySelector("h3")?.textContent === "Music Player");
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
        musicPlayerEl = document.createElement("div");
        musicPlayerEl.id = "unverified-music-player";
        musicPlayerEl.innerHTML = `
          <div class="mp-topbar">
            <span class="mp-topbar-name">UV2</span>
            <button class="mp-topbar-close" id="mp-close">&#x2715;</button>
          </div>
          <div class="mp-nowplaying">
            <img class="mp-art" id="mp-album-art" src="" alt=""/>
            <div class="mp-info">
              <div class="mp-title" id="mp-song-title">nothing playing</div>
              <div class="mp-sub" id="mp-artist">—</div>
            </div>
          </div>
          <div class="mp-bar"><div class="mp-bar-fill" id="mp-progress-bar"></div></div>
          <div class="mp-btns">
            <button class="mp-btn" id="mp-prev-btn">&#9664;&#9664;</button>
            <button class="mp-btn active" id="mp-play-btn">&#9654;</button>
            <button class="mp-btn" id="mp-stop-btn">&#9632;</button>
          </div>
          <div class="mp-vol">
            <span class="mp-vol-lbl">VOL</span>
            <input class="mp-vol-slider" id="mp-volume" type="range" min="0" max="100" value="70"/>
            <span class="mp-vol-pct" id="mp-vol-label">70%</span>
          </div>
          <div class="mp-search-wrap">
            <input class="mp-search-in" id="mp-search-input" type="text" placeholder="search a song..." autocomplete="off" spellcheck="false"/>
            <button class="mp-search-go" id="mp-search-btn">GO</button>
          </div>
          <div class="mp-search-wrap" style="border-top:none;padding-top:0;">
            <input class="mp-search-in" id="mp-url-input" type="text" placeholder="or paste audio url (.mp3, .ogg...)" autocomplete="off" spellcheck="false"/>
            <button class="mp-search-go" id="mp-url-btn">PLAY</button>
          </div>
          <div class="mp-results" id="mp-results" style="display:none;"></div>
        `;
        document.body.appendChild(musicPlayerEl);

        const playBtn=musicPlayerEl.querySelector("#mp-play-btn"), stopBtn=musicPlayerEl.querySelector("#mp-stop-btn"), prevBtn=musicPlayerEl.querySelector("#mp-prev-btn");
        const volSlider=musicPlayerEl.querySelector("#mp-volume"), volLabel=musicPlayerEl.querySelector("#mp-vol-label");
        const songTitle=musicPlayerEl.querySelector("#mp-song-title"), artistEl=musicPlayerEl.querySelector("#mp-artist");
        const progressBar=musicPlayerEl.querySelector("#mp-progress-bar");
        const header=musicPlayerEl.querySelector(".mp-topbar"), albumArt=musicPlayerEl.querySelector("#mp-album-art");
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
          songTitle.textContent=title||src; artistEl.textContent=artist||"—";
          albumArt.src=imageUrl||"";
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

        const urlInput = musicPlayerEl.querySelector("#mp-url-input");
        const urlBtn = musicPlayerEl.querySelector("#mp-url-btn");

        function playFromUrl() {
          const raw = urlInput.value.trim();
          if (!raw) return;
          const previewBox = musicPlayerEl.querySelector("#mp-url-preview");
          if (previewBox) previewBox.remove();
          const preview = document.createElement("div");
          preview.id = "mp-url-preview";
          preview.style.cssText = "display:flex;align-items:center;gap:8px;padding:6px 10px;border-bottom:1px solid #161616;background:#111;";
          const icon = document.createElement("div");
          icon.style.cssText = "width:32px;height:32px;flex-shrink:0;background:#1a1a1a;display:flex;align-items:center;justify-content:center;font-size:18px;color:#e74c3c;";
          icon.textContent = "♪";
          const info = document.createElement("div");
          info.style.cssText = "flex:1;min-width:0;";
          const name = document.createElement("div");
          name.style.cssText = "font-size:10px;color:#bbb;font-family:MinibloxFont,sans-serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
          name.textContent = raw.split("/").pop().split("?")[0] || "audio file";
          const sub = document.createElement("div");
          sub.style.cssText = "font-size:9px;color:#333;margin-top:2px;font-family:MinibloxFont,sans-serif;";
          sub.textContent = "direct url";
          info.appendChild(name);
          info.appendChild(sub);
          preview.appendChild(icon);
          preview.appendChild(info);
          resultsBox.style.display = "block";
          resultsBox.innerHTML = "";
          resultsBox.appendChild(preview);
          loadAudioSrc(raw, name.textContent, "direct url", null);
        }

        urlBtn.addEventListener("click", playFromUrl);
        urlInput.addEventListener("keydown", e => {
          e.stopPropagation();
          if (e.key === "Enter") playFromUrl();
          if (e.key === "Escape") { resultsBox.style.display = "none"; }
        });
        urlInput.addEventListener("keyup", e => e.stopPropagation());
        urlInput.addEventListener("keypress", e => e.stopPropagation());
        searchInput.addEventListener("keydown", e => { e.stopPropagation(); if(e.key==="Enter") doSearch(); if(e.key==="Escape") resultsBox.style.display="none"; });
        searchInput.addEventListener("keyup", e => e.stopPropagation()); searchInput.addEventListener("keypress", e => e.stopPropagation());

        playBtn.addEventListener("click", () => {
          if (!musicAudio) return;
          if (musicIsPlaying) { musicAudio.pause(); playBtn.innerHTML="&#9654;"; musicIsPlaying=false; }
          else { musicAudio.play(); playBtn.innerHTML="&#9646;&#9646;"; musicIsPlaying=true; }
        });
        stopBtn.addEventListener("click", () => {
          if (musicAudio) { musicAudio.pause(); musicAudio.src=""; musicAudio=null; }
          musicIsPlaying=false; playBtn.innerHTML="&#9654;"; songTitle.textContent="nothing playing"; artistEl.textContent="—"; albumArt.src=""; progressBar.style.width="0%";
        });
        prevBtn.addEventListener("click", () => { if(musicAudio){ musicAudio.currentTime=0; if(!musicIsPlaying){ musicAudio.play(); playBtn.innerHTML="&#9646;&#9646;"; musicIsPlaying=true; } } });
        volSlider.addEventListener("input", () => { const v=parseInt(volSlider.value,10); volLabel.textContent=v+"%"; if(musicAudio) musicAudio.volume=v/100; });

      } else {
        if (musicAudio) { musicAudio.pause(); musicAudio.src=""; musicAudio=null; }
        if (musicPlayerEl) { musicPlayerEl.remove(); musicPlayerEl=null; }
        musicIsPlaying=false;
      }
    });
  }

  const bottomRow = document.createElement("div");
  bottomRow.style.cssText = "display:flex;align-items:center;justify-content:center;gap:8px;margin-top:18px;";
  ui.appendChild(bottomRow);

  const closeButton = document.createElement("button");
  closeButton.textContent = "Close UI";
  closeButton.style.cssText = "background-color:#e74c3c;color:white;border:none;border-radius:5px;padding:10px 20px;font-size:17px;cursor:pointer;";
  bottomRow.appendChild(closeButton);

  const ThemesDropdown = document.createElement("select");
  ThemesDropdown.style.cssText = "background-color:#e74c3c;color:white;border:none;border-radius:5px;padding:10px 20px;font-size:17px;cursor:pointer;";
  const themes = [
    {name:"Default",image:"#1a1a1a"},{name:"Minors??!!",image:"https://media1.tenor.com/m/mn2d2liDsmUAAAAC/ichigo-bleach.gif"},
    {name:"Nyan Cat",image:"https://media1.tenor.com/m/2roX3uxz_68AAAAC/cat-space.gif"},{name:"Beach",image:"https://wallpaperaccess.com/full/174768.jpg"},
    {name:"Fall",image:"https://wallpaperaccess.com/full/185084.jpg"},{name:"Ocean",image:"https://wallpaperaccess.com/full/317501.jpg"},
    {name:"Sunrise",image:"https://wallpaperaccess.com/full/14240.jpg"}
  ];
  themes.forEach(t => { const o=document.createElement("option"); o.value=t.image; o.textContent=t.name; ThemesDropdown.appendChild(o); });

  const RAINBOW_CODE = "#unverifiedsecret2026";
  function applyTheme(value) {
    const isColor = value.startsWith("#")||value.startsWith("rgb");
    if (isColor) { ui.style.backgroundImage=""; ui.style.backgroundSize=""; ui.style.backgroundPosition=""; ui.style.backgroundColor=value; }
    else { ui.style.backgroundColor=""; ui.style.backgroundImage=`url(${value})`; ui.style.backgroundSize="cover"; ui.style.backgroundPosition="center"; }
  }
  function applyRainbow(el) {
    if (!document.getElementById("unverified-rainbow-style")) {
      const s=document.createElement("style"); s.id="unverified-rainbow-style";
      s.textContent="@keyframes unverified-rainbow{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}";
      document.head.appendChild(s);
    }
    el.style.backgroundImage=""; el.style.backgroundColor=""; el.style.filter="";
    el.style.background="linear-gradient(270deg,#ff0000,#ff7700,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)";
    el.style.backgroundSize="400% 400%"; el.style.animation="unverified-rainbow 4s ease infinite";
  }
  ThemesDropdown.addEventListener("change", e => {
    if (e.target.value.toLowerCase()===RAINBOW_CODE) applyRainbow(ui);
    else { ui.style.animation=""; ui.style.filter=""; applyTheme(e.target.value); }
  });

  let customThemes = JSON.parse(localStorage.getItem("unverified-custom-themes")||"[]");
  function saveCustomThemes() { localStorage.setItem("unverified-custom-themes",JSON.stringify(customThemes)); }
  function rebuildCustomOptions() {
    for (let i=ThemesDropdown.options.length-1;i>=0;i--) { if(ThemesDropdown.options[i].dataset.custom==="1") ThemesDropdown.remove(i); }
    customThemes.forEach(t => { const o=document.createElement("option"); o.value=t.image; o.textContent="\u2605 "+t.name; o.dataset.custom="1"; ThemesDropdown.appendChild(o); });
  }
  rebuildCustomOptions();

  const themeRow = document.createElement("div"); themeRow.style.cssText="display:flex;align-items:center;gap:8px;"; themeRow.appendChild(ThemesDropdown);
  const addThemeBtn = document.createElement("button"); addThemeBtn.textContent="+"; addThemeBtn.title="Create custom theme (max 3)";
  addThemeBtn.style.cssText="background-color:#e74c3c;color:white;border:none;border-radius:5px;width:38px;height:38px;font-size:22px;cursor:pointer;flex-shrink:0;";
  addThemeBtn.addEventListener("mouseover",()=>addThemeBtn.style.backgroundColor="#c0392b"); addThemeBtn.addEventListener("mouseout",()=>addThemeBtn.style.backgroundColor="#e74c3c");
  themeRow.appendChild(addThemeBtn); bottomRow.appendChild(themeRow);

  const ctOverlay = document.createElement("div"); ctOverlay.id="ct-overlay"; ctOverlay.style.cssText="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:99998;"; document.body.appendChild(ctOverlay);
  const ctModalStyle = document.createElement("style");
  ctModalStyle.textContent=`@keyframes ctSlideIn{from{opacity:0;transform:translate(-50%,-46%) scale(0.96)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}@keyframes ctSlideOut{from{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,-46%) scale(0.96)}}#ct-modal.ct-in{animation:ctSlideIn 0.18s ease forwards}#ct-modal.ct-out{animation:ctSlideOut 0.15s ease forwards}#ct-name:focus,#ct-bg:focus{border-bottom-color:#e74c3c !important}#ct-save:hover{background:#c0392b !important}#ct-cancel-btn:hover{color:#ccc !important}`;
  document.head.appendChild(ctModalStyle);
  const ctModal = document.createElement("div"); ctModal.id="ct-modal";
  ctModal.style.cssText="display:none;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:#141414;border-top:3px solid #e74c3c;border-radius:6px;padding:20px 22px 22px;z-index:99999;width:300px;box-shadow:0 16px 48px rgba(0,0,0,0.95);font-family:MinibloxFont,sans-serif;color:white;";
  ctModal.innerHTML=`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;"><span style="color:#e74c3c;font-size:17px;">New Theme</span><button id="ct-cancel-btn" style="background:none;border:none;color:#555;font-size:20px;cursor:pointer;padding:0;line-height:1;transition:color 0.15s;">&#x2715;</button></div><div style="font-size:11px;color:#555;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;">Name</div><input id="ct-name" maxlength="20" placeholder="My Theme" style="width:100%;box-sizing:border-box;background:#1a1a1a;color:white;border:none;border-bottom:1px solid #2a2a2a;padding:7px 0;font-size:14px;outline:none;margin-bottom:16px;font-family:MinibloxFont,sans-serif;transition:border-color 0.2s;"><div style="font-size:11px;color:#555;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;">Background</div><input id="ct-bg" placeholder="https://... or #hexcolor" style="width:100%;box-sizing:border-box;background:#1a1a1a;color:white;border:none;border-bottom:1px solid #2a2a2a;padding:7px 0;font-size:13px;outline:none;margin-bottom:14px;font-family:MinibloxFont,sans-serif;transition:border-color 0.2s;"><div id="ct-preview" style="width:100%;height:90px;margin-bottom:16px;border-radius:4px;background:#1a1a1a;display:flex;align-items:center;justify-content:center;color:#333;font-size:12px;letter-spacing:1px;text-transform:uppercase;box-sizing:border-box;overflow:hidden;">no preview</div><div id="ct-limit-warn" style="color:#e74c3c;font-size:12px;margin-bottom:12px;display:none;">max 3 themes — delete one first</div><button id="ct-save" style="width:100%;background:#e74c3c;color:white;border:none;padding:10px;font-size:14px;cursor:pointer;font-family:MinibloxFont,sans-serif;border-radius:3px;margin-bottom:20px;transition:background 0.15s;">Save Theme</button><div style="font-size:10px;color:#333;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Saved Themes</div><div id="ct-list" style="display:flex;flex-direction:column;gap:6px;"></div>`;
  document.body.appendChild(ctModal);

  function openCtModal() { ctModal.style.display="block"; ctOverlay.style.display="block"; ctModal.classList.remove("ct-out"); ctModal.classList.add("ct-in"); }
  function closeCtModal() { ctModal.classList.remove("ct-in"); ctModal.classList.add("ct-out"); setTimeout(()=>{ ctModal.style.display="none"; ctOverlay.style.display="none"; ctModal.classList.remove("ct-out"); },150); }
  ctOverlay.addEventListener("click", closeCtModal);

  function renderCtList() {
    const list=document.getElementById("ct-list"); if(!list) return; list.innerHTML="";
    if (!customThemes.length) { list.innerHTML=`<div style="color:#2a2a2a;font-size:12px;">nothing saved yet</div>`; return; }
    customThemes.forEach((t,i) => {
      const row=document.createElement("div"); row.style.cssText="display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid #1e1e1e;";
      const swatch=document.createElement("div"); const isColor=t.image.startsWith("#")||t.image.startsWith("rgb"); swatch.style.cssText="width:36px;height:36px;flex-shrink:0;border-radius:3px;background-size:cover;background-position:center;";
      if(isColor) swatch.style.backgroundColor=t.image; else swatch.style.backgroundImage=`url(${t.image})`;
      const label=document.createElement("span"); label.textContent=t.name; label.style.cssText="flex:1;font-size:13px;color:#ccc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;";
      const delBtn=document.createElement("button"); delBtn.textContent="remove"; delBtn.style.cssText="background:none;color:#3a3a3a;border:none;font-size:11px;cursor:pointer;padding:0;font-family:MinibloxFont,sans-serif;transition:color 0.15s;";
      delBtn.addEventListener("mouseover",()=>delBtn.style.color="#e74c3c"); delBtn.addEventListener("mouseout",()=>delBtn.style.color="#3a3a3a");
      delBtn.addEventListener("click", () => { const wasActive=ThemesDropdown.value===t.image; customThemes.splice(i,1); saveCustomThemes(); rebuildCustomOptions(); renderCtList(); if(wasActive||!Array.from(ThemesDropdown.options).some(o=>o.value===ThemesDropdown.value)){ const dv=ThemesDropdown.options[0]?ThemesDropdown.options[0].value:"#1a1a1a"; ThemesDropdown.value=dv; ui.style.animation=""; applyTheme(dv); } const warn=document.getElementById("ct-limit-warn"); if(warn) warn.style.display="none"; });
      row.appendChild(swatch); row.appendChild(label); row.appendChild(delBtn); list.appendChild(row);
    });
  }

  ctModal.addEventListener("input", e => {
    if (e.target.id!=="ct-bg") return; const val=e.target.value.trim(); const prev=document.getElementById("ct-preview"); if(!prev) return;
    prev.style.cssText="width:100%;height:90px;margin-bottom:16px;border-radius:4px;box-sizing:border-box;overflow:hidden;display:flex;align-items:center;justify-content:center;font-size:12px;letter-spacing:1px;text-transform:uppercase;";
    if(val.toLowerCase()===RAINBOW_CODE){ applyRainbow(prev); prev.textContent=""; }
    else if(val.startsWith("#")||val.startsWith("rgb")){ prev.style.animation=""; prev.style.backgroundColor=val; prev.style.color="rgba(255,255,255,0.4)"; prev.textContent=val; }
    else if(val.startsWith("http")){ prev.style.animation=""; prev.style.backgroundImage=`url(${val})`; prev.style.backgroundSize="cover"; prev.style.backgroundPosition="center"; prev.style.backgroundColor="#1a1a1a"; prev.textContent=""; }
    else { prev.style.animation=""; prev.style.backgroundColor="#1a1a1a"; prev.style.color="#333"; prev.textContent="no preview"; }
  });

  addThemeBtn.addEventListener("click", () => {
    const ni=document.getElementById("ct-name"), bi=document.getElementById("ct-bg"), pv=document.getElementById("ct-preview"), wn=document.getElementById("ct-limit-warn");
    if(ni) ni.value=""; if(bi) bi.value=""; if(pv){ pv.style.background="#1a1a1a"; pv.textContent="no preview"; }
    if(wn) wn.style.display=customThemes.length>=3?"block":"none";
    renderCtList(); openCtModal();
  });

  ctModal.addEventListener("click", e => {
    if(e.target.id==="ct-cancel-btn"){ closeCtModal(); return; }
    if(e.target.id==="ct-save"){
      const name=(document.getElementById("ct-name").value||"").trim(), bg=(document.getElementById("ct-bg").value||"").trim();
      const warn=document.getElementById("ct-limit-warn");
      if(!name||!bg){ alert("fill in both fields"); return; }
      if(customThemes.length>=3){ if(warn) warn.style.display="block"; return; }
      customThemes.push({name,image:bg}); saveCustomThemes(); rebuildCustomOptions(); renderCtList();
      if(warn) warn.style.display="none"; ThemesDropdown.value=bg;
      if(bg.toLowerCase()===RAINBOW_CODE) applyRainbow(ui); else ThemesDropdown.dispatchEvent(new Event("change"));
      closeCtModal();
    }
  });

  updateLanguage();

  function toggleUI() {
    if (uiVisible) { ui.style.display="none"; closeCtModal(); settingsOverlay.classList.remove("uv2-open"); if(musicPlayerEl) musicPlayerEl.style.display="none"; }
    else { ui.style.display="block"; if(musicPlayerEl) musicPlayerEl.style.display="block"; }
    uiVisible = !uiVisible;
  }

  document.addEventListener("keydown", event => {
    if (event.key==="Shift" && event.location===2) toggleUI();
    if (event.key==="Escape" && ctModal.style.display!=="none") closeCtModal();
    for (let moduleName in moduleBindings) {
      if (moduleBindings[moduleName]===event.key) {
        const now=Date.now();
        if (!lastKeyPressTime[moduleName]||now-lastKeyPressTime[moduleName]>200) {
          const mc=[...gridContainer.children].find(c=>c.querySelector("h3").textContent===moduleName);
          if(mc) mc.click();
          lastKeyPressTime[moduleName]=now;
        }
      }
    }
  });

  closeButton.addEventListener("click", () => { ui.style.display="none"; closeCtModal(); settingsOverlay.classList.remove("uv2-open"); if(musicPlayerEl) musicPlayerEl.style.display="none"; uiVisible=false; });

})();

(function() {
  'use strict';
  window.requestAnimationFrame = function(callback) { return setTimeout(function() { callback(performance.now()); }, 0); };
  console.log('Client Status: Great');
})();
