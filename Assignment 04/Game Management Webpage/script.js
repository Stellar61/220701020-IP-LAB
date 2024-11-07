$(document).ready(function () {
    let players = [];
    let gamesPlayed = 0;
    let totalScore = 0;
    let highestScore = 0;

    // Game Settings Application
    $('#apply-settings').click(function () {
        const difficulty = $('#difficulty').val();
        const speed = $('#speed').val();
        const theme = $('#theme').val();

        alert(`Settings applied: \nDifficulty: ${difficulty} \nSpeed: ${speed} \nTheme: ${theme}`);
        applyTheme(theme);
    });

    function applyTheme(theme) {
        if (theme === 'dark') {
            $('body').css('background-color', '#333');
            $('section').css('background-color', '#555');
        } else if (theme === 'light') {
            $('body').css('background-color', '#fff');
            $('section').css('background-color', '#f4f4f4');
        } else {
            $('body').css('background-color', '#f4f4f4');
            $('section').css('background-color', '#fff');
        }
    }

    // Add Player and Update Scoreboard
    $('#add-player').click(function () {
        const playerName = $('#player-name').val();
        if (playerName === '') {
            alert('Please enter a player name.');
            return;
        }

        const playerScore = Math.floor(Math.random() * 100); // Random score for example
        players.push({ name: playerName, score: playerScore });
        updateScoreboard();
        $('#player-name').val('');
    });

    function updateScoreboard() {
        $('#scoreboard').empty();
        players.forEach(player => {
            $('#scoreboard').append(`<li>${player.name} - ${player.score}</li>`);
        });
        updateStatistics();
    }

    function updateStatistics() {
        gamesPlayed = players.length;
        highestScore = Math.max(...players.map(p => p.score), 0);
        totalScore = players.reduce((sum, player) => sum + player.score, 0);
        const averageScore = gamesPlayed > 0 ? (totalScore / gamesPlayed).toFixed(2) : 0;

        $('#games-played').text(gamesPlayed);
        $('#highest-score').text(highestScore);
        $('#average-score').text(averageScore);
    }

    // Reset Scores
    $('#reset-scores').click(function () {
        players = [];
        updateScoreboard();
    });

    // Admin Controls - Start, Pause, Restart Game
    $('#start-game').click(function () {
        $('#game-status').text('Ongoing');
    });

    $('#pause-game').click(function () {
        $('#game-status').text('Paused');
    });

    $('#restart-game').click(function () {
        $('#game-status').text('Ongoing');
        players = [];
        updateScoreboard();
    });

    $('#clear-scores').click(function () {
        players = [];
        updateScoreboard();
    });
});
