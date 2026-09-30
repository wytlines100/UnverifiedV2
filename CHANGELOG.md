# Changelog

## v3.8
- Removed unused guiBackgroundColor and guiTextColor variables
- Hardcoded background and text colors inline where needed
- Removed dead backgroundColor and textColor keys from config save/load
- Removed redundant Select JSON File button, load button now handles file picking
- Save and Load Config buttons are now side by side
- Removed unused select element style loop from applyGUIStyles

## v3.7
- Smoother notification slide animation
- Welcome message now appears only when joining a planet
- Welcome message wording updated
- Fixed Anti-AFK style element leaking on every enable
- Removed unused settings toggles for notifications and animation

## v3.6
- Intro now shows the active UI keybind
- Slower, smoother intro fade-in and fade-out
- Longer hold time before intro dismisses
- Intro rotation timing shortened
- Fixed timing for intro and update checker

## v3.5
- Removed Profile/User (purely cosmetic)

## v3.4
- Link blocking in Chat Filter (incoming and outgoing)
- Blocked-message notice for links
- Changelog sidebar page with full version timeline
- /info command
- Reorganised settings panel layout
- Refactored localStorage usage

## v3.3.1
- Version display restored to sidebar
- Version and license display removed from Settings
- Settings split into three sections

## v3.3
- Removed language dropdown and translation support (English only)

## v3.2
- Added Update Checker (compares installed version to GitHub every minute)
- Update popup with newest changelog entry, Update Now / Remind Me Later
- Merged Update and What's New popups into one pill-style card
- Popups no longer block mouse or darken screen
- Update popup takes priority over What's New
- Added @downloadURL and @updateURL to userscript header

## v3.1
- Added profanity regex filter

## v3
- Added duplicate keybind conflict notification
- Fixed incorrect "was turned off" notification on enable

## v2.7
- Added UI keybind setting (Right Shift or `)
- Added What's New popup (fetches latest changelog entry, shown once per version)
- Fixed draggable module bounding boxes (excludes Armor HUD)

## v2.3
- Armor HUD docking fixed to right side only
- Removed unused Armor HUD variables and side-selection logic
- Removed resize listener tied to HUD repositioning
- Removed Russian and Dutch language support

## v2.23
- Version bump

## v2.2.2
- Added shine animation on module cards
- Added contributor bios, icons, titles in Settings
- Color theme refresh
- Moved Music Player to MusicPlayer.js

## v2.2.1
- New title screen background
- Extended intro sequence
- Reduced build size (139 KB to 125 KB)
- Removed most CSS button overrides

## v2.2
- Added Armor HUD (floating and docked modes)
- Added Armor HUD settings: opacity, icon size, spacing, side selection
- Added French, Dutch, Russian language support
- Added new theme preset

## v2.1.1
- Added Chat Filter (profanity and spam detection)

## v2.1.0
- Added Settings panel (sound, notification, animation, persistence)
- Added VPN/proxy detection warning
- Added Anti-AFK auto-enable with idle delay and chat notification
- Added theme system with color presets
- Added config save/load via JSON
- Added multi-language support (English, Spanish)
- Added profile avatar system

## v1.0
- Base client
- Keystrokes, FPS, CPS display
- Minimal UI with themes
