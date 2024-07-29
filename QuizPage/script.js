// script.js
document.addEventListener("DOMContentLoaded", () => {
    let timeLeft = document.querySelector(".time-left");
    let quizContainer = document.getElementById("container");
    let nextBtn = document.getElementById("next-button");
    let countOfQuestion = document.querySelector(".number-of-question");
    let displayContainer = document.getElementById("display-container");
    let scoreContainer = document.querySelector(".score-container");
    let restart = document.getElementById("restart");
    let userScore = document.getElementById("user-score");
    let startScreen = document.querySelector(".start-screen");
    let startButton = document.getElementById("start-button");
    let questionCount;
    let scoreCount = 0;
    let count = 11;
    let countdown;

    // Questions and Options array
    const quizArray = [
        {
            id: "0",
            question: " Today, in the Bombay and Calcutta High Courts there is a separate class of legal practitioners, known as ___________, who prepare the case, but  do not argue in court.",
            options: ["Attorneys", "Pleaders", "Barristers", "Solicitors"],
            correct: "Solicitors",
        },
        {
            id: "1",
            question: "Which of the following is NOT a function of an Inn of Court?",
            options: ["Providing residential course", "Organising Moots", "Client meetnigs", "Scholarships"],
            correct: "Organising Moots",
        },
        {
            id: "2",
            question: " In _____________ lawyers are forbidden to advertise on television, radio and in the cinemas but are permitted to advertise in print media.",
            options: ["USA", "Malaysia", "India", "Hong Kong"],
            correct: "Hong Kong",
        },
        {
            id: "3",
            question: "At present there are ____ National Law Schools in India",
            options: ["14", "Not Known", "1", "17"],
            correct: "17",
        },
        {
            id: "4",
            question: " A Senior Advocate is an advocate who has been officially designated as such by either high court or _______",
            options: ["All of these", "Village Panchayat", "Supreme Court", "District Court"],
            correct: "Supreme Court",
        },
        {
            id: "5",
            question: "In UK, What is the most important difference between barristers and solicitors",
            options: ["Barristers cannot appear in higher courst", "Barristers are more experiened", "Solicitors can only appear", "None of these"],
            correct: "Solicitors can only appear",
        }, {
            id: "6",
            question: "German legal education provides a law degree for ___ years",
            options: ["Five", "Three", "Two", "Four"],
            correct: "Four",
        },
        {
            id: "7",
            question: "Who has restricted lawyers in India from advertising themselves?",
            options: ["Government of India", "Bar Council of India", "Constitution of India", "All of these"],
            correct: "Bar Council of India",
        },
        {
            id: "8",
            question: "In USA, which state's jurisdiction is the most open to foreign lawyers?",
            options: ["New York", "California", "SWashington", "Ohio"],
            correct: "New York",
        },
        {
            id: "9",
            question: "Which of these classes of Legal Practitioners does not exist today?",
            options: ["Senior Advocate", "Advocate", "Pleader", "All of these"],
            correct: "Pleader",
        },
        {
            id: "10",
            question: " When was the Advocates Act passed?",
            options: ["1965", "1947", "1961", "1951"],
            correct: "1961",
        },
        {
            id: "11",
            question: "Who was the first Indian lady Vakil?",
            options: ["Cornelia Sorabji", "Boswelia Sorabji", "Corning Sorabji", "Dawlig Morarji"],
            correct: "Cornelia Sorabji",
        },
        {
            id: "12",
            question: "In UK, all barristers must be members of any ________.",
            options: ["Bar Council", "Court Café", "Inn of Court", "All of these"],
            correct: "Inn of Court",
        },
        {
            id: "13",
            question: "What distinction do Senior Advocates bear in their uniform?",
            options: ["Black Gown", "Black Gown with flaps", "Black Coat", "All of these"],
            correct: "Black Gown with flaps",
        },
        {
            id: "14",
            question: " Which of these is an acronym of a Law entrance test in India?",
            options: ["LSAAT", "LST", "AILET", "LET"],
            correct: "AILET",
        },
        {
            id: "15",
            question: "What is the 3 year Law degree in the USA called?",
            options: ["Juris Doctor", "Judgement Debtor", "Judicial Degree", "None of these"],
            correct: "Juris Doctor",
        },
    ];

    // Restart Quiz
    restart.addEventListener("click", () => {
        initial();
        displayContainer.classList.remove("hide");
        scoreContainer.classList.add("hide");
    });

    // Next Button
    nextBtn.addEventListener("click", () => {
        questionCount += 1;
        if (questionCount === quizArray.length) {
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            userScore.innerHTML = `Your score is ${scoreCount} out of ${questionCount}`;
        } else {
            countOfQuestion.innerHTML = `${questionCount + 1} of ${quizArray.length} Questions`;
            quizDisplay(questionCount);
            count = 11;
            clearInterval(countdown);
            timerDisplay();
        }
    });

    // Timer
    const timerDisplay = () => {
        countdown = setInterval(() => {
            count--;
            timeLeft.innerHTML = `${count}s`;
            if (count === 0) {
                clearInterval(countdown);
                nextBtn.click(); // Trigger next button click
            }
        }, 1000);
    };

    // Display quiz
    const quizDisplay = (questionCount) => {
        let quizCards = document.querySelectorAll(".container-mid");
        quizCards.forEach((card) => card.classList.add("hide"));
        quizCards[questionCount].classList.remove("hide");
    };

    // Quiz Creation
    function quizCreator() {
        quizArray.sort(() => Math.random() - 0.5);
        for (let i of quizArray) {
            i.options.sort(() => Math.random() - 0.5);
            let div = document.createElement("div");
            div.classList.add("container-mid", "hide");
            let question_DIV = document.createElement("p");
            question_DIV.classList.add("question");
            question_DIV.innerHTML = i.question;
            div.appendChild(question_DIV);
            div.innerHTML += `
                <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
                <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
                <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
                <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
            `;
            quizContainer.appendChild(div);
        }
    }

    // Checker Function
    window.checker = (userOption) => {
        let userSolution = userOption.innerText;
        let question = document.getElementsByClassName("container-mid")[questionCount];
        let options = question.querySelectorAll(".option-div");

        if (userSolution === quizArray[questionCount].correct) {
            userOption.classList.add("correct");
            scoreCount++;
        } else {
            userOption.classList.add("incorrect");
            options.forEach((element) => {
                if (element.innerText === quizArray[questionCount].correct) {
                    element.classList.add("correct");
                }
            });
        }

        clearInterval(countdown);
        options.forEach((element) => element.disabled = true);
    };

    // Initial setup
    function initial() {
        quizContainer.innerHTML = "";
        questionCount = 0;
        scoreCount = 0;
        count = 11;
        quizCreator();
        quizDisplay(questionCount);
        countOfQuestion.innerHTML = `1 of ${quizArray.length} Questions`;
        timerDisplay();
    }

    // Start the quiz
    startButton.addEventListener("click", () => {
        startScreen.classList.add("hide");
        displayContainer.classList.remove("hide");
        initial();
    });
});
