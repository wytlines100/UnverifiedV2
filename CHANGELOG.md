# Changelog

## v3.5 
- Profile/User removed as it was purely cosmetic

## v3.4
- Link blocking in Chat Filter for incoming and outgoing messages
- Blocked-message notice for links
- Changelog sidebar page showing full version history as a timeline
- /info command
- Reorganised settings panel layout
- Refactored localStorage usage

## v3.3.1
- Version display added back to sidebar
- Version and license display removed from Settings
- Settings split into three main sections

## v3.3
- Removed language dropdown and all translation support; client is now English only

## v3.2
- Added Update Checker comparing installed version to client.js on GitHub every minute
- Update popup shows newest changelog entry with Update Now and Remind Me Later options
- Update and What's New popups merged into a single top-center pill-style card
- Popups no longer darken the screen or block mouse movement
- Update popup takes priority over What's New when both would trigger
- Added @downloadURL and @updateURL to userscript header

## v3.1
- Added profanity regex filter

## v3
- Added duplicate keybind notification naming the conflicting module
- Fixed incorrect "was turned off" notification on module enable

## v2.7
- Added UI keybind setting (Right Shift or `)
- Added What's New popup fetching latest changelog entry from GitHub, shown once per version
- Fixed draggable modules using bounding boxes (excludes Armor HUD)

## v2.3
- Armor HUD dock fixed to right side only
- Removed unused variables and side-selection logic for Armor HUD
- Removed resize listener tied to HUD repositioning
- Removed Russian and Dutch language support

## v2.23
- Version bump

## v2.2.2
- Added shine animation on module cards
- Added contributor bios, icons, and titles in Settings
- Color theme refresh
- Music Player moved out of client.js into MusicPlayer.js

## v2.2.1
- New title screen background
- Intro sequence extended for readability
- Build size reduced from 139 KB to 125 KB
- Removed most CSS button overrides following Miniblox title screen changes

## v2.2
- Added Armor HUD module with floating and docked modes
- Added Armor HUD settings: icon opacity, background opacity, icon size, spacing, side selection
- Added French, Dutch, and Russian language support
- Added new theme preset

## v2.1.1
- Added Chat Filter with profanity and spam detection

## v2.1.0
- Added Settings panel with sound, notification, animation, and persistence toggles
- Added VPN/proxy detection with dismissible warning
- Added Anti-AFK auto-enable with configurable idle delay and chat notification
- Added theme system with color presets
- Added config save/load via JSON
- Added multi-language support (English, Spanish)
- Added profile avatar system

## v1.0
- Base client
- Keystrokes, FPS, CPS display
- Minimal UI with themes
