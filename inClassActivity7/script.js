// Game state variables
let clickCount = 0;
let currentLevel = 1;
let timeout = 500; // Starting timeout in ms
const clicksPerLevel = 3;
const maxLevel = 6;
let moveTimeout;

// Initialize the game when the window loads
window.onload = function() {
    const button = document.getElementById('game_button');
    button.addEventListener('mouseover', handleHover);
    updateButtonText();
};

// Update the button text to show current level
function updateButtonText() {
    const button = document.getElementById('game_button');
    button.value = `Level ${currentLevel}: Click me!`;
}

// Generate a random position within the viewport
function getRandomPosition() {
    const button = document.getElementById('game_button');
    
    // Get viewport dimensions (accounting for the button size)
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    
    // Generate random coordinates
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    
    return { x: randomX, y: randomY };
}

// Move the button to a random position
function moveButton() {
    const button = document.getElementById('game_button');
    const position = getRandomPosition();
    
    button.style.position = 'absolute';
    button.style.left = position.x + 'px';
    button.style.top = position.y + 'px';
}

// Handle mouseover events
function handleHover() {
    // Clear any existing timeout to prevent multiple movements
    if (moveTimeout) {
        clearTimeout(moveTimeout);
    }
    
    // Set timeout based on current level
    moveTimeout = setTimeout(() => {
        moveButton();
    }, timeout);
}

// Main game function called when button is clicked
function gameFunction() {
    // Move the button immediately on click
    moveButton();
    
    // Increment click counter
    clickCount++;
    
    // Check if player should advance to the next level
    if (clickCount >= clicksPerLevel) {
        advanceLevel();
    }
}

// Advance to the next level
function advanceLevel() {
    currentLevel++;
    clickCount = 0;
    
    // Decrease timeout by 100ms for each level
    timeout -= 100;
    
    // Update the button text
    updateButtonText();
    
    // Check if the game is completed
    if (currentLevel > maxLevel) {
        endGame();
        return;
    }
    
    // Alert the player about the level change
    alert(`Congratulations! You've advanced to Level ${currentLevel}!`);
}

// End the game
function endGame() {
    const button = document.getElementById('game_button');
    
    // Remove event listeners
    button.removeEventListener('mouseover', handleHover);
    button.onclick = null;
    
    // Update button
    button.value = "Game Completed!";
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.top = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    
    // Show completion message
    alert("Congratulations! You've completed all levels!");
}