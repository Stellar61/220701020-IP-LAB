$(document).ready(function () {
    // Initialize Bootstrap carousel with autoplay
    $('.carousel').carousel({
        interval: 5000, // Autoplay every 5 seconds
        pause: 'hover'  // Pause on hover
    });

    // Handle newsletter subscription form submission
    $('#newsletter-form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get the email input value
        const email = $(this).find('input[type="email"]').val();

        // Simple validation for email format
        if (validateEmail(email)) {
            alert(`Thank you for subscribing with ${email}!`);
            $(this).find('input[type="email"]').val(''); // Clear the input field
        } else {
            alert('Please enter a valid email address.');
        }
    });

    // Validate email function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // Handle comment submission
    $('.comment-form').on('submit', function (e) {
        e.preventDefault(); // Prevent the default form submission

        const commentText = $(this).find('textarea').val();
        const commentSection = $(this).closest('.blog-post').find('.comments-list');

        if (commentText) {
            const newComment = $('<li class="list-group-item"></li>').text(commentText);
            commentSection.append(newComment);
            $(this).find('textarea').val(''); // Clear the textarea
        } else {
            alert('Please enter a comment.');
        }
    });

    // Add reaction functionality
    $('.reaction-button').on('click', function () {
        const reactionType = $(this).data('reaction');
        alert(`You reacted with: ${reactionType}`);
    });

    // Load more posts functionality
    $('#load-more').on('click', function () {
        // This is just a placeholder; you would typically fetch more posts from the server
        const morePosts = `
            <div class="col-md-4">
                <div class="card mb-4">
                    <img src="images/post3.jpg" class="card-img-top" alt="Post 3">
                    <div class="card-body">
                        <h5 class="card-title">New Blog Post</h5>
                        <p class="card-text">This is a description for the new blog post.</p>
                        <a href="#" class="btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        `;
        $('#blog-posts').append(morePosts);
    });
});
