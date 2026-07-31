# UnverifiedV2

A custom client for Miniblox, in active development since October 2024.

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
- VPN/proxy detection: optional warning shown on menu open if a VPN or proxy is detected
- Multi-language support: English and Spanish interface translations
- Custom Module API: build your own modules using simple `OnToggledOn` and `OnToggledOff` functions (see API.md)

## Installation

1. Install a userscript manager such as Tampermonkey for your browser. (Make sure Allow UserScripts is on or it will not work!)
2. Add a new script in Tampermonkey and paste in the contents of `client.js`
3. Save the script and make sure it is enabled.
4. Visit a supported site (miniblox.io). The client will initialize automatically.
5. Press the Right Shift key to open or close the client menu.

## Credits

Credit to Miniblox for the base game this project extends.

## License

This project is licensed under a proprietary "All Rights Reserved" license. You may not use, copy, modify, or distribute this code without prior written permission from the copyright holder.

Contact: wytlines100 — rfd6108@gmail.com

Users are granted permission to use the client for personal or public use, subject to the above restrictions on redistribution and modification.

## Community

Join the Discord for updates and support: https://dsc.gg/unverifiedv2
