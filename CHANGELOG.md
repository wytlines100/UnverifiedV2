# Changelog

## v3.2 - Update Checker
- Added an Update Checker that compares the installed version to client.js on GitHub every minute
- Update popup shows the newest changelog entry with Update Now and Remind Me Later options
- Update Now opens the raw script so Tampermonkey installs it straight away
- Update and What's New popups now share a single top-center pill-style card
- Popups no longer darken the screen and never block mouse movement
- Update popup and What's New can no longer appear at the same time; updates take priority
- Added @downloadURL and @updateURL to the userscript header
- Version bumped from 3.1 -> 3.2

## v3.1 - Regex Update
- Regex added for profanity saving roughly ~65 lines

## v3 - Bind Popups and Notification fixes
- Notifies the user if a duplicate keybind is being used with the clashing module
- "was turned off" after some modules while enabling them fixed

## 2.8 — MiniFeather Collab Update
- Added a Collab sidebar page featuring MiniFeather Client
- Version bumped from 2.7 -> 2.8

## 2.7 — Keybind / Bounding Box / What's New Update
- Added UI keybind setting to switch the menu toggle between Right Shift and `
- Added a What's New popup that fetches the latest changelog entry from GitHub and displays it once per version after the intro
- Version bumped from 2.3 -> 2.7
- Fixed Draggable modules (apart from ArmorHUD because that was good in the first place) with new bounding boxes

## 2.3 — Armor HUD Rework
- Armor HUD dock is now fixed to the right side only
- Removed 9 unused variables
- Removed `_armorSide` variables and associated side-selection logic
- Removed `window.addEventListener('resize', ...)` handler tied to HUD repositioning
- Dropped language support for Russian and Dutch.

## 2.23 - Version Bump
- Version bumped from 2.2.2 -> 2.23
- Collab with Mini Feather Coming soon!

## 2.2.2 — Shine / Music Player Update
- Added shine animation effect to module cards
- Moved Music Player out of `client.js` into a separate `MusicPlayer.js`
- Settings → Contributors section improved with bios, icons, and titles
- Color theme refresh
- other stuff

## 2.2.1 — CSS / Intro Update
- Removed most CSS button overrides following Miniblox title screen changes
- New title screen background
- Intro sequence extended by 3–4 seconds to allow reading the author credits
- Build size reduced from 139 KB to 125 KB
- Documentation updates

## 2.2 — Major Update
- Added Armor HUD module with floating and docked modes
- Added Armor HUD settings: icon opacity, background opacity, icon size, spacing, and side selection
- Added French, Dutch, and Russian language support
- Added a new theme preset
- Version bumped from 2.1.1 → 2.2

## 2.1.1
- Added Chat Filter with profanity and spam detection
- Updated author credits
- Version bumped from 2.1.0 → 2.1.1

## 2.1.0
- Added Settings panel with sound, notification, animation, and module-persistence toggles
- Added VPN/proxy detection with dismissible warning
- Added Anti-AFK auto-enable with configurable idle delay and chat notification
- Added theme system with color presets
- Added config save/load via JSON
- Added multi-language support (English, Spanish)
- Added profile avatar system

## 1.0
- Base Client
- Keystrokes, FPS, CPS added etc
- Minimal UI with themes
