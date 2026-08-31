# UnverifiedV2

A custom userscript client for [Miniblox](https://miniblox.io), actively developed since October 2024.

## Requirements

- A Chromium-based browser
- [Tampermonkey](https://www.tampermonkey.net) (or equivalent userscript manager) with **Allow UserScripts** enabled
- Access to [miniblox.io](https://miniblox.io)

## Installation

1. Install Tampermonkey for your Chromium browser and ensure **Allow UserScripts** is enabled.
2. Open the Tampermonkey dashboard and create a new script.
3. Paste the full contents of `client.js` into the editor.
4. Save the script and confirm it is enabled.
5. Navigate to `miniblox.io` — the client will initialize automatically.
6. Press **Right Shift** to open or close the client menu.

> Optional: The Music Player is a separate file (`MusicPlayer.js`) and must be installed independently.

## Features

### Modules
| Module | Description |
|---|---|
| Auto Fullscreen | Automatically enters fullscreen when the game loads |
| Keystrokes | Displays W/A/S/D, LMB, RMB, and Space inputs in real time; draggable overlay |
| Mute Chat | Suppresses all incoming chat messages from other players |
| Chat Filter | Blocks profanity and repeated spam from appearing in chat; also prevents sending filtered messages |
| Anti-AFK | Cycles WASD/Space key presses automatically to prevent an idle kick; includes a draggable status indicator |
| Keep Sprint | Dispatches Shift alongside movement keys to maintain a sprint state |
| Time Display | Shows a draggable live clock overlay so you don't have to exit fullscreen |
| Armor HUD | Draggable overlay showing each armor slot's icon, durability percentage, and enchantments; only visible in a match |

### Interface
- **Key Binding** — Right-click any module to assign or clear a custom keybind
- **Search Bar** — Filter the module list by name or description in real time
- **Theme Color Picker** — Choose any accent color via a color picker or hex input, with a recent-color history
- **Config Management** — Export all settings, module states, and keybinds to a JSON file and re-import them later
- **UI Animation** — Optional open/close animation for the menu
- **Module Persistence** — Optionally restore active module states after a page reload
- **Toast Notifications** — Optional pop-up confirmations when modules toggle
- **Module Click Sounds** — Optional audio feedback when toggling modules
- **Multi-Language Support** — English, Spanish, French, Dutch, and Russian (with more soon)

### Profile
- Sidebar avatar auto-detected by country via IP lookup
- Upload a custom image from your local device
- Randomize the avatar from a preset pool
- Reset back to the country flag at any time

### Anti-AFK (Advanced)
- **Auto Enable** — Automatically activates Anti-AFK after a configurable idle period (5–120 seconds)
- **AFK Chat Message** — Optionally sends a chat message when you go idle
- **Auto Disable** — Restores previous Anti-AFK state when activity is detected again
- Idle delay is configurable in the Settings panel

### Security
- **VPN / Proxy Detection** — Optional warning shown on menu open if a VPN or proxy is detected, with a dismissible "don't show again" option

### Cosmetics
- **Shine Effect** — Animated shine sweep on module cards
- **Custom Background** — Replaces the Miniblox title screen background image
- **Custom Title** — Sets the browser tab title to `UnverifiedV2`

## Modules Page Navigation

The menu is split into four sidebar pages:

| Page | Contents |
|---|---|
| Modules | All toggleable modules and the search bar |
| Color | Accent color picker with hex input and recent colors |
| Config | Save and load configuration as a JSON file |
| Settings | Sounds, notifications, animation, persistence, VPN warning, Auto-AFK options, Version, Contributors |

## Known Limitations

- This client modifies a third-party game's front end by injecting scripts and styles. It is not affiliated with or endorsed by Miniblox.
- Modules depend on specific DOM selectors and class names used by Miniblox. Front-end updates to the game may break individual modules until the client is updated.
- VPN and proxy detection relies on a third-party IP lookup service and may produce false positives or negatives.
- The Armor HUD requires `unsafeWindow.spriteMap` and `unsafeWindow.Enchantment` to be present; it will not render outside of an active match.
- **Use this client at your own risk. The maintainers are not responsible for any account actions resulting from its use.**

## Contributing

Contributions are welcome. To report a bug or suggest a feature, reach out via the contact email below or through the Discord server.

By submitting a contribution, you agree that it becomes part of the project under this license and grant the maintainers full rights to use, modify, and distribute it.

**Current contributors:** wytlines, DeadFish7, andreypidd, jet, joudaALT, TrustIsOver, TheM1ddleM1n

## Changelog

### 2.2.2 — Shine / Music Player Update
- Added shine animation effect to module cards
- Moved Music Player out of `client.js` into a separate `MusicPlayer.js`
- Build size reduced from 125 KB to 116 KB
- Settings → Contributors section improved with bios, icons, and titles
- Color theme refresh

### 2.2.1 — CSS / Intro Update
- Removed most CSS button overrides following Miniblox title screen changes
- New title screen background
- Intro sequence extended by 3–4 seconds to allow reading the author credits
- Build size reduced from 139 KB to 125 KB
- Documentation updates

### 2.2 — Major Update
- Added Armor HUD module
- Added French, Dutch, and Russian language support
- Added a new theme preset
- Version bumped from 2.1.1 → 2.2

### 2.1.1
- Added Chat Filter with profanity and spam detection
- Updated author credits
- Version bumped from 2.1.0 → 2.1.1

### 2.1.0
- Added Settings panel with sound, notification, animation, and module-persistence toggles
- Added VPN/proxy detection with dismissible warning
- Added Anti-AFK auto-enable with configurable idle delay and chat notification
- Added theme system with color presets
- Added config save/load via JSON
- Added multi-language support (English, Spanish)
- Added profile avatar system

## Credits

- [Miniblox](https://miniblox.io) for creating the base game

## License

This project is licensed under a proprietary **All Rights Reserved** license. You may not use, copy, modify, or distribute this code without prior written permission from the copyright holder.

Users are granted permission to use the client for personal or public use, subject to the above restrictions on redistribution and modification.

**Contact:** wytlines100 — rfd6108@gmail.com

## Community

Join the Discord server for updates and support: [UnverifiedV2 Discord](https://dsc.gg/unverifiedv2)
