# UnverifiedV2

A custom utility client for [Miniblox](https://miniblox.io), actively developed since October 2024.

## System Requirements

- A Chromium-based browser
- [Tampermonkey](https://www.tampermonkey.net) (or equivalent userscript manager) with **Allow UserScripts** enabled
- Access to [miniblox.io](https://miniblox.io)

## Installation Guide

1. Install Tampermonkey for your Chromium browser and ensure **Allow UserScripts** is enabled.
2. Open the Tampermonkey dashboard and create a new script.
3. Paste the full contents of `client.js` into the editor.
4. Save the script and confirm it is enabled.
5. Navigate to `miniblox.io` — the client will initialize automatically.
6. Press **Right Shift** (default) or Backtick (`) to open or close the client menu.

> **Note:** The Music Player is a separate file (`MusicPlayer.js`) to be installed separately.
> > **Note:** Installing from the raw `client.js` URL on GitHub enables Tampermonkey's built-in update tracking alongside the in-client Update Checker.

## Feature Matrix

### Core Modules
| Module | Description |
|---|---|
| **Auto Fullscreen** | Automatically enters fullscreen when the game loads |
| **Keystrokes** | Displays W/A/S/D, LMB, RMB, and Space inputs in real time; draggable overlay |
| **Mute Chat** | Suppresses all incoming chat messages from other players |
| **Chat Filter** | Blocks profanity and repeated spam from appearing in chat; also prevents sending filtered messages |
| **Anti-AFK** | Cycles WASD/Space key presses automatically to prevent an idle kick; includes a draggable status indicator |
| **Keep Sprint** | Dispatches Shift alongside movement keys to maintain a sprint state |
| **Time Display** | Shows a draggable live clock overlay so you don't have to exit fullscreen |
| **Armor HUD** | Draggable overlay showing each armor slot's icon, durability percentage, and enchantments; only visible in a match; supports docked and floating modes |

### Interface & Customization
- **Key Binding** — Right-click any module to assign or clear a custom keybind
- **UI Keybind** — Choose whether the menu opens with Right Shift or the backtick (`) key, set from the Settings page
- **Favorites** — Star any module to pin it to the top of the module list; persisted across reloads
- **Search Bar** — Filter the module list by name or description in real time
- **Theme Color Picker** — Choose any accent color via a color picker or hex input, with a recent-color history
- **Config Management** — Export all settings, module states, and keybinds to a JSON file and re-import them later
- **What's New** — Fetches the latest CHANGELOG.md entry from GitHub and displays it in a dismissible popup at the top of the screen when the script version changes
- **Update Checker** — Compares the installed version against `client.js` on GitHub every minute and shows an update popup with the latest changelog entry.
- **Visual Polish** — Optional UI open/close animation, toast notifications, and module click audio feedback
- **Collab Page** — Dedicated sidebar page showcasing collaborating clients, with dev credits and links

### Advanced Systems
- **Profile Management** — Sidebar avatar auto-detected by country via IP lookup, custom local image uploads, random preset avatar pool, and instant reset back to country flags
- **Anti-AFK (Advanced)** — Auto-enables after a configurable idle period (5–120 seconds) while inside an active match; includes optional idle chat messages and auto-disable upon activity detection
- **Armor HUD (Advanced)** — Floating and docked modes, adjustable icon/background opacity, fixed/auto-sized icons, and configurable spacing between slots
- **Security** — Optional VPN/proxy detection warning upon menu open with a dismissible preference
- **Cosmetics** — Animated shine sweep on module cards, custom title screen background, and custom browser tab title (`UnverifiedV2`)

## Menu Navigation

The menu is split into five sidebar pages:

| Page | Contents |
|---|---|
| **Modules** | All toggleable modules, favorites, and the search bar |
| **Color** | Accent color picker with hex input and recent colors |
| **Config** | Save and load configuration as a JSON file |
| **Settings** | Sounds, notifications, animation, persistence, UI keybind, VPN warning, Anti-AFK options, Armor HUD appearance and position, Version, Contributors |
| **Collab** | Featured collaboration client (MiniFeather) with Discord and GitHub links |

## Limitations & Disclaimers

- This client modifies a third-party game's front end by injecting scripts and styles. It is not affiliated with or endorsed by Miniblox.
- Modules depend on specific DOM selectors and class names used by Miniblox. Front-end updates to the game may break individual modules until the client is updated.
- VPN and proxy detection relies on a third-party IP lookup service and may produce false positives or negatives.
- The Armor HUD requires `unsafeWindow.spriteMap` and `unsafeWindow.Enchantment` to be present; it will not render outside of an active match. Match detection relies on the URL path containing `/join/`.
- Auto-AFK auto-enable will not trigger while outside of an active match, even if the idle delay has elapsed.
- The What's New popup and Update Checker require a successful network request to GitHub; they will not appear if the request fails or is blocked.
- GitHub's raw file CDN caches for a few minutes, so a newly pushed version may take up to several minutes to be detected.
- The Update button opens the raw script URL, so Tampermonkey's install screen still needs a manual confirmation.
- **Use the client at your own risk. The maintainers will not be responsible for any account actions resulting from its use.**

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for the full version history.

## RoadMap

See [Roadmap.md](./Roadmap.md) for up to date planning that developers will carry out.

## Credits

- [Miniblox](https://miniblox.io) for creating the base game

## Project Information

- **Current Contributors:** wytlines, DeadFish7, andreypidd, jet, joudaALT, TrustIsOver, TheM1ddleM1n
- **Policy: Distributed under a proprietary All Rights Reserved license. Users utilize third-party utility clients at their own discretion.**
- **Contact & Support:**
  - Email: wytlines100 — `rfd6108@gmail.com`
  - Discord: [UnverifiedV2 Discord](https://dsc.gg/unverifiedv2)
