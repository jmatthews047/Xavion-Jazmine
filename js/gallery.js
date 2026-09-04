/* =========================================
   THE BAKER WEDDING — GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       CAROUSEL ROWS
    ===================================== */

    const galleryCarousels =
        document.querySelectorAll(".gallery-carousel");


    galleryCarousels.forEach((carousel) => {
        const carouselID = carousel.id;

        const previousButton = document.querySelector(
            `.carousel-previous[data-carousel="${carouselID}"]`
        );

        const nextButton = document.querySelector(
            `.carousel-next[data-carousel="${carouselID}"]`
        );


        /*
            Find the width of one photo plus the space
            between photos.
        */

        function getScrollDistance() {
            const firstItem =
                carousel.querySelector(".gallery-item");

            if (!firstItem) {
                return carousel.clientWidth;
            }

            const track =
                carousel.querySelector(".gallery-track");

            const trackStyles = window.getComputedStyle(track);

            const gap =
                parseFloat(trackStyles.columnGap) ||
                parseFloat(trackStyles.gap) ||
                0;

            return firstItem.offsetWidth + gap;
        }


        /* Update disabled arrow states */

        function updateCarouselButtons() {
            const maximumScroll =
                carousel.scrollWidth - carousel.clientWidth;

            const currentScroll = carousel.scrollLeft;

            if (previousButton) {
                previousButton.disabled = currentScroll <= 5;
            }

            if (nextButton) {
                nextButton.disabled =
                    currentScroll >= maximumScroll - 5;
            }
        }


        /* Previous arrow */

        if (previousButton) {
            previousButton.addEventListener("click", () => {
                carousel.scrollBy({
                    left: -getScrollDistance(),
                    behavior: "smooth"
                });
            });
        }


        /* Next arrow */

        if (nextButton) {
            nextButton.addEventListener("click", () => {
                carousel.scrollBy({
                    left: getScrollDistance(),
                    behavior: "smooth"
                });
            });
        }


        /* Update arrows while scrolling */

        carousel.addEventListener(
            "scroll",
            updateCarouselButtons,
            { passive: true }
        );


        /* Update after screen-size changes */

        window.addEventListener(
            "resize",
            updateCarouselButtons
        );


        /* Set the initial arrow states */

        updateCarouselButtons();
    });


    /* =====================================
       PHOTO LIGHTBOX
    ===================================== */

    const lightbox =
        document.getElementById("gallery-lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxCaption =
        document.getElementById("lightbox-caption");

    const lightboxCloseButton =
        document.querySelector(".lightbox-close");

    const lightboxPreviousButton =
        document.querySelector(".lightbox-previous");

    const lightboxNextButton =
        document.querySelector(".lightbox-next");

    const lightboxCloseElements =
        document.querySelectorAll("[data-close-lightbox]");


    /*
        Only gallery items containing actual images are added
        to the lightbox.

        Placeholder cards will not open.
    */

    const galleryPhotos = Array.from(
        document.querySelectorAll(".gallery-item")
    ).filter((item) => item.querySelector("img"));


    let activePhotoIndex = 0;
    let lastFocusedElement = null;


    /* Stop if the lightbox does not exist */

    if (!lightbox || !lightboxImage) {
        return;
    }


    /* Display a selected photo */

    function displayPhoto(index) {
        if (!galleryPhotos.length) {
            return;
        }


        /* Loop from the last photo to the first */

        if (index < 0) {
            activePhotoIndex = galleryPhotos.length - 1;
        }


        /* Loop from the first photo to the last */

        else if (index >= galleryPhotos.length) {
            activePhotoIndex = 0;
        }


        else {
            activePhotoIndex = index;
        }


        const selectedItem =
            galleryPhotos[activePhotoIndex];

        const selectedImage =
            selectedItem.querySelector("img");

        const photoNumber =
            selectedItem.dataset.photoNumber ||
            activePhotoIndex + 1;


        lightboxImage.src = selectedImage.src;

        lightboxImage.alt =
            selectedImage.alt ||
            `Jazmine and Xavion engagement photo ${photoNumber}`;

        if (lightboxCaption) {
            lightboxCaption.textContent =
                selectedImage.dataset.caption ||
                `Engagement Photo ${photoNumber}`;
        }
    }


    /* Open the lightbox */

    function openLightbox(index, clickedElement) {
        lastFocusedElement = clickedElement;

        displayPhoto(index);

        lightbox.hidden = false;

        document.body.classList.add("lightbox-open");

        lightboxCloseButton?.focus();
    }


    /* Close the lightbox */

    function closeLightbox() {
        lightbox.hidden = true;

        lightboxImage.src = "";
        lightboxImage.alt = "";

        document.body.classList.remove("lightbox-open");

        lastFocusedElement?.focus();
    }


    /* Open a photo when clicked */

    galleryPhotos.forEach((galleryItem, index) => {
        galleryItem.addEventListener("click", () => {
            openLightbox(index, galleryItem);
        });
    });


    /* Lightbox close buttons */

    lightboxCloseElements.forEach((element) => {
        element.addEventListener("click", closeLightbox);
    });


    /* Previous photo */

    lightboxPreviousButton?.addEventListener("click", () => {
        displayPhoto(activePhotoIndex - 1);
    });


    /* Next photo */

    lightboxNextButton?.addEventListener("click", () => {
        displayPhoto(activePhotoIndex + 1);
    });


    /* =====================================
       KEYBOARD CONTROLS
    ===================================== */

    document.addEventListener("keydown", (event) => {
        if (lightbox.hidden) {
            return;
        }


        /* Close lightbox */

        if (event.key === "Escape") {
            closeLightbox();
        }


        /* Previous photo */

        if (event.key === "ArrowLeft") {
            displayPhoto(activePhotoIndex - 1);
        }


        /* Next photo */

        if (event.key === "ArrowRight") {
            displayPhoto(activePhotoIndex + 1);
        }


        /*
            Keep keyboard focus inside the lightbox
            while it is open.
        */

        if (event.key === "Tab") {
            const focusableElements = Array.from(
                lightbox.querySelectorAll(
                    "button:not([disabled]), [href], " +
                    "input:not([disabled]), " +
                    "select:not([disabled]), " +
                    "textarea:not([disabled]), " +
                    '[tabindex]:not([tabindex="-1"])'
                )
            );

            if (!focusableElements.length) {
                return;
            }

            const firstFocusable =
                focusableElements[0];

            const lastFocusable =
                focusableElements[
                    focusableElements.length - 1
                ];


            if (
                event.shiftKey &&
                document.activeElement === firstFocusable
            ) {
                event.preventDefault();
                lastFocusable.focus();
            }


            else if (
                !event.shiftKey &&
                document.activeElement === lastFocusable
            ) {
                event.preventDefault();
                firstFocusable.focus();
            }
        }
    });


    /* =====================================
       TOUCH SWIPE SUPPORT
    ===================================== */

    let touchStartX = 0;
    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        (event) => {
            touchStartX =
                event.changedTouches[0].screenX;
        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        (event) => {
            touchEndX =
                event.changedTouches[0].screenX;

            handleLightboxSwipe();
        },
        { passive: true }
    );


    function handleLightboxSwipe() {
        const swipeDistance =
            touchStartX - touchEndX;

        const minimumSwipeDistance = 50;


        /* Swipe left: next photo */

        if (swipeDistance > minimumSwipeDistance) {
            displayPhoto(activePhotoIndex + 1);
        }


        /* Swipe right: previous photo */

        if (swipeDistance < -minimumSwipeDistance) {
            displayPhoto(activePhotoIndex - 1);
        }
    }

});