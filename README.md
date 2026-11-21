# UnverifiedV2

A utility client for [Miniblox](https://miniblox.io), actively developed and maintained since October 2024.

Custom skyboxes, client-side weather and time, a full HUD system with a drag-and-drop layout editor, Lunar-style display mods, chat tools, profiles and a lot more, all inside one clean menu.

## Contents

- [Installation](#installation)
  - [Which method should I use?](#which-method-should-i-use)
  - [Tampermonkey](#tampermonkey-recommended)
  - [Violentmonkey](#violentmonkey)
  - [Browser console](#browser-console-no-extension)
  - [Bookmarklet](#bookmarklet-one-click-no-extension)
- [Getting started](#getting-started)
- [Updating and uninstalling](#updating)
- [Modules](#modules)
- [HUD and layout editor](#hud-and-layout-editor)
- [Skies](#skies)
- [Features](#features)
- [Keybinds](#keybinds)
- [Commands](#commands)
- [Configuration](#configuration)
- [Menu pages](#menu-pages)
- [Music Player](#music-player)
- [Troubleshooting](#troubleshooting)
- [Notes](#notes)
- [Contributors](#contributors)

## Installation

Script link (used by every method below):

```
https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/client.js
```

> [!IMPORTANT]
> UV2 needs a desktop browser and a keyboard. The menu opens with **Right Shift**, so phones and tablets are not supported.

### Which method should I use?

| Method | Runs automatically | Auto-updates | Works on | Best for |
|---|---|---|---|---|
| **Tampermonkey** | Yes | Yes | Chrome, Edge, Brave, Opera, Firefox, Safari | Almost everyone |
| **Violentmonkey** | Yes | Yes | Firefox (and browsers that still allow it) | Firefox users who prefer open source |
| **Browser console** | No, paste it every time | Always loads the newest version | Any desktop browser | Trying UV2 without installing anything |
| **Bookmarklet** | No, click it every time | Always loads the newest version | Any desktop browser | School or work computers where extensions are blocked |

> [!TIP]
> Only use **one** method at a time. Running UV2 twice (for example Tampermonkey plus the console) gives you two menus. The console and bookmarklet loaders skip loading if UV2 is already running.

### Tampermonkey (recommended)

**1. Install Tampermonkey**

| Browser | Link |
|---|---|
| Chrome, Brave, Opera, Vivaldi | [Chrome Web Store](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Microsoft Edge | [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/tampermonkey/) |
| Safari | [App Store](https://apps.apple.com/app/tampermonkey/id1482490089) |

**2. Let it run scripts** (Chrome-based browsers only, Firefox can skip this)

1. Right-click the Tampermonkey icon in your toolbar (pin it from the puzzle-piece menu if you don't see it) and click **Manage extension**.
2. Turn on **Allow User Scripts**.
3. If your browser doesn't have that switch (older Chrome, or Edge), go to `chrome://extensions` (or `edge://extensions`) instead and turn on **Developer mode** in the corner.

**3. Install UV2**

Option A, install from link (keeps auto-updates working):

1. Click the Tampermonkey icon and open the **Dashboard**.
2. Go to the **Utilities** tab.
3. Under **Import from URL**, paste the script link from above and click **Install**.
4. On the page that opens, click **Install** again.

Option B, copy and paste:

1. Open [`client.js`](client.js), click the **Raw** button, then select everything (**Ctrl+A**) and copy (**Ctrl+C**).
2. Click the Tampermonkey icon, open the **Dashboard**, and click the **+** tab.
3. Delete everything in the editor, paste (**Ctrl+V**) and save (**Ctrl+S**).

**4. Play**

1. Go to [miniblox.io](https://miniblox.io), or reload the tab if it's already open.
2. Press **Right Shift** to open the menu.

> [!NOTE]
> The first time some features connect to the internet (sky presets and UV2 badges), Tampermonkey shows a page asking for permission. Click **Always allow domain** so they keep working.

### Violentmonkey

> [!NOTE]
> Violentmonkey has been removed from the Chrome Web Store because Chrome dropped support for older extensions. On Chrome, Brave and Edge, use Tampermonkey. On Firefox, Violentmonkey works great.

1. Install Violentmonkey from [Firefox Add-ons](https://addons.mozilla.org/firefox/addon/violentmonkey/).
2. Click the Violentmonkey icon, then the **gear** (Open Dashboard).
3. Click the **+** button in the top left and choose **Install from URL**.
4. Paste the script link from above and confirm.
5. On the install page, click **Confirm installation** (or **Install**).
6. Go to [miniblox.io](https://miniblox.io), reload, and press **Right Shift**.

If the install page doesn't open, use the copy-and-paste way instead: Dashboard, **+**, **New**, replace everything with the contents of [`client.js`](client.js), then **Save & Close**.

> [!WARNING]
> **Greasemonkey** (the old Firefox one) is not supported. It uses a different scripting API and UV2 will not load. Use Tampermonkey or Violentmonkey.

### Browser console (no extension)

Loads the newest UV2 straight from GitHub into the open tab. Nothing is installed, so you have to do this again every time you reload the page.

1. Open [miniblox.io](https://miniblox.io).
2. Open the developer console:
   - Chrome, Edge, Brave, Opera: **F12** or **Ctrl+Shift+J** (Mac: **Cmd+Option+J**), then the **Console** tab
   - Firefox: **F12** or **Ctrl+Shift+K** (Mac: **Cmd+Option+K**)
3. Paste this and press **Enter**:

```js
(async () => {
  if (window.uv2Loaded || document.getElementById('uv2-main-ui')) return;
  window.uv2Loaded = true;
  const url = 'https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/client.js';
  const code = await (await fetch(url + '?t=' + Date.now())).text();
  const version = (code.match(/@version\s+(\S+)/) || [])[1] || '';
  window.unsafeWindow = window;
  window.GM_info = { script: { name: 'Unverified V2', version } };
  window.GM_xmlhttpRequest = o => {
    const ctrl = new AbortController();
    const timer = o.timeout ? setTimeout(() => ctrl.abort(), o.timeout) : 0;
    fetch(o.url, { method: o.method || 'GET', headers: o.headers, body: o.data, signal: ctrl.signal })
      .then(r => r.text().then(t => { clearTimeout(timer); o.onload && o.onload({ responseText: t, status: r.status }); }))
      .catch(e => { clearTimeout(timer); if (e.name === 'AbortError') o.ontimeout && o.ontimeout(); else o.onerror && o.onerror(e); });
  };
  new Function(code)();
})();
```

4. Close the console and press **Right Shift**.

> [!TIP]
> Chrome may block pasting the first time and ask you to type `allow pasting`. Type it, press Enter, then paste again. Only ever paste code you trust into the console.

### Bookmarklet (one click, no extension)

Same as the console method, but saved as a bookmark so you only need to click it.

1. Show your bookmarks bar (**Ctrl+Shift+B**, Mac: **Cmd+Shift+B**).
2. Right-click the bookmarks bar and choose **Add page** (Chrome, Edge) or **Add Bookmark** (Firefox).
3. Name it `UV2`.
4. In the **URL** box, paste all of this:

```
javascript:(async()=>{if(window.uv2Loaded||document.getElementById('uv2-main-ui'))return;window.uv2Loaded=1;const u='https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/client.js';const c=await(await fetch(u+'?t='+Date.now())).text();window.unsafeWindow=window;window.GM_info={script:{name:'Unverified V2',version:(c.match(/@version\s+(\S+)/)||[])[1]||''}};window.GM_xmlhttpRequest=o=>{const a=new AbortController(),t=o.timeout?setTimeout(()=>a.abort(),o.timeout):0;fetch(o.url,{method:o.method||'GET',headers:o.headers,body:o.data,signal:a.signal}).then(r=>r.text().then(x=>{clearTimeout(t);o.onload&&o.onload({responseText:x,status:r.status})})).catch(e=>{clearTimeout(t);e.name==='AbortError'?o.ontimeout&&o.ontimeout():o.onerror&&o.onerror(e)})};new Function(c)()})();
```

5. Save it.
6. Open [miniblox.io](https://miniblox.io), click the **UV2** bookmark, then press **Right Shift**. Click it again after every reload.

> [!NOTE]
> With the console and bookmarklet methods, the optional VPN warning is skipped, and everything else works the same.

## Getting started

1. Press **Right Shift** to open the menu. The game pauses and your mouse is freed while it's open. Close it with **Right Shift** or **Escape** to jump back in.
2. Click a module to turn it on. Click the **sliders icon** on a module to open its settings in the side panel.
3. Right-click a module to bind a key to it, and click the **star** to pin it to the top.
4. Click **Edit HUD** in the top bar to move and resize your HUD.
5. Open the **Skies** page to pick a skybox (join a match first so skies can load).
6. Change the menu key, layout (big window or side panel) and more on the **Settings** page.

## Updating

- **Tampermonkey / Violentmonkey** check for updates on their own, usually once a day. UV2 also checks GitHub every minute and shows a popup with the changelog when a new version is out.
- To update right away in Tampermonkey: click its icon and choose **Check for userscript updates**. In Violentmonkey, open the Dashboard and click the update icon on UV2.
- **Console / bookmarklet** always load the newest version, so there is nothing to update.

### Uninstalling

- **Tampermonkey / Violentmonkey:** open the Dashboard and click the trash icon next to UV2 (or turn it off with its switch).
- **Console / bookmarklet:** just reload the page. Delete the bookmark if you don't want it any more.
- Your settings stay saved in the browser. To wipe them too, use **Reset All Settings** on the Settings page before uninstalling.

## Modules

Modules are sorted into folders: **Sky**, **World**, **Visuals**, **Chat**, **HUD** and **Utility**. Modules with options have a sliders icon that opens their settings.

### Sky

| Module | Description |
|---|---|
| **Day & Night Skies** | Switches skybox when night falls, then goes back to your sky |
| **Sky Playlist** | Rotates through skyboxes automatically |

### World

| Module | Description |
|---|---|
| **Weather** | Client-side rain, storms and snow using the game's own weather |
| **Lightning** | Random lightning strikes with thunder; bindable strike key |
| **Time Changer** | Locks the time of day or runs a custom day cycle |
| **Sun & Moon** | Resizes and recolors the sun and moon, or uses your own images |
| **Cloud Styler** | Cloud colors, opacity, coverage, height and wind speed |
| **Fog Designer** | Custom fog color and distance |
| **Rain Style** | Rain color, heaviness and fall speed |
| **Shooting Stars** | Shooting stars and meteor showers at night |
| **Aurora** | Animated northern lights in the night sky |
| **Ambient Particles** | Fireflies, dust, petals or snow around you |

### Visuals

| Module | Description |
|---|---|
| **Color Filter** | Recolors the game (Vibrant, Cinematic, Noir, Warm, Cold, Vaporwave, Dreamy) |
| **Block Outline** | Glowing outline on the block you are looking at |
| **Break Color** | Recolors the block break cracks |
| **Kill Effects** | Lightning, firework, hearts or smoke where your opponent dies |
| **Hit Particles** | Particles when you hit someone |
| **Low Health Warning** | Screen edges pulse red when you are low, with an optional heartbeat |
| **UV2 Nametags** | Upside-down verified icon and/or a styled [UV2] tag (gradient, shine, booster, scramble) next to players using Unverified, on nametags, in chat and in the Tab List |
| **Custom Rank & Level** | Any game rank or your own styled tag, and a custom level with the game's real level colors; only you see it |

### Chat

| Module | Description |
|---|---|
| **Mute Chat** | Hides all incoming chat messages |
| **Chat Filter** | Blocks profanity, links and spam; can also hide join/leave messages and custom words |
| **Highlights** | Highlights keywords and your name in chat with a ping |
| **Spam Stacking** | Collapses repeated messages into one with a count |
| **Client Commands** | Local chat commands starting with `.` (see [Commands](#commands)) |
| **Auto GG** | Sends a custom message when a match ends |
| **Chat History** | Searchable recent chat; click a message to copy it |
| **Nickname** | Shows your name as a nickname everywhere on your screen (chat, tab list, scoreboards, your nametag); only you see it |

### HUD

| Module | Description |
|---|---|
| **Keystrokes** | W/A/S/D, mouse buttons with CPS and Space; key size, spacing, pressed color and fade options |
| **Armor HUD** | Armor and held item with icons, durability (percent or number), bars, enchants and a low durability warning; vertical or horizontal |
| **FPS Display** | Frames per second, optionally colored by performance |
| **CPS Display** | Left and right clicks per second |
| **Ping Display** | Your ping, optionally colored and with jitter |
| **Speed Display** | Movement speed in blocks per second or km/h |
| **Coordinates** | XYZ position and facing direction, on one line or stacked |
| **Compass** | Heading bar with degrees |
| **Clock** | Real time with 12/24 hour, seconds and date options |
| **Session Timer** | Time spent in the current server, with the server name |
| **Session Stats** | Kills, deaths, K/D and best combo for the current server |
| **Potion Effects** | Active effects with level and time left; blinks before running out |
| **Item Counter** | Counts chosen items in your inventory (arrows, golden apples, pearls...) |
| **Reach Display** | Distance of your last hit |
| **Combo Counter** | Hits in a row until you get hit or stop hitting |
| **Tab List** | A cleaner player list with heads, ranks, levels and ping bars; replaces the game's list |

### Utility

| Module | Description |
|---|---|
| **Anti-AFK** | Presses keys automatically so you don't get kicked for idling; can turn on by itself after you go idle |
| **Keep Sprint** | Keeps you sprinting while you move forward using the game's own sprint, so it works with any keybinds; optional on-screen status |
| **Ad Blocker** | Skips the video ads between matches and hides banner ads; rewarded ads you choose to watch still work |

Everything is client-side only. Nothing is sent to the game server except your Auto GG message. Nickname, Custom Rank & Level and UV2 badge styles only change what **you** see.

## HUD and layout editor

Every HUD module shares the same style options: size, text color (white, accent, chroma or custom), text shadow, brackets, background and opacity, accent border and rounded corners.

Open the editor with **Edit HUD** in the menu's top bar, **Edit layout** on the HUD folder, or `.hud` in chat:

| Action | What it does |
|---|---|
| **Drag** | Move an element (snaps to the screen edges and center) |
| **Click** | Open that element's settings |
| **Scroll** | Resize |
| **Right-click** | Reset it to its default spot and size |
| **Elements & style** | Turn elements on or off and style all of them at once |
| **Escape / Done** | Close the editor |

When FPS Display, CPS Display, Ping Display, Coordinates or Potion Effects is on, the game's own matching readout is hidden so nothing overlaps. Tab List hides the game's player list the same way.

## Skies

The **Skies** page lets you replace the game's sky with a skybox:

- **Presets:** ready-made skies (Black, Red, Antarctica, Tokyo, Midnight, Moonrise, Anime Night and more)
- **My Skies:** upload your own (six cube faces or one panorama), saved in your browser
- **Capture:** take a 360° skybox of where you're standing
- **Sky Editor:** build a sky from gradients, glow, stars, clouds and a moon
- **Settings:** quality, brightness, rotation, spin, dimming at night, and hiding the sun, moon, stars or clouds

Skies load once you're in a match.

## Features

- Big centered menu window, or a slim side panel (Settings, Menu Layout)
- Modules grouped into collapsible folders with category tabs, live search and an "on" count
- Module settings open in a side panel next to the module list
- Opening the menu in a match frees your mouse; closing it puts you back in the game
- Right-click any module to assign or clear a keybind; configurable menu key (Right Shift, `` ` `` or `\`)
- Star modules to pin them to the top of the list
- Accent color picker with presets, hex input, live preview and recent colors; everything adapts to your color
- Profiles, per-server profiles and share codes on the Config page
- Export and import all settings, module states and keybinds as a JSON file
- Update checker with a changelog popup, plus a full changelog page
- Optional VPN/proxy warning when opening the menu
- Holiday themes: banners, accent colors and chat messages for Halloween, Christmas and New Year's

## Keybinds

| Key | Action |
|---|---|
| **Right Shift** (or `` ` `` / `\`) | Open and close the menu (change it in Settings) |
| **Escape** | Close the menu, a settings panel or the HUD editor; skip the intro |
| **Right-click a module** | Assign or clear a keybind for that module |

Keybinds are saved across reloads and included in your config, profiles and share codes.

## Commands

Client commands need the **Client Commands** module on. They run on your side only and are never sent to chat.

| Command | Description |
|---|---|
| `/info <username>` | Looks up a player's username, rank and level |
| `.help` | Lists client commands |
| `.sky <name\|next\|off\|list>` | Changes the skybox |
| `.weather <server\|clear\|rain\|storm\|snow> [0-100]` | Changes the weather |
| `.time <sunrise\|noon\|sunset\|midnight\|HH:MM\|cycle\|server>` | Changes the time of day |
| `.strike` | Strikes lightning nearby |
| `.profile <name>` | Loads a saved profile |
| `.gg` | Sends your Auto GG message |
| `.hud` | Opens the HUD layout editor |

## Configuration

The **Config** page has three ways to save your setup:

- **Save / Load:** export everything (settings, module states, module options, keybinds and your sky) as a JSON file, or load one back. Configs work across installs.
- **Profiles:** save setups and switch between them with one click. You can link a profile to a server so it loads automatically when you join.
- **Share Codes:** copy your whole setup as a code a friend can paste in.

## Menu pages

| Page | Contents |
|---|---|
| **Modules** | All modules in folders, category tabs, favorites, search |
| **Skies** | Presets, My Skies, sky settings, capture and the sky editor |
| **Color** | Accent color picker, presets, recent colors and a live preview |
| **Config** | Save and load configs, profiles, share codes |
| **Settings** | Sounds, saving modules, menu key, menu layout, pause while open, VPN warning, Anti-AFK |
| **Changelog** | Full version history fetched from GitHub |

## Music Player

UV2 Music Player is a separate script ([`UV2Music.js`](UV2Music.js)) that plays your YouTube playlist while you play. It's not part of the main client. Install it the same way as UV2 with Tampermonkey or Violentmonkey, using this link:

```
https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/UV2Music.js
```

## Troubleshooting

<details>
<summary><b>The menu doesn't open</b></summary>

- Make sure the script is turned on in your Tampermonkey / Violentmonkey dashboard and that you reloaded miniblox.io after installing.
- Chrome-based browsers: turn on **Allow User Scripts** (or **Developer mode**) as described in [Tampermonkey](#tampermonkey-recommended).
- Wait for the intro to finish, or press **Escape** to skip it.
- If you changed the menu key, use that key instead of Right Shift (`` ` `` or `\`).
- If a **VPN warning** pops up, click continue. It only appears with a VPN or proxy and can be turned off in Settings.
</details>

<details>
<summary><b>I see two menus or everything happens twice</b></summary>

UV2 is running twice. Check your dashboard for two copies (for example an old one and a new one), and don't use the console or bookmarklet on top of an installed copy.
</details>

<details>
<summary><b>Skies, badges or the changelog don't load</b></summary>

- Skies only load inside a match.
- If Tampermonkey showed a permission page, click **Always allow domain**. To fix it after the fact, open UV2 in the dashboard, go to its **Settings** tab and remove any blocked domains.
- School or work networks sometimes block GitHub.
</details>

<details>
<summary><b>UV2 badges don't show on my friends</b></summary>

Both of you need UV2 Nametags on, with **Let other players see my badge** turned on. Badges for other players can take up to two minutes to appear.
</details>

<details>
<summary><b>I'm not getting the newest version</b></summary>

Trigger an update from your dashboard (see [Updating](#updating)). If you installed by copy and paste and it still won't update, reinstall with the **Import from URL** / **Install from URL** method.
</details>

<details>
<summary><b>Something broke after a Miniblox update</b></summary>

Modules depend on how Miniblox is built, so a game update can break one. Turn that module off and report it in the [Discord](https://dsc.gg/unverifiedv2).
</details>

## Notes

- **Not affiliated with or endorsed by Miniblox.**
- Modules depend on Miniblox's front-end structure and may break after game updates.
- Auto-AFK will not trigger outside of an active match (`/join/` URL).
- **VPN detection uses a third-party IP lookup and may produce false positives.**
- UV2 Nametags shares your Miniblox username with other UV2 users so they can see your badge. Turn off **Let other players see my badge** to stop that.
- **Use at your own risk. Maintainers are not responsible for any account actions resulting from use.**

## Contributors

wyt, jet, joudaALT, Trust, TheM1ddleM1n

> [!NOTE]
wyt is inactive. And TheM1ddleM1n (known as C0smic) cannot access Discord at all right now.

Distributed under a proprietary All Rights Reserved license — see [LICENSE.md](LICENSE.md) for details — [Discord](https://dsc.gg/unverifiedv2)
