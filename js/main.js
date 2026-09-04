/* =========================================
   THE BAKER WEDDING — SHARED JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {


    /* =====================================
       MOBILE NAVIGATION
    ===================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const mainNavigation =
        document.getElementById("main-navigation");

    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation a"
        );


    function openNavigation() {
        if (!menuToggle || !mainNavigation) {
            return;
        }

        mainNavigation.classList.add("open");
        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        document.body.classList.add("menu-open");
    }


    function closeNavigation() {
        if (!menuToggle || !mainNavigation) {
            return;
        }

        mainNavigation.classList.remove("open");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        document.body.classList.remove("menu-open");
    }


    function toggleNavigation() {
        const menuIsOpen =
            mainNavigation.classList.contains("open");

        if (menuIsOpen) {
            closeNavigation();
        }

        else {
            openNavigation();
        }
    }


    if (menuToggle && mainNavigation) {
        menuToggle.addEventListener(
            "click",
            toggleNavigation
        );
    }


    /* Close the menu after selecting a page */

    navigationLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeNavigation();
        });
    });


    /* Close the menu when clicking outside it */

    document.addEventListener("click", (event) => {
        if (!menuToggle || !mainNavigation) {
            return;
        }

        const clickedInsideMenu =
            mainNavigation.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            mainNavigation.classList.contains("open") &&
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {
            closeNavigation();
        }
    });


    /* Close the menu with the Escape key */

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            mainNavigation?.classList.contains("open")
        ) {
            closeNavigation();
            menuToggle?.focus();
        }
    });


    /*
        Close the mobile menu when returning to a
        desktop-sized screen.
    */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
            closeNavigation();
        }
    });


    /* =====================================
       ANIMATED MOBILE MENU ICON
    ===================================== */

    /*
        The active class is added above.

        Add the matching CSS from the bottom of
        this response to animate the three lines
        into an X.
    */


    /* =====================================
       COPYRIGHT YEAR
    ===================================== */

    const copyrightYear =
        document.getElementById("copyright-year");

    if (copyrightYear) {
        copyrightYear.textContent =
            new Date().getFullYear();
    }


    /* =====================================
       SMOOTH INTERNAL LINKS
    ===================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');


    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const targetElement =
                document.querySelector(targetID);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            targetElement.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches
                    ? "auto"
                    : "smooth",

                block: "start"
            });
        });
    });


    /* =====================================
       CURRENT NAVIGATION LINK
    ===================================== */

    /*
        This automatically marks the correct page
        active, even if the active class was
        accidentally left off the HTML.
    */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    navigationLinks.forEach((link) => {
        const linkPage =
            link.getAttribute("href")
                ?.split("/")
                .pop();


        if (linkPage === currentPage) {
            link.classList.add("active");

            link.setAttribute(
                "aria-current",
                "page"
            );
        }

        else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });


    /* =====================================
       IMAGE LOADING
    ===================================== */

    /*
        Add the loaded class after an image has
        completely loaded.

        This can be used for a soft fade-in effect.
    */

    const websiteImages =
        document.querySelectorAll("img");


    websiteImages.forEach((image) => {
        if (image.complete) {
            image.classList.add("loaded");
        }

        else {
            image.addEventListener(
                "load",
                () => {
                    image.classList.add("loaded");
                },

                {
                    once: true
                }
            );
        }
    });

});