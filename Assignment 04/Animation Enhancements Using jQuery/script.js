$(document).ready(function () {
    // Start Game Animation
    $('#start-game').click(function () {
        $('#message').text("Game Started!").css({ color: "#27ae60" });
        $('#message').fadeIn(300).fadeOut(300).fadeIn(300);
    });

    // Bounce Animation for Player
    $('#bounce-effect').click(function () {
        // Shake before bouncing
        $('#player').effect("shake", { times: 3, distance: 5 }, 400, function () {
            // Bounce effect
            $(this).effect("bounce", { times: 5, distance: 30 }, 800, function () {
                // Play sound on bounce
                $('#score-sound')[0].play();
            });
        });
    });

    // Slide Animation for Obstacle
    $('#slide-effect').click(function () {
        $('#obstacle').animate({
            left: '+=50px'
        }, {
            duration: 1000,
            easing: 'swing',
            complete: function () {
                $(this).animate({ left: '-=50px' }, 1000);
            }
        });
    });

    // Game Over Visual Feedback
    $('#game-over').click(function () {
        // Change background to red with flash effect
        $('#game-board').css('background-color', '#e74c3c');
        $('#game-board').fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);

        // Display message
        $('#message').text("Game Over").css({ color: "#e74c3c" });
        $('#message').fadeIn(300).fadeOut(300).fadeIn(300);

        // Play Game Over sound
        $('#gameover-sound')[0].play();
    });
});
