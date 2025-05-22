// ==UserScript==
// @name         UnverifiedV2
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  :D
// @author       wytlines, DeadFish7, andreypidd, jet
// @match        https://miniblox.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

		// ===== Intro Loading Screen =====
		const container = document.createElement("div");
		Object.assign(container.style, {
			position: "fixed",
			top: 0, left: 0, width: "100vw", height: "100vh",
			display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
			backgroundColor: "black",
			overflow: "hidden", zIndex: 9999,
		});
		document.body.appendChild(container);
		const check = document.createElement("div");
		check.textContent = "✓";
		Object.assign(check.style, {
			color: "red", fontSize: "5rem", opacity: 0.05,
			transition: "opacity 1s ease, transform 1s ease",
			textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
		});
		const text1 = document.createElement("div");
		text1.textContent = "UnverifiedV2";
		Object.assign(text1.style, {
			color: "red", fontSize: "60px", opacity: 0,
			marginTop: "50px",
			transition: "opacity 0.8s ease",
			textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
		});
		const text2 = document.createElement("div");
		text2.textContent = "\nBy wytlines, DeadFish7\nandreypidd, jet";
		Object.assign(text2.style, {
			color: "red", fontSize: "30px", opacity: 0, transition: "opacity 0.8s ease",
			whiteSpace: 'pre-line',
			textAlign: "center",
			textShadow: '0 0 5px red, 0 0 10px red, 0 0 20px red',
		});
		const circle = document.createElement("div");
		Object.assign(circle.style, {
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
		circle.appendChild(check);
		container.appendChild(circle);
		container.appendChild(text1);
		container.appendChild(text2);
		// Sequence
		circle.style.opacity = 1;
		check.style.opacity = 1;
		setTimeout(() => {
			check.style.transform = "rotate(180deg)";
		}, 500);
		setTimeout(() => {
			text1.style.opacity = 1;
		}, 1000);
		setTimeout(() => {
			text2.style.opacity = 1;
		}, 1500);
		setTimeout(() => {
			container.style.transition = "opacity 1s ease";
			container.style.opacity = 0;
		}, 2500);
		setTimeout(() => {
			container.remove();
		}, 3000);

		// ===== Unverified Styling =====
		function setBG(bg) {
			let b1 = document.querySelector('img.chakra-image.css-rkihvp');
			if (b1) b1.src = bg;
			let b2 = document.querySelector('.chakra-image.css-mohuzh');
			if (b2) b2.src = bg;
		}
		function visuallyRemove(a) {
			if (!a) return;
			a.style.opacity = 0;
			a.style.zIndex = -1;
		}
		function addUnverifiedBanner() {
		  if (!document.getElementById('unverified-banner')) {
			  const e = document.createElement('div');
				e.textContent = 'UnverifiedV2\n\nBy wytlines, DeadFish7, andreypidd, jet'
				e.id = 'unverified-banner';
				e.style.whiteSpace = 'pre-line';
				e.style.textAlign = 'center';
				e.style.zIndex = 999;
				e.style.position = "absolute";
				e.style.top = "8.5%";
				e.style.left = "50%";
				e.style.transform = "translate(-50%, -50%)";
				e.style.padding = '10px 20px';
				e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
				e.style.color = 'white';
				e.style.border = '1px solid #D3D3D3';
				e.style.borderRadius = '12px';
				e.style.fontSize = '24px';
				e.style.cursor = 'pointer';
				e.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
				e.style.outline = 'none';
				e.style.boxShadow = 'none';
				e.addEventListener('focus', () => {
					e.style.outline = '2px solid #B0B0B0';
					e.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
				});
				e.addEventListener('blur', () => {
					e.style.outline = 'none';
					e.style.boxShadow = 'none';
				});
				e.addEventListener('mouseover', () => {
					e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
					e.style.transform = 'translate(-50%, -50%), scale(1.01)';
					e.style.top = "8.5%";
					e.style.left = "50%";
				});
				e.addEventListener('mouseout', () => {
					e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
					e.style.transform = 'translate(-50%, -50%), scale(1)';
					e.style.top = "8.5%";
					e.style.left = "50%";
				});
				document.body.appendChild(e);
			}
		}
		function removeUnverifiedBanner() {
			let x = document.getElementById('unverified-banner');
			if (x) {
				document.body.removeChild(x);
			}
		}
		function updUnverifiedBanner() {
		  if (isMainScreen()) {
				if (!document.getElementById('unverified-banner')) {
				  addUnverifiedBanner();
				}
			} else {
			  removeUnverifiedBanner();
			}
		}
		function isMainScreen() {
		  return getPlayButton() !== null;
		}
		function unverifiedStyling() {
			document.title = 'UnverifiedV2';
			setBG('https://w0.peakpx.com/wallpaper/810/395/HD-wallpaper-landscape-minecraft-shaders-minecraft.jpg');
			visuallyRemove(document.querySelector('.chakra-image.css-1je8qb9'));  // Miniblox logo
			visuallyRemove(document.querySelector('.chakra-stack.css-7kkhgi'));  // Discord button
			updShortcutMenu();
			updUnverifiedBanner();

			// general styling
		  const elements1 = [
				...document.querySelectorAll('.chakra-button.css-cuh8pi'),  // play button
				...document.querySelectorAll('.chakra-button.css-32lhf4'),  // left menu buttons
				...document.querySelectorAll('.chakra-button.css-5ov7ui'),  // signin button
				...document.querySelectorAll('.chakra-button.css-5ov7ui'),  // signin box
				...document.querySelectorAll('.chakra-button.css-18wnugv'), // customize button
				...document.querySelectorAll('.chakra-button.css-he6upe'),  // daily button
				...document.querySelectorAll('.chakra-button.css-1dkorm4'), // free coin button
				...document.querySelectorAll('.css-10y588r'),               // user info box
				...document.querySelectorAll('button.chakra-button.css-livqej'), // leave game button
				...document.querySelectorAll('button.chakra-button.css-1jg2qv0'), // Settings done button
				...document.querySelectorAll('div.css-aidfhd'),             // Dressing room profile
				...document.querySelectorAll('div.css-1kd330l'),            // Dressing room buttons
				...document.querySelectorAll('button.chakra-button.css-14mkusw'), // planet buttons
				...document.querySelectorAll('button.chakra-button.css-8q1apo'),  // back button
				...document.querySelectorAll('.css-1a6laq6'),               // sliders outer part
				...document.querySelectorAll('button.chakra-button.css-1axaj8o'),  // invite+exit quick-launch buttons
				...document.querySelectorAll('button.chakra-button.css-xircll'),  // left menu back button
			];
			elements1.forEach(e => {
				e.style.padding = '10px 20px';
				e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
				e.style.color = 'white';
				e.style.border = '1px solid #D3D3D3';
				e.style.borderRadius = '12px';
				e.style.fontSize = '16px';
				e.style.cursor = 'pointer';
				e.style.transition = 'background-color 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease';
				e.style.outline = 'none';
				e.style.boxShadow = 'none';
				e.addEventListener('focus', () => {
					e.style.outline = '2px solid #B0B0B0';
					e.style.boxShadow = '0 0 5px rgba(176, 176, 176, 0.6)';
				});
				e.addEventListener('blur', () => {
					e.style.outline = 'none';
					e.style.boxShadow = 'none';
				});
				e.addEventListener('mouseover', () => {
					e.style.backgroundColor = 'rgba(185, 185, 185, 0.4)';
					e.style.transform = 'scale(1.01)';
				});
				e.addEventListener('mouseout', () => {
					e.style.backgroundColor = 'rgba(211, 211, 211, 0.4)';
					e.style.transform = 'scale(1)';
				});
			});
			// specific styling
			const elements2 = [...document.querySelectorAll('button.chakra-button.css-1axaj8o')];  // invite+exit quick-launch buttons
			elements2.forEach(e => {
				e.style.fontSize = '24px';
				e.style.padding = '1px 1px';
			});
			const elements3 = [...document.querySelectorAll('.chakra-slider')]; // slider inner part
			elements3.forEach(e => {
				e.style.padding = '1px 1px';
			});
			const elements4 = [...document.querySelectorAll('.chakra-button.css-cuh8pi')];  // play button
			elements4.forEach(e => {
				e.style.fontSize = '20px';
			});
		};

		let mainScreenStyleInterval = setInterval(() => {
			unverifiedStyling();
		}, 50);  
		// TODO: only use one efficient main interval for looping main screen, pause / cancel when ingame
		// potentially use event listeners as well to call run

		// === Shortcut Menu Buttons ===  
		function getPlayButton() {
		  return document.querySelector('.chakra-button.css-cuh8pi');
		}
		function getExitButton() {
			// called when on games page; exit button -> main screen
			return document.querySelectorAll('.chakra-button.css-1axaj8o')[1];
		}
		function getKitPVPButton() {
			return document.querySelector('.css-1idq8wm .chakra-text');
		}
		function getSkywarsButton() {
		  return document.querySelector('.css-rsqc3q');
		}
		function getDoublesButton() {
		  return document.querySelector('.css-6umr0e .chakra-text');
		}
		function getQuadsButton() {
		  return document.querySelector('.css-sbvzy .chakra-text');
		}
		// Add shortcut menu
		const container1 = document.createElement("div");
		Object.assign(container1.style, {
			position: "absolute",
			top: "85%",
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
		const onclicks = [
			() => {
				console.log('poo');
				getPlayButton().click();
				setTimeout(() => getKitPVPButton().click(), 50);
			},
			() => {
				getPlayButton().click();
				setTimeout(() => getSkywarsButton().click(), 50);
				document.body.removeChild(container1);
			},
			() => {
				getPlayButton().click();
				setTimeout(() => getDoublesButton().click(), 50);
				document.body.removeChild(container1);
			},
			() => {
				getPlayButton().click();
				setTimeout(() => getQuadsButton().click(), 50);
				document.body.removeChild(container1);
			},
		];
		let i = 0;
		["KitPVP", "Skywars", "Doubles", "Quads"].forEach(label => {
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
			button.addEventListener('click', onclicks[i++]);
			container1.appendChild(button);
		});
		function addShortcutMenu() {
			document.body.appendChild(container1);
		}
		function removeShortcutMenu() {
			document.body.removeChild(container1);
		}
		function updShortcutMenu() {
			if (isMainScreen()) {
				if (!container1.parentNode) {
					addShortcutMenu();
				}
			} else if (container1.parentNode) {
			  removeShortcutMenu();
			}
		}
		// ===== =====

		// ===== Client Interface Creation =====
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
    `;
    document.head.appendChild(style);

    const ui = document.createElement("div");
    ui.style.position = "absolute";
    ui.style.top = "50%";
    ui.style.left = "50%";
    ui.style.transform = "translate(-50%, -50%)";
    ui.style.backgroundColor = "#1a1a1a";
    ui.style.color = "white";
    ui.style.padding = "30px";
    ui.style.borderRadius = "15px";
    ui.style.display = "none";
    ui.style.zIndex = "9999";
    ui.style.textAlign = "center";
    ui.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.7)";
    ui.style.fontFamily = 'MinibloxFont, sans-serif';
    document.body.appendChild(ui);

    const title = document.createElement("h2");
    title.textContent = "UnverifiedV2";
    title.style.fontSize = "36px";
    title.style.color = "#e74c3c";
    title.style.fontFamily = 'MinibloxFont, sans-serif';
    ui.appendChild(title);

    const gridContainer = document.createElement("div");
    gridContainer.style.display = "grid";
    gridContainer.style.gridTemplateColumns = "repeat(3, 1fr)";
    gridContainer.style.gridGap = "20px";
    gridContainer.style.marginTop = "20px";
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
        moduleContainer.style.padding = "20px";
        moduleContainer.style.borderRadius = "10px";
        moduleContainer.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        moduleContainer.style.cursor = "pointer";
        moduleContainer.style.transition = "border-color 0.3s ease";
        moduleContainer.style.border = "5px solid transparent";
        moduleContainer.classList.add('module-container');

        const moduleTitle = document.createElement("h3");
        moduleTitle.textContent = name;
        moduleTitle.style.color = "#e74c3c";
        moduleTitle.style.fontSize = "24px";
        moduleContainer.appendChild(moduleTitle);

        const moduleDescription = document.createElement("p");
        moduleDescription.textContent = description;
        moduleDescription.style.color = "#bdc3c7";
        moduleDescription.style.fontSize = "14px";
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
        notification.textContent = message;
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

                const keystrokescontainer = document.createElement('div');
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
                    top: '110px', left: '30px', width: '79px'
                });
                const rmb = createKey('RMB', {
                    top: '110px', left: '190px', width: '79px'
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
            // 🔼 INSERT your "off" code here
            console.log("Keystrokes module disabled");
        }
    });

    createModule("FPS Counter", "Shows the frames per second (FPS) of the game.");
    createModule("CPS Counter", "Counts how many times you click per second.");
    createModule("Hitboxes", "Visualizes the hitboxes of players or objects.");
    createModule("Ping Counter", "Shows the latency between your client and the server.");
    createModule("Armor HUD", "Displays the current armor stats of your character.");
    createModule("FPS Booster", "Changes settings to improve FPS");
    createModule("Render Dist. Bypasser", "Allow you to change your render distance past the limit.");
    createModule("Session Information", "Display information about your session such as => amount of clicks, amount of key presss.");

    const closeButton = document.createElement("button");
    closeButton.textContent = "Close UI";
    closeButton.style.backgroundColor = "#e74c3c";
    closeButton.style.color = "white";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.fontSize = "18px";
    closeButton.style.marginTop = "20px";
    closeButton.style.cursor = "pointer";
    ui.appendChild(closeButton);

    const ThemesDropdown = document.createElement("select");

    ThemesDropdown.style.backgroundColor = "#e74c3c";
    ThemesDropdown.style.color = "white";
    ThemesDropdown.style.border = "none";
    ThemesDropdown.style.borderRadius = "5px";
    ThemesDropdown.style.padding = "10px 20px";
    ThemesDropdown.style.fontSize = "18px";
    ThemesDropdown.style.marginTop = "20px";
    ThemesDropdown.style.cursor = "pointer";
    
    // Define themes with names and background image URLs
    const themes = [
        { name: "test1", image: "none" },
        { name: "test2", image: "https://media1.tenor.com/m/mn2d2liDsmUAAAAC/ichigo-bleach.gif" },
        { name: "test3", image: "https://wallpaperaccess.com/full/174768.jpg" },
        { name: "test4", image: "https://wallpaperaccess.com/full/185084.jpg" },
        { name: "test5", image: "https://wallpaperaccess.com/full/317501.jpg" }
    ];
    
    // Populate dropdown with theme options
    themes.forEach(theme => {
        const option = document.createElement("option");
        option.value = theme.image;
        option.textContent = theme.name;
        ThemesDropdown.appendChild(option);
    });
    
    // On theme change, set UI background image
    ThemesDropdown.addEventListener("change", (e) => {
        const image = e.target.value;
        if (image === "none") {
            ui.style.background = ""; // Reset
        } else {
            ui.style.backgroundImage = `url(${image})`;
            ui.style.backgroundSize = "cover";
            ui.style.backgroundPosition = "center";            
        }
    });
    
    ui.appendChild(ThemesDropdown);
    

    let uiVisible = false;
    function toggleUI() {
				if (uiVisible) {
					ui.style.display = "none";
				} else {
					ui.style.display = "block";
				}
        uiVisible = !uiVisible;
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Shift" && event.location === 2) {
            toggleUI();
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
        uiVisible = false;
    });

		// === Initialized Notif ===
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
		// === ===

		// ===== =====
})();

// ===== FPS Boosting =====
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
// ===== =====

