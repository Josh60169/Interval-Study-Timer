$(document).ready(() => {
    let runTimer = false;
    let pause = false;
    let studyVal;
    let breakVal;

    $("#submit-btn").click(() => {
        studyVal = $("#study-txtbox").val();
        breakVal = $("#break-txtbox").val();

        if (!(/\D/.test(studyVal)) && /\d/.test(studyVal)) {
            $("#timer").text(studyVal + ":00");
            $("#timer-header").text("Study Interval");
            runTimer = true;
        } else
            alert("Please enter a numeric value with no spaces");
    });

    $("#start-btn").click(() => {
        if (/\d/.test($("#timer").text())) {
            runTimer = true;
            pause = false;
        }

        if (runTimer && !timerFinished()) {
            setTimeout(subtractSec, 1000);
        }
    });

    $("#stop-btn").click(() => {
        runTimer = false;
        pause = true;
    });

    const subtractSec = () => {
        if (pause)
            return;

        let time = $("#timer").text();
        let seconds = parseInt(time.substring(time.indexOf(":") + 1));
        let minutes = parseInt(time.substring(0, time.indexOf(":")));

        if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else
            seconds--;
        
        if (seconds < 10)
            $("#timer").text(`${minutes}:0${seconds}`);
        else
            $("#timer").text(`${minutes}:${seconds}`);

        if (runTimer && !timerFinished() && !pause) 
            setTimeout(subtractSec, 1000);
        else if (!pause){
            if (timerFinished)
                document.getElementById("notification").play();
            
            if ($("#timer-header").text() === "Study Interval") {
                $("#timer-header").text("Break Time!");
                $("#timer").text(`${breakVal}:00`);

                $("#timer-screen").fadeOut();
                $("#timer-screen").css("background-color", "#C9E9F6");
                $("#timer-screen").fadeIn();
            } else {
                $("#timer-header").text("Study Interval");
                $("#timer").text(`${studyVal}:00`);

                $("#timer-screen").fadeOut();
                $("#timer-screen").css("background-color", "transparent");
                $("#timer-screen").fadeIn();
            }

            runTimer = false;
        }
    }

    const timerFinished = () => {
        let time = $("#timer").text();
        let seconds = parseInt(time.substring(time.indexOf(":") + 1));
        let minutes = parseInt(time.substring(0, time.indexOf(":")));

        if (seconds === 0 && minutes === 0)
            return true;
        else
            return false;
    }
});