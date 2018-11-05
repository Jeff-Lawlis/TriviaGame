$(document).ready(function(){
var trivia = [
    {
        question: "random placeholder stuff 1",
        answers: ["something1", "something2"],
        correctAnswer: "something2"
    },
    {
        question: "random placeholder stuff 2",
        answers: ["something1", "something2"],
        correctAnswer: "something1"
    }
]
var currentQuestion  
var correct = 0
var incorrect = 0
var time = 5
var intervalId
var gameOver = false

function fillButtons(answer){
    button = $("<button>").addClass("btn btn-secondary").text(answer)
    $("#answers-block").append(button)
}
function resetQuestion(){
    checkWin()
    if(gameOver === false){
        currentQuestion = trivia[Math.floor(Math.random() * trivia.length)]
        $(".card-title").text("Question " + parseInt(correct + incorrect + 1))
        $("#current-question").text(currentQuestion.question)
        $("#answers-block").html("<span>")
        $("#win-loss").text("Correct: " + correct + " Incorrect: " + incorrect)
        for(var i = 0; i < currentQuestion.answers.length; i++){
            fillButtons(currentQuestion.answers[i])
        }
        time = 5
        timerRun()
        $("button").on("click", function(){
            checkAnswer(this.innerText, currentQuestion.correctAnswer)
            checkWin()
        })
    }
}
function timerRun(){
    clearInterval(intervalId)
    intervalId = setInterval(decrement, 1000)
}
function stopTimer(){
    clearInterval(intervalId)
}
function decrement(){
    if(time > 0){
        time--
        $("#show-timer").text("Time Remaining: " + time)
    } else {
        checkWin()
        stopTimer()
        renderTimeUp()
    }
}

function checkAnswer(currentAnswer, correctAnswer){
    if(currentAnswer === correctAnswer){
        renderCorrect()
        setTimeout(resetQuestion, 3000)
    } else {
        renderIncorrect()
        setTimeout(resetQuestion, 3000)
    }
}
function renderCorrect(){
    stopTimer()
    correct += 1
    $(".card-title").text("Correct!")
    $("#win-loss").text("Correct: " + correct + " Incorrect: " + incorrect)
    setTimeout(resetQuestion, 3000)
}
function renderIncorrect(){
    stopTimer()
    incorrect += 1
    $(".card-title").text("Incorrect!")
    $("#win-loss").text("Correct: " + correct + " Incorrect: " + incorrect)
    setTimeout(resetQuestion, 3000)
}
function renderTimeUp(){
    stopTimer()
    incorrect += 1
    $(".card-title").text("Time's Up!")
    $("#win-loss").text("Correct: " + correct + " Incorrect: " + incorrect)
    setTimeout(resetQuestion, 3000)
}
function renderWin(){
    stopTimer()
    $(".card-title").text("You Win!")
    $("#win-loss").text("Correct: " + correct + " Incorrect: " + incorrect)
}
function renderLoss(){
    stopTimer()
    $(".card-title").text("You Lose!")
    $("#win-loss").text("Correct: " + correct + " Incorrect: " + incorrect)
}
function checkWin(){
    if(correct >=5){
        gameOver = true
        clearTimeout()
        stopTimer()
        renderWin()
    } else if(incorrect >= 5){
        gameOver = true
        clearTimeout()
        stopTimer()
        renderLoss()
    }
}
function resetGame(){
    correct = 0
    incorrect = 0
    resetQuestion()
}
resetQuestion()
})