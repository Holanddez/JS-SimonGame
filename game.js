var userPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var started = false;

$(".btn").on("click", function (e){
    var userChosenColor = e.target.id;
    userPattern.push(userChosenColor)
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkSequence(userPattern.length-1);
});

$(document).on("keypress", function (){
    if (started === false){
        nextSequence();
        started = true;
    }
});

function checkSequence(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]){
        if(userPattern.length === gamePattern.length){
            setTimeout(nextSequence, 1000);
        }
    }
    else{
        $("h1").text("Game Over, Press Any Key to Restart");
        var wrongAudio = new Audio("sounds/wrong.mp3");
        wrongAudio.play();
        $(document.body).addClass("game-over");
        setTimeout(function (){
            $(document.body).removeClass("game-over");
        }, 200);
        startOver();
    }
}

function nextSequence() {
    userPattern = []
    level++;
    $("h1").text("Level " + level);

    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function startOver() {
    gamePattern = [];
    started = false;
    level = 0;
}

function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}