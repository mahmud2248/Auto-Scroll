(function autoScroll() {
    let lastScrollHeight = document.body.scrollHeight;
    let loadCheckTimer;
    let scrollCount = 0;           // Track number of scrolled posts
    let scrolledPostIds = [];      // Store scrolled post IDs

    const scrollInterval = setInterval(() => {
        // Scroll down to the bottom
        window.scrollTo(0, document.body.scrollHeight);

        // Select all posts on the page
        let posts = document.querySelectorAll('.post');  // Change '.post' to the correct selector for your posts

        posts.forEach(post => {
            let postId = post.getAttribute('id');  // Assuming posts have 'id' attribute

            // Check if the post has already been scrolled
            if (postId && !scrolledPostIds.includes(postId)) {
                scrolledPostIds.push(postId);  // Add post ID to the array
                scrollCount++;                 // Increment the count of scrolled posts
                console.log(`Scrolled Post ID: ${postId}`);
            }
        });

        // Log the total count of posts scrolled so far
        console.log(`Total Posts Scrolled: ${scrollCount}`);

        // Check if new content has loaded after scrolling
        clearTimeout(loadCheckTimer);  // Clear the previous load check
        loadCheckTimer = setTimeout(() => {
            let newScrollHeight = document.body.scrollHeight;

            // If the scroll height has not changed, stop the auto scroll
            if (newScrollHeight === lastScrollHeight) {
                console.log("No more posts to load. Reached the bottom.");
                clearInterval(scrollInterval);  // Stop auto scrolling
                console.log(`Final Scroll Count: ${scrollCount}`);
                console.log(`Scrolled Post IDs: ${scrolledPostIds.join(', ')}`);
            } else {
                // Update last scroll height for the next iteration
                lastScrollHeight = newScrollHeight;
            }
        }, 1500);  // Delay to allow content to load
    }, 1000);  // Scroll every second
})();
