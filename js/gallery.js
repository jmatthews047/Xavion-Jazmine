
/* =========================================
   THE BAKER WEDDING — GALLERY
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       PHOTO COLLECTIONS

       REPLACE THE PHOTO PATHS BELOW.

       Example:
       "../assets/photos/engagement/photo1.jpg"

       Keep the quotation marks and commas.
    ===================================== */


    /* =====================================
       ENGAGEMENT PHOTOS — 15 TOTAL
    ===================================== */

    const engagementPhotos = [

        // Engagement Photo 01
        "YOUR-ENGAGEMENT-PHOTO-01.jpg",

        // Engagement Photo 02
        "YOUR-ENGAGEMENT-PHOTO-02.jpg",

        // Engagement Photo 03
        "YOUR-ENGAGEMENT-PHOTO-03.jpg",

        // Engagement Photo 04
        "YOUR-ENGAGEMENT-PHOTO-04.jpg",

        // Engagement Photo 05
        "YOUR-ENGAGEMENT-PHOTO-05.jpg",

        // Engagement Photo 06
        "YOUR-ENGAGEMENT-PHOTO-06.jpg",

        // Engagement Photo 07
        "YOUR-ENGAGEMENT-PHOTO-07.jpg",

        // Engagement Photo 08
        "YOUR-ENGAGEMENT-PHOTO-08.jpg",

        // Engagement Photo 09
        "YOUR-ENGAGEMENT-PHOTO-09.jpg",

        // Engagement Photo 10
        "YOUR-ENGAGEMENT-PHOTO-10.jpg",

        // Engagement Photo 11
        "YOUR-ENGAGEMENT-PHOTO-11.jpg",

        // Engagement Photo 12
        "YOUR-ENGAGEMENT-PHOTO-12.jpg",

        // Engagement Photo 13
        "YOUR-ENGAGEMENT-PHOTO-13.jpg",

        // Engagement Photo 14
        "YOUR-ENGAGEMENT-PHOTO-14.jpg",

        // Engagement Photo 15
        "YOUR-ENGAGEMENT-PHOTO-15.jpg"

    ];


    /* =====================================
       COUPLES PHOTOS — 21 TOTAL
    ===================================== */

    const couplesPhotos = [

        // Couples Photo 01
        "YOUR-COUPLES-PHOTO-01.jpg",

        // Couples Photo 02
        "YOUR-COUPLES-PHOTO-02.jpg",

        // Couples Photo 03
        "YOUR-COUPLES-PHOTO-03.jpg",

        // Couples Photo 04
        "YOUR-COUPLES-PHOTO-04.jpg",

        // Couples Photo 05
        "YOUR-COUPLES-PHOTO-05.jpg",

        // Couples Photo 06
        "YOUR-COUPLES-PHOTO-06.jpg",

        // Couples Photo 07
        "YOUR-COUPLES-PHOTO-07.jpg",

        // Couples Photo 08
        "YOUR-COUPLES-PHOTO-08.jpg",

        // Couples Photo 09
        "YOUR-COUPLES-PHOTO-09.jpg",

        // Couples Photo 10
        "YOUR-COUPLES-PHOTO-10.jpg",

        // Couples Photo 11
        "YOUR-COUPLES-PHOTO-11.jpg",

        // Couples Photo 12
        "YOUR-COUPLES-PHOTO-12.jpg",

        // Couples Photo 13
        "YOUR-COUPLES-PHOTO-13.jpg",

        // Couples Photo 14
        "YOUR-COUPLES-PHOTO-14.jpg",

        // Couples Photo 15
        "YOUR-COUPLES-PHOTO-15.jpg",

        // Couples Photo 16
        "YOUR-COUPLES-PHOTO-16.jpg",

        // Couples Photo 17
        "YOUR-COUPLES-PHOTO-17.jpg",

        // Couples Photo 18
        "YOUR-COUPLES-PHOTO-18.jpg",

        // Couples Photo 19
        "YOUR-COUPLES-PHOTO-19.jpg",

        // Couples Photo 20
        "YOUR-COUPLES-PHOTO-20.jpg",

        // Couples Photo 21
        "YOUR-COUPLES-PHOTO-21.jpg"

    ];


    /* =====================================
       COLLECTION CONFIGURATION

       Engagement: 8 + 7
       Couples: 11 + 10
    ===================================== */

    const collections = [

        {
            carouselID: "gallery-row-one",
            photos: engagementPhotos.slice(0, 8),
            type: "Engagement",
            startNumber: 1
        },

        {
            carouselID: "gallery-row-two",
            photos: engagementPhotos.slice(8, 15),
            type: "Engagement",
            startNumber: 9
        },

        {
            carouselID: "gallery-row-three",
            photos: couplesPhotos.slice(0, 11),
            type: "Couples",
            startNumber: 1
        },

        {
            carouselID: "gallery-row-four",
            photos: couplesPhotos.slice(11, 21),
            type: "Couples",
            startNumber: 12
        }

    ];


    /* =====================================
       GENERATE GALLERY PHOTOS
    ===================================== */

    function createGalleryPhoto(photoPath, number, type) {

        const galleryItem =
            document.createElement("button");

        galleryItem.className = "gallery-item";
        galleryItem.type = "button";

        galleryItem.dataset.photoNumber = number;

        galleryItem.setAttribute(
            "aria-label",
            `Open ${type.toLowerCase()} photo ${number}`
        );


        /* If a photo path has not been entered,
           display a placeholder instead. */

        if (
            !photoPath ||
            photoPath.startsWith("YOUR-")
        ) {

            galleryItem.disabled = true;

            const placeholder =
                document.createElement("div");

            placeholder.className = "photo-placeholder";

            const placeholderNumber =
                document.createElement("span");

            placeholderNumber.textContent =
                String(number).padStart(2, "0");

            const placeholderText =
                document.createElement("p");

            placeholderText.textContent =
                "Photo Coming Soon";

            placeholder.append(
                placeholderNumber,
                placeholderText
            );

            galleryItem.appendChild(placeholder);

            return galleryItem;
        }


        /* Create the actual photograph */

        const image = document.createElement("img");

        image.src = photoPath;

        image.alt =
            `Jazmine and Xavion ${type.toLowerCase()} photo ${number}`;

        image.dataset.caption =
            `${type} Photo ${String(number).padStart(2, "0")}`;

        image.loading = "lazy";

        image.decoding = "async";


        /* Handle missing image files */

        image.addEventListener("error", () => {

            galleryItem.disabled = true;

            const placeholder =
                document.createElement("div");

            placeholder.className = "photo-placeholder";

            const placeholderNumber =
                document.createElement("span");

            placeholderNumber.textContent =
                String(number).padStart(2, "0");

            const placeholderText =
                document.createElement("p");

            placeholderText.textContent =
                "Photo Unavailable";

            placeholder.append(
                placeholderNumber,
                placeholderText
            );

            image.replaceWith(placeholder);

        });


        galleryItem.appendChild(image);

        return galleryItem;
    }


    /* Populate the four carousel tracks */

    collections.forEach((collection) => {

        const carousel =
            document.getElementById(collection.carouselID);

        if (!carousel) {
            return;
        }

        const track =
            carousel.querySelector(".gallery-track");

        if (!track) {
            return;
        }

        track.replaceChildren();

        collection.photos.forEach((photoPath, index) => {

            const photoNumber =
                collection.startNumber + index;

            const galleryItem = createGalleryPhoto(
                photoPath,
                photoNumber,
                collection.type
            );

            track.appendChild(galleryItem);

        });

    });


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


        /* Width of one photo plus the gap */

        function getScrollDistance() {

            const firstItem =
                carousel.querySelector(".gallery-item");

            if (!firstItem) {
                return carousel.clientWidth;
            }

            const track =
                carousel.querySelector(".gallery-track");

            const trackStyles =
                window.getComputedStyle(track);

            const gap =
                parseFloat(trackStyles.columnGap) ||
                parseFloat(trackStyles.gap) ||
                0;

            return firstItem.offsetWidth + gap;
        }


        /* Update arrow states */

        function updateCarouselButtons() {

            const maximumScroll =
                carousel.scrollWidth - carousel.clientWidth;

            const currentScroll = carousel.scrollLeft;

            if (previousButton) {
                previousButton.disabled =
                    currentScroll <= 5;
            }

            if (nextButton) {
                nextButton.disabled =
                    currentScroll >= maximumScroll - 5;
            }
        }


        /* Previous */

        previousButton?.addEventListener("click", () => {

            carousel.scrollBy({
                left: -getScrollDistance(),
                behavior: "smooth"
            });

        });


        /* Next */

        nextButton?.addEventListener("click", () => {

            carousel.scrollBy({
                left: getScrollDistance(),
                behavior: "smooth"
            });

        });


        carousel.addEventListener(
            "scroll",
            updateCarouselButtons,
            { passive: true }
        );


        window.addEventListener(
            "resize",
            updateCarouselButtons
        );


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


    if (!lightbox || !lightboxImage) {
        return;
    }


    /* Get all photo buttons after generating images */

    const galleryPhotos = Array.from(
        document.querySelectorAll(".gallery-item")
    ).filter((item) => item.querySelector("img"));


    let activePhotoIndex = 0;
    let lastFocusedElement = null;


    /* =====================================
       DISPLAY PHOTO
    ===================================== */

    function displayPhoto(index) {

        if (!galleryPhotos.length) {
            return;
        }

        if (index < 0) {
            activePhotoIndex = galleryPhotos.length - 1;
        }

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

        if (!selectedImage) {
            return;
        }

        const photoNumber =
            selectedItem.dataset.photoNumber ||
            activePhotoIndex + 1;


        lightboxImage.src = selectedImage.src;

        lightboxImage.alt =
            selectedImage.alt ||
            `Jazmine and Xavion photo ${photoNumber}`;


        if (lightboxCaption) {

            lightboxCaption.textContent =
                selectedImage.dataset.caption ||
                `Photo ${photoNumber}`;

        }
    }


    /* =====================================
       OPEN LIGHTBOX
    ===================================== */

    function openLightbox(index, clickedElement) {

        lastFocusedElement = clickedElement;

        displayPhoto(index);

        lightbox.hidden = false;

        document.body.classList.add("lightbox-open");

        lightboxCloseButton?.focus();
    }


    /* =====================================
       CLOSE LIGHTBOX
    ===================================== */

    function closeLightbox() {

        lightbox.hidden = true;

        lightboxImage.removeAttribute("src");
        lightboxImage.alt = "";

        document.body.classList.remove("lightbox-open");

        lastFocusedElement?.focus();
    }


    /* =====================================
       PHOTO CLICK EVENTS
    ===================================== */

    galleryPhotos.forEach((galleryItem, index) => {

        galleryItem.addEventListener("click", () => {

            if (galleryItem.disabled) {
                return;
            }

            openLightbox(index, galleryItem);

        });

    });


    /* =====================================
       LIGHTBOX BUTTONS
    ===================================== */

    lightboxCloseElements.forEach((element) => {

        element.addEventListener(
            "click",
            closeLightbox
        );

    });


    lightboxPreviousButton?.addEventListener(
        "click",
        () => displayPhoto(activePhotoIndex - 1)
    );


    lightboxNextButton?.addEventListener(
        "click",
        () => displayPhoto(activePhotoIndex + 1)
    );


    /* =====================================
       KEYBOARD CONTROLS
    ===================================== */

    document.addEventListener("keydown", (event) => {

        if (lightbox.hidden) {
            return;
        }


        if (event.key === "Escape") {

            closeLightbox();
            return;

        }


        if (event.key === "ArrowLeft") {

            event.preventDefault();
            displayPhoto(activePhotoIndex - 1);

        }


        if (event.key === "ArrowRight") {

            event.preventDefault();
            displayPhoto(activePhotoIndex + 1);

        }


        /* Keep keyboard focus inside the lightbox */

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
    let touchStartY = 0;


    lightbox.addEventListener(
        "touchstart",
        (event) => {

            touchStartX =
                event.changedTouches[0].screenX;

            touchStartY =
                event.changedTouches[0].screenY;

        },
        { passive: true }
    );


    lightbox.addEventListener(
        "touchend",
        (event) => {

            const touchEndX =
                event.changedTouches[0].screenX;

            const touchEndY =
                event.changedTouches[0].screenY;

            const horizontalDistance =
                touchStartX - touchEndX;

            const verticalDistance =
                touchStartY - touchEndY;


            const minimumSwipeDistance = 50;


            /* Ignore primarily vertical swipes */

            if (
                Math.abs(verticalDistance) >
                Math.abs(horizontalDistance)
            ) {
                return;
            }


            /* Swipe left: next photo */

            if (
                horizontalDistance >
                minimumSwipeDistance
            ) {

                displayPhoto(activePhotoIndex + 1);

            }


            /* Swipe right: previous photo */

            if (
                horizontalDistance <
                -minimumSwipeDistance
            ) {

                displayPhoto(activePhotoIndex - 1);

            }

        },
        { passive: true }
    );

});
