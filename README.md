# UnverifiedV2

A custom client for Miniblox, in active development since October 2024.

## Requirements

- A userscript manager, such as Tampermonkey
- A supported browser (Chrome, Firefox, Edge, or any Chromium-based browser that supports userscript extensions)
- Miniblox.io (main site almost everyone uses this or Crazygames)

## Features

- Auto Fullscreen: automatically toggles fullscreen mode
- Keystrokes: displays the keys you press in real time
- Mute Chat: hides other players' messages from chat
- Anti-AFK: automatically presses movement keys to prevent being kicked for inactivity, with an optional auto-enable on idle and an optional chat notification
- Keep Sprint: keeps you sprinting automatically while moving
- Time Display: shows a draggable on-screen clock
- Music Player: search and play tracks, or load audio from a direct URL, with volume control and a draggable interface
- Theme selection: choose from multiple color themes for the UI
- Config management: save your settings and module states to a JSON file and reload them later
- Key binding: right-click any module to assign a custom keybind
- VPN/proxy detection: optional warning shown on menu open if a VPN or proxy is detected, with a "don't show again" option
- Multi-language support: English and Spanish interface translations
- Profile avatar: a sidebar profile picture that is auto-detected by country via IP lookup, uploadable from a local image, or randomizable
- Settings panel: toggles for module click sounds, toast notifications, UI open/close animation, module-state persistence across reloads, and the idle delay used by Anti-AFK
- Idle delay configuration: adjustable from 5 to 120 seconds, controlling how long you can be inactive before Anti-AFK auto-enables

## Installation

1. Install a userscript manager such as Tampermonkey for your browser.
2. Add a new script in Tampermonkey and paste in the contents of `client.js` (or install directly from the repository if a hosted raw link is provided).
3. Save the script and make sure it is enabled.
4. Visit a supported site listed under Requirements. The client will initialize automatically.
5. Press the right Shift key to open or close the client menu.

See API.md for the full API reference, including cleanup functions and notification options.

## Known Limitations

- This client modifies a third-party game's front end by injecting scripts and styles; it is not affiliated with or endorsed by Miniblox.
- Features rely on matching specific DOM selectors and class names used by the game. Updates to the game's front end may break individual modules until the client is updated to match.
- VPN and proxy detection relies on a third-party IP lookup service and may occasionally produce false positives or negatives.
- Use of this client is at your own risk. The maintainers are not responsible for any account actions taken as a result of using it.

## Contributing

Contributions are welcome. If you would like to report a bug, suggest a feature, or submit a fix, reach out via the contact details below or through the Discord community.

Current contributors: wytlines, DeadFish7, andreypidd, jet, joudaALT, TrustIsOver, TheM1ddleM1n

## Changelog

### 2.1.0
- Added Settings panel with sound, notification, animation, and module-persistence toggles
- Added VPN/proxy detection with dismissible warning
- Added Anti-AFK auto-enable with configurable idle delay and chat notification
- Added theme system with multiple color presets
- Added config save/load via JSON
- Added multi-language support (English, Spanish)
- Added profile avatar system

### 1.9
- Initial client with core modules: Auto Fullscreen, Keystrokes, FPS Counter, CPS Counter, Hitboxes, Ping Counter, Armor HUD, FPS Booster, Render Distance Bypasser
- Added key binding support
- Added theme dropdown for background customization

### 1.0
- Initial release!

## Credits

Credit to Miniblox for the base game this project extends.

## License

This project is licensed under a proprietary "All Rights Reserved" license. You may not use, copy, modify, or distribute this code without prior written permission from the copyright holder.

Contact: wytlines100 — rfd6108@gmail.com

Users are granted permission to use the client for personal or public use, subject to the above restrictions on redistribution and modification.

## Community

Join the Discord for updates and support: https://dsc.gg/unverifiedv2
