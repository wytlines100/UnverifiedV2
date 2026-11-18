# Changelog

## v4.8
- Removed Color on Color Section
- Increased text size for Accent Color/Recent Colors
- Removed Hex code for color and X for Settings Page
- Added AbortController to draggable modules
- cleanup of MusicPlayer.js, client.js and UV2Testing.js

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
