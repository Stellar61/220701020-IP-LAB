$(document).ready(function() {
    let score = 0;
    let gameInterval;
    let isGamePaused = false;

    // Start the game
    $("#start-game").click(function() {
        if (isGamePaused) {
            isGamePaused = false;
            return;
        }
        startGame();
    });

    // Pause the game
    $("#pause-game").click(function() {
        clearInterval(gameInterval);
        isGamePaused = true;
    });

    // Game logic: move the ball randomly and track clicks
    function startGame() {
        gameInterval = setInterval(function() {
            let x = Math.random() * ($("#game-area").width() - $("#ball").width());
            let y = Math.random() * ($("#game-area").height() - $("#ball").height());
            $("#ball").animate({ left: x, top: y }, 1000);
        }, 1500);
        
        $("#ball").click(function() {
            score++;
            $("#score").text(score);
        });
    }
});
