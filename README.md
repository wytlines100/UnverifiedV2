# UnverifiedV2

A custom client for Miniblox, in active development since October 2024.

## Requirements

- A userscript manager, such as Tampermonkey
- A supported browser (Chrome, Firefox, Edge, or any Chromium-based browser that supports userscript extensions)
- Miniblox.io (main domain almost everyone uses this or Crazygames)

## Features

- Auto Fullscreen: automatically toggles fullscreen mode
- Keystrokes: displays the keys you press in real time
- Mute Chat: hides other players' messages from chat
- Anti-AFK: automatically presses movement keys to prevent being kicked for inactivity, with an optional auto-enable on idle and an optional chat notification. (ONLY ingame -> Not on menu :D)
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
- Chat Filter: Blocks profanity/Spam from `game.chat`
- Armor HUD - Shows Enchantments/Icons/Armor as a standalone draggable box. (Will only work ingame. Does not show on menu.)

## Client Installation 

1. Install a Userscript manager such as Tampermonkey for your browser. (Make sure Allow UserScripts is on!)
2. Add a new script in Tampermonkey and paste all of `client.js`.
3. Save the script and make sure it is enabled. (Ctrl S)
4. Visit miniblox.io the client will initialize automatically (Notification at top should appear)
5. Press the Right Shift key to open or close the client menu.

## Known Limitations

- This client modifies a third-party game's front end by injecting scripts and styles; it is not affiliated with or endorsed by Miniblox.
- Features rely on matching specific DOM selectors and class names used by the game. Updates to the game's front end may break individual modules until the client is updated to match.
- VPN and proxy detection relies on a third-party IP lookup service and may occasionally produce false positives or negatives.
- Use this client at your own risk. The maintainers will NOT be responsible for any account actions taken as a result of using it.

## Contributing

Contributions are welcome. If you would like to report a bug or suggest a feature, please reach out via the contact email below or through our Discord server.

By submitting a contribution, you agree it becomes part of the project under this license and grant the maintainers full rights to use, modify, and distribute it.

Current contributors: wytlines, DeadFish7, andreypidd, jet, joudaALT, TrustIsOver, TheM1ddleM1n

## Changelog

### 2.2.1 - CSS/Intro Update
- Most CSS buttons were removed (due to new title screen vector created.)
- New Background for title screen :D
- Only Background CSS remains (cause Vector did not change that and only focused on other game objects including remapping things.)
- Intro extended by 3-4 seconds so you can read authors
- Build size decreased from 139KB to 125KB

### 2.2 - Big Update!
- Armor HUD added!
- Logic added for Armor HUD to show only ingame and NOT in menu.
- 3 New languages! (French, Dutch, Russian)
- 1 More new theme added!
- Bumped version from `2.1.1 -> 2.2`
- Documentation changes again.

### 2.1.1
- Added Chat Profanity Checker
- Updated authors
- Bumped version from `2.1.0 -> 2.1.1`
- Refined updates for `README.md`

### 2.1.0
- Added Settings panel with sound, notification, animation, and module-persistence toggles
- Added VPN/proxy detection with dismissible warning
- Added Anti-AFK auto-enable with configurable idle delay and chat notification
- Added theme system with multiple color presets
- Added config save/load via JSON
- Added multi-language support (English, Spanish)
- Added profile avatar system

## Credits
- Miniblox for creating the base of the game.

## License
This project is licensed under a proprietary "All Rights Reserved" license. You may not use, copy, modify, or distribute this code without prior written permission from the copyright holder.

Contact: wytlines100 — rfd6108@gmail.com

Users are granted permission to use the client for personal or public use, subject to the above restrictions on redistribution and modification.

## Community
Please Join Our Discord Server for updates / support: https://dsc.gg/unverifiedv2
