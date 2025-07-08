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
    // We attach the event listener to the entire 'gallery-item' for better UX (larger clickable area)
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img'); // Get the image inside the clicked item
            const overlayH3 = this.querySelector('.overlay h3');
            const overlayP = this.querySelector('.overlay p');

            modal.style.display = "flex"; // Use flex to center the modal content
            modalImg.src = img.src; // Set modal image source

            // Combine title and description for the modal caption
            let fullCaption = overlayH3 ? overlayH3.textContent : '';
            if (overlayP && overlayP.textContent) {
                fullCaption += (fullCaption ? '<br>' : '') + overlayP.textContent; // Add line break if title exists
            } else if (img.alt) { // Fallback to alt text if overlay text is missing
                fullCaption = img.alt;
            }
            captionText.innerHTML = fullCaption;
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
            // Ensure click is directly on the modal background, not on the image or caption
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Scroll Animation (fade-hidden/fade-visible)
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
        // This prevents animations for elements already in view when the page loads.
        const faderTop = fader.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (faderTop > windowHeight) {
            fader.classList.add('fade-hidden'); // Ensure it starts hidden
            appearOnScroll.observe(fader);
        } else {
            fader.classList.add('fade-visible'); // If already in viewport on load, show immediately
        }
    });
});
