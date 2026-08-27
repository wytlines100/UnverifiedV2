// ==UserScript==
// @name         Unverified V2
// @namespace    http://tampermonkey.net/
// @version      2.2.2
// @description  Look at my license before you modify, I WILL DMCA you.
// @icon         https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/logo.jpg
// @license      Proprietary License
// @author       wytlines, DeadFish7, andreypidd, jet, joudaALT, TrustIsOver, TheM1ddleM1n
// @match        https://miniblox.io/
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @connect      cdnjs.cloudflare.com
// @connect      ip-api.com
// ==/UserScript==

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
      transition: "opacity 1.4s ease, transform 1.4s ease",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.circle = document.createElement("div");
    Object.assign(this.circle.style, {
      width: "100px", height: "100px", backgroundColor: "black",
      border: "2px solid red", borderRadius: "50%",
      boxShadow: "0 0 10px red, 0 0 20px red, 0 0 30px red",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: 0, transition: "opacity 1.4s ease, transform 1.4s ease",
    });
    this.circle.appendChild(this.check);
    this.container.appendChild(this.circle);
    this.unverifiedText = document.createElement("div");
    this.unverifiedText.textContent = "UnverifiedV2";
    Object.assign(this.unverifiedText.style, {
      color: "red", fontSize: "60px", opacity: 0, marginTop: "50px",
      transition: "opacity 1.1s ease",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.container.appendChild(this.unverifiedText);
    this.creditsText = document.createElement("div");
    this.creditsText.textContent = "\nBy wytlines, DeadFish7\nandreypidd, jet, joudaALT, TrustIsOver, TheM1ddleM1n";
    Object.assign(this.creditsText.style, {
      color: "red", fontSize: "30px", opacity: 0, transition: "opacity 1.1s ease",
      whiteSpace: 'pre-line', textAlign: "center",
      textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
    });
    this.container.appendChild(this.creditsText);
  }
  playIntro() {
    document.body.appendChild(this.container);
    this.circle.style.opacity = 1;
    this.check.style.opacity = 1;
    setTimeout(() => { this.check.style.transform = "rotate(180deg)"; }, 800);
    setTimeout(() => {
      this.unverifiedText.style.opacity = 1;
    }, 1600);
    setTimeout(() => { this.creditsText.style.opacity = 1; }, 2400);
    setTimeout(() => { this.container.style.transition = "opacity 1.4s ease"; this.container.style.opacity = 0; }, 5600);
    setTimeout(() => { this.container.remove(); }, 6400);
  }
  showInitializedNotif() {
    const n = document.createElement("div");
    n.classList.add('initialized-notification');
    n.textContent = "UnverifiedV2 Initialized!";
    document.body.appendChild(n);
    setTimeout(() => { n.style.top = "10px"; n.style.opacity = "1"; }, 10);
    setTimeout(() => { n.style.top = "-50px"; n.style.opacity = "0"; }, 3200);
    setTimeout(() => { n.remove(); }, 4200);
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
      game.chat.addChat({
        text: "\\glow\\\\shiny\\\\#BF3011\\[Unverified Client]:\\reset\\ Hello, thanks for using Unverified Client! Please Join our discord for updates/community support!"
      });
    }
  }, 500);
})();

class UnverifiedStyler {
  constructor() {
    this.observer = null;
  }
  addStyleObserver() {
    document.title = 'UnverifiedV2';
  }
}
class UnverifiedBackground {
  constructor() {
    this.bg1 = "https://images3.alphacoders.com/133/1333794.jpeg";
    this.currentBG = this.bg1;
  }
  setBG(e) { e.src = this.currentBG; }
}

(function() {
  'use strict';
  const intro = new UnverifiedIntro();
  intro.playIntro();
  intro.showInitializedNotif();
  const styler = new UnverifiedStyler();
  styler.addStyleObserver();
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
    .module-tooltip { visibility:hidden; position:absolute; background-color:#2c3e50; color:white; padding:5px 10px; border-radius:5px; font-size:14px; z-index:10000; opacity:0; transition:opacity 0.3s ease; bottom:6px; right:10px; white-space:nowrap; pointer-events:none; }
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
    /* Module container styles - rectangle with slight curve */
    .module-container {
      border-radius: 8px !important;
    }
    .module-container:hover {
      border-radius: 8px !important;
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

  const targetImageUrl = "https://images3.alphacoders.com/133/1333794.jpeg";
  const targetImageSelector = "img.chakra-image.css-139opjw";

  function enforceTargetImage() {
    const img = document.querySelector(targetImageSelector);
    if (!img) return;

    if (img.getAttribute("src") !== targetImageUrl) {
      img.src = targetImageUrl;
    }
    if (img.getAttribute("srcset") !== targetImageUrl) {
      img.srcset = targetImageUrl;
    }
  }

  enforceTargetImage();

  const imageObserver = new MutationObserver(() => {
    enforceTargetImage();
  });

  imageObserver.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["src", "srcset"]
  });

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
    { page: 'gui',        label: 'Color',      icon: 'fa-paint-brush' },
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
  uv2SidebarFooter.textContent = "v2.2.2";
  uv2Sidebar.appendChild(uv2SidebarFooter);

  ui.appendChild(uv2Sidebar);

  const uv2ContentArea = document.createElement("div");
  uv2ContentArea.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;";
  ui.appendChild(uv2ContentArea);

  const uv2MainPage = document.createElement("div");
  uv2MainPage.id = "uv2-page-main-content";
  uv2MainPage.style.cssText = "flex:1;display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2MainPage);

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

  let guiPrimaryColor = localStorage.getItem('uv2-gui-primary-color') || '#e74c3c';
let guiBackgroundColor = '#000000';
let guiTextColor = '#ffffff';

  function applyGUIStyles() {
    ui.style.backgroundColor = guiBackgroundColor;
    ui.style.color = guiTextColor;

    ui.querySelectorAll('.mp-search-go').forEach(btn => {
      btn.style.backgroundColor = guiPrimaryColor;
    });

      if (document.activeElement === moduleSearchInput) {
      moduleSearchInput.style.borderColor = guiPrimaryColor;
}

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
  heading.textContent = 'Color';
  heading.style.cssText = 'font-size:28px;font-family:MinibloxFont,sans-serif;margin:0 0 20px 0;text-align:center;color:#fff;';
  uv2GUIPage.appendChild(heading);

  const sectionLabel = document.createElement('div');
  sectionLabel.className = 'uv2-section-title';
  sectionLabel.textContent = 'Accent color';
  sectionLabel.style.marginTop = '0';
  uv2GUIPage.appendChild(sectionLabel);

  const row = document.createElement('div');
  row.style.cssText = 'display:flex;align-items:center;gap:16px;padding:4px 0 20px 0;';
  uv2GUIPage.appendChild(row);

  const picker = document.createElement('input');
  picker.type = 'color';
  picker.value = guiPrimaryColor;
  picker.style.cssText = 'width:48px;height:48px;border:none;border-radius:8px;cursor:pointer;background:none;padding:0;flex-shrink:0;';
  row.appendChild(picker);

  const hexInput = document.createElement('input');
  hexInput.type = 'text';
  hexInput.value = guiPrimaryColor;
  hexInput.maxLength = 7;
  hexInput.style.cssText = 'background:#111;color:#fff;border:1px solid rgba(255,255,255,0.12);border-radius:6px;padding:10px 14px;font-size:14px;font-family:MinibloxFont,sans-serif;width:110px;outline:none;';
  row.appendChild(hexInput);

  const previewDot = document.createElement('div');
  previewDot.style.cssText = `width:28px;height:28px;border-radius:50%;background:${guiPrimaryColor};box-shadow:0 0 12px ${guiPrimaryColor}88;transition:background 0.15s,box-shadow 0.15s;flex-shrink:0;`;
  row.appendChild(previewDot);

    const recentLabel = document.createElement('div');
  recentLabel.className = 'uv2-section-title';
  recentLabel.textContent = 'Recent colors';
  uv2GUIPage.appendChild(recentLabel);

  const recentRow = document.createElement('div');
  recentRow.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;padding:4px 0 0 0;';
  uv2GUIPage.appendChild(recentRow);

  function loadRecent() {
    try { return JSON.parse(localStorage.getItem('uv2-recent-colors') || '[]'); } catch(e) { return []; }
  }

  function saveRecent(hex) {
    let list = loadRecent().filter(c => c !== hex);
    list.unshift(hex);
    if (list.length > 7) list = list.slice(0, 7);
    localStorage.setItem('uv2-recent-colors', JSON.stringify(list));
  }

  function renderRecent() {
    recentRow.innerHTML = '';
    loadRecent().forEach(hex => {
      const swatch = document.createElement('div');
      swatch.style.cssText = `width:32px;height:32px;border-radius:6px;background:${hex};cursor:pointer;border:2px solid transparent;transition:border-color 0.15s,transform 0.15s;flex-shrink:0;`;
      swatch.addEventListener('mouseenter', () => { swatch.style.transform = 'scale(1.15)'; });
      swatch.addEventListener('mouseleave', () => { swatch.style.transform = 'scale(1)'; });
      swatch.addEventListener('click', () => { applyColor(hex); });
      if (hex === guiPrimaryColor) swatch.style.borderColor = '#fff';
      recentRow.appendChild(swatch);
    });
  }

  function applyColor(hex) {
    guiPrimaryColor = hex;
    localStorage.setItem('uv2-gui-primary-color', hex);
    picker.value = hex;
    hexInput.value = hex;
    previewDot.style.background = hex;
    previewDot.style.boxShadow = `0 0 12px ${hex}88`;
    saveRecent(hex);
    renderRecent();
    applyGUIStyles();
    try { closeButton.style.background = hex; closeButton.style.boxShadow = `0 2px 14px ${hex}73`; } catch(e) {}
  }

  renderRecent();

  picker.addEventListener('change', () => { applyColor(picker.value); });

  hexInput.addEventListener('input', () => {
    const val = hexInput.value.trim();
    if (/^#[0-9a-fA-F]{6}$/.test(val)) applyColor(val);
  });

  hexInput.addEventListener('keydown', e => { if (e.key === 'Enter') hexInput.blur(); });
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
    const moduleSearchWrap = document.createElement("div");
moduleSearchWrap.style.cssText = "display:flex;align-items:center;gap:10px;margin-bottom:4px;padding:0 2px;";

const moduleSearchInput = document.createElement("input");
moduleSearchInput.type = "text";
moduleSearchInput.placeholder = "Search modules...";
moduleSearchInput.style.cssText = [
  "flex:1;background:#111;color:#fff;border:1px solid rgba(255,255,255,0.1);",
  "border-radius:7px;padding:9px 14px;font-size:13px;",
  "font-family:MinibloxFont,sans-serif;outline:none;",
  "transition:border-color 0.18s ease;"
].join("");

moduleSearchInput.addEventListener("focus", () => {
  moduleSearchInput.style.borderColor = guiPrimaryColor;
});
moduleSearchInput.addEventListener("blur", () => {
  moduleSearchInput.style.borderColor = "rgba(255,255,255,0.1)";
});
moduleSearchInput.addEventListener("input", () => {
  const query = moduleSearchInput.value.trim().toLowerCase();
  [...gridContainer.children].forEach(mc => {
    if (!mc.dataset.moduleName) return;
    const nameMatch = mc.dataset.moduleName.toLowerCase().includes(query);
    const descEl = mc.querySelector("p");
    const descMatch = descEl ? descEl.textContent.toLowerCase().includes(query) : false;
    mc.style.display = (nameMatch || descMatch || query === "") ? "flex" : "none";
  });
});

const moduleSearchClear = document.createElement("button");
moduleSearchClear.textContent = "✕";
moduleSearchClear.style.cssText = [
  "background:#1a1a1a;color:#666;border:1px solid rgba(255,255,255,0.08);",
  "border-radius:7px;padding:9px 12px;font-size:13px;cursor:pointer;",
  "font-family:MinibloxFont,sans-serif;transition:all 0.15s ease;flex-shrink:0;"
].join("");
moduleSearchClear.addEventListener("mouseenter", () => {
  moduleSearchClear.style.background = "#2a2a2a";
  moduleSearchClear.style.color = "#fff";
});
moduleSearchClear.addEventListener("mouseleave", () => {
  moduleSearchClear.style.background = "#1a1a1a";
  moduleSearchClear.style.color = "#666";
});
moduleSearchClear.addEventListener("click", () => {
  moduleSearchInput.value = "";
  [...gridContainer.children].forEach(mc => {
    mc.style.display = "flex";
  });
  moduleSearchInput.focus();
});

moduleSearchWrap.appendChild(moduleSearchInput);
moduleSearchWrap.appendChild(moduleSearchClear);
uv2MainPage.appendChild(moduleSearchWrap);

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
      <span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94zM12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6S13.98,15.6,12,15.6z"/></svg>Settings</span>
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
          <div class="uv2-section-title" style="margin-top:14px;">Security</div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">Show VPN Warning</div><div class="uv2-setting-desc">Show the VPN detection popup when opening the menu</div></div>
            <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-vpnwarning"><div class="uv2-toggle-track"></div></label>
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
          <div class="uv2-setting-row"><div><div class="uv2-setting-label">Version</div><div class="uv2-setting-desc">2.2.2</div></div></div>
          <div class="uv2-setting-row"><div><div class="uv2-setting-label">License</div><div class="uv2-setting-desc">Proprietary, do not redistribute</div></div></div>
          <div class="uv2-section-title" style="margin-top:16px;">Contributors</div>
          <div id="uv2-contributors-grid"></div>
        </div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(settingsOverlay);

(function buildContributorsGrid() {
  const UV2_CONTRIBUTORS = [
    {
      name: "wytlines",
      role: "Lead Developer",
      badge: "Founder",
      bio: "Created UnverifiedV2 from scratch and drives the project forward.",
      avatar: "https://github.com/wytlines100.png",
      color: { bg: "#3b1a00", text: "#fdba74", border: "#ea580c", strip: "#ea580c", icon: "★" },
    },
    {
      name: "DeadFish7",
      role: "Developer",
      badge: "Veteran Dev",
      bio: "Created Public Lurker Client",
      avatar: "https://github.com/DeadFish7.png",
      color: { bg: "#1e1b4b", text: "#a5b4fc", border: "#4f46e5", strip: "#4f46e5", icon: "◈" },
    },
    {
      name: "andreypidd",
      role: "Contributor",
      badge: "Contributor",
      bio: "Pitched in with contributions that helped shape the client.",
      avatar: "https://github.com/andreypidd.png",
      color: { bg: "#1a2e1a", text: "#86efac", border: "#16a34a", strip: "#16a34a", icon: "●" },
    },
    {
      name: "jet",
      role: "Ex-Developer",
      badge: "Ex-Dev",
      bio: "Former developer who helped build early versions of the client.",
      avatar: "https://github.com/jet.png",
      color: { bg: "#1c1c1c", text: "#a1a1aa", border: "#52525b", strip: "#52525b", icon: "◇" },
    },
    {
      name: "joudaALT",
      role: "Developer",
      badge: "Mod & Dev",
      bio: "Miniblox moderator and coder who keeps the community and code in check.",
      avatar: "https://github.com/joudaALT.png",
      color: { bg: "#1a1f3a", text: "#93c5fd", border: "#3b82f6", strip: "#3b82f6", icon: "⬡" },
    },
    {
      name: "Trust",
      role: "Developer",
      badge: "Coder",
      bio: "Coder for Miniblox with a knack for clean implementations.",
      avatar: "https://github.com/lttlgrl.png",
      color: { bg: "#2d1a3a", text: "#d8b4fe", border: "#9333ea", strip: "#9333ea", icon: "✦" },
    },
    {
      name: "TheM1ddleM1n",
      role: "Developer",
      badge: "Bug Slayer",
      bio: "Professional Coder for Miniblox, fixing bugs and adding features.",
      avatar: "https://github.com/TheM1ddleM1n.png",
      color: { bg: "#1a2a1a", text: "#6ee7b7", border: "#059669", strip: "#059669", icon: "⚔" },
    },
  ];

  const grid = document.getElementById("uv2-contributors-grid");
  if (!grid) return;
  grid.style.cssText = "display:flex;flex-wrap:wrap;gap:12px;padding:4px 0 8px 0;";

  const shimmerStyle = document.createElement("style");
  shimmerStyle.textContent = `
@keyframes uv2-card-shimmer {
  0% { transform:translateX(-100%) skewX(-15deg); }
  100% { transform:translateX(300%) skewX(-15deg); }
}
.uv2-contrib-card:hover .uv2-card-shimmer {
  animation: uv2-card-shimmer 0.65s ease forwards;
}
`;
  document.head.appendChild(shimmerStyle);

  UV2_CONTRIBUTORS.forEach(contributor => {
    const c = contributor.color;

    const card = document.createElement("div");
    card.className = "uv2-contrib-card";
    card.style.cssText = [
      "display:flex;flex-direction:column;",
      "background:linear-gradient(160deg,#1c1c1c,#111111);",
      `border:1px solid ${c.strip}30;border-radius:10px;`,
      "flex:1;min-width:200px;max-width:calc(50% - 6px);",
      "transition:border-color 0.2s ease,box-shadow 0.2s ease;",
      "cursor:default;box-sizing:border-box;position:relative;overflow:hidden;",
    ].join("");

    card.addEventListener("mouseenter", () => {
      card.style.borderColor = `${c.strip}80`;
      card.style.boxShadow = `0 0 0 1px ${c.strip}25, 0 6px 24px rgba(0,0,0,0.6), inset 0 0 40px ${c.strip}08`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.borderColor = `${c.strip}30`;
      card.style.boxShadow = "none";
    });

    const shimmer = document.createElement("div");
    shimmer.className = "uv2-card-shimmer";
    shimmer.style.cssText = [
      "pointer-events:none;position:absolute;top:0;left:0;width:40%;height:100%;",
      "background:linear-gradient(120deg,transparent,rgba(255,255,255,0.07),transparent);",
      "transform:translateX(-100%) skewX(-15deg);z-index:1;",
    ].join("");
    card.appendChild(shimmer);

    const strip = document.createElement("div");
    strip.style.cssText = `height:3px;background:linear-gradient(90deg,${c.strip},${c.strip}44);border-radius:10px 10px 0 0;flex-shrink:0;`;
    card.appendChild(strip);

    const body = document.createElement("div");
    body.style.cssText = "display:flex;flex-direction:column;gap:10px;padding:12px 14px 14px;position:relative;z-index:2;";

    const topRow = document.createElement("div");
    topRow.style.cssText = "display:flex;align-items:center;gap:10px;";

    const avatarWrap = document.createElement("div");
    avatarWrap.style.cssText = "position:relative;flex-shrink:0;";

    const avatarGlow = document.createElement("div");
    avatarGlow.style.cssText = [
      "position:absolute;inset:-3px;border-radius:50%;",
      `background:radial-gradient(circle,${c.strip}55,transparent 70%);`,
      "z-index:0;",
    ].join("");
    avatarWrap.appendChild(avatarGlow);

    const avatar = document.createElement("img");
    avatar.src = contributor.avatar;
    avatar.style.cssText = [
      "width:44px;height:44px;border-radius:50%;display:block;position:relative;z-index:1;",
      `border:2px solid ${c.strip}99;background:#111;`,
    ].join("");
    avatar.onerror = function() {
      this.src = `https://github.com/identicons/${contributor.name}.png`;
    };
    avatarWrap.appendChild(avatar);

    const topInfo = document.createElement("div");
    topInfo.style.cssText = "display:flex;flex-direction:column;gap:4px;min-width:0;flex:1;";

    const nameRow = document.createElement("div");
    nameRow.style.cssText = "display:flex;align-items:center;gap:6px;flex-wrap:wrap;";

    const nameEl = document.createElement("div");
    nameEl.textContent = contributor.name;
    nameEl.style.cssText = "font-size:13px;font-weight:600;color:#fff;font-family:MinibloxFont,sans-serif;white-space:nowrap;";

    const badgeEl = document.createElement("div");
    badgeEl.style.cssText = [
      `background:${c.bg};color:${c.text};border:1px solid ${c.border};`,
      "font-size:9px;font-family:MinibloxFont,sans-serif;letter-spacing:0.5px;",
      "padding:2px 6px;border-radius:4px;white-space:nowrap;display:flex;align-items:center;gap:3px;",
    ].join("");

    const badgeIcon = document.createElement("span");
    badgeIcon.textContent = c.icon;
    badgeIcon.style.cssText = "font-size:8px;";
    const badgeText = document.createElement("span");
    badgeText.textContent = contributor.badge;
    badgeEl.appendChild(badgeIcon);
    badgeEl.appendChild(badgeText);

    nameRow.appendChild(nameEl);
    nameRow.appendChild(badgeEl);

    const roleEl = document.createElement("div");
    roleEl.textContent = contributor.role;
    roleEl.style.cssText = `font-size:11px;color:${c.strip};font-family:MinibloxFont,sans-serif;opacity:0.9;`;

    topInfo.appendChild(nameRow);
    topInfo.appendChild(roleEl);

    topRow.appendChild(avatarWrap);
    topRow.appendChild(topInfo);

    const divider = document.createElement("div");
    divider.style.cssText = `height:1px;background:linear-gradient(90deg,${c.strip}30,transparent);`;

    const bioEl = document.createElement("div");
    bioEl.textContent = contributor.bio;
    bioEl.style.cssText = "font-size:11.5px;color:#666;font-family:MinibloxFont,sans-serif;line-height:1.55;";

    body.appendChild(topRow);
    body.appendChild(divider);
    body.appendChild(bioEl);
    card.appendChild(body);
    grid.appendChild(card);
  });
})();

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
  document.querySelector("#uv2-toggle-vpnwarning")?.addEventListener("change", function() {
    settings.vpnWarning = this.checked;
    localStorage.setItem('uv2-setting-vpnwarning', this.checked);
    if (this.checked) vpnGateDismissed = false;
  });

  let moduleBindings = {};
  let isBinding = false;
  let lastKeyPressTime = {};
  let vpnGateDismissed = false;
  let uiVisible = false;
  let uiAnimating = false;
  let closeUITimeout = null;
  let isRestoring = false;

  const settings = {
    moduleSounds:      localStorage.getItem('uv2-setting-sounds')    !== 'false',
    showNotifications: localStorage.getItem('uv2-setting-notifs')    !== 'false',
    animateUI:         localStorage.getItem('uv2-setting-animation') !== 'false',
    saving:            localStorage.getItem('uv2-setting-saving')    === 'true',
    autoAfk:           localStorage.getItem('uv2-setting-autoafk')  === 'true',
    afkChat:           localStorage.getItem('uv2-setting-afkchat')  !== 'false',
    vpnWarning:        localStorage.getItem('uv2-setting-vpnwarning') !== 'false',
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
  const vpnWarningToggle = document.querySelector("#uv2-toggle-vpnwarning");
  if (vpnWarningToggle) vpnWarningToggle.checked = settings.vpnWarning;

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
  en: {
    languageName:"English", title:"UnverifiedV2",
    autoFullscreen:"Auto Fullscreen", autoFullscreenDesc:"Automatically toggles Fullscreen",
    keystrokes:"Keystrokes", keystrokesDesc:"Displays the keys you press in real-time.",
    muteChat:"Mute Chat", muteChatDesc:"Prevents other players messages from appearing in chat.",
    chatFilter:"Chat Filter", chatFilterDesc:"Blocks swear words and spam from appearing in chat.",
    antiAfk:"Anti-Afk", antiAfkDesc:"Presses WASD on its own to avoid being kicked for being AFK",
    keepSprint:"Keep Sprint", keepSprintDesc:"Keeps you sprinting automatically.",
    timeDisplay:"Time Display", timeDisplayDesc:"Shows you the time so you dont have to exit full screen.",
    armorHud: "Armor HUD", armorHudDesc: "Shows armor durability percentages, enchantments and icons.",
    closeUI:"Close UI", turnedOn:"was turned on", turnedOff:"was turned off", tooltipBind:"right-click to bind"
  },
  es: {
    languageName:"Spanish", title:"UnverifiedV2",
    autoFullscreen:"Pantalla Completa Automática", autoFullscreenDesc:"Activa/desactiva automáticamente la pantalla completa",
    keystrokes:"Teclas", keystrokesDesc:"Muestra las teclas que presionas en tiempo real.",
    muteChat:"Silenciar Chat", muteChatDesc:"Evita que aparezcan mensajes de otros jugadores en el chat.",
    chatFilter:"Filtro de Chat", chatFilterDesc:"Bloquea palabrotas y spam del chat.",
    antiAfk:"Anti-Inactividad", antiAfkDesc:"Presiona WASD automáticamente para evitar ser expulsado por inactividad",
    keepSprint:"Mantener Sprint", keepSprintDesc:"Te mantiene corriendo automáticamente.",
    timeDisplay:"Mostrar Hora", timeDisplayDesc:"Te muestra la hora para que no tengas que salir de pantalla completa.",
    armorHud: "HUD de armadura", armorHudDesc: "Muestra los porcentajes de durabilidad de la armadura, los encantamientos y los iconos.",
    closeUI:"Cerrar UI", turnedOn:"fue activado", turnedOff:"fue desactivado", tooltipBind:"clic derecho para vincular"
  },
      fr: {
  languageName:"French", title:"UnverifiedV2",
  autoFullscreen:"Plein Ecran Auto", autoFullscreenDesc:"Active/desactive automatiquement le plein ecran",
  keystrokes:"Touches", keystrokesDesc:"Affiche les touches que vous appuyez en temps reel.",
  muteChat:"Muet Chat", muteChatDesc:"Empeche les messages des autres joueurs d'apparaitre dans le chat.",
  chatFilter:"Filtre de Chat", chatFilterDesc:"Bloque les gros mots et le spam du chat.",
  antiAfk:"Anti-Afk", antiAfkDesc:"Appuie sur WASD automatiquement pour eviter d'etre expulse pour inactivite",
  keepSprint:"Garder Sprint", keepSprintDesc:"Vous fait sprinter automatiquement.",
  timeDisplay:"Affichage Heure", timeDisplayDesc:"Affiche l'heure pour ne pas avoir a quitter le plein ecran.",
  armorHud:"HUD Armure", armorHudDesc:"Affiche les pourcentages de durabilite et les enchantements de l'armure.",
  closeUI:"Fermer UI", turnedOn:"a ete active", turnedOff:"a ete desactive", tooltipBind:"clic droit pour lier"
},
  nl: {
  languageName:"Dutch", title:"UnverifiedV2",
  autoFullscreen:"Auto Volledig Scherm", autoFullscreenDesc:"Schakelt automatisch volledig scherm in/uit",
  keystrokes:"Toetsen", keystrokesDesc:"Toont de toetsen die je in realtime indrukt.",
  muteChat:"Chat Dempen", muteChatDesc:"Voorkomt dat berichten van andere spelers in de chat verschijnen.",
  chatFilter:"Chatfilter", chatFilterDesc:"Blokkeert scheldwoorden en spam uit de chat.",
  antiAfk:"Anti-Afk", antiAfkDesc:"Drukt automatisch op WASD om te voorkomen dat je wordt gekickt wegens afwezigheid",
  keepSprint:"Blijf Sprinten", keepSprintDesc:"Laat je automatisch blijven sprinten.",
  timeDisplay:"Tijdweergave", timeDisplayDesc:"Toont de tijd zodat je niet uit volledig scherm hoeft te gaan.",
  armorHud:"Wapenrusting HUD", armorHudDesc:"Toont duurzaamheidspercentages en betoveringen van je wapenrusting.",
  closeUI:"UI Sluiten", turnedOn:"werd ingeschakeld", turnedOff:"werd uitgeschakeld", tooltipBind:"rechtsklik om te binden"
},
  ru: {
  languageName:"Russian", title:"UnverifiedV2",
  autoFullscreen:"Avto Polnyy Ekran", autoFullscreenDesc:"Avtomaticheski pereklyuchaet polnyy ekran",
  keystrokes:"Klavishi", keystrokesDesc:"Pokazyvaet klavishi, kotorye vy nazhimayete v realnom vremeni.",
  muteChat:"Otklyuchit Chat", muteChatDesc:"Skryvaet soobshcheniya drugikh igrokov v chate.",
  chatFilter:"Filtr Chata", chatFilterDesc:"Blokiruyet mat i spam v chate.",
  antiAfk:"Anti-Afk", antiAfkDesc:"Avtomaticheski nazhimayet WASD, chtoby izbezhat kika za bezdeystviye",
  keepSprint:"Postoyannyy Sprint", keepSprintDesc:"Avtomaticheski podderzhivayet beg.",
  timeDisplay:"Otobrazheniye Vremeni", timeDisplayDesc:"Pokazyvayet vremya, chtoby ne vykhodit iz polnogo ekrana.",
  armorHud:"HUD Broni", armorHudDesc:"Pokazyvayet prochnost i charakteristiki brony v protsentakh.",
  closeUI:"Zakryt UI", turnedOn:"bylo vklyucheno", turnedOff:"bylo vyklyucheno", tooltipBind:"pravaya knopka mishi dlya privyazki"
},
};

  let currentLanguage = localStorage.getItem('unverified-language') || 'en';
  Object.keys(translations).forEach(langCode => {
    const option = document.createElement("option");
    option.value = langCode; option.textContent = translations[langCode].languageName;
    if (langCode === currentLanguage) option.selected = true;
    languageDropdown.appendChild(option);
  });
  languageDropdown.addEventListener("change", e => { currentLanguage = e.target.value; localStorage.setItem('unverified-language', currentLanguage); updateLanguage(); });

  const BAD_WORDS = [
  'fuck', 'fucking', 'fucker', 'fucked', 'fucks', 'motherfucker', 'motherfuckers',
  'shit', 'shitty', 'shitter', 'bullshit', 'shithead', 'shitfaced',
  'bitch', 'bitches', 'bitching', 'bitchy',
  'asshole', 'assholes', 'arse', 'arsehole', 'asses', 'ass',
  'damn', 'dammit', 'goddamn', 'goddamnit', 'damned',
  'crap', 'crappy', 'crapping', 'crapped',
  'bastard', 'bastards',
  'dick', 'dicks', 'dickhead', 'dickheads',
  'cock', 'cocks', 'cocksucker', 'cocksuckers',
  'pussy', 'pussies', 'penis', 'pen1s',
  'piss', 'pissed', 'pissing', 'pissoff',
  'cunt', 'cunts',
  'twat', 'twats',
  'wanker', 'wankers', 'wank', 'wanked', 'wankoff',
  'bollocks', 'bollock',
  'prick', 'pricks',
  'douche', 'douchebag', 'douchebags',
  'slut', 'sluts', 'whore', 'whores',
  'fag', 'faggot', 'fags', 'faggots',
  'dyke', 'dykes',
  'nigger', 'niggers', 'nigga', 'niggas', 'nigg', 'n1gga', 'n1gger',
  'retard', 'retarded', 'retards',
  'nazi', 'nazis',
  'kike', 'kikes',
  'chink', 'chinks',
  'spic', 'spics',
  'wetback', 'wetbacks',
  'tranny', 'trannies',
  'gook', 'gooks',
  'beaner', 'beaners',
  'paki', 'pakis',
  'towelhead', 'towelheads',
  'coon', 'coons', 'goon', 'gooner', 'goons', 'cum', 'cums',
  'gypsy', 'gypsies', 'slapper',
  'porn', 'porno', 'pornography', 'pornhub',
  'rape', 'raping', 'raped', 'rapist', 'rapists',
  'hentai',
  'fuk', 'fck', 'fuc', 'fucc', 'phuck', 'fvck', 'fxck',
  'sht', 'shyt', 'sh1t',
  'btch', 'b1tch', 'biatch',
  'azz', 'a$$', 'a55', 'crack',
  'dck', 'd1ck',
  'cnt', 'c*nt',
  'kys', 'killyourself', 'kms'
];

const CHAT_FILTER_CONFIG = {
  blockBadWords: true,
  blockSpam: true,
};

function chatFilterStripSeparators(text) {
  return text.replace(/[\s\.\-\_\*\|\~\+\=]/g, '');
}

function chatFilterContainsBadWords(text) {
  const cleanText = text.replace(/\\#[0-9A-Fa-f]{6}\\/g, '')
    .replace(/\\reset\\/g, '')
    .replace(/\\glow\\/g, '')
    .toLowerCase();

  const strippedText = chatFilterStripSeparators(cleanText);

  for (let word of BAD_WORDS) {
    const wordLower = word.toLowerCase();
    const escapedWord = wordLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(^|[^a-z])' + escapedWord + '($|[^a-z])', 'i');

    if (regex.test(cleanText)) {
      return true;
    }

    if (regex.test(strippedText)) {
      return true;
    }
  }

  return false;
}

const MODULE_NAMES = { AUTO_FULLSCREEN: "Auto Fullscreen", KEYSTROKES: "Keystrokes", MUTE_CHAT: "Mute Chat",
  CHAT_FILTER: "Chat Filter", ANTI_AFK: "Anti-Afk", KEEP_SPRINT: "Keep Sprint", TIME_DISPLAY: "Time Display",
  ARMOR_HUD: "Armor HUD" };

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
    "position:relative;user-select:none;width:100%;box-sizing:border-box;flex-shrink:0;",
    "overflow:hidden;"
  ].join("");
  moduleContainer.classList.add('module-container');
  moduleContainer.dataset.moduleName = name;
  moduleContainer._uv2Active = false;

    const shine = document.createElement("div");
  shine.style.cssText = [
    "position:absolute;top:0;left:-100%;width:60%;height:100%;",
    "background:linear-gradient(120deg,transparent 0%,rgba(255,255,255,0.13) 45%,rgba(255,255,255,0.22) 50%,rgba(255,255,255,0.13) 55%,transparent 100%);",
    "transform:skewX(-15deg);pointer-events:none;"
  ].join("");
  moduleContainer.appendChild(shine);

    let shineAnim = null;
  function runShineLoop() {
    shine.style.transition = "none";
    shine.style.left = "-100%";
    void shine.offsetWidth;
        shine.style.transition = "left 8s cubic-bezier(0.4,0,0.2,1)";
    shine.style.left = "160%";
    shineAnim = setTimeout(runShineLoop, 9800);
  }

  moduleContainer.addEventListener("mouseenter", () => {
    runShineLoop();
    if (!moduleContainer._uv2Active) moduleContainer.style.background = "linear-gradient(135deg,#2c2c2c,#222222)";
  });
  moduleContainer.addEventListener("mouseleave", () => {
    clearTimeout(shineAnim);
    shineAnim = null;
    shine.style.transition = "none";
    shine.style.left = "-100%";
    if (!moduleContainer._uv2Active) moduleContainer.style.background = "linear-gradient(135deg,#242424,#1c1c1c)";
  });

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
      } else {
        moduleContainer.style.border = "1px solid rgba(255,255,255,0.07)";
        moduleContainer.style.background = "linear-gradient(135deg,#242424,#1c1c1c)";
        moduleContainer.style.boxShadow = "0 1px 4px rgba(0,0,0,0.4)";
        toggleWrap.style.background = "#252525"; toggleWrap.style.borderColor = "rgba(255,255,255,0.07)";
        toggleKnob.style.background = "#4a4a4a"; toggleKnob.style.transform = "translateX(0)";
        if (!isRestoring) showNotification(`${name} was turned off`, false);
      }
    }
  });
  moduleContainer.addEventListener("contextmenu", event => { event.preventDefault(); showBindPopup(moduleContainer, name); });
  return moduleContainer;
}

function updateLanguage() {
  title.textContent = translations[currentLanguage]?.title || "UnverifiedV2";
  closeButton.textContent = translations[currentLanguage]?.closeUI || "Close UI";
  moduleSearchInput.placeholder = currentLanguage === "en" ? "Search modules..." :
    currentLanguage === "es" ? "Buscar módulos..." :
    currentLanguage === "fr" ? "Rechercher des modules..." :
    currentLanguage === "nl" ? "Modules zoeken..." :
    currentLanguage === "ru" ? "Poisk moduley..." :
    "Search modules...";
  const modules = gridContainer.children;
  const moduleKeys = ['autoFullscreen','keystrokes','muteChat','chatFilter','antiAfk','keepSprint','timeDisplay','armorHud'];
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

let isMuteChatActive = false;
let isChatFilterActive = false;
let chatFilterOriginalSubmit = null;
let chatOriginalAddChat = null;
let chatFilterMessageCache = [];
const CHAT_FILTER_SPAM_THRESHOLD = 3;
const CHAT_FILTER_SPAM_WINDOW = 10000;

function chatFilterIsSpam(text) {
  const now = Date.now();
  chatFilterMessageCache = chatFilterMessageCache.filter(m => now - m.time < CHAT_FILTER_SPAM_WINDOW);
  const similarMessages = chatFilterMessageCache.filter(m => m.text === text);
  if (similarMessages.length >= CHAT_FILTER_SPAM_THRESHOLD - 1) {
    return true;
  }
  chatFilterMessageCache.push({ text, time: now });
  return false;
}

function chatFilterGetBlockReason(text) {
  if (CHAT_FILTER_CONFIG.blockBadWords && chatFilterContainsBadWords(text)) {
    return 'profanity';
  }
  if (CHAT_FILTER_CONFIG.blockSpam && chatFilterIsSpam(text)) {
    return 'spam';
  }
  return null;
}

function chatFilterShowBlockedNotice(reason) {
  try {
    const reactRoot = document.querySelector("#react");
    if (!reactRoot) return;
    const fiber = Object.values(reactRoot)[0];
    const game = fiber?.updateQueue?.baseState?.element?.props?.game;
    if (game && game.chat && typeof game.chat.addChat === "function") {
      const message = reason === 'spam' ? "Please do not spam." : "Message included Profanity.";
      game.chat.addChat({ text: `\\#FF0000\\${message}\\reset\\` });
    }
  } catch(e) {}
}

function getGameChat() {
  const reactRoot = document.querySelector("#react");
  if (!reactRoot) return null;
  const fiber = Object.values(reactRoot)[0];
  const game = fiber?.updateQueue?.baseState?.element?.props?.game;
  if (!game || !game.chat) return null;
  return game.chat;
}

function ensureChatAddChatPatched() {
  const chat = getGameChat();
  if (!chat) return;
  if (chatOriginalAddChat) return;
  chatOriginalAddChat = chat.addChat.bind(chat);
  chat.addChat = function(chatObj) {
    if (isMuteChatActive) return;
    if (!chatObj || typeof chatObj.text !== 'string') {
      return chatOriginalAddChat(chatObj);
    }
    if (chatObj.text.includes('Please do not spam.') || chatObj.text.includes('Message included Profanity.')) {
      return chatOriginalAddChat(chatObj);
    }
    if (isChatFilterActive) {
      const reason = chatFilterGetBlockReason(chatObj.text);
      if (reason) return;
    }
    return chatOriginalAddChat(chatObj);
  };
}

function restoreChatAddChatIfUnused() {
  if (isMuteChatActive || isChatFilterActive) return;
  const chat = getGameChat();
  if (chat && chatOriginalAddChat) {
    chat.addChat = chatOriginalAddChat;
    chatOriginalAddChat = null;
  }
}

const muteChatModule = createModule(MODULE_NAMES.MUTE_CHAT, "Prevents other players messages from appearing in chat.");
muteChatModule.addEventListener("click", () => {
  isMuteChatActive = !isMuteChatActive;
  if (isMuteChatActive) {
    ensureChatAddChatPatched();
  } else {
    restoreChatAddChatIfUnused();
  }
});

const chatFilterModule = createModule(MODULE_NAMES.CHAT_FILTER, "Blocks swear words and spam from appearing in chat.");
chatFilterModule.addEventListener("click", () => {
  isChatFilterActive = !isChatFilterActive;
  const chat = getGameChat();
  if (!chat) return;
  if (isChatFilterActive) {
    ensureChatAddChatPatched();
    if (!chatFilterOriginalSubmit) chatFilterOriginalSubmit = chat.submit.bind(chat);
    chat.submit = function(...args) {
      const text = chat.inputValue;
      if (text) {
        const reason = chatFilterGetBlockReason(text);
        if (reason) {
          chat.setInputValue('');
          chatFilterShowBlockedNotice(reason);
          return;
        }
      }
      return chatFilterOriginalSubmit(...args);
    };
  } else {
    if (chatFilterOriginalSubmit) chat.submit = chatFilterOriginalSubmit;
    restoreChatAddChatIfUnused();
  }
});

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
const ARMOR_SLOT_LABELS = ['Helmet', 'Chestplate', 'Leggings', 'Boots'];
const ARMOR_ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
const ARMOR_SPRITESHEET_URL = 'https://miniblox.io/textures/spritesheet.36511680aea3.png';
const ARMOR_SPRITESHEET_SIZE = 1024;
const ARMOR_ICON_TILE_SIZE = 16;
const ARMOR_ICON_DISPLAY_SIZE = 24;

const ARMOR_ENCHANT_ABBR = {
  protection: 'Prot',
  fire_protection: 'Fire Prot',
  feather_falling: 'Feath Fall',
  blast_protection: 'Blast Prot',
  projectile_protection: 'Proj Prot',
  respiration: 'Resp',
  aqua_affinity: 'Aqua Aff',
  thorns: 'Thorns',
  depth_strider: 'Depth Str',
  soul_speed: 'Soul Speed',
  swift_sneak: 'Swift Sneak',
  sharpness: 'Sharp',
  smite: 'Smite',
  bane_of_arthropods: 'Bane',
  knockback: 'KB',
  fire_aspect: 'Fire Asp',
  looting: 'Loot',
  efficiency: 'Eff',
  silk_touch: 'Silk Touch',
  unbreaking: 'Unb',
  fortune: 'Fort',
  power: 'Power',
  punch: 'Punch',
  flame: 'Flame',
  infinity: 'Inf',
  luck_of_the_sea: 'Luck',
  lure: 'Lure',
  mending: 'Mend',
  density: 'Dens',
  breach: 'Breach',
  wind_burst: 'Wind Burst',
  lunge: 'Lunge'
};

function armorHudColorForPercent(percent) {
  if (percent >= 60) return '#2ecc71';
  if (percent >= 30) return '#f39c12';
  return '#e74c3c';
}

function armorHudFormatEnchantName(rawName) {
  return rawName
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function armorHudGetEnchantLabels(slot) {
  const list = slot.data?.ench;
  if (!list || !list.length || !unsafeWindow.Enchantment) return [];

  return list.map(e => {
    const def = unsafeWindow.Enchantment.getEnchantmentById(e.id);
    const rawName = def?.name;
    const fullName = rawName ? armorHudFormatEnchantName(rawName) : `Enchant ${e.id}`;
    const shortName = rawName && ARMOR_ENCHANT_ABBR[rawName] ? ARMOR_ENCHANT_ABBR[rawName] : fullName;
    const roman = ARMOR_ROMAN[e.lvl] || e.lvl;
    return {
      short: `${shortName} ${roman}`,
      full: `${fullName} ${roman}`
    };
  });
}

function armorHudGetIconStyle(itemName) {
  const spriteMap = unsafeWindow.spriteMap;
  if (!spriteMap || !spriteMap.get) return '';

  const sprite = spriteMap.get(itemName);
  if (!sprite) return '';

  const pixelX = sprite.x * sprite.size;
  const pixelY = sprite.y * sprite.size;

  const scale = ARMOR_ICON_DISPLAY_SIZE / ARMOR_ICON_TILE_SIZE;
  const bgWidth = ARMOR_SPRITESHEET_SIZE * scale;
  const bgHeight = ARMOR_SPRITESHEET_SIZE * scale;
  const posX = -pixelX * scale;
  const posY = -pixelY * scale;

  return `width:${ARMOR_ICON_DISPLAY_SIZE}px;height:${ARMOR_ICON_DISPLAY_SIZE}px;background-image:url('${ARMOR_SPRITESHEET_URL}');background-position:${posX}px ${posY}px;background-size:${bgWidth}px ${bgHeight}px;image-rendering:pixelated;flex-shrink:0;`;
}

createModule(MODULE_NAMES.ARMOR_HUD, "Shows armor durability percentages, enchantments and icons.");
const armorHudModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ARMOR_HUD);
let isArmorHudActive = false;
let armorHudEl = null;
let armorHudInterval = null;
let armorHudDrag = false;
let armorHudOffX = 0;
let armorHudOffY = 0;

function armorHudClampToViewport() {
  if (!armorHudEl) return;
  const rect = armorHudEl.getBoundingClientRect();
  let left = rect.left;
  let top = rect.top;

  const maxLeft = window.innerWidth - rect.width;
  const maxTop = window.innerHeight - rect.height;

  if (left < 0) left = 0;
  if (top < 0) top = 0;
  if (left > maxLeft) left = maxLeft;
  if (top > maxTop) top = maxTop;

  armorHudEl.style.left = left + 'px';
  armorHudEl.style.top = top + 'px';
  armorHudEl.style.right = 'auto';
}

function armorHudRender() {
  if (!armorHudEl) return;

  if (!isInMatch()) {
    armorHudEl.style.display = 'none';
    return;
  }

  const reactRoot = document.querySelector("#react");
  const fiber = reactRoot ? Object.values(reactRoot)[0] : null;
  const game = fiber?.updateQueue?.baseState?.element?.props?.game;
  const armor = game?.player?.inventory?.armor;

  if (!armor) {
    armorHudEl.style.display = 'none';
    return;
  }

  armorHudEl.style.display = 'block';

  let html = `<div style="font-weight:600;margin-bottom:8px;letter-spacing:0.5px;color:${guiPrimaryColor};">Armor HUD</div>`;

  for (let i = 0; i < 4; i++) {
    const slot = armor[i];
    const label = ARMOR_SLOT_LABELS[i];

    if (!slot) {
      html += `<div style="display:flex;align-items:center;gap:10px;opacity:0.4;padding:4px 0;"><div style="width:${ARMOR_ICON_DISPLAY_SIZE}px;height:${ARMOR_ICON_DISPLAY_SIZE}px;flex-shrink:0;"></div><span style="flex:1;">${label}</span><span>empty</span></div>`;
      continue;
    }

    const damage = slot.itemDamage || 0;
    const max = slot.item?.maxDurability;
    const percent = max ? Math.round((1 - damage / max) * 100) : 100;
    const color = armorHudColorForPercent(percent);
    const name = slot.item?.displayName || label;
    const enchants = armorHudGetEnchantLabels(slot);
    const iconStyle = armorHudGetIconStyle(slot.item?.name);

    html += `<div style="display:flex;align-items:center;gap:10px;padding:4px 0;">`;
    html += `<div style="${iconStyle}"></div>`;
    html += `<div style="flex:1;min-width:0;">`;
    html += `<div style="display:flex;justify-content:space-between;gap:12px;"><span>${name}</span><span style="color:${color};font-weight:600;">${percent}%</span></div>`;

    if (enchants.length) {
      const spans = enchants
        .map(e => `<span title="${e.full}" style="cursor:default;">${e.short}</span>`)
        .join(', ');
      html += `<div style="opacity:0.7;font-size:11px;">${spans}</div>`;
    }

    html += `</div></div>`;
  }

  armorHudEl.innerHTML = html;
  armorHudClampToViewport();
}

if (armorHudModule) {
  armorHudModule.addEventListener("click", () => {
    isArmorHudActive = !isArmorHudActive;
    if (isArmorHudActive) {
      armorHudEl = document.createElement('div');
      armorHudEl.id = 'armor-hud';
      armorHudEl.style.cssText = 'position:fixed;top:100px;right:20px;padding:10px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:9999;cursor:move;user-select:none;font-family:Segoe UI,Roboto,sans-serif;font-size:14px;color:white;min-width:220px;display:none;';
      document.body.appendChild(armorHudEl);

      armorHudEl.addEventListener('mousedown', e => {
        armorHudDrag = true;
        armorHudOffX = e.clientX - armorHudEl.getBoundingClientRect().left;
        armorHudOffY = e.clientY - armorHudEl.getBoundingClientRect().top;
        e.preventDefault();
      });

      document.addEventListener('mousemove', e => {
        if (!armorHudDrag || !armorHudEl) return;
        let left = e.clientX - armorHudOffX;
        let top = e.clientY - armorHudOffY;

        const rect = armorHudEl.getBoundingClientRect();
        const maxLeft = window.innerWidth - rect.width;
        const maxTop = window.innerHeight - rect.height;

        if (left < 0) left = 0;
        if (top < 0) top = 0;
        if (left > maxLeft) left = maxLeft;
        if (top > maxTop) top = maxTop;

        armorHudEl.style.left = left + 'px';
        armorHudEl.style.top = top + 'px';
        armorHudEl.style.right = 'auto';
      });

      document.addEventListener('mouseup', () => {
        armorHudDrag = false;
      });

      window.addEventListener('resize', armorHudClampToViewport);

      armorHudInterval = setInterval(armorHudRender, 500);
      armorHudRender();
    } else {
      if (armorHudInterval) clearInterval(armorHudInterval);
      if (armorHudEl) { armorHudEl.remove(); armorHudEl = null; }
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

  function checkIsVpn(callback) {
    try {
      GM_xmlhttpRequest({
        method: "GET",
        url: "http://ip-api.com/json/?fields=status,proxy,hosting,query",
        timeout: 5000,
        onload(r) {
          try {
            const data = JSON.parse(r.responseText);
            const flagged = data.status === "success" && (data.proxy === true || data.hosting === true);
            callback(flagged);
          } catch (e) { callback(false); }
        },
        onerror() { callback(false); },
        ontimeout() { callback(false); }
      });
    } catch (e) { callback(false); }
  }

  function showVpnGate(onContinue) {
    const existing = document.getElementById('uv2-vpn-gate');
    if (existing) existing.remove();

    if (document.pointerLockElement) {
      try { document.exitPointerLock(); } catch (e) {}
    }

    const overlay = document.createElement('div');
    overlay.id = 'uv2-vpn-gate';
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:100000;',
      'display:flex;align-items:center;justify-content:center;',
      'background:rgba(0,0,0,0.35);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);',
      'opacity:0;transition:opacity 0.2s ease;'
    ].join('');

    const box = document.createElement('div');
    box.style.cssText = [
      'background:#141414;border:1px solid rgba(255,255,255,0.08);border-radius:10px;',
      'padding:28px 32px;max-width:360px;width:90%;text-align:center;',
      'box-shadow:0 24px 60px rgba(0,0,0,0.7);font-family:MinibloxFont,sans-serif;color:#fff;'
    ].join('');

    const gateTitle = document.createElement('div');
    gateTitle.textContent = 'VPN Detected!';
    gateTitle.style.cssText = 'font-size:22px;color:#e74c3c;margin-bottom:10px;text-shadow:0 0 12px rgba(231,76,60,0.5);';
    box.appendChild(gateTitle);

    const desc = document.createElement('div');
    desc.textContent = "We detected that your connection is coming through a VPN or proxy.";
    desc.style.cssText = 'font-size:13px;color:#888;margin-bottom:22px;line-height:1.5;';
    box.appendChild(desc);

    const dontShowRow = document.createElement('label');
    dontShowRow.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:7px;margin-bottom:18px;cursor:pointer;user-select:none;font-size:12px;color:#888;';
    const dontShowCheckbox = document.createElement('input');
    dontShowCheckbox.type = 'checkbox';
    dontShowCheckbox.style.cssText = 'accent-color:#e74c3c;width:14px;height:14px;cursor:pointer;';
    const dontShowLabel = document.createElement('span');
    dontShowLabel.textContent = "Don't show this again";
    dontShowRow.appendChild(dontShowCheckbox);
    dontShowRow.appendChild(dontShowLabel);
    box.appendChild(dontShowRow);

    const btnRow = document.createElement('div');
    btnRow.style.cssText = 'display:flex;gap:10px;justify-content:center;';

    const ignoreBtn = document.createElement('button');
    ignoreBtn.textContent = 'Ignore';
    ignoreBtn.style.cssText = 'background:#7fff00;color:#111;border:none;border-radius:6px;padding:10px 18px;font-size:14px;font-weight:600;cursor:pointer;font-family:MinibloxFont,sans-serif;transition:transform 0.15s ease;';
    ignoreBtn.addEventListener('mouseenter', () => ignoreBtn.style.transform = 'scale(1.03)');
    ignoreBtn.addEventListener('mouseleave', () => ignoreBtn.style.transform = 'scale(1)');

    const notVpnBtn = document.createElement('button');
    notVpnBtn.textContent = "I'm not using a VPN";
    notVpnBtn.style.cssText = 'background:#2a2a2a;color:#fff;border:1px solid #444;border-radius:6px;padding:10px 18px;font-size:14px;cursor:pointer;font-family:MinibloxFont,sans-serif;transition:background 0.15s ease;';
    notVpnBtn.addEventListener('mouseenter', () => notVpnBtn.style.background = '#3a3a3a');
    notVpnBtn.addEventListener('mouseleave', () => notVpnBtn.style.background = '#2a2a2a');

    function dismiss() {
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 200);
    }

    function persistDontShowAgain() {
      if (!dontShowCheckbox.checked) return;
      settings.vpnWarning = false;
      localStorage.setItem('uv2-setting-vpnwarning', 'false');
      const toggle = document.querySelector('#uv2-toggle-vpnwarning');
      if (toggle) toggle.checked = false;
    }

    ignoreBtn.addEventListener('click', () => {
      vpnGateDismissed = true;
      persistDontShowAgain();
      dismiss();
      if (typeof onContinue === 'function') onContinue();
    });

    notVpnBtn.addEventListener('click', () => {
      window.open('https://discord.com/channels/1328755084066160831/1474909551810842715', '_blank');
      vpnGateDismissed = true;
      persistDontShowAgain();
      dismiss();
      if (typeof onContinue === 'function') onContinue();
    });

    btnRow.appendChild(ignoreBtn);
    btnRow.appendChild(notVpnBtn);
    box.appendChild(btnRow);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '1'; }, 10);
  }

  function openUI() {
    ui.style.display = "flex";
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
        uiAnimating = false;
        closeUITimeout = null;
      }, 180);
    } else {
      ui.classList.remove("uv2-animate-in", "uv2-animate-out");
      ui.style.display = "none";
      uiAnimating = false;
    }
  }
  function toggleUI() {
    if (uiAnimating) return;
    if (uiVisible) { closeUI(); uiVisible = false; }
    else if (vpnGateDismissed || !settings.vpnWarning) {
      openUI(); uiVisible = true;
    } else {
      checkIsVpn(isVpn => {
        if (isVpn) {
          showVpnGate(() => { openUI(); uiVisible = true; });
        } else {
          openUI(); uiVisible = true;
        }
      });
    }
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
    toast.textContent = 'Welcome back! Anti-AFK disabled.';
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
              if (reactProps.onKeyDown) {
                reactProps.onKeyDown({
                  key: 'Enter',
                  keyCode: 13,
                  which: 13,
                  bubbles: true,
                  target: { value: msg },
                  nativeEvent: { isComposing: false },
                  preventDefault: () => {}
                });
              }
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
  function isInMatch() {
    try {
      return /\/join\//.test(window.location.pathname);
    } catch (e) { return false; }
  }
  function onAfkTriggered() {
  if (afkTriggered) return;
  if (!isInMatch()) {
    afkTimer = setTimeout(onAfkTriggered, afkDelay * 1000);
    return;
  }
  afkTriggered = true;
  afkGraceUntil = Date.now() + 2000;
  showAfkToast();
  if (settings.afkChat) sendAfkChatMessage("I am Currently AFK, Be back shortly.");
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
