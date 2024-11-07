$(document).ready(function () {
    let playerScore = 0;

    // Load previous game state
    function loadGame() {
        const gameData = JSON.parse(localStorage.getItem('gameData'));
        if (gameData) {
            $('#player').css({ left: gameData.playerPosition });
            $('#obstacle').css({ left: gameData.obstaclePosition });
            playerScore = gameData.score;
            $('#message').text("Game Loaded! Score: " + playerScore);
            updateLeaderboard();
        } else {
            $('#message').text("No saved game found.");
        }
    }

    // Save game progress
    $('#save-game').click(function () {
        const gameData = {
            playerPosition: parseInt($('#player').css('left')),
            obstaclePosition: parseInt($('#obstacle').css('left')),
            score: playerScore
        };
        localStorage.setItem('gameData', JSON.stringify(gameData));
        $('#message').text("Game Saved!");
    });

    // Start Game Animation
    $('#start-game').click(function () {
        $('#message').text("Game Started!").css({ color: "#27ae60" });
        $('#message').fadeIn(300).fadeOut(300).fadeIn(300);
    });

    // Bounce Animation for Player
    $('#bounce-effect').click(function () {
        $('#player').effect("bounce", { times: 3, distance: 30 }, 800, function () {
            $('#score-sound')[0].play();
            playerScore += 10; // Increment score
            updateLeaderboard();
        });
    });

    // Slide Animation for Obstacle
    $('#slide-effect').click(function () {
        const obstacle = $('#obstacle');
        const currentLeft = parseInt(obstacle.css('left'), 10);
        const newLeft = currentLeft + 50; 

        if (newLeft <= ($('#game-board').width() - obstacle.width())) {
            obstacle.animate({ left: newLeft }, {
                duration: 1000,
                easing: 'swing',
                complete: function () {
                    $(this).animate({ left: currentLeft }, 1000);
                }
            });
        }
    });

    // Game Over Visual Feedback
    $('#game-over').click(function () {
        $('#game-board').css('background-color', '#e74c3c');
        $('#game-board').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
        $('#message').text("Game Over").css({ color: "#e74c3c" }).fadeIn(300).fadeOut(300).fadeIn(300);
        $('#gameover-sound')[0].play();
        playerScore = 0; // Reset score on game over
        updateLeaderboard();
    });

    // Update Leaderboard
    function updateLeaderboard() {
        $('#score-list').empty();
        // Ideally, you would fetch this data from a server
        const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
        leaderboardData.push({ score: playerScore });
        leaderboardData.sort((a, b) => b.score - a.score); // Sort by score
        leaderboardData.slice(0, 5).forEach(function (entry) {
            $('#score-list').append('<li>' + entry.score + '</li>');
        });
        localStorage.setItem('leaderboard', JSON.stringify(leaderboardData));
    }

    // Load the game on page load
    loadGame();
});
