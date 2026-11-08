# UnverifiedV2

A custom utility client for [Miniblox](https://miniblox.io), actively developed since October 2024.

## Requirements

- Chromium-based browser
- [Tampermonkey](https://www.tampermonkey.net) with **Allow UserScripts** enabled

## Installation

1. Install Tampermonkey and enable **Allow UserScripts** in Chromium Settings.
2. Open the Tampermonkey dashboard and create a new script.
3. Paste the contents of `client.js` into the editor and save.
4. Navigate to or reload `miniblox.io`.
5. Press **Right Shift** (default), `` ` ``, or `\` to open the menu.

## Modules

| Module | Description |
|---|---|
| **Keystrokes** | Draggable overlay showing W/A/S/D, LMB, RMB, and Space inputs in real time |
| **Mute Chat** | Suppresses all incoming chat messages |
| **Chat Filter** | Blocks profanity, links, and spam from chat; also filters outgoing messages |
| **Anti-AFK** | Cycles key presses automatically to prevent idle kick; draggable status indicator |
| **Keep Sprint** | Dispatches Shift alongside movement keys to maintain sprint |
| **Clock** | Draggable live clock overlay |
| **Armor HUD** | Draggable overlay showing armor durability, enchantments, and icons; floating or docked |

## Keybinds

- Press **Right Shift**, `` ` ``, or `\` to open and close the menu; configurable in Settings.
- Right-click any module to assign or clear a keybind for toggling it from anywhere.
- Keybinds are saved across reloads and exported with your config.

## Commands

| Command | Description |
|---|---|
| `/info <username>` | Looks up a player's username, rank, and level |

## Configuration

Use the **Config** page to export all settings, module states, and keybinds as a JSON file, or import a previously saved config. Configs are versioned and portable across installs.

## Music Player

UV2 Music Player is a separate script (`MusicPlayer.js`) installable independently via Tampermonkey. It is not bundled with the main client.

## Menu Pages

| Page | Contents |
|---|---|
| **Modules** | All toggleable modules, favorites, search bar |
| **Color** | Accent color picker with hex input and recent colors |
| **Config** | Save and load configuration as a JSON file |
| **Settings** | Sounds, persistence, UI keybind, VPN warning, Anti-AFK, Armor HUD options |
| **Changelog** | Full version history fetched from GitHub |

## Notes

- Not affiliated with or endorsed by Miniblox.
- Modules depend on Miniblox's front-end structure and may break after game updates.
- Armor HUD requires `unsafeWindow.spriteMap` and `unsafeWindow.Enchantment`; only active in a match.
- Auto-AFK will not trigger outside of an active match (`/join/` URL).
- VPN detection uses a third-party IP lookup and may produce false positives.
- **Use at your own risk. Maintainers are not responsible for any account actions resulting from use.**

## Contributors

wytlines, jet, joudaALT, Trust, TheM1ddleM1n

Distributed under a proprietary All Rights Reserved license — [Discord](https://dsc.gg/unverifiedv2)
