(function autoScroll() {
    let lastScrollHeight = document.body.scrollHeight;
    let loadCheckTimer;
    let scrollCount = 0;            // Track number of scrolled posts
    let scrolledPostIds = [];       // Store scrolled post IDs

    const scrollInterval = setInterval(() => {
        // Scroll down to the bottom
        window.scrollTo(0, document.body.scrollHeight);

        // Select all posts on the page
        let posts = document.querySelectorAll('.post');  // Adjust '.post' to the correct post class or selector

        // Iterate over the posts and check if they've been scrolled
        posts.forEach(post => {
            let postId = post.id;   // Assuming posts have unique 'id' attributes
            if (!scrolledPostIds.includes(postId)) {
                scrolledPostIds.push(postId);  // Record scrolled post IDs
                scrollCount++;                 // Increment scrolled post count
                console.log(`Scrolled Post ID: ${postId}`);
            }
        });

        console.log(`Total Posts Scrolled: ${scrollCount}`);

        // Check if the page height has changed after a delay (to allow for loading)
        clearTimeout(loadCheckTimer);  // Reset the loading check timer
        loadCheckTimer = setTimeout(() => {
            let newScrollHeight = document.body.scrollHeight;

            // If no new content is loaded (scroll height hasn't changed), stop scrolling
            if (newScrollHeight === lastScrollHeight) {
                console.log("No more posts to load. Reached the bottom.");
                clearInterval(scrollInterval);  // Stop the scrolling
                console.log(`Final Scroll Count: ${scrollCount}`);
                console.log(`Scrolled Post IDs: ${scrolledPostIds.join(', ')}`);
            } else {
                // Update last scroll height and continue scrolling
                lastScrollHeight = newScrollHeight;
            }
        }, 1500);  // Wait 1.5 seconds to allow posts to load
    }, 1000);  // Scroll every second
})();
