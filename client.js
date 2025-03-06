// ==UserScript==
// @name         client w good gui
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  lols
// @author       wytlines
// @match        https://miniblox.io/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
            background-color: #34495e;
            border-radius: 10px;
            z-index: 10000;
            opacity: 0;
            transition: top 1s ease, opacity 1s ease;
        }
        .other-notification {
            font-family: 'MinibloxFont', sans-serif;
            font-size: 16px;
            color: #e74c3c;
            background-color: #34495e;
            padding: 10px 20px;
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
    title.textContent = "Unverified Client";
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
        moduleContainer.style.backgroundColor = "#2c3e50";
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

    createModule("Keystrokes", "Displays the keys you press in real-time.");
    createModule("FPS Counter", "Shows the frames per second (FPS) of the game.");
    createModule("CPS Counter", "Counts how many times you click per second.");
    createModule("Hitboxes", "Visualizes the hitboxes of players or objects.");
    createModule("Ping Counter", "Shows the latency between your client and the server.");
    createModule("Armor HUD", "Displays the current armor stats of your character.");
    createModule("FPS Booster", "Changes settings to improve FPS");
    createModule("Render Dist. Bypasser", "Allow you to change your render distance past the limit.");

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

    let uiVisible = false;
    function toggleUI() {
        ui.style.display = uiVisible ? "none" : "block";
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

    const initializedNotification = document.createElement("div");
    initializedNotification.classList.add('initialized-notification');
    initializedNotification.textContent = "Unverified Client Initialized";
    document.body.appendChild(initializedNotification);

    setTimeout(() => {
        initializedNotification.style.top = "10px";
        initializedNotification.style.opacity = "1";
    }, 10);

    setTimeout(() => {
        initializedNotification.style.top = "-50px";
        initializedNotification.style.opacity = "0";
    }, 2000);

})();
