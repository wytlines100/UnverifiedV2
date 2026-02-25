// ==UserScript==
// @name         UnverifiedV2
// @namespace    http://tampermonkey.net/
// @version      2.34
// @description  Look at my license before you modify, I WILL DMCA you.
// @icon         https://raw.githubusercontent.com/wytlines100/UnverifiedV2/refs/heads/main/logo.jpg
// @license      Proprietary License
// @author       wytlines, DeadFish7, andreypidd, jet, joudaALT!
// @match        https://miniblox.io/*
// @match        https://miniblox.org/*
// @match        https://miniblox.com/*
// @match        https://blockcraft.io/*
// @grant        none
// ==/UserScript==



class LurkerChecker {
  static lurkerInstalled() {
	  return document.getElementById('_L7Banner') !== null;
	}
}
class UnverifiedIntro {
	constructor() {

		this.container = document.createElement("div");
		Object.assign(this.container.style, {
			position: "fixed",
			top: 0, left: 0, width: "100vw", height: "100vh",
			display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
			backgroundColor: "black",
			overflow: "hidden", zIndex: 9999,
		});

		this.check = document.createElement("div");
		this.check.textContent = "✓";
		Object.assign(this.check.style, {
			color: "red", fontSize: "5rem", opacity: 0.05,
			transition: "opacity 1s ease, transform 1s ease",
			textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
		});

		this.circle = document.createElement("div");
		Object.assign(this.circle.style, {
			width: "100px",
			height: "100px",
			backgroundColor: "black",
			border: "2px solid red",
			borderRadius: "50%",
			boxShadow: "0 0 10px red, 0 0 20px red, 0 0 30px red",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			opacity: 0,
			transition: "opacity 1s ease, transform 1s ease",
		});
		this.circle.appendChild(this.check);
		this.container.appendChild(this.circle);

		this.unverifiedText = document.createElement("div");
		this.unverifiedText.textContent = "UnverifiedV2";
		Object.assign(this.unverifiedText.style, {
			color: "red", fontSize: "60px", opacity: 0,
			marginTop: "50px",
			transition: "opacity 0.8s ease",
			textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
		});
		this.container.appendChild(this.unverifiedText);

		this.creditsText = document.createElement("div");
		this.creditsText.textContent = "\nBy wytlines, DeadFish7\nandreypidd, jet, joudaALT!";
		Object.assign(this.creditsText.style, {
			color: "red", fontSize: "30px", opacity: 0, transition: "opacity 0.8s ease",
			whiteSpace: 'pre-line',
			textAlign: "center",
			textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
		});
		this.container.appendChild(this.creditsText);
	}
  playIntro() {
		document.body.appendChild(this.container);

		this.circle.style.opacity = 1;
		this.check.style.opacity = 1;

		setTimeout(() => {
			this.check.style.transform = "rotate(180deg)";
		}, 500);

		setTimeout(() => {
			if (LurkerChecker.lurkerInstalled()) {
				this.unverifiedText.textContent = 'UnverifiedV2 x Lurker';
				document.title = 'UnverifiedV2 x Lurker';
			}
			this.unverifiedText.style.opacity = 1;
		}, 1000);

		setTimeout(() => {
			this.creditsText.style.opacity = 1;
		}, 1500);

		setTimeout(() => {
			this.container.style.transition = "opacity 1s ease";
			this.container.style.opacity = 0;
		}, 2500);

		setTimeout(() => {
			this.container.remove();
		}, 3000);
	}
	showInitializedNotif() {
    const initializedNotification = document.createElement("div");
    initializedNotification.classList.add('initialized-notification');
    initializedNotification.textContent = "UnverifiedV2 Initialized";
    document.body.appendChild(initializedNotification);
    setTimeout(() => {
        initializedNotification.style.top = "10px";
        initializedNotification.style.opacity = "1";
    }, 10);
    setTimeout(() => {
        initializedNotification.style.top = "-50px";
        initializedNotification.style.opacity = "0";
    }, 2000);
		setTimeout(() => {
				initializedNotification.remove();
		}, 3000);
	}
}

     (function() {
    'use strict';

    const gameRef = {
        _game: null,
        get game() {
            if (this._game) return this._game;

            const reactRoot = document.querySelector("#react");
            if (!reactRoot) return null;

            try {
                const fiber = Object.values(reactRoot)[0];
                const game = fiber?.updateQueue?.baseState?.element?.props?.game;
                if (game) this._game = game;
                return game;
            } catch (e) {
                console.warn("[UnverifiedV2] Failed to get game object:", e);
                return null;
            }
        }
    };

    const waitForGame = setInterval(() => {
        const game = gameRef.game;
        if (game && game.chat && typeof game.chat.addChat === "function") {
            clearInterval(waitForGame);

            game.chat.addChat({
                text: "\\#00FFFF\\[UnverifiedV2]\\reset\\ Hello, Thank You For Using The Unverified Client."
            });

            console.log("[UnverifiedV2] Sent Welcome Message");
        }
    }, 500);

})();

class UnverifiedStyler {
	constructor() {
		this.observer = null;
		this.background = new UnverifiedBackground();
		this.banner = new UnverifiedBanner();
		this.shortcutMenu = new UnverifiedShortcutMenu();

		this.visuallyRemoveSelectors = [
			'.chakra-image.css-1je8qb9',
			'.chakra-stack.css-7kkhgi',
		];
		this.backgroundSelectors = [
			'img.chakra-image.css-rkihvp',
			'img.chakra-image.css-mohuzh',
			'.css-aznra0',
		];
		this.generalStylingSelectors = new Set([
			'.chakra-button.css-cuh8pi',
			'.chakra-button.css-32lhf4',
			'.chakra-button.css-5ov7ui',
			'.chakra-button.css-18wnugv',
			'.chakra-button.css-he6upe',
			'.chakra-button.css-1oxqv3t',
			'.chakra-button.css-1dkorm4',
			'.css-10y588r',
			'button.chakra-button.css-livqej',
			'button.chakra-button.css-1jg2qv0',
			'div.css-aidfhd',
			'div.css-1kd330l',
			'button.chakra-button.css-14mkusw',
			'button.chakra-button.css-8q1apo',
			'.css-1a6laq6',
			'button.chakra-button.css-1axaj8o',
			'button.chakra-button.css-xircll',
			'.css-1xy2x8',
			'.css-i1x0qw',
			'.css-jnnvp4',
			'.css-hk5viu',
			'.css-55x3n6',
			'.css-n15lby',
			'.css-1xqsddr',
			'.css-1ibhl1y',
			'.chakra-stack.css-1c10cfa',
			'.chakra-form-control.css-1kxonj9',
			'.chakra-button.css-1dcrejx',
			'.chakra-button.css-1ote1yx',
			'.css-qkv95g',
			'.css-1r8eeg2',
			'.chakra-input.css-18whhxd',
			'.chakra-input.css-ypk59i',
			'.chakra-input.css-1oc9k70',
			'.css-nizmkx',
			'.css-r7134l',
			'.css-qzh2oi',
			'.chakra-button.css-137k3gn',
			'.chakra-button.css-1n378o7',
			'.css-1f34n7d',
			'.css-tncl4j',
			'.css-1tyymsb',
			'.css-ol7umz',
			'.chakra-button.css-12t4nq4',
		]);
		this.specificStylingSelectors = new Map([
			['button.chakra-button.css-1axaj8o', e => { e.style.fontSize = '24px'; e.style.padding = '1px 1px' }],
			['.chakra-button.css-cuh8pi', e => { e.style.fontSize = '20px' }],
			['.css-1xy2x8', e => { e.style.border = '2px solid purple'; e.style.padding = '0 10px' }],
			['.css-i1x0qw', e => { e.style.border = '2px solid green'; e.style.padding = '0 10px' }],
			['.css-jnnvp4', e => { e.style.border = '2px solid yellow'; e.style.padding = '0 10px' }],
			['.css-hk5viu', e => { e.style.border = '2px solid gray'; e.style.padding = '0 10px' }],
			['.css-qzh2oi', e => { e.style.border = '2px solid white' }],
			['.chakra-button.css-1iuk66d', e => { e.style.border = '1px solid white'; e.style.borderRadius = '12px' }],
			['.chakra-button.css-73nw7g', e => { e.style.border = '1px solid white'; e.style.borderRadius = '12px' }],
			['.css-55x3n6', e => { e.style.border = '2px solid white'; e.style.padding = '0 10px' }],
			['.css-n15lby', e => { e.style.border = '2px solid lime'; e.style.padding = '0 10px' }],
			['.css-1xqsddr', e => { e.style.border = '2px solid pink'; e.style.padding = '0 10px' }],
			['.css-1ibhl1y', e => { e.style.border = '2px solid orange'; e.style.padding = '0 10px' }],
			['.chakra-input.css-ypk59i', e => { e.style.border = 'none'; e.style.background = 'none'; }],
			['.chakra-input.css-1oc9k70', e => { e.style.border = 'none'; e.style.background = 'none'; }],
			['.chakra-input.css-18whhxd', e => { e.style.border = 'none'; e.style.background = 'none'; }],
			['.css-nizmkx', e => { e.style.padding = '0 0' }],
			['.chakra-slider', e => { e.style.padding = '0 0'; e.style.borderRadius = '12px' }],
			['.css-1a6laq6', e => { e.style.padding = '0 0' }],
			['.chakra-slider__filled-track.css-li9pez', e => { e.style.borderRadius = '12px' }],
		]);
		this.blackBackgroundSelectors = [
			'.chakra-stack.css-1cklnv0',
			'.chakra-stack.css-oou8ol',
			'.chakra-stack.css-owjkmg',
			'.chakra-stack.css-15uwvcw',
			'.chakra-stack.css-1hj4r72',
			'.chakra-stack.css-10tqh5h',
			'.chakra-stack.css-wv1k6p',
			'.chakra-stack.css-b1sb84',
			'.chakra-stack.css-b1sb84',
			'.chakra-modal__content.css-1n1g7m4',
			'.chakra-modal__content.css-1ah3qhl',
			'.chakra-modal__content.css-1yhxaze',
		];
		this.skipMouseInOutListeners = new Set([
			'.chakra-input.css-ypk59i',
			'.chakra-input.css-1oc9k70',
			'.chakra-input.css-18whhxd',
		]);
	}
	visuallyRemove(e) {

	  if (!e) {
		  return;
		}
		e.style.opacity = 0;
		e.style.zIndex = -1;
	}
	isMainScreen() {
		return this.shortcutMenu.getPlayButton() !== null;
	}
	addStyleObserver() {
		document.title = 'UnverifiedV2';
		this.observer = new MutationObserver(mutations => {
			for (const mutation of mutations) {
				for (const node of mutation.addedNodes) {
					if (node.nodeType !== Node.ELEMENT_NODE) continue;

					for (const selector of this.visuallyRemoveSelectors) {
						if (node.matches(selector)) {
							this.visuallyRemove(node);
						}
						node.querySelectorAll(selector).forEach(e => {
							this.visuallyRemove(node);
						});
					}

					for (const selector of this.backgroundSelectors) {
						if (node.matches(selector)) {
							this.background.setBG(node);
						}
						node.querySelectorAll(selector).forEach(e => {
							this.background.setBG();
						});
					}

					for (const selector of this.generalStylingSelectors) {
						if (node.matches(selector)) {
							this.applyGeneralStyle(node, selector);
						}
						node.querySelectorAll(selector).forEach(e => {
							this.applyGeneralStyle(e, selector);
						});
					}

					for (const selector of this.specificStylingSelectors.keys()) {
						if (node.matches(selector)) {
							this.applySpecificStyle(node, selector);
						}
						node.querySelectorAll(selector).forEach(e => {
							this.applySpecificStyle(e, selector);
						});
					}

					if (this.isMainScreen()) {
						this.shortcutMenu.addShortcutMenu();
						this.banner.addBanner();
					} else {
						this.shortcutMenu.removeShortcutMenu();
						this.banner.removeBanner();
					}

					for (const selector of this.blackBackgroundSelectors) {
						if (node.matches(selector)) {
							this.removeBlackBackground(node);
						}
						node.querySelectorAll(selector).forEach(e => {
							this.removeBlackBackground(e);
						});
					}
				}
			}
		});
		this.observer.observe(document.body, { childList: true, subtree: true });
	}
	initialTriggerStyleObserver() {

	  this.shortcutMenu.getPlayButton().click();
		setTimeout(() => {
			this.shortcutMenu.getExitButton().click();
		}, 70)
	}
	applyGeneralStyle(e, selector) {

		e.style.padding = '10px 20px';
		e.style.backgroundColor = (!e.unverifiedMouseIn) ? 'rgba(211, 211, 211, 0.4)' : 'rgba(185, 185, 185, 0.4)';
		e.style.color = 'white';
		e.style.border = '1px solid #D3D3D3';
		e.style.borderRadius = '12px';
		e.style.fontSize = '16px';
		e.style.cursor = 'pointer';
		e.style.transition = 'transform 0.2s ease';
		e.style.outline = 'none';
		e.style.boxShadow = 'none';
		if (!this.skipMouseInOutListeners.has(selector)) {
			e.addEventListener('mouseover', () => {
				e.unverifiedMouseIn = true;
				e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
			});
			e.addEventListener('mouseout', () => {
				e.unverifiedMouseIn = false;
				e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
			});
		}
	}
	applySpecificStyle(e, selector) {
		this.specificStylingSelectors.get(selector)(e);
	}
	removeBlackBackground(e) {
		e.style.background = 'transparent';
		e.style.backgroundColor = 'none';
		e.style.boxShadow = 'none';
		if (!e.textContent.startsWith('Browse')) {
			e.style.backdropFilter = 'blur(1px)';
			e.style.webkitBackdropFilter = 'blur(1px)';
		}
	}
}


class UnverifiedBackground {
  constructor() {
		this.bgObserver = null;
		this.bg1 = "https://w0.peakpx.com/wallpaper/810/395/HD-wallpaper-landscape-minecraft-shaders-minecraft.jpg";
		this.currentBG = this.bg1;
	}
	setBG(e) {
	  e.src = this.currentBG;
	}
}


class UnverifiedBanner {
  constructor() {
		this.e = document.createElement('div');
		this.e.textContent = 'UnverifiedV2\n\nBy wytlines, DeadFish7, andreypidd, jet, joudaALT!'
		this.e.id = 'unverified-banner';
		this.e.style.whiteSpace = 'pre-line';
		this.e.style.textAlign = 'center';
		this.e.style.zIndex = 999;
		this.e.style.position = "absolute";
		this.e.style.top = "11.5%";
		this.e.style.left = "50%";
		this.e.style.transform = "translate(-50%, -50%)";
		this.e.style.padding = '10px 20px';
		this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
		this.e.style.color = 'white';
		this.e.style.border = '1px solid #D3D3D3';
		this.e.style.borderRadius = '12px';
		this.e.style.fontSize = '24px';
		this.e.style.cursor = 'pointer';
		this.e.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
		this.e.style.outline = 'none';
		this.e.style.boxShadow = 'none';
		this.e.addEventListener('mouseover', () => {
			this.e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
			this.e.style.transform = 'translate(-50%, -50%), scale(1.01)';
			this.e.style.top = "11.5%";
			this.e.style.left = "50%";
		});
		this.e.addEventListener('mouseout', () => {
			this.e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
			this.e.style.transform = 'translate(-50%, -50%), scale(1)';
			this.e.style.top = "11.5%";
			this.e.style.left = "50%";
		});
		this.shown = false;
	}
	addBanner() {
		if (!this.shown) {
			document.body.appendChild(this.e);
		  this.shown = true;
		}
	}
	removeBanner() {
		if (this.shown) {
			this.shown = false;
			this.e.remove();
		}
	}
}


class UnverifiedShortcutMenu {
	constructor() {
		this.onclicks = [
			() => {
				this.getPlayButton().click();
				setTimeout(() => this.getKitPVPButton().click(), 70);
				document.body.removeChild(this.container);
			},
			() => {
				this.getPlayButton().click();
				setTimeout(() => this.getSkywarsButton().click(), 70);
				document.body.removeChild(this.container);
			},
			() => {
				this.getPlayButton().click();
				setTimeout(() => this.getDoublesButton().click(), 70);
				document.body.removeChild(this.container);
			},
			() => {
				this.getPlayButton().click();
				setTimeout(() => this.getQuadsButton().click(), 70);
				document.body.removeChild(this.container);
			},
			() => {
				this.getPlayButton().click();
				setTimeout(() => this.getClassicPVPButton().click(), 70);
				document.body.removeChild(this.container);
			},
		];
		this.container = document.createElement("div");
		Object.assign(this.container.style, {
			position: "absolute",
			top: "76%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			padding: "20px",
			borderRadius: "12px",
			display: "flex",
			flexDirection: "row",
			gap: "10px",
			alignItems: "center",
			zIndex: "99"
		});
		let i = 0; ["KitPVP", "Skywars", "Doubles", "Quads", "ClassicPVP"].forEach(label => {
			const button = document.createElement("button");
			button.textContent = label;
			button.style.padding = '8px 16px';
			button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
			button.style.color = 'white';
			button.style.border = '1px solid #D3D3D3';
			button.style.borderRadius = '6px';
			button.style.fontSize = '16px';
			button.style.cursor = 'pointer';
			button.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
			button.style.outline = 'none';
			button.style.boxShadow = 'none';
			button.addEventListener('focus', () => {
				button.style.outline = '2px solid #B0B0B0';
				button.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
			});
			button.addEventListener('blur', () => {
				button.style.outline = 'none';
				button.style.boxShadow = 'none';
			});
			button.addEventListener('mouseover', () => {
				button.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
				button.style.transform = 'scale(1.01)';
			});
			button.addEventListener('mouseout', () => {
				button.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
				button.style.transform = 'scale(1)';
			});
			button.addEventListener('mousedown', () => {
				button.style.outline = '2px solid #B0B0B0';
				button.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
			});
			button.addEventListener('mouseup', () => {
				button.style.outline = '2px solid #B0B0B0';
				button.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
			});
			button.addEventListener('click', this.onclicks[i++]);
			this.container.appendChild(button);
		});
		this.shown = false;
	}
	getPlayButton() {
		return document.querySelector('.chakra-button.css-cuh8pi');
	}
	getExitButton() {

		return document.querySelectorAll('.chakra-button.css-1axaj8o')[1];
	}
	getKitPVPButton() {
		return document.querySelector('.css-1idq8wm');
	}
	getSkywarsButton() {
		return document.querySelector('.css-rsqc3q');
	}
	getDoublesButton() {
		return document.querySelector('.css-6umr0e');
	}
	getQuadsButton() {
		return document.querySelector('.css-sbvzy');
	}
	getClassicPVPButton() {
		return document.querySelector('.css-1w536sc');
	}
	addShortcutMenu() {
		if (!this.shown) {
			this.shown = true;
			document.body.appendChild(this.container);
		}
	}
	removeShortcutMenu() {
		if (this.shown) {
			this.shown = false;
			document.body.removeChild(this.container);
		}
	}
}


(function() {
    'use strict';

		const intro = new UnverifiedIntro();
		intro.playIntro();
		intro.showInitializedNotif();


		const styler = new UnverifiedStyler();
		styler.addStyleObserver();
		try {
			styler.initialTriggerStyleObserver();
		} catch (e) {

		}


    const style = document.createElement('style');
    style.innerHTML = `
        @font-face {
            font-family: 'MinibloxFont';
            src: url('https://cdn.glitch.global/adb12490-d563-43cb-9711-2a69a8bb1c06/Faithful.ttf?v=1735593093308') format('truetype');
            font-weight: normal;
            font-style: normal;
        }
        .bind-popup {
            position: absolute;
            background-color: #2c3e50;
            color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.7);
            z-index: 10001;
            font-family: 'MinibloxFont', sans-serif;
            display: none;
            text-align: center;
        }
        .bind-popup input {
            background-color: #34495e;
            color: white;
            border: 2px solid #e74c3c;
            border-radius: 5px;
            padding: 10px;
            font-size: 18px;
            width: 200px;
        }
        .bind-popup button {
            background-color: #e74c3c;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            margin-top: 10px;
            cursor: pointer;
        }
        .bind-popup button:hover {
            background-color: #c0392b;
        }
        .module-tooltip {
            visibility: hidden;
            position: absolute;
            background-color: #2c3e50;
            color: white;
            padding: 5px 10px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .module-container:hover .module-tooltip {
            visibility: visible;
            opacity: 1;
        }
        .initialized-notification {
            font-family: 'MinibloxFont', sans-serif;
            font-size: 20px;
            color: #e74c3c;
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            padding: 10px 20px;
            background-color: black;
						border: 1px solid white;
            border-radius: 10px;
            z-index: 10000;
            opacity: 0;
            transition: top 1s ease, opacity 1s ease;
        }
        .other-notification {
            font-family: 'MinibloxFont', sans-serif;
            font-size: 16px;
            color: #e74c3c;
            background-color: black;
            padding: 10px 20px;
						border: 1px solid white;
            border-radius: 10px;
            margin-bottom: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            transition: opacity 0.5s ease, transform 0.5s ease;
            opacity: 0;
            transform: translateX(100%);
        }
        .settings-icon {
            width: 30px;
            height: 30px;
            fill: white;
            transition: transform 0.3s ease;
        }
        .settings-icon:hover {
            transform: rotate(90deg);
        }
        #ct-name:focus, #ct-bg:focus {
            border-color: #e74c3c !important;
            outline: none !important;
        }
        #ct-save:hover { background: #27ae60 !important; }
        #ct-cancel:hover { background: #444 !important; }
    `;
    document.head.appendChild(style);

    const ui = document.createElement("div");
    ui.style.position = "fixed";
    ui.style.top = "50%";
    ui.style.left = "50%";
    ui.style.transform = "translate(-50%, -50%)";
    ui.style.backgroundColor = "#1a1a1a";
    ui.style.color = "white";
    ui.style.padding = "28px";
    ui.style.borderRadius = "15px";
    ui.style.display = "none";
    ui.style.zIndex = "9999";
    ui.style.textAlign = "center";
    ui.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
    ui.style.fontFamily = 'MinibloxFont, sans-serif';
    ui.style.maxHeight = "90vh";
    ui.style.maxWidth = "90vw";
    ui.style.overflowY = "auto";
    ui.style.overflowX = "hidden";
    document.body.appendChild(ui);

    document.addEventListener('fullscreenchange', () => {
        if (document.fullscreenElement) {
            ui.style.maxHeight = "95vh";
            ui.style.padding = "22px";
        } else {
            ui.style.maxHeight = "90vh";
            ui.style.padding = "28px";
        }
    });

    document.addEventListener('webkitfullscreenchange', () => {
        if (document.webkitFullscreenElement) {
            ui.style.maxHeight = "95vh";
            ui.style.padding = "22px";
        } else {
            ui.style.maxHeight = "90vh";
            ui.style.padding = "28px";
        }
    });

    document.addEventListener('mozfullscreenchange', () => {
        if (document.mozFullScreenElement) {
            ui.style.maxHeight = "95vh";
            ui.style.padding = "22px";
        } else {
            ui.style.maxHeight = "90vh";
            ui.style.padding = "28px";
        }
    });

    const title = document.createElement("h2");
    title.textContent = "UnverifiedV2";
    title.style.fontSize = "34px";
    title.style.color = "#e74c3c";
    title.style.fontFamily = 'MinibloxFont, sans-serif';
    title.style.marginTop = "0";
    title.style.marginBottom = "15px";
    ui.appendChild(title);

    const languageDropdown = document.createElement("select");
    languageDropdown.style.position = "absolute";
    languageDropdown.style.top = "20px";
    languageDropdown.style.right = "20px";
    languageDropdown.style.backgroundColor = "#e74c3c";
    languageDropdown.style.color = "white";
    languageDropdown.style.border = "none";
    languageDropdown.style.borderRadius = "5px";
    languageDropdown.style.padding = "10px 15px";
    languageDropdown.style.fontSize = "16px";
    languageDropdown.style.cursor = "pointer";
    languageDropdown.style.zIndex = "10000";
    languageDropdown.style.fontFamily = 'MinibloxFont, sans-serif';
    ui.appendChild(languageDropdown);

    const settingsIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    settingsIcon.setAttribute("viewBox", "0 0 24 24");
    settingsIcon.classList.add("settings-icon");
    settingsIcon.style.position = "absolute";
    settingsIcon.style.top = "20px";
    settingsIcon.style.right = "60px";
    settingsIcon.style.cursor = "pointer";
    settingsIcon.innerHTML = `<path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>`;
    ui.appendChild(settingsIcon);

    const translations = {
        en: {
            languageName: "English 🇬🇧",
            title: "UnverifiedV2",
            autoFullscreen: "Auto Fullscreen",
            autoFullscreenDesc: "Automatically toggles Fullscreen",
            keystrokes: "Keystrokes",
            keystrokesDesc: "Displays the keys you press in real-time.",
            fpsCounter: "FPS Counter",
            fpsCounterDesc: "Shows the frames per second (FPS) of the game.",
            cpsCounter: "CPS Counter",
            cpsCounterDesc: "Counts how many times you click per second.",
            muteChat: "Mute Chat",
            muteChatDesc: "Prevents other players messages from appearing in chat.",
            pingCounter: "Ping Counter",
            pingCounterDesc: "Shows the latency between your client and the server.",
            fpsBooster: "FPS Booster",
            fpsBoosterDesc: "Changes settings to improve FPS (refresh page)",
            antiAfk: "Anti-Afk",
            antiAfkDesc: "Presses WASD on its own to avoid being kicked for being AFK",
            timeDisplay: "Time Display",
            timeDisplayDesc: "Shows you the time so you dont have to exit full screen.",
            closeUI: "Close UI",
            turnedOn: "was turned on",
            turnedOff: "was turned off",
            tooltipBind: "right-click to bind"
        },
        es: {
            languageName: "Español 🇪🇸",
            title: "UnverifiedV2",
            autoFullscreen: "Pantalla Completa Automática",
            autoFullscreenDesc: "Activa/desactiva automáticamente la pantalla completa",
            keystrokes: "Teclas",
            keystrokesDesc: "Muestra las teclas que presionas en tiempo real.",
            fpsCounter: "Contador de FPS",
            fpsCounterDesc: "Muestra los fotogramas por segundo (FPS) del juego.",
            cpsCounter: "Contador de CPS",
            cpsCounterDesc: "Cuenta cuántas veces haces clic por segundo.",
            muteChat: "Silenciar Chat",
            muteChatDesc: "Evita que aparezcan mensajes de otros jugadores en el chat.",
            pingCounter: "Contador de Ping",
            pingCounterDesc: "Muestra la latencia entre tu cliente y el servidor.",
            fpsBooster: "Mejorador de FPS",
            fpsBoosterDesc: "Cambia la configuración para mejorar los FPS (actualiza la página)",
            antiAfk: "Anti-Inactividad",
            antiAfkDesc: "Presiona WASD automáticamente para evitar ser expulsado por inactividad",
            timeDisplay: "Mostrar Hora",
            timeDisplayDesc: "Te muestra la hora para que no tengas que salir de pantalla completa.",
            closeUI: "Cerrar UI",
            turnedOn: "fue activado",
            turnedOff: "fue desactivado",
            tooltipBind: "clic derecho para vincular"
        },
        fr: {
            languageName: "Français 🇫🇷",
            title: "UnverifiedV2",
            autoFullscreen: "Plein Écran Automatique",
            autoFullscreenDesc: "Active/désactive automatiquement le plein écran",
            keystrokes: "Touches",
            keystrokesDesc: "Affiche les touches que vous appuyez en temps réel.",
            fpsCounter: "Compteur FPS",
            fpsCounterDesc: "Affiche les images par seconde (FPS) du jeu.",
            cpsCounter: "Compteur CPS",
            cpsCounterDesc: "Compte combien de fois vous cliquez par seconde.",
            muteChat: "Couper le Chat",
            muteChatDesc: "Empêche les messages des autres joueurs d'apparaître dans le chat.",
            pingCounter: "Compteur de Ping",
            pingCounterDesc: "Affiche la latence entre votre client et le serveur.",
            fpsBooster: "Booster FPS",
            fpsBoosterDesc: "Modifie les paramètres pour améliorer les FPS (actualiser la page)",
            antiAfk: "Anti-Inactivité",
            antiAfkDesc: "Appuie sur WASD automatiquement pour éviter d'être expulsé pour inactivité",
            timeDisplay: "Afficher l'Heure",
            timeDisplayDesc: "Affiche l'heure pour que vous n'ayez pas à quitter le plein écran.",
            closeUI: "Fermer UI",
            turnedOn: "a été activé",
            turnedOff: "a été désactivé",
            tooltipBind: "clic droit pour lier"
        },
        de: {
            languageName: "Deutsch 🇩🇪",
            title: "UnverifiedV2",
            autoFullscreen: "Auto-Vollbild",
            autoFullscreenDesc: "Schaltet Vollbild automatisch ein/aus",
            keystrokes: "Tastenanschläge",
            keystrokesDesc: "Zeigt die Tasten an, die Sie in Echtzeit drücken.",
            fpsCounter: "FPS-Zähler",
            fpsCounterDesc: "Zeigt die Bilder pro Sekunde (FPS) des Spiels an.",
            cpsCounter: "CPS-Zähler",
            cpsCounterDesc: "Zählt, wie oft Sie pro Sekunde klicken.",
            muteChat: "Chat Stumm",
            muteChatDesc: "Verhindert, dass Nachrichten anderer Spieler im Chat erscheinen.",
            pingCounter: "Ping-Zähler",
            pingCounterDesc: "Zeigt die Latenz zwischen Ihrem Client und dem Server an.",
            fpsBooster: "FPS-Booster",
            fpsBoosterDesc: "Ändert Einstellungen zur Verbesserung der FPS (Seite aktualisieren)",
            antiAfk: "Anti-Inaktiv",
            antiAfkDesc: "Drückt WASD automatisch, um nicht wegen Inaktivität gekickt zu werden",
            timeDisplay: "Zeitanzeige",
            timeDisplayDesc: "Zeigt die Zeit an, damit Sie den Vollbildmodus nicht verlassen müssen.",
            closeUI: "UI Schließen",
            turnedOn: "wurde eingeschaltet",
            turnedOff: "wurde ausgeschaltet",
            tooltipBind: "Rechtsklick zum Binden"
        },
        ar: {
            languageName: "العربية 🇸🇦",
            title: "UnverifiedV2",
            autoFullscreen: "ملء الشاشة التلقائي",
            autoFullscreenDesc: "يبدل ملء الشاشة تلقائيًا",
            keystrokes: "ضغطات المفاتيح",
            keystrokesDesc: "يعرض المفاتيح التي تضغط عليها في الوقت الفعلي.",
            fpsCounter: "عداد الإطارات",
            fpsCounterDesc: "يعرض الإطارات في الثانية (FPS) للعبة.",
            cpsCounter: "عداد النقرات",
            cpsCounterDesc: "يحسب عدد مرات النقر في الثانية.",
            muteChat: "كتم الدردشة",
            muteChatDesc: "يمنع ظهور رسائل اللاعبين الآخرين في الدردشة.",
            pingCounter: "عداد البينج",
            pingCounterDesc: "يعرض زمن الاستجابة بين العميل والخادم.",
            fpsBooster: "معزز الإطارات",
            fpsBoosterDesc: "يغير الإعدادات لتحسين FPS (قم بتحديث الصفحة)",
            antiAfk: "مضاد الخمول",
            antiAfkDesc: "يضغط WASD تلقائيًا لتجنب الطرد بسبب الخمول",
            timeDisplay: "عرض الوقت",
            timeDisplayDesc: "يعرض الوقت حتى لا تضطر للخروج من ملء الشاشة.",
            closeUI: "إغلاق الواجهة",
            turnedOn: "تم تشغيله",
            turnedOff: "تم إيقافه",
            tooltipBind: "انقر بزر الماوس الأيمن للربط"
        },
        pt: {
            languageName: "Português 🇧🇷",
            title: "UnverifiedV2",
            autoFullscreen: "Tela Cheia Automática",
            autoFullscreenDesc: "Ativa/desativa a tela cheia automaticamente",
            keystrokes: "Teclas",
            keystrokesDesc: "Exibe as teclas que você pressiona em tempo real.",
            fpsCounter: "Contador de FPS",
            fpsCounterDesc: "Mostra os quadros por segundo (FPS) do jogo.",
            cpsCounter: "Contador de CPS",
            cpsCounterDesc: "Conta quantas vezes você clica por segundo.",
            muteChat: "Silenciar Chat",
            muteChatDesc: "Impede que mensagens de outros jogadores apareçam no chat.",
            pingCounter: "Contador de Ping",
            pingCounterDesc: "Mostra a latência entre seu cliente e o servidor.",
            fpsBooster: "Melhorador de FPS",
            fpsBoosterDesc: "Altera configurações para melhorar os FPS (atualize a página)",
            antiAfk: "Anti-Inatividade",
            antiAfkDesc: "Pressiona WASD automaticamente para evitar ser expulso por inatividade",
            timeDisplay: "Exibir Hora",
            timeDisplayDesc: "Mostra a hora para que você não precise sair da tela cheia.",
            closeUI: "Fechar UI",
            turnedOn: "foi ativado",
            turnedOff: "foi desativado",
            tooltipBind: "clique direito para vincular"
        },
        ru: {
            languageName: "Русский 🇷🇺",
            title: "UnverifiedV2",
            autoFullscreen: "Автополноэкранный режим",
            autoFullscreenDesc: "Автоматически переключает полноэкранный режим",
            keystrokes: "Нажатия клавиш",
            keystrokesDesc: "Отображает нажимаемые клавиши в реальном времени.",
            fpsCounter: "Счетчик FPS",
            fpsCounterDesc: "Показывает количество кадров в секунду (FPS) игры.",
            cpsCounter: "Счетчик CPS",
            cpsCounterDesc: "Считает, сколько раз вы кликаете в секунду.",
            muteChat: "Отключить чат",
            muteChatDesc: "Предотвращает появление сообщений других игроков в чате.",
            pingCounter: "Счетчик пинга",
            pingCounterDesc: "Показывает задержку между вашим клиентом и сервером.",
            fpsBooster: "Усилитель FPS",
            fpsBoosterDesc: "Изменяет настройки для улучшения FPS (обновите страницу)",
            antiAfk: "Анти-АФК",
            antiAfkDesc: "Автоматически нажимает WASD, чтобы избежать кика за неактивность",
            timeDisplay: "Показать время",
            timeDisplayDesc: "Показывает время, чтобы вам не нужно было выходить из полноэкранного режима.",
            closeUI: "Закрыть UI",
            turnedOn: "включен",
            turnedOff: "выключен",
            tooltipBind: "правый клик для привязки"
        },
        it: {
            languageName: "Italiano 🇮🇹",
            title: "UnverifiedV2",
            autoFullscreen: "Schermo Intero Automatico",
            autoFullscreenDesc: "Attiva/disattiva automaticamente lo schermo intero",
            keystrokes: "Tasti",
            keystrokesDesc: "Mostra i tasti che premi in tempo reale.",
            fpsCounter: "Contatore FPS",
            fpsCounterDesc: "Mostra i fotogrammi al secondo (FPS) del gioco.",
            cpsCounter: "Contatore CPS",
            cpsCounterDesc: "Conta quante volte fai clic al secondo.",
            muteChat: "Silenzia Chat",
            muteChatDesc: "Impedisce che i messaggi degli altri giocatori appaiano nella chat.",
            pingCounter: "Contatore Ping",
            pingCounterDesc: "Mostra la latenza tra il tuo client e il server.",
            fpsBooster: "Potenziatore FPS",
            fpsBoosterDesc: "Modifica le impostazioni per migliorare gli FPS (aggiorna la pagina)",
            antiAfk: "Anti-Inattività",
            antiAfkDesc: "Preme WASD automaticamente per evitare di essere espulso per inattività",
            timeDisplay: "Mostra Ora",
            timeDisplayDesc: "Mostra l'ora in modo da non dover uscire dallo schermo intero.",
            closeUI: "Chiudi UI",
            turnedOn: "è stato attivato",
            turnedOff: "è stato disattivato",
            tooltipBind: "clic destro per associare"
        },
        ja: {
            languageName: "日本語 🇯🇵",
            title: "UnverifiedV2",
            autoFullscreen: "自動フルスクリーン",
            autoFullscreenDesc: "フルスクリーンを自動的に切り替えます",
            keystrokes: "キーストローク",
            keystrokesDesc: "押したキーをリアルタイムで表示します。",
            fpsCounter: "FPSカウンター",
            fpsCounterDesc: "ゲームのフレームレート（FPS）を表示します。",
            cpsCounter: "CPSカウンター",
            cpsCounterDesc: "1秒あたりのクリック数をカウントします。",
            muteChat: "チャットミュート",
            muteChatDesc: "他のプレイヤーのメッセージがチャットに表示されないようにします。",
            pingCounter: "Pingカウンター",
            pingCounterDesc: "クライアントとサーバー間のレイテンシを表示します。",
            fpsBooster: "FPSブースター",
            fpsBoosterDesc: "FPSを改善するための設定を変更します（ページを更新）",
            antiAfk: "アンチAFK",
            antiAfkDesc: "WASDを自動的に押してAFKでキックされるのを防ぎます",
            timeDisplay: "時刻表示",
            timeDisplayDesc: "フルスクリーンを終了せずに時刻を表示します。",
            closeUI: "UIを閉じる",
            turnedOn: "がオンになりました",
            turnedOff: "がオフになりました",
            tooltipBind: "右クリックでバインド"
        },
        zh: {
            languageName: "中文 🇨🇳",
            title: "UnverifiedV2",
            autoFullscreen: "自动全屏",
            autoFullscreenDesc: "自动切换全屏",
            keystrokes: "按键显示",
            keystrokesDesc: "实时显示您按下的按键。",
            fpsCounter: "FPS计数器",
            fpsCounterDesc: "显示游戏的每秒帧数（FPS）。",
            cpsCounter: "CPS计数器",
            cpsCounterDesc: "统计您每秒点击的次数。",
            muteChat: "静音聊天",
            muteChatDesc: "防止其他玩家的消息出现在聊天中。",
            pingCounter: "Ping计数器",
            pingCounterDesc: "显示您的客户端与服务器之间的延迟。",
            fpsBooster: "FPS提升器",
            fpsBoosterDesc: "更改设置以提高FPS（刷新页面）",
            antiAfk: "防挂机",
            antiAfkDesc: "自动按下WASD以避免因挂机而被踢出",
            timeDisplay: "时间显示",
            timeDisplayDesc: "显示时间，这样您就不必退出全屏。",
            closeUI: "关闭UI",
            turnedOn: "已开启",
            turnedOff: "已关闭",
            tooltipBind: "右键绑定"
        },
        ko: {
            languageName: "한국어 🇰🇷",
            title: "UnverifiedV2",
            autoFullscreen: "자동 전체화면",
            autoFullscreenDesc: "전체화면을 자동으로 전환합니다",
            keystrokes: "키 입력",
            keystrokesDesc: "실시간으로 누른 키를 표시합니다.",
            fpsCounter: "FPS 카운터",
            fpsCounterDesc: "게임의 초당 프레임 수(FPS)를 표시합니다.",
            cpsCounter: "CPS 카운터",
            cpsCounterDesc: "초당 클릭 횟수를 계산합니다.",
            muteChat: "채팅 음소거",
            muteChatDesc: "다른 플레이어의 메시지가 채팅에 나타나지 않도록 합니다.",
            pingCounter: "핑 카운터",
            pingCounterDesc: "클라이언트와 서버 간의 지연 시간을 표시합니다.",
            fpsBooster: "FPS 부스터",
            fpsBoosterDesc: "FPS를 향상시키기 위해 설정을 변경합니다 (페이지 새로고침)",
            antiAfk: "자리비움 방지",
            antiAfkDesc: "자리비움으로 인한 강퇴를 방지하기 위해 WASD를 자동으로 누릅니다",
            timeDisplay: "시간 표시",
            timeDisplayDesc: "전체화면을 종료하지 않고도 시간을 표시합니다.",
            closeUI: "UI 닫기",
            turnedOn: "이(가) 켜졌습니다",
            turnedOff: "이(가) 꺼졌습니다",
            tooltipBind: "우클릭하여 바인딩"
        },
        nl: {
            languageName: "Nederlands 🇳🇱",
            title: "UnverifiedV2",
            autoFullscreen: "Auto Volledig Scherm",
            autoFullscreenDesc: "Schakelt automatisch volledig scherm in/uit",
            keystrokes: "Toetsaanslagen",
            keystrokesDesc: "Toont de toetsen die je in realtime indrukt.",
            fpsCounter: "FPS-teller",
            fpsCounterDesc: "Toont de frames per seconde (FPS) van het spel.",
            cpsCounter: "CPS-teller",
            cpsCounterDesc: "Telt hoeveel keer je per seconde klikt.",
            muteChat: "Chat Dempen",
            muteChatDesc: "Voorkomt dat berichten van andere spelers in de chat verschijnen.",
            pingCounter: "Ping-teller",
            pingCounterDesc: "Toont de latentie tussen je client en de server.",
            fpsBooster: "FPS-booster",
            fpsBoosterDesc: "Wijzigt instellingen om FPS te verbeteren (pagina vernieuwen)",
            antiAfk: "Anti-Afwezig",
            antiAfkDesc: "Drukt automatisch op WASD om te voorkomen dat je wordt gekickt wegens inactiviteit",
            timeDisplay: "Tijd Weergeven",
            timeDisplayDesc: "Toont de tijd zodat je niet uit volledig scherm hoeft te gaan.",
            closeUI: "UI Sluiten",
            turnedOn: "is ingeschakeld",
            turnedOff: "is uitgeschakeld",
            tooltipBind: "rechtermuisklik om te binden"
        },
        tr: {
            languageName: "Türkçe 🇹🇷",
            title: "UnverifiedV2",
            autoFullscreen: "Otomatik Tam Ekran",
            autoFullscreenDesc: "Tam ekranı otomatik olarak değiştirir",
            keystrokes: "Tuş Vuruşları",
            keystrokesDesc: "Bastığınız tuşları gerçek zamanlı olarak gösterir.",
            fpsCounter: "FPS Sayacı",
            fpsCounterDesc: "Oyunun saniyedeki kare sayısını (FPS) gösterir.",
            cpsCounter: "CPS Sayacı",
            cpsCounterDesc: "Saniyede kaç kez tıkladığınızı sayar.",
            muteChat: "Sohbeti Kapat",
            muteChatDesc: "Diğer oyuncuların mesajlarının sohbette görünmesini engeller.",
            pingCounter: "Ping Sayacı",
            pingCounterDesc: "İstemciniz ile sunucu arasındaki gecikmeyi gösterir.",
            fpsBooster: "FPS Güçlendirici",
            fpsBoosterDesc: "FPS'yi artırmak için ayarları değiştirir (sayfayı yenileyin)",
            antiAfk: "Anti-AFK",
            antiAfkDesc: "AFK nedeniyle atılmayı önlemek için otomatik olarak WASD'ye basar",
            timeDisplay: "Saat Göster",
            timeDisplayDesc: "Tam ekrandan çıkmak zorunda kalmadan saati gösterir.",
            closeUI: "UI'yi Kapat",
            turnedOn: "açıldı",
            turnedOff: "kapandı",
            tooltipBind: "bağlamak için sağ tıklayın"
        },
        pl: {
            languageName: "Polski 🇵🇱",
            title: "UnverifiedV2",
            autoFullscreen: "Automatyczny Pełny Ekran",
            autoFullscreenDesc: "Automatycznie przełącza pełny ekran",
            keystrokes: "Naciśnięcia Klawiszy",
            keystrokesDesc: "Wyświetla klawisze, które naciskasz w czasie rzeczywistym.",
            fpsCounter: "Licznik FPS",
            fpsCounterDesc: "Pokazuje liczbę klatek na sekundę (FPS) gry.",
            cpsCounter: "Licznik CPS",
            cpsCounterDesc: "Liczy, ile razy klikasz na sekundę.",
            muteChat: "Wycisz Czat",
            muteChatDesc: "Zapobiega pojawianiu się wiadomości innych graczy na czacie.",
            pingCounter: "Licznik Pingu",
            pingCounterDesc: "Pokazuje opóźnienie między klientem a serwerem.",
            fpsBooster: "Wzmacniacz FPS",
            fpsBoosterDesc: "Zmienia ustawienia w celu poprawy FPS (odśwież stronę)",
            antiAfk: "Anti-AFK",
            antiAfkDesc: "Automatycznie naciska WASD, aby uniknąć wyrzucenia za bezczynność",
            timeDisplay: "Wyświetl Czas",
            timeDisplayDesc: "Pokazuje czas, więc nie musisz wychodzić z pełnego ekranu.",
            closeUI: "Zamknij UI",
            turnedOn: "został włączony",
            turnedOff: "został wyłączony",
            tooltipBind: "kliknij prawym przyciskiem, aby powiązać"
        },
        sv: {
            languageName: "Svenska 🇸🇪",
            title: "UnverifiedV2",
            autoFullscreen: "Auto Helskärm",
            autoFullscreenDesc: "Växlar automatiskt helskärm",
            keystrokes: "Tangenttryckningar",
            keystrokesDesc: "Visar tangenterna du trycker på i realtid.",
            fpsCounter: "FPS-räknare",
            fpsCounterDesc: "Visar spelets bilder per sekund (FPS).",
            cpsCounter: "CPS-räknare",
            cpsCounterDesc: "Räknar hur många gånger du klickar per sekund.",
            muteChat: "Tysta Chatt",
            muteChatDesc: "Förhindrar att andra spelares meddelanden visas i chatten.",
            pingCounter: "Ping-räknare",
            pingCounterDesc: "Visar latensen mellan din klient och servern.",
            fpsBooster: "FPS-förbättrare",
            fpsBoosterDesc: "Ändrar inställningar för att förbättra FPS (uppdatera sidan)",
            antiAfk: "Anti-AFK",
            antiAfkDesc: "Trycker automatiskt på WASD för att undvika att bli kickad för inaktivitet",
            timeDisplay: "Visa Tid",
            timeDisplayDesc: "Visar tiden så att du inte behöver lämna helskärm.",
            closeUI: "Stäng UI",
            turnedOn: "aktiverades",
            turnedOff: "inaktiverades",
            tooltipBind: "högerklicka för att binda"
        }
    };

    let currentLanguage = localStorage.getItem('unverified-language') || 'en';

    Object.keys(translations).forEach(langCode => {
        const option = document.createElement("option");
        option.value = langCode;
        option.textContent = translations[langCode].languageName;
        if (langCode === currentLanguage) {
            option.selected = true;
        }
        languageDropdown.appendChild(option);
    });

    languageDropdown.addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem('unverified-language', currentLanguage);
        updateLanguage();
    });

    function updateLanguage() {
        title.textContent = translations[currentLanguage].title;
        closeButton.textContent = translations[currentLanguage].closeUI;

        const modules = gridContainer.children;
        const moduleKeys = [
            'autoFullscreen',
            'keystrokes',
            'fpsCounter',
            'cpsCounter',
            'muteChat',
            'pingCounter',
            'fpsBooster',
            'antiAfk',
            'timeDisplay'
        ];

        for (let i = 0; i < modules.length; i++) {
            const moduleTitle = modules[i].querySelector("h3");
            const moduleDesc = modules[i].querySelector("p");
            const tooltip = modules[i].querySelector(".module-tooltip");

            if (moduleTitle && moduleKeys[i]) {
                moduleTitle.textContent = translations[currentLanguage][moduleKeys[i]];
                moduleDesc.textContent = translations[currentLanguage][moduleKeys[i] + 'Desc'];
                tooltip.textContent = translations[currentLanguage].tooltipBind;
            }
        }
    }

    const gridContainer = document.createElement("div");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    gridContainer.style.gridGap = "18px";
    gridContainer.style.marginTop = "18px";
    ui.appendChild(gridContainer);

    const notificationContainer = document.createElement("div");
    notificationContainer.style.position = "fixed";
    notificationContainer.style.bottom = "1in";
    notificationContainer.style.right = "20px";
    notificationContainer.style.zIndex = "10000";
    notificationContainer.style.display = "flex";
    notificationContainer.style.flexDirection = "column-reverse";
    notificationContainer.style.alignItems = "flex-end";
    document.body.appendChild(notificationContainer);

    let moduleBindings = {};
    let isBinding = false;
    let lastKeyPressTime = {};

    function createModule(name, description) {
        const moduleContainer = document.createElement("div");
        moduleContainer.style.padding = "19px";
        moduleContainer.style.borderRadius = "10px";
        moduleContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        moduleContainer.style.cursor = "pointer";
        moduleContainer.style.transition = "border-color 0.3s ease";
        moduleContainer.style.border = "5px solid transparent";
        moduleContainer.style.minHeight = "185px";
        moduleContainer.style.width = "100%";
        moduleContainer.style.display = "flex";
        moduleContainer.style.flexDirection = "column";
        moduleContainer.style.justifyContent = "flex-start";
        moduleContainer.classList.add('module-container');

        // ── CHANGE: module title now uses MinibloxFont (Minecraft font) ──
        const moduleTitle = document.createElement("h3");
        moduleTitle.textContent = name;
        moduleTitle.style.color = "#e74c3c";
        moduleTitle.style.fontSize = "23px";
        moduleTitle.style.margin = "0 0 10px 0";
        moduleTitle.style.fontFamily = 'MinibloxFont, sans-serif';
        moduleContainer.appendChild(moduleTitle);

        // ── CHANGE: module description now uses MinibloxFont (Minecraft font) ──
        const moduleDescription = document.createElement("p");
        moduleDescription.textContent = description;
        moduleDescription.style.color = "#bdc3c7";
        moduleDescription.style.fontSize = "14px";
        moduleDescription.style.margin = "0";
        moduleDescription.style.lineHeight = "1.45";
        moduleDescription.style.fontFamily = 'MinibloxFont, sans-serif';
        moduleContainer.appendChild(moduleDescription);

        gridContainer.appendChild(moduleContainer);

        const tooltip = document.createElement("div");
        tooltip.classList.add("module-tooltip");
        tooltip.textContent = `right-click to bind`;
        moduleContainer.appendChild(tooltip);

        let isActive = false;

        let tooltipTimeout;

        moduleContainer.addEventListener("mouseenter", () => {
            tooltipTimeout = setTimeout(() => {
                tooltip.style.visibility = "visible";
                tooltip.style.opacity = 1;
            }, 1500);
        });

        moduleContainer.addEventListener("mouseleave", () => {
            clearTimeout(tooltipTimeout);
            tooltip.style.visibility = "hidden";
            tooltip.style.opacity = 0;
        });

        moduleContainer.addEventListener("click", () => {
            if (!isBinding) {
                isActive = !isActive;

                if (isActive) {
                    moduleContainer.style.border = "5px solid #2ecc71";
                    showNotification(`${name} was turned on`, true);
                } else {
                    moduleContainer.style.border = "5px solid transparent";
                    showNotification(`${name} was turned off`, false);
                }
            }
        });

        moduleContainer.addEventListener("contextmenu", (event) => {
            event.preventDefault();
            showBindPopup(moduleContainer, name);
        });

        return moduleContainer;
    }

    function showNotification(message, isOn) {
        const notification = document.createElement("div");
        const moduleName = message.split(' was ')[0];
        notification.textContent = `${moduleName} ${isOn ? translations[currentLanguage].turnedOn : translations[currentLanguage].turnedOff}`;
        notification.classList.add('other-notification');
        notificationContainer.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = "translateX(0)";
            notification.style.opacity = "1";
        }, 10);

        setTimeout(() => {
            notification.style.transform = "translateX(100%)";
            notification.style.opacity = "0";

            setTimeout(() => {
                notificationContainer.removeChild(notification);
            }, 500);
        }, 3000);
    }

    function showBindPopup(moduleElement, moduleName) {
        const existingPopup = document.querySelector('.bind-popup');
        if (existingPopup) {
            existingPopup.remove();
        }

        const popup = document.createElement("div");
        popup.classList.add("bind-popup");
        document.body.appendChild(popup);

        const popupTitle = document.createElement("h3");
        popupTitle.textContent = `Bind Key for ${moduleName}`;
        popup.appendChild(popupTitle);

        const inputBox = document.createElement("input");
        inputBox.placeholder = "Press a key...";
        if (moduleBindings[moduleName]) {
            inputBox.value = moduleBindings[moduleName];
        }
        popup.appendChild(inputBox);

        const bindButton = document.createElement("button");
        bindButton.textContent = "Bind";
        const resetButton = document.createElement("button");
        resetButton.textContent = "Unbind";
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";

        popup.appendChild(bindButton);
        popup.appendChild(resetButton);
        popup.appendChild(closeButton);

        closeButton.addEventListener("click", () => {
            popup.style.display = "none";
            isBinding = false;
        });

        let keyBinding = null;
        inputBox.addEventListener("keydown", (e) => {
            e.preventDefault();
            keyBinding = e.key;
            inputBox.value = e.key;
        });

        bindButton.addEventListener("click", () => {
            if (keyBinding) {
                moduleBindings[moduleName] = keyBinding;
                showNotification(`Bound ${moduleName} to ${keyBinding}`, true);
            }
            popup.style.display = "none";
            isBinding = false;
        });

        resetButton.addEventListener("click", () => {
            delete moduleBindings[moduleName];
            showNotification(`${moduleName} unbound`, false);
            popup.style.display = "none";
            isBinding = false;
        });

        const rect = moduleElement.getBoundingClientRect();
        popup.style.top = `${rect.top + window.scrollY + rect.height + 10}px`;
        popup.style.left = `${rect.left + window.scrollX}px`;

        popup.style.display = "block";
        isBinding = true;
    }

    const autoFullscreenModule = createModule("Auto Fullscreen", "Automatically toggles Fullscreen");

    let isAutoFullscreenActive = false;

    autoFullscreenModule.addEventListener("click", () => {
        isAutoFullscreenActive = !isAutoFullscreenActive;

        if (isAutoFullscreenActive) {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    });

    const keystrokesModule = createModule("Keystrokes", "Displays the keys you press in real-time.");

    let isKeystrokesActive = false;

    keystrokesModule.addEventListener("click", () => {
        isKeystrokesActive = !isKeystrokesActive;

        if (isKeystrokesActive) {
            (function () {
                'use strict';

                const getValue = (key, fallback) => {
                    const value = localStorage.getItem(key);
                    return value !== null ? parseInt(value, 10) : fallback;
                };

                const setValue = (key, value) => {
                    localStorage.setItem(key, value);
                };

								if (document.getElementById('keystrokes-container')) {
									console.log('hi');
									document.getElementById('keystrokes-container').remove();
								}
                const keystrokescontainer = document.createElement('div');
								keystrokescontainer.id = 'keystrokes-container';
                keystrokescontainer.style.zIndex = '10000';
                keystrokescontainer.style.width = '300px';
                keystrokescontainer.style.height = '230px';
                keystrokescontainer.style.position = 'fixed';
                keystrokescontainer.style.left = getValue('left', window.innerWidth / 2) + 'px';
                keystrokescontainer.style.top = getValue('top', window.innerHeight / 2) + 'px';
                keystrokescontainer.style.opacity = '100%';
                keystrokescontainer.style.boxShadow = 'none';
                keystrokescontainer.style.backgroundColor = 'transparent';


                keystrokescontainer.style.position = 'fixed';
                keystrokescontainer.style.transform = 'translate(-50%, -50%)';
                keystrokescontainer.style.display = 'flex';
                keystrokescontainer.style.flexDirection = 'column';
                keystrokescontainer.style.alignItems = 'center';

                keystrokescontainer.style.userSelect = 'none';

                document.body.appendChild(keystrokescontainer);

                let isDragging = false;

                keystrokescontainer.addEventListener('mousedown', (event) => {
                    if (event.target.nodeName !== 'INPUT') {
                        isDragging = true;
                    }
                });

                document.addEventListener('mousemove', (event) => {
                    if (isDragging) {
                        const left = event.clientX;
                        const top = event.clientY;

                        keystrokescontainer.style.left = left + 'px';
                        keystrokescontainer.style.top = top + 'px';

                        setValue('left', left);
                        setValue('top', top);
                    }
                });

                document.addEventListener('mouseup', () => {
                    isDragging = false;
                });

                const createKey = (text, style = {}) => {
                    const key = document.createElement('div');
                    key.textContent = text;
                    Object.assign(key.style, {
                        position: 'absolute',
                        color: '#ffffff',
                        fontWeight: 'bold',
                        borderRadius: '0',
                        backgroundColor: 'rgba(128, 128, 128, 0.7)',
                        border: '3px solid #333333',
                        fontSize: '18px',
                        height: '50px',
                        width: '50px',
                        textAlign: 'center',
                        lineHeight: '50px',
                        fontFamily: 'Roboto Mono, monospace',
                        zIndex: '10000',
                        ...style
                    });
                    return key;
                };


                const wkey = createKey('W', { top: '0px', left: '125px' });
                const akey = createKey('A', { top: '55px', left: '70px' });
                const skey = createKey('S', { top: '55px', left: '125px' });
                const dkey = createKey('D', { top: '55px', left: '180px' });

                const lmb = createKey('LMB', {
                    top: '110px', left: '70px', width: '79px'
                });
                const rmb = createKey('RMB', {
                    top: '110px', left: '150px', width: '79px'
                });
                const space = createKey('_____', {
                    top: '170px', left: '70px', width: '160px'
                });

                keystrokescontainer.append(wkey, akey, skey, dkey, lmb, rmb, space);

                const downColor = '#8B0000';
                const upColor = 'rgba(128, 128, 128, 0.7)';

                document.addEventListener('keydown', (event) => {
                    switch (event.code) {
                        case 'KeyW': wkey.style.backgroundColor = downColor; break;
                        case 'KeyS': skey.style.backgroundColor = downColor; break;
                        case 'KeyA': akey.style.backgroundColor = downColor; break;
                        case 'KeyD': dkey.style.backgroundColor = downColor; break;
                        case 'Space': space.style.backgroundColor = downColor; break;
                    }
                });

                document.addEventListener('keyup', (event) => {
                    switch (event.code) {
                        case 'KeyW': wkey.style.backgroundColor = upColor; break;
                        case 'KeyS': skey.style.backgroundColor = upColor; break;
                        case 'KeyA': akey.style.backgroundColor = upColor; break;
                        case 'KeyD': dkey.style.backgroundColor = upColor; break;
                        case 'Space': space.style.backgroundColor = upColor; break;
                    }
                });

                document.addEventListener('mousedown', (event) => {
                    if (event.button === 0) {
                        lmb.style.backgroundColor = downColor;
                    } else if (event.button === 2) {
                        rmb.style.backgroundColor = downColor;
                    }
                });

                document.addEventListener('mouseup', (event) => {
                    if (event.button === 0) {
                        lmb.style.backgroundColor = upColor;
                    } else if (event.button === 2) {
                        rmb.style.backgroundColor = upColor;
                    }
                });
            })();


        } else {
						document.getElementById('keystrokes-container').remove();
            console.log("Keystrokes module disabled");
        }
    });

    createModule("FPS Counter", "Shows the frames per second (FPS) of the game.");
const fpsModule = [...gridContainer.children].find(child =>
  child.querySelector("h3")?.textContent === "FPS Counter"
);

let isFPSVisible = false;
let fpsElement = null;
let lastFrameTime = performance.now();
let frameCount = 0;
let fps = 0;

if (fpsModule) {
  fpsModule.addEventListener("click", () => {
    isFPSVisible = !isFPSVisible;

    if (isFPSVisible) {
      fpsElement = document.createElement("div");
      fpsElement.id = "fps-counter";
      fpsElement.style.position = "fixed";
      fpsElement.style.top = "60px";
      fpsElement.style.left = "20px";
      fpsElement.style.padding = "8px 14px";
      fpsElement.style.background = "rgba(0, 0, 0, 0.6)";
      fpsElement.style.backdropFilter = "blur(8px)";
      fpsElement.style.border = "1px solid rgba(255, 255, 255, 0.15)";
      fpsElement.style.borderRadius = "8px";
      fpsElement.style.zIndex = "99999";
      fpsElement.style.cursor = "move";
      fpsElement.style.userSelect = "none";
      fpsElement.style.fontFamily = "'Segoe UI', 'Roboto', sans-serif";
      fpsElement.style.display = "flex";
      fpsElement.style.alignItems = "center";
      fpsElement.style.gap = "8px";
      fpsElement.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";

      const fpsDot = document.createElement("div");
      fpsDot.id = "fps-dot";
      fpsDot.style.width = "10px";
      fpsDot.style.height = "10px";
      fpsDot.style.borderRadius = "50%";
      fpsDot.style.backgroundColor = "#4CAF50";
      fpsDot.style.boxShadow = "0 0 12px rgba(76, 175, 80, 0.9)";
      fpsDot.style.transition = "all 0.3s ease";

      const fpsValue = document.createElement("div");
      fpsValue.id = "fps-value";
      fpsValue.textContent = "0 FPS";
      fpsValue.style.fontSize = "16px";
      fpsValue.style.fontWeight = "700";
      fpsValue.style.color = "#FFFFFF";
      fpsValue.style.letterSpacing = "0.5px";
      fpsValue.style.transition = "color 0.3s ease";

      fpsElement.appendChild(fpsDot);
      fpsElement.appendChild(fpsValue);

      document.body.appendChild(fpsElement);

      let offsetX = 0,
        offsetY = 0,
        isDragging = false;

      fpsElement.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - fpsElement.getBoundingClientRect().left;
        offsetY = e.clientY - fpsElement.getBoundingClientRect().top;
        e.preventDefault();
      });

      document.addEventListener("mousemove", (e) => {
        if (isDragging) {
          fpsElement.style.left = `${e.clientX - offsetX}px`;
          fpsElement.style.top = `${e.clientY - offsetY}px`;
        }
      });

      document.addEventListener("mouseup", () => {
        isDragging = false;
      });

      const updateFPS = () => {
        const now = performance.now();
        frameCount++;

        if (now - lastFrameTime >= 1000) {
          fps = frameCount;
          const valueElement = document.getElementById("fps-value");
          const dotElement = document.getElementById("fps-dot");

          if (valueElement && dotElement) {
            valueElement.textContent = `${fps} FPS`;

            if (fps >= 60) {
              valueElement.style.color = "#4CAF50";
              dotElement.style.backgroundColor = "#4CAF50";
              dotElement.style.boxShadow = "0 0 12px rgba(76, 175, 80, 0.9)";
            } else if (fps >= 45) {
              valueElement.style.color = "#8BC34A";
              dotElement.style.backgroundColor = "#8BC34A";
              dotElement.style.boxShadow = "0 0 12px rgba(139, 195, 74, 0.9)";
            } else if (fps >= 30) {
              valueElement.style.color = "#FFC107";
              dotElement.style.backgroundColor = "#FFC107";
              dotElement.style.boxShadow = "0 0 12px rgba(255, 193, 7, 0.9)";
            } else if (fps >= 20) {
              valueElement.style.color = "#FF9800";
              dotElement.style.backgroundColor = "#FF9800";
              dotElement.style.boxShadow = "0 0 12px rgba(255, 152, 0, 0.9)";
            } else {
              valueElement.style.color = "#F44336";
              dotElement.style.backgroundColor = "#F44336";
              dotElement.style.boxShadow = "0 0 12px rgba(244, 67, 54, 0.9)";
            }
          }

          frameCount = 0;
          lastFrameTime = now;
        }

        if (isFPSVisible) {
          requestAnimationFrame(updateFPS);
        }
      };

      requestAnimationFrame(updateFPS);
    } else if (fpsElement) {
      fpsElement.remove();
      fpsElement = null;
    }
  });
}

const mouseModule = createModule("CPS Counter", "Counts how many times you click per second.");

let isMouseActive = false;
let clickTimes = [];
let mouseElement = null;
const mouseDecayTime = 1000;

const strokeColor = "#FFFFFF";
const idleFill = "rgba(255, 255, 255, 0.1)";
const activeFill = "rgba(255, 255, 255, 0.8)";

mouseModule.addEventListener("click", () => {
    isMouseActive = !isMouseActive;

    if (isMouseActive) {
        if (!mouseElement) {
            mouseElement = document.createElement("div");
            mouseElement.id = "mouse-strokes-hud";
            mouseElement.style.cssText = `
                position: fixed; top: 100px; left: 20px;
                padding: 10px; z-index: 99999;
                user-select: none; cursor: move;
                display: flex; flex-direction: column; align-items: center;
                gap: 5px; font-family: 'Segoe UI', Tahoma, sans-serif;
                filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.8));
            `;

            mouseElement.innerHTML = `
                <svg id="mouse-svg" width="70" height="95" viewBox="0 0 100 140">
                    <path id="m-left" d="M10 40 Q 10 10, 48 10 L 48 65 L 10 65 Z" fill="${idleFill}" stroke="${strokeColor}" stroke-width="6"/>
                    <path id="m-right" d="M90 40 Q 90 10, 52 10 L 52 65 L 90 65 Z" fill="${idleFill}" stroke="${strokeColor}" stroke-width="6"/>
                    <path d="M10 65 L 90 65 Q 90 130, 50 130 Q 10 130, 10 65" fill="none" stroke="${strokeColor}" stroke-width="6"/>
                    <rect x="43" y="22" width="14" height="24" rx="7" fill="${strokeColor}"/>
                </svg>
                <div id="cps-display" style="color: white; font-size: 20px; font-weight: 900; text-shadow: 0px 0px 10px rgba(0,0,0,1), 0px 0px 5px rgba(0,0,0,1);">0 CPS</div>
            `;

            document.body.appendChild(mouseElement);

            let isDragging = false;
            let offsetX, offsetY;
            mouseElement.addEventListener("mousedown", (e) => {
                isDragging = true;
                offsetX = e.clientX - mouseElement.getBoundingClientRect().left;
                offsetY = e.clientY - mouseElement.getBoundingClientRect().top;
            });

            document.addEventListener("mousemove", (e) => {
                if (isDragging) {
                    mouseElement.style.left = (e.clientX - offsetX) + "px";
                    mouseElement.style.top = (e.clientY - offsetY) + "px";
                }
            });

            document.addEventListener("mouseup", () => isDragging = false);
        }

        const handleInteraction = (e) => {
            const now = Date.now();
            if (e.type === "mousedown") {
                if (e.button === 0) document.getElementById("m-left").setAttribute("fill", activeFill);
                if (e.button === 2) document.getElementById("m-right").setAttribute("fill", activeFill);
                clickTimes.push(now);
            } else if (e.type === "mouseup") {
                if (e.button === 0) document.getElementById("m-left").setAttribute("fill", idleFill);
                if (e.button === 2) document.getElementById("m-right").setAttribute("fill", idleFill);
            }
        };

        document.addEventListener("mousedown", handleInteraction);
        document.addEventListener("mouseup", handleInteraction);
        document.addEventListener("contextmenu", (e) => e.preventDefault());

        function updateLoop() {
            const now = Date.now();
            clickTimes = clickTimes.filter(time => now - time <= mouseDecayTime);
            const display = document.getElementById("cps-display");
            if (display) display.textContent = `${clickTimes.length} CPS`;
            if (isMouseActive) requestAnimationFrame(updateLoop);
        }

        updateLoop();
        mouseModule._handler = handleInteraction;

    } else {
        if (mouseElement) {
            mouseElement.remove();
            mouseElement = null;
        }
        if (mouseModule._handler) {
            document.removeEventListener("mousedown", mouseModule._handler);
            document.removeEventListener("mouseup", mouseModule._handler);
        }
    }
});

const muteChatModule = createModule("Mute Chat", "Prevents other players messages from appearing in chat.");

let isMuteChatActive = false;
let originalAddChat = null;

muteChatModule.addEventListener("click", () => {
    isMuteChatActive = !isMuteChatActive;

    const gameRef = {
        _game: null,
        get game() {
            if (this._game) return this._game;

            const reactRoot = document.querySelector("#react");
            if (!reactRoot) return null;

            try {
                const fiber = Object.values(reactRoot)[0];
                const game = fiber?.updateQueue?.baseState?.element?.props?.game;
                if (game) this._game = game;
                return game;
            } catch (e) {
                console.warn("[UnverifiedV2] Failed to get game object:", e);
                return null;
            }
        }
    };

    const game = gameRef.game;

    if (game && game.chat) {
        if (isMuteChatActive) {
            if (!originalAddChat) {
                originalAddChat = game.chat.addChat;
            }
            game.chat.addChat = function() {};
        } else {
            if (originalAddChat) {
                game.chat.addChat = originalAddChat;
            }
        }
    }
});

const pingModule = createModule("Ping Counter", "Shows the latency between your client and the server.");

let isPingActive = false;
let pingElement = null;
let pingInterval = null;

pingModule.addEventListener("click", () => {
    isPingActive = !isPingActive;

    if (isPingActive) {
        pingElement = document.createElement("div");
        pingElement.id = "ping-counter";
        pingElement.style.position = "fixed";
        pingElement.style.top = "20px";
        pingElement.style.left = "20px";
        pingElement.style.padding = "8px 14px";
        pingElement.style.background = "rgba(0, 0, 0, 0.6)";
        pingElement.style.backdropFilter = "blur(8px)";
        pingElement.style.border = "1px solid rgba(255, 255, 255, 0.15)";
        pingElement.style.borderRadius = "8px";
        pingElement.style.zIndex = "10000";
        pingElement.style.cursor = "move";
        pingElement.style.userSelect = "none";
        pingElement.style.fontFamily = "'Segoe UI', 'Roboto', sans-serif";
        pingElement.style.display = "flex";
        pingElement.style.alignItems = "center";
        pingElement.style.gap = "8px";
        pingElement.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";

        const pingDot = document.createElement("div");
        pingDot.id = "ping-dot";
        pingDot.style.width = "10px";
        pingDot.style.height = "10px";
        pingDot.style.borderRadius = "50%";
        pingDot.style.backgroundColor = "#4CAF50";
        pingDot.style.boxShadow = "0 0 12px rgba(76, 175, 80, 0.9)";
        pingDot.style.transition = "all 0.3s ease";

        const pingValue = document.createElement("div");
        pingValue.id = "ping-value";
        pingValue.textContent = "--- ms";
        pingValue.style.fontSize = "16px";
        pingValue.style.fontWeight = "700";
        pingValue.style.color = "#FFFFFF";
        pingValue.style.letterSpacing = "0.5px";
        pingValue.style.transition = "color 0.3s ease";

        pingElement.appendChild(pingDot);
        pingElement.appendChild(pingValue);

        document.body.appendChild(pingElement);

        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        pingElement.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - pingElement.getBoundingClientRect().left;
            offsetY = e.clientY - pingElement.getBoundingClientRect().top;
            e.preventDefault();
        });

        document.addEventListener("mousemove", (e) => {
            if (isDragging) {
                pingElement.style.left = `${e.clientX - offsetX}px`;
                pingElement.style.top = `${e.clientY - offsetY}px`;
            }
        });

        document.addEventListener("mouseup", () => {
            isDragging = false;
        });

        const updatePing = () => {
            const start = Date.now();
            fetch(window.location.href, { method: 'HEAD', cache: "no-cache" })
                .then(() => {
                    const end = Date.now();
                    const ping = end - start;
                    const valueElement = document.getElementById("ping-value");
                    const dotElement = document.getElementById("ping-dot");

                    if (valueElement && dotElement) {
                        valueElement.textContent = `${ping} ms`;

                        if (ping < 50) {
                            valueElement.style.color = "#4CAF50";
                            dotElement.style.backgroundColor = "#4CAF50";
                            dotElement.style.boxShadow = "0 0 12px rgba(76, 175, 80, 0.9)";
                        } else if (ping < 100) {
                            valueElement.style.color = "#8BC34A";
                            dotElement.style.backgroundColor = "#8BC34A";
                            dotElement.style.boxShadow = "0 0 12px rgba(139, 195, 74, 0.9)";
                        } else if (ping < 150) {
                            valueElement.style.color = "#FFC107";
                            dotElement.style.backgroundColor = "#FFC107";
                            dotElement.style.boxShadow = "0 0 12px rgba(255, 193, 7, 0.9)";
                        } else if (ping < 200) {
                            valueElement.style.color = "#FF9800";
                            dotElement.style.backgroundColor = "#FF9800";
                            dotElement.style.boxShadow = "0 0 12px rgba(255, 152, 0, 0.9)";
                        } else {
                            valueElement.style.color = "#F44336";
                            dotElement.style.backgroundColor = "#F44336";
                            dotElement.style.boxShadow = "0 0 12px rgba(244, 67, 54, 0.9)";
                        }
                    }
                })
                .catch(() => {
                    const valueElement = document.getElementById("ping-value");
                    const dotElement = document.getElementById("ping-dot");
                    if (valueElement && dotElement) {
                        valueElement.textContent = "N/A";
                        valueElement.style.color = "#9E9E9E";
                        dotElement.style.backgroundColor = "#9E9E9E";
                        dotElement.style.boxShadow = "0 0 12px rgba(158, 158, 158, 0.9)";
                    }
                });
        };

        updatePing();
        pingInterval = setInterval(updatePing, 1000);
    } else {
        if (pingElement) {
            pingElement.remove();
            pingElement = null;
        }
        clearInterval(pingInterval);
    }
});

    createModule("FPS Booster", "Changes settings to improve FPS (refresh page)");
    createModule("Anti-Afk", "Presses WASD on its own to avoid being kicked for being AFK");
const antiAfkModule = [...gridContainer.children].find(child =>
    child.querySelector("h3")?.textContent === "Anti-Afk"
);

let isAntiAfkActive = false;
let antiAfkInterval = null;
let antiAfkBox = null;

if (antiAfkModule) {
    antiAfkModule.addEventListener("click", () => {
        isAntiAfkActive = !isAntiAfkActive;

        if (isAntiAfkActive) {
            antiAfkBox = document.createElement("div");
            antiAfkBox.id = "anti-afk-counter";
            antiAfkBox.style.position = "fixed";
            antiAfkBox.style.top = "100px";
            antiAfkBox.style.left = "20px";
            antiAfkBox.style.padding = "8px 14px";
            antiAfkBox.style.background = "rgba(0, 0, 0, 0.6)";
            antiAfkBox.style.backdropFilter = "blur(8px)";
            antiAfkBox.style.border = "1px solid rgba(255, 255, 255, 0.15)";
            antiAfkBox.style.borderRadius = "8px";
            antiAfkBox.style.zIndex = "9999";
            antiAfkBox.style.cursor = "move";
            antiAfkBox.style.userSelect = "none";
            antiAfkBox.style.fontFamily = "'Segoe UI', 'Roboto', sans-serif";
            antiAfkBox.style.display = "flex";
            antiAfkBox.style.alignItems = "center";
            antiAfkBox.style.gap = "8px";
            antiAfkBox.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.3)";

            const afkDot = document.createElement("div");
            afkDot.id = "afk-dot";
            afkDot.style.width = "10px";
            afkDot.style.height = "10px";
            afkDot.style.borderRadius = "50%";
            afkDot.style.backgroundColor = "#4CAF50";
            afkDot.style.boxShadow = "0 0 12px rgba(76, 175, 80, 0.9)";
            afkDot.style.animation = "afkPulse 1.5s infinite";

            const afkText = document.createElement("div");
            afkText.textContent = "Anti-AFK";
            afkText.style.fontSize = "16px";
            afkText.style.fontWeight = "700";
            afkText.style.color = "#4CAF50";
            afkText.style.letterSpacing = "0.5px";

            antiAfkBox.appendChild(afkDot);
            antiAfkBox.appendChild(afkText);

            const style = document.createElement("style");
            style.textContent = `
                @keyframes afkPulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(1.2); }
                }
            `;
            document.head.appendChild(style);

            document.body.appendChild(antiAfkBox);

            let offsetX = 0;
            let offsetY = 0;
            let isDragging = false;

            antiAfkBox.addEventListener("mousedown", (e) => {
                isDragging = true;
                offsetX = e.clientX - antiAfkBox.getBoundingClientRect().left;
                offsetY = e.clientY - antiAfkBox.getBoundingClientRect().top;
                e.preventDefault();
            });

            document.addEventListener("mousemove", (e) => {
                if (isDragging) {
                    antiAfkBox.style.left = `${e.clientX - offsetX}px`;
                    antiAfkBox.style.top = `${e.clientY - offsetY}px`;
                    antiAfkBox.style.right = "auto";
                }
            });

            document.addEventListener("mouseup", () => {
                isDragging = false;
            });

            const keys = [
                ['w', 'KeyW', 87],
                ['a', 'KeyA', 65],
                ['s', 'KeyS', 83],
                ['d', 'KeyD', 68],
                [' ', 'Space', 32]
            ];

            let index = 0;
            antiAfkInterval = setInterval(() => {
                const [key, code, keyCode] = keys[index];
                simulateKeyPress(key, code, keyCode);
                index = (index + 1) % keys.length;
            }, 500);
        } else {
            if (antiAfkInterval) clearInterval(antiAfkInterval);
            if (antiAfkBox) antiAfkBox.remove();
        }
    });
}

function simulateKeyPress(key, code, keyCode) {
    const eventTarget = document.activeElement || document.body;

    const downEvent = new KeyboardEvent('keydown', {
        key: key,
        code: code,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true
    });

    const upEvent = new KeyboardEvent('keyup', {
        key: key,
        code: code,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true
    });

    eventTarget.dispatchEvent(downEvent);
    setTimeout(() => eventTarget.dispatchEvent(upEvent), 50);
}


    createModule("Time Display", "Shows you the time so you dont have to exit full screen.");
    const timeModule = [...gridContainer.children].find(child =>
    child.querySelector("h3")?.textContent === "Time Display"
);

let isTimeVisible = false;
let timeElement = null;

if (timeModule) {
    timeModule.addEventListener("click", () => {
        isTimeVisible = !isTimeVisible;

        if (isTimeVisible) {
            timeElement = document.createElement("div");
            timeElement.id = "fullscreen-clock";
            timeElement.style.position = "fixed";
            timeElement.style.bottom = "20px";
            timeElement.style.right = "20px";
            timeElement.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            timeElement.style.color = "white";
            timeElement.style.padding = "10px 15px";
            timeElement.style.borderRadius = "8px";
            timeElement.style.fontSize = "18px";
            timeElement.style.fontFamily = "monospace";
            timeElement.style.zIndex = "99999";
            timeElement.style.pointerEvents = "auto";
            timeElement.style.cursor = "move";
            timeElement.style.top = "unset";
            timeElement.style.left = "unset";
            let isDragging = false;
let offsetX = 0, offsetY = 0;

timeElement.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - timeElement.getBoundingClientRect().left;
    offsetY = e.clientY - timeElement.getBoundingClientRect().top;
    e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        timeElement.style.left = `${e.clientX - offsetX}px`;
        timeElement.style.top = `${e.clientY - offsetY}px`;
        timeElement.style.bottom = "auto";
        timeElement.style.right = "auto";
        timeElement.style.position = "fixed";
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});


            document.body.appendChild(timeElement);

            const updateClock = () => {
                const now = new Date();
                timeElement.textContent = now.toLocaleTimeString();
            };

            updateClock();
            timeElement._interval = setInterval(updateClock, 1000);
        } else if (timeElement) {
            clearInterval(timeElement._interval);
            timeElement.remove();
            timeElement = null;
        }
    });
}

    const bottomRow = document.createElement("div");
    bottomRow.style.display = "flex";
    bottomRow.style.alignItems = "center";
    bottomRow.style.justifyContent = "center";
    bottomRow.style.gap = "8px";
    bottomRow.style.marginTop = "18px";
    ui.appendChild(bottomRow);

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close UI";
    closeButton.style.backgroundColor = "#e74c3c";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "17px";
    closeButton.style.cursor = "pointer";
    bottomRow.appendChild(closeButton);

    const ThemesDropdown = document.createElement("select");
    ThemesDropdown.style.backgroundColor = "#e74c3c";
    ThemesDropdown.style.color = "white";
    ThemesDropdown.style.border = "none";
    ThemesDropdown.style.borderRadius = "5px";
    ThemesDropdown.style.padding = "10px 20px";
    ThemesDropdown.style.fontSize = "17px";
    ThemesDropdown.style.marginTop = "0";
    ThemesDropdown.style.cursor = "pointer";

    const themes = [
        { name: "Default", image: "#1a1a1a" },
        { name: "Minors??!!", image: "https://media1.tenor.com/m/mn2d2liDsmUAAAAC/ichigo-bleach.gif" },
        { name: "Nyan Cat", image: "https://media1.tenor.com/m/2roX3uxz_68AAAAC/cat-space.gif" },
        { name: "Beach", image: "https://wallpaperaccess.com/full/174768.jpg" },
        { name: "Fall", image: "https://wallpaperaccess.com/full/185084.jpg" },
        { name: "Ocean", image: "https://wallpaperaccess.com/full/317501.jpg" },
        { name: "Sunrise", image: "https://wallpaperaccess.com/full/14240.jpg" }
    ];

    themes.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.image;
        option.textContent = theme.name;
        ThemesDropdown.appendChild(option);
    });

    function applyTheme(value) {
        const isColor = value.startsWith("#") || value.startsWith("rgb");
        if (isColor) {
            ui.style.backgroundImage = "";
            ui.style.backgroundSize = "";
            ui.style.backgroundPosition = "";
            ui.style.backgroundColor = value;
        } else {
            ui.style.backgroundColor = "";
            ui.style.backgroundImage = `url(${value})`;
            ui.style.backgroundSize = "cover";
            ui.style.backgroundPosition = "center";
        }
    }

    ThemesDropdown.addEventListener("change", (e) => {
        if (e.target.value.toLowerCase() === RAINBOW_CODE) {
            applyRainbow(ui);
        } else {
            ui.style.animation = "";
            ui.style.filter = "";
            ui.classList.remove("unverified-rainbow-wrap");
            applyTheme(e.target.value);
        }
    });

    const MAX_CUSTOM = 3;
    let customThemes = JSON.parse(localStorage.getItem("unverified-custom-themes") || "[]");

    function saveCustomThemes() {
        localStorage.setItem("unverified-custom-themes", JSON.stringify(customThemes));
    }

    function rebuildCustomOptions() {

        for (let i = ThemesDropdown.options.length - 1; i >= 0; i--) {
            if (ThemesDropdown.options[i].dataset.custom === "1") {
                ThemesDropdown.remove(i);
            }
        }
        customThemes.forEach(t => {
            const opt = document.createElement("option");
            opt.value = t.image;
            opt.textContent = "\u2605 " + t.name;
            opt.dataset.custom = "1";
            ThemesDropdown.appendChild(opt);
        });
    }

    rebuildCustomOptions();

    const themeRow = document.createElement("div");
    themeRow.style.display = "flex";
    themeRow.style.alignItems = "center";
    themeRow.style.gap = "8px";

    themeRow.appendChild(ThemesDropdown);

    const addThemeBtn = document.createElement("button");
    addThemeBtn.textContent = "+";
    addThemeBtn.title = "Create custom theme (max 3)";
    addThemeBtn.style.backgroundColor = "#e74c3c";
    addThemeBtn.style.color = "white";
    addThemeBtn.style.border = "none";
    addThemeBtn.style.borderRadius = "5px";
    addThemeBtn.style.width = "38px";
    addThemeBtn.style.height = "38px";
    addThemeBtn.style.fontSize = "22px";
    addThemeBtn.style.lineHeight = "1";
    addThemeBtn.style.cursor = "pointer";
    addThemeBtn.style.flexShrink = "0";
    addThemeBtn.style.transition = "background-color 0.2s";
    addThemeBtn.addEventListener("mouseover", () => addThemeBtn.style.backgroundColor = "#c0392b");
    addThemeBtn.addEventListener("mouseout",  () => addThemeBtn.style.backgroundColor = "#e74c3c");

    themeRow.appendChild(addThemeBtn);
    bottomRow.appendChild(themeRow);

    const ctOverlay = document.createElement("div");
    ctOverlay.id = "ct-overlay";
    ctOverlay.style.cssText = "display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:99998;";
    document.body.appendChild(ctOverlay);

    const ctModalStyle = document.createElement("style");
    ctModalStyle.textContent = `
        @keyframes ctSlideIn {
            from { opacity:0; transform:translate(-50%,-46%) scale(0.96); }
            to   { opacity:1; transform:translate(-50%,-50%) scale(1); }
        }
        @keyframes ctSlideOut {
            from { opacity:1; transform:translate(-50%,-50%) scale(1); }
            to   { opacity:0; transform:translate(-50%,-46%) scale(0.96); }
        }
        #ct-modal.ct-in  { animation: ctSlideIn  0.18s ease forwards; }
        #ct-modal.ct-out { animation: ctSlideOut 0.15s ease forwards; }
        #ct-name:focus, #ct-bg:focus { border-bottom-color:#e74c3c !important; }
        #ct-save:hover   { background:#c0392b !important; }
        #ct-cancel-btn:hover { color:#ccc !important; }
    `;
    document.head.appendChild(ctModalStyle);

    const ctModal = document.createElement("div");
    ctModal.id = "ct-modal";
    ctModal.style.cssText = `
        display:none;position:fixed;top:50%;left:50%;
        transform:translate(-50%,-50%);
        background:#141414;border-top:3px solid #e74c3c;
        border-radius:6px;padding:20px 22px 22px;
        z-index:99999;width:300px;
        box-shadow:0 16px 48px rgba(0,0,0,0.95);
        font-family:MinibloxFont,sans-serif;color:white;
    `;

    ctModal.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
            <span style="color:#e74c3c;font-size:17px;letter-spacing:0.5px;">New Theme</span>
            <button id="ct-cancel-btn" style="background:none;border:none;color:#555;font-size:20px;cursor:pointer;padding:0;line-height:1;transition:color 0.15s;">&#x2715;</button>
        </div>
        <div style="font-size:11px;color:#555;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;">Name</div>
        <input id="ct-name" maxlength="20" placeholder="My Theme" style="
            width:100%;box-sizing:border-box;background:#1a1a1a;color:white;
            border:none;border-bottom:1px solid #2a2a2a;padding:7px 0;
            font-size:14px;outline:none;margin-bottom:16px;
            font-family:MinibloxFont,sans-serif;transition:border-color 0.2s;
        ">
        <div style="font-size:11px;color:#555;letter-spacing:1.5px;text-transform:uppercase;margin-bottom:5px;">Background</div>
        <input id="ct-bg" placeholder="https://... or #hexcolor" style="
            width:100%;box-sizing:border-box;background:#1a1a1a;color:white;
            border:none;border-bottom:1px solid #2a2a2a;padding:7px 0;
            font-size:13px;outline:none;margin-bottom:14px;
            font-family:MinibloxFont,sans-serif;transition:border-color 0.2s;
        ">
        <div id="ct-preview" style="
            width:100%;height:90px;margin-bottom:16px;
            border-radius:4px;
            background-size:cover;background-position:center;
            display:flex;align-items:center;justify-content:center;
            color:#333;font-size:12px;letter-spacing:1px;
            text-transform:uppercase;transition:all 0.3s;
            box-sizing:border-box;overflow:hidden;
        ">no preview</div>
        <div id="ct-limit-warn" style="color:#e74c3c;font-size:12px;margin-bottom:12px;display:none;letter-spacing:0.3px;">
            max 3 themes — delete one first
        </div>
        <button id="ct-save" style="
            width:100%;background:#e74c3c;color:white;border:none;
            padding:10px;font-size:14px;cursor:pointer;letter-spacing:0.5px;
            font-family:MinibloxFont,sans-serif;border-radius:3px;margin-bottom:20px;
            transition:background 0.15s;
        ">Save Theme</button>
        <div style="font-size:10px;color:#333;letter-spacing:2px;text-transform:uppercase;margin-bottom:10px;">Saved Themes</div>
        <div id="ct-list" style="display:flex;flex-direction:column;gap:6px;"></div>
    `;

    document.body.appendChild(ctModal);
    const _prevInit = document.getElementById("ct-preview");
    if (_prevInit) _prevInit.style.background = "#1a1a1a";

    function openCtModal() {
        ctModal.style.display = "block";
        ctOverlay.style.display = "block";
        ctModal.classList.remove("ct-out");
        ctModal.classList.add("ct-in");
    }

    function closeCtModal() {
        ctModal.classList.remove("ct-in");
        ctModal.classList.add("ct-out");
        setTimeout(() => {
            ctModal.style.display = "none";
            ctOverlay.style.display = "none";
            ctModal.classList.remove("ct-out");
        }, 150);
    }

    ctOverlay.addEventListener("click", closeCtModal);

    function renderCtList() {
        const list = document.getElementById("ct-list");
        if (!list) return;
        list.innerHTML = "";
        if (customThemes.length === 0) {
            list.innerHTML = `<div style="color:#2a2a2a;font-size:12px;letter-spacing:0.5px;">nothing saved yet</div>`;
            return;
        }
        customThemes.forEach((t, i) => {
            const row = document.createElement("div");
            row.style.cssText = "display:flex;align-items:center;gap:10px;padding:6px 0;border-bottom:1px solid #1e1e1e;";

            const swatch = document.createElement("div");
            const isColor = t.image.startsWith("#") || t.image.startsWith("rgb");
            swatch.style.cssText = "width:36px;height:36px;flex-shrink:0;border-radius:3px;background-size:cover;background-position:center;";
            if (isColor) swatch.style.backgroundColor = t.image;
            else swatch.style.backgroundImage = `url(${t.image})`;

            const label = document.createElement("span");
            label.textContent = t.name;
            label.style.cssText = "flex:1;font-size:13px;color:#ccc;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;letter-spacing:0.3px;";

            const delBtn = document.createElement("button");
            delBtn.textContent = "remove";
            delBtn.style.cssText = "background:none;color:#3a3a3a;border:none;font-size:11px;cursor:pointer;padding:0;font-family:MinibloxFont,sans-serif;letter-spacing:0.5px;transition:color 0.15s;";
            delBtn.addEventListener("mouseover", () => delBtn.style.color = "#e74c3c");
            delBtn.addEventListener("mouseout", () => delBtn.style.color = "#3a3a3a");
            delBtn.addEventListener("click", () => {
                const wasActive = ThemesDropdown.value === t.image;
                customThemes.splice(i, 1);
                saveCustomThemes();
                rebuildCustomOptions();
                renderCtList();
                if (wasActive || !Array.from(ThemesDropdown.options).some(o => o.value === ThemesDropdown.value)) {
                    const defaultVal = ThemesDropdown.options[0] ? ThemesDropdown.options[0].value : "#1a1a1a";
                    ThemesDropdown.value = defaultVal;
                    ui.style.animation = "";
                    ui.style.filter = "";
                    ui.classList.remove("unverified-rainbow-wrap");
                    applyTheme(defaultVal);
                }
                const warn = document.getElementById("ct-limit-warn");
                if (warn) warn.style.display = "none";
            });

            row.appendChild(swatch);
            row.appendChild(label);
            row.appendChild(delBtn);
            list.appendChild(row);
        });
    }

    const RAINBOW_CODE = "#unverifiedsecret2026";
    const RAINBOW_CSS = "linear-gradient(124deg,#ff2400,#e81d1d,#e8b71d,#e3e81d,#1de840,#1ddde8,#2b1de8,#dd00f3,#dd00f3)";

    function applyRainbow(el) {
        if (!document.getElementById("unverified-rainbow-style")) {
            const s = document.createElement("style");
            s.id = "unverified-rainbow-style";
            s.textContent = `
                @keyframes unverified-rainbow {
                    0%   { background-position: 0% 50%; }
                    50%  { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
            `;
            document.head.appendChild(s);
        }
        el.style.backgroundImage = "";
        el.style.backgroundColor = "";
        el.style.filter = "";
        el.classList.remove("unverified-rainbow-wrap");
        el.style.background = "linear-gradient(270deg,#ff0000,#ff7700,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000)";
        el.style.backgroundSize = "400% 400%";
        el.style.animation = "unverified-rainbow 4s ease infinite";
    }

    ctModal.addEventListener("input", (e) => {
        if (e.target.id !== "ct-bg") return;
        const val = e.target.value.trim();
        const prev = document.getElementById("ct-preview");
        if (!prev) return;
        prev.style.cssText = `
            width:100%;height:90px;margin-bottom:16px;
            border-radius:4px;box-sizing:border-box;overflow:hidden;
            display:flex;align-items:center;justify-content:center;
            font-size:12px;letter-spacing:1px;text-transform:uppercase;
        `;
        if (val.toLowerCase() === RAINBOW_CODE) {
            applyRainbow(prev);
            prev.textContent = "";
        } else if (val.startsWith("#") || val.startsWith("rgb")) {
            prev.style.background = "";
            prev.style.animation = "";
            prev.style.backgroundColor = val;
            prev.style.color = "rgba(255,255,255,0.4)";
            prev.textContent = val;
        } else if (val.startsWith("http")) {
            prev.style.background = "";
            prev.style.animation = "";
            prev.style.backgroundImage = `url(${val})`;
            prev.style.backgroundSize = "cover";
            prev.style.backgroundPosition = "center";
            prev.style.backgroundColor = "#1a1a1a";
            prev.style.color = "transparent";
            prev.textContent = "";
        } else {
            prev.style.background = "";
            prev.style.animation = "";
            prev.style.backgroundColor = "#1a1a1a";
            prev.style.color = "#333";
            prev.textContent = "no preview";
        }
    });

    addThemeBtn.addEventListener("click", () => {
        const nameIn = document.getElementById("ct-name");
        const bgIn   = document.getElementById("ct-bg");
        const prev   = document.getElementById("ct-preview");
        const warn   = document.getElementById("ct-limit-warn");
        if (nameIn) nameIn.value = "";
        if (bgIn)   bgIn.value   = "";
        if (prev) {
            prev.style.background = "#1a1a1a";
            prev.textContent = "no preview";
        }
        if (warn) warn.style.display = customThemes.length >= MAX_CUSTOM ? "block" : "none";
        renderCtList();
        openCtModal();
    });

    ctModal.addEventListener("click", (e) => {
        if (e.target.id === "ct-cancel-btn") {
            closeCtModal();
            return;
        }
        if (e.target.id === "ct-save") {
            const name = (document.getElementById("ct-name").value || "").trim();
            const bg   = (document.getElementById("ct-bg").value   || "").trim();
            const warn = document.getElementById("ct-limit-warn");
            if (!name || !bg) { alert("fill in both fields"); return; }
            if (customThemes.length >= MAX_CUSTOM) {
                if (warn) warn.style.display = "block";
                return;
            }
            customThemes.push({ name, image: bg });
            saveCustomThemes();
            rebuildCustomOptions();
            renderCtList();
            if (warn) warn.style.display = "none";
            ThemesDropdown.value = bg;
            if (bg.toLowerCase() === RAINBOW_CODE) {
                applyRainbow(ui);
            } else {
                ThemesDropdown.dispatchEvent(new Event("change"));
            }
            closeCtModal();
        }
    });
    updateLanguage();

    let uiVisible = false;
    function toggleUI() {
        if (uiVisible) {
            ui.style.display = "none";
            closeCtModal();
        } else {
            ui.style.display = "block";
        }
        uiVisible = !uiVisible;
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Shift" && event.location === 2) {
            toggleUI();
        }

        if (event.key === "Escape" && ctModal.style.display !== "none") {
            closeCtModal();
        }

        for (let moduleName in moduleBindings) {
            if (moduleBindings[moduleName] === event.key) {
                const now = Date.now();
                if (!lastKeyPressTime[moduleName] || now - lastKeyPressTime[moduleName] > 200) {
                    const moduleContainer = [...gridContainer.children].find(child => child.querySelector("h3").textContent === moduleName);
                    if (moduleContainer) {
                        moduleContainer.click();
                    }
                    lastKeyPressTime[moduleName] = now;
                }
            }
        }
    });

    closeButton.addEventListener("click", () => {
        ui.style.display = "none";
        closeCtModal();
        uiVisible = false;
    });

})();


(function() {
    'use strict';
    const originalRAF = window.requestAnimationFrame;
    window.requestAnimationFrame = function(callback) {
        return setTimeout(function() {
            callback(performance.now());
        }, 0);
    };
    console.log('Client Status: Great');
})();
