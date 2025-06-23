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
            antiAfkBox.style.position = "fixed";
            antiAfkBox.style.top = "20px";
            antiAfkBox.style.right = "20px";
            antiAfkBox.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            antiAfkBox.style.color = "white";
            antiAfkBox.style.fontFamily = "monospace";
            antiAfkBox.style.padding = "10px 15px";
            antiAfkBox.style.borderRadius = "8px";
            antiAfkBox.style.zIndex = "9999";
            antiAfkBox.style.cursor = "move";
            antiAfkBox.style.userSelect = "none";
            antiAfkBox.textContent = "Anti-AFK: 5";

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

            let countdown = 5;

            antiAfkInterval = setInterval(() => {
                countdown--;
                antiAfkBox.textContent = `Anti-AFK: ${countdown}`;

                if (countdown <= 0) {
                    const keys = [
                        ['w', 'KeyW', 87],
                        ['a', 'KeyA', 65],
                        ['s', 'KeyS', 83],
                        ['d', 'KeyD', 68],
                        [' ', 'Space', 32]
                    ];

                    keys.forEach(([key, code, keyCode], i) => {
                        setTimeout(() => simulateKeyPress(key, code, keyCode), i * 500);
                    });

                    countdown = 5;
                }
            }, 1000);
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
