new Audio("sounds/beep1.mp3");
new Audio("sounds/beep1_long.mp3");
new Audio("sounds/toggle.mp3");
new Audio("sounds/reset.mp3");

var std_stopwatch_intervalfunc = 0;
var main_text_scale = 1.0;
var std_stopwatch_ispaused = false;

function openWindowClass(wclass) {
    document.querySelector(`.window.${wclass}`).style.display="";
}

function closeWindowClass(wclass) {
    document.querySelector(`.window.${wclass}`).style.display="none";
}

function standardStopwatch_setText(str) {
    document.querySelector(
        `.window-standard-stopwatch .digital-stopwatch .text-main`
    ).innerHTML = str;
}

function formattedTimeString(seconds) {
    return `${(Math.floor(seconds / 3600) % 24).toString().padStart(2, "0")}:${(
        Math.floor(seconds / 60) % 60
    )
        .toString()
        .padStart(2, "0")}:${Math.round(seconds % 60)
        .toString()
        .padStart(2, "0")}`;
}

function playSound(url) {
    var audio = new Audio(url);
    audio.play();
}

function zoomIn() {
    playSound("sounds/button_press.mp3");
    main_text_scale += 0.2;
    document.querySelector(
        ".text-main"
    ).style.transform = `scale(${main_text_scale})`;
}

function zoomReset() {
    playSound("sounds/button_press.mp3");
    main_text_scale = 1;
    document.querySelector(
        ".text-main"
    ).style.transform = `scale(${main_text_scale})`;
}

function zoomOut() {
    playSound("sounds/button_press.mp3");
    main_text_scale -= 0.2;
    document.querySelector(
        ".text-main"
    ).style.transform = `scale(${main_text_scale})`;
}

// credits for this function: https://stackoverflow.com/users/1731941/vjs
function toggleFullScreen() {
    playSound("sounds/button_press.mp3");
    if (
        !document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement &&
        !document.webkitFullscreenElement
    ) {
        // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(
                Element.ALLOW_KEYBOARD_INPUT
            );
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
}

function standardStopwatch_intervalfunc() {
    std_stopwatch_counter++;
    standardStopwatch_setText(formattedTimeString(std_stopwatch_counter));
}

function standardStopwatch_start() {
    document.querySelector(`#std_stopwatch_btn_pause span`).innerHTML = "Pause";
    document
        .querySelector(`#std_stopwatch_btn_start`)
        .classList.add("disabled");
    document
        .querySelector(`#std_stopwatch_btn_pause`)
        .classList.add("disabled");
    document
        .querySelector(`#std_stopwatch_btn_reset`)
        .classList.add("disabled");
    document.querySelector(`#std_stopwatch_btn_start span`).innerHTML =
        "Restart";
    playSound("sounds/beep1.mp3");
    standardStopwatch_setText(formattedTimeString(3));
    setTimeout(() => {
        playSound("sounds/beep1.mp3");
        standardStopwatch_setText(formattedTimeString(2));
    }, "1000");
    setTimeout(() => {
        playSound("sounds/beep1.mp3");
        standardStopwatch_setText(formattedTimeString(1));
    }, "2000");
    setTimeout(() => {
        playSound("sounds/beep1_long.mp3");
        document
            .querySelector(`#std_stopwatch_btn_pause`)
            .classList.remove("disabled");
        document
            .querySelector(`#std_stopwatch_btn_reset`)
            .classList.remove("disabled");
        standardStopwatch_setText(formattedTimeString(0));
        std_stopwatch_counter = 0;
        standardStopwatch_resume();
    }, "3000");
}

function standardStopwatch_pause() {
    window.clearInterval(std_stopwatch_interval);
    std_stopwatch_ispaused = true;
}

function standardStopwatch_resume() {
    std_stopwatch_interval = setInterval(standardStopwatch_intervalfunc, 1000);
    std_stopwatch_ispaused = false;
}

function standardStopwatch_reset() {
    playSound("sounds/reset.mp3");
    standardStopwatch_setText(formattedTimeString(0));
    std_stopwatch_counter = 0;
    standardStopwatch_pause();
    standardStopwatch_resume();
    document.querySelector(`#std_stopwatch_btn_pause span`).innerHTML = "Pause";
    document
        .querySelector(`#std_stopwatch_btn_start`)
        .classList.add("disabled");

    // standardStopwatch_pause();
    // standardStopwatch_setText(formattedTimeString(0))
    // document.querySelector(`#std_stopwatch_btn_pause span`).innerHTML = "Pause";
    // document.querySelector(`#std_stopwatch_btn_start`).classList.remove("disabled")
    // document.querySelector(`#std_stopwatch_btn_pause`).classList.add("disabled")
    // document.querySelector(`#std_stopwatch_btn_reset`).classList.add("disabled")
}

function standardStopwatch_pauseToggle() {
    playSound("sounds/toggle.mp3");
    if (std_stopwatch_ispaused) {
        standardStopwatch_resume();
        document.querySelector(`#std_stopwatch_btn_pause span`).innerHTML =
            "Pause";
        document
            .querySelector(`#std_stopwatch_btn_start`)
            .classList.add("disabled");
    } else {
        standardStopwatch_pause();
        document.querySelector(`#std_stopwatch_btn_pause span`).innerHTML =
            "Resume";
        document
            .querySelector(`#std_stopwatch_btn_start`)
            .classList.remove("disabled");
    }
}
