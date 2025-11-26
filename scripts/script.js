const categories = {
    food: [
        {question: "What popular street food is made with curried chickpeas?", answer: "doubles", points: 10},
        {question: "What is the name of the flatbread used in “doubles?", answer: "bara", points: 20},
        {question: "What is the base ingredient of callaloo?", answer: "dasheen", points: 40},
        {question: "What is the main ingredient in pastelles?", answer: "cornmeal", points: 80}
    ],
    famous: [
        {question: "Who is the first Prime Minister of Trinidad and Tobago?", answer: "eric williams", points: 10},
        {question: "Who is the first female calypsonian to win Calypso Monarch?", answer: "calypso rose", points: 20},
        {question: "Who is the first President of Trinidad and Tobago?", answer: "ellis clark", points: 40},
        {question: "Who is the first Olympic gold medalist for Trinidad and Tobago?", answer: "hasely crawford", points: 80}
    ],
    geography: [
        {question: "What is the name of the longest river in Trinidad?", answer: "caroni", points: 10},
        {question: "What is the name of the famous pitch lake located in Trinidad?", answer: "la brea pitch lake", points: 20},
        {question: "What is the name of the largest bay in Trinidad?", answer: "manzanilla", points: 40},
        {question: "Which body of water separates Trinidad from Venezuela?", answer: "gulf of paria", points: 80}
    ],
    celebrations: [
        {question: "What Hindu festival of lights is widely celebrated in Trinidad and Tobago?", answer: "diwali", points: 10},
        {question: "What is the name of the Hindu festival of colors?", answer: "holi", points: 40},
        {question: "What is the name of the largest annual cultural event in Trinidad and Tobago?", answer: "carnival", points: 80},
        {question: "What is the name of the festival with steelpan competitions?", answer: "panorama", points: 20}
    ]
};

let currentCategory = [];
let currentIndex = 0;
let score = 0;
let wrongStreak = 0;

let timer;
let timeLeft = 18;

const startBtn = document.getElementById("startGame");
const gameArea = document.getElementById("gameArea");
const displayArea = document.getElementById("displayArea");
const answerInput = document.getElementById("answer");
const submitBtn = document.getElementById("submitAnswer");
const scoreElement = document.getElementById("score");
const exitBtn = document.getElementById("exitGame");
const timerElement = document.getElementById("timer");

startBtn.addEventListener("click", () => {
    const playerName = document.getElementById("playerName").value.trim();
    const category = document.getElementById("category").value;

    if (!playerName) {
        alert("Please enter your name");
        return;
    }

    currentCategory = categories[category];
    currentIndex = 0;
    score = 0;
    wrongStreak = 0;

    gameArea.classList.remove("hidden");
    exitBtn.classList.remove("hidden");
    answerInput.style.display = "inline";
    submitBtn.style.display = "inline";
    timerElement.style.display = "block";

    scoreElement.textContent = `Score: ${score}`;
    showQuestion();
});

function startTimer() {
    clearInterval(timer);
    timeLeft = 10;
    timerElement.textContent = `Time left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    wrongStreak++;
    alert(`Times up.  The correct answer was: ${currentCategory[currentIndex].answer}`);

    if (wrongStreak >= 3) {
        endGame(`Game Over ${document.getElementById("playerName").value} You answered 3 wrong in a row. Your Final Score is: ${score}`);
        return;
    }

    currentIndex++;
    showQuestion();
}

function showQuestion() {
    if (currentIndex < currentCategory.length) {
        displayArea.textContent = currentCategory[currentIndex].question;
        answerInput.value = "";
        startTimer();
    } else {
        clearInterval(timer);
        endGame(`Congratulations ${document.getElementById("playerName").value}, You completed the ${document.getElementById("category").value} category Your Final Score is: ${score}`);
    }
}

submitBtn.addEventListener("click", () => {
    clearInterval(timer);
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = currentCategory[currentIndex].answer;

    if (userAnswer === correctAnswer) {
        score += currentCategory[currentIndex].points;
        wrongStreak = 0;
        alert ("Nice!, That answer was Correct");
    } else {
        wrongStreak++;
        alert(`Thats Wroong, The Correct answer was: ${correctAnswer}`);

        if (wrongStreak >= 3) {
            endGame(`Game Over ${document.getElementById("playerName").value}, You answered 3 questions wrong. Your Final Score is: ${score}`);
            return;
        }
    }
    
    scoreElement.textContent = `Score: ${score}`;
    currentIndex++;
    showQuestion();
});

// Exit button
exitBtn.addEventListener("click", () => {
    clearInterval(timer);
    endGame(` Thank you for playing ${document.getElementById("playerName").value}. You have exited the game. Your Final Score is: ${score}`);
});

function endGame(message) {
    displayArea.textContent = message;
    answerInput.style.display = "none";
    submitBtn.style.display = "none";
    timerElement.style.display = "none";
    exitBtn.classList.add("hidden");
}