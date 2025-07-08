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

    // Get all images within the thumbnails grid's gallery-item class
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "flex"; // Use flex to center the modal content
            modalImg.src = this.src;
            // Use alt text for caption, which contains the full title and a brief description
            captionText.innerHTML = this.alt;
        });
    });

    // Close the modal when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // Close the modal when clicking outside the image or caption
    if (modal) {
        modal.addEventListener('click', function(event) {
            // Check if the click occurred directly on the modal background
            if (event.target === modal) {
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
                appearOnScroll.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        // Only observe if it's not already visible (e.g., in viewport on page load)
        if (fader.getBoundingClientRect().top > window.innerHeight) { // Check if below initial viewport
            fader.classList.add('fade-hidden'); // Ensure it starts hidden
            appearOnScroll.observe(fader);
        } else {
            fader.classList.add('fade-visible'); // If already in viewport on load, show immediately
        }
    });
});
