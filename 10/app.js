$(document).ready(function() {
    var width = screen.width - 100;
    var height = screen.height - 200;

    function getRandomAlphabet() {
        var keyCode = Math.floor(Math.random() * (90 - 65 + 1)) + 65; 
        return String.fromCharCode(keyCode);
    }

    function getRandomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function createBubble() {
        var alphabet = getRandomAlphabet();
        var color = getRandomColor();
        var bubble = $(`<div class="bubble">${alphabet}</div>`);
        bubble.css({
            left: Math.random() * width,
            top: Math.random() * height,
            backgroundColor: color
        });
        $('body').append(bubble);
    }

    setInterval(createBubble, 1000);

    $(document).keydown(function(event) {
        // Check if the pressed key is an alphabet key (A-Z)
        if (event.keyCode >= 65 && event.keyCode <= 90) {
            // Get the corresponding alphabet character
            var alphabet = String.fromCharCode(event.keyCode);
            console.log(`You pressed ${alphabet}!`);
        }
    });
});
