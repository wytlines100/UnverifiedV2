# Changelog

## v5.1
- Added Hearts & Hunger: Minecraft-style hearts on the left of your hotbar and hunger on the right, snapped right above it, with smooth or pixel icons, your own colors and gradients for hearts, hunger, absorption, armor and saturation, glow, outlines, presets (Classic, Neon, Ice, Toxic, Void), armor points, gold absorption hearts, low-health shake, a damage flash and a regen wave; it hides while the pause menu or inventory is open, and the game's own health and hunger bars hide while it's on
- Added Hotbar Customizer: restyle the hotbar with themes (Clean, Glass, Neon, Gradient, Rainbow, Minimal) or your own background, gradient, border, glow, blur, rounded corners, slot colors and spacing, slot numbers, and a selected slot with glow, fill, outline or underline styles, gradients, an animated rainbow ring, lift and enlarge
- Added Scoreboard: every line of the game's match scoreboard, live from the server, but you can move, resize and restyle it (custom title, value alignment, spacing, classic red line numbers); the game's own scoreboard hides while it's on
- Added Skins & Capes: wear any of the game's 56 skins or 16 capes, even ones you don't own, or upload your own PNG. It shows on your player, your first-person hand, your home avatar, your profile and the Dressing Room (previewing other skins there still works), and stays after a reload. Only you see it
- Custom Rank & Level can now spoof your coins, daily streak and lootboxes, and shows your custom rank and level all over the menus: home card, profile, Dressing Room, Lootboxes panel and opener, Daily Hub and your shop balance. Just for looks: buying and opening still use your real balance
- Custom Rank & Level can also show your rank and level on the game's own tab list
- Session Stats now uses the match scoreboard's kill and death counts when there are any, and otherwise counts players you hit who die
- Saved modules now turn back on within a couple of seconds on the home screen instead of waiting for you to join a match
- Modules no longer wait for the sky presets to download before starting

## v5.0
- New menu design: big centered window with tabs on top, or a side panel (Settings > Menu Layout)
- New font, plus buttons, toggles and sliders that stay readable with any accent color
- Modules are grouped into folders you can collapse, with category tabs, search and an on count
- Module settings open in a side panel next to the module list
- Opening the menu in a match frees your mouse, and closing it puts you back in the game
- Press Escape or click outside the menu to close it
- Added the Skies page: presets, your own skies, uploads, sky capture and a sky editor
- Added Weather, Lightning, Time Changer, Sun & Moon, Cloud Styler, Fog Designer, Rain Style, Shooting Stars, Aurora and Ambient Particles
- Added Day & Night Skies and Sky Playlist, which keep your chosen sky
- Added Color Filter, Block Outline, Break Color, Kill Effects, Hit Particles and Low Health Warning
- Added Highlights, Spam Stacking, Client Commands, Auto GG, Chat History and Nickname
- Added UV2 Nametags: an icon or styled [UV2] tag next to other Unverified users on nametags, in chat and in the Tab List
- Added Custom Rank & Level: any game rank or your own styled tag, plus a level changer with the game's real level colors
- Added Tab List: a cleaner player list with heads, ranks, levels and ping bars
- Added Ad Blocker: skips the ads between matches and hides banner ads
- New HUD system: size, text color, chroma, shadow, background, border and corner options for every element
- Added the HUD editor (Edit HUD button): drag, resize and snap elements, click one for its settings, or style them all at once
- Added FPS, CPS, Ping, Speed, Coordinates, Compass, Potion Effects, Item Counter, Reach, Combo Counter, Session Timer and Session Stats
- Rebuilt Keystrokes, Armor HUD and Clock with a lot more options
- The game's own FPS, ping, coordinates, CPS, potion and player list displays hide when the client's version is on
- Rebuilt Keep Sprint: uses the game's own sprint, works with any keybinds and no longer opens the menu
- Config page: profiles, per-server profiles and share codes; configs now save module settings and your sky
- Fixed module keybinds not saving after a reload and triggering while typing in chat
- Fixed the menu font not loading
- Click or press Escape to skip the intro

## v4.9
- Wrapped playIntro in DOMContentLoaded to ensure body exists before mounting
- Blocked toggleUI until intro finishes to prevent UI opening during intro
- Improved UI open/close animation smoothness and performance
- Reduced animation scale delta for subtler motion
- Added will-change to UI element for GPU layer promotion
- Reduced close animation duration to 150ms
- Fixed uiAnimating guard set before timeout instead of inside it
- Removed forced reflow from openUI

## v4.8
- Removed Color on Color Section
- Increased text size for Accent Color/Recent Colors
- Removed Hex code for color and X for Settings Page
- Added AbortController to draggable modules
- Renamed UnverifedV2-Testing.js to UV2-Testing.js
- Refactored Keystrokes, Anti-AFK, Clock, and Armor HUD to use AbortController for listener cleanup
- Simplified Keystrokes key/mouse handling to use lookup maps
- Simplified Keystrokes drag boundary clamping

## v4.7
- Simplified armorHudRender by merging docked/floating branches
- Simplified dock button toggle logic
- Simplified drag boundary clamping
- Removed Cancel button from keybind modal (Escape or click outside to dismiss)
- Extracted button builder helper in showBindPopup
- Added Escape key support to dismiss keybind modal
- Added mrdaddycat to contributors
- Refactored buildContributorsGrid to use a single card builder function
- Flattened contributor color objects into top-level properties
- Clear chat filter spam cache on module disable

## v4.6
- Removed April Fools holiday event
- Improved UI open/close animation smoothness
- closeUI no longer resets to main page on reopen
- Fixed bind bar persisting when reopening the menu mid-bind
- Added right-click hint text to module page
- Simplified config file name format
- Reduced build size from 137KB to 130KB

## v4.5
- Replaced bind popup with a centered modal with live key display
- Added inline keybind pill on each module showing the bound key
- Keybind pills persist through favorite sorting and config load
- Fixed favorite section labels showing when all or no modules are favorited
- Locked accent color to orange on Halloween and red on Christmas
- Notification overhaul
- Replaced UnverifiedIntro class with a plain function

## v4.4
- Added holiday system with themed banners, accent colors, and match join chat messages
- Halloween: forced accent #ff6600, banner, chat message
- Christmas (Dec 20-26): forced accent #cc0000, banner, chat message
- New Year's: banner, live countdown, confetti burst at midnight, toast, chat message
- Fixed armor enchantments capping at V instead of X

## v4.3
- Removed Fullscreen module

## v4.2
- Fixed keybind intro display
- Fixed Armor HUD settings not resetting
- Improved animations and performance

## v4.1
- Added module toggle press animation
- Improved notification animations
- Notifications now inherit accent color for border and progress bar

## v4
- AFK music that fades in on auto-enable and fades out on return
- Added AFK music toggle in Settings
- Updated minimum idle delay to 10 seconds
- Keep Sprint now triggers on arrow keys and dispatches Right Shift

## v3.8
- Merged Save and Load config buttons side by side

## v3.7
- Welcome message now only appears when joining a match
- Fixed Anti-AFK style element leaking on each enable

## v3.6
- Intro now displays the active UI keybind

## v3.4
- Link blocking in Chat Filter
- Changelog sidebar page
- /info command

## v3.2
- Update checker comparing installed version against GitHub every minute
- Added @downloadURL and @updateURL to userscript header

## v3.1
- Added profanity filter

## v3
- Added duplicate keybind conflict notification

## v2.7
- Added UI keybind setting
- Added What's New popup shown once per version
- Fixed draggable module bounding boxes

## v2.2
- Added Armor HUD with floating and docked modes
- Added Chat Filter with profanity and spam detection

## v2.1.0
- Added Settings panel, Anti-AFK, VPN detection warning, config save/load
