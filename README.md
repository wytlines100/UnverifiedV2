# UnverifiedV2

A custom utility client for [Miniblox](https://miniblox.io), actively developed since October 2024.

## Requirements & Installation

1. Install [Tampermonkey](https://www.tampermonkey.net) for your Chromium-based browser (Chrome, Edge, Brave, etc.).
2. In your browser's extension settings, find Tampermonkey and enable **Allow UserScripts**.
3. Open Tampermonkey and go to the **Dashboard**.
4. Click the **+** tab to create a new script.
5. Delete all existing code in the editor.
6. Copy the entire contents of `client.js` and paste it into the editor.
7. Press **Ctrl+S** to save.
8. Navigate to [miniblox.io](https://miniblox.io) or reload it if already open.
9. Press **Right Shift** to open the UV2 menu.

> If the menu does not appear, ensure Tampermonkey is enabled and the script is active in the dashboard.

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

## Features

- Right-click any module to assign or clear a keybind; configurable UI open keybind (Right Shift, `` ` ``, or `\`)
- Star modules to pin them to the top of the list; persisted across reloads
- Real-time module search by name or description
- Accent color picker with hex input and recent-color history
- Export and import all settings, module states, and keybinds as a JSON file
- Update checker comparing installed version against GitHub every minute with a changelog popup
- Full changelog timeline fetched from GitHub on the Changelog sidebar page
- Optional VPN/proxy detection warning on menu open
- UI open/close animation, toast notifications, and module click audio feedback
- Holiday system: themed banners, accent colors, and chat messages for Halloween, Christmas, and New Year's

## Keybinds

- Press **Right Shift**, `` ` ``, or `\` to open and close the menu; configurable in Settings
- Right-click any module to assign or clear a keybind for toggling it from anywhere
- Keybinds are saved across reloads and exported with your config

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

wyt, jet, joudaALT, Trust, TheM1ddleM1n

> [!NOTE]
wyt is inactive. And TheM1ddleM1n (known as C0smic) cannot access discord at the moment.

Distributed under a proprietary All Rights Reserved license — see [LICENSE.md](LICENSE.md) for details — [Discord](https://dsc.gg/unverifiedv2)
