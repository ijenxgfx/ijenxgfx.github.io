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

    // Get all gallery items
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgElement = this.querySelector('img');
            // Retrieve caption data ONLY from data-attributes for full control
            const projectTitle = imgElement.dataset.title;
            const projectDescription = imgElement.dataset.description;

            // Ensure the modal is visible by setting its display property
            modal.style.display = "flex"; // Changed from "block" to "flex" to enable centering via flexbox
            modalImg.src = imgElement.src; // Set modal image source

            // Construct the caption HTML using data attributes
            let captionHTML = '';
            if (projectTitle) {
                captionHTML += `<strong>${projectTitle}</strong>`;
            }
            if (projectDescription) {
                // Add a line break only if there's a title to separate them visually
                captionHTML += (captionHTML ? '<br>' : '') + projectDescription;
            }
            captionText.innerHTML = captionHTML;
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
                return;
            } else {
                entry.target.classList.add('fade-visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        const faderTop = fader.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (faderTop > windowHeight) {
            fader.classList.add('fade-hidden');
            appearOnScroll.observe(fader);
        } else {
            fader.classList.add('fade-visible');
        }
    });
});
