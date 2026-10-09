
/* =========================================
   THE BAKER WEDDING
   GALLERY CAROUSELS + LIGHTBOX
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       PHOTO FOLDER LOCATIONS

       These paths are relative to:
       pages/gallery.html
    ===================================== */

    const engagementFolder =
        "../assets/images/gallery/engagement/";

    const couplesFolder =
        "../assets/images/gallery/couples/";


    /* =====================================
       ENGAGEMENT PHOTOS — 15 TOTAL

       All filenames come from your folder.
    ===================================== */

    const engagementPhotos = [

        "JazmineEngagement1.jpg",
        "JZEngagement7Rings.jpg",
        "ZayEngagement1.jpg",

        "JZEngagement1.jpg",
        "JZEngagement2.jpg",
        "JZEngagement3.jpg",
        "JZEngagement4.jpg",
        "JZEngagement5.jpg",
        "JZEngagement6.jpg",
        "JZEngagement8.jpg",
        "JZEngagement9forever.jpg",
        "JZEngagement10.jpg",
        "JZEngagement12.jpg",
        "JazmineEngagement2.jpg",
        "ZayEngagement2.jpg"

    ].map(filename => engagementFolder + filename);


    /* =====================================
       COUPLES PHOTOS — 21 TOTAL

       Replace the placeholders with the
       actual filenames from your couples folder.

       No need to include the folder path.
    ===================================== */

    const couplesPhotos = [

        "YOUR-COUPLE-PHOTO-01.jpg",
        "YOUR-COUPLE-PHOTO-02.jpg",
        "YOUR-COUPLE-PHOTO-03.jpg",
        "YOUR-COUPLE-PHOTO-04.jpg",
        "YOUR-COUPLE-PHOTO-05.jpg",
        "YOUR-COUPLE-PHOTO-06.jpg",
        "YOUR-COUPLE-PHOTO-07.jpg",
        "YOUR-COUPLE-PHOTO-08.jpg",
        "YOUR-COUPLE-PHOTO-09.jpg",
        "YOUR-COUPLE-PHOTO-10.jpg",
        "YOUR-COUPLE-PHOTO-11.jpg",
        "YOUR-COUPLE-PHOTO-12.jpg",
        "YOUR-COUPLE-PHOTO-13.jpg",
        "YOUR-COUPLE-PHOTO-14.jpg",
        "YOUR-COUPLE-PHOTO-15.jpg",
        "YOUR-COUPLE-PHOTO-16.jpg",
        "YOUR-COUPLE-PHOTO-17.jpg",
        "YOUR-COUPLE-PHOTO-18.jpg",
        "YOUR-COUPLE-PHOTO-19.jpg",
        "YOUR-COUPLE-PHOTO-20.jpg",
        "YOUR-COUPLE-PHOTO-21.jpg"

    ].map(filename =>
        filename.startsWith("YOUR-")
            ? filename
            : couplesFolder + filename
    );


    /* =====================================
       COLLECTIONS

       01: Engagement photos 1–8
       02: Engagement photos 9–15
       03: Couples photos 1–11
       04: Couples photos 12–21
    ===================================== */

    const collections = [

        {
            id: "gallery-row-one",
            photos: engagementPhotos.slice(0, 8),
            type: "Engagement",
            startNumber: 1
        },

        {
            id: "gallery-row-two",
            photos: engagementPhotos.slice(8, 15),
            type: "Engagement",
            startNumber: 9
        },

        {
            id: "gallery-row-three",
            photos: couplesPhotos.slice(0, 11),
            type: "Couples",
            startNumber: 1
        },

        {
            id: "gallery-row-four",
            photos: couplesPhotos.slice(11, 21),
            type: "Couples",
            startNumber: 12
        }

    ];


    /* =====================================
       CREATE PHOTO PLACEHOLDER
    ===================================== */

    function createPlaceholder(number, message) {

        const placeholder = document.createElement("div");

        placeholder.className = "photo-placeholder";

        const numberText = document.createElement("span");

        numberText.textContent =
            String(number).padStart(2, "0");

        const messageText = document.createElement("p");

        messageText.textContent = message;

        placeholder.append(numberText, messageText);

        return placeholder;
    }


    /* =====================================
       CREATE GALLERY ITEM
    ===================================== */

    function createGalleryItem(photoPath, number, type) {

        const item = document.createElement("button");

        item.type = "button";
        item.className = "gallery-item";

        item.dataset.photoNumber = number;

        item.setAttribute(
            "aria-label",
            `View ${type.toLowerCase()} photo ${number}`
        );


        /* Placeholder if filename not entered */

        if (!photoPath || photoPath.startsWith("YOUR-")) {

            item.disabled = true;

            item.appendChild(
                createPlaceholder(number, "Photo Coming Soon")
            );

            return item;
        }


        /* Actual image */

        const image = document.createElement("img");

        image.src = photoPath;

        
        image.addEventListener("load", () => {
            console.log("PHOTO LOADED:", image.src);
        });

        image.addEventListener("error", () => {
            console.error("PHOTO NOT FOUND:", image.src);
        });


        image.alt =
            `Jazmine and Xavion ${type.toLowerCase()} photo ${number}`;

        image.dataset.caption =
            `${type} Photo ${String(number).padStart(2, "0")}`;

        image.loading = "lazy";
        image.decoding = "async";


        /* Show message if image cannot be found */

        image.addEventListener("error", () => {

            console.error("Could not load image:", photoPath);

            item.disabled = true;

            image.replaceWith(
                createPlaceholder(number, "Photo Unavailable")
            );

        });


        item.appendChild(image);

        return item;
    }


    /* =====================================
       POPULATE CAROUSELS
    ===================================== */

    collections.forEach(collection => {

        const carousel =
            document.getElementById(collection.id);

        if (!carousel) {
            console.warn("Missing carousel:", collection.id);
            return;
        }

        const track = carousel.querySelector(".gallery-track");

        if (!track) {
            console.warn("Missing gallery track:", collection.id);
            return;
        }

        track.replaceChildren();

        collection.photos.forEach((photo, index) => {

            const item = createGalleryItem(
                photo,
                collection.startNumber + index,
                collection.type
            );

            track.appendChild(item);

        });

    });


    /* =====================================
       CAROUSEL CONTROLS
    ===================================== */

    document.querySelectorAll(".gallery-carousel")
        .forEach(carousel => {

            const id = carousel.id;

            const previousButton = document.querySelector(
                `.carousel-previous[data-carousel="${id}"]`
            );

            const nextButton = document.querySelector(
                `.carousel-next[data-carousel="${id}"]`
            );


            function getScrollDistance() {

                const firstItem =
                    carousel.querySelector(".gallery-item");

                const track =
                    carousel.querySelector(".gallery-track");

                if (!firstItem || !track) {
                    return carousel.clientWidth;
                }

                const styles = window.getComputedStyle(track);

                const gap =
                    parseFloat(styles.columnGap) ||
                    parseFloat(styles.gap) ||
                    0;

                return firstItem.getBoundingClientRect().width + gap;
            }


            function updateButtons() {

                const maxScroll =
                    carousel.scrollWidth - carousel.clientWidth;

                if (previousButton) {
                    previousButton.disabled =
                        carousel.scrollLeft <= 5;
                }

                if (nextButton) {
                    nextButton.disabled =
                        carousel.scrollLeft >= maxScroll - 5;
                }
            }


            previousButton?.addEventListener("click", () => {

                carousel.scrollBy({
                    left: -getScrollDistance(),
                    behavior: "smooth"
                });

            });


            nextButton?.addEventListener("click", () => {

                carousel.scrollBy({
                    left: getScrollDistance(),
                    behavior: "smooth"
                });

            });


            carousel.addEventListener(
                "scroll",
                updateButtons,
                { passive: true }
            );

            window.addEventListener("resize", updateButtons);

            updateButtons();

        });


    /* =====================================
       LIGHTBOX ELEMENTS
    ===================================== */

    const lightbox =
        document.getElementById("gallery-lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const lightboxCaption =
        document.getElementById("lightbox-caption");

    const closeButton =
        document.querySelector(".lightbox-close");

    const previousButton =
        document.querySelector(".lightbox-previous");

    const nextButton =
        document.querySelector(".lightbox-next");


    if (!lightbox || !lightboxImage) {
        console.warn("Gallery lightbox was not found.");
        return;
    }


    let activePhotoIndex = 0;
    let lastFocusedElement = null;


    function getAvailablePhotos() {

        return Array.from(
            document.querySelectorAll(
                ".gallery-item:not(:disabled) img"
            )
        ).filter(image => image.complete && image.naturalWidth > 0);

    }


    /* =====================================
       SHOW PHOTO IN LIGHTBOX
    ===================================== */

    function displayPhoto(index) {

        const photos = getAvailablePhotos();

        if (!photos.length) {
            return;
        }

        activePhotoIndex =
            (index + photos.length) % photos.length;

        const image = photos[activePhotoIndex];

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;

        if (lightboxCaption) {
            lightboxCaption.textContent =
                image.dataset.caption || "Jazmine & Xavion";
        }
    }


    /* =====================================
       OPEN LIGHTBOX
    ===================================== */

    document.querySelectorAll(".gallery-track")
        .forEach(track => {

            track.addEventListener("click", event => {

                const item = event.target.closest(".gallery-item");

                if (!item || item.disabled) {
                    return;
                }

                const clickedImage = item.querySelector("img");

                if (!clickedImage) {
                    return;
                }

                const photos = getAvailablePhotos();

                const index = photos.indexOf(clickedImage);

                if (index === -1) {
                    return;
                }

                lastFocusedElement = item;

                displayPhoto(index);

                lightbox.hidden = false;

                document.body.classList.add("lightbox-open");

                closeButton?.focus();

            });

        });


    /* =====================================
       CLOSE LIGHTBOX
    ===================================== */

    function closeLightbox() {

        lightbox.hidden = true;

        lightboxImage.removeAttribute("src");

        document.body.classList.remove("lightbox-open");

        lastFocusedElement?.focus();
    }


    document.querySelectorAll("[data-close-lightbox]")
        .forEach(element => {

            element.addEventListener("click", closeLightbox);

        });


    /* =====================================
       LIGHTBOX NAVIGATION
    ===================================== */

    previousButton?.addEventListener("click", () => {
        displayPhoto(activePhotoIndex - 1);
    });

    nextButton?.addEventListener("click", () => {
        displayPhoto(activePhotoIndex + 1);
    });


    /* =====================================
       KEYBOARD CONTROLS
    ===================================== */

    document.addEventListener("keydown", event => {

        if (lightbox.hidden) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            displayPhoto(activePhotoIndex - 1);
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            displayPhoto(activePhotoIndex + 1);
        }

        if (event.key === "Tab") {

            const focusable = Array.from(
                lightbox.querySelectorAll(
                    "button:not([disabled])"
                )
            );

            if (!focusable.length) {
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (
                event.shiftKey &&
                document.activeElement === first
            ) {
                event.preventDefault();
                last.focus();
            }

            else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {
                event.preventDefault();
                first.focus();
            }
        }

    });


    /* =====================================
       MOBILE SWIPE CONTROLS
    ===================================== */

    let touchStartX = 0;
    let touchStartY = 0;

    lightbox.addEventListener("touchstart", event => {

        touchStartX = event.changedTouches[0].screenX;
        touchStartY = event.changedTouches[0].screenY;

    }, { passive: true });


    lightbox.addEventListener("touchend", event => {

        const endX = event.changedTouches[0].screenX;
        const endY = event.changedTouches[0].screenY;

        const distanceX = touchStartX - endX;
        const distanceY = touchStartY - endY;

        if (Math.abs(distanceY) > Math.abs(distanceX)) {
            return;
        }

        if (distanceX > 50) {
            displayPhoto(activePhotoIndex + 1);
        }

        if (distanceX < -50) {
            displayPhoto(activePhotoIndex - 1);
        }

    }, { passive: true });


    console.log(
        "Baker Wedding Gallery initialized:",
        engagementPhotos.length,
        "engagement photos and",
        couplesPhotos.length,
        "couples photo slots."
    );

});
