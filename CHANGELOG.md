# Changelog

## v3.4
### Added
- Link blocking in Chat Filter for incoming and outgoing messages
- Blocked-message notice for links
- Changelog sidebar page showing full version history as a timeline
- /info command

### Changed
- Reorganised settings panel layout
- Refactored localStorage usage

## v3.3.1
### Added
- Version display in sidebar

### Removed
- Version and license display from Settings

### Changed
- Settings split into three main sections

## v3.3
### Removed
- Language dropdown and all translation support; client is now English only

## v3.2
### Added
- Update Checker comparing installed version to client.js on GitHub every minute
- Update popup with newest changelog entry, Update Now and Remind Me Later options
- @downloadURL and @updateURL in userscript header

### Changed
- Update and What's New popups merged into a single top-center pill-style card
- Popups no longer darken the screen or block mouse movement
- Update popup takes priority over What's New when both would trigger

## v3.1
### Added
- Profanity regex filter

## v3
### Added
- Duplicate keybind notification naming the conflicting module

### Fixed
- Incorrect "was turned off" notification on module enable

## v2.7
### Added
- UI keybind setting (Right Shift or `)
- What's New popup fetching latest changelog entry from GitHub, shown once per version

### Fixed
- Draggable modules using bounding boxes (excludes Armor HUD)

## v2.3
### Changed
- Armor HUD dock fixed to right side only

### Removed
- Unused variables and side-selection logic for Armor HUD
- Resize listener tied to HUD repositioning
- Russian and Dutch language support

## v2.23
### Changed
- Version bump

## v2.2.2
### Added
- Shine animation on module cards
- Contributor bios, icons, and titles in Settings

### Changed
- Color theme refresh

### Removed
- Music Player moved out of client.js into MusicPlayer.js

## v2.2.1
### Changed
- New title screen background
- Intro sequence extended for readability
- Build size reduced from 139 KB to 125 KB

### Removed
- Most CSS button overrides following Miniblox title screen changes

## v2.2
### Added
- Armor HUD module with floating and docked modes
- Armor HUD settings: icon opacity, background opacity, icon size, spacing, side selection
- French, Dutch, and Russian language support
- New theme preset

## v2.1.1
### Added
- Chat Filter with profanity and spam detection

## v2.1.0
### Added
- Settings panel with sound, notification, animation, and persistence toggles
- VPN/proxy detection with dismissible warning
- Anti-AFK auto-enable with configurable idle delay and chat notification
- Theme system with color presets
- Config save/load via JSON
- Multi-language support (English, Spanish)
- Profile avatar system

## v1.0
### Added
- Base client
- Keystrokes, FPS, CPS display
- Minimal UI with themes
