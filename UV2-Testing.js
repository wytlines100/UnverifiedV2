// ==UserScript==
// @name         UV2-Testing
// @namespace    http://tampermonkey.net/
// @version      5.0
// @description  Look at my license before you modify, I WILL DMCA you.
// @icon         https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/logo.jpg
// @downloadURL  https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/client.js
// @updateURL    https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/client.js
// @license      Proprietary License
// @author       wyt, jet, joudaALT, Trust, TheM1ddleM1n
// @match        https://miniblox.io/*
// @grant        GM_xmlhttpRequest
// @grant        GM_info
// @grant        unsafeWindow
// @connect      raw.githubusercontent.com
// @connect      ip-api.com
// @connect      firebaseio.com
// @connect      firebasedatabase.app
// ==/UserScript==

document.title = GM_info.script.name;
let introFinished = false;
function playIntro() {
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;top:0;left:0;width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;flex-direction:column;background-color:black;overflow:hidden;z-index:9999;opacity:0;transition:opacity 0.6s ease;font-family:MinibloxFont,sans-serif;cursor:pointer;user-select:none;";
  const check = document.createElement("div");
  check.textContent = "✓";
  check.style.cssText = "color:red;font-size:5rem;opacity:0.05;transition:opacity 1.4s ease,transform 1.4s ease;text-shadow:0 0 5px red,0 0 10px red,0 0 20px red;";
  const circle = document.createElement("div");
  circle.style.cssText = "width:100px;height:100px;background-color:black;border:2px solid red;border-radius:50%;box-shadow:0 0 10px red,0 0 20px red,0 0 30px red;display:flex;align-items:center;justify-content:center;opacity:0;transform:scale(0.85);transition:opacity 1.4s ease,transform 1.4s cubic-bezier(0.22,1,0.36,1);";
  circle.appendChild(check);
  container.appendChild(circle);
  const unverifiedText = document.createElement("div");
  unverifiedText.textContent = "Unverified V2";
  unverifiedText.style.cssText = "color:red;font-size:60px;opacity:0;margin-top:50px;transition:opacity 1.1s ease;text-shadow:0 0 5px red,0 0 10px red,0 0 20px red;";
  container.appendChild(unverifiedText);
  const creditsText = document.createElement("div");
  creditsText.textContent = "By wyt, TheM1ddleM1n, joudaALT, Trust and jet";
  creditsText.style.cssText = "color:red;font-size:24px;opacity:0;margin-top:18px;transition:opacity 1.1s ease;text-align:center;max-width:80vw;text-shadow:0 0 5px red,0 0 10px red,0 0 20px red;";
  container.appendChild(creditsText);
  const keybindText = document.createElement("div");
  const introKeybindMap = { backtick: '`', backslash: '\\', rshift: 'Right Shift' };
  const introKeybind = localStorage.getItem('uv2-setting-uikeybind') || 'rshift';
  keybindText.textContent = `Press ${introKeybindMap[introKeybind] || 'Right Shift'} to open the menu`;
  keybindText.style.cssText = "color:red;font-size:30px;opacity:0;margin-top:30px;transition:opacity 1.1s ease;text-shadow:0 0 5px red,0 0 10px red,0 0 20px red;";
  container.appendChild(keybindText);
  const skipText = document.createElement("div");
  skipText.textContent = "Click or press Esc to skip";
  skipText.style.cssText = "position:absolute;bottom:28px;color:#ff000066;font-size:14px;letter-spacing:1px;opacity:0;transition:opacity 1.1s ease;";
  container.appendChild(skipText);
  document.body.appendChild(container);
  const timers = [];
  const later = (fn, ms) => timers.push(setTimeout(fn, ms));
  requestAnimationFrame(() => { container.style.opacity = 1; });
  later(() => {
    circle.style.opacity = 1;
    circle.style.transform = "scale(1)";
    check.style.opacity = 1;
  }, 200);
  later(() => { check.style.transform = "rotate(540deg)"; skipText.style.opacity = 1; }, 900);
  later(() => { unverifiedText.style.opacity = 1; }, 2400);
  later(() => { creditsText.style.opacity = 1; }, 3600);
  later(() => { keybindText.style.opacity = 1; }, 4800);
  later(() => {
    container.style.transition = "opacity 1.8s cubic-bezier(0.4,0,0.2,1)";
    container.style.opacity = 0;
  }, 10800);
  later(finish, 12600);
  function finish() {
    timers.forEach(clearTimeout);
    window.removeEventListener("keydown", onSkipKey, true);
    container.remove();
    introFinished = true;
  }
  function skip() {
    timers.forEach(clearTimeout);
    container.style.transition = "opacity 0.35s ease";
    container.style.opacity = 0;
    setTimeout(finish, 350);
  }
  function onSkipKey(e) { if (e.key === "Escape") skip(); }
  container.addEventListener("click", skip);
  window.addEventListener("keydown", onSkipKey, true);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', playIntro);
} else {
  playIntro();
}

function getHoliday() {
  const m = new Date().getMonth() + 1, d = new Date().getDate();
  if (m === 10 && d >= 30) return 'halloween';
  if (m === 12 && d >= 20 && d <= 26) return 'christmas';
  if (m === 12 && d === 31 || m === 1 && d === 1) return 'newyear';
  return null;
}
const holiday = getHoliday();
const waitForGame = setInterval(() => {
  if (!/\/join\//.test(window.location.pathname)) return;
  const reactRoot = document.querySelector("#react");
  if (!reactRoot) return;
  const game = Object.values(reactRoot)[0]?.updateQueue?.baseState?.element?.props?.game;
  if (game && game.chat && typeof game.chat.addChat === "function") {
    clearInterval(waitForGame);
    const joinKey = 'uv2-welcomed-' + window.location.pathname;
    if (!sessionStorage.getItem(joinKey)) {
      sessionStorage.setItem(joinKey, '1');
      const holidayMsg = {
        halloween: "\\glow\\\\shiny\\\\#BF3011\\[Unverified V2]:\\reset\\ Happy Halloween from the UV2 Dev Team 🎃",
        christmas: "\\glow\\\\shiny\\\\#BF3011\\[Unverified V2]:\\reset\\ Merry Christmas from the UV2 Dev Team ❄️",
        newyear: new Date().getMonth() === 0
          ? "\\glow\\\\shiny\\\\#BF3011\\[Unverified V2]:\\reset\\ Happy New Year from the UV2 Dev Team 🎉"
          : "\\glow\\\\shiny\\\\#BF3011\\[Unverified V2]:\\reset\\ Happy New Year's Eve from the UV2 Dev Team 🌃",
      };
      game.chat.addChat({
        text: holidayMsg[holiday] || "\\glow\\\\shiny\\\\#BF3011\\[Unverified V2]:\\reset\\ Hi UV2 User, we hope you enjoy our client."
      });
    }
  }
}, 500);

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
      } catch (e) { return null; }
    }
  };

  function pushLocalChat(textMsg) {
    const game = gameRef.game;
    if (game && game.chat && typeof game.chat.addChat === "function") {
      game.chat.addChat({ text: textMsg });
    }
  }

  async function handleInfoCommand(targetUser) {
    if (!targetUser) {
      pushLocalChat("\\red\\Error executing command: /info <username>");
      return;
    }
    try {
      const res = await fetch('https://miniblox.io/auth-api/accounts/stats/username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: targetUser })
      });
      if (!res.ok) {
        pushLocalChat(`\\red\\Error executing command: User ${targetUser} not found`);
        return;
      }
      const data = await res.json();
      if (data && data.profile) {
        const username = data.profile.username || targetUser;
        const rawRank = data.profile.rank ? data.profile.rank.trim().toLowerCase() : "";
        const rank = (!rawRank || rawRank === "player") ? "None" : rawRank;
        const level = data.profile.level !== undefined ? data.profile.level : "0";
        pushLocalChat(`Username: ${username}\nRank: ${rank}\nLevel: ${level}`);
      } else {
        pushLocalChat(`\\red\\Error executing command: User ${targetUser} not found`);
      }
    } catch (err) {
      pushLocalChat(`\\red\\Error executing command: User ${targetUser} not found`);
    }
  }

  function hookChatEngine() {
    const game = gameRef.game;
    if (!game || !game.chat) return false;
    const chat = game.chat;

    function isInfoCmd(inputStr) {
      if (typeof inputStr !== 'string') return false;
      const clean = inputStr.trim().replace(/^\//, '').trim();
      if (clean.toLowerCase() === 'info' || clean.toLowerCase().startsWith('info ')) {
        handleInfoCommand(clean.split(/\s+/)[1] || '');
        return true;
      }
      return false;
    }

    if (typeof chat.runCommand === 'function' && !chat.runCommand._isHooked) {
      const origRunCommand = chat.runCommand;
      chat.runCommand = function(cmdText, ...args) {
        if (isInfoCmd(cmdText)) return;
        return origRunCommand.apply(this, [cmdText, ...args]);
      };
      chat.runCommand._isHooked = true;
    }
    if (typeof chat.submit === 'function' && !chat.submit._isHooked) {
      const origSubmit = chat.submit;
      chat.submit = function(...args) {
        if (isInfoCmd(chat.inputValue)) {
          chat.setInputValue ? chat.setInputValue('') : (chat.inputValue = '');
          if (typeof chat.closeInput === 'function') chat.closeInput();
          return;
        }
        return origSubmit.apply(this, args);
      };
      chat.submit._isHooked = true;
    }
    return true;
  }

const initInterval = setInterval(() => {
    if (hookChatEngine()) clearInterval(initInterval);
  }, 500);
})();

(function() {
  'use strict';
const UV2_RAW_BASE = 'https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/';
const UV2_SCRIPT_URL = UV2_RAW_BASE + 'client.js';
const UV2_CHANGELOG_URL = UV2_RAW_BASE + 'CHANGELOG.md';
let uv2LastCheck = 0;

function uv2CompareVersions(a, b) {
  const pa = String(a).split('.').map(Number);
  const pb = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const d = (pa[i] || 0) - (pb[i] || 0);
    if (d !== 0) return d > 0 ? 1 : -1;
  }
  return 0;
}

function uv2ParseChangelog(text) {
  return text.split(/\n(?=## )/).reduce((entries, part) => {
    const m = part.match(/^## ([^\n]+)\n?([\s\S]*)$/);
    if (m) entries.push({ heading: m[1].trim(), notes: m[2].trim().split('\n').map(l => l.replace(/^-\s*/, '').trim()).filter(l => l) });
    return entries;
  }, []);
}

function uv2ShowPopup(opts) {
  const existing = document.getElementById('uv2-popup');
  if (existing) existing.remove();
  const wrap = document.createElement('div');
  wrap.id = 'uv2-popup';
  wrap.style.cssText = 'position:fixed;top:-300px;left:50%;transform:translateX(-50%);z-index:100002;pointer-events:none;transition:top 0.5s ease,opacity 0.5s ease;opacity:0;';

  const box = document.createElement('div');
  box.style.cssText = 'pointer-events:auto;background:#141414;border:1px solid rgba(231,76,60,0.5);border-radius:28px;padding:16px 24px;width:340px;max-width:90vw;font-family:MinibloxFont,sans-serif;color:#fff;box-shadow:0 12px 40px rgba(0,0,0,0.7);box-sizing:border-box;text-align:center;';

  const title = document.createElement('div');
  title.textContent = opts.title;
  title.style.cssText = 'font-size:16px;color:#e74c3c;text-shadow:0 0 12px rgba(231,76,60,0.5);';
  box.appendChild(title);

  const subtitle = document.createElement('div');
  subtitle.textContent = opts.subtitle;
  subtitle.style.cssText = 'font-size:11px;color:#666;margin:2px 0 10px;letter-spacing:0.5px;';
  box.appendChild(subtitle);

  if (opts.notes.length) {
    const list = document.createElement('div');
    list.style.cssText = 'display:flex;flex-direction:column;gap:6px;margin-bottom:12px;max-height:120px;overflow-y:auto;text-align:left;';
    opts.notes.forEach(line => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:flex-start;gap:8px;font-size:12px;color:#ccc;line-height:1.4;';
      const dot = document.createElement('div');
      dot.style.cssText = 'width:4px;height:4px;border-radius:50%;background:#e74c3c;margin-top:6px;flex-shrink:0;';
      const text = document.createElement('div');
      text.textContent = line;
      row.appendChild(dot);
      row.appendChild(text);
      list.appendChild(row);
    });
    box.appendChild(list);
  }

  function close() {
    wrap.style.top = '-300px';
    wrap.style.opacity = '0';
    setTimeout(() => wrap.remove(), 500);
  }

  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;';
  const primaryBtn = document.createElement('button');
  primaryBtn.textContent = opts.primaryLabel;
  primaryBtn.style.cssText = 'flex:1;background:#e74c3c;color:#fff;border:none;border-radius:16px;padding:8px 14px;cursor:pointer;font-family:MinibloxFont,sans-serif;font-size:12px;';
  primaryBtn.addEventListener('click', () => {
    if (opts.onPrimary) opts.onPrimary();
    close();
  });
  btnRow.appendChild(primaryBtn);

  if (opts.secondaryLabel) {
    const secondaryBtn = document.createElement('button');
    secondaryBtn.textContent = opts.secondaryLabel;
    secondaryBtn.style.cssText = 'flex:1;background:#2a2a2a;color:#fff;border:1px solid #444;border-radius:16px;padding:8px 14px;cursor:pointer;font-family:MinibloxFont,sans-serif;font-size:12px;';
    secondaryBtn.addEventListener('click', () => {
      if (opts.onSecondary) opts.onSecondary();
      close();
    });
    btnRow.appendChild(secondaryBtn);
  }

  box.appendChild(btnRow);
  wrap.appendChild(box);
  document.body.appendChild(wrap);
  setTimeout(() => { wrap.style.top = '18px'; wrap.style.opacity = '1'; }, 20);
}

function uv2Check() {
  const installed = GM_info.script.version;
  GM_xmlhttpRequest({
    method: 'GET',
    url: UV2_SCRIPT_URL + '?t=' + Date.now(),
    onload(r) {
      const m = r.responseText.match(/@version\s+([\d.]+)/);
      const latest = m ? m[1] : null;
      const hasUpdate = latest && uv2CompareVersions(latest, installed) > 0 && sessionStorage.getItem('uv2-update-dismissed') !== latest;
      const lastSeen = localStorage.getItem('uv2-whatsnew-version');
      const needsWhatsNew = lastSeen && uv2CompareVersions(installed, lastSeen) > 0;
      if (!hasUpdate && !needsWhatsNew) return;
      if (document.getElementById('uv2-popup')) return;
      GM_xmlhttpRequest({
        method: 'GET',
        url: UV2_CHANGELOG_URL + '?t=' + Date.now(),
        onload(c) {
          if (document.getElementById('uv2-popup')) return;
          const log = uv2ParseChangelog(c.responseText)[0];
          if (hasUpdate) {
            uv2ShowPopup({
              title: 'Update Available',
              subtitle: `v${installed} -> v${latest}`,
              notes: log ? log.notes : [],
              primaryLabel: 'Update Now',
              secondaryLabel: 'Remind Me Later',
              onPrimary: () => window.open(UV2_SCRIPT_URL, '_blank'),
              onSecondary: () => sessionStorage.setItem('uv2-update-dismissed', latest)
            });
          } else if (needsWhatsNew && log) {
            uv2ShowPopup({
              title: "What's New",
              subtitle: log.heading,
              notes: log.notes,
              primaryLabel: 'Dismiss',
              onPrimary: () => localStorage.setItem('uv2-whatsnew-version', installed)
            });
          }
        },
        onerror() {
          if (hasUpdate && !document.getElementById('uv2-popup')) {
            uv2ShowPopup({
              title: 'Update Available',
              subtitle: `v${installed} -> v${latest}`,
              notes: [],
              primaryLabel: 'Update Now',
              secondaryLabel: 'Remind Me Later',
              onPrimary: () => window.open(UV2_SCRIPT_URL, '_blank'),
              onSecondary: () => sessionStorage.setItem('uv2-update-dismissed', latest)
            });
          }
        }
      });
    }
  });
}

function uv2ThrottledCheck() {
  const now = Date.now();
  if (now - uv2LastCheck < 30000) return;
  uv2LastCheck = now;
  uv2Check();
}

setTimeout(uv2ThrottledCheck, 12800);
setInterval(uv2ThrottledCheck, 60000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) uv2ThrottledCheck();
});
  const style = document.createElement('style');
style.innerHTML = `
@keyframes uv2UIOpen {
  from { opacity: 0; transform: translateX(14px) scale(0.985); }
  to   { opacity: 1; transform: none; }
}
@keyframes uv2UIClose {
  from { opacity: 1; transform: none; }
  to   { opacity: 0; transform: translateX(14px) scale(0.985); }
}
#uv2-main-ui {
  will-change: opacity, transform;
}
#uv2-main-ui.uv2-animate-in {
  animation: uv2UIOpen 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
#uv2-main-ui.uv2-animate-out {
  animation: uv2UIClose 0.15s cubic-bezier(0.4, 0, 1, 1) forwards;
}
@keyframes uv2-card-shimmer {
  0%   { transform: translateX(-100%) skewX(-15deg); }
  100% { transform: translateX(300%) skewX(-15deg); }
}
.uv2-contrib-card:hover .uv2-card-shimmer {
  animation: uv2-card-shimmer 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes uv2-title-shine-loop {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}
.uv2-title-shine {
  background-image: linear-gradient(100deg, #e74c3c 0%, #e74c3c 40%, #ff8a80 50%, #e74c3c 60%, #e74c3c 100%);
  background-size: 250% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  animation: uv2-title-shine-loop 3.5s linear infinite;
  text-shadow: 0 0 18px rgba(231,76,60,0.55);
}
@keyframes uv2NotifEnter {
  from { transform: translateX(105%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
@keyframes uv2NotifExit {
  from { transform: translateX(0);    opacity: 1; }
  to   { transform: translateX(105%); opacity: 0; }
}
@keyframes notificationProgress {
  0%   { width: 100%; }
  100% { width: 0%; }
}
@keyframes afkPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}
@keyframes uv2ModuleShine {
  0%   { transform: translateX(-170%) skewX(-15deg); }
  100% { transform: translateX(270%) skewX(-15deg); }
}
.module-container .uv2-shine {
  position: absolute;
  top: 0; left: 0;
  width: 60%; height: 100%;
  background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.13) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.13) 55%, transparent 100%);
  transform: translateX(-170%) skewX(-15deg);
  pointer-events: none;
  will-change: transform;
}
.module-container:hover .uv2-shine {
  animation: uv2ModuleShine 2.9s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
.other-notification { font-family:'MinibloxFont',sans-serif; font-size:14px; color:white; background:linear-gradient(135deg,#1a1a1a,#111111); padding:12px 24px; border-radius:8px; margin-bottom:12px; box-shadow:0 4px 15px rgba(0,0,0,0.3); font-weight:500; letter-spacing:0.5px; position:relative; overflow:hidden; will-change:transform,opacity; animation:uv2NotifEnter 0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
.other-notification.uv2-notif-exit { animation:uv2NotifExit 0.3s cubic-bezier(0.4,0,1,1) forwards; }
.notification-progress { position:absolute; bottom:0; left:0; height:3px; background:#ffcc00; width:100%; animation:notificationProgress 4s linear forwards; }
#uv2-settings-panel { width:100% !important; height:100% !important; max-height:none !important; border-radius:0 !important; border:none !important; box-shadow:none !important; background:#000000 !important; display:flex; flex-direction:column; }
#uv2-settings-titlebar { background:#000000 !important; border-bottom:1px solid rgba(255,255,255,0.07) !important; display:flex; align-items:center; justify-content:space-between; padding:14px 18px; flex-shrink:0; }
#uv2-settings-titlebar span { font-size:15px; font-weight:600; display:flex; align-items:center; gap:8px; }
#uv2-settings-titlebar span svg { fill:#e74c3c; }
#uv2-settings-body { display:flex; flex:1; min-height:0; overflow:hidden; }
#uv2-settings-content { flex:1; min-height:0; overflow-y:auto; padding:16px 20px; }
.uv2-settings-page { display:block; }
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
.uv2-toggle-track::after { content:''; position:absolute; top:3px; left:3px; width:16px; height:16px; background:#fff; border-radius:50%; transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1); }
.uv2-toggle input:checked + .uv2-toggle-track { background:#e74c3c; }
.uv2-toggle input:checked + .uv2-toggle-track::after { transform:translateX(20px); }
@font-face { font-family:'MinibloxFont'; font-weight:400; src:url('https://fonts.gstatic.com/s/chakrapetch/v13/cIf6MapbsEk7TDLdtEz1BwkWn6pg.woff2') format('woff2'); font-display:swap; }
@font-face { font-family:'MinibloxFont'; font-weight:500; src:url('https://fonts.gstatic.com/s/chakrapetch/v13/cIflMapbsEk7TDLdtEz1BwkebIl1R5_F.woff2') format('woff2'); font-display:swap; }
@font-face { font-family:'MinibloxFont'; font-weight:600; src:url('https://fonts.gstatic.com/s/chakrapetch/v13/cIflMapbsEk7TDLdtEz1BwkeQI51R5_F.woff2') format('woff2'); font-display:swap; }
@font-face { font-family:'MinibloxFont'; font-weight:700; src:url('https://fonts.gstatic.com/s/chakrapetch/v13/cIflMapbsEk7TDLdtEz1BwkeJI91R5_F.woff2') format('woff2'); font-display:swap; }
:root { --uv2-accent:#e74c3c; --uv2-accent-rgb:231,76,60; --uv2-on-accent:#ffffff; --uv2-text:#ececf1; --uv2-muted:#8b909c; --uv2-line:rgba(255,255,255,0.07); --uv2-card:rgba(255,255,255,0.03); --uv2-card-hover:rgba(255,255,255,0.055); }
#uv2-main-ui { bottom:auto !important; flex-direction:column !important; background:rgba(9,9,11,0.95) !important; backdrop-filter:blur(18px) saturate(1.15); -webkit-backdrop-filter:blur(18px) saturate(1.15); border:1px solid rgba(255,255,255,0.08) !important; border-radius:18px !important; box-shadow:0 24px 70px rgba(0,0,0,0.65), 0 0 0 1px rgba(var(--uv2-accent-rgb),0.06) !important; color:var(--uv2-text) !important; font-family:MinibloxFont,sans-serif !important; font-size:13px; overflow:hidden !important; }
#uv2-main-ui *:not(.fa), #uv2-keybind-modal *:not(.fa), .other-notification, #uv2-toast { font-family:MinibloxFont,sans-serif !important; }
#uv2-main-ui ::-webkit-scrollbar { width:6px; height:6px; }
#uv2-main-ui ::-webkit-scrollbar-track { background:transparent; }
#uv2-main-ui ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.12); border-radius:6px; }
#uv2-main-ui ::-webkit-scrollbar-thumb:hover { background:rgba(var(--uv2-accent-rgb),0.6); }
#uv2-main-ui * { scrollbar-width:thin; scrollbar-color:rgba(255,255,255,0.12) transparent; }

#uv2-sidebar { width:100% !important; min-width:0 !important; flex-direction:column !important; border-right:none !important; border-radius:0 !important; background:transparent !important; flex-shrink:0 !important; overflow:visible !important; }
.uv2-brand { padding:14px 14px 12px 16px !important; border-bottom:none !important; display:flex !important; align-items:center !important; gap:12px !important; }
.uv2-brand img { width:36px !important; height:36px !important; border-radius:11px !important; box-shadow:0 4px 16px rgba(var(--uv2-accent-rgb),0.35) !important; }
.uv2-brand .uv2-title-shine { font-size:15px !important; font-weight:700 !important; letter-spacing:0.3px !important; text-shadow:none !important; }
.uv2-brand-sub { font-size:11.5px !important; color:var(--uv2-muted) !important; letter-spacing:0 !important; margin-top:1px !important; }
.uv2-close { margin-left:auto; width:30px; height:30px; border-radius:9px; display:flex; align-items:center; justify-content:center; color:var(--uv2-muted); cursor:pointer; font-size:15px; transition:background 0.15s ease,color 0.15s ease; flex-shrink:0; }
.uv2-close:hover { background:rgba(255,255,255,0.07); color:#fff; }
.uv2-nav { flex-direction:row !important; flex:none !important; gap:2px; padding:0 10px 10px !important; border-bottom:1px solid var(--uv2-line); overflow-x:auto; scrollbar-width:none; }
.uv2-nav::-webkit-scrollbar { display:none; }
.uv2-nav > [data-page] { position:relative; flex:1 1 0; min-width:62px; flex-direction:column !important; justify-content:center; gap:4px !important; padding:8px 4px 7px !important; border-left:none !important; border-radius:10px !important; font-size:11px !important; font-weight:600; color:var(--uv2-muted) !important; background:transparent !important; text-align:center; }
.uv2-nav > [data-page] i { font-size:16px !important; width:auto !important; color:inherit !important; }
.uv2-nav > [data-page]:hover { background:rgba(255,255,255,0.05) !important; color:#fff !important; }
.uv2-nav > [data-page][data-active="1"] { background:rgba(var(--uv2-accent-rgb),0.14) !important; color:#fff !important; }
.uv2-nav > [data-page][data-active="1"] i { color:var(--uv2-accent) !important; }
.uv2-nav-badge { position:absolute; top:3px; right:6px; font-size:9px; font-weight:700; padding:0 5px; border-radius:999px; line-height:15px; background:var(--uv2-accent); color:var(--uv2-on-accent); }
.uv2-footer { display:flex !important; align-items:center; justify-content:space-between; gap:10px; padding:10px 16px !important; border-top:1px solid var(--uv2-line) !important; color:var(--uv2-muted) !important; font-size:11.5px !important; letter-spacing:0 !important; text-transform:none !important; text-align:left !important; flex-shrink:0; }
.uv2-footer kbd { font-family:inherit; font-size:11px; color:var(--uv2-text); background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:6px; padding:2px 7px; }

#uv2-page-main-content, #uv2-page-skies-content, #uv2-page-gui-content, #uv2-page-config-content, #uv2-page-changelog-content { padding:12px 16px 16px !important; }
#uv2-settings-panel, #uv2-settings-body { background:transparent !important; }
#uv2-settings-content { padding:12px 16px 16px !important; }
.uv2-page-header { padding:2px 2px 10px !important; margin-bottom:4px !important; border-bottom:none !important; }
.uv2-page-icon { display:none !important; }
.uv2-page-header { display:flex !important; align-items:center; gap:12px; }
.uv2-page-header > div:nth-child(2) { flex:1; min-width:0; }
.uv2-page-actions { display:flex; align-items:center; gap:10px; flex-shrink:0; }
.uv2-page-actions:empty { display:none; }
.uv2-page-title { font-size:16px !important; font-weight:700; letter-spacing:0.2px !important; }
.uv2-page-sub { font-size:11.5px !important; color:var(--uv2-muted) !important; }
.uv2-section-title { font-size:10.5px !important; font-weight:700; letter-spacing:0.09em !important; color:#787d89 !important; margin:16px 0 8px !important; padding-left:2px !important; }

#uv2-module-search { background:rgba(255,255,255,0.05) !important; border:1px solid var(--uv2-line) !important; border-radius:11px !important; padding:9px 12px 9px 34px !important; font-size:13px !important; color:var(--uv2-text) !important; }
#uv2-module-search:focus { border-color:rgba(var(--uv2-accent-rgb),0.6) !important; }
.uv2-cats { display:flex; flex-shrink:0; gap:6px; overflow-x:auto; overflow-y:hidden; padding:10px 0 4px; min-height:44px; box-sizing:border-box; scrollbar-width:none; }
.uv2-cats > * { flex-shrink:0; }
.uv2-cats::-webkit-scrollbar { display:none; }
.uv2-cat { flex:none; display:flex; align-items:center; gap:6px; padding:6px 11px; border-radius:999px; font-size:12px; font-weight:600; color:var(--uv2-muted); background:rgba(255,255,255,0.04); border:1px solid var(--uv2-line); cursor:pointer; user-select:none; transition:all 0.15s ease; }
.uv2-cat:hover { color:#fff; background:rgba(255,255,255,0.07); }
.uv2-cat.on { color:#fff; background:rgba(var(--uv2-accent-rgb),0.16); border-color:rgba(var(--uv2-accent-rgb),0.5); }
.uv2-cat.on i { color:var(--uv2-accent); }
.uv2-cat .n { font-size:10.5px; opacity:0.55; }

#uv2-main-ui .module-container { align-items:center !important; gap:12px; height:auto !important; min-height:58px; padding:11px 12px !important; border-radius:13px !important; background:var(--uv2-card) !important; border:1px solid var(--uv2-line) !important; box-shadow:none !important; transition:border-color 0.15s ease,background 0.15s ease !important; }
#uv2-main-ui .module-container:hover { background:var(--uv2-card-hover) !important; }
#uv2-main-ui .module-container.uv2-on { background:rgba(var(--uv2-accent-rgb),0.07) !important; border-color:rgba(var(--uv2-accent-rgb),0.42) !important; }
#uv2-main-ui .module-container.uv2-open { border-bottom-left-radius:0 !important; border-bottom-right-radius:0 !important; }
#uv2-main-ui .module-container .uv2-shine { display:none !important; }
.uv2-mod-fav { margin:0 !important; font-size:12px !important; }
.uv2-mod-text { flex:1; min-width:0; display:flex; flex-direction:column; gap:2px; }
.uv2-mod-name { min-width:0 !important; }
.uv2-mod-name span { color:#f3f3f6 !important; text-shadow:none !important; font-size:13.5px !important; font-weight:600; }
#uv2-main-ui .module-container.uv2-on .uv2-mod-name span { color:var(--uv2-accent) !important; }
.uv2-mod-div { display:none !important; }
.uv2-mod-desc { color:var(--uv2-muted) !important; font-size:11.5px !important; white-space:normal !important; display:-webkit-box !important; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; line-height:1.35; }
#uv2-main-ui .module-container > div[title="Settings"], #armor-hud-dock-btn { margin:0 !important; font-size:14px !important; }
#uv2-main-ui .uv2-keybind-pill { margin:0 !important; background:rgba(255,255,255,0.05) !important; border:1px solid var(--uv2-line) !important; padding:2px 8px !important; }
.uv2-keybind-pill-label { color:var(--uv2-text) !important; font-size:11px !important; }
.uv2-mod-toggle { width:38px !important; height:22px !important; border-radius:22px !important; background:rgba(255,255,255,0.14) !important; border:none !important; margin:0 !important; flex-shrink:0; }
.uv2-mod-knob { top:3px !important; left:3px !important; width:16px !important; height:16px !important; background:#fff !important; box-shadow:0 1px 4px rgba(0,0,0,0.4); }
#uv2-main-ui .module-container.uv2-on .uv2-mod-toggle { background:var(--uv2-accent) !important; }
#uv2-main-ui .module-container.uv2-on .uv2-mod-knob { background:var(--uv2-on-accent) !important; }
#uv2-main-ui .uv2-module-drawer { margin:-9px 0 0 !important; padding:4px 14px 8px !important; border-radius:0 0 13px 13px !important; background:rgba(255,255,255,0.02) !important; border:1px solid var(--uv2-line) !important; border-top:1px solid rgba(255,255,255,0.04) !important; }
#uv2-main-ui .uv2-fav-label { font-size:10.5px !important; font-weight:700; letter-spacing:0.09em !important; margin:6px 0 2px 2px !important; }

#uv2-main-ui .uv2-setting-row { height:auto !important; min-height:56px; gap:12px; padding:11px 12px !important; border-radius:13px !important; background:var(--uv2-card) !important; border:1px solid var(--uv2-line) !important; box-shadow:none !important; }
#uv2-main-ui .uv2-setting-row:hover { background:var(--uv2-card-hover) !important; }
#uv2-main-ui .uv2-setting-row > div:first-child { flex-direction:column !important; align-items:flex-start !important; gap:2px; }
.uv2-setting-label { min-width:0 !important; border-right:none !important; padding-right:0 !important; color:#f3f3f6 !important; font-size:13px !important; font-weight:600; white-space:normal !important; }
.uv2-setting-desc { padding-left:0 !important; color:var(--uv2-muted) !important; font-size:11.5px !important; white-space:normal !important; }
.uv2-toggle { width:38px !important; height:22px !important; }
.uv2-toggle-track { background:rgba(255,255,255,0.14) !important; }
.uv2-toggle-track::after { width:16px !important; height:16px !important; top:3px !important; left:3px !important; box-shadow:0 1px 4px rgba(0,0,0,0.4); }
.uv2-toggle input:checked + .uv2-toggle-track { background:var(--uv2-accent) !important; }
.uv2-toggle input:checked + .uv2-toggle-track::after { transform:translateX(16px) !important; background:var(--uv2-on-accent) !important; }
#uv2-main-ui .uv2-panel { padding:4px 14px !important; border-radius:13px !important; background:var(--uv2-card) !important; border:1px solid var(--uv2-line) !important; box-shadow:none !important; }

.uv2-btn { font-size:12px !important; font-weight:600 !important; padding:7px 12px !important; border-radius:9px !important; border:1px solid rgba(255,255,255,0.1) !important; background:rgba(255,255,255,0.06) !important; color:var(--uv2-text) !important; cursor:pointer; transition:filter 0.15s ease,background 0.15s ease; white-space:nowrap; letter-spacing:0.2px !important; }
.uv2-btn:hover { background:rgba(255,255,255,0.11) !important; }
.uv2-btn-primary { background:var(--uv2-accent) !important; color:var(--uv2-on-accent) !important; border-color:transparent !important; }
.uv2-btn-primary:hover { background:var(--uv2-accent) !important; filter:brightness(1.12); }
.uv2-btn-danger { background:rgba(231,76,60,0.14) !important; color:#ff8a80 !important; border-color:rgba(231,76,60,0.4) !important; }
.uv2-btn-danger:hover { background:rgba(231,76,60,0.24) !important; }
#uv2-main-ui input[type=text], #uv2-main-ui input[type=number], #uv2-main-ui textarea, #uv2-main-ui select { background:rgba(255,255,255,0.05) !important; border:1px solid rgba(255,255,255,0.1) !important; border-radius:9px !important; color:var(--uv2-text) !important; outline:none !important; }
#uv2-main-ui input[type=text]:focus, #uv2-main-ui input[type=number]:focus, #uv2-main-ui textarea:focus { border-color:rgba(var(--uv2-accent-rgb),0.6) !important; }
#uv2-main-ui select option { background:#141418; }
#uv2-main-ui input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:18px; background:transparent !important; cursor:pointer; margin:0; accent-color:auto !important; }
#uv2-main-ui input[type=range]::-webkit-slider-runnable-track { height:5px; border-radius:5px; background:linear-gradient(90deg, var(--uv2-accent) 0 var(--p, 0%), rgba(255,255,255,0.12) var(--p, 0%) 100%); }
#uv2-main-ui input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; margin-top:-5.5px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.5); transition:transform 0.15s ease; }
#uv2-main-ui input[type=range]:hover::-webkit-slider-thumb { transform:scale(1.1); }
#uv2-main-ui input[type=range]::-moz-range-track { height:5px; border-radius:5px; background:rgba(255,255,255,0.12); }
#uv2-main-ui input[type=range]::-moz-range-progress { height:5px; border-radius:5px; background:var(--uv2-accent); }
#uv2-main-ui input[type=range]::-moz-range-thumb { width:16px; height:16px; border:none; border-radius:50%; background:#fff; }
.uv2-x-value { color:var(--uv2-text) !important; font-variant-numeric:tabular-nums; }
.other-notification { background:rgba(14,14,18,0.95) !important; border:1px solid rgba(255,255,255,0.08); border-radius:11px !important; font-size:13px !important; }
#uv2-main-ui.uv2-layout-panel { top:16px !important; right:16px !important; left:auto !important; width:470px !important; max-width:calc(100vw - 32px) !important; height:calc(100vh - 32px) !important; max-height:880px !important; }
#uv2-main-ui.uv2-layout-window { top:50% !important; left:50% !important; right:auto !important; translate:-50% -50%; width:min(1060px, calc(100vw - 48px)) !important; max-width:none !important; height:min(760px, calc(100vh - 48px)) !important; max-height:none !important; border-radius:20px !important; }
#uv2-backdrop { position:fixed; inset:0; z-index:9998; background:rgba(0,0,0,0.42); backdrop-filter:blur(3px); -webkit-backdrop-filter:blur(3px); opacity:0; pointer-events:none; transition:opacity 0.2s ease; }
#uv2-backdrop.show { opacity:1; pointer-events:auto; }
#uv2-sidebar { position:relative; }
#uv2-sidebar > .uv2-close { position:absolute; top:16px; right:14px; z-index:2; }
.uv2-layout-panel .uv2-brand { padding-right:56px !important; }
.uv2-layout-window #uv2-sidebar { flex-direction:row !important; align-items:center !important; gap:14px; padding:0 64px 0 0; box-sizing:border-box !important; border-bottom:1px solid var(--uv2-line); }
.uv2-layout-window .uv2-brand { flex:none; padding:16px 8px 16px 20px !important; }
.uv2-layout-window .uv2-nav { flex:1; justify-content:center; gap:4px; padding:0 !important; border-bottom:none !important; }
.uv2-layout-window .uv2-nav > [data-page] { flex:none !important; min-width:0 !important; flex-direction:row !important; gap:8px !important; padding:9px 14px !important; font-size:12.5px !important; }
.uv2-layout-window .uv2-nav > [data-page] i { font-size:14px !important; }
.uv2-layout-window .uv2-nav-badge { position:static; margin-left:2px; }
.uv2-layout-window #uv2-sidebar > .uv2-close { top:50%; right:18px; transform:translateY(-50%); }
.uv2-layout-window #uv2-page-main-content, .uv2-layout-window #uv2-page-skies-content, .uv2-layout-window #uv2-page-gui-content, .uv2-layout-window #uv2-page-config-content, .uv2-layout-window #uv2-page-changelog-content, .uv2-layout-window #uv2-settings-content { padding:18px 24px 22px !important; }
.uv2-layout-window #uv2-module-grid { display:grid !important; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px 10px !important; align-items:start; }
.uv2-layout-window #uv2-module-grid > .uv2-folder, .uv2-layout-window #uv2-module-grid > .uv2-module-drawer { grid-column:1 / -1; }
.uv2-layout-window .uv2-module-drawer { margin:-4px 0 4px !important; border-radius:13px !important; border-top:1px solid var(--uv2-line) !important; }
.uv2-layout-window .module-container.uv2-open { border-bottom-left-radius:13px !important; border-bottom-right-radius:13px !important; }
.uv2-layout-window #uv2-settings-content, .uv2-layout-window #uv2-page-config-content, .uv2-layout-window #uv2-page-gui-content, .uv2-layout-window #uv2-page-changelog-content { padding-left:max(24px, calc((100% - 860px) / 2)) !important; padding-right:max(24px, calc((100% - 860px) / 2)) !important; }
.uv2-folder { display:flex; align-items:center; gap:9px; padding:8px 4px 6px; margin-top:6px; cursor:pointer; user-select:none; color:var(--uv2-muted); font-size:12px; font-weight:700; letter-spacing:0.06em; text-transform:uppercase; border-bottom:1px solid var(--uv2-line); }
.uv2-folder:first-child { margin-top:0; }
.uv2-folder:hover { color:#fff; }
.uv2-folder-chev { font-size:10px !important; width:10px; transition:transform 0.18s ease; }
.uv2-folder.collapsed .uv2-folder-chev { transform:rotate(-90deg); }
.uv2-folder-icon { font-size:13px !important; color:var(--uv2-accent); width:16px; text-align:center; }
.uv2-folder[data-folder="fav"] .uv2-folder-icon { color:#ffd700; }
.uv2-folder-name { flex:1; }
.uv2-folder-count { font-size:11px; font-weight:600; letter-spacing:0; text-transform:none; color:var(--uv2-muted); }
.uv2-folder-on { font-size:10px; font-weight:700; letter-spacing:0; text-transform:none; padding:1px 7px; border-radius:999px; background:rgba(var(--uv2-accent-rgb),0.16); color:var(--uv2-accent); }
.uv2-hud { position:fixed; left:0; top:0; z-index:9990; pointer-events:none; user-select:none; transform-origin:0 0; width:max-content; font-family:'MinibloxFont',sans-serif; color:var(--hud-fg,#fff); text-shadow:var(--hud-shadow,none); font-size:14px; font-weight:600; line-height:1.25; white-space:nowrap; letter-spacing:0.01em; font-variant-numeric:tabular-nums; }
.uv2-hud-box { background:var(--hud-bg); border:var(--hud-border); border-radius:var(--hud-radius); padding:4px 9px; }
.uv2-hud-nobg .uv2-hud-box { padding:2px 3px; }
.uv2-hud-l { opacity:0.62; font-weight:500; }
.uv2-hud.edit { pointer-events:auto; cursor:grab; z-index:99992; outline:1px dashed rgba(255,255,255,0.45); outline-offset:4px; }
.uv2-hud.edit:hover { outline:1px solid var(--uv2-accent); }
.uv2-hud.edit.drag { cursor:grabbing; outline:1px solid var(--uv2-accent); }
.uv2-hud.edit::before { content:attr(data-name); position:absolute; left:-4px; bottom:100%; margin-bottom:7px; font-size:10px; font-weight:700; letter-spacing:0.04em; padding:2px 7px; border-radius:5px; background:var(--uv2-accent); color:var(--uv2-on-accent); text-shadow:none; opacity:0; transition:opacity 0.12s ease; pointer-events:none; }
.uv2-hud.edit:hover::before, .uv2-hud.edit.drag::before { opacity:1; }
#uv2-hud-editor { position:fixed; inset:0; z-index:99990; background-color:rgba(0,0,0,0.3); background-image:linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px); background-size:40px 40px; }
.uv2-hud-guide { position:fixed; background:var(--uv2-accent); opacity:0; pointer-events:none; z-index:99991; transition:opacity 0.1s ease; }
.uv2-hud-guide.v { top:0; bottom:0; left:50%; width:1px; }
.uv2-hud-guide.h { left:0; right:0; top:50%; height:1px; }
.uv2-hud-guide.show { opacity:0.85; }
.uv2-hud-bar { position:fixed; bottom:22px; left:50%; translate:-50% 0; z-index:99995; display:flex; align-items:center; gap:12px; padding:7px 7px 7px 16px; background:rgba(16,16,18,0.94); border:1px solid rgba(255,255,255,0.08); border-radius:13px; font-family:'MinibloxFont',sans-serif; font-size:12.5px; color:#8b909c; box-shadow:0 12px 36px rgba(0,0,0,0.45); white-space:nowrap; }
.uv2-hud-bar b { color:#ececf1; font-weight:600; }
.uv2-hud-bar-ic { color:var(--uv2-accent); }
.uv2-hud-bar .uv2-btn { font-family:'MinibloxFont',sans-serif; font-size:12px; font-weight:600; padding:7px 14px; border-radius:9px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.05); color:#ececf1; cursor:pointer; }
.uv2-hud-bar .uv2-btn:hover { background:rgba(255,255,255,0.1); }
.uv2-hud-bar .uv2-btn-primary { background:var(--uv2-accent); border-color:transparent; color:var(--uv2-on-accent); }
.uv2-hud-bar .uv2-btn-primary:hover { background:var(--uv2-accent); filter:brightness(1.1); }
.uv2-ks { display:grid; grid-template-columns:repeat(3, var(--k)); gap:var(--g); }
.uv2-ks-k { height:var(--k); box-sizing:border-box; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1px; background:var(--hud-bg); border:var(--hud-border); border-radius:var(--hud-radius); font-size:calc(var(--k) * 0.36); font-weight:700; transition:background-color var(--fade) ease, color var(--fade) ease; }
.uv2-ks-k small { font-size:calc(var(--k) * 0.22); font-weight:600; opacity:0.7; }
.uv2-ks-k.on { background:var(--hud-press); color:var(--hud-press-fg); text-shadow:none; }
.uv2-ks-m { grid-column:1 / -1; display:grid; grid-template-columns:1fr 1fr; gap:var(--g); }
.uv2-ks-m .uv2-ks-k { font-size:calc(var(--k) * 0.3); }
.uv2-ks-sp { grid-column:1 / -1; height:calc(var(--k) * 0.62); }
.uv2-ks-sp i { display:block; width:34%; height:2px; border-radius:2px; background:currentColor; opacity:0.85; }
.uv2-ar { display:flex; flex-direction:column; gap:5px; }
.uv2-ar.h { flex-direction:row; gap:8px; align-items:flex-start; }
.uv2-ar-row { display:flex; align-items:center; gap:8px; }
.uv2-ar.h .uv2-ar-row { flex-direction:column; gap:3px; }
.uv2-ar-row.zero { opacity:0.45; }
.uv2-ar-ic { flex-shrink:0; image-rendering:pixelated; filter:drop-shadow(0 1px 1px rgba(0,0,0,0.6)); }
.uv2-ar-ic.none { box-sizing:border-box; border:1px dashed rgba(255,255,255,0.25); border-radius:4px; filter:none; }
.uv2-ar-t { display:flex; flex-direction:column; gap:3px; min-width:0; }
.uv2-ar-top { display:flex; align-items:baseline; gap:8px; }
.uv2-ar-name { font-size:12px; font-weight:500; opacity:0.85; }
.uv2-ar-d { font-size:13px; font-weight:700; }
.uv2-ar-bar { width:54px; height:3px; border-radius:2px; background:rgba(255,255,255,0.16); overflow:hidden; box-shadow:0 1px 1px rgba(0,0,0,0.35); }
.uv2-ar.h .uv2-ar-bar { width:calc(var(--ic) + 4px); }
.uv2-ar-bar i { display:block; height:100%; border-radius:2px; }
.uv2-ar-en { font-size:10px; font-weight:500; opacity:0.6; }
.uv2-ar-row.warn .uv2-ar-ic { animation:uv2ArWarn 0.9s ease-in-out infinite; }
@keyframes uv2ArWarn { 50% { filter:drop-shadow(0 0 5px #ff3b3b) brightness(1.5); } }
.uv2-po { display:flex; flex-direction:column; gap:4px; }
.uv2-po-r { display:flex; align-items:center; gap:8px; }
.uv2-po-dot { width:7px; height:7px; border-radius:50%; flex-shrink:0; box-shadow:0 0 6px currentColor; }
.uv2-po-n { flex:1; }
.uv2-po-t { opacity:0.62; font-weight:500; margin-left:10px; }
.uv2-po-r.blink .uv2-po-t { animation:uv2PoBlink 1s steps(2, start) infinite; }
@keyframes uv2PoBlink { to { visibility:hidden; } }
.uv2-cp { position:relative; width:var(--cw); height:28px; overflow:hidden; -webkit-mask-image:linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent); mask-image:linear-gradient(90deg, transparent, #000 16%, #000 84%, transparent); }
.uv2-cp-m { position:absolute; top:6px; transform:translateX(-50%); display:flex; flex-direction:column; align-items:center; gap:1px; font-size:11px; }
.uv2-cp-m i { width:1px; height:4px; background:currentColor; opacity:0.45; }
.uv2-cp-m.major i { height:6px; opacity:0.9; }
.uv2-cp-m b { font-weight:700; line-height:1; }
.uv2-cp-m.north b { color:var(--hud-accent); }
.uv2-cp-c { position:absolute; left:50%; top:0; transform:translateX(-50%); border-left:4px solid transparent; border-right:4px solid transparent; border-top:5px solid var(--hud-accent); }
.uv2-cp-deg { text-align:center; font-size:11px; font-weight:500; opacity:0.7; margin-top:1px; }
.uv2-st { display:flex; flex-direction:column; gap:2px; min-width:112px; }
.uv2-st-r { display:flex; justify-content:space-between; gap:14px; }
#uv2-lowhp { position:fixed; inset:0; pointer-events:none; z-index:9985; opacity:0; background:radial-gradient(ellipse at center, transparent 52%, rgba(190,0,0,0.38) 78%, rgba(150,0,0,0.75) 100%); }
.uv2-x-heading { font-size:10.5px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:var(--uv2-muted); padding:14px 0 4px; border-bottom:none !important; }
.uv2-folder-action { margin-left:4px; padding:3px 9px; border-radius:7px; font-size:10.5px; font-weight:700; letter-spacing:0.02em; text-transform:none; color:var(--uv2-text); background:rgba(255,255,255,0.06); border:1px solid var(--uv2-line); cursor:pointer; }
.uv2-folder-action:hover { background:rgba(var(--uv2-accent-rgb),0.18); color:var(--uv2-accent); }
#uv2-sheet { position:absolute; right:0; top:72px; bottom:34px; width:384px; max-width:100%; z-index:6; display:flex; flex-direction:column; background:#101012; border-left:1px solid var(--uv2-line); box-shadow:-20px 0 44px rgba(0,0,0,0.38); transform:translateX(104%); opacity:0; pointer-events:none; transition:transform 0.24s cubic-bezier(0.2,0.8,0.2,1), opacity 0.18s ease; font-family:'MinibloxFont',sans-serif; }
#uv2-sheet.open { transform:none; opacity:1; pointer-events:auto; }
.uv2-sheet-head { display:flex; align-items:center; gap:12px; padding:16px 14px 14px 20px; border-bottom:1px solid var(--uv2-line); }
.uv2-sheet-titles { flex:1; min-width:0; }
.uv2-sheet-name { font-size:15px; font-weight:700; color:#fff; letter-spacing:0.01em; }
.uv2-sheet-desc { font-size:11.5px; color:var(--uv2-muted); margin-top:3px; line-height:1.4; }
.uv2-sheet-switch { width:38px; height:22px; border-radius:999px; background:rgba(255,255,255,0.14); position:relative; cursor:pointer; flex-shrink:0; transition:background 0.15s ease; }
.uv2-sheet-switch span { position:absolute; top:3px; left:3px; width:16px; height:16px; border-radius:50%; background:#fff; box-shadow:0 1px 4px rgba(0,0,0,0.4); transition:transform 0.2s ease; }
.uv2-sheet-switch.on { background:var(--uv2-accent); }
.uv2-sheet-switch.on span { transform:translateX(16px); background:var(--uv2-on-accent); }
.uv2-sheet-close { width:30px; height:30px; border-radius:9px; display:flex; align-items:center; justify-content:center; color:var(--uv2-muted); cursor:pointer; flex-shrink:0; }
.uv2-sheet-close:hover { background:rgba(255,255,255,0.07); color:#fff; }
.uv2-sheet-body { flex:1; overflow-y:auto; padding:4px 20px 18px; display:flex; flex-direction:column; }
#uv2-main-ui #uv2-page-main-content { transition:padding-right 0.24s cubic-bezier(0.2,0.8,0.2,1); }
.uv2-layout-window.uv2-sheet-open #uv2-page-main-content { padding-right:408px !important; }
#uv2-main-ui .module-container.uv2-sheet-on { border-color:rgba(var(--uv2-accent-rgb),0.55) !important; box-shadow:0 0 0 1px rgba(var(--uv2-accent-rgb),0.25); }
#uv2-sidebar > .uv2-hudbtn { position:absolute; z-index:2; display:flex; align-items:center; gap:7px; padding:7px 12px; border-radius:9px; font-size:12px; font-weight:600; color:var(--uv2-text); background:rgba(255,255,255,0.05); border:1px solid var(--uv2-line); cursor:pointer; font-family:'MinibloxFont',sans-serif; transition:background 0.15s ease, color 0.15s ease; white-space:nowrap; }
#uv2-sidebar > .uv2-hudbtn:hover { background:rgba(var(--uv2-accent-rgb),0.16); color:var(--uv2-accent); border-color:rgba(var(--uv2-accent-rgb),0.35); }
#uv2-sidebar > .uv2-hudbtn i { font-size:12px; }
.uv2-layout-window #uv2-sidebar { padding-right:172px !important; }
.uv2-layout-window #uv2-sidebar > .uv2-hudbtn { top:50%; right:58px; transform:translateY(-50%); }
.uv2-layout-panel #uv2-sidebar > .uv2-hudbtn { top:17px; right:50px; padding:6px 10px; }
.uv2-hud-panel { position:fixed; top:16px; right:16px; bottom:84px; width:340px; z-index:99996; display:flex; flex-direction:column; background:rgba(16,16,18,0.97); border:1px solid rgba(255,255,255,0.08); border-radius:14px; box-shadow:0 18px 50px rgba(0,0,0,0.5); font-family:'MinibloxFont',sans-serif; color:#ececf1; overflow:hidden; cursor:default; }
.uv2-hud-panel-head { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:14px 12px 12px 16px; border-bottom:1px solid rgba(255,255,255,0.07); }
.uv2-hud-panel-name { font-size:14px; font-weight:700; }
.uv2-hud-panel-sub { font-size:11px; color:#8b909c; margin-top:2px; }
.uv2-hud-panel-x { width:28px; height:28px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#8b909c; cursor:pointer; }
.uv2-hud-panel-x:hover { background:rgba(255,255,255,0.07); color:#fff; }
.uv2-hud-panel-body { flex:1; overflow-y:auto; padding:2px 16px 14px; }
.uv2-hud-panel input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:18px; background:transparent; cursor:pointer; margin:0; }
.uv2-hud-panel input[type=range]::-webkit-slider-runnable-track { height:5px; border-radius:5px; background:linear-gradient(90deg, var(--uv2-accent) 0 var(--p, 0%), rgba(255,255,255,0.12) var(--p, 0%) 100%); }
.uv2-hud-panel input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; border-radius:50%; margin-top:-5.5px; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.5); }
.uv2-hud.edit.picked { outline:1px solid var(--uv2-accent); outline-offset:4px; }
.uv2-x-note { font-size:11.5px; line-height:1.45; color:var(--uv2-muted); padding:10px 0 4px; }
img.uv2-bdg { display:inline-block; width:1em; height:1em; vertical-align:-0.14em; margin-right:0.28em; filter:drop-shadow(0 0 2px rgba(0,0,0,0.55)); pointer-events:none; user-select:none; }
.uv2-tx { white-space:pre; }
.uv2-tx.uv2-fx { background-size:200% auto; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; animation:uv2Shine 3s linear infinite; }
.uv2-tx.uv2-fx.up { background-size:auto 200%; animation-name:uv2ShineUp; }
@keyframes uv2Shine { from { background-position:0% 50%; } to { background-position:-200% 50%; } }
@keyframes uv2ShineUp { from { background-position:50% 0%; } to { background-position:50% -200%; } }
.uv2-idprev { margin:12px 0 6px; padding:16px 14px; border-radius:11px; background:radial-gradient(120% 140% at 50% 0%, rgba(255,255,255,0.06), rgba(0,0,0,0.35)), #0b0b0d; border:1px solid rgba(255,255,255,0.06); display:flex; justify-content:center; font-family:'MinibloxFont',sans-serif; font-size:17px; font-weight:600; color:#fff; white-space:nowrap; overflow:hidden; text-shadow:1px 1px 0 rgba(0,0,0,0.6); }
.uv2-idprev-row { display:flex; align-items:center; }
#uv2-tab { position:fixed; top:44px; left:50%; z-index:9995; transform-origin:50% 0; pointer-events:none; user-select:none; min-width:300px; max-width:min(96vw, 1280px); padding:12px 14px 12px; border-radius:14px; background:var(--tab-bg, rgba(12,12,15,0.8)); border:1px solid rgba(255,255,255,0.08); box-shadow:0 14px 40px rgba(0,0,0,0.45); backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px); font-family:'MinibloxFont',sans-serif; color:#fff; }
.uv2-tab-head-row { display:flex; align-items:center; justify-content:center; gap:10px; padding:0 4px 10px; margin-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.07); font-size:15px; font-weight:700; white-space:nowrap; }
.uv2-tab-count { font-size:11px; font-weight:700; padding:2px 8px; border-radius:999px; background:rgba(var(--uv2-accent-rgb),0.18); color:var(--uv2-accent); }
.uv2-tab-grid { display:grid; column-gap:18px; row-gap:2px; }
.uv2-tab-row { display:flex; align-items:center; justify-content:space-between; gap:14px; padding:4px 8px; border-radius:8px; font-size:14px; font-weight:600; white-space:nowrap; min-width:250px; text-shadow:1px 1px 0 rgba(0,0,0,0.55); }
.uv2-tab-row:nth-child(odd) { background:rgba(255,255,255,0.025); }
.uv2-tab-row.me { background:rgba(var(--uv2-accent-rgb),0.16); box-shadow:inset 2px 0 0 var(--uv2-accent); }
.uv2-tab-name { display:flex; align-items:center; min-width:0; overflow:hidden; }
.uv2-tab-head { width:18px; height:18px; border-radius:4px; margin-right:8px; flex-shrink:0; image-rendering:pixelated; }
.uv2-tab-head.none { display:inline-block; background:rgba(255,255,255,0.1); }
.uv2-tab-ping { display:inline-flex; align-items:center; flex-shrink:0; }
.uv2-tab-ms { font-size:11px; font-weight:600; color:#8b909c; font-variant-numeric:tabular-nums; }
.uv2-tab-bars { display:inline-flex; align-items:flex-end; gap:2px; height:12px; margin-left:6px; }
.uv2-tab-bars i { display:block; width:3px; border-radius:1px; }
`;
document.head.appendChild(style);


function uv2PageHeader(icon, titleText, subText) {
  const header = document.createElement('div');
  header.className = 'uv2-page-header';
  const iconBox = document.createElement('div');
  iconBox.className = 'uv2-page-icon';
  iconBox.innerHTML = `<i class="fa ${icon}"></i>`;
  iconBox.style.background = `${guiPrimaryColor}1a`;
  iconBox.style.color = guiPrimaryColor;
  iconBox.style.border = `1px solid ${guiPrimaryColor}40`;
  const text = document.createElement('div');
  const t = document.createElement('div');
  t.className = 'uv2-page-title';
  t.textContent = titleText;
  const s = document.createElement('div');
  s.className = 'uv2-page-sub';
  s.textContent = subText;
  text.append(t, s);
  const actions = document.createElement('div');
  actions.className = 'uv2-page-actions';
  header.append(iconBox, text, actions);
  header._sub = s;
  header._actions = actions;
  return header;
}
  const ui = document.createElement("div");
  ui.id = "uv2-main-ui";
  ui.style.position = "fixed";
  ui.style.top = "16px";
  ui.style.right = "16px";
  ui.style.transform = "none";
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
  ui.style.height = "min(680px, 88vh)";
  ui.style.maxWidth = "92vw";
  ui.style.width = "960px";
  ui.style.borderTop = "2px solid rgba(231,76,60,0.8)";
  ui.style.overflow = "hidden";
  ui.classList.add(localStorage.getItem("uv2-setting-layout") === "panel" ? "uv2-layout-panel" : "uv2-layout-window");
  document.body.appendChild(ui);

  const uv2Backdrop = document.createElement("div");
  uv2Backdrop.id = "uv2-backdrop";
  document.body.appendChild(uv2Backdrop);
  uv2Backdrop.addEventListener("click", () => { if (uiVisible) toggleUI(); });
  function applyUv2Layout(layout) {
    try { uv2SheetClose(); } catch(e) {}
    try { [...gridContainer.children].forEach(c => { if (c._drawerOpen && c._gear) c._gear.click(); }); } catch(e) {}
    ui.classList.toggle("uv2-layout-panel", layout === "panel");
    ui.classList.toggle("uv2-layout-window", layout !== "panel");
    uv2Backdrop.classList.toggle("show", uiVisible && layout !== "panel");
  }

  function uv2PaintRange(r) {
    const min = parseFloat(r.min || 0), max = parseFloat(r.max || 100);
    r.style.setProperty('--p', ((parseFloat(r.value) - min) / ((max - min) || 1)) * 100 + '%');
  }
  ui.addEventListener('input', e => { if (e.target && e.target.type === 'range') uv2PaintRange(e.target); });
  new MutationObserver(() => ui.querySelectorAll('input[type=range]').forEach(uv2PaintRange)).observe(ui, { childList: true, subtree: true });

  const faLink = document.createElement("link");
  faLink.rel = "stylesheet";
  faLink.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  document.head.appendChild(faLink);

  const uv2Sidebar = document.createElement("div");
  uv2Sidebar.id = "uv2-sidebar";
  uv2Sidebar.style.cssText = [
    "width:180px;min-width:180px;background:#000000;display:flex;flex-direction:column;",
    "border-right:1px solid rgba(255,255,255,0.06);overflow:hidden;flex-shrink:0;",
    "border-radius:0 0 0 10px;"
  ].join("");

  const uv2SidebarLogo = document.createElement("div");
uv2SidebarLogo.style.cssText = [
  "padding:18px 14px 16px;border-bottom:1px solid rgba(255,255,255,0.06);",
  "display:flex;align-items:center;gap:9px;"
].join("");
uv2SidebarLogo.innerHTML = '<img src="https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/logo.jpg" style="width:32px;height:32px;border-radius:8px;object-fit:cover;flex-shrink:0;box-shadow:0 0 14px rgba(231,76,60,0.35);">';
uv2SidebarLogo.className = "uv2-brand";
uv2Sidebar.appendChild(uv2SidebarLogo);

  const uv2NavDefs = [
  { page: 'main', label: 'Modules', icon: 'fa-th-large' },
  { page: 'skies', label: 'Skies', icon: 'fa-cloud' },
  { page: 'gui', label: 'Color', icon: 'fa-paint-brush' },
  { page: 'config', label: 'Config', icon: 'fa-cog' },
  { page: 'settings', label: 'Settings', icon: 'fa-sliders' },
  { page: 'changelog', label: 'Changelog', icon: 'fa-history' },
];

  const uv2NavEls = {};
  const uv2SidebarNav = document.createElement("div");
  uv2SidebarNav.className = "uv2-nav";
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
  "font-size:11px;color:#888;letter-spacing:1.5px;text-transform:uppercase;",
  "font-family:MinibloxFont,sans-serif;text-align:center;"
].join("");
uv2SidebarFooter.className = "uv2-footer";
function uv2RenderFooter() {
  const keyNames = { backtick: "`", backslash: "\\", rshift: "Right Shift" };
  const key = keyNames[localStorage.getItem("uv2-setting-uikeybind") || "rshift"] || "Right Shift";
  uv2SidebarFooter.innerHTML = "<span></span><span>Press <kbd></kbd> or <kbd>Esc</kbd> to close</span>";
  uv2SidebarFooter.firstChild.textContent = "Unverified V2 · v" + GM_info.script.version;
  uv2SidebarFooter.querySelector("kbd").textContent = key;
}
uv2RenderFooter();
ui.appendChild(uv2Sidebar);

  const uv2ContentArea = document.createElement("div");
  uv2ContentArea.style.cssText = "flex:1;display:flex;flex-direction:column;overflow:hidden;min-width:0;";
  ui.appendChild(uv2ContentArea);
  ui.appendChild(uv2SidebarFooter);

  const uv2MainPage = document.createElement("div");
  uv2MainPage.id = "uv2-page-main-content";
  uv2MainPage.style.cssText = "flex:1;display:flex;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2MainPage);

  const uv2SkiesPage = document.createElement("div");
  uv2SkiesPage.id = "uv2-page-skies-content";
  uv2SkiesPage.style.cssText = "flex:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2SkiesPage);

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

  const uv2ChangelogPage = document.createElement("div");
  uv2ChangelogPage.id = "uv2-page-changelog-content";
  uv2ChangelogPage.style.cssText = "flex:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;padding:22px 24px;";
  uv2ContentArea.appendChild(uv2ChangelogPage);

let guiPrimaryColor = localStorage.getItem('uv2-gui-primary-color') || '#e74c3c';
if (holiday === 'halloween') guiPrimaryColor = '#ff6600';
if (holiday === 'christmas') guiPrimaryColor = '#cc0000';

  function applyGUIStyles() {
    ui.style.backgroundColor = '#000000';
    ui.style.color = '#ffffff';

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
        mc.style.background = `linear-gradient(135deg,${guiPrimaryColor}1a,#1a1a1a)`;
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
    const accentHex = /^#[0-9a-f]{6}$/i.test(guiPrimaryColor) ? guiPrimaryColor : '#e74c3c';
    const accentRgb = [1, 3, 5].map(n => parseInt(accentHex.slice(n, n + 2), 16));
    const accentLum = (0.2126 * accentRgb[0] + 0.7152 * accentRgb[1] + 0.0722 * accentRgb[2]) / 255;
    document.documentElement.style.setProperty('--uv2-accent', accentHex);
    document.documentElement.style.setProperty('--uv2-accent-rgb', accentRgb.join(','));
    document.documentElement.style.setProperty('--uv2-on-accent', accentLum > 0.62 ? '#111114' : '#ffffff');
    toggleStyle.textContent = `.uv2-toggle input:checked + .uv2-toggle-track { background: ${guiPrimaryColor} !important; }`;

    document.querySelectorAll('.uv2-page-icon').forEach(el => {
      el.style.background = `${guiPrimaryColor}1a`;
      el.style.color = guiPrimaryColor;
      el.style.border = `1px solid ${guiPrimaryColor}40`;
    });
    if (typeof updateModuleBadge === 'function') updateModuleBadge();

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


    ['#save-config-btn', '#load-config-btn'].forEach(sel => {
      const btn = document.querySelector(sel);
      if (btn) { btn.style.background = guiPrimaryColor; btn.style.backgroundColor = guiPrimaryColor; }
    });

        const changelogPage = document.getElementById('uv2-page-changelog-content');
    if (changelogPage) {
      changelogPage.querySelectorAll('.uv2-changelog-title').forEach(el => { el.style.color = guiPrimaryColor; });
      changelogPage.querySelectorAll('.uv2-changelog-dot').forEach(el => { el.style.background = guiPrimaryColor; });
      changelogPage.querySelectorAll('.uv2-changelog-marker').forEach(el => {
        el.style.background = guiPrimaryColor;
        el.style.boxShadow = `0 0 10px ${guiPrimaryColor}80`;
      });
      changelogPage.querySelectorAll('.uv2-changelog-tag').forEach(el => {
        el.style.color = guiPrimaryColor;
        el.style.borderColor = `${guiPrimaryColor}80`;
      });
    }
    if (typeof extrasApplyAccent === 'function') extrasApplyAccent();
  }

  function buildGUIPage() {
  uv2GUIPage.innerHTML = '';
  const isHoliday = holiday === 'halloween' || holiday === 'christmas';

  uv2GUIPage.appendChild(uv2PageHeader('fa-paint-brush', 'Color', 'Pick the accent color used across the menu and HUDs'));

  if (isHoliday) {
    const lock = document.createElement('div');
    lock.textContent = holiday === 'halloween' ? 'The accent color is locked to orange for Halloween.' : 'The accent color is locked to red for Christmas.';
    lock.style.cssText = 'font-size:12px;color:#888;font-family:MinibloxFont,sans-serif;padding:10px 14px;border-radius:8px;background:#141414;border:1px solid rgba(255,255,255,0.06);margin-bottom:12px;';
    uv2GUIPage.appendChild(lock);
  }

  const sectionLabel = document.createElement('div');
  sectionLabel.className = 'uv2-section-title';
  sectionLabel.style.marginTop = '0';
  sectionLabel.textContent = 'Accent color';
  uv2GUIPage.appendChild(sectionLabel);

  const panel = document.createElement('div');
  panel.className = 'uv2-panel';
  panel.style.cssText += 'display:flex;align-items:center;gap:16px;padding:14px 16px;';
  uv2GUIPage.appendChild(panel);

  const picker = document.createElement('input');
  picker.type = 'color';
  picker.value = guiPrimaryColor;
  picker.style.cssText = 'width:48px;height:48px;border:none;border-radius:8px;cursor:pointer;background:none;padding:0;flex-shrink:0;';
  panel.appendChild(picker);

  const hexInput = document.createElement('input');
  hexInput.type = 'text';
  hexInput.value = guiPrimaryColor.toUpperCase();
  hexInput.maxLength = 7;
  hexInput.spellcheck = false;
  hexInput.style.cssText = 'width:110px;background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:8px 10px;font-size:14px;font-family:monospace;outline:none;text-transform:uppercase;';
  panel.appendChild(hexInput);

  const previewDot = document.createElement('div');
  previewDot.style.cssText = `width:28px;height:28px;border-radius:50%;background:${guiPrimaryColor};box-shadow:0 0 12px ${guiPrimaryColor}88;transition:background 0.15s,box-shadow 0.15s;flex-shrink:0;margin-left:auto;`;
  panel.appendChild(previewDot);

  if (isHoliday) {
    [picker, hexInput].forEach(el => { el.disabled = true; el.style.opacity = '0.4'; el.style.cursor = 'not-allowed'; });
  }

  const swatchRow = (label) => {
    const t = document.createElement('div');
    t.className = 'uv2-section-title';
    t.textContent = label;
    uv2GUIPage.appendChild(t);
    const r = document.createElement('div');
    r.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px;padding:2px 0 4px 2px;';
    uv2GUIPage.appendChild(r);
    return r;
  };
  const makeSwatch = hex => {
    const swatch = document.createElement('div');
    swatch.title = hex.toUpperCase();
    swatch.style.cssText = `width:32px;height:32px;border-radius:7px;background:${hex};cursor:${isHoliday ? 'not-allowed' : 'pointer'};border:2px solid ${hex.toLowerCase() === guiPrimaryColor.toLowerCase() ? '#fff' : 'transparent'};box-shadow:0 0 10px ${hex}40;transition:border-color 0.15s,transform 0.15s;flex-shrink:0;opacity:${isHoliday ? 0.4 : 1};`;
    if (!isHoliday) {
      swatch.addEventListener('mouseenter', () => { swatch.style.transform = 'scale(1.15)'; });
      swatch.addEventListener('mouseleave', () => { swatch.style.transform = 'scale(1)'; });
      swatch.addEventListener('click', () => { applyColor(hex); });
    }
    return swatch;
  };

  const presetRow = swatchRow('Presets');
  const presets = ['#e74c3c', '#ff6b35', '#f1c40f', '#2ecc71', '#1abc9c', '#00bcd4', '#3498db', '#6c5ce7', '#9b59b6', '#ff4fa3', '#ecf0f1'];
  function renderPresets() {
    presetRow.innerHTML = '';
    presets.forEach(hex => presetRow.appendChild(makeSwatch(hex)));
  }

  const recentRow = swatchRow('Recent colors');

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
    if (isHoliday) return;
    const list = loadRecent();
    if (!list.length) {
      const empty = document.createElement('div');
      empty.textContent = 'Colors you pick show up here.';
      empty.style.cssText = 'font-size:12px;color:#555;font-family:MinibloxFont,sans-serif;';
      recentRow.appendChild(empty);
      return;
    }
    list.forEach(hex => recentRow.appendChild(makeSwatch(hex)));
  }

  const previewLabel = document.createElement('div');
  previewLabel.className = 'uv2-section-title';
  previewLabel.textContent = 'Preview';
  uv2GUIPage.appendChild(previewLabel);
  const preview = document.createElement('div');
  uv2GUIPage.appendChild(preview);
  function renderPreview() {
    preview.innerHTML = '';
    const card = document.createElement('div');
    card.style.cssText = 'display:flex;align-items:center;gap:12px;min-height:58px;padding:11px 12px;border-radius:13px;background:rgba(var(--uv2-accent-rgb),0.07);border:1px solid rgba(var(--uv2-accent-rgb),0.42);';
    card.innerHTML = '<i class="fa fa-star" style="font-size:12px;color:#ffd700;text-shadow:0 0 8px rgba(255,215,0,0.6);"></i><div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:2px;"><span style="color:var(--uv2-accent);font-size:13.5px;font-weight:600;">Example Module</span><span style="color:var(--uv2-muted);font-size:11.5px;">This is how enabled modules look.</span></div><div style="width:38px;height:22px;border-radius:22px;background:var(--uv2-accent);position:relative;flex-shrink:0;"><div style="position:absolute;top:3px;left:19px;width:16px;height:16px;border-radius:50%;background:var(--uv2-on-accent);box-shadow:0 1px 4px rgba(0,0,0,0.4);"></div></div>';
    preview.appendChild(card);
  }

  function applyColor(hex) {
    guiPrimaryColor = hex;
    localStorage.setItem('uv2-gui-primary-color', hex);
    picker.value = hex;
    hexInput.value = hex.toUpperCase();
    previewDot.style.background = hex;
    previewDot.style.boxShadow = `0 0 12px ${hex}88`;
    saveRecent(hex);
    renderPresets();
    renderRecent();
    renderPreview();
    applyGUIStyles();
  }

  renderPresets();
  renderRecent();
  renderPreview();
  picker.addEventListener('change', () => { applyColor(picker.value); });
  hexInput.addEventListener('input', () => {
    const v = hexInput.value.trim();
    const hex = v.startsWith('#') ? v : '#' + v;
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) applyColor(hex.toLowerCase());
  });
}

  function buildConfigPage() {
  uv2ConfigPage.innerHTML = '';

  uv2ConfigPage.appendChild(uv2PageHeader('fa-cog', 'Config', 'Save, load and share your whole setup'));

  const sectionLabel = document.createElement('div');
  sectionLabel.className = 'uv2-section-title';
  sectionLabel.textContent = 'Save / Load Configuration';
  uv2ConfigPage.appendChild(sectionLabel);

  const row = document.createElement('div');
  row.className = 'uv2-setting-row';
  row.style.cssText = 'display:flex;flex-direction:row;height:auto;padding:16px;gap:16px;';

  const saveBtn = document.createElement('button');
  saveBtn.style.cssText = `flex:1;background:${guiPrimaryColor};color:white;border:none;border-radius:6px;padding:12px 20px;cursor:pointer;font-family:MinibloxFont,sans-serif;`;
  saveBtn.textContent = 'Save Config';
  saveBtn.id = 'save-config-btn';
  saveBtn.className = 'uv2-btn uv2-btn-primary';
  saveBtn.addEventListener('click', () => {
    const config = {
      version: GM_info.script.version,
      gui: { primaryColor: guiPrimaryColor },
      settings: {
        moduleSounds: settings.moduleSounds,
        saving: settings.saving,
        autoAfk: settings.autoAfk,
        afkChat: settings.afkChat,
        afkDelay: afkDelay,
        uiKeybind: uiKeybind,
      },
      moduleBindings: moduleBindings,
      moduleStates: {},
      extras: typeof extrasSnapshot === 'function' ? extrasSnapshot() : undefined,
    };
    [...gridContainer.children].forEach(mc => {
      const name = mc.dataset.moduleName;
      if (name) config.moduleStates[name] = mc._uv2Active;
    });
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uv2-config-${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Config saved');
  });

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'config-file-input';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';

  const loadBtn = document.createElement('button');
  loadBtn.style.cssText = `flex:1;background:${guiPrimaryColor};color:white;border:none;border-radius:6px;padding:12px 20px;cursor:pointer;font-family:MinibloxFont,sans-serif;`;
  loadBtn.textContent = 'Load Config';
  loadBtn.id = 'load-config-btn';
  loadBtn.className = 'uv2-btn uv2-btn-primary';
  loadBtn.addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const config = JSON.parse(event.target.result);
        if (config.gui?.primaryColor) {
          guiPrimaryColor = config.gui.primaryColor;
          localStorage.setItem('uv2-gui-primary-color', guiPrimaryColor);
          applyGUIStyles();
          buildGUIPage();
        }
        if (config.settings) {
          if (typeof config.settings.moduleSounds === 'boolean') {
            settings.moduleSounds = config.settings.moduleSounds;
            localStorage.setItem('uv2-setting-sounds', settings.moduleSounds);
            const t = document.querySelector("#uv2-toggle-sounds");
            if (t) t.checked = settings.moduleSounds;
          }
          if (typeof config.settings.saving === 'boolean') {
            settings.saving = config.settings.saving;
            localStorage.setItem('uv2-setting-saving', settings.saving ? 'true' : 'false');
            const t = document.querySelector("#uv2-toggle-saving");
            if (t) t.checked = settings.saving;
          }
          if (typeof config.settings.autoAfk === 'boolean') {
            settings.autoAfk = config.settings.autoAfk;
            localStorage.setItem('uv2-setting-autoafk', settings.autoAfk ? 'true' : 'false');
            const t = document.querySelector("#uv2-toggle-autoafk");
            if (t) t.checked = settings.autoAfk;
            if (settings.autoAfk) startAfkDetector(); else stopAfkDetector();
          }
          if (typeof config.settings.afkChat === 'boolean') {
            settings.afkChat = config.settings.afkChat;
            localStorage.setItem('uv2-setting-afkchat', settings.afkChat);
            const t = document.querySelector("#uv2-toggle-afkchat");
            if (t) t.checked = settings.afkChat;
          }
          if (typeof config.settings.afkDelay === 'number') {
            afkDelay = Math.min(120, Math.max(10, config.settings.afkDelay));
            localStorage.setItem('uv2-setting-afkdelay', afkDelay);
            if (afkDelayInput) afkDelayInput.value = afkDelay;
          }
          if (typeof config.settings.uiKeybind === 'string') {
            uiKeybind = config.settings.uiKeybind;
            localStorage.setItem('uv2-setting-uikeybind', uiKeybind);
            const t = document.querySelector("#uv2-uikeybind-select");
            if (t) t.value = uiKeybind;
          }
        }
        if (config.moduleBindings) {
          moduleBindings = config.moduleBindings;
          saveModuleBindings();
          Object.keys(moduleBindings).forEach(name => {
            if (moduleBindings[name]) updateModuleKeybindPill(name, moduleBindings[name]);
          });
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
          if (config.extras && typeof extrasApply === 'function') extrasApply(config.extras);
        }, 500);
        showNotification('Config loaded');
      } catch (err) {
        console.error(err);
        showNotification('Invalid config file');
      }
    };
    reader.readAsText(file);
    fileInput.value = '';
  });

  row.appendChild(saveBtn);
  row.appendChild(fileInput);
  row.appendChild(loadBtn);
  uv2ConfigPage.appendChild(row);
}

let uv2ChangelogLoaded = false;
function buildChangelogPage() {
  uv2ChangelogPage.innerHTML = '';

  uv2ChangelogPage.appendChild(uv2PageHeader('fa-history', 'Changelog', 'Everything that changed in each version'));

  const status = document.createElement('div');
  status.textContent = 'Loading...';
  status.style.cssText = 'text-align:center;color:#666;font-size:13px;font-family:MinibloxFont,sans-serif;padding:20px 0;';
  uv2ChangelogPage.appendChild(status);

  GM_xmlhttpRequest({
    method: 'GET',
    url: UV2_CHANGELOG_URL + '?t=' + Date.now(),
    timeout: 8000,
    onload(r) {
      const entries = uv2ParseChangelog(r.responseText);
      if (!entries.length) {
        status.textContent = 'No changelog entries found.';
        return;
      }
      uv2ChangelogLoaded = true;
      status.remove();

      const timeline = document.createElement('div');
      timeline.style.cssText = 'display:flex;flex-direction:column;padding-left:6px;';

      entries.forEach((entry, index) => {
        const isLast = index === entries.length - 1;

        const item = document.createElement('div');
        item.style.cssText = `position:relative;padding:0 0 ${isLast ? '0' : '26px'} 22px;border-left:2px solid ${isLast ? 'transparent' : 'rgba(255,255,255,0.08)'};margin-left:5px;`;

        const marker = document.createElement('div');
        marker.className = 'uv2-changelog-marker';
        marker.style.cssText = `position:absolute;left:-7px;top:3px;width:12px;height:12px;border-radius:50%;background:${guiPrimaryColor};box-shadow:0 0 10px ${guiPrimaryColor}80;`;
        item.appendChild(marker);

        const head = document.createElement('div');
        head.style.cssText = 'display:flex;align-items:center;gap:10px;margin-bottom:10px;flex-wrap:wrap;';

        const headTitle = document.createElement('span');
        headTitle.className = 'uv2-changelog-title';
        headTitle.textContent = entry.heading;
        headTitle.style.cssText = `font-size:15px;font-family:MinibloxFont,sans-serif;color:${guiPrimaryColor};`;
        head.appendChild(headTitle);

        if (index === 0) {
          const tag = document.createElement('span');
          tag.className = 'uv2-changelog-tag';
          tag.textContent = 'Latest';
          tag.style.cssText = `font-size:9px;font-family:MinibloxFont,sans-serif;letter-spacing:1px;text-transform:uppercase;color:${guiPrimaryColor};border:1px solid ${guiPrimaryColor}80;border-radius:4px;padding:2px 6px;`;
          head.appendChild(tag);
        }
        item.appendChild(head);

        const list = document.createElement('div');
        list.style.cssText = 'display:flex;flex-direction:column;gap:6px;background:linear-gradient(135deg,#1c1c1c,#141414);border:1px solid rgba(255,255,255,0.06);border-radius:8px;padding:12px 14px;';
        entry.notes.forEach(line => {
          const row = document.createElement('div');
          row.style.cssText = 'display:flex;align-items:flex-start;gap:9px;font-size:12px;color:#bbb;line-height:1.5;font-family:MinibloxFont,sans-serif;';
          const dot = document.createElement('div');
          dot.className = 'uv2-changelog-dot';
          dot.style.cssText = `width:4px;height:4px;border-radius:50%;background:${guiPrimaryColor};margin-top:7px;flex-shrink:0;`;
          const text = document.createElement('div');
          text.textContent = line;
          row.appendChild(dot);
          row.appendChild(text);
          list.appendChild(row);
        });
        item.appendChild(list);
        timeline.appendChild(item);
      });

      uv2ChangelogPage.appendChild(timeline);
    },
    onerror() {
      status.textContent = 'Failed to load changelog.';
      uv2ChangelogLoaded = false;
    },
    ontimeout() {
      status.textContent = 'Failed to load changelog.';
      uv2ChangelogLoaded = false;
    }
  });
}

  function switchUv2Page(page) {
  uv2MainPage.style.display = page === 'main' ? 'flex' : 'none';
  uv2SkiesPage.style.display = page === 'skies' ? 'flex' : 'none';
  if (page === 'skies' && typeof skiesBuildPage === 'function') skiesBuildPage();
  uv2GUIPage.style.display = page === 'gui' ? 'flex' : 'none';
  uv2ConfigPage.style.display = page === 'config' ? 'flex' : 'none';
  uv2SettingsPage.style.display = page === 'settings' ? 'flex' : 'none';
  uv2ChangelogPage.style.display = page === 'changelog' ? 'flex' : 'none';
  if (page === 'changelog' && !uv2ChangelogLoaded) buildChangelogPage();
  Object.entries(uv2NavEls).forEach(([p, el]) => {
    const active = p === page;
    el.dataset.active = active ? "1" : "0";
    el.style.color = active ? guiPrimaryColor : "#666";
    el.style.backgroundColor = active ? `${guiPrimaryColor}14` : "";
    el.style.borderLeft = active ? `2px solid ${guiPrimaryColor}` : "2px solid transparent";
    const icon = el.querySelector("i");
    if (icon) icon.style.color = active ? guiPrimaryColor : "";
  });
}

  const title = document.createElement("div");
  title.textContent = "Unverified V2";
  title.classList.add('uv2-title-shine');
  title.style.cssText += "font-size:15px;font-family:MinibloxFont,sans-serif;letter-spacing:0.5px;white-space:nowrap;user-select:none;line-height:1.2;";
  const brandText = document.createElement("div");
  brandText.style.cssText = "display:flex;flex-direction:column;min-width:0;";
  const brandSub = document.createElement("div");
  brandSub.textContent = "Miniblox Client";
  brandSub.style.cssText = "font-size:10px;color:#555;font-family:MinibloxFont,sans-serif;letter-spacing:0.5px;margin-top:2px;";
  brandSub.className = "uv2-brand-sub";
  brandText.append(title, brandSub);
  uv2SidebarLogo.appendChild(brandText);
  const uv2CloseBtn = document.createElement("div");
  uv2CloseBtn.className = "uv2-close";
  uv2CloseBtn.title = "Close";
  uv2CloseBtn.innerHTML = '<i class="fa fa-times"></i>';
  uv2CloseBtn.addEventListener("click", () => { if (uiVisible) toggleUI(); });
  uv2Sidebar.appendChild(uv2CloseBtn);

  const mainHeader = uv2PageHeader('fa-th-large', 'Modules', 'Right-click a module to bind a key, star it to pin it to the top');
  mainHeader.style.display = "none";
  uv2MainPage.appendChild(mainHeader);

   const settingsOverlay = document.createElement("div");
settingsOverlay.id = "uv2-settings-overlay";
settingsOverlay.innerHTML = `
  <div id="uv2-settings-panel">
    <div id="uv2-settings-titlebar">
      <span><svg width="16" height="16" viewBox="0 0 24 24"><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94zM12,15.6c-1.98,0-3.6-1.62-3.6-3.6s1.62-3.6,3.6-3.6S13.98,15.6,12,15.6z"/></svg>Settings</span>
    </div>
    <div id="uv2-settings-body">
      <div id="uv2-settings-content">
        <div class="uv2-settings-page" id="uv2-page-visuals">
          <div class="uv2-section-title">Interface</div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">Module Click Sounds</div><div class="uv2-setting-desc">Play a sound when toggling modules on or off</div></div>
            <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-sounds"><div class="uv2-toggle-track"></div></label>
          </div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">Save Modules</div><div class="uv2-setting-desc">Restore your active modules after a page reload</div></div>
            <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-saving"><div class="uv2-toggle-track"></div></label>
          </div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">UI Keybind</div><div class="uv2-setting-desc">Choose the key that opens and closes the menu</div></div>
            <select id="uv2-uikeybind-select" style="background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:6px 10px;font-size:13px;font-family:MinibloxFont,sans-serif;outline:none;cursor:pointer;">
              <option value="rshift">Right Shift</option>
              <option value="backtick">&#96;</option>
              <option value="backslash">\\</option>
            </select>
          </div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">Menu Layout</div><div class="uv2-setting-desc">A big centered window, or a slim panel on the side of the screen</div></div>
            <select id="uv2-layout-select" style="background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:6px 10px;font-size:13px;font-family:MinibloxFont,sans-serif;outline:none;cursor:pointer;">
              <option value="window">Window</option>
              <option value="panel">Side panel</option>
            </select>
          </div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">Pause Game While Open</div><div class="uv2-setting-desc">Frees your mouse when the menu opens in a match and puts you back in when it closes</div></div>
            <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-pausegame"><div class="uv2-toggle-track"></div></label>
          </div>
          <div class="uv2-setting-row">
            <div><div class="uv2-setting-label">Show VPN Warning</div><div class="uv2-setting-desc">Show the VPN detection popup when opening the menu</div></div>
            <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-vpnwarning"><div class="uv2-toggle-track"></div></label>
          </div>
          <div class="uv2-section-title" style="margin-top:14px;">Anti-AFK</div>
<div class="uv2-setting-row">
  <div><div class="uv2-setting-label">Auto Enable</div><div class="uv2-setting-desc">Turns on Anti-AFK automatically after idling</div></div>
  <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-autoafk"><div class="uv2-toggle-track"></div></label>
</div>
<div class="uv2-setting-row">
  <div><div class="uv2-setting-label">Sends AFK Message In Chat</div><div class="uv2-setting-desc">Sends a chat message when you go AFK</div></div>
  <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-afkchat"><div class="uv2-toggle-track"></div></label>
</div>
<div class="uv2-setting-row">
  <div><div class="uv2-setting-label">AFK Music</div><div class="uv2-setting-desc">Play music when Anti-AFK auto-enables</div></div>
  <label class="uv2-toggle"><input type="checkbox" id="uv2-toggle-afkmusic"><div class="uv2-toggle-track"></div></label>
</div>
<div class="uv2-setting-row">
  <div><div class="uv2-setting-label">Idle Delay</div><div class="uv2-setting-desc">Seconds before Anti-AFK auto-enables (10–120)</div></div>
  <div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">
    <input type="number" id="uv2-afkdelay-input" min="10" max="120" value="10" style="width:60px;background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:5px 8px;font-size:14px;font-family:'MinibloxFont',sans-serif;text-align:center;outline:none;">
    <span style="color:#888;font-size:13px;">s</span>
  </div>
</div>
        <div class="uv2-settings-page" id="uv2-page-about">
          <div class="uv2-section-title" style="margin-top:16px;">Contributors</div>
          <div id="uv2-contributors-grid"></div>
        </div>
      </div>
    </div>
  </div>
`;

const resetSection = document.createElement('div');
resetSection.className = 'uv2-section-title';
resetSection.style.marginTop = '14px';
resetSection.textContent = 'Danger Zone';
settingsOverlay.querySelector('#uv2-page-visuals')?.appendChild(resetSection);
const resetRow = document.createElement('div');
resetRow.className = 'uv2-setting-row';
resetRow.style.cssText = 'height:auto;padding:16px;flex-direction:column;gap:0;';
const resetBtn = document.createElement('button');
resetBtn.textContent = 'Reset All Settings';
resetBtn.className = 'uv2-btn uv2-btn-danger';
resetBtn.style.cssText = 'width:100%;background:#e74c3c;color:white;border:none;border-radius:6px;padding:12px 20px;cursor:pointer;font-family:MinibloxFont,sans-serif;';
resetBtn.addEventListener('click', () => {
  const existing = document.getElementById('uv2-reset-confirm');
  if (existing) return;
  const confirm = document.createElement('div');
  confirm.id = 'uv2-reset-confirm';
  confirm.style.cssText = 'margin-top:10px;display:flex;flex-direction:column;gap:8px;';
  const question = document.createElement('div');
  question.textContent = 'Are you sure? This cannot be undone.';
  question.style.cssText = 'font-size:13px;color:#ccc;font-family:MinibloxFont,sans-serif;text-align:center;';
  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;';
  const yesBtn = document.createElement('button');
  yesBtn.textContent = 'Yes';
  yesBtn.className = 'uv2-btn uv2-btn-danger';
  yesBtn.style.cssText = 'flex:1;background:#e74c3c;color:white;border:none;border-radius:6px;padding:10px;cursor:pointer;font-family:MinibloxFont,sans-serif;';
  yesBtn.addEventListener('click', () => {
    Object.keys(localStorage).filter(k => k.startsWith('uv2-')).forEach(k => localStorage.removeItem(k));
    sessionStorage.clear();
    showNotification('Settings reset');
    location.reload();
  });
  const noBtn = document.createElement('button');
  noBtn.textContent = 'No';
  noBtn.className = 'uv2-btn';
  noBtn.style.cssText = 'flex:1;background:#2a2a2a;color:#fff;border:1px solid #444;border-radius:6px;padding:10px;cursor:pointer;font-family:MinibloxFont,sans-serif;';
  noBtn.addEventListener('click', () => confirm.remove());
  btnRow.appendChild(yesBtn);
  btnRow.appendChild(noBtn);
  confirm.appendChild(question);
  confirm.appendChild(btnRow);
  resetRow.appendChild(confirm);
});
resetRow.appendChild(resetBtn);
settingsOverlay.querySelector('#uv2-page-visuals')?.appendChild(resetRow);

(function buildContributorsGrid() {
  const contributors = [
    { name: "wyt", role: "Lead Developer", badge: "Founder", bio: "Founded and leads UV2.", avatar: "https://github.com/wytlines100.png", bg: "#3b1a00", text: "#fdba74", border: "#ea580c", strip: "#ea580c", icon: "★" },
    { name: "jet", role: "Ex-Developer", badge: "Ex-Dev", bio: "Helped build early versions.", avatar: "https://github.com/h9ndcuffs.png", bg: "#1c1c1c", text: "#a1a1aa", border: "#52525b", strip: "#52525b", icon: "◇" },
    { name: "joudaALT", role: "Developer", badge: "Mod & Dev", bio: "Miniblox moderator and UV2 developer.", avatar: "https://github.com/joudaALT.png", bg: "#1a1f3a", text: "#93c5fd", border: "#3b82f6", strip: "#3b82f6", icon: "⬡" },
    { name: "Trust", role: "Developer", badge: "Coder", bio: "Developer with a knack for clean code.", avatar: "https://github.com/lttlgrl.png", bg: "#2d1a3a", text: "#d8b4fe", border: "#9333ea", strip: "#9333ea", icon: "✦" },
    { name: "TheM1ddleM1n", role: "Developer", badge: "Coder", bio: "Developer and Python/JavaScript specialist.", avatar: "https://github.com/TheM1ddleM1n.png", bg: "#1a2a1a", text: "#6ee7b7", border: "#059669", strip: "#059669", icon: "⚔" },
    { name: "mrdaddycat", role: "Discord", badge: "OG", bio: "cat", avatar: "https://marketplace.canva.com/xHPJk/MAHA8XxHPJk/1/tl/canva-MAHA8XxHPJk.jpg", bg: "#1a2a1a", text: "#6ee7b7", border: "#059669", strip: "#059669", icon: "🐾" },
  ];
  const grid = settingsOverlay.querySelector("#uv2-contributors-grid");
  if (!grid) return;
  grid.style.cssText = "display:flex;flex-wrap:wrap;gap:12px;padding:4px 0 8px 0;";
  function buildCard(c) {
    const card = document.createElement("div");
    card.className = "uv2-contrib-card";
    card.style.cssText = `display:flex;flex-direction:column;background:linear-gradient(160deg,#1c1c1c,#111111);border:1px solid ${c.strip}30;border-radius:10px;flex:1;min-width:200px;max-width:calc(50% - 6px);transition:border-color 0.25s ease,box-shadow 0.25s ease;cursor:default;box-sizing:border-box;position:relative;overflow:hidden;`;
    card.addEventListener("mouseenter", () => { card.style.borderColor = `${c.strip}80`; card.style.boxShadow = `0 0 0 1px ${c.strip}25,0 6px 24px rgba(0,0,0,0.6),inset 0 0 40px ${c.strip}08`; });
    card.addEventListener("mouseleave", () => { card.style.borderColor = `${c.strip}30`; card.style.boxShadow = "none"; });
    card.innerHTML = `<div class="uv2-card-shimmer" style="pointer-events:none;position:absolute;top:0;left:0;width:40%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,0.07),transparent);transform:translateX(-100%) skewX(-15deg);z-index:1;"></div><div style="height:3px;background:linear-gradient(90deg,${c.strip},${c.strip}44);border-radius:10px 10px 0 0;flex-shrink:0;"></div><div style="display:flex;flex-direction:column;gap:10px;padding:12px 14px 14px;position:relative;z-index:2;"><div style="display:flex;align-items:center;gap:10px;"><div style="position:relative;flex-shrink:0;"><div style="position:absolute;inset:-3px;border-radius:50%;background:radial-gradient(circle,${c.strip}55,transparent 70%);z-index:0;"></div><img src="${c.avatar}" onerror="this.src='https://github.com/identicons/${c.name}.png'" style="width:44px;height:44px;border-radius:50%;display:block;position:relative;z-index:1;border:2px solid ${c.strip}99;background:#111;"></div><div style="display:flex;flex-direction:column;gap:4px;min-width:0;flex:1;"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><div style="font-size:13px;font-weight:600;color:#fff;font-family:MinibloxFont,sans-serif;white-space:nowrap;">${c.name}</div><div style="background:${c.bg};color:${c.text};border:1px solid ${c.border};font-size:9px;font-family:MinibloxFont,sans-serif;letter-spacing:0.5px;padding:2px 6px;border-radius:4px;white-space:nowrap;display:flex;align-items:center;gap:3px;"><span style="font-size:8px;">${c.icon}</span><span>${c.badge}</span></div></div><div style="font-size:11px;color:${c.strip};font-family:MinibloxFont,sans-serif;opacity:0.9;">${c.role}</div></div></div><div style="height:1px;background:linear-gradient(90deg,${c.strip}30,transparent);"></div><div style="font-size:11.5px;color:#666;font-family:MinibloxFont,sans-serif;line-height:1.55;">${c.bio}</div></div>`;
    return card;
  }
  contributors.forEach(c => grid.appendChild(buildCard(c)));
})();

  const uv2InlineSettings = settingsOverlay.querySelector('#uv2-settings-panel');
  if (uv2InlineSettings) {
    uv2InlineSettings.style.width = "100%";
    uv2InlineSettings.style.height = "100%";
    uv2InlineSettings.style.maxHeight = "none";
    uv2InlineSettings.style.borderRadius = "0";
    uv2InlineSettings.style.border = "none";
    uv2InlineSettings.style.boxShadow = "none";
    uv2SettingsPage.appendChild(uv2InlineSettings);
    const settingsTitlebar = uv2InlineSettings.querySelector('#uv2-settings-titlebar');
    if (settingsTitlebar) settingsTitlebar.style.display = 'none';
    const settingsContent = uv2InlineSettings.querySelector('#uv2-settings-content');
    if (settingsContent) {
      settingsContent.style.padding = '22px 24px';
      settingsContent.insertBefore(uv2PageHeader('fa-sliders', 'Settings', 'Sounds, saving, menu key, pausing and Anti-AFK'), settingsContent.firstChild);
    }
  }

buildGUIPage();
buildConfigPage();
applyGUIStyles();
switchUv2Page('main');

document.querySelector("#uv2-toggle-sounds")?.addEventListener("change", function() {
  settings.moduleSounds = this.checked;
  localStorage.setItem('uv2-setting-sounds', this.checked);
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
document.querySelector("#uv2-toggle-afkmusic")?.addEventListener("change", function() {
  settings.afkMusic = this.checked;
  localStorage.setItem('uv2-setting-afkmusic', this.checked);
});
document.querySelector("#uv2-toggle-vpnwarning")?.addEventListener("change", function() {
  settings.vpnWarning = this.checked;
  localStorage.setItem('uv2-setting-vpnwarning', this.checked);
  if (this.checked) vpnGateDismissed = false;
});

  let moduleBindings = {};
  try { moduleBindings = JSON.parse(localStorage.getItem('uv2-module-bindings') || '{}') || {}; } catch(e) { moduleBindings = {}; }
  function saveModuleBindings() { localStorage.setItem('uv2-module-bindings', JSON.stringify(moduleBindings)); }
  let isBinding = false;
  let lastKeyPressTime = {};
  let vpnGateDismissed = false;
  let uiVisible = false;
  let uiAnimating = false;
  let closeUITimeout = null;
  let isRestoring = false;
  let uiKeybind = localStorage.getItem('uv2-setting-uikeybind') || 'rshift';

    const settings = {
    moduleSounds: localStorage.getItem('uv2-setting-sounds') !== 'false',
    saving: localStorage.getItem('uv2-setting-saving') === 'true',
    autoAfk: localStorage.getItem('uv2-setting-autoafk') === 'true',
    afkChat: localStorage.getItem('uv2-setting-afkchat') !== 'false',
    vpnWarning: localStorage.getItem('uv2-setting-vpnwarning') !== 'false',
    afkMusic: localStorage.getItem('uv2-setting-afkmusic') !== 'false',
    pauseGame: localStorage.getItem('uv2-setting-pausegame') !== 'false',
    layout: localStorage.getItem('uv2-setting-layout') === 'panel' ? 'panel' : 'window',
  };

  const soundsToggle = document.querySelector("#uv2-toggle-sounds");
  if (soundsToggle) soundsToggle.checked = settings.moduleSounds;
  const savingToggle = document.querySelector("#uv2-toggle-saving");
  if (savingToggle) savingToggle.checked = settings.saving;
  const autoAfkToggle = document.querySelector("#uv2-toggle-autoafk");
  if (autoAfkToggle) autoAfkToggle.checked = settings.autoAfk;
  const afkChatToggle = document.querySelector("#uv2-toggle-afkchat");
  if (afkChatToggle) afkChatToggle.checked = settings.afkChat;
  const vpnWarningToggle = document.querySelector("#uv2-toggle-vpnwarning");
  if (vpnWarningToggle) vpnWarningToggle.checked = settings.vpnWarning;
  const afkMusicToggle = document.querySelector("#uv2-toggle-afkmusic");
  if (afkMusicToggle) afkMusicToggle.checked = settings.afkMusic;
  const pauseGameToggle = document.querySelector('#uv2-toggle-pausegame');
  if (pauseGameToggle) {
    pauseGameToggle.checked = settings.pauseGame;
    pauseGameToggle.addEventListener('change', function() { settings.pauseGame = this.checked; localStorage.setItem('uv2-setting-pausegame', this.checked); });
  }
  const layoutSelect = document.querySelector('#uv2-layout-select');
  if (layoutSelect) {
    layoutSelect.value = settings.layout;
    layoutSelect.addEventListener('change', function() { settings.layout = this.value; localStorage.setItem('uv2-setting-layout', this.value); applyUv2Layout(this.value); });
  }

    const uiKeybindSelect = document.querySelector("#uv2-uikeybind-select");
  if (uiKeybindSelect) uiKeybindSelect.value = uiKeybind;
  uiKeybindSelect?.addEventListener("change", function() {
    const newKey = this.value;
    const conflictModule = Object.keys(moduleBindings).find(m => {
      const bound = moduleBindings[m];
      return (newKey === 'backtick' && bound === '`') || (newKey === 'rshift' && bound === 'Shift') || (newKey === 'backslash' && bound === '\\');
    });
    if (conflictModule) {
      showNotification(`Cannot set UI Keybind, conflicts with ${conflictModule}`);
      this.value = uiKeybind;
      return;
    }
    uiKeybind = newKey;
    localStorage.setItem('uv2-setting-uikeybind', uiKeybind);
  });

let afkDelay = parseInt(localStorage.getItem('uv2-setting-afkdelay') || '10', 10);
if (isNaN(afkDelay) || afkDelay < 10) afkDelay = 10;
if (afkDelay > 120) afkDelay = 120;
let afkTimer = null;
const afkDelayInput = document.querySelector("#uv2-afkdelay-input");
if (afkDelayInput) afkDelayInput.value = afkDelay;
afkDelayInput?.addEventListener("change", function() {
  let val = parseInt(this.value, 10);
  if (isNaN(val) || val < 10) val = 10;
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
    const master = ctx.createGain();
    master.gain.value = 0.6;
    master.connect(ctx.destination);
    if (turningOn) {
      const tone1 = ctx.createOscillator();
      tone1.type = "sine";
      tone1.frequency.setValueAtTime(520, now);
      const gain1 = ctx.createGain();
      gain1.gain.setValueAtTime(0.0, now);
      gain1.gain.linearRampToValueAtTime(0.4, now + 0.025);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.13);
      tone1.connect(gain1);
      gain1.connect(master);
      tone1.start(now);
      tone1.stop(now + 0.14);
      const tone2 = ctx.createOscillator();
      tone2.type = "sine";
      tone2.frequency.setValueAtTime(880, now + 0.1);
      tone2.frequency.exponentialRampToValueAtTime(1100, now + 0.22);
      const gain2 = ctx.createGain();
      gain2.gain.setValueAtTime(0.0, now + 0.1);
      gain2.gain.linearRampToValueAtTime(0.45, now + 0.13);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);
      tone2.connect(gain2);
      gain2.connect(master);
      tone2.start(now + 0.1);
      tone2.stop(now + 0.3);
    } else {
      const tone = ctx.createOscillator();
      tone.type = "sine";
      tone.frequency.setValueAtTime(600, now);
      tone.frequency.exponentialRampToValueAtTime(280, now + 0.18);
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0.35, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      tone.connect(gainNode);
      gainNode.connect(master);
      tone.start(now);
      tone.stop(now + 0.22);
    }
    setTimeout(() => ctx.close(), 600);
  } catch(e) {}
}

const CHAT_FILTER_LINK_PATTERN = /(https?:\/\/|www\.|discord\.gg\/|discord(app)?\.com\/invite\/|dsc\.gg\/|[a-z0-9-]+\.(com|net|org|io|gg|xyz|co|me|tv|ru|de|uk|us|info|club|site|online|shop|ly|to|cc|app|dev)(\/|$|[^a-z0-9]))/i;
function chatFilterContainsLink(text) {
  const cleanText = text.replace(/\\#[0-9A-Fa-f]{6}\\|\\reset\\|\\glow\\/g, '');
  return CHAT_FILTER_LINK_PATTERN.test(cleanText) || CHAT_FILTER_LINK_PATTERN.test(cleanText.replace(/\s*(\(dot\)|\[dot\]|\{dot\})\s*/gi, '.').replace(/\s*\.\s*/g, '.'));
}

function chatFilterStripSeparators(text) {
  return text.replace(/[\s\.\-\_\*\|\~\+\=\\\/]/g, '');
}

const CHAT_FILTER_PATTERN = new RegExp('(^|[^a-z])(' + [
  'f+u+c*k+\\w*|ph?u+c?k+|f[vx]ck|fuk|fck|fuc+',
  'motherf\\w+',
  'sh[i1y]+t\\w*|bullshit|sht|shyt',
  'b[i1]+a?tch\\w*|btch',
  'a+s+holes?|arse(hole)?s?|asses|ass|azz|a\\$\\$|a55',
  'goddamn\\w*|damned',
  'crap\\w*',
  'bastards?',
  'd[i1]ck\\w*|dck',
  'cocks?(suckers?)?',
  'pussy|pussies|pen[i1]s',
  'piss(ed|ing|off)?',
  'c[u*]nts?|cnt',
  'twats?',
  'wank\\w*',
  'bollocks?',
  'pricks?',
  'douche(bags?)?',
  'sluts?|whores?',
  'fag(got)?s?|dykes?',
  'n[i1]gg(er|a|s)?s?|nigg',
  'retard(ed|s)?',
  'nazis?|kikes?|chinks?|spics?|wetbacks?|trann(y|ies)|gooks?|beaners?|pakis?|towelheads?',
  'coons?|goons?|gooner|cums?|gypsy|gypsies|slapper|crack',
  'porn\\w*|hentai',
  'rap(e|ing|ed|ist)s?',
  'kys|kms|killyourself'
].join('|') + ')($|[^a-z])', 'i');

function chatFilterContainsBadWords(text) {
  const cleanText = text.replace(/\\#[0-9A-Fa-f]{6}\\|\\reset\\|\\glow\\/g, '').toLowerCase();
  return CHAT_FILTER_PATTERN.test(cleanText) || CHAT_FILTER_PATTERN.test(chatFilterStripSeparators(cleanText));
}

const MODULE_NAMES = { KEYSTROKES: "Keystrokes", MUTE_CHAT: "Mute Chat", CHAT_FILTER: "Chat Filter", ANTI_AFK: "Anti-Afk", KEEP_SPRINT: "Keep Sprint", CLOCK: "Clock", ARMOR_HUD: "Armor HUD" };
const MODULE_CATEGORIES = { "Keystrokes": "hud", "Mute Chat": "chat", "Chat Filter": "chat", "Anti-Afk": "utility", "Keep Sprint": "utility", "Clock": "hud", "Armor HUD": "hud" };

const moduleSearchWrap = document.createElement("div");
moduleSearchWrap.style.cssText = "position:relative;margin-top:4px;";
const moduleSearchInput = document.createElement("input");
moduleSearchInput.type = "text";
moduleSearchInput.id = "uv2-module-search";
moduleSearchInput.placeholder = "Search modules...";
moduleSearchInput.style.cssText = "width:100%;background:#161616;color:#fff;border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:10px 14px 10px 34px;font-size:13px;font-family:MinibloxFont,sans-serif;outline:none;box-sizing:border-box;transition:border-color 0.15s ease;";
const moduleSearchIcon = document.createElement("i");
moduleSearchIcon.className = "fa fa-search";
moduleSearchIcon.style.cssText = "position:absolute;left:12px;top:50%;transform:translateY(-50%);color:#555;font-size:12px;pointer-events:none;";
moduleSearchWrap.appendChild(moduleSearchIcon);
moduleSearchWrap.appendChild(moduleSearchInput);
uv2MainPage.appendChild(moduleSearchWrap);
moduleSearchInput.addEventListener("focus", () => { moduleSearchInput.style.borderColor = guiPrimaryColor; });
moduleSearchInput.addEventListener("blur", () => { moduleSearchInput.style.borderColor = "rgba(255,255,255,0.1)"; });
moduleSearchInput.addEventListener("input", applyModuleFilter);

var moduleCategory = localStorage.getItem('uv2-module-category') || 'all';
const MODULE_FOLDERS = [['fav', 'Favorites', 'fa-star'], ['sky', 'Sky', 'fa-cloud'], ['world', 'World', 'fa-globe'], ['visuals', 'Visuals', 'fa-magic'], ['chat', 'Chat', 'fa-comments'], ['hud', 'HUD', 'fa-desktop'], ['utility', 'Utility', 'fa-wrench']];
function loadCollapsedFolders() {
  try { return JSON.parse(localStorage.getItem('uv2-folders-collapsed') || '{}') || {}; } catch(e) { return {}; }
}
function applyModuleFilter() {
  const q = moduleSearchInput.value.trim().toLowerCase();
  const collapsed = loadCollapsedFolders();
  const showFolders = !q && moduleCategory === 'all';
  let visible = 0;
  [...gridContainer.children].forEach(el => {
    if (el.classList.contains('uv2-folder')) {
      el.style.display = showFolders ? 'flex' : 'none';
      return;
    }
    if (el.classList.contains('uv2-module-drawer')) {
      const owner = el._owner;
      el.style.display = owner && owner._drawerOpen && owner.style.display !== 'none' ? 'flex' : 'none';
      return;
    }
    if (!el.dataset.moduleName) return;
    const name = el.dataset.moduleName.toLowerCase();
    const desc = (el.querySelector("p")?.textContent || "").toLowerCase();
    let show;
    if (q) show = name.includes(q) || desc.includes(q);
    else if (moduleCategory !== 'all') show = el.dataset.category === moduleCategory;
    else show = !collapsed[el.dataset.folder];
    el.style.display = show ? 'flex' : 'none';
    if (show) visible++;
  });
  if (typeof moduleEmptyState !== 'undefined' && moduleEmptyState) moduleEmptyState.style.display = !visible && !showFolders ? 'flex' : 'none';
}

function applyHolidayBanner(banner) {
  ui.insertBefore(banner, ui.firstChild);
  ui.style.flexDirection = 'column';
  const inner = document.createElement('div');
  inner.style.cssText = 'display:flex;flex-direction:column;flex:1;min-height:0;';
  [...ui.children].forEach(c => { if (c !== banner) inner.appendChild(c); });
  ui.appendChild(inner);
}

if (holiday === 'halloween' || holiday === 'christmas') {
  const isHalloween = holiday === 'halloween';
  const banner = document.createElement('div');
  banner.style.cssText = `width:100%;text-align:center;padding:6px 0;font-size:12px;font-family:MinibloxFont,sans-serif;letter-spacing:1px;background:${isHalloween ? '#ff660022' : '#cc000022'};border-bottom:1px solid ${isHalloween ? '#ff660055' : '#cc000055'};color:${isHalloween ? '#ff6600' : '#cc0000'};flex-shrink:0;`;
  banner.textContent = isHalloween ? 'Happy Halloween' : 'Merry Christmas';
  applyHolidayBanner(banner);
}

if (holiday === 'newyear') {
  const nyBanner = document.createElement('div');
  nyBanner.style.cssText = 'width:100%;text-align:center;padding:6px 0;font-size:12px;font-family:MinibloxFont,sans-serif;letter-spacing:1px;background:#ffffff11;border-bottom:1px solid #ffffff33;color:#ffffff;flex-shrink:0;';
  nyBanner.textContent = new Date().getMonth() === 0 ? 'Happy New Year!' : 'Happy New Year\'s Eve!';
  applyHolidayBanner(nyBanner);
  const targetYear = new Date().getMonth() === 0 ? new Date().getFullYear() : new Date().getFullYear() + 1;
  const target = new Date(`January 1, ${targetYear} 00:00:00`).getTime();
  function updateNewYearFooter() {
    const now = Date.now();
    const diff = target - now;
    if (diff <= 0) {
      uv2SidebarFooter.textContent = 'v' + GM_info.script.version;
      if (!sessionStorage.getItem('uv2-newyear-toast')) {
        sessionStorage.setItem('uv2-newyear-toast', '1');
        showToast('Happy New Year!', '#e74c3c', 5000);
        const confettiStyle = document.createElement('style');
        confettiStyle.textContent = `@keyframes uv2Confetti{0%{transform:translateY(0) rotate(0deg);opacity:1;}100%{transform:translateY(-80vh) rotate(720deg);opacity:0;}}`;
        document.head.appendChild(confettiStyle);
        const colors = ['#e74c3c','#f39c12','#2ecc71','#3498db','#9b59b6','#fff'];
        for (let i = 0; i < 20; i++) {
          const c = document.createElement('div');
          c.style.cssText = `position:fixed;bottom:0;left:${Math.random()*100}vw;width:8px;height:8px;border-radius:2px;background:${colors[Math.floor(Math.random()*colors.length)]};z-index:99999;pointer-events:none;animation:uv2Confetti ${1.5+Math.random()*2}s ease-out ${Math.random()*0.5}s forwards;`;
          document.body.appendChild(c);
          setTimeout(() => c.remove(), 4000);
        }
      }
      return;
    }
    const h = Math.floor(diff / 3600000);
    const min = Math.floor((diff % 3600000) / 60000);
    const sec = Math.floor((diff % 60000) / 1000);
    uv2SidebarFooter.textContent = `${h}h ${min}m ${sec}s`;
  }
  updateNewYearFooter();
  setInterval(updateNewYearFooter, 1000);
}

const gridContainer = document.createElement("div");
gridContainer.style.display = "flex";
gridContainer.style.flexDirection = "column";
gridContainer.style.gap = "8px";
gridContainer.style.marginTop = "16px";
gridContainer.id = "uv2-module-grid";
uv2MainPage.appendChild(gridContainer);

var moduleEmptyState = document.createElement("div");
moduleEmptyState.style.cssText = "display:none;flex-direction:column;align-items:center;gap:8px;padding:40px 0;color:#555;font-size:13px;font-family:MinibloxFont,sans-serif;";
moduleEmptyState.innerHTML = '<i class="fa fa-search" style="font-size:22px;color:#333;"></i><span>No modules found</span>';
uv2MainPage.appendChild(moduleEmptyState);

function updateModuleBadge() {
  try {
    const nav = uv2NavEls.main;
    if (!nav) return;
    const count = [...gridContainer.children].filter(c => c.dataset.moduleName && c._uv2Active).length;
    let badge = nav.querySelector('.uv2-nav-badge');
    if (!badge) {
      badge = document.createElement('span');
      badge.className = 'uv2-nav-badge';
      nav.appendChild(badge);
    }
    badge.textContent = String(count);
    badge.style.display = count ? 'inline-block' : 'none';
    updateFolderCounts();
  } catch(e) {}
}
gridContainer.addEventListener('click', () => setTimeout(updateModuleBadge, 0));

const notificationContainer = document.createElement("div");
notificationContainer.style.cssText = "position:fixed;bottom:1in;right:20px;z-index:10000;display:flex;flex-direction:column-reverse;align-items:flex-end;";
document.body.appendChild(notificationContainer);

function showNotification(message) {
  const existing = [...notificationContainer.children].find(
    n => n.dataset.message === message && !n.classList.contains('uv2-notif-exit')
  );
  if (existing) {
    let badge = existing.querySelector('.uv2-notif-badge');
    if (!badge) {
      badge = Object.assign(document.createElement('span'), { className: 'uv2-notif-badge', textContent: '2' });
      badge.dataset.count = '2';
      badge.style.cssText = `margin-left:8px;background:${guiPrimaryColor};color:#fff;border-radius:10px;padding:1px 7px;font-size:11px;vertical-align:middle;`;
      existing.insertBefore(badge, existing.querySelector('.notification-progress'));
    } else {
      badge.textContent = badge.dataset.count = String(parseInt(badge.dataset.count) + 1);
    }
    existing.querySelector('.notification-progress')?.replaceWith(existing.querySelector('.notification-progress').cloneNode(false));
    clearTimeout(existing._uv2RemoveTimer);
    existing._uv2RemoveTimer = setTimeout(() => { existing.classList.add('uv2-notif-exit'); setTimeout(() => existing.remove(), 350); }, 4000);
    return;
  }
  if (notificationContainer.children.length >= 4) {
    const oldest = notificationContainer.children[notificationContainer.children.length - 1];
    oldest.classList.add('uv2-notif-exit');
    setTimeout(() => oldest.remove(), 350);
  }
  const notification = Object.assign(document.createElement('div'), { textContent: message });
  notification.dataset.message = message;
  notification.classList.add('other-notification');
  notification.style.borderLeft = `4px solid ${guiPrimaryColor}`;
  const progressBar = Object.assign(document.createElement('div'), { className: 'notification-progress' });
  progressBar.style.background = guiPrimaryColor;
  notification.appendChild(progressBar);
  notificationContainer.appendChild(notification);
  notification._uv2RemoveTimer = setTimeout(() => { notification.classList.add('uv2-notif-exit'); setTimeout(() => notification.remove(), 350); }, 4000);
}
    function updateModuleKeybindPill(moduleName, key) {
  const mc = [...gridContainer.children].find(c => c.dataset.moduleName === moduleName);
  if (!mc) return;
  let pill = mc.querySelector('.uv2-keybind-pill');
  if (!key) {
    if (pill) pill.remove();
    return;
  }
  if (!pill) {
    pill = document.createElement('div');
    pill.className = 'uv2-keybind-pill';
    pill.style.cssText = 'display:flex;align-items:center;gap:5px;background:#1e1e1e;border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:3px 9px 3px 7px;flex-shrink:0;margin-left:8px;pointer-events:none;position:relative;z-index:1;';
    const icon = document.createElement('i');
    icon.className = 'fa fa-keyboard-o';
    icon.style.cssText = 'font-size:11px;color:#888;';
    pill.appendChild(icon);
    const label = document.createElement('span');
    label.className = 'uv2-keybind-pill-label';
    label.style.cssText = 'font-size:11px;color:#aaa;font-family:MinibloxFont,sans-serif;white-space:nowrap;';
    pill.appendChild(label);
    mc.insertBefore(pill, mc._toggleWrap);
  }
  pill.querySelector('.uv2-keybind-pill-label').textContent = key;
}
function showBindPopup(moduleElement, moduleName) {
  const existing = document.getElementById('uv2-keybind-modal');
  if (existing) existing.remove();
  const modal = document.createElement('div');
  modal.id = 'uv2-keybind-modal';
  modal.style.cssText = 'position:fixed;inset:0;z-index:100003;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);backdrop-filter:blur(6px);';
  const box = document.createElement('div');
  box.style.cssText = 'background:#141414;border:1px solid rgba(255,255,255,0.09);border-radius:16px;padding:24px 28px;width:300px;font-family:MinibloxFont,sans-serif;color:#fff;box-shadow:0 16px 48px rgba(0,0,0,0.7);display:flex;flex-direction:column;gap:16px;';
  const heading = document.createElement('div');
  heading.style.cssText = 'font-size:20px;color:#fff;letter-spacing:0.5px;font-weight:600;';
  heading.textContent = `Bind key for ${moduleName}`;
  box.appendChild(heading);
  const keyDisplay = document.createElement('div');
  keyDisplay.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:10px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:14px;';
  const kbIcon = document.createElement('i');
  kbIcon.className = 'fa fa-keyboard-o';
  kbIcon.style.cssText = `color:${guiPrimaryColor};font-size:18px;`;
  keyDisplay.appendChild(kbIcon);
  const keyLabel = document.createElement('div');
  keyLabel.style.cssText = 'font-size:20px;color:#fff;min-width:80px;text-align:center;';
  keyLabel.textContent = moduleBindings[moduleName] || 'Press a key...';
  keyDisplay.appendChild(keyLabel);
  box.appendChild(keyDisplay);
  let pendingKey = moduleBindings[moduleName] || null;
  function onKey(e) {
  if (e.key === 'Escape') { e.preventDefault(); dismiss(); return; }
  e.preventDefault();
  e.stopPropagation();
  pendingKey = e.key;
  keyLabel.textContent = e.key;
}
  window.addEventListener('keydown', onKey, true);
  function dismiss() {
    window.removeEventListener('keydown', onKey, true);
    modal.remove();
    isBinding = false;
  }
  const makeBtn = (label, bg, border, onClick) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = bg === guiPrimaryColor ? "uv2-btn uv2-btn-primary" : "uv2-btn";
    btn.style.cssText = `flex:1;background:${bg};color:#fff;border:${border};border-radius:10px;padding:10px;cursor:pointer;font-family:MinibloxFont,sans-serif;font-size:13px;`;
    btn.addEventListener('click', onClick);
    return btn;
  };
  const btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex;gap:8px;';
  btnRow.appendChild(makeBtn('Bind', guiPrimaryColor, 'none', () => {
    if (pendingKey) {
      const conflictModule = Object.keys(moduleBindings).find(m => m !== moduleName && moduleBindings[m] === pendingKey);
      const uiKeyMatches = (uiKeybind === 'backtick' && pendingKey === '`') || (uiKeybind === 'rshift' && pendingKey === 'Shift') || (uiKeybind === 'backslash' && pendingKey === '\\');
      if (conflictModule) showNotification(`${pendingKey} is already bound to ${conflictModule}`);
      else if (uiKeyMatches) showNotification(`${pendingKey} conflicts with the UI keybind`);
      else { moduleBindings[moduleName] = pendingKey; saveModuleBindings(); updateModuleKeybindPill(moduleName, pendingKey); showNotification(`${moduleName} bound to ${pendingKey}`); }
    }
    dismiss();
  }));
  btnRow.appendChild(makeBtn('Unbind', '#2a2a2a', '1px solid #444', () => {
    if (moduleBindings[moduleName]) { delete moduleBindings[moduleName]; saveModuleBindings(); updateModuleKeybindPill(moduleName, null); showNotification(`${moduleName} unbound`); }
    else showNotification(`${moduleName} has no keybind`);
    dismiss();
  }));
  box.appendChild(btnRow);
  modal.appendChild(box);
  modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
  document.body.appendChild(modal);
  isBinding = true;
}

function sortModulesByFavorite() {
  const cards = [...gridContainer.children].filter(c => c.classList.contains('module-container'));
  const collapsed = loadCollapsedFolders();
  gridContainer.innerHTML = '';
  MODULE_FOLDERS.forEach(([id, label, icon]) => {
    const list = cards.filter(c => (c.dataset.favorited === '1' ? 'fav' : c.dataset.category) === id);
    if (!list.length) return;
    const header = document.createElement('div');
    header.className = 'uv2-folder' + (collapsed[id] ? ' collapsed' : '');
    header.dataset.folder = id;
    header.innerHTML = `<i class="fa fa-chevron-down uv2-folder-chev"></i><i class="fa ${icon} uv2-folder-icon"></i><span class="uv2-folder-name">${label}</span><span class="uv2-folder-on"></span><span class="uv2-folder-count"></span>`;
    header.addEventListener('click', () => {
      const state = loadCollapsedFolders();
      state[id] = !state[id];
      localStorage.setItem('uv2-folders-collapsed', JSON.stringify(state));
      header.classList.toggle('collapsed', state[id]);
      applyModuleFilter();
    });
    if (id === 'hud' && typeof hudOpenEditor === 'function') {
      const edit = document.createElement('span');
      edit.className = 'uv2-folder-action';
      edit.innerHTML = '<i class="fa fa-arrows"></i> Edit layout';
      edit.addEventListener('click', e => { e.stopPropagation(); hudOpenEditor(); });
      header.querySelector('.uv2-folder-count').before(edit);
    }
    gridContainer.appendChild(header);
    list.forEach(c => {
      c.dataset.folder = id;
      gridContainer.appendChild(c);
      if (c._drawer) gridContainer.appendChild(c._drawer);
    });
  });
  updateFolderCounts();
  applyModuleFilter();
}

function updateFolderCounts() {
  [...gridContainer.querySelectorAll('.uv2-folder')].forEach(header => {
    const cards = [...gridContainer.children].filter(c => c.classList.contains('module-container') && c.dataset.folder === header.dataset.folder);
    const on = cards.filter(c => c._uv2Active).length;
    header.querySelector('.uv2-folder-count').textContent = cards.length;
    const onEl = header.querySelector('.uv2-folder-on');
    onEl.textContent = on + ' on';
    onEl.style.display = on ? 'inline-block' : 'none';
  });
}

function createModule(name, description, category) {
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
  moduleContainer.dataset.category = category || MODULE_CATEGORIES[name] || 'utility';
  moduleContainer._uv2Active = false;

const shine = document.createElement("div");
shine.className = "uv2-shine";
moduleContainer.appendChild(shine);

  const favoriteKey = 'uv2-favorite-' + name;
  let isFavorited = localStorage.getItem(favoriteKey) === 'true';

  const favStrip = document.createElement("div");
  favStrip.style.cssText = `position:absolute;top:0;left:0;width:3px;height:100%;background:#ffd700;box-shadow:0 0 8px rgba(255,215,0,0.6);display:${isFavorited ? 'block' : 'none'};pointer-events:none;`;
  moduleContainer.appendChild(favStrip);

  const favoriteBtn = document.createElement("div");
  favoriteBtn.innerHTML = '<i class="fa fa-star"></i>';
  favoriteBtn.title = "Favorite";
  favoriteBtn.style.cssText = `font-size:13px;cursor:pointer;flex-shrink:0;margin-right:12px;color:${isFavorited ? '#ffd700' : '#3a3a3a'};text-shadow:${isFavorited ? '0 0 8px rgba(255,215,0,0.6)' : 'none'};transition:color 0.15s ease,transform 0.15s ease;position:relative;z-index:1;`;
  favoriteBtn.addEventListener("mouseenter", () => { favoriteBtn.style.transform = "scale(1.2)"; });
  favoriteBtn.addEventListener("mouseleave", () => { favoriteBtn.style.transform = "scale(1)"; });
  favoriteBtn.addEventListener("click", e => {
    e.stopPropagation();
    isFavorited = !isFavorited;
    localStorage.setItem(favoriteKey, isFavorited ? 'true' : 'false');
    favoriteBtn.style.color = isFavorited ? '#ffd700' : '#3a3a3a';
    favoriteBtn.style.textShadow = isFavorited ? '0 0 8px rgba(255,215,0,0.6)' : 'none';
    favStrip.style.display = isFavorited ? 'block' : 'none';
    moduleContainer.dataset.favorited = isFavorited ? '1' : '0';
    sortModulesByFavorite();
  });
  moduleContainer.dataset.favorited = isFavorited ? '1' : '0';
  favoriteBtn.className = "uv2-mod-fav";
  moduleContainer.appendChild(favoriteBtn);

  const nameSection = document.createElement("div");
  nameSection.style.cssText = "min-width:155px;flex-shrink:0;display:flex;align-items:center;gap:9px;";
  const moduleTitleEl = document.createElement("span");
  moduleTitleEl.textContent = name;
  moduleTitleEl.style.cssText = `color:${guiPrimaryColor};font-size:13.5px;font-family:MinibloxFont,sans-serif;white-space:nowrap;text-shadow:0 0 18px ${guiPrimaryColor}40;`;
  nameSection.appendChild(moduleTitleEl);
  nameSection.className = "uv2-mod-name";
  const textCol = document.createElement("div");
  textCol.className = "uv2-mod-text";
  textCol.appendChild(nameSection);
  moduleContainer.appendChild(textCol);

  const divider = document.createElement("div");
  divider.style.cssText = "width:1px;height:22px;background:rgba(255,255,255,0.09);flex-shrink:0;margin:0 16px;";
  divider.className = "uv2-mod-div";
  moduleContainer.appendChild(divider);

  const descEl = document.createElement("p");
  descEl.textContent = description;
  descEl.style.cssText = "flex:1;color:#6e6e6e;font-size:12px;font-family:MinibloxFont,sans-serif;margin:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;";
  descEl.className = "uv2-mod-desc";
  textCol.appendChild(descEl);

  const toggleWrap = document.createElement("div");
  toggleWrap.style.cssText = "width:36px;height:20px;border-radius:10px;background:#252525;flex-shrink:0;margin-left:14px;position:relative;transition:background 0.2s ease;border:1px solid rgba(255,255,255,0.07);";
  const toggleKnob = document.createElement("div");
 toggleKnob.style.cssText = "position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;background:#4a4a4a;transition:transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.2s ease;";
  toggleWrap.className = "uv2-mod-toggle";
  toggleKnob.className = "uv2-mod-knob";
  toggleWrap.appendChild(toggleKnob);
  moduleContainer.appendChild(toggleWrap);
  moduleContainer._toggleWrap = toggleWrap;
  moduleContainer._toggleKnob = toggleKnob;

  gridContainer.appendChild(moduleContainer);

  moduleContainer.addEventListener("mouseenter", () => {
  if (!moduleContainer._uv2Active) moduleContainer.style.background = "linear-gradient(135deg,#2c2c2c,#222222)";
});
moduleContainer.addEventListener("mouseleave", () => {
  if (!moduleContainer._uv2Active) moduleContainer.style.background = "linear-gradient(135deg,#242424,#1c1c1c)";
});
  moduleContainer.addEventListener("click", () => {
    if (!isBinding) {
      moduleContainer._uv2Active = !moduleContainer._uv2Active;
      const isActive = moduleContainer._uv2Active;
      moduleContainer.classList.toggle("uv2-on", isActive);
      if (!isRestoring) {
        if (settings.saving) localStorage.setItem('uv2-module-' + name, isActive ? 'true' : 'false');
        playModuleClickSound(isActive);
      }
      if (isActive) {
        moduleContainer.style.border = `1px solid ${guiPrimaryColor}80`;
        moduleContainer.style.background = `linear-gradient(135deg,${guiPrimaryColor}1a,#1a1a1a)`;
        moduleContainer.style.boxShadow = `0 0 0 3px ${guiPrimaryColor}14, 0 1px 4px rgba(0,0,0,0.4)`;
        toggleWrap.style.background = `${guiPrimaryColor}40`; toggleWrap.style.borderColor = `${guiPrimaryColor}60`;
        toggleKnob.style.background = guiPrimaryColor; toggleKnob.style.transform = "translateX(16px)";
        if (!isRestoring) showNotification(`${name} enabled`);
      } else {
        moduleContainer.style.border = "1px solid rgba(255,255,255,0.07)";
        moduleContainer.style.background = "linear-gradient(135deg,#242424,#1c1c1c)";
        moduleContainer.style.boxShadow = "0 1px 4px rgba(0,0,0,0.4)";
        toggleWrap.style.background = "#252525"; toggleWrap.style.borderColor = "rgba(255,255,255,0.07)";
        toggleKnob.style.background = "#4a4a4a"; toggleKnob.style.transform = "translateX(0)";
        if (!isRestoring) showNotification(`${name} disabled`);
      }
    }
  });
  moduleContainer.addEventListener("contextmenu", event => { event.preventDefault(); showBindPopup(moduleContainer, name); });
  return moduleContainer;
}

let isMuteChatActive = false;
let isChatFilterActive = false;
let chatFilterOriginalSubmit = null;
let chatOriginalAddChat = null;
let chatFilterMessageCache = [];
function chatFilterIsSpam(text) {
  const now = Date.now();
  chatFilterMessageCache = chatFilterMessageCache.filter(m => now - m.time < 10000);
  const similarMessages = chatFilterMessageCache.filter(m => m.text === text);
  if (similarMessages.length >= 2) {
    return true;
  }
  chatFilterMessageCache.push({ text, time: now });
  return false;
}

function chatFilterGetBlockReason(text) {
  if (chatFilterContainsBadWords(text)) return 'profanity';
  if (chatFilterContainsLink(text)) return 'link';
  if (chatFilterIsSpam(text)) return 'spam';
  return null;
}

function chatFilterShowBlockedNotice(reason) {
  try {
    const reactRoot = document.querySelector("#react");
    if (!reactRoot) return;
    const fiber = Object.values(reactRoot)[0];
    const game = fiber?.updateQueue?.baseState?.element?.props?.game;
    if (game && game.chat && typeof game.chat.addChat === "function") {
      const messages = {
        spam: "Please do not spam.",
        link: "Message included a link.",
        profanity: "Message included Profanity.",
      };
      game.chat.addChat({ text: `\\#FF0000\\${messages[reason]}\\reset\\` });
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
      if (chatObj.text.includes('Please do not spam.') || chatObj.text.includes('Message included Profanity.') || chatObj.text.includes('Message included a link.')) {
      return chatOriginalAddChat(chatObj);
    }
    if (isChatFilterActive) {
      const reason = chatFilterGetBlockReason(chatObj.text);
      if (reason) return;
    }
    if (typeof extrasProcessChat === 'function') {
      chatObj = extrasProcessChat(chatObj);
      if (!chatObj) return;
    }
    const result = chatOriginalAddChat(chatObj);
    if (typeof extrasAfterChat === 'function') extrasAfterChat(chat);
    return result;
  };
}

function restoreChatAddChatIfUnused() {
  if (isMuteChatActive || isChatFilterActive) return;
  if (typeof extrasChatInUse === 'function' && extrasChatInUse()) return;
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

const chatFilterModule = createModule(MODULE_NAMES.CHAT_FILTER, "Blocks swear words, links and spam from appearing in chat.");
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
    chatFilterMessageCache = [];
    if (chatFilterOriginalSubmit) chat.submit = chatFilterOriginalSubmit;
    restoreChatAddChatIfUnused();
  }
});

createModule(MODULE_NAMES.ANTI_AFK, "Presses WASD, arrow keys, and Space automatically to prevent being kicked.");
const antiAfkModule = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
let isAntiAfkActive=false, antiAfkInterval=null, antiAfkBox=null;
let antiAfkController = null;
if (antiAfkModule) {
  antiAfkModule.addEventListener("click", () => {
    isAntiAfkActive = !isAntiAfkActive;
    if (antiAfkController) { antiAfkController.abort(); antiAfkController = null; }
    if (isAntiAfkActive) {
      antiAfkController = new AbortController();
      const signal = antiAfkController.signal;
      antiAfkBox = document.createElement("div");
      antiAfkBox.id = "anti-afk-counter";
      antiAfkBox.style.cssText = "position:fixed;top:100px;left:20px;padding:8px 14px;background:rgba(0,0,0,0.6);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:8px;z-index:9999;cursor:move;user-select:none;font-family:'Segoe UI','Roboto',sans-serif;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,0,0,0.3);";
      const afkDot = document.createElement("div");
      afkDot.style.cssText = `width:10px;height:10px;border-radius:50%;background-color:${guiPrimaryColor};box-shadow:0 0 12px ${guiPrimaryColor}99;animation:afkPulse 1.5s infinite;`;
      const afkText = document.createElement("div");
      afkText.textContent = "Anti-AFK";
      afkText.style.cssText = `font-size:16px;font-weight:700;color:${guiPrimaryColor};letter-spacing:0.5px;`;
      antiAfkBox.appendChild(afkDot);
      antiAfkBox.appendChild(afkText);
      document.body.appendChild(antiAfkBox);
      let isDrag=false, offX=0, offY=0;
      antiAfkBox.addEventListener("mousedown", e => { isDrag=true; offX=e.clientX-antiAfkBox.getBoundingClientRect().left; offY=e.clientY-antiAfkBox.getBoundingClientRect().top; e.preventDefault(); });
      document.addEventListener("mousemove", e => {
        if (isDrag) {
          const rect = antiAfkBox.getBoundingClientRect();
          let left = e.clientX-offX;
          let top = e.clientY-offY;
          const maxLeft = window.innerWidth - rect.width;
          const maxTop = window.innerHeight - rect.height;
          if (left < 0) left = 0;
          if (top < 0) top = 0;
          if (left > maxLeft) left = maxLeft;
          if (top > maxTop) top = maxTop;
          antiAfkBox.style.left = `${left}px`;
          antiAfkBox.style.top = `${top}px`;
        }
      }, { signal });
      document.addEventListener("mouseup", () => { isDrag=false; }, { signal });
      const keys=[['w','KeyW',87],['a','KeyA',65],['s','KeyS',83],['d','KeyD',68],[' ','Space',32],['ArrowUp','ArrowUp',38],['ArrowDown','ArrowDown',40],['ArrowLeft','ArrowLeft',37],['ArrowRight','ArrowRight',39]];
      let idx=0;
      antiAfkInterval = setInterval(() => {
        const [key,code,keyCode]=keys[idx]; idx=(idx+1)%keys.length;
        const t=document.activeElement||document.body;
        t.dispatchEvent(new KeyboardEvent('keydown',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true}));
        setTimeout(()=>t.dispatchEvent(new KeyboardEvent('keyup',{key,code,keyCode,which:keyCode,bubbles:true,cancelable:true})),50);
      }, 500);
    } else {
      if (antiAfkInterval) clearInterval(antiAfkInterval);
      if (antiAfkBox) antiAfkBox.remove();
    }
  });
}

const ARMOR_SLOT_LABELS = ['Helmet', 'Chestplate', 'Leggings', 'Boots'];
const ARMOR_ROMAN = ['', 'I', 'II', 'III', 'IV', 'V'];
const ARMOR_SPRITESHEET_URL = 'https://miniblox.io/textures/spritesheet.36511680aea3.png';
const ARMOR_SPRITESHEET_SIZE = 1024;
const ARMOR_ICON_TILE_SIZE = 16;
const ARMOR_ICON_DISPLAY_SIZE = 24;

const ARMOR_ENCHANT_ABBR = {
  protection: 'Prot', fire_protection: 'Fire Prot',
  feather_falling: 'Feath Fall', blast_protection: 'Blast Prot',
  projectile_protection: 'Proj Prot', respiration: 'Resp',
  aqua_affinity: 'Aqua Aff', thorns: 'Thorns',
  depth_strider: 'Depth Str', soul_speed: 'Soul Speed',
  swift_sneak: 'Swift Sneak', unbreaking: 'Unb',
  mending: 'Mend',
};

const armorHudColorForPercent = p => p >= 60 ? '#2ecc71' : p >= 30 ? '#f39c12' : '#e74c3c';
const armorHudFormatEnchantName = s => s.split('_').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
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

function armorHudGetIconStyle(itemName, size = ARMOR_ICON_DISPLAY_SIZE) {
  const spriteMap = unsafeWindow.spriteMap;
  if (!spriteMap || !spriteMap.get) return '';
  const sprite = spriteMap.get(itemName);
  if (!sprite) return '';
  const pixelX = sprite.x * sprite.size;
  const pixelY = sprite.y * sprite.size;
  const scale = size / ARMOR_ICON_TILE_SIZE;
  const bgWidth = ARMOR_SPRITESHEET_SIZE * scale;
  const bgHeight = ARMOR_SPRITESHEET_SIZE * scale;
  const posX = -pixelX * scale;
  const posY = -pixelY * scale;
  return `width:${size}px;height:${size}px;background-image:url('${ARMOR_SPRITESHEET_URL}');background-position:${posX}px ${posY}px;background-size:${bgWidth}px ${bgHeight}px;image-rendering:pixelated;flex-shrink:0;`;
}

var extrasReady = false;
const EXT_SKY_BASE = 'https://raw.githubusercontent.com/lttlgrl/Miniblox.io-Sky-API/main/skies/';
const extClamp = (x, a, b) => (x < a ? a : x > b ? b : x);
const extRand = (a, b) => a + Math.random() * (b - a);
const extSleep = ms => new Promise(r => setTimeout(r, ms));
const extHex = hex => { const n = parseInt(String(hex).replace('#', ''), 16) || 0; return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]; };
const extStrip = s => String(s || '').replace(/\\[^\\]*\\/g, '');
const extFmtTime = sec => { sec = Math.max(0, Math.floor(sec)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return (h ? h + ':' + String(m).padStart(2, '0') : m) + ':' + String(s).padStart(2, '0'); };
const extKeyLabel = k => !k ? 'None' : k === ' ' ? 'Space' : k.length === 1 ? k.toUpperCase() : k;
function extGame() {
  try { return Object.values(document.querySelector("#react"))[0].updateQueue.baseState.element.props.game; } catch(e) { return null; }
}
function extLoad(key, def) {
  try { const v = JSON.parse(localStorage.getItem('uv2-x-' + key)); return v == null ? def : v; } catch(e) { return def; }
}
function extSave(key, val) { localStorage.setItem('uv2-x-' + key, JSON.stringify(val)); }

const extDb = (() => {
  let p = null;
  const open = () => p || (p = new Promise((res, rej) => {
    const r = indexedDB.open('uv2-extras', 1);
    r.onupgradeneeded = () => {
      const d = r.result;
      if (!d.objectStoreNames.contains('skies')) d.createObjectStore('skies', { keyPath: 'id' });
      if (!d.objectStoreNames.contains('assets')) d.createObjectStore('assets', { keyPath: 'id' });
    };
    r.onsuccess = () => res(r.result);
    r.onerror = () => rej(r.error);
  }));
  const tx = async (name, mode, fn) => {
    const d = await open();
    return new Promise((res, rej) => {
      const t = d.transaction(name, mode);
      const out = fn(t.objectStore(name));
      t.oncomplete = () => res(out && out.result !== undefined ? out.result : out);
      t.onerror = () => rej(t.error);
    });
  };
  return {
    put: (n, v) => tx(n, 'readwrite', s => s.put(v)),
    del: (n, id) => tx(n, 'readwrite', s => s.delete(id)),
    get: (n, id) => tx(n, 'readonly', s => s.get(id)),
    all: n => tx(n, 'readonly', s => s.getAll())
  };
})();

let G = null;
let T = null;
let sky = null;

function createSkyEngine(game) {
  const gameScene = game.gameScene;
  const gsky = gameScene.sky;
  const atmosphere = gsky.atmosphere;
  const Mesh = atmosphere.constructor, ShaderMaterial = atmosphere.material.constructor, SphereGeometry = atmosphere.geometry.constructor;
  const Vector3 = atmosphere.material.uniforms.sunDirection.value.constructor, Color = atmosphere.material.uniforms.horizonColor.value.constructor;
  let Texture = null;
  gameScene.scene.traverse(o => { if (!Texture && o.material && o.material.map) Texture = o.material.map.constructor; });
  const fragment = [
    'uniform sampler2D facePX; uniform sampler2D faceNX; uniform sampler2D facePY; uniform sampler2D faceNY; uniform sampler2D facePZ; uniform sampler2D faceNZ; uniform sampler2D panorama;',
    'uniform float mode; uniform float rotation; uniform float brightness; uniform vec3 tint; uniform float opacity; varying vec3 vDir;',
    'vec2 cubeUv(vec2 p, float m) { vec2 uv = p / m * 0.5 + 0.5; uv.y = 1.0 - uv.y; return uv; }',
    'vec3 sampleCube(vec3 d) { d.x = -d.x; vec3 a = abs(d);',
    '  if (a.x >= a.y && a.x >= a.z) { return d.x > 0.0 ? texture2D(facePX, cubeUv(vec2(-d.z, -d.y), a.x)).rgb : texture2D(faceNX, cubeUv(vec2(d.z, -d.y), a.x)).rgb; }',
    '  if (a.y >= a.z) { return d.y > 0.0 ? texture2D(facePY, cubeUv(vec2(d.x, d.z), a.y)).rgb : texture2D(faceNY, cubeUv(vec2(d.x, -d.z), a.y)).rgb; }',
    '  return d.z > 0.0 ? texture2D(facePZ, cubeUv(vec2(d.x, -d.y), a.z)).rgb : texture2D(faceNZ, cubeUv(vec2(-d.x, -d.y), a.z)).rgb; }',
    'vec3 samplePanorama(vec3 d) { return texture2D(panorama, vec2(atan(d.z, d.x) * 0.15915494 + 0.5, asin(clamp(d.y, -1.0, 1.0)) * 0.31830989 + 0.5)).rgb; }',
    'void main() { vec3 d = normalize(vDir); float c = cos(rotation), s = sin(rotation); d = vec3(c * d.x - s * d.z, d.y, s * d.x + c * d.z);',
    '  vec3 color = mode < 0.5 ? sampleCube(d) : samplePanorama(d); gl_FragColor = vec4(color * tint * brightness, opacity); }'
  ].join('\n');
  const vertex = 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';
  const U = { facePX: { value: null }, faceNX: { value: null }, facePY: { value: null }, faceNY: { value: null }, facePZ: { value: null }, faceNZ: { value: null }, panorama: { value: null }, mode: { value: 0 }, rotation: { value: 0 }, brightness: { value: 1 }, tint: { value: new Color(1, 1, 1) }, opacity: { value: 1 } };
  const defaults = { rotation: 0, rotationSpeed: 0, brightness: 1, tint: [1, 1, 1], dayNight: true, nightBrightness: 0.25, blend: 'always', hideSun: false, hideMoon: false, hideStars: false, hideClouds: false, fogColor: null, weatherDim: true };
  const options = Object.assign({}, defaults);
  let mesh = null, textures = [], origUpdate = null, last = performance.now(), flashUntil = 0, flashLen = 1;
  const camPos = new Vector3();

  function makeTexture(img, repeat) {
    const t = new Texture(img);
    t.minFilter = 1006; t.magFilter = 1006; t.generateMipmaps = false;
    t.wrapS = repeat ? 1000 : 1001; t.wrapT = 1001; t.needsUpdate = true;
    return t;
  }
  function loadImage(src) {
    if (src instanceof HTMLCanvasElement) return Promise.resolve(src);
    return new Promise((res, rej) => {
      const img = new Image();
      const blob = src instanceof Blob;
      const url = blob ? URL.createObjectURL(src) : src;
      img.crossOrigin = 'anonymous';
      img.onload = () => { if (blob) URL.revokeObjectURL(url); res(img); };
      img.onerror = () => { if (blob) URL.revokeObjectURL(url); rej(new Error('Could not load sky image')); };
      img.src = url;
    });
  }
  function downscale(img, max) {
    const w = img.naturalWidth || img.width, h = img.naturalHeight || img.height;
    if (!max || (w <= max && h <= max)) return img;
    const k = max / Math.max(w, h), c = document.createElement('canvas');
    c.width = Math.round(w * k); c.height = Math.round(h * k);
    const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(img, 0, 0, c.width, c.height);
    return c;
  }
  function ensureMesh() {
    if (mesh) return;
    const blankCanvas = document.createElement('canvas'); blankCanvas.width = blankCanvas.height = 1;
    const blank = makeTexture(blankCanvas, false);
    ['facePX', 'faceNX', 'facePY', 'faceNY', 'facePZ', 'faceNZ', 'panorama'].forEach(k => U[k].value = blank);
    const mat = new ShaderMaterial({ uniforms: U, vertexShader: vertex, fragmentShader: fragment, side: 1, depthWrite: false, depthTest: false, fog: false, transparent: false });
    mat.blending = 5; mat.blendEquation = 100; mat.blendSrc = 204; mat.blendDst = 205;
    mesh = new Mesh(new SphereGeometry(4900, 32, 16), mat);
    mesh.renderOrder = -0.5; mesh.frustumCulled = false; mesh.visible = false;
    gameScene.ambientMeshes.add(mesh);
  }
  function restoreHidden() {
    if (gsky.sun.sun) gsky.sun.sun.visible = true;
    if (gsky.sun.moon) gsky.sun.moon.visible = true;
    if (gameScene.stars && gameScene.stars.stars) gameScene.stars.stars.visible = true;
    if (gameScene.clouds && gameScene.clouds.mesh) gameScene.clouds.mesh.visible = true;
  }
  function apply() {
    const now = performance.now(), dt = Math.min(0.25, (now - last) / 1000);
    last = now;
    const o = options, s = gsky.sun;
    const day = extClamp(s.offset.y / s.sunDist * 2 + 0.5, 0, 1);
    o.rotation = (o.rotation + o.rotationSpeed * dt) % 360;
    let b = o.brightness;
    if (o.dayNight) b *= o.nightBrightness + (1 - o.nightBrightness) * day;
    if (o.weatherDim) { let rain = 0; try { rain = game.world ? game.world.getRainStrength(1) || 0 : 0; } catch(e) {} b *= 1 - 0.45 * extClamp(rain, 0, 1); }
    if (now < flashUntil) b *= 1 + 1.6 * ((flashUntil - now) / flashLen);
    U.rotation.value = o.rotation * Math.PI / 180;
    U.brightness.value = b;
    U.tint.value.setRGB(o.tint[0], o.tint[1], o.tint[2]);
    if (o.blend === 'night') U.opacity.value = 1 - day;
    else { U.opacity.value = 1; atmosphere.visible = false; gameScene.scene.background = null; }
    gameScene.camera.getWorldPosition(camPos);
    mesh.position.copy(camPos);
    mesh.visible = true;
    if (o.hideSun && s.sun) s.sun.visible = false;
    if (o.hideMoon && s.moon) s.moon.visible = false;
    if (o.hideStars && gameScene.stars && gameScene.stars.stars) gameScene.stars.stars.visible = false;
    if (o.hideClouds && gameScene.clouds && gameScene.clouds.mesh) gameScene.clouds.mesh.visible = false;
    if (o.fogColor) {
      if (gsky.color && gsky.color.setRGB) gsky.color.setRGB(o.fogColor[0], o.fogColor[1], o.fogColor[2]);
      if (gameScene.scene.fog) gameScene.scene.fog.color.setRGB(o.fogColor[0], o.fogColor[1], o.fogColor[2]);
    }
  }
  function hook() {
    if (origUpdate) return;
    origUpdate = gsky.update;
    gsky.update = function() { const r = origUpdate.apply(this, arguments); try { apply(); } catch(e) {} return r; };
  }
  function unhook() {
    if (!origUpdate) return;
    if (Object.prototype.hasOwnProperty.call(gsky, 'update')) delete gsky.update;
    origUpdate = null;
  }
  function setOptions(op) {
    if (!op) return;
    const hadHidden = options.hideSun || options.hideMoon || options.hideStars || options.hideClouds;
    Object.assign(options, op);
    if (hadHidden) restoreHidden();
  }
  function resetOptions(op) {
    const rot = options.rotation;
    Object.assign(options, defaults, { rotation: rot });
    restoreHidden();
    setOptions(op);
  }
  function useTextures(list) { textures.forEach(t => t.dispose()); textures = list; }
  return {
    Texture, Mesh, ShaderMaterial, SphereGeometry, Vector3, Color, makeTexture,
    get options() { return options; },
    get mesh() { return mesh; },
    setOptions, resetOptions,
    async setCube(faces, op, max) {
      const imgs = await Promise.all(faces.map(loadImage));
      ensureMesh();
      useTextures(imgs.map(i => makeTexture(downscale(i, max), false)));
      ['facePX', 'faceNX', 'facePY', 'faceNY', 'facePZ', 'faceNZ'].forEach((k, i) => U[k].value = textures[i]);
      U.mode.value = 0;
      resetOptions(op);
      hook();
    },
    async setPanorama(src, op, max) {
      const img = await loadImage(src);
      ensureMesh();
      useTextures([makeTexture(downscale(img, max ? max * 4 : 0), true)]);
      U.panorama.value = textures[0];
      U.mode.value = 1;
      resetOptions(op);
      hook();
    },
    async loadPreset(id, max, overrides) {
      const base = EXT_SKY_BASE + id + '/';
      const pack = await fetch(base + 'sky.json', { cache: 'no-cache' }).then(r => { if (!r.ok) throw new Error('Sky not found'); return r.json(); });
      const op = Object.assign({}, pack.options, overrides);
      if (pack.type === 'panorama') await this.setPanorama(base + pack.image, op, max);
      else await this.setCube((pack.faces || ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(f => f + '.webp')).map(f => base + f), op, max);
      return pack;
    },
    async listPresets() {
      const list = await fetch(EXT_SKY_BASE + 'index.json', { cache: 'no-cache' }).then(r => r.json());
      return list.map(p => Object.assign({}, p, { preview: EXT_SKY_BASE + p.preview }));
    },
    flash(ms = 260) { flashLen = ms; flashUntil = performance.now() + ms; },
    remove() { unhook(); if (mesh) mesh.visible = false; useTextures([]); restoreHidden(); }
  };
}

function extDiscoverThree(gs) {
  const stars = gs.stars.stars;
  return {
    Mesh: sky.Mesh, ShaderMaterial: sky.ShaderMaterial, SphereGeometry: sky.SphereGeometry, Texture: sky.Texture, Color: sky.Color, Vector3: sky.Vector3,
    Points: stars.constructor, PointsMaterial: stars.material.constructor, BufferGeometry: stars.geometry.constructor,
    BufferAttribute: stars.geometry.attributes.position.constructor, Matrix4: gs.camera.matrix.constructor, PerspectiveCamera: gs.camera.constructor
  };
}

const extHooks = new Map();
function extAfter(obj, name, fn) {
  if (!obj) return () => {};
  let entry = extHooks.get(obj);
  if (!entry) { entry = {}; extHooks.set(obj, entry); }
  if (!entry[name]) {
    const list = [];
    const base = Object.prototype.hasOwnProperty.call(obj, name) ? obj[name] : Object.getPrototypeOf(obj)[name];
    obj[name] = function() {
      const r = base.apply(this, arguments);
      for (const f of list) { try { f(); } catch(e) {} }
      return r;
    };
    entry[name] = list;
  }
  entry[name].push(fn);
  return () => { const l = entry[name]; const i = l.indexOf(fn); if (i >= 0) l.splice(i, 1); };
}

let extAudio = null;
const extCtx = () => extAudio || (extAudio = new (window.AudioContext || window.webkitAudioContext)());
function extBeep(freq = 880, ms = 120, vol = 0.15) {
  try {
    const a = extCtx(), o = a.createOscillator(), g = a.createGain();
    o.type = 'sine'; o.frequency.value = freq;
    g.gain.setValueAtTime(vol, a.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + ms / 1000);
    o.connect(g).connect(a.destination);
    o.start(); o.stop(a.currentTime + ms / 1000 + 0.02);
  } catch(e) {}
}
function extThunder(delay = 0.5, vol = 0.5) {
  try {
    const a = extCtx(), len = a.sampleRate * 3.2, buf = a.createBuffer(1, len, a.sampleRate), d = buf.getChannelData(0);
    let lastS = 0;
    for (let i = 0; i < len; i++) {
      lastS = lastS * 0.97 + (Math.random() * 2 - 1) * 0.03;
      const t = i / a.sampleRate;
      d[i] = lastS * Math.min(1, t * 8) * Math.exp(-t * 1.1) * (0.6 + 0.4 * Math.sin(t * 9) * Math.sin(t * 3.1)) * 9;
    }
    const src = a.createBufferSource(); src.buffer = buf;
    const lp = a.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 420;
    const g = a.createGain(); g.gain.value = vol;
    src.connect(lp).connect(g).connect(a.destination);
    src.start(a.currentTime + delay);
  } catch(e) {}
}

function extGlyph(kind) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d');
  if (kind === 'heart' || kind === 'star' || kind === 'petal') {
    x.fillStyle = '#fff'; x.font = '52px serif'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.shadowColor = '#fff'; x.shadowBlur = 8;
    x.fillText(kind === 'heart' ? '♥' : kind === 'star' ? '★' : '❀', 32, 36);
  } else {
    const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(kind === 'spark' ? 0.15 : 0.35, 'rgba(255,255,255,0.85)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64);
  }
  const t = new T.Texture(c);
  t.needsUpdate = true;
  return t;
}

class ExtParticles {
  constructor(max, glyph, size) {
    this.max = max; this.list = [];
    this.pos = new Float32Array(max * 3); this.col = new Float32Array(max * 3);
    this.geo = new T.BufferGeometry();
    this.geo.setAttribute('position', new T.BufferAttribute(this.pos, 3));
    this.geo.setAttribute('color', new T.BufferAttribute(this.col, 3));
    this.points = new T.Points(this.geo, new T.PointsMaterial({ size, map: extGlyph(glyph), vertexColors: true, transparent: true, depthWrite: false, sizeAttenuation: true, fog: false, blending: 2 }));
    this.points.frustumCulled = false;
    this.points.renderOrder = 5;
    G.gameScene.ambientMeshes.add(this.points);
  }
  spawn(p) { if (this.list.length >= this.max) this.list.shift(); p.max = p.life; this.list.push(p); }
  update(dt) {
    const L = this.list;
    for (let i = L.length - 1; i >= 0; i--) {
      const p = L[i];
      p.life -= dt;
      if (p.life <= 0) { L.splice(i, 1); continue; }
      p.vy -= (p.gravity || 0) * dt;
      const drag = Math.pow(p.drag || 1, dt * 60);
      p.vx *= drag; p.vy *= drag; p.vz *= drag;
      if (p.wobble) { p.vx += Math.sin(p.life * 3 + p.seed) * p.wobble * dt; p.vz += Math.cos(p.life * 2.3 + p.seed) * p.wobble * dt; }
      p.x += p.vx * dt; p.y += p.vy * dt; p.z += p.vz * dt;
    }
    let n = 0;
    for (const p of L) {
      const f = p.fadeIn ? Math.min(1, (p.max - p.life) / p.fadeIn) : 1;
      const a = Math.min(1, p.life / (p.fadeOut || p.max)) * f * (p.flicker ? 0.55 + 0.45 * Math.sin(performance.now() / 160 + p.seed) : 1);
      this.pos[n * 3] = p.x; this.pos[n * 3 + 1] = p.y; this.pos[n * 3 + 2] = p.z;
      this.col[n * 3] = p.r * a; this.col[n * 3 + 1] = p.g * a; this.col[n * 3 + 2] = p.b * a;
      n++;
    }
    this.geo.setDrawRange(0, n);
    this.geo.attributes.position.needsUpdate = true;
    this.geo.attributes.color.needsUpdate = true;
  }
}
let extFx = null;
function extParticles() {
  if (extFx || !T) return extFx;
  extFx = { spark: new ExtParticles(1500, 'spark', 0.22), soft: new ExtParticles(1500, 'soft', 0.35), heart: new ExtParticles(400, 'heart', 0.45), star: new ExtParticles(400, 'star', 0.4), petal: new ExtParticles(600, 'petal', 0.3), sky: new ExtParticles(1200, 'soft', 7) };
  return extFx;
}

const extPlayerPos = () => { const p = G && G.player && G.player.pos; return p ? { x: p.x, y: p.y, z: p.z } : null; };
const extCamPos = () => { const v = new T.Vector3(); G.gameScene.camera.getWorldPosition(v); return v; };
const extDayFactor = () => { const s = G.gameScene.sun; return extClamp(s.offset.y / s.sunDist * 2 + 0.5, 0, 1); };
const extInWorld = () => !!(G && G._state === 6 && G.player);
function extPrint(text) { try { G.chat.addChat({ text: '\\#BF3011\\[UV2]\\reset\\ ' + text }); } catch(e) {} }
function extSendChat(text) {
  const chat = G && G.chat;
  if (!chat) return;
  const prev = chat.inputValue, prevCh = chat.channel;
  try {
    if (chat.setChannel && chat.channel !== 'game') chat.setChannel('game');
    chat.setInputValue ? chat.setInputValue(text) : (chat.inputValue = text);
    chat.isInputCommandMode = false;
    chat.isInputWorldEditMode = false;
    chat.submit(G);
  } finally {
    chat.setInputValue ? chat.setInputValue(prev || '') : (chat.inputValue = prev || '');
    if (chat.setChannel && prevCh && chat.channel !== prevCh) { try { chat.setChannel(prevCh); } catch(e) {} }
  }
}

const extLastPositions = new Map();
function extTrackEntities() {
  const list = G.world && G.world.loadedEntityList;
  if (!list) return;
  const now = performance.now();
  for (const e of list) if (e && e.name && e.pos) extLastPositions.set(e.name, { x: e.pos.x, y: e.pos.y, z: e.pos.z, t: now });
}

function extBurst(kind, x, y, z, o = {}) {
  const P = extParticles();
  if (!P) return;
  const color = o.color || [1, 1, 1];
  for (let i = 0; i < (o.count || 24); i++) {
    const a = Math.random() * Math.PI * 2, b = Math.acos(extRand(-1, 1)), sp = extRand(o.speedMin || 1.5, o.speed || 4);
    const c = o.rainbow ? extHex('#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')) : color;
    P[kind].spawn({ x: x + extRand(-0.15, 0.15), y: y + extRand(-0.15, 0.15), z: z + extRand(-0.15, 0.15), vx: Math.sin(b) * Math.cos(a) * sp, vy: Math.cos(b) * sp + (o.up || 0), vz: Math.sin(b) * Math.sin(a) * sp, life: extRand(o.lifeMin || 0.5, o.life || 1.1), gravity: o.gravity ?? 6, drag: o.drag ?? 0.94, r: c[0], g: c[1], b: c[2], seed: Math.random() * 10 });
  }
}

function extStrike(x, y, z, sound = true, vol = 0.5) {
  if (!G) return;
  const pp = extPlayerPos();
  if (x == null && pp) {
    const a = Math.random() * Math.PI * 2, d = extRand(25, 90);
    x = pp.x + Math.cos(a) * d; z = pp.z + Math.sin(a) * d; y = pp.y - 4;
  }
  try { G.gameScene.weather.addBolt(Math.floor(x), Math.floor(y), Math.floor(z)); } catch(e) {}
  try { sky && sky.flash(280); } catch(e) {}
  if (sound && pp) {
    const dist = Math.hypot(x - pp.x, z - pp.z);
    extThunder(Math.min(3, dist / 343), vol * extClamp(1.4 - dist / 140, 0.25, 1));
  }
}

function extEffect(kind, x, y, z, color, sound) {
  const c = extHex(color || '#ffffff');
  if (kind === 'lightning') extStrike(x, y - 1, z, sound, 0.6);
  else if (kind === 'firework') { extBurst('spark', x, y + 1.5, z, { count: 90, speed: 6, speedMin: 3, gravity: 3, drag: 0.93, life: 1.6, color: c }); extBurst('soft', x, y + 1.5, z, { count: 20, speed: 2, gravity: 1, life: 0.6 }); if (sound) extBeep(220, 300, 0.12); }
  else if (kind === 'hearts') extBurst('heart', x, y + 1.2, z, { count: 18, speed: 2.2, speedMin: 0.8, gravity: -0.6, drag: 0.95, life: 1.8, color: [1, 0.3, 0.45], up: 1 });
  else if (kind === 'smoke') extBurst('soft', x, y + 1, z, { count: 45, speed: 1.4, gravity: -1.2, drag: 0.96, life: 2, color: [0.35, 0.35, 0.38] });
  else if (kind === 'stars') extBurst('star', x, y + 1, z, { count: 14, speed: 3, gravity: 4, life: 0.9, color: c });
  else if (kind === 'crit') extBurst('spark', x, y + 1, z, { count: 16, speed: 3.5, gravity: 7, life: 0.6, color: [1, 0.85, 0.45] });
  else if (kind === 'sparks') extBurst('spark', x, y + 1, z, { count: 22, speed: 5, gravity: 10, life: 0.5, color: c });
  else if (kind === 'flames') extBurst('soft', x, y + 0.8, z, { count: 18, speed: 1.2, gravity: -3, drag: 0.92, life: 0.7, color: [1, 0.45, 0.1] });
}

const extModules = [];
const extById = id => extModules.find(m => m.id === id);
function extDefine(m) {
  m.settings = Object.assign({}, m.defaults, extLoad('mod-' + m.id, {}));
  m.on = false;
  extModules.push(m);
  return m;
}
function extSaveSettings(m) { extSave('mod-' + m.id, m.settings); }

const weatherState = { world: null, wrapped: null };
extDefine({
  id: 'weather', cat: 'world', name: 'Weather', desc: 'Client-side rain, storms and snow using the game\'s weather.',
  defaults: { mode: 'rain', intensity: 1 },
  controls: [
    { key: 'mode', type: 'seg', label: 'Weather', options: [['server', 'Server'], ['clear', 'Clear'], ['rain', 'Rain'], ['storm', 'Storm'], ['snow', 'Snow']] },
    { key: 'intensity', type: 'slider', label: 'Intensity', min: 0.1, max: 1, step: 0.05, fmt: v => Math.round(v * 100) + '%' }
  ],
  install() {
    const w = G.world;
    if (!w || weatherState.world === w) return;
    this.uninstall();
    weatherState.world = w;
    const proto = Object.getPrototypeOf(w), s = this.settings;
    w.getRainStrength = function(p) { return s.mode === 'server' ? proto.getRainStrength.call(this, p) : s.mode === 'clear' ? 0 : s.intensity; };
    w.getThunderStrength = function(p) { return s.mode === 'server' ? proto.getThunderStrength.call(this, p) : s.mode === 'storm' ? s.intensity : 0; };
    const W = G.gameScene.weather;
    if (!weatherState.wrapped) {
      const base = Object.getPrototypeOf(W).computeColumn;
      W.computeColumn = function() { const r = base.apply(this, arguments); if (r && s.mode === 'snow' && r.kind === 1) r.kind = 2; return r; };
      weatherState.wrapped = W;
    }
    try { W.columnCache.clear(); } catch(e) {}
  },
  uninstall() {
    const w = weatherState.world;
    if (w) { delete w.getRainStrength; delete w.getThunderStrength; }
    weatherState.world = null;
    if (weatherState.wrapped) { delete weatherState.wrapped.computeColumn; weatherState.wrapped = null; }
    try { G.gameScene.weather.columnCache.clear(); } catch(e) {}
  },
  enable() { this.install(); },
  disable() { this.uninstall(); },
  change() { try { G.gameScene.weather.columnCache.clear(); } catch(e) {} },
  frame() { if (G.world !== weatherState.world) this.install(); }
});

let extNextStrike = 0;
extDefine({
  id: 'lightning', cat: 'world', name: 'Lightning', desc: 'Random lightning strikes with thunder.',
  defaults: { perMinute: 6, stormOnly: true, sound: true, volume: 0.6 },
  controls: [
    { key: 'perMinute', type: 'slider', label: 'Strikes per minute', min: 1, max: 40, step: 1, fmt: v => v },
    { key: 'stormOnly', type: 'toggle', label: 'Only during storms' },
    { key: 'sound', type: 'toggle', label: 'Thunder sound' },
    { key: 'volume', type: 'slider', label: 'Thunder volume', min: 0, max: 1, step: 0.05, fmt: v => Math.round(v * 100) + '%' },
    { type: 'bind', label: 'Strike key', action: 'strike' }
  ],
  frame() {
    const s = this.settings, now = performance.now();
    if (s.stormOnly) { let th = 0; try { th = G.world.getThunderStrength(1); } catch(e) {} if (th <= 0.05) { extNextStrike = 0; return; } }
    if (!extNextStrike) extNextStrike = now + extRand(0.3, 1.7) * 60000 / s.perMinute;
    if (now >= extNextStrike) { extStrike(null, null, null, s.sound, s.volume); extNextStrike = now + extRand(0.3, 1.7) * 60000 / s.perMinute; }
  }
});

const timeState = { world: null, real: 0, clock: 0 };
const extHourToTick = h => (((h - 6) % 24 + 24) % 24) * 1000;
extDefine({
  id: 'time', cat: 'world', name: 'Time Changer', desc: 'Lock the time of day or run your own day cycle.',
  defaults: { mode: 'lock', hour: 21, speed: 4 },
  controls: [
    { key: 'mode', type: 'seg', label: 'Mode', options: [['lock', 'Locked'], ['cycle', 'Custom cycle']] },
    { key: 'hour', type: 'slider', label: 'Time', min: 0, max: 23.99, step: 0.05, fmt: v => String(Math.floor(v)).padStart(2, '0') + ':' + String(Math.floor((v % 1) * 60)).padStart(2, '0'), show: s => s.mode === 'lock' },
    { type: 'buttons', label: 'Presets', buttons: [['Sunrise', 6], ['Noon', 12], ['Sunset', 18], ['Midnight', 0]], onClick: (m, v) => { m.settings.hour = v; m.settings.mode = 'lock'; }, show: s => s.mode === 'lock' },
    { key: 'speed', type: 'slider', label: 'Cycle speed', min: 0.1, max: 30, step: 0.1, fmt: v => v.toFixed(1) + 'x', show: s => s.mode === 'cycle' }
  ],
  install() {
    const w = G.world;
    if (!w || timeState.world === w) return;
    this.uninstall();
    timeState.world = w;
    timeState.real = w.worldTime || 0;
    timeState.clock = timeState.real;
    let shown = 0;
    const s = this.settings;
    Object.defineProperty(w, 'worldTime', {
      configurable: true,
      get() { shown = s.mode === 'cycle' ? Math.floor(timeState.clock) : extHourToTick(s.hour); return shown; },
      set(v) { if (v === shown + 1) timeState.real += 1; else timeState.real = v; }
    });
  },
  uninstall() {
    const w = timeState.world;
    if (w) { delete w.worldTime; w.worldTime = timeState.real; }
    timeState.world = null;
  },
  enable() { this.install(); },
  disable() { this.uninstall(); },
  frame(dt) {
    if (G.world !== timeState.world) this.install();
    if (this.settings.mode === 'cycle') timeState.clock += dt * 20 * this.settings.speed;
  }
});

let skyPhase = null;
extDefine({
  id: 'daynight', cat: 'sky', name: 'Day & Night Skies', desc: 'Switches to a different sky when night falls.',
  defaults: { day: 'overflow-day', night: 'black' },
  controls: [
    { key: 'day', type: 'skyselect', label: 'Day sky' },
    { key: 'night', type: 'skyselect', label: 'Night sky' }
  ],
  enable() { skyPhase = null; const p = extById('playlist'); if (p.on) extToggle(p, false); },
  disable() { skyRestoreChoice(); },
  frame() {
    if (!sky || !skyState.enabled || skyLoading) return;
    const phase = extDayFactor() > 0.5 ? 'day' : 'night';
    if (phase === skyPhase) return;
    skyPhase = phase;
    const id = this.settings[phase];
    if (id && id !== skyShownKey) skyApply(id, true, true);
  }
});

let playlistNext = 0;
extDefine({
  id: 'playlist', cat: 'sky', name: 'Sky Playlist', desc: 'Rotates through skies automatically.',
  defaults: { minutes: 5, shuffle: true, include: 'all' },
  controls: [
    { key: 'minutes', type: 'slider', label: 'Change every', min: 0.5, max: 60, step: 0.5, fmt: v => v + ' min' },
    { key: 'shuffle', type: 'toggle', label: 'Shuffle' },
    { key: 'include', type: 'seg', label: 'Use', options: [['all', 'All skies'], ['presets', 'Presets'], ['mine', 'My skies']] }
  ],
  enable() { playlistNext = performance.now() + this.settings.minutes * 60000; const d = extById('daynight'); if (d.on) extToggle(d, false); },
  disable() { skyRestoreChoice(); },
  frame() {
    if (!sky || !skyState.enabled || skyLoading) return;
    const now = performance.now();
    if (now < playlistNext) return;
    const s = this.settings;
    playlistNext = now + s.minutes * 60000;
    const keys = [];
    if (s.include !== 'mine') skyPresets.forEach(p => keys.push(p.id));
    if (s.include !== 'presets') skyMine.forEach(m => keys.push('my:' + m.id));
    if (!keys.length) return;
    const cur = skyShownKey || skyCurrentKey();
    let next;
    if (s.shuffle) { do { next = keys[Math.floor(Math.random() * keys.length)]; } while (keys.length > 1 && next === cur); }
    else next = keys[(keys.indexOf(cur) + 1) % keys.length];
    skyApply(next, true, true);
  }
});

const sunState = { orig: null, tex: { sun: null, moon: null } };
extDefine({
  id: 'sunmoon', cat: 'world', name: 'Sun & Moon', desc: 'Resize and recolor the sun and moon, or use your own images.',
  defaults: { sunSize: 1, moonSize: 1, sunColor: '#ffffff', moonColor: '#ffffff' },
  controls: [
    { key: 'sunSize', type: 'slider', label: 'Sun size', min: 0.2, max: 4, step: 0.05, fmt: v => v.toFixed(2) + 'x' },
    { key: 'sunColor', type: 'color', label: 'Sun color' },
    { key: 'moonSize', type: 'slider', label: 'Moon size', min: 0.2, max: 4, step: 0.05, fmt: v => v.toFixed(2) + 'x' },
    { key: 'moonColor', type: 'color', label: 'Moon color' },
    { type: 'buttons', label: 'Custom image', buttons: [['Sun image', 'sun'], ['Moon image', 'moon'], ['Reset', 'reset']], onClick: (m, v) => m.pickTexture(v) }
  ],
  async pickTexture(which) {
    if (which === 'reset') {
      await extDb.del('assets', 'sun').catch(() => {});
      await extDb.del('assets', 'moon').catch(() => {});
      this.restoreMaps();
      sunState.tex = { sun: null, moon: null };
      return;
    }
    const f = await extPickFiles(false);
    if (!f || !f[0]) return;
    await extDb.put('assets', { id: which, blob: f[0] });
    await this.loadTex(which, f[0]);
  },
  async loadTex(which, blob) {
    const img = await extBlobImage(blob);
    const t = new T.Texture(img);
    t.needsUpdate = true;
    sunState.tex[which] = t;
  },
  restoreMaps() {
    if (!sunState.orig) return;
    const s = G.gameScene.sun;
    s.sun.material.map = sunState.orig.sunMap; s.sun.material.needsUpdate = true;
    s.moon.material.map = sunState.orig.moonMap; s.moon.material.needsUpdate = true;
  },
  async enable() {
    const s = G.gameScene.sun;
    if (!sunState.orig) sunState.orig = { sun: s.sun.scale.x, moon: s.moon.scale.x, sunMap: s.sun.material.map, moonMap: s.moon.material.map, sunColor: s.sun.material.color.getHex(), moonColor: s.moon.material.color.getHex() };
    for (const w of ['sun', 'moon']) { try { const a = await extDb.get('assets', w); if (a && a.blob) await this.loadTex(w, a.blob); } catch(e) {} }
  },
  disable() {
    if (!sunState.orig) return;
    const s = G.gameScene.sun, o = sunState.orig;
    s.sun.scale.set(o.sun, o.sun, 1); s.moon.scale.set(o.moon, o.moon, 1);
    s.sun.material.color.setHex(o.sunColor); s.moon.material.color.setHex(o.moonColor);
    this.restoreMaps();
  },
  frame() {
    if (!sunState.orig) return;
    const st = this.settings, s = G.gameScene.sun, o = sunState.orig;
    s.sun.scale.set(o.sun * st.sunSize, o.sun * st.sunSize, 1);
    s.moon.scale.set(o.moon * st.moonSize, o.moon * st.moonSize, 1);
    s.sun.material.color.set(st.sunColor);
    s.moon.material.color.set(st.moonColor);
    for (const w of ['sun', 'moon']) { const t = sunState.tex[w]; if (t && s[w].material.map !== t) { s[w].material.map = t; s[w].material.needsUpdate = true; } }
  }
});

const cloudState = { orig: null, unhook: null };
extDefine({
  id: 'clouds', cat: 'world', name: 'Cloud Styler', desc: 'Recolor clouds and change coverage, height and wind.',
  defaults: { dayColor: '#ffffff', sunsetColor: '#ff9a6b', nightColor: '#2a3350', opacity: 1, coverage: 1, height: 0, speed: 1 },
  controls: [
    { key: 'dayColor', type: 'color', label: 'Day color' },
    { key: 'sunsetColor', type: 'color', label: 'Sunset color' },
    { key: 'nightColor', type: 'color', label: 'Night color' },
    { key: 'opacity', type: 'slider', label: 'Opacity', min: 0.1, max: 1.5, step: 0.05, fmt: v => Math.round(v * 100) + '%' },
    { key: 'coverage', type: 'slider', label: 'Coverage', min: 0.3, max: 2, step: 0.05, fmt: v => Math.round(v * 100) + '%' },
    { key: 'height', type: 'slider', label: 'Height offset', min: -60, max: 120, step: 1, fmt: v => (v > 0 ? '+' : '') + v },
    { key: 'speed', type: 'slider', label: 'Wind speed', min: 0, max: 6, step: 0.1, fmt: v => v.toFixed(1) + 'x' }
  ],
  enable() {
    const c = G.gameScene.clouds, u = c.material.uniforms;
    if (!cloudState.orig) cloudState.orig = { day: c._dayColor.clone(), night: c._nightColor.clone(), sunset: c._sunsetColor.clone(), opacity: u.uOpacity.value, coverage: u.uCoverage.value };
    const s = this.settings;
    cloudState.unhook = extAfter(c, 'update', () => {
      const o = cloudState.orig;
      u.uOpacity.value = o.opacity * s.opacity;
      u.uCoverage.value = o.coverage * s.coverage;
      if (s.height) { c.mesh.position.y += s.height; u.uCloudY.value += s.height; }
      u.uTime.value += 0.016 * (s.speed - 1);
    });
  },
  disable() {
    const c = G.gameScene.clouds, o = cloudState.orig;
    if (cloudState.unhook) cloudState.unhook();
    cloudState.unhook = null;
    if (!o) return;
    c._dayColor.copy(o.day); c._nightColor.copy(o.night); c._sunsetColor.copy(o.sunset);
    c.material.uniforms.uOpacity.value = o.opacity;
    c.material.uniforms.uCoverage.value = o.coverage;
  },
  frame() {
    const c = G.gameScene.clouds, s = this.settings;
    c._dayColor.set(s.dayColor); c._nightColor.set(s.nightColor); c._sunsetColor.set(s.sunsetColor);
  }
});

const fogState = { unhook: null };
extDefine({
  id: 'fog', cat: 'world', name: 'Fog Designer', desc: 'Custom fog color and distance.',
  defaults: { custom: true, color: '#9fb4d8', start: 0.6, end: 1 },
  controls: [
    { key: 'custom', type: 'toggle', label: 'Custom color' },
    { key: 'color', type: 'color', label: 'Fog color', show: s => s.custom },
    { key: 'start', type: 'slider', label: 'Starts at', min: 0, max: 1, step: 0.02, fmt: v => Math.round(v * 100) + '%' },
    { key: 'end', type: 'slider', label: 'Fully foggy at', min: 0.2, max: 2, step: 0.02, fmt: v => Math.round(v * 100) + '%' }
  ],
  enable() {
    const s = this.settings;
    fogState.unhook = extAfter(G.gameScene.fog, 'update', () => {
      const f = G.gameScene.scene.fog;
      if (!f) return;
      const far = f.far;
      f.near = far * s.start;
      f.far = Math.max(f.near + 1, far * s.end);
      if (s.custom) { f.color.set(s.color); const sc = G.gameScene.sky.color; if (sc && sc.set) sc.set(s.color); }
    });
  },
  disable() { if (fogState.unhook) fogState.unhook(); fogState.unhook = null; }
});

const rainState = { unhook: null, speed: null };
extDefine({
  id: 'rainstyle', cat: 'world', name: 'Rain Style', desc: 'Recolor rain and change how heavy and fast it falls.',
  defaults: { color: '#9ec8ff', opacity: 1, speed: 1 },
  controls: [
    { key: 'color', type: 'color', label: 'Rain color' },
    { type: 'buttons', label: 'Presets', buttons: [['Normal', '#9ec8ff'], ['Neon', '#00ffd5'], ['Blood', '#ff2a2a'], ['Pink', '#ff7ad9'], ['Gold', '#ffd36b']], onClick: (m, v) => { m.settings.color = v; } },
    { key: 'opacity', type: 'slider', label: 'Heaviness', min: 0.2, max: 2, step: 0.05, fmt: v => Math.round(v * 100) + '%' },
    { key: 'speed', type: 'slider', label: 'Fall speed', min: 0.2, max: 3, step: 0.05, fmt: v => v.toFixed(2) + 'x' }
  ],
  enable() {
    const W = G.gameScene.weather, s = this.settings;
    if (rainState.speed == null) rainState.speed = W.rain.uniforms.uFallSpeed.value;
    rainState.unhook = extAfter(W, 'update', () => {
      const u = W.rain.uniforms, c = extHex(s.color), base = u.uTint.value.r;
      u.uTint.value.setRGB(base * c[0] * 1.3, base * c[1] * 1.3, base * c[2] * 1.3);
      u.uOpacity.value = Math.min(1, u.uOpacity.value * s.opacity);
      u.uFallSpeed.value = rainState.speed * s.speed;
    });
  },
  disable() {
    if (rainState.unhook) rainState.unhook();
    rainState.unhook = null;
    if (rainState.speed != null) G.gameScene.weather.rain.uniforms.uFallSpeed.value = rainState.speed;
  }
});

let meteorNext = 0;
const meteors = [];
extDefine({
  id: 'meteors', cat: 'world', name: 'Shooting Stars', desc: 'Shooting stars and meteor showers at night.',
  defaults: { perMinute: 8, shower: false, nightOnly: true, color: '#ffffff' },
  controls: [
    { key: 'perMinute', type: 'slider', label: 'Per minute', min: 1, max: 60, step: 1, fmt: v => v },
    { key: 'shower', type: 'toggle', label: 'Meteor showers' },
    { key: 'nightOnly', type: 'toggle', label: 'Only at night' },
    { key: 'color', type: 'color', label: 'Color' }
  ],
  frame(dt) {
    const s = this.settings, P = extParticles(), now = performance.now();
    if (!P) return;
    if (!s.nightOnly || 1 - extDayFactor() > 0.4) {
      if (!meteorNext) meteorNext = now + extRand(0.4, 1.6) * 60000 / s.perMinute;
      if (now >= meteorNext) {
        const n = s.shower ? Math.floor(extRand(3, 7)) : 1;
        for (let i = 0; i < n; i++) {
          const az = Math.random() * Math.PI * 2, el = extRand(0.35, 1.1), ta = az + Math.PI / 2;
          meteors.push({ dir: [Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az)], vel: [Math.cos(ta) * extRand(0.6, 1), -extRand(0.25, 0.6), Math.sin(ta) * extRand(0.6, 1)], life: extRand(0.7, 1.4), delay: i * extRand(0.05, 0.4) });
        }
        meteorNext = now + extRand(0.4, 1.6) * 60000 / s.perMinute;
      }
    }
    const cp = extCamPos(), c = extHex(s.color);
    for (let i = meteors.length - 1; i >= 0; i--) {
      const m = meteors[i];
      if (m.delay > 0) { m.delay -= dt; continue; }
      m.life -= dt;
      if (m.life <= 0) { meteors.splice(i, 1); continue; }
      for (let k = 0; k < 3; k++) {
        for (let j = 0; j < 3; j++) m.dir[j] += m.vel[j] * dt * 0.3;
        const l = Math.hypot(m.dir[0], m.dir[1], m.dir[2]);
        P.sky.spawn({ x: cp.x + m.dir[0] / l * 420, y: cp.y + m.dir[1] / l * 420, z: cp.z + m.dir[2] / l * 420, vx: 0, vy: 0, vz: 0, life: 0.45, gravity: 0, drag: 1, r: c[0], g: c[1], b: c[2] });
      }
    }
  },
  disable() { meteors.length = 0; }
});

let auroraMesh = null;
extDefine({
  id: 'aurora', cat: 'world', name: 'Aurora', desc: 'Animated northern lights in the night sky.',
  defaults: { intensity: 1, color1: '#2bffa8', color2: '#8a5cff', speed: 1, nightOnly: true },
  controls: [
    { key: 'intensity', type: 'slider', label: 'Intensity', min: 0.1, max: 2.5, step: 0.05, fmt: v => Math.round(v * 100) + '%' },
    { key: 'color1', type: 'color', label: 'Low color' },
    { key: 'color2', type: 'color', label: 'High color' },
    { key: 'speed', type: 'slider', label: 'Speed', min: 0, max: 4, step: 0.1, fmt: v => v.toFixed(1) + 'x' },
    { key: 'nightOnly', type: 'toggle', label: 'Only at night' }
  ],
  enable() {
    if (auroraMesh) { auroraMesh.visible = true; return; }
    const mat = new T.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uC1: { value: new T.Color(0.2, 1, 0.6) }, uC2: { value: new T.Color(0.5, 0.3, 1) }, uI: { value: 1 } },
      vertexShader: 'varying vec3 vDir; void main() { vDir = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
      fragmentShader: [
        'uniform float uTime; uniform vec3 uC1; uniform vec3 uC2; uniform float uI; varying vec3 vDir;',
        'float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }',
        'float n(vec2 p) { vec2 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f); return mix(mix(h(i), h(i + vec2(1, 0)), f.x), mix(h(i + vec2(0, 1)), h(i + vec2(1, 1)), f.x), f.y); }',
        'float fbm(vec2 p) { float s = 0.0, a = 0.5; for (int i = 0; i < 4; i++) { s += a * n(p); p *= 2.03; a *= 0.5; } return s; }',
        'void main() { vec3 d = normalize(vDir); float el = d.y; if (el < 0.05) discard; float az = atan(d.z, d.x);',
        '  float band = smoothstep(0.08, 0.28, el) * (1.0 - smoothstep(0.5, 0.85, el));',
        '  float w = fbm(vec2(az * 2.0 + uTime * 0.03, uTime * 0.05));',
        '  float curtain = pow(abs(sin(az * 6.0 + w * 6.0 + uTime * 0.06)), 6.0);',
        '  float rays = fbm(vec2(az * 40.0 + w * 8.0, el * 3.0 - uTime * 0.25));',
        '  float a = band * (0.35 + 0.65 * curtain) * (0.4 + 0.8 * rays) * uI;',
        '  gl_FragColor = vec4(mix(uC1, uC2, smoothstep(0.2, 0.6, el)) * a, 1.0); }'
      ].join('\n'),
      side: 1, depthWrite: false, depthTest: false, transparent: false, blending: 2, fog: false
    });
    auroraMesh = new T.Mesh(new T.SphereGeometry(4700, 48, 24), mat);
    auroraMesh.renderOrder = -0.45;
    auroraMesh.frustumCulled = false;
    G.gameScene.ambientMeshes.add(auroraMesh);
  },
  disable() { if (auroraMesh) auroraMesh.visible = false; },
  frame(dt) {
    if (!auroraMesh) return;
    const s = this.settings, u = auroraMesh.material.uniforms;
    u.uTime.value += dt * s.speed * 10;
    u.uC1.value.setRGB(...extHex(s.color1));
    u.uC2.value.setRGB(...extHex(s.color2));
    u.uI.value = s.intensity * (s.nightOnly ? extClamp((1 - extDayFactor()) * 1.6 - 0.3, 0, 1) : 1);
    auroraMesh.visible = u.uI.value > 0.001;
    auroraMesh.position.copy(extCamPos());
  }
});

extDefine({
  id: 'ambient', cat: 'world', name: 'Ambient Particles', desc: 'Fireflies, dust, petals or snow floating around you.',
  defaults: { type: 'fireflies', density: 1, nightOnly: true },
  controls: [
    { key: 'type', type: 'seg', label: 'Type', options: [['fireflies', 'Fireflies'], ['dust', 'Dust'], ['petals', 'Petals'], ['snow', 'Snow']] },
    { key: 'density', type: 'slider', label: 'Amount', min: 0.2, max: 3, step: 0.1, fmt: v => Math.round(v * 100) + '%' },
    { key: 'nightOnly', type: 'toggle', label: 'Fireflies only at night', show: s => s.type === 'fireflies' }
  ],
  acc: 0,
  frame(dt) {
    const s = this.settings, P = extParticles(), pp = extPlayerPos();
    if (!P || !pp) return;
    if (s.type === 'fireflies' && s.nightOnly && extDayFactor() > 0.6) return;
    this.acc += dt * { fireflies: 6, dust: 14, petals: 7, snow: 30 }[s.type] * s.density;
    while (this.acc >= 1) {
      this.acc -= 1;
      const a = Math.random() * Math.PI * 2, d = extRand(1.5, 16), x = pp.x + Math.cos(a) * d, z = pp.z + Math.sin(a) * d, seed = Math.random() * 9;
      if (s.type === 'fireflies') { const c = Math.random() < 0.5 ? [0.85, 1, 0.35] : [1, 0.85, 0.3]; P.soft.spawn({ x, y: pp.y + extRand(0, 3.5), z, vx: extRand(-0.3, 0.3), vy: extRand(-0.1, 0.2), vz: extRand(-0.3, 0.3), life: extRand(4, 8), fadeIn: 1, fadeOut: 1.5, wobble: 0.6, flicker: true, seed, gravity: 0, drag: 1, r: c[0], g: c[1], b: c[2] }); }
      else if (s.type === 'dust') P.spark.spawn({ x, y: pp.y + extRand(-1, 4), z, vx: extRand(-0.15, 0.15), vy: extRand(-0.05, 0.08), vz: extRand(-0.15, 0.15), life: extRand(4, 9), fadeIn: 1.5, fadeOut: 2, wobble: 0.15, seed, gravity: 0, drag: 1, r: 0.55, g: 0.52, b: 0.45 });
      else if (s.type === 'petals') P.petal.spawn({ x, y: pp.y + extRand(4, 9), z, vx: extRand(0.2, 0.8), vy: extRand(-0.6, -0.9), vz: extRand(-0.3, 0.3), life: extRand(6, 10), fadeIn: 0.8, fadeOut: 1.5, wobble: 1.2, seed, gravity: 0, drag: 1, r: 1, g: extRand(0.55, 0.75), b: extRand(0.75, 0.9) });
      else P.soft.spawn({ x, y: pp.y + extRand(5, 10), z, vx: extRand(-0.2, 0.2), vy: extRand(-1.2, -2), vz: extRand(-0.2, 0.2), life: extRand(4, 7), fadeIn: 0.5, fadeOut: 1, wobble: 0.5, seed, gravity: 0, drag: 1, r: 0.9, g: 0.93, b: 1 });
    }
  }
});

const EXT_FILTERS = {
  vibrant: { saturate: 1.45, contrast: 1.08, brightness: 1.03 },
  cinematic: { contrast: 1.18, saturate: 0.82, sepia: 0.18, brightness: 0.96 },
  noir: { grayscale: 1, contrast: 1.3, brightness: 0.95 },
  warm: { sepia: 0.3, saturate: 1.2, 'hue-rotate': -8 },
  cold: { saturate: 0.92, 'hue-rotate': 14, brightness: 1.03, contrast: 1.04 },
  vaporwave: { 'hue-rotate': -28, saturate: 1.6, contrast: 1.06 },
  dreamy: { brightness: 1.08, contrast: 0.9, saturate: 1.25, blur: 0.3 }
};
let extCanvas = null;
const extFindCanvas = () => {
  if (extCanvas && document.contains(extCanvas)) return extCanvas;
  let best = null;
  for (const c of document.querySelectorAll('canvas')) if (c.id !== 'canvas-hud' && (!best || c.width * c.height > best.width * best.height)) best = c;
  return (extCanvas = best);
};
extDefine({
  id: 'filter', cat: 'visuals', name: 'Color Filter', desc: 'Recolors the whole game with a look you pick.',
  defaults: { preset: 'vibrant', strength: 0.8 },
  controls: [
    { key: 'preset', type: 'select', label: 'Look', options: [['vibrant', 'Vibrant'], ['cinematic', 'Cinematic'], ['noir', 'Noir'], ['warm', 'Warm'], ['cold', 'Cold'], ['vaporwave', 'Vaporwave'], ['dreamy', 'Dreamy']] },
    { key: 'strength', type: 'slider', label: 'Strength', min: 0, max: 1, step: 0.05, fmt: v => Math.round(v * 100) + '%' }
  ],
  apply() {
    const c = extFindCanvas();
    if (!c) return;
    const s = this.settings, f = EXT_FILTERS[s.preset] || {}, parts = [];
    for (const [name, v] of Object.entries(f)) {
      const id = ['grayscale', 'sepia', 'blur', 'hue-rotate'].includes(name) ? 0 : 1, val = id + (v - id) * s.strength;
      parts.push(name + '(' + (name === 'hue-rotate' ? val + 'deg' : name === 'blur' ? val + 'px' : val) + ')');
    }
    c.style.filter = parts.join(' ');
  },
  enable() { this.apply(); },
  change() { this.apply(); },
  disable() { const c = extFindCanvas(); if (c) c.style.filter = ''; },
  frame() { const c = extFindCanvas(); if (c && !c.style.filter) this.apply(); }
});

let outlineMesh = null;
extDefine({
  id: 'outline', cat: 'visuals', name: 'Block Outline', desc: 'A glowing outline on the block you are looking at.',
  defaults: { color: '#ffffff', rainbow: false, thickness: 0.035, glow: 0.6, fill: 0.06 },
  controls: [
    { key: 'color', type: 'color', label: 'Color' },
    { key: 'rainbow', type: 'toggle', label: 'Rainbow' },
    { key: 'thickness', type: 'slider', label: 'Thickness', min: 0.01, max: 0.12, step: 0.005, fmt: v => Math.round(v * 1000) / 10 + '%' },
    { key: 'glow', type: 'slider', label: 'Glow', min: 0, max: 1, step: 0.05, fmt: v => Math.round(v * 100) + '%' },
    { key: 'fill', type: 'slider', label: 'Face tint', min: 0, max: 0.4, step: 0.01, fmt: v => Math.round(v * 100) + '%' }
  ],
  build() {
    const v = [], p = (x, y, z) => [x - 0.5, y - 0.5, z - 0.5], f = (a, b, c, d) => v.push(...a, ...b, ...c, ...a, ...c, ...d);
    f(p(0, 0, 1), p(1, 0, 1), p(1, 1, 1), p(0, 1, 1)); f(p(1, 0, 0), p(0, 0, 0), p(0, 1, 0), p(1, 1, 0));
    f(p(0, 1, 1), p(1, 1, 1), p(1, 1, 0), p(0, 1, 0)); f(p(0, 0, 0), p(1, 0, 0), p(1, 0, 1), p(0, 0, 1));
    f(p(1, 0, 1), p(1, 0, 0), p(1, 1, 0), p(1, 1, 1)); f(p(0, 0, 0), p(0, 0, 1), p(0, 1, 1), p(0, 1, 0));
    const geo = new T.BufferGeometry();
    geo.setAttribute('position', new T.BufferAttribute(new Float32Array(v), 3));
    outlineMesh = new T.Mesh(geo, new T.ShaderMaterial({
      uniforms: { uColor: { value: new T.Color(1, 1, 1) }, uW: { value: 0.035 }, uGlow: { value: 0.6 }, uFill: { value: 0.06 } },
      vertexShader: 'varying vec3 vP; void main() { vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position * 1.004, 1.0); }',
      fragmentShader: [
        'uniform vec3 uColor; uniform float uW; uniform float uGlow; uniform float uFill; varying vec3 vP;',
        'void main() { vec3 a = 0.5 - abs(vP); float m1 = min(a.x, min(a.y, a.z)); float m2 = a.x + a.y + a.z - m1 - max(a.x, max(a.y, a.z));',
        '  float edge = 1.0 - smoothstep(uW * 0.6, uW, m2); float glow = (1.0 - smoothstep(uW, uW * 4.0, m2)) * uGlow * 0.45;',
        '  float alpha = max(edge, max(glow, uFill)); if (alpha < 0.01) discard; gl_FragColor = vec4(uColor, alpha); }'
      ].join('\n'),
      transparent: true, depthWrite: false, fog: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2
    }));
    outlineMesh.renderOrder = 6;
    outlineMesh.frustumCulled = false;
    G.gameScene.ambientMeshes.add(outlineMesh);
  },
  enable() { if (!outlineMesh) this.build(); },
  disable() { if (outlineMesh) outlineMesh.visible = false; },
  frame() {
    if (!outlineMesh) return;
    const s = this.settings, u = outlineMesh.material.uniforms;
    let b = null;
    try { const mo = G.controller.objectMouseOver; b = mo && mo.block; if (b && b.x == null && b.getX) b = { x: b.getX(), y: b.getY(), z: b.getZ() }; } catch(e) {}
    if (!b || b.x == null) { outlineMesh.visible = false; return; }
    outlineMesh.visible = true;
    outlineMesh.position.set(b.x + 0.5, b.y + 0.5, b.z + 0.5);
    if (s.rainbow) u.uColor.value.setHSL((performance.now() / 4000) % 1, 0.9, 0.6);
    else u.uColor.value.setRGB(...extHex(s.color));
    u.uW.value = s.thickness; u.uGlow.value = s.glow; u.uFill.value = s.fill;
  }
});

const breakState = { orig: null };
extDefine({
  id: 'breakcolor', cat: 'visuals', name: 'Break Color', desc: 'Recolors the cracks when you mine a block.',
  defaults: { color: '#ff4fd8', opacity: 1 },
  controls: [
    { key: 'color', type: 'color', label: 'Crack color' },
    { key: 'opacity', type: 'slider', label: 'Opacity', min: 0.1, max: 1, step: 0.05, fmt: v => Math.round(v * 100) + '%' }
  ],
  frame() {
    const m = G.gameScene.blockDamageRenderer && G.gameScene.blockDamageRenderer.material;
    if (!m) return;
    if (!breakState.orig) breakState.orig = { color: m.color.getHex(), opacity: m.opacity, transparent: m.transparent };
    m.color.set(this.settings.color); m.opacity = this.settings.opacity; m.transparent = true;
  },
  disable() {
    const m = G.gameScene.blockDamageRenderer && G.gameScene.blockDamageRenderer.material;
    if (!m || !breakState.orig) return;
    m.color.setHex(breakState.orig.color); m.opacity = breakState.orig.opacity; m.transparent = breakState.orig.transparent;
  }
});

extDefine({
  id: 'killfx', cat: 'visuals', name: 'Kill Effects', desc: 'Plays an effect where your opponent dies.',
  defaults: { effect: 'lightning', color: '#ffd36b', sound: true },
  controls: [
    { key: 'effect', type: 'seg', label: 'Effect', options: [['lightning', 'Lightning'], ['firework', 'Firework'], ['hearts', 'Hearts'], ['smoke', 'Smoke']] },
    { key: 'color', type: 'color', label: 'Firework color', show: s => s.effect === 'firework' },
    { key: 'sound', type: 'toggle', label: 'Sound' },
    { type: 'buttons', label: 'Test', buttons: [['Preview', 1]], onClick: m => { const p = extPlayerPos(); if (!p) return; const c = extCamPos(), d = new T.Vector3(); G.gameScene.camera.getWorldDirection(d); extEffect(m.settings.effect, c.x + d.x * 5, p.y, c.z + d.z * 5, m.settings.color, m.settings.sound); } }
  ],
  onKill(victim) {
    const p = extLastPositions.get(victim);
    if (!p || performance.now() - p.t > 4000) return;
    extEffect(this.settings.effect, p.x, p.y, p.z, this.settings.color, this.settings.sound);
  }
});

let extLastClick = 0;
const extHurt = new WeakMap();
window.addEventListener('mousedown', e => { if (e.button === 0) extLastClick = performance.now(); }, true);
extDefine({
  id: 'hitfx', cat: 'visuals', name: 'Hit Particles', desc: 'Shows particles when you hit someone.',
  defaults: { effect: 'crit', color: '#7cf7ff' },
  controls: [
    { key: 'effect', type: 'seg', label: 'Effect', options: [['crit', 'Crit'], ['stars', 'Stars'], ['hearts', 'Hearts'], ['sparks', 'Sparks'], ['flames', 'Flames']] },
    { key: 'color', type: 'color', label: 'Color', show: s => s.effect === 'stars' || s.effect === 'sparks' }
  ],
  frame() {
    const list = G.world && G.world.loadedEntityList, pp = extPlayerPos();
    if (!list || !pp) return;
    const recent = performance.now() - extLastClick < 450;
    for (const e of list) {
      if (!e || e === G.player || !e.pos) continue;
      const h = e.hurtTime || 0, prev = extHurt.get(e) || 0;
      extHurt.set(e, h);
      if (recent && h > prev && h >= 8 && Math.hypot(e.pos.x - pp.x, e.pos.y - pp.y, e.pos.z - pp.z) < 7) extEffect(this.settings.effect, e.pos.x, e.pos.y, e.pos.z, this.settings.color, false);
    }
  }
});

const chatHistory = [];
const spamState = { key: '', entry: null, at: 0, count: 1, base: '', track: false };
extDefine({
  id: 'mentions', cat: 'chat', name: 'Highlights', desc: 'Highlights keywords and your name in chat.',
  defaults: { words: '', myName: true, color: 'gold', sound: true },
  controls: [
    { key: 'words', type: 'text', label: 'Keywords', placeholder: 'gg, trade, clan' },
    { key: 'myName', type: 'toggle', label: 'Highlight my name' },
    { key: 'color', type: 'seg', label: 'Color', options: [['gold', 'Gold'], ['aqua', 'Aqua'], ['hotpink', 'Pink'], ['lime', 'Lime'], ['red', 'Red']] },
    { key: 'sound', type: 'toggle', label: 'Ping sound' }
  ]
});
extDefine({
  id: 'spamstack', cat: 'chat', name: 'Spam Stacking', desc: 'Repeated messages collapse into one with a count.',
  defaults: { seconds: 20 },
  controls: [{ key: 'seconds', type: 'slider', label: 'Stack within', min: 3, max: 120, step: 1, fmt: v => v + 's' }]
});
extDefine({
  id: 'commands', cat: 'chat', name: 'Client Commands', desc: 'Type .help in chat. They run locally and are never sent.',
  defaults: { prefix: '.' },
  controls: [{ key: 'prefix', type: 'text', label: 'Prefix' }]
});
let ggLast = null;
extDefine({
  id: 'autogg', cat: 'chat', name: 'Auto GG', desc: 'Sends your message when a match ends.',
  defaults: { message: 'gg', delay: 1.5 },
  controls: [
    { key: 'message', type: 'text', label: 'Message', placeholder: 'gg' },
    { key: 'delay', type: 'slider', label: 'Delay', min: 0, max: 8, step: 0.5, fmt: v => v + 's' }
  ],
  enable() { ggLast = G.info && G.info.lastGameSummary; },
  frame() {
    const s = G.info && G.info.lastGameSummary;
    if (s && s !== ggLast) {
      ggLast = s;
      const msg = (this.settings.message || 'gg').trim();
      if (msg) setTimeout(() => { try { if (extInWorld()) extSendChat(msg); } catch(e) {} }, this.settings.delay * 1000);
    } else if (!s) ggLast = null;
  }
});

let chatHistoryQuery = '';
extDefine({
  id: 'chathistory', cat: 'chat', name: 'Chat History', desc: 'Search recent chat and click a message to copy it.',
  defaults: {},
  controls: [{ type: 'custom', render: () => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'padding:10px 0 4px;';
    const q = document.createElement('input');
    q.type = 'text'; q.placeholder = 'Search chat...'; q.value = chatHistoryQuery; q.style.cssText = extInputStyle;
    const list = document.createElement('div');
    list.style.cssText = 'max-height:240px;overflow-y:auto;margin-top:8px;display:flex;flex-direction:column;gap:2px;';
    const render = () => {
      list.innerHTML = '';
      const s = chatHistoryQuery.toLowerCase(), items = chatHistory.filter(m => !s || m.text.toLowerCase().includes(s)).slice(-150).reverse();
      if (!items.length) { const e = document.createElement('div'); e.textContent = s ? 'No messages match.' : 'Messages show up here while this is on.'; e.style.cssText = 'font-size:12px;color:#555;padding:6px 2px;font-family:MinibloxFont,sans-serif;'; list.appendChild(e); }
      items.forEach(m => {
        const d = new Date(m.t), row = document.createElement('div');
        row.style.cssText = 'display:flex;gap:8px;padding:5px 8px;border-radius:6px;cursor:pointer;font-size:12px;color:#bbb;font-family:MinibloxFont,sans-serif;';
        row.innerHTML = '<span style="color:#555;flex-shrink:0;"></span><span></span>';
        row.firstChild.textContent = String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
        row.lastChild.textContent = m.text;
        row.title = 'Click to copy';
        row.addEventListener('mouseenter', () => { row.style.background = '#1f1f1f'; });
        row.addEventListener('mouseleave', () => { row.style.background = 'transparent'; });
        row.addEventListener('click', () => navigator.clipboard.writeText(m.text).then(() => showNotification('Copied')).catch(() => {}));
        list.appendChild(row);
      });
    };
    q.addEventListener('input', () => { chatHistoryQuery = q.value; render(); });
    render();
    wrap.append(q, list);
    return wrap;
  } }]
});

const hudMods = [];
const hudEditor = { open: false, el: null, resume: false, drag: null, raf: 0 };
const hudKeys = new Set(), hudMouse = new Set();
const hudClicks = { l: [], r: [] };
const hudTyping = t => !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
window.addEventListener('keydown', e => { if (!e.uv2Synthetic && !hudTyping(e.target)) hudKeys.add(e.code); }, true);
window.addEventListener('keyup', e => { if (!e.uv2Synthetic) hudKeys.delete(e.code); }, true);
window.addEventListener('mousedown', e => {
  hudMouse.add(e.button);
  if (!e.isTrusted) return;
  if (e.button === 0) hudClicks.l.push(performance.now());
  else if (e.button === 2) hudClicks.r.push(performance.now());
}, true);
window.addEventListener('mouseup', e => hudMouse.delete(e.button), true);
window.addEventListener('blur', () => { hudKeys.clear(); hudMouse.clear(); });
function hudCps(list) {
  const cut = performance.now() - 1000;
  while (list.length && list[0] < cut) list.shift();
  return list.length;
}
const hudEsc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const hudPct = v => Math.round(v * 100) + '%';
const hudRgba = (hex, a) => { const [r, g, b] = extHex(hex); return `rgba(${Math.round(r * 255)},${Math.round(g * 255)},${Math.round(b * 255)},${a})`; };
const hudLum = hex => { const [r, g, b] = extHex(hex); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const hudDurColor = p => `hsl(${Math.round(extClamp(p, 0, 100) * 1.2)},78%,58%)`;
const hudPretty = n => String(n || '').replace(/^.*:/, '').split('_').map(w => w ? w[0].toUpperCase() + w.slice(1) : w).join(' ');
const hudPlayer = () => (G && G.player) || null;
const HUD_FORMATS = (label, sample) => [['label', label + ': ' + sample], ['suffix', sample + ' ' + label], ['value', sample]];
const HUD_BASE = { scale: 1, textColor: 'white', customColor: '#ffffff', shadow: true, brackets: false, background: true, bgOpacity: 0.4, border: false, rounded: true, pos: null };

function hudFmt(m, label, value) {
  const f = m.settings.format || 'label';
  let t = f === 'label' ? `<span class="uv2-hud-l">${label}:</span> ${value}` : f === 'suffix' ? `${value} <span class="uv2-hud-l">${label}</span>` : String(value);
  if (m.settings.brackets) t = `<span class="uv2-hud-l">[</span>${t}<span class="uv2-hud-l">]</span>`;
  return t;
}
function hudStyleControls(o) {
  const when = o.when || (() => true);
  const c = [{ type: 'heading', label: 'Appearance' }];
  c.push({ key: 'scale', type: 'slider', label: 'Size', min: 0.5, max: 2.5, step: 0.05, fmt: hudPct });
  if (o.text !== false) {
    c.push({ key: 'textColor', type: 'seg', label: 'Text color', options: [['white', 'White'], ['accent', 'Accent'], ['chroma', 'Chroma'], ['custom', 'Custom']] });
    c.push({ key: 'customColor', type: 'color', label: 'Custom color', show: s => s.textColor === 'custom' });
    c.push({ key: 'shadow', type: 'toggle', label: 'Text shadow' });
  }
  if (o.brackets) c.push({ key: 'brackets', type: 'toggle', label: 'Brackets' });
  c.push({ key: 'background', type: 'toggle', label: o.keys ? 'Key background' : 'Background' });
  c.push({ key: 'bgOpacity', type: 'slider', label: 'Background opacity', min: 0, max: 1, step: 0.05, fmt: hudPct, show: s => s.background });
  c.push({ key: 'border', type: 'toggle', label: 'Accent border', show: s => s.background });
  c.push({ key: 'rounded', type: 'toggle', label: 'Rounded corners', show: s => s.background });
  c.push({ type: 'buttons', label: 'Position', buttons: [['Edit HUD layout', 'edit'], ['Reset', 'reset']], onClick: (m, v) => { if (v === 'edit') hudOpenEditor(); else { m.settings.pos = null; m.settings.scale = 1; m._dirty = true; } } });
  return c.map(d => Object.assign({}, d, { show: s => when(s) && (!d.show || d.show(s)) }));
}
function hudDefine(m) {
  m.defaults = Object.assign({}, HUD_BASE, m.hudDefaults || {}, m.defaults);
  m.controls = (m.controls || []).concat(hudStyleControls(m.hudOpts || {}));
  const ownDisable = m.disable, ownFrame = m.frame, ownChange = m.change;
  m.disable = function() { if (ownDisable) ownDisable.call(this); hudUnmount(this); hudRestoreNative(this.id); };
  m.frame = function(dt) { if (ownFrame) ownFrame.call(this, dt); hudUpdate(this, hudEditor.open); hudHideNative(); };
  m.change = function() { if (ownChange) ownChange.call(this); this._dirty = true; };
  m.isHud = true;
  hudMods.push(m);
  return extDefine(m);
}
function hudMount(m) {
  if (m.el) return m.el;
  const el = document.createElement('div');
  el.className = 'uv2-hud' + (hudEditor.open ? ' edit' : '');
  el.dataset.hud = m.id;
  el.dataset.name = m.name;
  const body = document.createElement('div');
  body.className = 'uv2-hud-in' + (m.box === false ? '' : ' uv2-hud-box');
  el.appendChild(body);
  document.body.appendChild(el);
  m.el = el; m.body = body; m._html = null; m._dirty = true;
  return el;
}
function hudUnmount(m) {
  if (m.el) m.el.remove();
  m.el = m.body = null;
}
function hudApplyStyle(m) {
  const s = m.settings, el = m.el;
  const fg = s.textColor === 'accent' ? guiPrimaryColor : s.textColor === 'custom' ? s.customColor : '#ffffff';
  el.style.setProperty('--hud-fg', fg);
  el.style.setProperty('--hud-bg', s.background ? `rgba(0,0,0,${s.bgOpacity})` : 'transparent');
  el.style.setProperty('--hud-border', s.background && s.border ? `1px solid ${hudRgba(guiPrimaryColor, 0.75)}` : '1px solid transparent');
  el.style.setProperty('--hud-radius', s.background && s.rounded ? '6px' : '0px');
  el.style.setProperty('--hud-shadow', s.shadow ? '0 1px 2px rgba(0,0,0,0.85)' : 'none');
  el.style.setProperty('--hud-accent', guiPrimaryColor);
  el.style.transform = `scale(${s.scale || 1})`;
  el.classList.toggle('uv2-hud-nobg', !s.background);
  if (m.style) m.style(el);
}
function hudUpdate(m, preview) {
  if (!m.on) { hudUnmount(m); return; }
  if (m.sample) { try { m.sample(); } catch(e) {} }
  const live = extInWorld();
  const show = preview ? (!m.previewable || m.previewable()) : live && (!m.visible || m.visible());
  if (!show) { if (m.el) m.el.style.display = 'none'; return; }
  hudMount(m);
  if (m._dirty || m._accent !== guiPrimaryColor) { hudApplyStyle(m); m._dirty = false; m._accent = guiPrimaryColor; }
  if (m.settings.textColor === 'chroma') m.el.style.setProperty('--hud-fg', `hsl(${Math.round(performance.now() / 14) % 360},85%,66%)`);
  let html = '';
  try { html = m.render(preview) || ''; } catch(e) { html = ''; }
  if (!html) {
    if (!preview) { m.el.style.display = 'none'; return; }
    html = `<span class="uv2-hud-l">${hudEsc(m.name)}</span>`;
  }
  if (html !== m._html) { m.body.innerHTML = html; m._html = html; }
  m.el.style.display = '';
  if (!(hudEditor.drag && hudEditor.drag.m === m)) hudPlace(m);
}
function hudSize(m) {
  const sc = m.settings.scale || 1;
  return [m.el.offsetWidth * sc, m.el.offsetHeight * sc];
}
function hudAnchor(f) { return f < 1 / 3 ? 0 : f > 2 / 3 ? 1 : 0.5; }
function hudPlace(m) {
  const W = window.innerWidth, H = window.innerHeight, [w, h] = hudSize(m);
  const p = m.settings.pos, d = m.def || {};
  let left, top;
  if (p) { left = p.x * W - hudAnchor(p.x) * w; top = p.y * H - hudAnchor(p.y) * h; }
  else {
    left = d.l != null ? d.l : d.r != null ? W - w - d.r : W / 2 - w / 2 + (d.cx || 0);
    top = d.t != null ? d.t : d.b != null ? H - h - d.b : H / 2 - h / 2 + (d.cy || 0);
  }
  left = extClamp(left, 0, Math.max(0, W - w));
  top = extClamp(top, 0, Math.max(0, H - h));
  m.el.style.left = Math.round(left) + 'px';
  m.el.style.top = Math.round(top) + 'px';
}
function hudPosFrom(m, left, top) {
  const W = window.innerWidth, H = window.innerHeight, [w, h] = hudSize(m);
  const ha = hudAnchor((left + w / 2) / W), va = hudAnchor((top + h / 2) / H);
  return { x: +((left + ha * w) / W).toFixed(4), y: +((top + va * h) / H).toFixed(4) };
}

function hudOpenEditor() {
  if (hudEditor.open) return;
  hudEditor.resume = uv2PausedGame;
  uv2PausedGame = false;
  if (uiVisible) toggleUI();
  hudEditor.open = true;
  const ov = document.createElement('div');
  ov.id = 'uv2-hud-editor';
  const anyOn = hudMods.some(m => m.on);
  ov.innerHTML = `<div class="uv2-hud-guide v"></div><div class="uv2-hud-guide h"></div>
    <div class="uv2-hud-bar"><i class="fa fa-arrows uv2-hud-bar-ic"></i><span>${anyOn ? '<b>Drag</b> to move &middot; <b>Click</b> for settings &middot; <b>Scroll</b> to resize' : 'Pick which elements to show with <b>Elements &amp; style</b>'}</span>
    <button class="uv2-btn" data-a="all">Elements &amp; style</button><button class="uv2-btn" data-a="reset">Reset positions</button><button class="uv2-btn uv2-btn-primary" data-a="done">Done</button></div>`;
  ov.querySelector('[data-a="done"]').addEventListener('click', hudCloseEditor);
  ov.querySelector('[data-a="all"]').addEventListener('click', () => hudPanelOpen(hudAll));
  ov.querySelector('[data-a="reset"]').addEventListener('click', () => {
    hudMods.forEach(m => { m.settings.pos = null; m.settings.scale = 1; m._dirty = true; extSaveSettings(m); });
  });
  document.body.appendChild(ov);
  hudEditor.bar = ov.querySelector('.uv2-hud-bar');
  document.body.appendChild(hudEditor.bar);
  hudEditor.el = ov;
  document.body.classList.add('uv2-hud-editing');
  hudMods.forEach(m => { if (m.el) m.el.classList.add('edit'); });
  document.addEventListener('mousedown', hudEdDown, true);
  document.addEventListener('mousemove', hudEdMove, true);
  document.addEventListener('mouseup', hudEdUp, true);
  document.addEventListener('wheel', hudEdWheel, { capture: true, passive: false });
  document.addEventListener('contextmenu', hudEdContext, true);
  window.addEventListener('keydown', hudEdKey, true);
  const loop = () => {
    if (!hudEditor.open) return;
    hudEditor.raf = requestAnimationFrame(loop);
    if (!(G && T)) hudMods.forEach(m => hudUpdate(m, true));
    else hudMods.forEach(m => { if (!m.on) hudUnmount(m); });
    hudMods.forEach(m => { if (m.el) m.el.classList.add('edit'); });
  };
  loop();
}
function hudCloseEditor() {
  if (!hudEditor.open) return;
  hudPanelClose();
  hudEditor.open = false;
  cancelAnimationFrame(hudEditor.raf);
  if (hudEditor.el) hudEditor.el.remove();
  if (hudEditor.bar) hudEditor.bar.remove();
  hudEditor.bar = null;
  hudEditor.el = null;
  hudEditor.drag = null;
  document.body.classList.remove('uv2-hud-editing');
  document.removeEventListener('mousedown', hudEdDown, true);
  document.removeEventListener('mousemove', hudEdMove, true);
  document.removeEventListener('mouseup', hudEdUp, true);
  document.removeEventListener('wheel', hudEdWheel, true);
  document.removeEventListener('contextmenu', hudEdContext, true);
  window.removeEventListener('keydown', hudEdKey, true);
  hudMods.forEach(m => {
    if (!m.el) return;
    m.el.classList.remove('edit', 'drag');
    if (!extInWorld()) m.el.style.display = 'none';
  });
  if (hudEditor.resume) { hudEditor.resume = false; uv2PausedGame = true; uv2ResumeGame(); }
}
const hudEdTarget = e => { const el = e.target && e.target.closest && e.target.closest('.uv2-hud.edit'); return el ? hudMods.find(m => m.el === el) : null; };
function hudEdDown(e) {
  const m = hudEdTarget(e);
  if (!m || e.button !== 0) return;
  e.preventDefault(); e.stopPropagation();
  const r = m.el.getBoundingClientRect();
  hudEditor.drag = { m, ox: e.clientX - r.left, oy: e.clientY - r.top };
  m.el.classList.add('drag');
}
function hudEdMove(e) {
  const d = hudEditor.drag;
  if (!d) return;
  e.preventDefault();
  const W = window.innerWidth, H = window.innerHeight, [w, h] = hudSize(d.m), snap = 8, edge = 4;
  let left = extClamp(e.clientX - d.ox, 0, Math.max(0, W - w)), top = extClamp(e.clientY - d.oy, 0, Math.max(0, H - h));
  let cx = false, cy = false;
  if (Math.abs(left + w / 2 - W / 2) < snap) { left = W / 2 - w / 2; cx = true; }
  else if (left < edge + snap) left = edge;
  else if (W - (left + w) < edge + snap) left = W - w - edge;
  if (Math.abs(top + h / 2 - H / 2) < snap) { top = H / 2 - h / 2; cy = true; }
  else if (top < edge + snap) top = edge;
  else if (H - (top + h) < edge + snap) top = H - h - edge;
  d.m.el.style.left = Math.round(left) + 'px';
  d.m.el.style.top = Math.round(top) + 'px';
  d.left = left; d.top = top;
  if (hudEditor.el) {
    hudEditor.el.querySelector('.uv2-hud-guide.v').classList.toggle('show', cx);
    hudEditor.el.querySelector('.uv2-hud-guide.h').classList.toggle('show', cy);
  }
}
function hudEdUp() {
  const d = hudEditor.drag;
  if (!d) return;
  if (d.left != null) { d.m.settings.pos = hudPosFrom(d.m, d.left, d.top); extSaveSettings(d.m); }
  else setTimeout(() => hudPanelOpen(d.m), 0);
  d.m.el.classList.remove('drag');
  hudEditor.drag = null;
  if (hudEditor.el) hudEditor.el.querySelectorAll('.uv2-hud-guide').forEach(g => g.classList.remove('show'));
}
function hudEdWheel(e) {
  const m = hudEdTarget(e);
  if (!m) return;
  e.preventDefault(); e.stopPropagation();
  m.settings.scale = +extClamp((m.settings.scale || 1) + (e.deltaY < 0 ? 0.05 : -0.05), 0.5, 2.5).toFixed(2);
  m._dirty = true;
  extSaveSettings(m);
}
function hudEdContext(e) {
  const m = hudEdTarget(e);
  if (!m) return;
  e.preventDefault(); e.stopPropagation();
  m.settings.pos = null; m.settings.scale = 1; m._dirty = true;
  extSaveSettings(m);
}
function hudEdKey(e) {
  if (e.key !== 'Escape') return;
  e.preventDefault(); e.stopImmediatePropagation();
  if (hudEditor.panelFor) { hudPanelClose(); return; }
  hudCloseEditor();
}

const fpsState = { frames: 0, t: performance.now(), value: 0 };
(function fpsTick() { requestAnimationFrame(fpsTick); fpsState.frames++; const now = performance.now(); if (now - fpsState.t >= 500) { fpsState.value = fpsState.frames * 1000 / (now - fpsState.t); fpsState.frames = 0; fpsState.t = now; } })();
hudDefine({
  id: 'fps', cat: 'hud', name: 'FPS Display', desc: 'Shows your frames per second.',
  def: { l: 8, t: 176 }, hudOpts: { brackets: true },
  defaults: { format: 'label', colorize: false },
  controls: [
    { key: 'format', type: 'seg', label: 'Format', options: HUD_FORMATS('FPS', '144') },
    { key: 'colorize', type: 'toggle', label: 'Color by performance' }
  ],
  render() {
    const v = Math.round(fpsState.value);
    const val = this.settings.colorize ? `<span style="color:${v >= 60 ? '#5eea7a' : v >= 30 ? '#f5c542' : '#ff5c5c'}">${v}</span>` : v;
    return hudFmt(this, 'FPS', val);
  }
});
hudDefine({
  id: 'cps', cat: 'hud', name: 'CPS Display', desc: 'Shows how many times you click per second.',
  def: { l: 8, t: 206 }, hudOpts: { brackets: true },
  defaults: { format: 'label', right: true },
  controls: [
    { key: 'format', type: 'seg', label: 'Format', options: HUD_FORMATS('CPS', '9') },
    { key: 'right', type: 'toggle', label: 'Show right clicks' }
  ],
  render() {
    const l = hudCps(hudClicks.l), r = hudCps(hudClicks.r);
    return hudFmt(this, 'CPS', this.settings.right ? `${l} <span class="uv2-hud-l">|</span> ${r}` : l);
  }
});
const speedState = { last: null, t: 0, value: 0 };
hudDefine({
  id: 'speed', cat: 'hud', name: 'Speed Display', desc: 'Shows how fast you are moving.',
  def: { l: 8, t: 266 }, hudOpts: { brackets: true },
  defaults: { format: 'label', unit: 'bps' },
  controls: [
    { key: 'format', type: 'seg', label: 'Format', options: HUD_FORMATS('Speed', '5.6') },
    { key: 'unit', type: 'seg', label: 'Unit', options: [['bps', 'Blocks/s'], ['kmh', 'km/h']] }
  ],
  sample() {
    const p = hudPlayer(), now = performance.now();
    if (!p || !p.pos) { speedState.last = null; speedState.value = 0; return; }
    if (!speedState.last) { speedState.last = { x: p.pos.x, z: p.pos.z }; speedState.t = now; return; }
    if (now - speedState.t < 200) return;
    const v = Math.hypot(p.pos.x - speedState.last.x, p.pos.z - speedState.last.z) / ((now - speedState.t) / 1000);
    speedState.value = v > 100 ? 0 : speedState.value * 0.4 + v * 0.6;
    speedState.last = { x: p.pos.x, z: p.pos.z }; speedState.t = now;
  },
  render(preview) {
    let v = speedState.value;
    if (preview && !hudPlayer()) v = 5.61;
    const kmh = this.settings.unit === 'kmh';
    return hudFmt(this, 'Speed', `${(kmh ? v * 3.6 : v).toFixed(kmh ? 1 : 2)} <span class="uv2-hud-l">${kmh ? 'km/h' : 'b/s'}</span>`);
  }
});

hudDefine({
  id: 'keystrokes', cat: 'hud', name: 'Keystrokes', desc: 'Shows the keys and mouse buttons you press.',
  def: { l: 8, t: 8 }, box: false, hudOpts: { keys: true },
  hudDefaults: { bgOpacity: 0.45 },
  defaults: { mouse: true, cps: true, space: true, keySize: 40, gap: 3, press: 'white', pressColor: '#ffffff', fade: true },
  controls: [
    { key: 'mouse', type: 'toggle', label: 'Mouse buttons' },
    { key: 'cps', type: 'toggle', label: 'CPS under mouse buttons', show: s => s.mouse },
    { key: 'space', type: 'toggle', label: 'Space bar' },
    { key: 'keySize', type: 'slider', label: 'Key size', min: 26, max: 64, step: 1, fmt: v => v + 'px' },
    { key: 'gap', type: 'slider', label: 'Key spacing', min: 0, max: 10, step: 1, fmt: v => v + 'px' },
    { key: 'press', type: 'seg', label: 'Pressed color', options: [['white', 'White'], ['accent', 'Accent'], ['custom', 'Custom']] },
    { key: 'pressColor', type: 'color', label: 'Custom pressed color', show: s => s.press === 'custom' },
    { key: 'fade', type: 'toggle', label: 'Smooth fade' }
  ],
  style(el) {
    const s = this.settings, c = s.press === 'accent' ? guiPrimaryColor : s.press === 'custom' ? s.pressColor : '#ffffff';
    el.style.setProperty('--hud-press', hudRgba(c, 0.85));
    el.style.setProperty('--hud-press-fg', hudLum(c) > 0.6 ? '#111' : '#fff');
  },
  render() {
    const s = this.settings, on = c => hudKeys.has(c) ? ' on' : '', mb = b => hudMouse.has(b) && document.pointerLockElement ? ' on' : '';
    let h = `<div class="uv2-ks" style="--k:${s.keySize}px;--g:${s.gap}px;--fade:${s.fade ? '90ms' : '0s'}">`;
    h += `<span></span><div class="uv2-ks-k${on('KeyW')}">W</div><span></span>`;
    h += `<div class="uv2-ks-k${on('KeyA')}">A</div><div class="uv2-ks-k${on('KeyS')}">S</div><div class="uv2-ks-k${on('KeyD')}">D</div>`;
    if (s.mouse) {
      const l = s.cps ? `<small>${hudCps(hudClicks.l)} CPS</small>` : '', r = s.cps ? `<small>${hudCps(hudClicks.r)} CPS</small>` : '';
      h += `<div class="uv2-ks-m"><div class="uv2-ks-k${mb(0)}">LMB${l}</div><div class="uv2-ks-k${mb(2)}">RMB${r}</div></div>`;
    }
    if (s.space) h += `<div class="uv2-ks-k uv2-ks-sp${on('Space')}"><i></i></div>`;
    return h + '</div>';
  }
});

hudDefine({
  id: 'clock', cat: 'hud', name: 'Clock', desc: 'Shows the real time so you do not have to leave full screen.',
  def: { l: 8, t: 296 }, hudOpts: { brackets: true },
  defaults: { h24: false, seconds: false, date: false },
  controls: [
    { key: 'h24', type: 'toggle', label: '24 hour time' },
    { key: 'seconds', type: 'toggle', label: 'Show seconds' },
    { key: 'date', type: 'toggle', label: 'Show date' }
  ],
  render() {
    const s = this.settings, d = new Date(), pad = n => String(n).padStart(2, '0');
    let h = d.getHours(), suffix = '';
    if (!s.h24) { suffix = ` <span class="uv2-hud-l">${h >= 12 ? 'PM' : 'AM'}</span>`; h = h % 12 || 12; }
    let t = `${s.h24 ? pad(h) : h}:${pad(d.getMinutes())}${s.seconds ? ':' + pad(d.getSeconds()) : ''}${suffix}`;
    if (s.date) t = `<span class="uv2-hud-l">${d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })} &middot;</span> ${t}`;
    return s.brackets ? `<span class="uv2-hud-l">[</span>${t}<span class="uv2-hud-l">]</span>` : t;
  }
});

const sessionState = { key: null, start: 0 };
hudDefine({
  id: 'session', cat: 'hud', name: 'Session Timer', desc: 'Shows how long you have been in the current server.',
  def: { l: 8, t: 326 }, hudOpts: { brackets: true },
  defaults: { showServer: true },
  controls: [{ key: 'showServer', type: 'toggle', label: 'Show server name' }],
  sample() {
    if (!extInWorld()) { sessionState.key = null; return; }
    const si = G.serverInfo || {}, key = (si.serverId || '') + '|' + (si.inviteCode || '') + '|' + (si.serverName || '');
    if (key !== sessionState.key) { sessionState.key = key; sessionState.start = Date.now(); }
  },
  render(preview) {
    const live = extInWorld(), si = (live && G.serverInfo) || {};
    const time = live ? extFmtTime((Date.now() - sessionState.start) / 1000) : preview ? '24:07' : '';
    if (!time) return '';
    const name = live ? si.serverName || si.serverCategory || '' : 'Skywars';
    let t = `<i class="fa fa-clock-o uv2-hud-l"></i> ${time}${this.settings.showServer && name ? ` <span class="uv2-hud-l">&middot; ${hudEsc(name)}</span>` : ''}`;
    return this.settings.brackets ? `<span class="uv2-hud-l">[</span>${t}<span class="uv2-hud-l">]</span>` : t;
  }
});

const ARMOR_ORDER = [/helmet|cap|skull|head/, /chestplate|tunic|elytra/, /leggings|pants/, /boots/];
function hudItem(slot) {
  if (!slot || !slot.item) return null;
  const it = slot.item;
  return { name: it.name, label: it.displayName || hudPretty(it.name), dmg: slot.itemDamage || 0, max: it.maxDurability || 0, count: slot.stackSize || 1, ench: armorHudGetEnchantLabels(slot).map(e => e.short) };
}
function hudArmor() {
  const p = hudPlayer(), arr = p && p.inventory && p.inventory.armor;
  if (!arr) return null;
  const items = [...arr].map((s, i) => ({ i, it: hudItem(s) })).filter(x => x.it);
  const rank = x => { const k = ARMOR_ORDER.findIndex(r => r.test(String(x.it.name))); return k < 0 ? 10 + x.i : k; };
  return items.sort((a, b) => rank(a) - rank(b)).map(x => x.it);
}
const HUD_DEMO_ARMOR = [
  { name: 'diamond_helmet', label: 'Diamond Helmet', dmg: 26, max: 363, count: 1, ench: ['Prot II'] },
  { name: 'iron_chestplate', label: 'Iron Chestplate', dmg: 86, max: 240, count: 1, ench: [] },
  { name: 'diamond_leggings', label: 'Diamond Leggings', dmg: 340, max: 495, count: 1, ench: ['Prot I', 'Unb III'] },
  { name: 'diamond_boots', label: 'Diamond Boots', dmg: 398, max: 429, count: 1, ench: [] }
];
const armorWarned = new Set();
function hudItemRow(m, it, size) {
  const s = m.settings, pct = it.max ? Math.max(0, Math.round((1 - it.dmg / it.max) * 100)) : null;
  const ic = armorHudGetIconStyle(it.name, size);
  const icon = ic ? `<div class="uv2-ar-ic" style="${ic}"></div>` : `<div class="uv2-ar-ic none" style="width:${size}px;height:${size}px"></div>`;
  let val = '';
  if (pct == null) val = it.count > 1 ? `${it.count}` : '';
  else if (s.dur === 'percent') val = pct + '%';
  else if (s.dur === 'number') val = String(it.max - it.dmg);
  const valHtml = val ? `<span class="uv2-ar-d" style="${pct != null && s.colorDur ? `color:${hudDurColor(pct)}` : ''}">${val}</span>` : '';
  const name = s.names ? `<span class="uv2-ar-name">${hudEsc(it.label)}</span>` : '';
  const bar = s.bar && pct != null ? `<div class="uv2-ar-bar"><i style="width:${pct}%;background:${hudDurColor(pct)}"></i></div>` : '';
  const ench = s.enchants && it.ench && it.ench.length ? `<div class="uv2-ar-en">${it.ench.map(hudEsc).join(' &middot; ')}</div>` : '';
  const warn = s.warn && pct != null && pct <= 10 ? ' warn' : '';
  if (s.layout === 'horizontal') return `<div class="uv2-ar-row${warn}">${icon}${valHtml}${bar}</div>`;
  return `<div class="uv2-ar-row${warn}">${icon}<div class="uv2-ar-t"><div class="uv2-ar-top">${name}${valHtml}</div>${bar}${ench}</div></div>`;
}
hudDefine({
  id: 'armorhud', cat: 'hud', name: 'Armor HUD', desc: 'Your armor and held item with durability and enchants.',
  def: { r: 10, b: 96 }, hudOpts: {},
  hudDefaults: { background: false, bgOpacity: 0.4 },
  defaults: { layout: 'vertical', dur: 'percent', bar: true, colorDur: true, names: false, enchants: true, held: true, warn: true, iconSize: 22 },
  controls: [
    { key: 'layout', type: 'seg', label: 'Layout', options: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']] },
    { key: 'dur', type: 'seg', label: 'Durability', options: [['percent', 'Percent'], ['number', 'Number'], ['off', 'Off']] },
    { key: 'bar', type: 'toggle', label: 'Durability bar' },
    { key: 'colorDur', type: 'toggle', label: 'Color by durability' },
    { key: 'names', type: 'toggle', label: 'Item names', show: s => s.layout === 'vertical' },
    { key: 'enchants', type: 'toggle', label: 'Enchantments', show: s => s.layout === 'vertical' },
    { key: 'held', type: 'toggle', label: 'Held item' },
    { key: 'warn', type: 'toggle', label: 'Warn when armor is about to break' },
    { key: 'iconSize', type: 'slider', label: 'Icon size', min: 14, max: 40, step: 1, fmt: v => v + 'px' }
  ],
  sample() {
    if (!this.settings.warn) return;
    const items = hudArmor();
    if (!items) return;
    const now = new Set();
    items.forEach(it => {
      if (!it.max) return;
      const key = it.name;
      if ((1 - it.dmg / it.max) <= 0.1) {
        now.add(key);
        if (!armorWarned.has(key)) { armorWarned.add(key); showNotification(`${it.label} is about to break`); try { extBeep(520, 160, 0.12); } catch(e) {} }
      }
    });
    [...armorWarned].forEach(k => { if (!now.has(k)) armorWarned.delete(k); });
  },
  render(preview) {
    const s = this.settings;
    let items = hudArmor();
    let held = null;
    const p = hudPlayer();
    if (s.held && p && p.inventory && p.inventory.getCurrentItem) { try { held = hudItem(p.inventory.getCurrentItem()); } catch(e) {} }
    if (preview && (!items || (!items.length && !held))) { items = HUD_DEMO_ARMOR; held = s.held ? { name: 'diamond_sword', label: 'Diamond Sword', dmg: 210, max: 1562, count: 1, ench: ['Sharp II'] } : null; }
    const rows = (items || []).slice();
    if (held) rows.push(held);
    if (!rows.length) return '';
    return `<div class="uv2-ar${s.layout === 'horizontal' ? ' h' : ''}" style="--ic:${s.iconSize}px">${rows.map(it => hudItemRow(this, it, s.iconSize)).join('')}</div>`;
  }
});

const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
hudDefine({
  id: 'potions', cat: 'hud', name: 'Potion Effects', desc: 'Lists your active effects and how long they have left.',
  def: { r: 10, t: 10 }, hudOpts: {},
  defaults: { blink: true, sort: true },
  controls: [
    { key: 'blink', type: 'toggle', label: 'Blink when about to run out' },
    { key: 'sort', type: 'toggle', label: 'Sort by time left' }
  ],
  render(preview) {
    const p = hudPlayer(), map = p && p.activePotionsMap;
    let list = map ? [...map.values()].map(e => {
      let name = 'Effect';
      try { name = e.getEffectName(); } catch(x) {}
      return { name, amp: (e.getAmplifier ? e.getAmplifier() : e.amplifier) || 0, dur: (e.getDuration ? e.getDuration() : e.duration) || 0, color: typeof e.color === 'number' ? '#' + e.color.toString(16).padStart(6, '0') : null };
    }) : [];
    if (!list.length && preview) list = [{ name: 'Speed', amp: 1, dur: 1680, color: '#7cafc6' }, { name: 'Strength', amp: 0, dur: 620, color: '#932423' }, { name: 'Regeneration', amp: 1, dur: 150, color: '#cd5cab' }];
    if (!list.length) return '';
    if (this.settings.sort) list.sort((a, b) => b.dur - a.dur);
    return `<div class="uv2-po">${list.map(e => {
      const sec = Math.floor(e.dur / 20), time = e.dur > 20 * 60 * 60 * 24 ? '&infin;' : extFmtTime(sec);
      return `<div class="uv2-po-r${this.settings.blink && sec <= 10 ? ' blink' : ''}"><i class="uv2-po-dot" style="color:${e.color || guiPrimaryColor};background:${e.color || guiPrimaryColor}"></i><span class="uv2-po-n">${hudEsc(e.name)}${e.amp ? ' ' + (ROMAN[e.amp + 1] || e.amp + 1) : ''}</span><span class="uv2-po-t">${time}</span></div>`;
    }).join('')}</div>`;
  }
});

const COMPASS_NAMES = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
hudDefine({
  id: 'compass', cat: 'hud', name: 'Compass', desc: 'A heading bar that shows which way you are facing.',
  def: { cx: 0, t: 8 }, hudOpts: {},
  hudDefaults: { bgOpacity: 0.3 },
  defaults: { width: 240, degrees: true },
  controls: [
    { key: 'width', type: 'slider', label: 'Width', min: 140, max: 420, step: 10, fmt: v => v + 'px' },
    { key: 'degrees', type: 'toggle', label: 'Show degrees' }
  ],
  render(preview) {
    const p = hudPlayer();
    let heading;
    if (p && typeof p.yaw === 'number') heading = ((-p.yaw * 180 / Math.PI) % 360 + 360) % 360;
    else if (preview) heading = 32;
    else return '';
    const W = this.settings.width, ppd = W / 150;
    let marks = '';
    for (let d = 0; d < 360; d += 15) {
      const diff = ((d - heading + 540) % 360) - 180;
      if (Math.abs(diff) > 78) continue;
      const label = d % 45 === 0 ? COMPASS_NAMES[d / 45] : '';
      marks += `<div class="uv2-cp-m${d % 90 === 0 ? ' major' : ''}${d === 0 ? ' north' : ''}" style="left:${(W / 2 + diff * ppd).toFixed(1)}px"><i></i>${label ? `<b>${label}</b>` : ''}</div>`;
    }
    const facing = COMPASS_NAMES[Math.round(heading / 45) % 8];
    return `<div class="uv2-cp" style="--cw:${W}px">${marks}<div class="uv2-cp-c"></div></div>${this.settings.degrees ? `<div class="uv2-cp-deg">${Math.round(heading)}&deg; ${facing}</div>` : ''}`;
  }
});

hudDefine({
  id: 'items', cat: 'hud', name: 'Item Counter', desc: 'Counts items in your inventory, like arrows or pearls.',
  def: { r: 10, b: 300 }, hudOpts: {},
  hudDefaults: { background: false },
  defaults: { items: 'arrow, golden_apple, ender_pearl', hideZero: false, names: false, layout: 'vertical' },
  controls: [
    { key: 'items', type: 'text', label: 'Items to count', placeholder: 'arrow, golden_apple, ender_pearl' },
    { key: 'layout', type: 'seg', label: 'Layout', options: [['vertical', 'Vertical'], ['horizontal', 'Horizontal']] },
    { key: 'names', type: 'toggle', label: 'Item names' },
    { key: 'hideZero', type: 'toggle', label: 'Hide items you have none of' }
  ],
  render(preview) {
    const s = this.settings, terms = String(s.items || '').split(',').map(t => t.trim().toLowerCase().replace(/\s+/g, '_')).filter(Boolean).slice(0, 10);
    const p = hudPlayer(), inv = p && p.inventory;
    const stacks = inv ? [...(inv.mainInventory || []), ...(inv.offHand || [])].filter(x => x && x.item) : null;
    if (!terms.length) return '';
    const demo = [16, 3, 2, 1, 7, 12];
    const rows = terms.map((t, i) => {
      let count = 0, name = t;
      if (stacks) stacks.forEach(st => { if (String(st.item.name).toLowerCase().includes(t)) { count += st.stackSize || 1; name = st.item.name; } });
      else if (preview) count = demo[i % demo.length];
      return { t, count, name };
    }).filter(r => !(s.hideZero && !r.count));
    if (!rows.length) return '';
    const size = 20;
    return `<div class="uv2-ar${s.layout === 'horizontal' ? ' h' : ''}">${rows.map(r => {
      const ic = armorHudGetIconStyle(r.name, size);
      const icon = ic ? `<div class="uv2-ar-ic" style="${ic}"></div>` : `<div class="uv2-ar-ic none" style="width:${size}px;height:${size}px"></div>`;
      return `<div class="uv2-ar-row${r.count ? '' : ' zero'}">${icon}${s.names && s.layout !== 'horizontal' ? `<span class="uv2-ar-name">${hudEsc(hudPretty(r.name))}</span>` : ''}<span class="uv2-ar-d">${r.count}</span></div>`;
    }).join('')}</div>`;
  }
});

const hudHits = { at: 0, last: 0, reach: 0, combo: 0, best: 0, self: 0, hurt: new WeakMap(), listeners: [] };
function hudTrackHits() {
  const now = performance.now();
  if (now - hudHits.at < 4) return;
  hudHits.at = now;
  const p = hudPlayer(), list = G && G.world && G.world.loadedEntityList;
  if (!p || !p.pos || !list) return;
  const sh = p.hurtTime || 0;
  if (sh > hudHits.self && sh >= 8) hudHits.combo = 0;
  hudHits.self = sh;
  if (now - hudHits.last > 2000) hudHits.combo = 0;
  const recent = now - extLastClick < 450, eye = p.pos.y + 1.62;
  for (const e of list) {
    if (!e || e === p || !e.pos) continue;
    const h = e.hurtTime || 0, prev = hudHits.hurt.get(e) || 0;
    hudHits.hurt.set(e, h);
    if (!(recent && h > prev && h >= 8)) continue;
    const hw = (e.width || 0.6) / 2, hh = e.height || 1.8;
    const cx = extClamp(p.pos.x, e.pos.x - hw, e.pos.x + hw), cy = extClamp(eye, e.pos.y, e.pos.y + hh), cz = extClamp(p.pos.z, e.pos.z - hw, e.pos.z + hw);
    const dist = Math.hypot(cx - p.pos.x, cy - eye, cz - p.pos.z);
    if (dist > 7) continue;
    hudHits.reach = dist; hudHits.last = now; hudHits.combo++;
    hudHits.best = Math.max(hudHits.best, hudHits.combo);
    hudHits.listeners.forEach(fn => { try { fn(e, dist); } catch(x) {} });
  }
}
hudDefine({
  id: 'reach', cat: 'hud', name: 'Reach Display', desc: 'Shows how far away you were on your last hit.',
  def: { cx: 0, cy: 38 }, hudOpts: { brackets: true },
  hudDefaults: { background: false },
  defaults: { format: 'suffix', decimals: 2, hideAfter: 3 },
  controls: [
    { key: 'format', type: 'seg', label: 'Format', options: HUD_FORMATS('blocks', '3.04') },
    { key: 'decimals', type: 'slider', label: 'Decimals', min: 1, max: 3, step: 1, fmt: v => v },
    { key: 'hideAfter', type: 'slider', label: 'Hide after', min: 0, max: 15, step: 1, fmt: v => v ? v + 's' : 'Never' }
  ],
  sample() { if (extInWorld()) hudTrackHits(); },
  render(preview) {
    const idle = performance.now() - hudHits.last;
    if (!hudHits.last || (this.settings.hideAfter && idle > this.settings.hideAfter * 1000)) return preview ? hudFmt(this, 'blocks', (3.04).toFixed(this.settings.decimals)) : '';
    return hudFmt(this, 'blocks', hudHits.reach.toFixed(this.settings.decimals));
  }
});
hudDefine({
  id: 'combo', cat: 'hud', name: 'Combo Counter', desc: 'Counts hits in a row until you get hit or stop hitting.',
  def: { cx: 0, cy: 62 }, hudOpts: { brackets: true },
  hudDefaults: { background: false },
  defaults: { hideZero: true },
  controls: [{ key: 'hideZero', type: 'toggle', label: 'Hide when there is no combo' }],
  sample() { if (extInWorld()) hudTrackHits(); },
  render(preview) {
    const c = hudHits.combo;
    if (!c) return this.settings.hideZero ? (preview ? `4 <span class="uv2-hud-l">Combo</span>` : '') : `<span class="uv2-hud-l">No Combo</span>`;
    const t = `${c} <span class="uv2-hud-l">${c === 1 ? 'Hit' : 'Combo'}</span>`;
    return this.settings.brackets ? `<span class="uv2-hud-l">[</span>${t}<span class="uv2-hud-l">]</span>` : t;
  }
});

const statsState = { kills: 0, deaths: 0, alive: true, key: null };
hudDefine({
  id: 'stats', cat: 'hud', name: 'Session Stats', desc: 'Kills, deaths, K/D and best combo for this server.',
  def: { l: 8, t: 386 }, hudOpts: {},
  defaults: { kd: true, combo: true },
  controls: [
    { key: 'kd', type: 'toggle', label: 'Show K/D' },
    { key: 'combo', type: 'toggle', label: 'Show best combo' },
    { type: 'buttons', label: 'Stats', buttons: [['Reset', 1]], onClick: () => { statsState.kills = statsState.deaths = 0; hudHits.best = 0; } }
  ],
  onKill() { statsState.kills++; },
  sample() {
    const p = hudPlayer();
    if (!extInWorld() || !p) return;
    const si = G.serverInfo || {}, key = (si.serverId || '') + '|' + (si.inviteCode || '');
    if (key !== statsState.key) { statsState.key = key; statsState.kills = statsState.deaths = 0; hudHits.best = 0; }
    let hp = 1;
    try { hp = p.getHealth(); } catch(e) {}
    const alive = !p.dead && hp > 0;
    if (statsState.alive && !alive) statsState.deaths++;
    statsState.alive = alive;
    hudTrackHits();
  },
  render(preview) {
    const s = this.settings, live = extInWorld();
    const k = live ? statsState.kills : preview ? 7 : 0, d = live ? statsState.deaths : preview ? 2 : 0, best = live ? hudHits.best : preview ? 5 : 0;
    if (!live && !preview) return '';
    const row = (l, v) => `<div class="uv2-st-r"><span class="uv2-hud-l">${l}</span><b>${v}</b></div>`;
    return `<div class="uv2-st">${row('Kills', k)}${row('Deaths', d)}${s.kd ? row('K/D', (d ? k / d : k).toFixed(2)) : ''}${s.combo ? row('Best combo', best) : ''}</div>`;
  }
});

hudDefine({
  id: 'keepsprint', cat: 'utility', name: 'Keep Sprint', desc: 'Keeps you sprinting while you move forward. Works with any keybinds.',
  def: { l: 8, t: 356 }, hudOpts: { brackets: true, when: s => s.indicator },
  hudDefaults: { background: false },
  defaults: { indicator: false, always: false },
  controls: [
    { key: 'indicator', type: 'toggle', label: 'Show sprint status on screen' },
    { key: 'always', type: 'toggle', label: 'Show status even when not sprinting', show: s => s.indicator }
  ],
  frame() {
    const p = hudPlayer();
    if (!extInWorld() || !p || !document.pointerLockElement) return;
    const ci = p.currentInput;
    const forward = ci ? !!ci.up && !ci.down : (hudKeys.has('KeyW') || hudKeys.has('ArrowUp'));
    if (!forward || (ci && (ci.sneak || ci.usingItem)) || p.sneak) return;
    try { if (p.isSprinting()) return; } catch(e) { return; }
    try { if (p.isUsingItem && p.isUsingItem()) return; } catch(e) {}
    try { if (p.getFoodStats().getFoodLevel() <= 6 && !(p.abilities && p.abilities.mayFly)) return; } catch(e) {}
    try { p.setSprinting(true); } catch(e) {}
  },
  previewable() { return this.settings.indicator; },
  visible() {
    if (!this.settings.indicator) return false;
    if (this.settings.always) return true;
    try { return !!hudPlayer().isSprinting(); } catch(e) { return false; }
  },
  render() {
    let sprinting = true;
    try { sprinting = extInWorld() ? !!hudPlayer().isSprinting() : true; } catch(e) {}
    const t = sprinting ? `Sprinting <span class="uv2-hud-l">(Kept)</span>` : `<span class="uv2-hud-l">Sprint Kept</span>`;
    return this.settings.brackets ? `<span class="uv2-hud-l">[</span>${t}<span class="uv2-hud-l">]</span>` : t;
  }
});

const lowHpState = { el: null, beepAt: 0 };
extDefine({
  id: 'lowhp', cat: 'visuals', name: 'Low Health Warning', desc: 'The screen edges pulse red when you are low on health.',
  defaults: { hearts: 4, strength: 0.8, sound: false },
  controls: [
    { key: 'hearts', type: 'slider', label: 'Warn at', min: 1, max: 8, step: 0.5, fmt: v => v + (v === 1 ? ' heart' : ' hearts') },
    { key: 'strength', type: 'slider', label: 'Strength', min: 0.2, max: 1, step: 0.05, fmt: hudPct },
    { key: 'sound', type: 'toggle', label: 'Heartbeat sound' }
  ],
  enable() {
    if (lowHpState.el) return;
    const el = document.createElement('div');
    el.id = 'uv2-lowhp';
    document.body.appendChild(el);
    lowHpState.el = el;
  },
  disable() { if (lowHpState.el) lowHpState.el.remove(); lowHpState.el = null; },
  frame() {
    const el = lowHpState.el, p = hudPlayer();
    if (!el) return;
    let hp = 20, max = 20;
    try { hp = p.getHealth(); max = p.getMaxHealth() || 20; } catch(e) {}
    const thr = this.settings.hearts * 2;
    if (!extInWorld() || !p || hp <= 0 || hp > thr) { el.style.opacity = '0'; return; }
    const low = 1 - hp / Math.max(thr, 1), now = performance.now(), speed = 0.004 + low * 0.006;
    const pulse = 0.7 + 0.3 * Math.sin(now * speed);
    el.style.opacity = String(this.settings.strength * (0.45 + 0.55 * low) * pulse);
    if (this.settings.sound && now - lowHpState.beepAt > 1100 - low * 500) { lowHpState.beepAt = now; try { extBeep(62, 90, 0.25); setTimeout(() => extBeep(55, 80, 0.18), 160); } catch(e) {} }
  }
});

hudDefine({
  id: 'ping', cat: 'hud', name: 'Ping Display', desc: 'Shows your connection delay to the server.',
  def: { l: 8, t: 236 }, hudOpts: { brackets: true },
  defaults: { format: 'label', jitter: false, colorize: true },
  controls: [
    { key: 'format', type: 'seg', label: 'Format', options: [['label', 'Ping: 42 ms'], ['value', '42 ms']] },
    { key: 'colorize', type: 'toggle', label: 'Color by ping' },
    { key: 'jitter', type: 'toggle', label: 'Show jitter' }
  ],
  render(preview) {
    const rm = G && G.resourceMonitor;
    let v = rm && extInWorld() ? Math.round(rm.filteredPing) : null, j = rm ? Math.round(rm.filteredJitter || 0) : 0;
    if (!v && preview) { v = 42; j = 3; }
    if (!v) return '';
    const num = this.settings.colorize ? `<span style="color:${v <= 80 ? '#5eea7a' : v <= 160 ? '#f5c542' : '#ff5c5c'}">${v}</span>` : v;
    return hudFmt(this, 'Ping', `${num} <span class="uv2-hud-l">ms</span>${this.settings.jitter ? ` <span class="uv2-hud-l">&plusmn;${j}</span>` : ''}`);
  }
});

const COORD_FACING = [['North', '-Z'], ['East', '+X'], ['South', '+Z'], ['West', '-X']];
hudDefine({
  id: 'coords', cat: 'hud', name: 'Coordinates', desc: 'Your position and the direction you are facing.',
  def: { cx: 0, t: 62 }, hudOpts: { brackets: true },
  defaults: { decimals: 1, facing: true, layout: 'line' },
  controls: [
    { key: 'layout', type: 'seg', label: 'Layout', options: [['line', 'One line'], ['stack', 'Stacked']] },
    { key: 'decimals', type: 'slider', label: 'Decimals', min: 0, max: 2, step: 1, fmt: v => v },
    { key: 'facing', type: 'toggle', label: 'Show facing direction' }
  ],
  render(preview) {
    const p = hudPlayer(), s = this.settings;
    const pos = p && p.pos ? p.pos : preview ? { x: 67.3, y: 106, z: 118.4 } : null;
    if (!pos) return '';
    const f = n => n.toFixed(s.decimals), L = t => `<span class="uv2-hud-l">${t}</span>`;
    const yaw = p && typeof p.yaw === 'number' ? p.yaw : -0.6;
    const h = ((-yaw * 180 / Math.PI) % 360 + 360) % 360, [dir, axis] = COORD_FACING[Math.round(h / 90) % 4];
    const face = s.facing ? `${L('Facing:')} ${dir} ${L('(' + axis + ')')}` : '';
    if (s.layout === 'stack') return `<div class="uv2-st">${['X', 'Y', 'Z'].map((k, i) => `<div class="uv2-st-r">${L(k)}<b>${f([pos.x, pos.y, pos.z][i])}</b></div>`).join('')}${face ? `<div class="uv2-st-r">${face}</div>` : ''}</div>`;
    let t = `${L('XYZ:')} ${f(pos.x)} ${L('/')} ${f(pos.y)} ${L('/')} ${f(pos.z)}`;
    if (s.brackets) t = `${L('[')}${t}${L(']')}`;
    return face ? `<div>${t}</div><div>${face}</div>` : t;
  }
});

const HUD_NATIVE = [
  { mod: 'fps', re: /^\d+(\.\d+)?\s*fps$/i },
  { mod: 'ping', re: /^\d+\s*ms(\s*[±+-]\s*\d+\s*ms)?$/i },
  { mod: 'cps', re: /^\d+\s*cps$/i },
  { mod: 'coords', re: /^xyz\b/i },
  { mod: 'potions', test: txt => hudPotionLabels().some(l => txt === l || txt.startsWith(l + ' (')) }
];
let hudNativeAt = 0;
function hudPotionLabels() {
  const p = hudPlayer(), map = p && p.activePotionsMap;
  if (!map) return [];
  const out = [];
  map.forEach(e => { try { const n = e.getAmplifier() + 1; out.push(e.getEffectName() + ' ' + (ROMAN[n] || n)); } catch(x) {} });
  return out;
}
function hudRestoreNative(id) {
  document.querySelectorAll('[data-uv2-native]').forEach(el => {
    if (id && el.dataset.uv2Native !== id) return;
    el.style.display = el.dataset.uv2Display || '';
    delete el.dataset.uv2Native;
    delete el.dataset.uv2Display;
  });
}
function hudHideNative() {
  const now = performance.now();
  if (now - hudNativeAt < 700 || !extInWorld()) return;
  hudNativeAt = now;
  const rules = HUD_NATIVE.filter(r => { const m = extById(r.mod); return m && m.on; });
  if (!rules.length) return;
  const root = document.getElementById('react') || document.body;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const seen = new Set();
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    const el = n.parentElement;
    if (!el || seen.has(el) || el.dataset.uv2Native) continue;
    seen.add(el);
    const txt = (el.textContent || '').trim();
    if (!txt || txt.length > 48 || el.closest('#uv2-main-ui,.uv2-hud,#uv2-hud-editor,input,textarea')) continue;
    for (const r of rules) {
      if (!(r.re ? r.re.test(txt) : r.test(txt))) continue;
      el.dataset.uv2Native = r.mod;
      el.dataset.uv2Display = el.style.display || '';
      el.style.display = 'none';
      break;
    }
  }
}

const HUD_STYLE_KEYS = ['scale', 'textColor', 'customColor', 'shadow', 'brackets', 'background', 'bgOpacity', 'border', 'rounded'];
const hudAll = { id: 'hudall', name: 'All HUD elements', on: true, settings: Object.assign({}, HUD_BASE, extLoad('mod-hudall', {})) };
hudAll.controls = hudStyleControls({ brackets: true }).filter(d => d.type !== 'buttons');
hudAll._prev = Object.assign({}, hudAll.settings);
hudAll.change = function() {
  const changed = HUD_STYLE_KEYS.filter(k => this.settings[k] !== this._prev[k]);
  this._prev = Object.assign({}, this.settings);
  if (!changed.length) return;
  hudMods.forEach(m => { changed.forEach(k => { m.settings[k] = this.settings[k]; }); m._dirty = true; extSaveSettings(m); });
};
function hudPanelOpen(m) {
  const ov = hudEditor.el;
  if (!ov) return;
  let p = document.querySelector('.uv2-hud-panel');
  if (!p) {
    p = document.createElement('div');
    p.className = 'uv2-hud-panel';
    p.addEventListener('input', e => { if (e.target && e.target.type === 'range') uv2PaintRange(e.target); });
    document.body.appendChild(p);
  }
  if (hudEditor.panelFor && hudEditor.panelFor !== m) hudEditor.panelFor._panelRefresh = null;
  hudEditor.panelFor = m;
  hudMods.forEach(x => { if (x.el) x.el.classList.toggle('picked', x === m); });
  const render = () => {
    const keep = p.querySelector('.uv2-hud-panel-body') ? p.querySelector('.uv2-hud-panel-body').scrollTop : 0;
    p.innerHTML = `<div class="uv2-hud-panel-head"><div><div class="uv2-hud-panel-name"></div><div class="uv2-hud-panel-sub"></div></div><div class="uv2-hud-panel-x"><i class="fa fa-times"></i></div></div><div class="uv2-hud-panel-body"></div>`;
    p.querySelector('.uv2-hud-panel-name').textContent = m.name;
    p.querySelector('.uv2-hud-panel-sub').textContent = m === hudAll ? 'Turn elements on or off and style them all at once' : 'Settings for this element';
    p.querySelector('.uv2-hud-panel-x').addEventListener('click', hudPanelClose);
    const body = p.querySelector('.uv2-hud-panel-body');
    if (m === hudAll) {
      const h = document.createElement('div');
      h.className = 'uv2-x-heading';
      h.textContent = 'Elements';
      body.appendChild(h);
      hudMods.filter(x => x.cat === 'hud').forEach(x => body.appendChild(extControlRow(x.name, extToggleInput(x.on, () => { if (x.card) x.card.click(); setTimeout(render, 0); }))));
    }
    body.appendChild(extBuildControls(m));
    body.querySelectorAll('input[type=range]').forEach(uv2PaintRange);
    body.scrollTop = keep;
  };
  m._panelRefresh = render;
  render();
}
function hudPanelClose() {
  const p = document.querySelector('.uv2-hud-panel');
  if (p) p.remove();
  if (hudEditor.panelFor) hudEditor.panelFor._panelRefresh = null;
  hudEditor.panelFor = null;
  hudMods.forEach(x => { if (x.el) x.el.classList.remove('picked'); });
}

const UV2_NET_URL = 'https://uv2-online-default-rtdb.firebaseio.com';
const uv2Online = new Set();
const uv2Net = { beat: 0, pull: 0 };
const uv2NetKey = n => String(n).toLowerCase().replace(/[.#$\[\]\/]/g, '_');
function uv2MyName() { const p = G && G.player; return p ? (p.profile && p.profile.username) || p.name || '' : ''; }
function uv2NetReq(method, path, body) {
  return new Promise(res => {
    if (!UV2_NET_URL || typeof GM_xmlhttpRequest !== 'function') return res(null);
    GM_xmlhttpRequest({
      method, url: UV2_NET_URL.replace(/\/$/, '') + path, data: body ? JSON.stringify(body) : undefined,
      headers: { 'Content-Type': 'application/json' }, timeout: 8000,
      onload: r => { try { res(JSON.parse(r.responseText)); } catch(e) { res(null); } },
      onerror: () => res(null), ontimeout: () => res(null)
    });
  });
}
function uv2NetHide() {
  const me = uv2MyName();
  if (me) uv2NetReq('DELETE', `/uv2/online/${uv2NetKey(me)}.json?print=silent`);
}
function uv2NetTick(share) {
  if (!UV2_NET_URL) return;
  const now = Date.now(), me = uv2MyName();
  if (share && me && now - uv2Net.beat > 120000) { uv2Net.beat = now; uv2NetReq('PUT', `/uv2/online/${uv2NetKey(me)}.json?print=silent`, { t: { '.sv': 'timestamp' } }); }
  if (now - uv2Net.pull > 150000) {
    uv2Net.pull = now;
    const since = Date.now() - 5 * 60 * 1000;
    uv2NetReq('GET', '/uv2/online.json?orderBy=%22t%22&startAt=' + since).then(d => {
      if (!d || typeof d !== 'object' || d.error) return;
      const cut = since - 60 * 1000;
      uv2Online.clear();
      Object.keys(d).forEach(k => { if (d[k] && d[k].t > cut) uv2Online.add(k); });
    });
  }
}

const UV2_LEVEL_COLORS = ['#aba9a5', '#afa99d', '#b3a995', '#b7a98d', '#bba885', '#c0a87d', '#c4a875', '#c9a669', '#d2a159', '#da9c4a', '#e2973a', '#ea922a', '#f28d1a', '#fa880a', '#ff8700', '#ff8e00', '#ff9400', '#ff9a00', '#ffa100', '#ffa700', '#ffae00', '#ffb400', '#ffba00', '#fec100', '#fcc802', '#facf03', '#f8d605', '#f6dd06', '#f4e407', '#f2ea09', '#ecf00a', '#d9f209', '#c6f308', '#b3f507', '#a0f606', '#8df805', '#7af904', '#67fb03', '#54fc02', '#41fe01', '#30ff02', '#33ff1a', '#36ff31', '#38ff49', '#3bff61', '#3eff78', '#40ff90', '#43ffa7', '#46ffbf', '#48ffd6', '#4bffee', '#44eff0', '#3cdff1', '#35cff3', '#2dc0f5', '#26b0f6', '#1ea0f8', '#1790fa', '#1080fb', '#0870fd', '#0161ff', '#0a5bfb', '#1656f7', '#2251f4', '#2d4cf0', '#3948ec', '#4443e8', '#503ee4', '#5c39e0', '#6735dc', '#7330d8', '#7a2ddb', '#812be0', '#8828e5', '#8e26ea', '#9523ef', '#9c21f4', '#a21ef9', '#a91cfe', '#af1dfd', '#b421fa', '#b924f7', '#be28f5', '#c32bf2', '#c82eef', '#cd32ec', '#d235ea', '#d738e7', '#dc3ce4', '#e03ad8', '#e235c5', '#e530b2', '#e82ba0', '#eb278d', '#ed227b', '#f01d68', '#f31856', '#f51343', '#f80e30', '#fb091e', '#fe0404'];
const UV2_NAMED_COLORS = { white: '#ffffff', orange: '#ffa500', magenta: '#ff00ff', light_blue: '#add8e6', yellow: '#ffff00', lime: '#00ff00', pink: '#ffc0cb', gray: '#808080', light_gray: '#d3d3d3', cyan: '#00ffff', aqua: '#00ffff', purple: '#800080', blue: '#0000ff', brown: '#a52a2a', green: '#008000', red: '#ff0000', black: '#000000' };
const UV2_RANKS = {
  pro: ['magenta', 1], legend: ['lime', 2], immortal: ['orange', 3], eternus: ['#FF2D55', 4], retired: ['purple', 6], og: ['aqua', 7],
  builder: ['royalblue', 8], youtube: ['#e94d51', 9], helper: ['aqua', 10], mod: ['yellow', 100], janitor: ['#84C3BE', 101],
  goat: ['#FFA500', 101], manager: ['#23A55A', 101], admin: ['red', 101], owner: ['gold', 101]
};
const UV2_MARK = '⁣⁤';
const UV2_STYLE_CODES = ['bold', 'b', 'italic', 'i', 'underline', 'u', 'reset', 'glow', 'shiny', 'flair', 'shinyup', 'flairup', 'jumble'];
const uv2LevelColor = n => UV2_LEVEL_COLORS[Math.max(0, Math.min(100, Math.round(+n || 0)))] || UV2_LEVEL_COLORS[0];
function uv2IsColor(c) {
  if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(c)) return true;
  if (UV2_NAMED_COLORS[c]) return true;
  return /^[a-z]+$/i.test(c) && typeof CSS !== 'undefined' && CSS.supports('color', c);
}
function uv2Gradient(c) {
  const i = c.indexOf('+');
  if (i <= 0 || i >= c.length - 1) return null;
  const a = c.slice(0, i), b = c.slice(i + 1);
  return uv2IsColor(a) && uv2IsColor(b) ? [a, b] : null;
}
const uv2IsCode = c => uv2IsColor(c) || !!uv2Gradient(c) || UV2_STYLE_CODES.includes(c);
const uv2Css = c => UV2_NAMED_COLORS[c] || c;
function uv2Parse(src) {
  const out = [];
  let s = String(src == null ? '' : src);
  while (s.length) {
    const a = s.indexOf('\\');
    const b = a < 0 ? -1 : s.indexOf('\\', a + 1);
    if (b < 0) { out.push(s); break; }
    const code = s.slice(a + 1, b);
    if (code === 'undefined' || code === 'null') { if (a > 0) out.push(s.slice(0, a)); }
    else if (uv2IsCode(code)) { if (a > 0) out.push(s.slice(0, a)); out.push([code]); }
    else out.push(s.slice(0, b + 1));
    s = s.slice(b + 1);
  }
  return out;
}
const UV2_JUMBLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#@%&$?!*+=<>';
function uv2Fmt(src, base) {
  base = base || 'white';
  const st = { color: base, bold: false, italic: false, under: false, glow: false, shiny: false, flair: false, up: false, grad: null, jumble: false };
  let html = '';
  for (const p of uv2Parse(src)) {
    if (Array.isArray(p)) {
      const c = p[0], g = uv2Gradient(c);
      if (uv2IsColor(c)) st.color = c;
      else if (g) st.grad = g;
      else if (c === 'bold' || c === 'b') st.bold = true;
      else if (c === 'italic' || c === 'i') st.italic = true;
      else if (c === 'underline' || c === 'u') st.under = true;
      else if (c === 'glow') st.glow = true;
      else if (c === 'shiny') st.shiny = true;
      else if (c === 'flair') st.flair = true;
      else if (c === 'shinyup') { st.shiny = true; st.up = true; }
      else if (c === 'flairup') { st.flair = true; st.up = true; }
      else if (c === 'jumble') st.jumble = true;
      else if (c === 'reset') Object.assign(st, { color: base, bold: false, italic: false, under: false, glow: false, shiny: false, flair: false, up: false, grad: null, jumble: false });
      continue;
    }
    let text = p;
    if (st.jumble) text = [...text].map(ch => /\s/.test(ch) ? ch : UV2_JUMBLE[Math.floor(Math.random() * UV2_JUMBLE.length)]).join('');
    const col = uv2Css(st.color), dir = st.up ? '0deg' : '90deg';
    let css = `font-weight:${st.bold ? 700 : 'inherit'};font-style:${st.italic ? 'italic' : 'normal'};text-decoration:${st.under ? 'underline' : 'none'};`;
    let cls = '';
    if (st.grad) { const [a, b] = st.grad.map(uv2Css); css += `background-image:linear-gradient(${dir},${a} 0%,${b} 25%,${a} 50%,${b} 75%,${a} 100%);filter:drop-shadow(0 0 4px ${a});`; cls = ' uv2-fx'; }
    else if (st.flair) { css += `background-image:linear-gradient(${dir},#5865F2 0%,#00D2FF 30%,#C724FF 50%,#00D2FF 70%,#5865F2 100%);filter:drop-shadow(0 0 4px rgba(88,101,242,0.85));`; cls = ' uv2-fx'; }
    else if (st.shiny) { css += `background-image:linear-gradient(${dir},${col} 0%,${col} 35%,#fff 50%,${col} 65%,${col} 100%);`; cls = ' uv2-fx'; }
    else css += `color:${col};${st.glow ? `text-shadow:0 0 8px ${col};` : ''}`;
    if (st.up && cls) cls += ' up';
    html += `<span class="uv2-tx${cls}" style="${css}">${hudEsc(text)}</span>`;
  }
  return html;
}

function uv2RankCode(rank) {
  const r = UV2_RANKS[rank];
  if (!r) return '';
  const [c, lvl] = r, up = rank.toUpperCase();
  const inner = rank === 'youtube' ? `\\${c}\\[\\white\\${up}\\${c}\\]` : lvl >= 4 ? `\\${c}\\\\shiny\\[${up}]` : `\\${c}\\[${up}]`;
  return `\\bold\\\\glow\\${inner}\\reset\\`;
}
function uv2TagCode(text, s, prefix) {
  const k = n => s[prefix + n];
  const t = String(text || '').trim();
  if (!t) return '';
  let code = k('Bold') ? '\\bold\\' : '';
  const style = k('Style');
  if (style === 'gradient') code += `\\${k('Color')}+${k('Color2')}\\`;
  else if (style === 'flair') code += '\\flair\\';
  else code += `\\${k('Color')}\\`;
  if (style === 'shiny') code += '\\shiny\\';
  if (k('Glow') && style === 'solid') code += '\\glow\\';
  if (k('Jumble')) code += '\\jumble\\';
  return code + (k('Brackets') ? `[${t}]` : t) + '\\reset\\';
}
function uv2TagControls(prefix, when) {
  const w = when || (() => true);
  return [
    { key: prefix + 'Style', type: 'seg', label: 'Tag style', options: [['solid', 'Solid'], ['gradient', 'Gradient'], ['shiny', 'Shine'], ['flair', 'Booster']], show: w },
    { key: prefix + 'Color', type: 'color', label: 'Color', show: s => w(s) && s[prefix + 'Style'] !== 'flair' },
    { key: prefix + 'Color2', type: 'color', label: 'Second color', show: s => w(s) && s[prefix + 'Style'] === 'gradient' },
    { key: prefix + 'Bold', type: 'toggle', label: 'Bold', show: w },
    { key: prefix + 'Glow', type: 'toggle', label: 'Glow', show: s => w(s) && s[prefix + 'Style'] === 'solid' },
    { key: prefix + 'Brackets', type: 'toggle', label: 'Brackets', show: w },
    { key: prefix + 'Jumble', type: 'toggle', label: 'Scramble letters', show: w }
  ];
}
const uv2TagDefaults = (prefix, color, color2, style) => ({ [prefix + 'Style']: style, [prefix + 'Color']: color, [prefix + 'Color2']: color2, [prefix + 'Bold']: true, [prefix + 'Glow']: false, [prefix + 'Brackets']: true, [prefix + 'Jumble']: false });

const UV2_ICON_COLORS = { redblack: ['#e0262f', '#0d0d0f', '#0d0d0f'], redwhite: ['#e0262f', '#ffffff', '#7a0d12'], blackred: ['#121214', '#ff3340', '#ff3340'] };
const uv2IconCache = {};
function uv2IconUrl(kind) {
  if (uv2IconCache[kind]) return uv2IconCache[kind];
  const [fill, check, ring] = UV2_ICON_COLORS[kind] || UV2_ICON_COLORS.redblack;
  const pts = [];
  for (let i = 0; i < 24; i++) { const a = Math.PI * 2 * i / 24 - Math.PI / 2, r = i % 2 ? 41 : 48; pts.push((50 + Math.cos(a) * r).toFixed(1) + ',' + (50 + Math.sin(a) * r).toFixed(1)); }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><g transform="rotate(180 50 50)"><polygon points="${pts.join(' ')}" fill="${fill}" stroke="${ring}" stroke-width="5" stroke-linejoin="round"/><path d="M30 51 L44 65 L71 37" fill="none" stroke="${check}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></g></svg>`;
  return (uv2IconCache[kind] = 'data:image/svg+xml;base64,' + btoa(svg));
}
const uv2IconHtml = kind => `<img class="uv2-bdg" src="${uv2IconUrl(kind)}" draggable="false" alt="">`;

const uv2BadgeObs = { obs: null };
function uv2BadgeNode(node) {
  if (node.nodeType !== 3) return;
  const v = node.nodeValue;
  if (!v || !v.includes(UV2_MARK)) return;
  const nm = extById('nametags');
  const kind = nm ? nm.settings.icon : 'redblack';
  const parent = node.parentNode;
  if (!parent) return;
  const atEnd = v.endsWith(UV2_MARK) && !v.startsWith(UV2_MARK);
  node.nodeValue = v.split(UV2_MARK).join('');
  const sib = atEnd ? node.nextSibling : node.previousSibling;
  if (sib && sib.nodeType === 1 && sib.classList.contains('uv2-bdg')) return;
  const tmp = document.createElement('span');
  tmp.innerHTML = uv2IconHtml(kind);
  parent.insertBefore(tmp.firstChild, atEnd ? node.nextSibling : node);
}
function uv2BadgeScan(root) {
  if (!root) return;
  if (root.nodeType === 3) { uv2BadgeNode(root); return; }
  if (root.nodeType !== 1 || !(root.textContent || '').includes(UV2_MARK)) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const list = [];
  for (let n = w.nextNode(); n; n = w.nextNode()) if (n.nodeValue.includes(UV2_MARK)) list.push(n);
  list.forEach(uv2BadgeNode);
}
function uv2BadgeWatch(on) {
  if (on && !uv2BadgeObs.obs) {
    uv2BadgeObs.obs = new MutationObserver(list => {
      for (const m of list) {
        if (m.type === 'characterData') uv2BadgeNode(m.target);
        else m.addedNodes.forEach(uv2BadgeScan);
      }
    });
    uv2BadgeObs.obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    uv2BadgeScan(document.body);
  } else if (!on && uv2BadgeObs.obs) {
    uv2BadgeObs.obs.disconnect();
    uv2BadgeObs.obs = null;
    document.querySelectorAll('img.uv2-bdg').forEach(i => { if (!i.closest('#uv2-main-ui,#uv2-tab')) i.remove(); });
  }
}

function uv2Identity(force) {
  const m = extById('identity');
  if (!m || (!m.on && !force)) return null;
  const s = m.settings;
  let rank = null;
  if (s.rankMode === 'preset') rank = uv2RankCode(s.rankPreset);
  else if (s.rankMode === 'custom') { const t = uv2TagCode(s.tagText, s, 'tag'); rank = t ? `\\bold\\${t}` : ''; }
  else if (s.rankMode === 'none') rank = '';
  const level = s.levelOn ? Math.max(0, Math.round(+s.level || 0)) : null;
  return { rank, level };
}
function uv2BadgeCode(name, isMe, force) {
  const nm = extById('nametags');
  if (!nm || (!nm.on && !force)) return '';
  const s = nm.settings;
  const show = force || (isMe ? s.self : s.others && uv2Online.has(uv2NetKey(name)));
  if (!show) return '';
  const icon = s.badge !== 'tag' ? UV2_MARK : '';
  const tag = s.badge !== 'icon' ? uv2TagCode(s.uvText || 'UV2', s, 'uv') + ' ' : '';
  return icon + (tag ? (icon ? '\\reset\\' : '') + tag : '');
}
function uv2RebuildName(base, name, isMe) {
  const nk = extById('nick');
  const nick = isMe && nk && nk.on ? String(nk.settings.name || '').trim() : '';
  let out = base;
  const id = isMe ? uv2Identity() : null;
  if (id && id.rank !== null) {
    const at = out.lastIndexOf(name);
    if (at >= 0) {
      let start = at;
      const pre = out.slice(0, at);
      const code = pre.match(/\\[^\\]*\\$/);
      if (code && (uv2IsColor(code[0].slice(1, -1)) || code[0] === '\\flair\\')) start = at - code[0].length;
      out = (id.rank ? id.rank + ' ' : '') + out.slice(start);
    }
  }
  if (nick) out = out.split(name).join(nick);
  return uv2BadgeCode(name, isMe) + out;
}

function nametagRefresh(restore) {
  const list = G && G.world && G.world.loadedEntityList;
  if (!list) return;
  const me = uv2MyName();
  for (const e of list) {
    const r = e && e.mesh;
    if (!r || typeof r.nameTagText !== 'string' || !r.nameTagText) continue;
    const name = (e.profile && e.profile.username) || e.name;
    if (!name) continue;
    if (r.nameTagText !== r._uv2Out) r._uv2Base = r.nameTagText;
    let out = r._uv2Base;
    if (!restore) { try { out = uv2RebuildName(r._uv2Base, name, name === me); } catch(x) { out = r._uv2Base; } }
    r._uv2Out = out;
    if (r.nameTagText !== out) r.nameTagText = out;
  }
}
let uv2IdAt = 0;
function uv2IdentityTick() {
  const now = performance.now();
  if (now - uv2IdAt < 30 || !extInWorld()) return;
  uv2IdAt = now;
  nametagRefresh(false);
}
function uv2PlayerCode(p, isMe, force) {
  const full = p.name || '';
  if (/Player[0-9]{1,3}/.test(full)) return full;
  const pre = p.namePrefix && full.startsWith(p.namePrefix) ? p.namePrefix : '';
  let nm = full.slice(pre.length);
  const nk = extById('nick');
  if (isMe && nk && nk.on && String(nk.settings.name || '').trim()) nm = String(nk.settings.name).trim();
  let s = p.color ? `${pre}\\${p.color}\\${nm}\\reset\\` : p.discordBoosting ? `${pre}\\flair\\${nm}\\reset\\` : pre + nm;
  let rank = p.rank ? uv2RankCode(p.rank) : '', level = p.level;
  const id = isMe ? uv2Identity(force) : null;
  if (id) { if (id.rank !== null) rank = id.rank; if (id.level !== null) level = id.level; }
  if (rank) s = `${rank} ${s}`;
  if (level != null) s = `\\bold\\\\${uv2LevelColor(level)}\\(${level})\\reset\\ ${s}`;
  return s;
}
function uv2BadgeHtml(name, isMe, force) {
  const code = uv2BadgeCode(name, isMe, force);
  if (!code) return '';
  const nm = extById('nametags');
  return (code.startsWith(UV2_MARK) ? uv2IconHtml(nm.settings.icon) : '') + uv2Fmt(code.split(UV2_MARK).join(''));
}
function uv2ChatSelf(t, me, id) {
  const i = t.indexOf(me);
  if (i < 0 || !/^[\s\S]{0,40}?:/.test(t.slice(i + me.length))) return t;
  let at = i;
  const c = t.slice(0, i).match(/\\[^\\]*\\$/);
  if (c && (uv2IsColor(c[0].slice(1, -1)) || c[0] === '\\flair\\')) at = i - c[0].length;
  let head = t.slice(0, at), rank = '', level = '';
  const g = head.lastIndexOf('\\bold\\\\glow\\');
  if (g >= 0 && /^\\bold\\\\glow\\[\s\S]*\\reset\\ $/.test(head.slice(g))) { rank = head.slice(g); head = head.slice(0, g); }
  const lv = head.match(/\\bold\\\\[^\\]+\\\(\d+\)\\reset\\ $/);
  if (lv) { level = lv[0]; head = head.slice(0, lv.index); }
  if (id.rank !== null) rank = id.rank ? id.rank + ' ' : '';
  if (id.level !== null) level = `\\bold\\\\${uv2LevelColor(id.level)}\\(${id.level})\\reset\\ `;
  return head + level + rank + t.slice(at);
}
function uv2ChatIdentity(e) {
  if (!e || typeof e.text !== 'string' || e.toast) return e;
  const me = uv2MyName();
  let t = e.text;
  const id = uv2Identity();
  if (me && id && t.includes(me)) t = uv2ChatSelf(t, me, id);
  const nm = extById('nametags');
  if (nm && nm.on) {
    const names = new Set();
    try { G.playerList.sortedPlayerData.forEach(p => { if (p && p.name) names.add(p.name); }); } catch(x) {}
    if (me) names.add(me);
    let best = null, bi = Infinity;
    names.forEach(n => { const k = t.indexOf(n); if (k >= 0 && k < bi) { bi = k; best = n; } });
    const code = best ? uv2BadgeCode(best, best === me) : '';
    if (code) {
      let at = bi;
      const head = t.slice(0, bi);
      const lv = head.match(/(\\bold\\\\[^\\]+\\\(\d+\)\\reset\\ )?(\\bold\\\\glow\\[\s\S]*?\\reset\\ )?(\\[^\\]*\\)?$/);
      if (lv && lv[0]) at = bi - lv[0].length;
      t = t.slice(0, at) + code + (code.endsWith(' ') ? '' : '\\reset\\ ') + t.slice(at);
    }
  }
  if (t !== e.text) e = Object.assign({}, e, { text: t });
  return e;
}

function uv2PreviewHtml(which) {
  const me = uv2MyName() || 'You';
  let lvl = 27;
  try { const p = G.playerList.sortedPlayerData.find(x => x.name === me); if (p && p.level != null) lvl = p.level; } catch(x) {}
  const code = uv2PlayerCode({ name: me, level: lvl, color: null }, true, which === 'identity');
  return `<div class="uv2-idprev-row">${uv2BadgeHtml(me, true, which === 'nametags')}${uv2Fmt(code)}</div>`;
}
function uv2PreviewRefresh() { document.querySelectorAll('.uv2-idprev').forEach(el => { el.innerHTML = uv2PreviewHtml(el.dataset.which); }); }
const uv2PreviewControl = which => ({ type: 'custom', render: () => { const d = document.createElement('div'); d.className = 'uv2-idprev'; d.dataset.which = which; d.innerHTML = uv2PreviewHtml(which); return d; } });

extDefine({
  id: 'nametags', cat: 'visuals', name: 'UV2 Nametags', desc: 'Shows a badge next to players who also use Unverified.',
  defaults: Object.assign({ badge: 'icon', icon: 'redblack', uvText: 'UV2', self: true, others: true, share: true }, uv2TagDefaults('uv', '#ff2d3a', '#ffffff', 'gradient')),
  controls: [
    uv2PreviewControl('nametags'),
    { key: 'badge', type: 'seg', label: 'Badge', options: [['icon', 'Icon'], ['tag', 'Tag'], ['both', 'Both']] },
    { key: 'icon', type: 'seg', label: 'Icon colors', options: [['redblack', 'Red & black'], ['redwhite', 'Red & white'], ['blackred', 'Black & red']], show: s => s.badge !== 'tag' },
    { key: 'uvText', type: 'text', label: 'Tag text', placeholder: 'UV2', show: s => s.badge !== 'icon' },
    ...uv2TagControls('uv', s => s.badge !== 'icon'),
    { type: 'heading', label: 'Who sees it' },
    { key: 'others', type: 'toggle', label: 'Show badges on other players' },
    { key: 'self', type: 'toggle', label: 'Show the badge on my own name' },
    { key: 'share', type: 'toggle', label: 'Let other players see my badge' },
    { type: 'custom', render: () => { const d = document.createElement('div'); d.className = 'uv2-x-note'; d.textContent = 'Badges show on nametags, in chat and in the Tab List. Other players update about every two minutes.'; return d; } }
  ],
  change() { if (!this.settings.share) uv2NetHide(); else uv2Net.beat = 0; uv2IdAt = 0; },
  preview() { uv2PreviewRefresh(); },
  disable() { uv2BadgeWatch(false); nametagRefresh(true); uv2NetHide(); uv2Net.beat = 0; },
  frame() { if (!extInWorld()) return; uv2BadgeWatch(true); uv2NetTick(this.settings.share); uv2IdentityTick(); }
});

extDefine({
  id: 'identity', cat: 'visuals', name: 'Custom Rank & Level', desc: 'Change your rank tag and level on your screen. Only you see it.',
  defaults: Object.assign({ rankMode: 'keep', rankPreset: 'legend', tagText: 'UV2', levelOn: false, level: 50 }, uv2TagDefaults('tag', '#ff2d3a', '#ffffff', 'gradient')),
  controls: [
    uv2PreviewControl('identity'),
    { key: 'rankMode', type: 'seg', label: 'Rank', options: [['keep', 'My rank'], ['preset', 'Game rank'], ['custom', 'Custom'], ['none', 'None']] },
    { key: 'rankPreset', type: 'select', label: 'Game rank', options: Object.keys(UV2_RANKS).map(k => [k, k === 'og' ? 'OG' : k[0].toUpperCase() + k.slice(1)]), show: s => s.rankMode === 'preset' },
    { key: 'tagText', type: 'text', label: 'Tag text', placeholder: 'UV2', show: s => s.rankMode === 'custom' },
    ...uv2TagControls('tag', s => s.rankMode === 'custom'),
    { type: 'heading', label: 'Level' },
    { key: 'levelOn', type: 'toggle', label: 'Change my level' },
    { key: 'level', type: 'slider', label: 'Level', min: 0, max: 100, step: 1, fmt: v => v, show: s => s.levelOn },
    { type: 'custom', render: () => { const d = document.createElement('div'); d.className = 'uv2-x-note'; d.textContent = 'Shows on your nametag, in chat and in the Tab List, using the game’s own colors. Nothing is sent to the server.'; return d; } }
  ],
  change() { uv2IdAt = 0; },
  preview() { uv2PreviewRefresh(); },
  disable() { nametagRefresh(true); },
  frame() { uv2IdentityTick(); }
});

const tabState = { el: null, game: null, heads: new Map(), at: 0 };
function tabFindGame() {
  if (tabState.game && tabState.game.isConnected) return tabState.game;
  tabState.game = null;
  const root = document.getElementById('react') || document.body;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) {
    if (n.nodeValue !== ' player') continue;
    let el = n.parentElement;
    for (let i = 0; el && i < 8; i++, el = el.parentElement) {
      if (el.closest('#uv2-main-ui,#uv2-tab')) break;
      if (getComputedStyle(el).position === 'fixed') { tabState.game = el; return el; }
    }
  }
  return null;
}
function tabShowGame(show) {
  const g = tabState.game;
  if (!g || !g.isConnected) return;
  if (show) { if (g.dataset.uv2Hidden) { g.style.visibility = ''; delete g.dataset.uv2Hidden; } }
  else if (!g.dataset.uv2Hidden) { g.dataset.uv2Hidden = '1'; g.style.visibility = 'hidden'; }
}
function tabScrapeHeads(names) {
  const g = tabState.game;
  if (!g) return;
  const sorted = names.slice().sort((a, b) => b.length - a.length);
  g.querySelectorAll('img').forEach(img => {
    const row = img.parentElement && img.parentElement.parentElement;
    if (!row || !img.src) return;
    const txt = row.textContent || '';
    const n = sorted.find(x => txt.includes(x));
    if (n) tabState.heads.set(n, img.src);
  });
}
function tabPingHtml(ping, mode) {
  const p = Math.min(+ping || 0, 9999);
  const lvl = p <= 0 ? 0 : p < 80 ? 4 : p < 150 ? 3 : p < 250 ? 2 : 1;
  const col = ['#666', '#ff5c5c', '#ffa94d', '#d8e35a', '#5eea7a'][lvl];
  const bars = `<span class="uv2-tab-bars">${[1, 2, 3, 4].map(i => `<i style="height:${i * 25}%;background:${i <= lvl ? col : 'rgba(255,255,255,0.16)'}"></i>`).join('')}</span>`;
  const num = `<span class="uv2-tab-ms">${p}ms</span>`;
  return `<span class="uv2-tab-ping">${mode === 'bars' ? bars : mode === 'number' ? num : num + bars}</span>`;
}
function tabRender(m) {
  const s = m.settings, data = (G.playerList && G.playerList.sortedPlayerData) || [];
  const me = uv2MyName();
  tabScrapeHeads(data.map(p => p.name || ''));
  const cols = Math.max(1, Math.min(4, Math.ceil(data.length / 15)));
  const server = (G.serverInfo && G.serverInfo.serverName) || '';
  const rows = data.map(p => {
    const mine = p.name === me;
    const head = s.heads ? (tabState.heads.get(p.name) ? `<img class="uv2-tab-head" src="${tabState.heads.get(p.name)}" alt="">` : '<span class="uv2-tab-head none"></span>') : '';
    return `<div class="uv2-tab-row${mine && s.highlight ? ' me' : ''}"><span class="uv2-tab-name">${head}${uv2BadgeHtml(p.name || '', mine)}${uv2Fmt(uv2PlayerCode(p, mine))}</span>${tabPingHtml(p.ping, s.ping)}</div>`;
  }).join('');
  return `<div class="uv2-tab-head-row"><span class="uv2-tab-server">${uv2Fmt(server)}</span><span class="uv2-tab-count">${data.length} ${data.length === 1 ? 'player' : 'players'}</span></div><div class="uv2-tab-grid" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${rows}</div>`;
}
extDefine({
  id: 'tablist', cat: 'hud', name: 'Tab List', desc: 'A cleaner player list when you hold Tab. Replaces the game’s list.',
  defaults: { heads: true, ping: 'both', highlight: true, scale: 1, opacity: 0.8 },
  controls: [
    { key: 'ping', type: 'seg', label: 'Ping', options: [['bars', 'Bars'], ['number', 'Number'], ['both', 'Both']] },
    { key: 'heads', type: 'toggle', label: 'Player heads' },
    { key: 'highlight', type: 'toggle', label: 'Highlight my name' },
    { key: 'scale', type: 'slider', label: 'Size', min: 0.7, max: 1.4, step: 0.05, fmt: hudPct },
    { key: 'opacity', type: 'slider', label: 'Background opacity', min: 0.2, max: 1, step: 0.05, fmt: hudPct }
  ],
  disable() {
    tabShowGame(true);
    if (tabState.el) tabState.el.remove();
    tabState.el = null;
  },
  frame() {
    const open = extInWorld() && G.info && G.info.displayPlayerTab && G.playerList;
    if (!open) { if (tabState.el) tabState.el.style.display = 'none'; tabShowGame(true); tabState.game = null; return; }
    const now = performance.now();
    if (tabState.el && tabState.el.style.display !== 'none' && now - tabState.at < 150) return;
    tabState.at = now;
    try {
      tabFindGame();
      if (!tabState.el) { tabState.el = document.createElement('div'); tabState.el.id = 'uv2-tab'; document.body.appendChild(tabState.el); }
      const el = tabState.el;
      el.style.setProperty('--tab-bg', `rgba(12,12,15,${this.settings.opacity})`);
      el.style.transform = `translateX(-50%) scale(${this.settings.scale})`;
      el.innerHTML = tabRender(this);
      el.style.display = '';
      tabShowGame(false);
    } catch(e) {
      if (tabState.el) tabState.el.style.display = 'none';
      tabShowGame(true);
    }
  }
});

const nickState = { obs: null, real: '', nick: '', written: new WeakMap(), touched: new Set() };
function nickSkip(node) {
  const el = node.parentElement;
  return !el || !!el.closest('input,textarea,[contenteditable="true"],#uv2-main-ui,.uv2-hud,#uv2-hud-editor,script,style');
}
function nickFix(node) {
  if (node.nodeType !== 3 || !nickState.real || !nickState.nick) return;
  const v = node.nodeValue;
  if (!v || nickState.written.get(node) === v || !v.includes(nickState.real) || nickSkip(node)) return;
  const out = v.split(nickState.real).join(nickState.nick);
  nickState.written.set(node, out);
  nickState.touched.add(node);
  node.nodeValue = out;
}
function nickScan(root) {
  if (!root) return;
  if (root.nodeType === 3) { nickFix(root); return; }
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n = w.nextNode(); n; n = w.nextNode()) nickFix(n);
}
function nickRestore() {
  nickState.touched.forEach(n => { if (n.isConnected && nickState.nick && nickState.real && n.nodeValue.includes(nickState.nick)) n.nodeValue = n.nodeValue.split(nickState.nick).join(nickState.real); });
  nickState.touched.clear();
}
extDefine({
  id: 'nick', cat: 'chat', name: 'Nickname', desc: 'Shows your name as a nickname everywhere on your screen. Only you see it.',
  defaults: { name: '' },
  controls: [
    { key: 'name', type: 'text', label: 'Nickname', placeholder: 'Pro' },
    { type: 'custom', render: () => { const d = document.createElement('div'); d.className = 'uv2-x-note'; d.textContent = 'Changes your name in chat, the tab list, scoreboards and your nametag on your screen. What you type is never changed.'; return d; } }
  ],
  change() { nickRestore(); nickState.nick = String(this.settings.name || '').trim(); nickScan(document.body); },
  enable() {
    nickState.nick = String(this.settings.name || '').trim();
    if (nickState.obs) return;
    nickState.obs = new MutationObserver(list => {
      if (!nickState.nick || !nickState.real) return;
      for (const m of list) {
        if (m.type === 'characterData') nickFix(m.target);
        else m.addedNodes.forEach(nickScan);
      }
    });
    nickState.obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    nickScan(document.body);
  },
  disable() {
    if (nickState.obs) nickState.obs.disconnect();
    nickState.obs = null;
    nickRestore();
    nametagRefresh(true);
  },
  frame() {
    const me = uv2MyName();
    if (me && me !== nickState.real) { nickRestore(); nickState.real = me; nickScan(document.body); }
    uv2IdentityTick();
  }
});

const adState = { style: null, at: 0 };
extDefine({
  id: 'adblock', cat: 'utility', name: 'Ad Blocker', desc: 'Skips the video ads between matches and hides banner ads.',
  defaults: { banners: true },
  controls: [
    { key: 'banners', type: 'toggle', label: 'Hide banner ads' },
    { type: 'custom', render: () => { const d = document.createElement('div'); d.className = 'uv2-x-note'; d.textContent = 'Ads you choose to watch for rewards still work, so you can keep earning from them.'; return d; } }
  ],
  apply() {
    if (this.on && this.settings.banners) {
      if (!adState.style) { adState.style = document.createElement('style'); adState.style.textContent = '#banner-container{display:none !important;}'; document.head.appendChild(adState.style); }
    } else if (adState.style) { adState.style.remove(); adState.style = null; }
  },
  enable() { this.apply(); this.frame(); },
  disable() { this.apply(); },
  change() { this.apply(); },
  frame() {
    const now = Date.now();
    if (now - adState.at < 5000) return;
    adState.at = now;
    try { localStorage.setItem('lastAd', String(now)); } catch(e) {}
  }
});

const chatFilterExtras = Object.assign({ joinLeave: false, words: '' }, extLoad('chatfilter', {}));
const extChatMods = ['mentions', 'spamstack', 'killfx', 'chathistory', 'stats', 'nametags', 'identity'];
function extrasChatInUse() { if (!extrasReady) return false; return extChatMods.some(id => extById(id).on) || (isChatFilterActive && (chatFilterExtras.joinLeave || chatFilterExtras.words)); }
function extHighlight(text, words, color) {
  const lower = words.map(w => w.toLowerCase());
  let current = 'reset';
  return String(text).split(/(\\[^\\]*\\)/).map(p => {
    if (/^\\[^\\]*\\$/.test(p)) { current = p.slice(1, -1); return p; }
    let out = '', i = 0;
    const pl = p.toLowerCase();
    while (i < p.length) {
      let len = 0;
      for (const w of lower) if (w && pl.startsWith(w, i) && w.length > len) len = w.length;
      if (len) { out += '\\' + color + '\\' + p.substr(i, len) + '\\reset\\\\' + current + '\\'; i += len; }
      else { out += p[i]; i++; }
    }
    return out;
  }).join('');
}
function extrasProcessChat(e) {
  if (!extrasReady || !e || e.toast || typeof e.text !== 'string') return e;
  const plain = extStrip(e.text);
  chatHistory.push({ t: Date.now(), text: plain });
  if (chatHistory.length > 1000) chatHistory.shift();
  const killMods = ['killfx', 'stats'].map(extById).filter(m => m && m.on);
  if (e.killFeed && killMods.length && G && G.player) {
    const me = G.player.name, idx = plain.indexOf(me);
    if (idx >= 0) {
      let victim = null, vIdx = Infinity;
      for (const name of extLastPositions.keys()) { if (name === me) continue; const i = plain.indexOf(name); if (i > idx && i < vIdx) { vIdx = i; victim = name; } }
      if (victim) killMods.forEach(m => m.onKill(victim));
    }
  }
  e = uv2ChatIdentity(e);
  if (isChatFilterActive) {
    if (chatFilterExtras.joinLeave && / has (joined|left) the server$/.test(plain)) return null;
    const words = (chatFilterExtras.words || '').split(',').map(w => w.trim().toLowerCase()).filter(Boolean);
    if (words.some(w => plain.toLowerCase().includes(w))) return null;
  }
  const hl = extById('mentions');
  if (hl.on && G) {
    const s = hl.settings, words = (s.words || '').split(',').map(w => w.trim()).filter(Boolean);
    if (s.myName && G.player && G.player.name) words.push(G.player.name);
    const fromMe = G.player && plain.trimStart().startsWith(G.player.name + ':');
    if (words.length && !fromMe && words.some(w => plain.toLowerCase().includes(w.toLowerCase()))) {
      e = Object.assign({}, e, { text: extHighlight(e.text, words, s.color) });
      if (s.sound) extBeep(1046, 140, 0.12);
    }
  }
  const sp = extById('spamstack');
  if (sp.on && G) {
    const key = plain + '|' + (e.from || ''), now = Date.now(), log = G.chat.log, last = log[log.length - 1];
    if (key === spamState.key && last && last === spamState.entry && now - spamState.at < sp.settings.seconds * 1000) {
      spamState.count++;
      spamState.at = now;
      try { log.splice(log.length - 1, 1, Object.assign({}, last, { text: spamState.base + ' \\gray\\(x' + spamState.count + ')', t: now, timer: 0 })); spamState.entry = log[log.length - 1]; } catch(err) {}
      return null;
    }
    spamState.key = key; spamState.at = now; spamState.count = 1; spamState.base = e.text; spamState.track = true;
  }
  return e;
}
function extrasAfterChat(chat) {
  if (!extrasReady) return;
  if (spamState.track) { spamState.track = false; spamState.entry = chat.log[chat.log.length - 1]; }
}

function extHookSubmit() {
  const chat = G && G.chat;
  if (!chat || !chat.submit || chat.submit._uv2x) return;
  const prev = chat.submit;
  const wrapped = function(...args) {
    const cm = extById('commands');
    const v = String(chat.inputValue || '').trim();
    if (cm.on && !chat.isInputCommandMode && v.startsWith(cm.settings.prefix) && v.length > cm.settings.prefix.length) {
      try { extRunCommand(v.slice(cm.settings.prefix.length)); } catch(err) { extPrint('\\red\\' + err.message); }
      if (chat.inputHistory && chat.inputHistory[0] !== v) chat.inputHistory.unshift(v);
      chat.setInputValue ? chat.setInputValue('') : (chat.inputValue = '');
      try { chat.closeInput && chat.closeInput(); } catch(err) {}
      return;
    }
    return prev.apply(this, args);
  };
  wrapped._uv2x = true;
  wrapped._isHooked = prev._isHooked;
  chat.submit = wrapped;
}

function extRunCommand(raw) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const c = (cmd || '').toLowerCase(), a = (args[0] || '').toLowerCase();
  if (c === 'help') extPrint('\\gold\\Commands\\reset\\: .sky <name|next|off|list>, .weather <server|clear|rain|storm|snow> [0-100], .time <sunrise|noon|sunset|midnight|HH:MM|cycle|server>, .strike, .profile <name>, .gg, .hud');
  else if (c === 'sky') {
    if (!a || a === 'list') extPrint('Skies: ' + skyPresets.map(p => p.id).concat(skyMine.map(m => m.name)).join(', '));
    else if (a === 'off') skySetEnabled(false);
    else if (a === 'next') skyNext(1);
    else {
      const full = args.join(' ').toLowerCase();
      const p = skyPresets.find(x => x.id === a || x.name.toLowerCase() === full), my = skyMine.find(x => x.name.toLowerCase() === full);
      if (p) skyApply(p.id); else if (my) skyApply('my:' + my.id); else extPrint('\\red\\No sky called ' + args.join(' '));
    }
  } else if (c === 'weather') {
    if (!['server', 'clear', 'rain', 'storm', 'snow'].includes(a)) return extPrint('\\red\\Use: .weather server|clear|rain|storm|snow [0-100]');
    const m = extById('weather');
    m.settings.mode = a;
    if (args[1]) m.settings.intensity = extClamp(Number(args[1]) / 100, 0.1, 1);
    extSaveSettings(m);
    extToggle(m, true);
    m.change();
    extRefreshDrawer(m);
    extPrint('Weather: \\aqua\\' + a);
  } else if (c === 'time') {
    const m = extById('time'), s = m.settings;
    if (a === 'server') extToggle(m, false);
    else if (a === 'cycle') { s.mode = 'cycle'; if (args[1]) s.speed = extClamp(Number(args[1]) || 4, 0.1, 30); extToggle(m, true); }
    else {
      const named = { sunrise: 6, noon: 12, day: 12, sunset: 18, night: 22, midnight: 0 };
      let h = named[a];
      if (h == null && /^\d{1,2}(:\d{2})?$/.test(a)) { const [hh, mm] = a.split(':'); h = Number(hh) + (Number(mm) || 0) / 60; }
      if (h == null || h >= 24) return extPrint('\\red\\Use: .time sunrise|noon|sunset|midnight|HH:MM|cycle|server');
      s.mode = 'lock'; s.hour = h; extToggle(m, true);
    }
    extSaveSettings(m);
    extRefreshDrawer(m);
    extPrint('Time: \\aqua\\' + a);
  } else if (c === 'strike') extStrike(null, null, null, true, 0.6);
  else if (c === 'profile') {
    const name = args.join(' '), profiles = extLoad('profiles', {});
    if (!name || !profiles[name]) extPrint('Profiles: ' + (Object.keys(profiles).join(', ') || 'none yet'));
    else { extApplyProfile(profiles[name]); extPrint('Loaded profile \\aqua\\' + name); }
  } else if (c === 'gg') extSendChat(extById('autogg').settings.message || 'gg');
  else if (c === 'hud') hudOpenEditor();
  else extPrint('\\red\\Unknown command. Try .help');
}

function extToggle(m, on) {
  if (m.card && m.card._uv2Active !== on) m.card.click();
  else if (!m.card) extSetActive(m, on);
}
function extSetActive(m, on) {
  if (m.on === on) return;
  m.on = on;
  if (!T) return;
  try { on ? m.enable && m.enable() : m.disable && m.disable(); } catch(e) {}
  if (extChatMods.includes(m.id)) { if (on) ensureChatAddChatPatched(); else restoreChatAddChatIfUnused(); }
}

function extControlRow(label, control, column) {
  const row = document.createElement('div');
  row.style.cssText = `display:flex;${column ? 'flex-direction:column;align-items:stretch;gap:7px;' : 'align-items:center;justify-content:space-between;gap:14px;'}padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);`;
  if (label) {
    const l = document.createElement('div');
    l.textContent = label;
    l.style.cssText = 'font-size:12.5px;color:#d9d9df;white-space:nowrap;';
    row.appendChild(l);
  }
  row.appendChild(control);
  return row;
}
function extButton(text, primary) {
  const b = document.createElement('button');
  b.textContent = text;
  b.className = primary ? "uv2-btn uv2-btn-primary" : "uv2-btn";
  b.style.cssText = `background:${primary ? guiPrimaryColor : '#2a2a2a'};color:#fff;border:${primary ? 'none' : '1px solid #444'};border-radius:6px;padding:6px 12px;cursor:pointer;font-family:MinibloxFont,sans-serif;font-size:12px;white-space:nowrap;`;
  return b;
}
function extSlider(label, value, min, max, step, fmt, onInput) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.05);';
  const top = document.createElement('div');
  top.style.cssText = 'display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;';
  const l = document.createElement('span');
  l.style.cssText = 'font-size:11px;color:#888;text-transform:uppercase;letter-spacing:0.05em;font-family:MinibloxFont,sans-serif;';
  l.textContent = label;
  const v = document.createElement('span');
  v.className = 'uv2x-accent-text';
  v.className = 'uv2-x-value';
  v.style.cssText = 'font-size:12px;font-weight:600;';
  v.textContent = fmt(Number(value));
  const input = document.createElement('input');
  input.type = 'range'; input.min = min; input.max = max; input.step = step; input.value = value;
  input.className = 'uv2x-accent-range';
  input.style.cssText = `width:100%;accent-color:${guiPrimaryColor};cursor:pointer;`;
  input.addEventListener('input', () => { v.textContent = fmt(Number(input.value)); onInput(Number(input.value)); });
  top.append(l, v);
  wrap.append(top, input);
  return wrap;
}
function extToggleInput(checked, onChange) {
  const label = document.createElement('label');
  label.className = 'uv2-toggle';
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.checked = !!checked;
  input.addEventListener('change', () => onChange(input.checked));
  const track = document.createElement('div');
  track.className = 'uv2-toggle-track';
  label.append(input, track);
  return label;
}
function extSeg(options, value, onPick) {
  const wrap = document.createElement('div');
  wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
  options.forEach(([v, t]) => {
    const b = extButton(t, v === value);
    b.addEventListener('click', () => onPick(v));
    wrap.appendChild(b);
  });
  return wrap;
}
function extBindButton(action) {
  const b = extButton(extKeyLabel(extBinds[action]));
  b.addEventListener('click', () => {
    b.textContent = 'Press a key...';
    const onKey = e => {
      e.preventDefault(); e.stopPropagation();
      window.removeEventListener('keydown', onKey, true);
      if (e.key === 'Escape') delete extBinds[action];
      else extBinds[action] = e.key;
      extSave('binds', extBinds);
      b.textContent = extKeyLabel(extBinds[action]);
    };
    window.addEventListener('keydown', onKey, true);
  });
  return b;
}
const extSelectStyle = 'background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:6px 10px;font-size:13px;font-family:MinibloxFont,sans-serif;outline:none;cursor:pointer;max-width:60%;';
const extInputStyle = 'background:#2a2a2a;color:white;border:1px solid #444;border-radius:6px;padding:7px 10px;font-size:13px;font-family:MinibloxFont,sans-serif;outline:none;width:100%;box-sizing:border-box;';

function extBuildControls(m, drawer) {
  const frag = document.createElement('div');
  const s = m.settings;
  const set = (k, v, rerender) => {
    s[k] = v;
    extSaveSettings(m);
    if (m.on && m.change) { try { m.change(); } catch(e) {} }
    if (m.preview) { try { m.preview(); } catch(e) {} }
    if (rerender) extRefreshDrawer(m);
  };
  (m.controls || []).forEach(d => {
    if (d.show && !d.show(s)) return;
    if (d.type === 'toggle') frag.appendChild(extControlRow(d.label, extToggleInput(s[d.key], v => set(d.key, v, true))));
    else if (d.type === 'slider') frag.appendChild(extSlider(d.label, s[d.key], d.min, d.max, d.step, d.fmt, v => set(d.key, v)));
    else if (d.type === 'seg') frag.appendChild(extControlRow(d.label, extSeg(d.options, s[d.key], v => set(d.key, v, true)), true));
    else if (d.type === 'select' || d.type === 'skyselect') {
      const sel = document.createElement('select');
      sel.style.cssText = extSelectStyle;
      const opts = d.type === 'skyselect' ? skyPresets.map(p => [p.id, p.name]).concat(skyMine.map(x => ['my:' + x.id, x.name])) : d.options;
      opts.forEach(([v, t]) => { const o = document.createElement('option'); o.value = v; o.textContent = t; if (s[d.key] === v) o.selected = true; sel.appendChild(o); });
      sel.addEventListener('change', () => set(d.key, sel.value));
      frag.appendChild(extControlRow(d.label, sel));
    } else if (d.type === 'color') {
      const c = document.createElement('input');
      c.type = 'color'; c.value = s[d.key];
      c.style.cssText = 'width:38px;height:26px;border:none;border-radius:6px;cursor:pointer;background:none;padding:0;';
      c.addEventListener('input', () => set(d.key, c.value));
      frag.appendChild(extControlRow(d.label, c));
    } else if (d.type === 'text') {
      const t = document.createElement('input');
      t.type = 'text'; t.value = s[d.key] || ''; t.placeholder = d.placeholder || '';
      t.style.cssText = extInputStyle;
      t.addEventListener('change', () => set(d.key, t.value));
      frag.appendChild(extControlRow(d.label, t, true));
    } else if (d.type === 'buttons') {
      const wrap = document.createElement('div');
      wrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
      d.buttons.forEach(([t, v]) => {
        const b = extButton(t);
        b.addEventListener('click', () => { d.onClick(m, v); extSaveSettings(m); if (m.on && m.change) m.change(); extRefreshDrawer(m); });
        wrap.appendChild(b);
      });
      frag.appendChild(extControlRow(d.label, wrap, true));
    } else if (d.type === 'bind') frag.appendChild(extControlRow(d.label, extBindButton(d.action)));
    else if (d.type === 'custom') frag.appendChild(d.render(m));
    else if (d.type === 'heading') { const h = document.createElement('div'); h.className = 'uv2-x-heading'; h.textContent = d.label; frag.appendChild(h); }
  });
  if (frag.lastChild) frag.lastChild.style.borderBottom = 'none';
  return frag;
}

const uv2Sheet = document.createElement('div');
uv2Sheet.id = 'uv2-sheet';
uv2Sheet.innerHTML = '<div class="uv2-sheet-head"><div class="uv2-sheet-titles"><div class="uv2-sheet-name"></div><div class="uv2-sheet-desc"></div></div><div class="uv2-sheet-switch" title="Turn on or off"><span></span></div><div class="uv2-sheet-close" title="Close"><i class="fa fa-times"></i></div></div><div class="uv2-sheet-body"></div>';
ui.appendChild(uv2Sheet);
uv2Sheet.owner = null;
const uv2SheetBody = uv2Sheet.querySelector('.uv2-sheet-body');
['click', 'contextmenu', 'mousedown'].forEach(t => uv2Sheet.addEventListener(t, e => e.stopPropagation()));
function uv2SheetSync() {
  const mc = uv2Sheet.owner;
  if (mc) uv2Sheet.querySelector('.uv2-sheet-switch').classList.toggle('on', !!mc._uv2Active);
}
function uv2SheetPlace() {
  uv2Sheet.style.top = uv2Sidebar.offsetHeight + 'px';
  uv2Sheet.style.bottom = uv2SidebarFooter.offsetHeight + 'px';
}
function uv2SheetRender() {
  const mc = uv2Sheet.owner;
  if (!mc || !mc._drawer) return;
  const keep = uv2SheetBody.scrollTop;
  uv2SheetBody.innerHTML = '';
  uv2SheetBody.appendChild(mc._drawer._build());
  uv2SheetBody.scrollTop = keep;
  uv2SheetSync();
}
function uv2SheetMark(mc, on) {
  mc.classList.toggle('uv2-sheet-on', on);
  if (mc._gear) mc._gear.style.color = on ? guiPrimaryColor : '#555';
}
function uv2SheetOpen(mc) {
  if (uv2Sheet.owner && uv2Sheet.owner !== mc) uv2SheetMark(uv2Sheet.owner, false);
  uv2Sheet.owner = mc;
  uv2Sheet.querySelector('.uv2-sheet-name').textContent = mc.dataset.moduleName;
  const desc = mc.querySelector('.uv2-mod-desc');
  uv2Sheet.querySelector('.uv2-sheet-desc').textContent = desc ? desc.textContent : '';
  if (!mc._sheetSync) { mc._sheetSync = true; mc.addEventListener('click', () => setTimeout(uv2SheetSync, 0)); }
  uv2SheetBody.scrollTop = 0;
  uv2SheetRender();
  uv2SheetPlace();
  uv2SheetMark(mc, true);
  uv2Sheet.classList.add('open');
  ui.classList.add('uv2-sheet-open');
}
function uv2SheetClose() {
  if (!uv2Sheet.owner) return;
  uv2SheetMark(uv2Sheet.owner, false);
  uv2Sheet.owner = null;
  uv2Sheet.classList.remove('open');
  ui.classList.remove('uv2-sheet-open');
}
uv2Sheet.querySelector('.uv2-sheet-close').addEventListener('click', uv2SheetClose);
uv2Sheet.querySelector('.uv2-sheet-switch').addEventListener('click', () => { if (uv2Sheet.owner) uv2Sheet.owner.click(); });
uv2SidebarNav.addEventListener('click', e => { if (e.target.closest('[data-page]')) uv2SheetClose(); });
window.addEventListener('resize', () => { if (uv2Sheet.owner) uv2SheetPlace(); });

const uv2HudBtn = document.createElement('div');
uv2HudBtn.className = 'uv2-hudbtn';
uv2HudBtn.title = 'Move, resize and style your HUD';
uv2HudBtn.innerHTML = '<i class="fa fa-arrows"></i><span>Edit HUD</span>';
uv2HudBtn.addEventListener('click', () => hudOpenEditor());
uv2Sidebar.appendChild(uv2HudBtn);

function attachModuleSettings(mc, build) {
  const gear = document.createElement('div');
  gear.innerHTML = '<i class="fa fa-sliders"></i>';
  gear.title = 'Settings';
  gear.style.cssText = 'font-size:14px;color:#555;cursor:pointer;flex-shrink:0;margin-left:12px;position:relative;z-index:1;transition:color 0.15s ease,transform 0.15s ease;';
  gear.addEventListener('mouseenter', () => { gear.style.transform = 'scale(1.15)'; if (!mc._drawerOpen) gear.style.color = '#999'; });
  gear.addEventListener('mouseleave', () => { gear.style.transform = 'scale(1)'; if (!mc._drawerOpen) gear.style.color = '#555'; });
  const drawer = document.createElement('div');
  drawer.className = 'uv2-module-drawer';
  drawer.style.cssText = 'display:none;flex-direction:column;padding:4px 16px 8px;margin:-6px 0 2px;border-radius:0 0 8px 8px;background:#141414;border:1px solid rgba(255,255,255,0.06);border-top:none;box-sizing:border-box;width:100%;';
  drawer._owner = mc;
  drawer._build = build;
  mc._drawer = drawer;
  mc._gear = gear;
  gear.addEventListener('click', e => {
    e.stopPropagation();
    if (ui.classList.contains('uv2-layout-window')) {
      if (uv2Sheet.owner === mc) uv2SheetClose(); else uv2SheetOpen(mc);
      return;
    }
    mc._drawerOpen = !mc._drawerOpen;
    mc.classList.toggle('uv2-open', mc._drawerOpen);
    if (mc._drawerOpen) { drawer.innerHTML = ''; drawer.appendChild(build()); }
    gear.style.color = mc._drawerOpen ? guiPrimaryColor : '#555';
    applyModuleFilter();
  });
  ['click', 'contextmenu', 'mousedown'].forEach(t => drawer.addEventListener(t, e => e.stopPropagation()));
  mc.insertBefore(gear, mc._toggleWrap);
  mc.after(drawer);
}
function extRefreshDrawer(m) {
  if (m._panelRefresh) m._panelRefresh();
  const mc0 = m.card || m;
  if (mc0 && typeof uv2Sheet !== 'undefined' && uv2Sheet.owner === mc0) uv2SheetRender();
  const mc = m.card || m;
  if (!mc || !mc._drawer || !mc._drawerOpen) return;
  mc._drawer.innerHTML = '';
  mc._drawer.appendChild(mc._drawer._build());
}

extModules.forEach(m => {
  const mc = createModule(m.name, m.desc, m.cat);
  m.card = mc;
  mc.addEventListener('click', () => { if (mc._uv2Active !== m.on) extSetActive(m, mc._uv2Active); });
  if (m.controls && m.controls.length) attachModuleSettings(mc, () => extBuildControls(m));
});

attachModuleSettings(chatFilterModule, () => {
  const frag = document.createElement('div');
  frag.appendChild(extControlRow('Hide join/leave messages', extToggleInput(chatFilterExtras.joinLeave, v => { chatFilterExtras.joinLeave = v; extSave('chatfilter', chatFilterExtras); })));
  const t = document.createElement('input');
  t.type = 'text'; t.value = chatFilterExtras.words; t.placeholder = 'word, another word';
  t.style.cssText = extInputStyle;
  t.addEventListener('change', () => { chatFilterExtras.words = t.value; extSave('chatfilter', chatFilterExtras); });
  const row = extControlRow('Also hide messages containing', t, true);
  row.style.borderBottom = 'none';
  frag.appendChild(row);
  return frag;
});

const EXT_CATEGORIES = [['all', 'All', 'fa-th-large'], ['sky', 'Sky', 'fa-cloud'], ['world', 'World', 'fa-globe'], ['visuals', 'Visuals', 'fa-magic'], ['chat', 'Chat', 'fa-comments'], ['hud', 'HUD', 'fa-desktop'], ['utility', 'Utility', 'fa-wrench']];
const categoryBar = document.createElement('div');
categoryBar.className = 'uv2-cats';
function renderCategoryBar() {
  categoryBar.innerHTML = '';
  const counts = {};
  [...gridContainer.children].forEach(c => { if (c.dataset.moduleName) counts[c.dataset.category] = (counts[c.dataset.category] || 0) + 1; });
  EXT_CATEGORIES.forEach(([id, label, icon]) => {
    if (id !== 'all' && !counts[id]) return;
    const active = moduleCategory === id;
    const pill = document.createElement('div');
    pill.className = 'uv2-cat' + (active ? ' on' : '');
    const count = id === 'all' ? Object.values(counts).reduce((a, b) => a + b, 0) : counts[id];
    pill.innerHTML = `<i class="fa ${icon}" style="font-size:12px;"></i><span>${label}</span><span class="n">${count}</span>`;
    pill.addEventListener('click', () => {
      moduleCategory = id;
      localStorage.setItem('uv2-module-category', id);
      renderCategoryBar();
      applyModuleFilter();
    });
    categoryBar.appendChild(pill);
  });
}
uv2MainPage.insertBefore(categoryBar, gridContainer);

let skyPresets = [];
let skyMine = [];
let skyLoading = null;
let skyPack = null;
let skyShownKey = null;
const skyState = Object.assign({ enabled: false, preset: 'black', custom: null, size: 2048, overrides: {} }, extLoad('sky', {}));
skyState.overrides = Object.assign({}, skyState.overrides);
const extBinds = extLoad('binds', {});
const skySaveState = () => extSave('sky', skyState);
const skyCurrentKey = () => skyState.custom ? 'my:' + skyState.custom : skyState.preset;

async function skyLoadMine() {
  try {
    const all = await extDb.all('skies');
    skyMine.forEach(m => m._thumb && URL.revokeObjectURL(m._thumb));
    skyMine = all.sort((a, b) => b.created - a.created).map(m => Object.assign(m, { _thumb: m.preview ? URL.createObjectURL(m.preview) : null }));
  } catch(e) { skyMine = []; }
}
function skyRestoreChoice() {
  if (sky && skyState.enabled && skyShownKey && skyShownKey !== skyCurrentKey()) skyApply(skyCurrentKey(), true);
}
async function skyApply(key, quiet, auto) {
  if (!sky || skyLoading) return;
  skyLoading = key;
  skyRefreshGrid();
  try {
    if (key.startsWith('my:')) {
      const id = key.slice(3), m = skyMine.find(x => x.id === id) || await extDb.get('skies', id);
      if (!m) throw new Error('That sky was deleted');
      const op = Object.assign({}, m.options, skyState.overrides);
      if (m.type === 'panorama') await sky.setPanorama(m.image, op); else await sky.setCube(m.faces, op);
      skyPack = { options: m.options || {} };
      if (!auto) skyState.custom = id;
    } else {
      skyPack = await sky.loadPreset(key, skyState.size, skyState.overrides);
      if (!auto) { skyState.preset = key; skyState.custom = null; }
    }
    skyShownKey = key;
    if (!auto) { skyState.enabled = true; skySaveState(); }
  } catch(e) {
    if (!quiet) showNotification('Could not load that sky');
  } finally {
    skyLoading = null;
    if (uv2SkiesPage.style.display !== 'none') skiesBuildPage();
  }
}
function skySetEnabled(on) {
  if (!sky) return;
  if (on) skyApply(skyCurrentKey() || 'black');
  else { sky.remove(); skyShownKey = null; skyState.enabled = false; skySaveState(); if (uv2SkiesPage.style.display !== 'none') skiesBuildPage(); }
}
function skyNext(dir) {
  const keys = skyPresets.map(p => p.id).concat(skyMine.map(m => 'my:' + m.id));
  if (!keys.length) return;
  const i = keys.indexOf(skyCurrentKey());
  skyApply(keys[((i < 0 ? 0 : i + dir) % keys.length + keys.length) % keys.length]);
}

function extBlobImage(blob) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.onload = () => res(img);
    img.onerror = () => rej(new Error('Could not read that image'));
    img.src = URL.createObjectURL(blob);
  });
}
function extPickFiles(multiple, accept = 'image/*') {
  return new Promise(res => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = accept; input.multiple = !!multiple;
    input.addEventListener('cancel', () => res(null));
    input.onchange = () => res([...input.files]);
    input.click();
  });
}
async function extThumb(img, w = 320, h = 180) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  const x = c.getContext('2d'), iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height, k = Math.max(w / iw, h / ih);
  x.drawImage(img, (w - iw * k) / 2, (h - ih * k) / 2, iw * k, ih * k);
  return new Promise(r => c.toBlob(r, 'image/webp', 0.82));
}
async function skyUpload() {
  const files = await extPickFiles(true);
  if (!files || !files.length) return;
  const id = 's' + Date.now().toString(36);
  let rec;
  if (files.length === 1) {
    const img = await extBlobImage(files[0]);
    rec = { id, name: files[0].name.replace(/\.[^.]+$/, '').slice(0, 28) || 'My sky', type: 'panorama', image: files[0], preview: await extThumb(img), created: Date.now(), options: {} };
  } else if (files.length === 6) {
    const order = [['px', 'right', 'posx', 'rt', 'cubemap_1'], ['nx', 'left', 'negx', 'lf', 'cubemap_3'], ['py', 'top', 'up', 'posy', 'cubemap_4'], ['ny', 'bottom', 'down', 'negy', 'dn', 'cubemap_5'], ['pz', 'front', 'posz', 'ft', 'cubemap_0'], ['nz', 'back', 'negz', 'bk', 'cubemap_2']];
    const nm = f => f.name.toLowerCase().replace(/\.[^.]+$/, '');
    const matched = order.map(names => files.find(f => names.some(n => nm(f) === n || new RegExp('(^|[^a-z0-9])' + n + '($|[^a-z0-9])').test(nm(f)))));
    const faces = matched.every(Boolean) && new Set(matched).size === 6 ? matched : files;
    rec = { id, name: 'My sky ' + (skyMine.length + 1), type: 'cube', faces, preview: await extThumb(await extBlobImage(faces[4])), created: Date.now(), options: {} };
  } else { showNotification('Pick 1 panorama or 6 cube faces'); return; }
  await extDb.put('skies', rec);
  await skyLoadMine();
  await skyApply('my:' + id);
  showNotification('Saved to My Skies');
}
async function skyDownload(id) {
  const m = skyMine.find(x => x.id === id);
  if (!m) return;
  const dl = (blob, name) => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000); };
  const slug = m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'sky';
  if (m.type === 'panorama') { dl(m.image, slug + '-panorama.png'); return; }
  ['px', 'nx', 'py', 'ny', 'pz', 'nz'].forEach((n, i) => setTimeout(() => dl(m.faces[i], slug + '-' + n + '.webp'), i * 250));
}

async function skyCapture(size) {
  if (!extInWorld()) { showNotification('Join a match first'); return null; }
  const gs = G.gameScene, sc = gs.scene;
  let renderer = null;
  await new Promise(res => {
    const old = sc.onBeforeRender;
    sc.onBeforeRender = function(r) { renderer = r; sc.onBeforeRender = old; res(); return old && old.apply(this, arguments); };
    setTimeout(res, 2000);
  });
  if (!renderer) { showNotification('Could not capture'); return null; }
  const cam = new T.PerspectiveCamera(90, 1, 0.1, 1e6);
  cam.position.copy(extCamPos());
  const sz = { x: 0, y: 0, set(a, b) { this.x = a; this.y = b; return this; } };
  renderer.getSize(sz);
  const pr = renderer.getPixelRatio(), target = renderer.getRenderTarget ? renderer.getRenderTarget() : null;
  const dirs = [[[-1, 0, 0], [0, 0, -1], [0, 1, 0]], [[1, 0, 0], [0, 0, 1], [0, 1, 0]], [[0, 1, 0], [-1, 0, 0], [0, 0, -1]], [[0, -1, 0], [-1, 0, 0], [0, 0, 1]], [[0, 0, 1], [-1, 0, 0], [0, 1, 0]], [[0, 0, -1], [1, 0, 0], [0, 1, 0]]];
  const hidden = gs.ambientMeshes.children.filter(o => o === outlineMesh || (extFx && Object.values(extFx).some(p => p.points === o)));
  hidden.forEach(o => { o.userData._v = o.visible; o.visible = false; });
  const faces = [];
  try {
    renderer.setPixelRatio(1);
    renderer.setSize(size, size, false);
    if (renderer.setRenderTarget) renderer.setRenderTarget(null);
    for (const [f, r, u] of dirs) {
      const m = new T.Matrix4();
      m.makeBasis(new T.Vector3(...r), new T.Vector3(...u), new T.Vector3(-f[0], -f[1], -f[2]));
      cam.quaternion.setFromRotationMatrix(m);
      cam.updateMatrixWorld(true);
      renderer.render(sc, cam);
      const c = document.createElement('canvas');
      c.width = c.height = size;
      c.getContext('2d').drawImage(renderer.domElement, 0, 0, size, size, 0, 0, size, size);
      faces.push(await new Promise(r2 => c.toBlob(r2, 'image/webp', 0.9)));
    }
  } finally {
    renderer.setPixelRatio(pr);
    renderer.setSize(sz.x, sz.y, false);
    if (renderer.setRenderTarget) renderer.setRenderTarget(target);
    hidden.forEach(o => { o.visible = o.userData._v; });
  }
  const id = 'c' + Date.now().toString(36);
  const rec = { id, name: 'Capture ' + new Date().toLocaleString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }), type: 'cube', faces, preview: await extThumb(await extBlobImage(faces[4])), created: Date.now(), options: { dayNight: false } };
  await extDb.put('skies', rec);
  await skyLoadMine();
  showNotification('Sky captured');
  return rec;
}

const editorState = Object.assign({ zenith: '#0b1026', horizon: '#3a2a6b', ground: '#07070d', glow: '#ff7a59', glowSize: 0.35, stars: 0.6, moon: true, moonSize: 6, moonAz: 40, moonEl: 30, moonColor: '#f4f1ff', clouds: 0.35, cloudColor: '#c9b8ff', seed: 7, name: 'My sky' }, extLoad('editor', {}));
const EXT_FACE_DIRS = [(sc, tc) => [-1, -tc, -sc], (sc, tc) => [1, -tc, sc], (sc, tc) => [-sc, 1, tc], (sc, tc) => [-sc, -1, -tc], (sc, tc) => [-sc, -tc, 1], (sc, tc) => [sc, -tc, -1]];
function extNoise(seed) {
  const h = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7 + seed * 17.3) * 43758.5453; return s - Math.floor(s); };
  const n = (x, y) => { const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi, u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf); return (h(xi, yi) * (1 - u) + h(xi + 1, yi) * u) * (1 - v) + (h(xi, yi + 1) * (1 - u) + h(xi + 1, yi + 1) * u) * v; };
  return (x, y) => { let s = 0, a = 0.5; for (let i = 0; i < 4; i++) { s += a * n(x, y); x *= 2.03; y *= 2.03; a *= 0.5; } return s; };
}
function editorSampler() {
  const o = editorState, noise = extNoise(o.seed);
  const z = extHex(o.zenith), hz = extHex(o.horizon), gr = extHex(o.ground), gl = extHex(o.glow), mc = extHex(o.moonColor), cc = extHex(o.cloudColor);
  const mAz = o.moonAz * Math.PI / 180, mEl = o.moonEl * Math.PI / 180, md = [Math.cos(mEl) * Math.cos(mAz), Math.sin(mEl), Math.cos(mEl) * Math.sin(mAz)];
  const mR = Math.sin(o.moonSize * Math.PI / 180), starCut = 1 - o.stars * 0.012;
  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  return d => {
    const y = d[1];
    let c;
    if (y >= 0) {
      c = mix(z, hz, Math.pow(1 - y, 2.6));
      const gw = Math.exp(-y / Math.max(0.02, o.glowSize * 0.25)) * 0.8;
      c = [c[0] + gl[0] * gw, c[1] + gl[1] * gw, c[2] + gl[2] * gw];
      if (o.stars > 0) {
        const hsh = Math.abs(Math.sin(Math.floor(d[0] * 300) * 12.9898 + Math.floor(d[1] * 300) * 78.233 + Math.floor(d[2] * 300) * 37.719 + o.seed) * 43758.5453) % 1;
        if (hsh > starCut) { const b = (hsh - starCut) / (1 - starCut) * Math.min(1, y * 6); c = [c[0] + b, c[1] + b, c[2] + b]; }
      }
      if (o.clouds > 0) {
        const cl = Math.max(0, noise(d[0] * 3 / (y + 0.25), d[2] * 3 / (y + 0.25)) - (1 - o.clouds)) / Math.max(0.05, o.clouds) * Math.min(1, y * 4);
        c = mix(c, cc, cl * 0.85);
      }
    } else c = mix(hz, gr, Math.min(1, -y * 3));
    if (o.moon) {
      const ang = Math.acos(extClamp(d[0] * md[0] + d[1] * md[1] + d[2] * md[2], -1, 1));
      if (ang < mR * 5) { const g2 = Math.exp(-Math.max(0, ang - mR) / (mR * 0.8)) * 0.35; c = [c[0] + mc[0] * g2, c[1] + mc[1] * g2, c[2] + mc[2] * g2]; }
      if (ang < mR) c = mix(c, mc.map(v => v * (0.85 + 0.15 * noise(d[0] * 60, d[2] * 60 + d[1] * 60))), extClamp((mR - ang) / (mR * 0.08), 0, 1));
    }
    return c;
  };
}
function editorPreview(canvas) {
  const w = canvas.width, h = canvas.height, x = canvas.getContext('2d');
  if (!x) return;
  const img = x.createImageData(w, h), f = editorSampler();
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    const az = (i / w) * Math.PI * 2, el = (0.5 - j / h) * Math.PI, c = f([Math.cos(el) * Math.cos(az), Math.sin(el), Math.cos(el) * Math.sin(az)]), p = (j * w + i) * 4;
    img.data[p] = extClamp(c[0], 0, 1) * 255; img.data[p + 1] = extClamp(c[1], 0, 1) * 255; img.data[p + 2] = extClamp(c[2], 0, 1) * 255; img.data[p + 3] = 255;
  }
  x.putImageData(img, 0, 0);
}
async function editorBuild(size = 768) {
  const f = editorSampler(), faces = [];
  for (let k = 0; k < 6; k++) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const x = c.getContext('2d'), img = x.createImageData(size, size);
    for (let j = 0; j < size; j++) {
      const tc = (j + 0.5) / size * 2 - 1;
      for (let i = 0; i < size; i++) {
        const d = EXT_FACE_DIRS[k]((i + 0.5) / size * 2 - 1, tc), l = Math.hypot(d[0], d[1], d[2]), col = f([d[0] / l, d[1] / l, d[2] / l]), p = (j * size + i) * 4;
        img.data[p] = extClamp(col[0], 0, 1) * 255; img.data[p + 1] = extClamp(col[1], 0, 1) * 255; img.data[p + 2] = extClamp(col[2], 0, 1) * 255; img.data[p + 3] = 255;
      }
      if (j % 64 === 0) await extSleep(0);
    }
    x.putImageData(img, 0, 0);
    faces.push(await new Promise(r => c.toBlob(r, 'image/webp', 0.92)));
  }
  return faces;
}

function skySectionTitle(text) {
  const t = document.createElement('div');
  t.className = 'uv2-section-title';
  t.textContent = text;
  return t;
}
function skyPanel() {
  const p = document.createElement('div');
  p.className = 'uv2-panel';
  return p;
}
function skyCard(key, name, img, extras) {
  const active = skyState.enabled && skyCurrentKey() === key;
  const card = document.createElement('div');
  card.style.cssText = `position:relative;aspect-ratio:16/10;border-radius:8px;overflow:hidden;cursor:pointer;background:#1b1b1b;border:1px solid ${active ? guiPrimaryColor : 'rgba(255,255,255,0.08)'};box-shadow:${active ? `0 0 0 2px ${guiPrimaryColor}55,0 0 18px ${guiPrimaryColor}33` : '0 1px 4px rgba(0,0,0,0.4)'};transition:transform 0.15s ease,border-color 0.15s ease;`;
  card.title = name;
  if (img) {
    const i = document.createElement('img');
    i.src = img; i.loading = 'lazy'; i.draggable = false;
    i.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;';
    card.appendChild(i);
  }
  const label = document.createElement('div');
  label.textContent = name;
  label.style.cssText = 'position:absolute;left:0;right:0;bottom:0;padding:16px 9px 7px;font-size:12px;color:#fff;font-family:MinibloxFont,sans-serif;background:linear-gradient(transparent,rgba(0,0,0,0.85));white-space:nowrap;overflow:hidden;text-overflow:ellipsis;';
  card.appendChild(label);
  if (active) {
    const check = document.createElement('div');
    check.innerHTML = '<i class="fa fa-check"></i>';
    check.style.cssText = `position:absolute;top:7px;right:7px;width:20px;height:20px;border-radius:50%;background:${guiPrimaryColor};color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;`;
    card.appendChild(check);
  }
  if (skyLoading === key) {
    const spin = document.createElement('div');
    spin.innerHTML = '<i class="fa fa-circle-o-notch fa-spin"></i>';
    spin.style.cssText = 'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.5);color:#fff;font-size:20px;';
    card.appendChild(spin);
  }
  (extras || []).forEach(x => card.appendChild(x));
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-2px)'; });
  card.addEventListener('mouseleave', () => { card.style.transform = 'none'; });
  card.addEventListener('click', () => skyApply(key));
  return card;
}
function skyRefreshGrid() {
  if (uv2SkiesPage.style.display !== 'none') skiesBuildPage();
}
function skiesBuildPage() {
  if (!extrasReady) return;
  const keepScroll = uv2SkiesPage.scrollTop;
  uv2SkiesPage.innerHTML = '';
  const header = uv2PageHeader('fa-cloud', 'Skies', sky ? (skyState.enabled ? 'Custom sky is on' : 'Using the default sky') : 'Join a match to load skies');
  const skyToggleLabel = document.createElement('span');
  skyToggleLabel.textContent = 'Custom Sky';
  skyToggleLabel.style.cssText = 'font-size:12.5px;color:#bbb;font-family:MinibloxFont,sans-serif;';
  header._actions.append(skyToggleLabel, extToggleInput(skyState.enabled, v => skySetEnabled(v)));
  uv2SkiesPage.appendChild(header);

  const grid = () => { const g = document.createElement('div'); g.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(165px,1fr));gap:10px;margin-bottom:6px;'; return g; };
  uv2SkiesPage.appendChild(skySectionTitle('Presets'));
  const presetsGrid = grid();
  if (!skyPresets.length) { const e = document.createElement('div'); e.textContent = 'Loading skies...'; e.style.cssText = 'color:#555;font-size:12px;'; presetsGrid.appendChild(e); }
  skyPresets.forEach(p => presetsGrid.appendChild(skyCard(p.id, p.name, p.preview)));
  uv2SkiesPage.appendChild(presetsGrid);

  uv2SkiesPage.appendChild(skySectionTitle('My Skies'));
  const mineGrid = grid();
  skyMine.forEach(m => {
    const mk = (icon, title, left, fn) => {
      const b = document.createElement('div');
      b.innerHTML = `<i class="fa ${icon}"></i>`;
      b.title = title;
      b.style.cssText = `position:absolute;top:6px;left:${left}px;width:22px;height:22px;border-radius:6px;background:rgba(0,0,0,0.65);color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center;cursor:pointer;`;
      b.addEventListener('click', e => { e.stopPropagation(); fn(); });
      return b;
    };
    mineGrid.appendChild(skyCard('my:' + m.id, m.name, m._thumb, [
      mk('fa-trash', 'Delete', 6, async () => { await extDb.del('skies', m.id); if (skyState.custom === m.id) { skyState.custom = null; skySaveState(); } await skyLoadMine(); skiesBuildPage(); }),
      mk('fa-download', 'Download', 32, () => skyDownload(m.id))
    ]));
  });
  const up = document.createElement('div');
  up.style.cssText = 'aspect-ratio:16/10;border-radius:8px;border:1px dashed rgba(255,255,255,0.18);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;color:#666;cursor:pointer;font-family:MinibloxFont,sans-serif;font-size:12px;transition:color 0.15s ease,border-color 0.15s ease;';
  up.innerHTML = '<i class="fa fa-upload" style="font-size:18px;"></i><span>Upload your own</span>';
  up.title = '1 panorama image or 6 cube faces';
  up.addEventListener('mouseenter', () => { up.style.color = '#ccc'; up.style.borderColor = guiPrimaryColor; });
  up.addEventListener('mouseleave', () => { up.style.color = '#666'; up.style.borderColor = 'rgba(255,255,255,0.18)'; });
  up.addEventListener('click', skyUpload);
  mineGrid.appendChild(up);
  uv2SkiesPage.appendChild(mineGrid);

  const o = sky ? sky.options : Object.assign({ brightness: 1, rotation: 0, rotationSpeed: 0, dayNight: true, nightBrightness: 0.25, blend: 'always' }, skyState.overrides);
  const setO = (k, v, rebuild) => { skyState.overrides[k] = v; skySaveState(); if (sky && skyState.enabled) sky.setOptions({ [k]: v }); if (rebuild) skiesBuildPage(); };
  uv2SkiesPage.appendChild(skySectionTitle('Sky Settings'));
  const settingsPanel = skyPanel();
  settingsPanel.appendChild(extControlRow('Quality', extSeg([[512, 'Low'], [1024, 'Medium'], [2048, 'High']], skyState.size, v => { skyState.size = v; skySaveState(); if (skyState.enabled && !skyState.custom) skyApply(skyState.preset); else skiesBuildPage(); })));
  settingsPanel.appendChild(extControlRow('Show Sky', extSeg([['always', 'Always'], ['night', 'Night only']], o.blend || 'always', v => setO('blend', v, true))));
  settingsPanel.appendChild(extSlider('Brightness', o.brightness, 0.2, 2, 0.05, v => Math.round(v * 100) + '%', v => setO('brightness', v)));
  settingsPanel.appendChild(extSlider('Rotation', o.rotation, 0, 360, 1, v => Math.round(v) + '°', v => setO('rotation', v)));
  settingsPanel.appendChild(extSlider('Spin Speed', o.rotationSpeed, 0, 10, 0.1, v => v.toFixed(1) + '°/s', v => setO('rotationSpeed', v)));
  settingsPanel.appendChild(extControlRow('Dim At Night', extToggleInput(o.dayNight, v => setO('dayNight', v, true))));
  if (o.dayNight) settingsPanel.appendChild(extSlider('Night Brightness', o.nightBrightness, 0, 1, 0.05, v => Math.round(v * 100) + '%', v => setO('nightBrightness', v)));
  settingsPanel.appendChild(extControlRow('Darken During Rain', extToggleInput(o.weatherDim !== false, v => setO('weatherDim', v))));
  const presetFog = skyPack && skyPack.options && skyPack.options.fogColor;
  settingsPanel.appendChild(extControlRow('Match Fog To Sky', extToggleInput(!!o.fogColor, v => { if (v) { delete skyState.overrides.fogColor; skySaveState(); if (sky) sky.setOptions({ fogColor: presetFog || null }); } else setO('fogColor', null); })));
  const hideWrap = document.createElement('div');
  hideWrap.style.cssText = 'display:flex;flex-wrap:wrap;gap:6px;';
  [['hideSun', 'Sun'], ['hideMoon', 'Moon'], ['hideStars', 'Stars'], ['hideClouds', 'Clouds']].forEach(([k, t]) => {
    const b = extButton((o[k] ? 'Hidden: ' : '') + t, !!o[k]);
    b.addEventListener('click', () => setO(k, !o[k], true));
    hideWrap.appendChild(b);
  });
  settingsPanel.appendChild(extControlRow('Hide', hideWrap));
  const resetSky = extButton('Reset Sky Settings');
  resetSky.style.width = '100%';
  resetSky.style.margin = '6px 0 8px';
  resetSky.addEventListener('click', () => { skyState.overrides = {}; skySaveState(); if (skyState.enabled) skyApply(skyCurrentKey()); else skiesBuildPage(); });
  settingsPanel.appendChild(resetSky);
  uv2SkiesPage.appendChild(settingsPanel);

  uv2SkiesPage.appendChild(skySectionTitle('Capture'));
  const capPanel = skyPanel();
  const capDesc = document.createElement('div');
  capDesc.textContent = 'Captures a 360° skybox from where you are standing and saves it to My Skies.';
  capDesc.style.cssText = 'font-size:12px;color:#777;padding:10px 0 4px;font-family:MinibloxFont,sans-serif;';
  capPanel.appendChild(capDesc);
  capPanel.appendChild(extControlRow('Resolution', extSeg([[512, '512'], [1024, '1024'], [2048, '2048']], extLoad('capture-size', 1024), v => { extSave('capture-size', v); skiesBuildPage(); })));
  const capBtn = extButton('Capture Sky Here', true);
  capBtn.style.cssText += 'width:100%;padding:10px;margin:6px 0 10px;';
  capBtn.addEventListener('click', async () => {
    capBtn.textContent = 'Capturing...';
    try { const r = await skyCapture(extLoad('capture-size', 1024)); if (r) await skyApply('my:' + r.id); } catch(e) { showNotification('Capture failed'); }
    skiesBuildPage();
  });
  capPanel.appendChild(capBtn);
  uv2SkiesPage.appendChild(capPanel);

  uv2SkiesPage.appendChild(skySectionTitle('Sky Editor'));
  const edPanel = skyPanel();
  const canvas = document.createElement('canvas');
  canvas.width = 480; canvas.height = 160;
  canvas.style.cssText = 'width:100%;border-radius:8px;margin:12px 0 6px;display:block;border:1px solid rgba(255,255,255,0.08);';
  edPanel.appendChild(canvas);
  let pending = 0;
  const redraw = () => { clearTimeout(pending); pending = setTimeout(() => { editorPreview(canvas); extSave('editor', editorState); }, 60); };
  const edColor = (label, k) => { const c = document.createElement('input'); c.type = 'color'; c.value = editorState[k]; c.style.cssText = 'width:38px;height:26px;border:none;border-radius:6px;cursor:pointer;background:none;padding:0;'; c.addEventListener('input', () => { editorState[k] = c.value; redraw(); }); return extControlRow(label, c); };
  const edSlider = (label, k, min, max, step, fmt) => extSlider(label, editorState[k], min, max, step, fmt, v => { editorState[k] = v; redraw(); });
  const nameInput = document.createElement('input');
  nameInput.type = 'text'; nameInput.value = editorState.name; nameInput.style.cssText = extInputStyle;
  nameInput.addEventListener('input', () => { editorState.name = nameInput.value; extSave('editor', editorState); });
  edPanel.appendChild(extControlRow('Name', nameInput, true));
  [['Top Of Sky', 'zenith'], ['Horizon', 'horizon'], ['Below Horizon', 'ground'], ['Horizon Glow', 'glow']].forEach(([l, k]) => edPanel.appendChild(edColor(l, k)));
  edPanel.appendChild(edSlider('Glow Height', 'glowSize', 0, 1, 0.01, v => Math.round(v * 100) + '%'));
  edPanel.appendChild(edSlider('Stars', 'stars', 0, 1, 0.01, v => Math.round(v * 100) + '%'));
  edPanel.appendChild(edSlider('Clouds', 'clouds', 0, 1, 0.01, v => Math.round(v * 100) + '%'));
  edPanel.appendChild(edColor('Cloud Color', 'cloudColor'));
  edPanel.appendChild(extControlRow('Moon', extToggleInput(editorState.moon, v => { editorState.moon = v; redraw(); })));
  edPanel.appendChild(edColor('Moon Color', 'moonColor'));
  edPanel.appendChild(edSlider('Moon Size', 'moonSize', 1, 20, 0.5, v => v + '°'));
  edPanel.appendChild(edSlider('Moon Direction', 'moonAz', 0, 360, 1, v => v + '°'));
  edPanel.appendChild(edSlider('Moon Height', 'moonEl', 2, 85, 1, v => v + '°'));
  edPanel.appendChild(edSlider('Random Seed', 'seed', 1, 99, 1, v => v));
  const saveBtn = extButton('Save & Use This Sky', true);
  saveBtn.style.cssText += 'width:100%;padding:10px;margin:8px 0 10px;';
  saveBtn.addEventListener('click', async () => {
    saveBtn.textContent = 'Building...';
    try {
      const faces = await editorBuild(768), id = 'e' + Date.now().toString(36);
      const pc = document.createElement('canvas'); pc.width = 320; pc.height = 160; editorPreview(pc);
      const preview = await new Promise(r => pc.toBlob(r, 'image/webp', 0.85));
      await extDb.put('skies', { id, name: (editorState.name || 'My sky').slice(0, 28), type: 'cube', faces, preview, created: Date.now(), options: { fogColor: extHex(editorState.horizon) } });
      await skyLoadMine();
      await skyApply('my:' + id);
      showNotification('Saved to My Skies');
    } catch(e) { showNotification('Could not build that sky'); }
    skiesBuildPage();
  });
  edPanel.appendChild(saveBtn);
  uv2SkiesPage.appendChild(edPanel);
  setTimeout(() => editorPreview(canvas), 0);

  uv2SkiesPage.appendChild(skySectionTitle('Keybinds'));
  const bindPanel = skyPanel();
  [['nextSky', 'Next Sky'], ['toggleSky', 'Sky On/Off'], ['capture', 'Capture Sky'], ['cycleWeather', 'Cycle Weather']].forEach(([a, l]) => bindPanel.appendChild(extControlRow(l, extBindButton(a))));
  bindPanel.lastChild.style.borderBottom = 'none';
  uv2SkiesPage.appendChild(bindPanel);
  uv2SkiesPage.scrollTop = keepScroll;
}

const EXT_ACTIONS = {
  nextSky: () => skyNext(1),
  toggleSky: () => skySetEnabled(!skyState.enabled),
  capture: () => skyCapture(1024),
  strike: () => extStrike(null, null, null, true, extById('lightning').settings.volume),
  cycleWeather: () => {
    const m = extById('weather'), order = ['clear', 'rain', 'storm', 'snow'];
    m.settings.mode = order[(order.indexOf(m.settings.mode) + 1) % order.length];
    extSaveSettings(m);
    extToggle(m, true);
    m.change();
    extRefreshDrawer(m);
    showNotification('Weather: ' + m.settings.mode);
  }
};
function extrasHandleKey(e) {
  if (!extrasReady) return false;
  if (G && G.chat && G.chat.showInput) return false;
  for (const [action, key] of Object.entries(extBinds)) {
    if (key === e.key && EXT_ACTIONS[action]) { try { EXT_ACTIONS[action](); } catch(err) {} return true; }
  }
  return false;
}

function extrasSnapshot() {
  const mods = {};
  extModules.forEach(m => { mods[m.id] = Object.assign({}, m.settings); });
  return { mods, chatFilter: Object.assign({}, chatFilterExtras), sky: { enabled: skyState.enabled, preset: skyState.preset, size: skyState.size, overrides: Object.assign({}, skyState.overrides) } };
}
function extrasApply(x) {
  if (!x) return;
  if (x.mods) extModules.forEach(m => { if (x.mods[m.id]) { Object.keys(m.settings).forEach(k => delete m.settings[k]); Object.assign(m.settings, m.defaults, x.mods[m.id]); extSaveSettings(m); if (m.on && m.change) { try { m.change(); } catch(e) {} } extRefreshDrawer(m); } });
  if (x.chatFilter) { Object.assign(chatFilterExtras, x.chatFilter); extSave('chatfilter', chatFilterExtras); }
  if (x.sky) {
    skyState.size = x.sky.size || skyState.size;
    skyState.overrides = Object.assign({}, x.sky.overrides);
    skySaveState();
    if (x.sky.enabled === false) skySetEnabled(false);
    else if (x.sky.preset) skyApply(x.sky.preset, true);
  }
}
function extProfileSnapshot() {
  const states = {};
  [...gridContainer.children].forEach(mc => { if (mc.dataset.moduleName) states[mc.dataset.moduleName] = !!mc._uv2Active; });
  return { states, extras: extrasSnapshot() };
}
function extApplyProfile(p) {
  if (!p) return;
  isRestoring = true;
  [...gridContainer.children].forEach(mc => {
    const n = mc.dataset.moduleName;
    if (n && p.states && p.states[n] !== undefined && p.states[n] !== !!mc._uv2Active) mc.click();
  });
  isRestoring = false;
  extrasApply(p.extras);
}
let extLastServer = null;
function extCheckServerProfile() {
  if (!extInWorld()) { extLastServer = null; return; }
  const si = G.serverInfo || {}, key = si.serverName || si.serverCategory || si.serverId || '';
  if (!key || key === extLastServer) return;
  extLastServer = key;
  const name = extLoad('server-profiles', {})[key], profiles = extLoad('profiles', {});
  if (name && profiles[name]) { extApplyProfile(profiles[name]); showNotification('Loaded profile ' + name); }
}

function extBuildConfigSections() {
  const old = document.getElementById('uv2-profiles-section');
  if (old) old.remove();
  const wrap = document.createElement('div');
  wrap.id = 'uv2-profiles-section';
  wrap.appendChild(skySectionTitle('Profiles'));
  const panel = skyPanel();
  const nameInput = document.createElement('input');
  nameInput.type = 'text'; nameInput.placeholder = 'Profile name, e.g. PvP'; nameInput.style.cssText = extInputStyle;
  const saveBtn = extButton('Save Current', true);
  const row = document.createElement('div');
  row.style.cssText = 'display:flex;gap:8px;padding:12px 0 8px;';
  row.append(nameInput, saveBtn);
  panel.appendChild(row);
  saveBtn.addEventListener('click', () => {
    const n = nameInput.value.trim();
    if (!n) { showNotification('Give the profile a name'); return; }
    const profiles = extLoad('profiles', {});
    profiles[n] = extProfileSnapshot();
    extSave('profiles', profiles);
    showNotification('Profile saved');
    extBuildConfigSections();
  });
  const profiles = extLoad('profiles', {}), serverProfiles = extLoad('server-profiles', {});
  const si = G && G.serverInfo, serverKey = extInWorld() && si ? (si.serverName || si.serverCategory || si.serverId || '') : '';
  Object.keys(profiles).forEach(n => {
    const linked = serverKey && serverProfiles[serverKey] === n;
    const item = document.createElement('div');
    item.style.cssText = `display:flex;align-items:center;gap:8px;padding:9px 0;border-top:1px solid rgba(255,255,255,0.05);`;
    const label = document.createElement('div');
    label.textContent = n + (linked ? '  (auto on this server)' : '');
    label.style.cssText = `flex:1;font-size:13px;color:${linked ? guiPrimaryColor : '#ccc'};font-family:MinibloxFont,sans-serif;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;`;
    const load = extButton('Load');
    load.addEventListener('click', () => { extApplyProfile(profiles[n]); showNotification('Loaded ' + n); });
    item.append(label, load);
    if (serverKey) {
      const link = extButton(linked ? 'Unlink' : 'Use Here');
      link.title = 'Load this profile automatically on this server';
      link.addEventListener('click', () => { const sp = extLoad('server-profiles', {}); if (linked) delete sp[serverKey]; else sp[serverKey] = n; extSave('server-profiles', sp); extBuildConfigSections(); });
      item.appendChild(link);
    }
    const del = extButton('Delete');
    del.addEventListener('click', () => { const p = extLoad('profiles', {}); delete p[n]; extSave('profiles', p); const sp = extLoad('server-profiles', {}); Object.keys(sp).forEach(k => { if (sp[k] === n) delete sp[k]; }); extSave('server-profiles', sp); extBuildConfigSections(); });
    item.appendChild(del);
    panel.appendChild(item);
  });
  if (!Object.keys(profiles).length) {
    const e = document.createElement('div');
    e.textContent = 'No profiles yet. Set things up how you like, then save.';
    e.style.cssText = 'font-size:12px;color:#555;padding:4px 0 12px;font-family:MinibloxFont,sans-serif;';
    panel.appendChild(e);
  }
  wrap.appendChild(panel);

  wrap.appendChild(skySectionTitle('Share Code'));
  const share = skyPanel();
  const out = document.createElement('textarea');
  out.readOnly = true; out.placeholder = 'Your code shows up here';
  out.style.cssText = extInputStyle + 'margin-top:12px;min-height:56px;resize:vertical;font-family:monospace;font-size:11px;';
  const copy = extButton('Copy My Setup', true);
  copy.style.cssText += 'width:100%;padding:10px;margin-top:8px;';
  copy.addEventListener('click', () => {
    out.value = 'UV2:' + btoa(unescape(encodeURIComponent(JSON.stringify(extProfileSnapshot()))));
    out.select();
    navigator.clipboard.writeText(out.value).then(() => showNotification('Code copied')).catch(() => {});
  });
  const inp = document.createElement('textarea');
  inp.placeholder = "Paste a friend's code";
  inp.style.cssText = extInputStyle + 'margin-top:12px;min-height:56px;resize:vertical;font-family:monospace;font-size:11px;';
  const load = extButton('Load Code');
  load.style.cssText += 'width:100%;padding:10px;margin:8px 0 12px;';
  load.addEventListener('click', () => {
    try { extApplyProfile(JSON.parse(decodeURIComponent(escape(atob(inp.value.trim().replace(/^UV2:/, '')))))); showNotification('Setup loaded'); }
    catch(e) { showNotification('That code did not work'); }
  });
  share.append(out, copy, inp, load);
  wrap.appendChild(share);
  uv2ConfigPage.appendChild(wrap);
}

function extrasApplyAccent() {
  if (!extrasReady) return;
  renderCategoryBar();
  document.querySelectorAll('.uv2x-accent-range').forEach(el => { el.style.accentColor = guiPrimaryColor; });
  document.querySelectorAll('.uv2x-accent-text').forEach(el => { el.style.color = guiPrimaryColor; });
  extModules.forEach(m => { if (m.card && m.card._gear && m.card._drawerOpen) m.card._gear.style.color = guiPrimaryColor; extRefreshDrawer(m); });
  if (uv2SkiesPage.style.display !== 'none') skiesBuildPage();
  extBuildConfigSections();
}

let extLastFrame = performance.now();
function extLoop() {
  requestAnimationFrame(extLoop);
  const now = performance.now(), dt = Math.min(0.1, (now - extLastFrame) / 1000);
  extLastFrame = now;
  if (!G || !T) return;
  try {
    if (extrasChatInUse()) ensureChatAddChatPatched();
    if (extById('commands').on) extHookSubmit();
    if (extInWorld()) extTrackEntities();
    extCheckServerProfile();
  } catch(e) {}
  for (const m of extModules) { if (m.on && m.frame) { try { m.frame(dt); } catch(e) {} } }
  if (extFx) for (const p of Object.values(extFx)) { try { p.update(dt); } catch(e) {} }
}

extrasReady = true;
renderCategoryBar();
extBuildConfigSections();
Object.keys(moduleBindings).forEach(n => { if (moduleBindings[n]) updateModuleKeybindPill(n, moduleBindings[n]); });
(async () => {
  while (!(extGame() && extGame().gameScene && extGame().gameScene.sky && extGame().gameScene.stars)) await extSleep(500);
  G = extGame();
  sky = createSkyEngine(G);
  T = extDiscoverThree(G.gameScene);
  await skyLoadMine();
  try { skyPresets = await sky.listPresets(); } catch(e) {}
  for (const m of extModules) { if (m.on && m.enable) { try { await m.enable(); } catch(e) {} } }
  if (extModules.some(m => m.on && extChatMods.includes(m.id))) ensureChatAddChatPatched();
  requestAnimationFrame(extLoop);
  if (skyState.enabled) skyApply(skyCurrentKey() || 'black', true);
  if (uv2SkiesPage.style.display !== 'none') skiesBuildPage();
})();

sortModulesByFavorite();

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
    desc.textContent = "We detected that your connection is coming through a VPN/proxy. Please turn it off.";
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
ignoreBtn.addEventListener('mouseenter', () => { ignoreBtn.style.transform = 'scale(1.03)'; });
ignoreBtn.addEventListener('mouseleave', () => { ignoreBtn.style.transform = 'scale(1)'; });

const notVpnBtn = document.createElement('button');
notVpnBtn.textContent = "I'm not using a VPN";
notVpnBtn.style.cssText = 'background:#2a2a2a;color:#fff;border:1px solid #444;border-radius:6px;padding:10px 18px;font-size:14px;cursor:pointer;font-family:MinibloxFont,sans-serif;transition:background 0.15s ease;';
notVpnBtn.addEventListener('mouseenter', () => { notVpnBtn.style.background = '#3a3a3a'; });
notVpnBtn.addEventListener('mouseleave', () => { notVpnBtn.style.background = '#2a2a2a'; });

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
  const existingBar = document.getElementById('uv2-bind-bar');
  if (existingBar) { existingBar.remove(); isBinding = false; }
  ui.style.display = 'flex';
  ui.classList.remove('uv2-animate-out');
  ui.classList.add('uv2-animate-in');
  uv2Backdrop.classList.toggle('show', ui.classList.contains('uv2-layout-window'));
  if (typeof uv2RenderFooter === 'function') uv2RenderFooter();
  uv2PauseGame();
}

let uv2PausedGame = false;
function uv2GameRef() {
  try { return Object.values(document.querySelector('#react'))[0].updateQueue.baseState.element.props.game; } catch(e) { return null; }
}
function uv2PauseGame() {
  if (!settings.pauseGame) return;
  const game = uv2GameRef();
  if (!game || typeof game.inGame !== 'function' || !game.inGame() || !document.pointerLockElement) return;
  uv2PausedGame = true;
  const hideEscapeMenu = () => {
    document.removeEventListener('pointerlockchange', hideEscapeMenu);
    setTimeout(() => { try { if (uiVisible) game.info.menus.close('escapeMenu'); } catch(e) {} }, 0);
  };
  document.addEventListener('pointerlockchange', hideEscapeMenu);
  try { document.exitPointerLock(); } catch(e) {}
}
function uv2ResumeGame() {
  if (!uv2PausedGame) return;
  uv2PausedGame = false;
  const game = uv2GameRef();
  if (!game || !game.inGame()) return;
  const showEscapeMenu = () => { try { game.info.menus.open('escapeMenu'); game.escapeMenuOpenedAt = Date.now(); } catch(e) {} };
  try {
    const lock = document.body.requestPointerLock();
    if (lock && typeof lock.catch === 'function') lock.catch(showEscapeMenu);
  } catch(e) { showEscapeMenu(); }
}

function closeUI() {
  if (closeUITimeout) { clearTimeout(closeUITimeout); closeUITimeout = null; }
  ui.classList.replace('uv2-animate-in', 'uv2-animate-out');
  uv2Backdrop.classList.remove('show');
  uv2ResumeGame();
  closeUITimeout = setTimeout(() => {
    ui.style.display = 'none';
    ui.classList.remove('uv2-animate-out');
    uiAnimating = false;
    closeUITimeout = null;
  }, 150);
  uiAnimating = true;
}

function toggleUI() {
  if (!introFinished || uiAnimating) return;
  if (uiVisible) {
    uiVisible = false;
    closeUI();
  } else if (vpnGateDismissed || !settings.vpnWarning) {
    uiVisible = true;
    openUI();
  } else {
    checkIsVpn(isVpn => {
      if (isVpn) {
        showVpnGate(() => { uiVisible = true; openUI(); });
      } else {
        uiVisible = true;
        openUI();
      }
    });
  }
}
    document.addEventListener("keydown", event => {
    if (event.uv2Synthetic) return;
    const typing =event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.isContentEditable);
    const isUiKey = (uiKeybind === 'backtick' && event.key === '`') || (uiKeybind === 'rshift' && event.key === 'Shift' && event.location === 2) || (uiKeybind === 'backslash' && event.key === '\\');
    if (isUiKey && !(typing && uiKeybind !== 'rshift')) toggleUI();
    if (event.key === 'Escape' && uiVisible && typeof uv2Sheet !== 'undefined' && uv2Sheet.owner) { uv2SheetClose(); return; }
    if (event.key === 'Escape' && uiVisible && !isBinding && !document.getElementById('uv2-keybind-modal')) { toggleUI(); return; }
    if (typing) return;
    if (typeof extrasHandleKey === 'function' && extrasHandleKey(event)) return;
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
    updateModuleBadge();
  }
  function saveAllModuleStates() {
    [...gridContainer.children].forEach(mc => {
      const savedName = mc.dataset.moduleName;
      if (!savedName) return;
      localStorage.setItem('uv2-module-' + savedName, mc._uv2Active ? 'true' : 'false');
    });
  }
  function waitAndRestoreModuleStates() {
    let attempts = 0;
    const poll = setInterval(() => {
      attempts++;
      if (getGameChat() || attempts >= 40) {
        clearInterval(poll);
        restoreModuleStates();
      }
    }, 500);
  }
  waitAndRestoreModuleStates();

  let afkTriggered = false;
  let afkAudio = null;
  let afkAntiAfkWasOff = false;
  let afkGraceUntil = 0;
 function showToast(msg, color, duration = 3500) {
  const existing = document.getElementById('uv2-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'uv2-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position: 'fixed', top: '-60px', left: '50%', transform: 'translateX(-50%)',
    background: color, color: '#fff', padding: '10px 22px',
    borderRadius: '8px', fontSize: '15px', fontFamily: 'MinibloxFont, sans-serif',
    zIndex: '99999', transition: 'top 0.5s ease, opacity 0.5s ease', opacity: '0',
    whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,0.5)',
  });
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.top = '18px'; toast.style.opacity = '1'; }, 20);
  setTimeout(() => { toast.style.top = '-60px'; toast.style.opacity = '0'; }, duration);
  setTimeout(() => { if (toast.parentNode) toast.remove(); }, duration + 700);
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

function onAfkTriggered() {
  if (afkTriggered) return;
  if (!/\/join\//.test(window.location.pathname)) {
    afkTimer = setTimeout(onAfkTriggered, afkDelay * 1000);
    return;
  }
  afkTriggered = true;
  afkGraceUntil = Date.now() + 2000;
  showToast('Anti-AFK enabled', '#e74c3c');
  if (settings.afkChat) sendAfkChatMessage("I am Currently AFK, Be back momentarily.");
  const afkMod = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
  if (afkMod && !afkMod._uv2Active) {
    afkAntiAfkWasOff = true;
    afkMod.click();
  } else {
    afkAntiAfkWasOff = false;
  }
  if (settings.afkMusic) {
    afkAudio = new Audio('https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/AfkSong.mp3');
    afkAudio.loop = true;
    afkAudio.volume = 0;
    afkAudio.play().catch(() => {});
    let vol = 0;
    const fadeIn = setInterval(() => {
      vol = Math.min(1, vol + 0.05);
      afkAudio.volume = vol;
      if (vol >= 1) clearInterval(fadeIn);
    }, 100);
  }
}

function onUserReturn() {
  if (!afkTriggered) return;
  afkTriggered = false;
  if (afkAudio) {
    const audio = afkAudio;
    afkAudio = null;
    let vol = audio.volume;
    const fadeOut = setInterval(() => {
      vol = Math.max(0, vol - 0.05);
      audio.volume = vol;
      if (vol <= 0) {
        clearInterval(fadeOut);
        audio.pause();
        audio.src = '';
      }
    }, 100);
  }
  if (afkAntiAfkWasOff) {
    const afkMod = [...gridContainer.children].find(c => c.dataset.moduleName === MODULE_NAMES.ANTI_AFK);
    if (afkMod && afkMod._uv2Active) {
      afkMod.click();
      showToast('Anti-AFK disabled. Welcome Back!', '#2ecc71');
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
