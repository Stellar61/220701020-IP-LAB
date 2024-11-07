$(document).ready(function () {
    // Game state variables
    let score = 0;
    let isJumping = false;
    let cactusSpeed = 5; // Initial speed of the cactus
    let gameInterval; // Store the game interval
    let maxPlayers = 2; // Default max players
    let currentPlayers = 0; // Track current number of players
    let gameRunning = false; // Track if the game is running
    let jumpHeight = 100; // Height of the jump
    let jumpDuration = 300; // Duration of the jump
    let speedIncreaseInterval = 5000; // Time interval to increase speed
    let speedIncreaseAmount = 0.5; // Amount to increase the speed
    let gameOverSound = $('#game-over-sound')[0];
    let scoreSound = $('#score-sound')[0];
    let jumpSound = $('#jump-sound')[0];

    // UI Elements
    const $cactus = $('#cactus');
    const $dinosaur = $('#dinosaur');
    const $controls = $('#controls');
    const $scoreboard = $('#scoreboard');
    const $scoreDisplay = $('#score');

    // Function to start the game
    function startGame() {
        if (gameRunning) return; // Prevent starting a new game if one is already running
        resetGame(); // Reset game state
        currentPlayers++;

        // Check if maximum players reached
        if (currentPlayers <= maxPlayers) {
            gameRunning = true; // Set game running state
            gameInterval = setInterval(moveCactus, 30); // Move cactus every 30ms
            setInterval(increaseCactusSpeed, speedIncreaseInterval); // Increase speed every 5 seconds
            $controls.hide();
            $scoreboard.show();
        } else {
            alert("Max players reached!");
        }
    }

    // Function to reset the game state
    function resetGame() {
        $cactus.css('right', '-50px'); // Reset cactus position
        score = 0;
        $scoreDisplay.text(score);
        currentPlayers = 0; // Reset current players count
        isJumping = false; // Reset jumping state
        gameRunning = false; // Reset game running state
        cactusSpeed = 5; // Reset cactus speed
        $dinosaur.css('bottom', '0px'); // Reset dinosaur position
    }

    // Function to move cactus across the screen
    function moveCactus() {
        let cactusPosition = parseInt($cactus.css('right'));

        // If the cactus reaches the right side of the container
        if (cactusPosition >= 600) {
            cactusPosition = -50; // Reset to off-screen
            score++;
            $scoreDisplay.text(score);
            scoreSound.play(); // Play score sound
        }

        $cactus.css('right', cactusPosition + cactusSpeed + 'px');

        // Check for collision
        if (detectCollision(cactusPosition) && !isJumping) {
            endGame();
        }
    }

    // Function to detect collision
    function detectCollision(cactusPosition) {
        // Define collision range
        const dinoPosition = parseInt($dinosaur.css('bottom'));
        const dinoWidth = $dinosaur.width();
        const cactusWidth = $cactus.width();

        // Check if dinosaur is in collision range with cactus
        return (cactusPosition > 50 && cactusPosition < (50 + dinoWidth) && dinoPosition < jumpHeight);
    }

    // Function for jumping
    function jump() {
        if (isJumping || !gameRunning) return; // Prevent double jump
        isJumping = true;
        jumpSound.play(); // Play jump sound
        $dinosaur.animate({ bottom: `+=${jumpHeight}px` }, jumpDuration)
            .animate({ bottom: '0px' }, jumpDuration, function () {
                isJumping = false;
            });
    }

    // Function to increase the speed of the cactus
    function increaseCactusSpeed() {
        cactusSpeed += speedIncreaseAmount; // Increase speed
        if (cactusSpeed > 20) {
            cactusSpeed = 20; // Cap the speed
        }
    }

    // Function to end the game
    function endGame() {
        clearInterval(gameInterval);
        gameRunning = false; // Set game running state to false
        $controls.show();
        $scoreboard.hide();
        gameOverSound.play(); // Play game over sound
        alert("Game Over! Your score: " + score);
        resetGame(); // Reset the game state after game over
    }

    // Event Listeners
    $('#start-game').click(startGame);
    $('#jump').click(jump);
    $('#save-game').click(function () {
        const gameData = {
            score: score,
            cactusPosition: parseInt($cactus.css('right')),
            currentPlayers: currentPlayers,
            cactusSpeed: cactusSpeed // Save the current speed
        };
        localStorage.setItem('gameData', JSON.stringify(gameData));
        alert("Game Saved!");
    });

    $('#load-game').click(function () {
        const gameData = JSON.parse(localStorage.getItem('gameData'));
        if (gameData) {
            score = gameData.score;
            $scoreDisplay.text(score);
            $cactus.css('right', gameData.cactusPosition + 'px');
            currentPlayers = gameData.currentPlayers;
            cactusSpeed = gameData.cactusSpeed; // Load the saved speed
            alert("Game Loaded! Score: " + score);
        } else {
            alert("No saved game found.");
        }
    });

    $('#set-max-players').click(function () {
        const newMaxPlayers = parseInt($('#max-players').val());
        if (!isNaN(newMaxPlayers) && newMaxPlayers > 0) {
            maxPlayers = newMaxPlayers;
            alert("Max Players set to " + maxPlayers);
        } else {
            alert("Please enter a valid number of players.");
        }
    });

    // Allow jump with space key or up arrow
    $(document).keydown(function (event) {
        if (event.key === " " || event.key === "ArrowUp") {
            jump();
        }
    });

    // Set interval to update game state
    setInterval(function () {
        if (gameRunning) {
            moveCactus();
        }
    }, 30); // Ensure the cactus is moved every 30 ms
});
