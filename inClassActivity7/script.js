let level = 1;
let clickCount = 0;
let timeout = 500;
let moveInterval = null;

function getRandomPosition() {
    const button = document.getElementById("game_button");
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
}

function moveButtonRandomly() {
    const button = document.getElementById("game_button");
    const { x, y } = getRandomPosition();
    button.style.position = "absolute";
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

function gameFunction() {
    clickCount++;

    moveButtonRandomly();

    if (clickCount >= 3) {
        clickCount = 0;
        level++;
        timeout = Math.max(0, timeout - 100);
        alert(`Level up! You are now on level ${level}`);
        
        if (moveInterval) {
            clearInterval(moveInterval);
        }

        // Set up hover-triggered movement if not impossible level
        if (timeout > 0 && level <= 6) {
            const button = document.getElementById("game_button");
            button.onmouseenter = () => {
                if (moveInterval) clearInterval(moveInterval);
                moveInterval = setInterval(moveButtonRandomly, timeout);
            };
            button.onmouseleave = () => {
                if (moveInterval) clearInterval(moveInterval);
            };
        } else {
            alert("Level 6! This level is impossible 😈");
        }
    }
}