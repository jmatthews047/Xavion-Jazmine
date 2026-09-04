/* =========================================
   THE BAKER WEDDING — HASHTAG CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const hashtagText =
        document.getElementById("hashtag-text");

    const hashtagDots =
        document.querySelectorAll(".hashtag-dot");

    const hashtagSection =
        document.querySelector(".hashtag-section");


    /* Stop if the carousel is not on this page */

    if (
        !hashtagText ||
        !hashtagDots.length
    ) {
        return;
    }


    /* Wedding hashtags */

    const weddingHashtags = [
        "#TheBakerWedding2028",
        "#MeetTheBakers",
        "#JazFoundHerBaker",
        "#XJForever"
    ];


    let currentHashtagIndex = 0;
    let carouselTimer = null;

    const carouselSpeed = 3500;

    const reducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================
       SHOW SELECTED HASHTAG
    ===================================== */

    function showHashtag(index) {
        /*
            Return to the first hashtag after
            reaching the end.
        */

        if (index >= weddingHashtags.length) {
            index = 0;
        }


        /*
            Move to the last hashtag when going
            backward from the first.
        */

        if (index < 0) {
            index = weddingHashtags.length - 1;
        }


        currentHashtagIndex = index;


        /* Update active navigation dot */

        hashtagDots.forEach((dot, dotIndex) => {
            const isActive =
                dotIndex === currentHashtagIndex;

            dot.classList.toggle(
                "active",
                isActive
            );

            dot.setAttribute(
                "aria-pressed",
                String(isActive)
            );
        });


        /* Change text immediately for reduced motion */

        if (reducedMotion) {
            hashtagText.textContent =
                weddingHashtags[currentHashtagIndex];

            return;
        }


        /* Fade the current hashtag out */

        hashtagText.classList.add("changing");


        /* Replace text and fade back in */

        window.setTimeout(() => {
            hashtagText.textContent =
                weddingHashtags[currentHashtagIndex];

            hashtagText.classList.remove("changing");
        }, 250);
    }


    /* =====================================
       AUTOMATIC ROTATION
    ===================================== */

    function startHashtagCarousel() {
        stopHashtagCarousel();

        /*
            Do not automatically rotate when the
            visitor prefers reduced motion.
        */

        if (reducedMotion) {
            return;
        }


        carouselTimer = window.setInterval(() => {
            showHashtag(
                currentHashtagIndex + 1
            );
        }, carouselSpeed);
    }


    function stopHashtagCarousel() {
        if (carouselTimer) {
            window.clearInterval(carouselTimer);
            carouselTimer = null;
        }
    }


    /* =====================================
       CAROUSEL DOT BUTTONS
    ===================================== */

    hashtagDots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showHashtag(index);

            /*
                Restart the automatic timer so it
                does not immediately change after
                the guest chooses a hashtag.
            */

            startHashtagCarousel();
        });
    });


    /* =====================================
       PAUSE WHEN INTERACTING
    ===================================== */

    if (hashtagSection) {
        hashtagSection.addEventListener(
            "mouseenter",
            stopHashtagCarousel
        );

        hashtagSection.addEventListener(
            "mouseleave",
            startHashtagCarousel
        );


        hashtagSection.addEventListener(
            "focusin",
            stopHashtagCarousel
        );

        hashtagSection.addEventListener(
            "focusout",
            (event) => {
                /*
                    Restart only after focus leaves
                    the complete hashtag section.
                */

                if (
                    !hashtagSection.contains(
                        event.relatedTarget
                    )
                ) {
                    startHashtagCarousel();
                }
            }
        );
    }


    /* =====================================
       PAUSE WHEN BROWSER TAB IS HIDDEN
    ===================================== */

    document.addEventListener(
        "visibilitychange",
        () => {
            if (document.hidden) {
                stopHashtagCarousel();
            }

            else {
                startHashtagCarousel();
            }
        }
    );


    /* =====================================
       INITIALIZE CAROUSEL
    ===================================== */

    showHashtag(0);
    startHashtagCarousel();

});