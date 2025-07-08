document.addEventListener('DOMContentLoaded', function() {
    // Set current year in the footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Image Modal Logic for My Designs section
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close-button")[0];

    // Get all images within the thumbnails grid
    document.querySelectorAll('.thumbnails img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            // Use alt text for caption, or you could add a data-caption attribute to your images
            captionText.innerHTML = this.alt; // Using alt for caption
        });
    });

    // Close the modal when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close the modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) { // Ensure click is directly on the modal background
                modal.style.display = "none";
            }
        });
    }

    // Scroll Animation (fade-hidden/fade-visible)
    // This will make elements with the 'fade-hidden' class fade in as they scroll into view.
    const faders = document.querySelectorAll('.fade-hidden');
    const appearOptions = {
        threshold: 0.1, // Element is 10% in view
        rootMargin: "0px 0px -50px 0px" // Adjusts when the element appears slightly earlier/later
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Not in view yet
            } else {
                entry.target.classList.add('fade-visible'); // Add visible class for animation
                // Note: We don't remove 'fade-hidden' here; CSS handles visibility via 'fade-visible'
                appearOnScroll.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        // Ensure elements start hidden if JS is enabled and observed
        // Only observe if it's not already visible (e.g., in viewport on page load)
        if (fader.getBoundingClientRect().top > window.innerHeight) { // Check if below initial viewport
            fader.classList.add('fade-hidden');
            appearOnScroll.observe(fader);
        } else {
            fader.classList.add('fade-visible'); // If already in viewport on load, show immediately
        }
    });
});
