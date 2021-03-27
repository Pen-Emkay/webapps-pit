const problemElement = document.querySelector(".problem");
const formElement = document.querySelector(".game-form");
const inputElement = document.querySelector(".answer-input");
const attemptsLeft = document.querySelector("#attempts-left");
const mistakesLeft = document.querySelector("#mistakes-left");
const progressBar = document.querySelector(".progress-inner");
const messageElement = document.querySelector(".end-message");
const startOverButton = document.querySelector(".startOver-button");

let state = {
    score: 0,
    wrongAnswers: 0,
    maxQuestions: 0,
    questionsCount: 0,
    maxWrong: 0
}

function resetGame() {
    state.score = 0;
    state.wrongAnswers = 0;
    state.maxQuestions = 10;
    state.questionsCount = 0;
    state.maxWrong = 2;
    updateFeedback();
    progressBar.style.transform = `scaleX(0)`;
    document.body.classList.remove("overlay-is-visible");
    updateProblem();
}

function updateProblem() {
    state.problem = generateProblem();
    let p = state.problem;
    problemElement.innerHTML = `${p.noOne} ${p.operator} ${p.noTwo}`;
}

function winOrLose(result) {
    if (result) {
        messageElement.innerHTML = "Well done, you got all correct. Start over!";
    } else {
        messageElement.innerHTML = "Sorry, you have exceeded the allowed attempts. Start over!";
    }
    updateFeedback();
    document.body.classList.add("overlay-is-visible");
    setTimeout(() => startOverButton.focus(), 331)
}

function onSubmit(e) {
    e.preventDefault();
    let correctAnswer;
    const p = state.problem;
    if (p.operator == "+") { correctAnswer = p.noOne + p.noTwo; } else if (p.operator == "-") { correctAnswer = p.noOne - p.noTwo; } else if (p.operator == "X") { correctAnswer = p.noOne * p.noTwo; }

    if (parseInt(inputElement.value, 10) == correctAnswer) {
        state.score++;
        progressBar.style.transform = `scaleX(${state.score/10})`;
        updateFeedback();
        updateProblem();

    } else {
        state.wrongAnswers++;
        problemElement.classList.add("error-animate");
        setTimeout(() => problemElement.classList.remove("error-animate"), 451);
        updateFeedback();
    }

    if (state.questionsCount > state.maxQuestions) {
        winOrLose(true);
    }

    if (state.wrongAnswers >= state.maxWrong) {
        winOrLose(false);
    }
}


function generateNumber(max) {
    return Math.floor(Math.random() * (max + 1));
}

function generateProblem() {
    state.questionsCount++;
    return {
        noOne: generateNumber(10),
        noTwo: generateNumber(10),
        operator: ["+", "-", "X"][generateNumber(2)]
    }
}

function updateFeedback() {
    a = state.maxQuestions - (state.score + state.wrongAnswers);
    m = state.maxWrong - state.wrongAnswers;
    attemptsLeft.innerHTML = a;
    mistakesLeft.innerHTML = m;
    inputElement.value = "";
    inputElement.focus();
}

function start() {

    formElement.addEventListener("submit", onSubmit);
    startOverButton.addEventListener("click", resetGame);
    resetGame();
}