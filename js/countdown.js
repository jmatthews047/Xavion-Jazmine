/* =========================================
   THE BAKER WEDDING — COUNTDOWN
========================================= */

/*
    The wedding time is not confirmed yet.

    This countdown currently ends at 12:00 AM in Kansas City
    on May 20, 2028.

    When the ceremony time is confirmed, replace 00:00:00
    with the correct time.

    Examples:
    4:00 PM = 16:00:00
    5:30 PM = 17:30:00
*/

const weddingDate = new Date("2028-05-20T00:00:00-05:00");


/* Countdown elements */

const daysElement = document.getElementById("countdown-days");
const hoursElement = document.getElementById("countdown-hours");
const minutesElement = document.getElementById("countdown-minutes");
const secondsElement = document.getElementById("countdown-seconds");

const countdownContainer = document.querySelector(".countdown-grid");


/* Make sure the countdown exists on the current page */

if (
    daysElement &&
    hoursElement &&
    minutesElement &&
    secondsElement
) {
    function updateWeddingCountdown() {
        const currentDate = new Date();
        const timeRemaining =
            weddingDate.getTime() - currentDate.getTime();


        /* Wedding day has arrived */

        if (timeRemaining <= 0) {
            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div class="countdown-complete">
                        <p>Today is the day!</p>
                        <span>Jazmine & Xavion are getting married.</span>
                    </div>
                `;
            }

            clearInterval(countdownTimer);
            return;
        }


        /* Calculate remaining time */

        const totalSeconds = Math.floor(timeRemaining / 1000);

        const days = Math.floor(
            totalSeconds / 60 / 60 / 24
        );

        const hours = Math.floor(
            (totalSeconds / 60 / 60) % 24
        );

        const minutes = Math.floor(
            (totalSeconds / 60) % 60
        );

        const seconds = Math.floor(
            totalSeconds % 60
        );


        /* Add a leading zero when needed */

        daysElement.textContent = String(days).padStart(2, "0");

        hoursElement.textContent = String(hours).padStart(2, "0");

        minutesElement.textContent = String(minutes).padStart(2, "0");

        secondsElement.textContent = String(seconds).padStart(2, "0");
    }


    /* Run immediately when the page opens */

    updateWeddingCountdown();


    /* Update every second */

    const countdownTimer = setInterval(
        updateWeddingCountdown,
        1000
    );
}