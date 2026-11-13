
// ========================================
// 1. QUESTIONS ARRAY OF OBJECTS
// ========================================

const questions = [
    {
        question: "What does HTML stand for?",
        choices: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        choices: ["HTML", "Python", "CSS", "Java"],
        answer: "CSS"
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        choices: ["var", "let", "const", "define"],
        answer: "const"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        choices: ["<!-- -->", "//", "**", "##"],
        answer: "//"
    },
    {
        question: "Which method adds an element to an array?",
        choices: ["pop()", "push()", "shift()", "join()"],
        answer: "push()"
    },
    {
        question: "What does DOM stand for?",
        choices: [
            "Document Object Model",
            "Data Object Management",
            "Digital Ordinance Model",
            "Document Order Method"
        ],
        answer: "Document Object Model"
    },
    {
        question: "Which method selects an element by its ID?",
        choices: [
            "queryClass()",
            "getElementById()",
            "getElement()",
            "selectId()"
        ],
        answer: "getElementById()"
    },
    {
        question: "Which operator checks strict equality?",
        choices: ["=", "==", "===", "!="],
        answer: "==="
    },
    {
        question: "Which loop runs while a condition is true?",
        choices: ["for", "while", "if", "switch"],
        answer: "while"
    },
    {
        question: "Which function converts JSON into a JavaScript object?",
        choices: [
            "JSON.stringify()",
            "JSON.parse()",
            "JSON.convert()",
            "JSON.object()"
        ],
        answer: "JSON.parse()"
    }
];


// ========================================
// 2. SCORE OBJECT
// ========================================

const score = {
    player: 0,
    computer: 0
};


// ========================================
// 3. GAME VARIABLES
// ========================================

let currentQuestion = 0;
let selectedAnswer = false;


// ========================================
// 4. DOM ELEMENTS
// ========================================

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const questionNumber = document.getElementById("question-number");
const playerScore = document.getElementById("player-score");
const computerScore = document.getElementById("computer-score");

const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const progress = document.getElementById("progress");

const quizSection = document.getElementById("quiz-section");
const resultSection = document.getElementById("result-section");

const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

const restartBtn = document.getElementById("restart-btn");


// ========================================
// 5. DISPLAY QUESTION
// ========================================

function showQuestion() {

    selectedAnswer = false;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;

    questionNumber.textContent =
        `Question ${currentQuestion + 1} / ${questions.length}`;

    document.getElementById("turn").textContent = "Your Turn";

    feedback.textContent = "";

    nextBtn.disabled = true;

    // Update progress bar

    progress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    // Clear previous options

    optionsElement.innerHTML = "";

    // Loop through choices array

    current.choices.forEach((choice, index) => {

        const button = document.createElement("button");

        button.classList.add("option-btn");

        button.textContent = `${String.fromCharCode(65 + index)}. ${choice}`;

        button.addEventListener("click", function () {
            checkAnswer(choice, button);
        });

        optionsElement.appendChild(button);

    });

}


// ========================================
// 6. CHECK ANSWER USING IF / ELSE
// ========================================

function checkAnswer(choice, selectedButton) {

    if (selectedAnswer) return;

    selectedAnswer = true;

    const correctAnswer = questions[currentQuestion].answer;

    const allButtons = document.querySelectorAll(".option-btn");

    allButtons.forEach(button => {
        button.disabled = true;

        if (button.textContent.slice(3) === correctAnswer) {
            button.classList.add("correct");
        }
    });

    // IF / ELSE CONDITIONAL

    if (choice === correctAnswer) {

        score.player++;

        feedback.textContent = "🎉 Correct! Great job!";

        feedback.style.color = "#28a745";

    } else {

        score.computer++;

        selectedButton.classList.add("wrong");

        feedback.textContent =
            `❌ Incorrect! Correct answer: ${correctAnswer}`;

        feedback.style.color = "#e74c3c";

    }

    // Update scores

    updateScore();

    document.getElementById("turn").textContent = "Round Completed";

    nextBtn.disabled = false;

}


// ========================================
// 7. UPDATE SCORE
// ========================================

function updateScore() {

    playerScore.textContent = score.player;

    computerScore.textContent = score.computer;

}


// ========================================
// 8. NEXT QUESTION
// ========================================

nextBtn.addEventListener("click", function () {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResults();

    }

});


// ========================================
// 9. SHOW FINAL RESULTS
// ========================================

function showResults() {

    quizSection.classList.add("hidden");

    resultSection.classList.remove("hidden");

    progress.style.width = "100%";

    finalScore.textContent =
        `${score.player} / ${questions.length}`;

    // IF / ELSE TO DETERMINE WINNER

    if (score.player > score.computer) {

        resultMessage.textContent =
            "🏆 Congratulations! You won the quiz!";

    } else if (score.player < score.computer) {

        resultMessage.textContent =
            "Keep practicing! You can do better next time.";

    } else {

        resultMessage.textContent =
            "🤝 It's a tie! Both scored equally.";

    }

}


// ========================================
// 10. RESTART GAME
// ========================================

restartBtn.addEventListener("click", function () {

    currentQuestion = 0;

    score.player = 0;

    score.computer = 0;

    updateScore();

    resultSection.classList.add("hidden");

    quizSection.classList.remove("hidden");

    showQuestion();

});


// ========================================
// 11. START GAME
// ========================================

showQuestion();
