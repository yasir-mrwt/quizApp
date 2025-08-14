// Sample quiz data
const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct: 1,
  },
  {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
    correct: 1,
  },
  {
    question: "In which year did World War II end?",
    options: ["1944", "1945", "1946", "1947"],
    correct: 1,
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correct: 2,
  },
  {
    question: "Which is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correct: 1,
  },
  {
    question: "What is the fastest land animal?",
    options: ["Lion", "Cheetah", "Leopard", "Tiger"],
    correct: 1,
  },
  {
    question: "Which ocean is the largest?",
    options: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correct: 3,
  },
  {
    question: "What is the hardest natural substance?",
    options: ["Gold", "Iron", "Diamond", "Silver"],
    correct: 2,
  },
  {
    question: "How many continents are there?",
    options: ["5", "6", "7", "8"],
    correct: 2,
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Michelangelo",
    ],
    correct: 2,
  },
  {
    question: "What is the longest river in the world?",
    options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
    correct: 1,
  },
  {
    question: "Which country gifted the Statue of Liberty to the US?",
    options: ["Spain", "France", "England", "Italy"],
    correct: 1,
  },
  {
    question: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correct: 2,
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    correct: 1,
  },
  {
    question: "How many bones are in the adult human body?",
    options: ["206", "300", "150", "412"],
    correct: 0,
  },
  {
    question: "Which country is home to the kangaroo?",
    options: ["New Zealand", "South Africa", "Australia", "Brazil"],
    correct: 2,
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Saturn", "Jupiter", "Neptune"],
    correct: 2,
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    correct: 1,
  },
  {
    question: "What is the main component of the Sun?",
    options: ["Liquid lava", "Hydrogen", "Oxygen", "Carbon"],
    correct: 1,
  },
  {
    question: "Which country has the most pyramids?",
    options: ["Egypt", "Mexico", "Sudan", "Peru"],
    correct: 2,
  },
  {
    question: "What is the world's most spoken language by native speakers?",
    options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
    correct: 3,
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Elephant", "Lion", "Gorilla"],
    correct: 2,
  },
  {
    question: "What is the currency of Japan?",
    options: ["Won", "Yen", "Yuan", "Ringgit"],
    correct: 1,
  },
  {
    question: "Which famous scientist developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Stephen Hawking",
    ],
    correct: 1,
  },
];
const radioBtns = document.querySelectorAll(".option-radio");
const optionText = document.querySelectorAll(".option-text");
const startbtn = document.querySelector("#startBtn");
const labels = document.querySelectorAll(".option-label");
const nextButton = document.querySelector("#nextBtn");
const timer = document.querySelector("#timer");
const qsDisplay = document.querySelector("#question");
const displayScore = document.querySelector("#score");
const resultScreen = document.querySelector(".result-screen");
const totalScore = document.querySelector("#finalScore");
const newGame = document.querySelector("#restartBtn");
const qsSection = document.querySelector(".question-section");
const optionForm = document.querySelector(".options-form");
const btnContainer = document.querySelector(".button-container");
const quizInfo = document.querySelector(".quiz-info");
let timerInterval;

//adding styles to radio buttons
const disabledRadioBtn = () => {
  radioBtns.forEach((element) => {
    element.disabled = true;
    element.style.pointerEvents = "none";
  });
};

//removing styling for each option
const disabledRadioEffect = () => {
  labels.forEach((element) => {
    element.classList.add("no-hover");
  });
};

startbtn.style.display = "block";
nextButton.style.display = "none";
disabledRadioBtn();
disabledRadioEffect();

//start quiz functionality
function startBtnFunctionality() {
  startbtn.addEventListener("click", () => {
    optionsFetching();
    nextButton.disabled = true;
    checkingRadioBtn();

    radioBtns.forEach((element) => {
      element.disabled = false;
      element.style.pointerEvents = "auto";
      labels.forEach((element) => {
        element.classList.remove("no-hover");
      });
    });
    startbtn.style.display = "none";
    nextButton.style.display = "block";
    updateTime();

    timerInterval = setInterval(() => {
      updateTime();
    }, 1000);
  });
}
startBtnFunctionality();

//timer functionality
const timerMin = 5 * 60;
let min = timerMin;
let savedTime = null;
let remainingTime = timerMin;

function updateTime() {
  if (min < 0) {
    clearInterval(timerInterval);
    endGame();
    return;
  }
  let minutes = Math.floor(min / 60);
  let seconds = min % 60;
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  timer.innerHTML = `Time: ${minutes}:${seconds}`;
  min--;
  remainingTime = min;
}

function StopTimer() {
  clearInterval(timerInterval);
}

function usedTime() {
  let timeUsed = timerMin - remainingTime;
  let usedMin = Math.floor(timeUsed / 60);
  let usedSeconds = timeUsed % 60;

  // Format seconds with leading zero if needed
  if (usedSeconds < 10) {
    usedSeconds = "0" + usedSeconds;
  }

  return `${usedMin}:${usedSeconds}`;
}

//getting qs
let qsNumber = 0;
qsDisplay.textContent = quizData[qsNumber].question;
let currentQs = quizData[qsNumber];
function updateQs() {
  currentQs = quizData[qsNumber];
}

//fetching options with each qs
function optionsFetching() {
  currentQs.options.forEach((element, index) => {
    radioBtns[index].value = index;
    optionText[index].textContent = element;
  });
}

//checking radio buttons
let isRadioBtnSelected = false;
function checkingRadioBtn() {
  radioBtns.forEach((element) => {
    element.addEventListener("change", () => {
      isRadioBtnSelected = true;
      nextButton.disabled = false;
    });
  });
}
let correctAns = 0;
displayScore.textContent = `Your Score: 0/${quizData.length}`;

//update score
function updateScore() {
  displayScore.textContent = `Your Score: ${correctAns}/${quizData.length}`;
}

//check correct ans
function checkAns() {
  let selectedOption = document.querySelector('input[name="answer"]:checked');
  const correctAnsIndex = quizData[qsNumber].correct; // Fixed typo

  if (parseInt(selectedOption.value) === correctAnsIndex) {
    correctAns++;
    selectedOption.closest(".option-label").classList.add("correct");
  } else {
    selectedOption.closest(".option-label").classList.add("wrong");
    radioBtns[correctAnsIndex]
      .closest(".option-label")
      .classList.add("correct");
  }
  updateScore();
  nextButton.disabled = true;
}

//next button functionality
const nextBtnFunctionality = () => {
  if (!isRadioBtnSelected) {
    return;
  }
  disabledRadioBtn();
  disabledRadioEffect();

  checkAns();

  if (qsNumber >= quizData.length - 1) {
    endGame();
    return;
  } else {
    nextButton.classList.remove("end-quiz");
    qsNumber++;
  }

  currentQs = quizData[qsNumber];
  isRadioBtnSelected = false;
  nextButton.disabled = true;
  setTimeout(() => {
    qsDisplay.textContent = currentQs.question;
    radioBtns.forEach((element) => {
      element.disabled = false;
      element.style.pointerEvents = "auto";
    });
    labels.forEach((element) => {
      element.classList.remove("no-hover");
    });
    updateQs();
    optionsFetching();
    document.querySelectorAll(".option-label").forEach((element) => {
      element.classList.remove("correct", "wrong");
    });

    document.querySelector("#optionsForm").reset();
  }, 800);
};
nextButton.addEventListener("click", nextBtnFunctionality);

//changing next button into end game and adding functionality
const nextBtnSecondFunc = () => {
  addNewSCore();

  qsSection.style.display = "none";
  optionForm.style.display = "none";
  btnContainer.style.display = "none";
  quizInfo.style.display = "none";

  resultScreen.style.display = "block";
  StopTimer();
};

//end game functionality
function endGame() {
  totalScore.textContent = `Your Score: ${correctAns}/${quizData.length}`;
  nextButton.removeEventListener("click", nextBtnFunctionality);
  nextButton.disabled = false;
  nextButton.innerHTML = "End Game";
  nextButton.classList.add("end-quiz");
  disabledRadioBtn();
  disabledRadioEffect();
  nextButton.addEventListener("click", nextBtnSecondFunc);
}

// start new game logic functionality reseting all variables
function startNewewGame() {
  newGame.addEventListener("click", () => {
    clearInterval(timerInterval);
    min = timerMin;
    remainingTime = timerMin;
    updateTime();

    correctAns = 0;
    displayScore.textContent = `Score: 0/${quizData.length}`;

    qsNumber = 0;
    currentQs = quizData[0];

    labels.forEach((element) => {
      element.classList.remove("wrong", "correct", "no-hover");
    });
    optionForm.reset();
    radioBtns.forEach((element) => {
      element.disabled = false;
      element.style.pointerEvents = "auto";
    });

    qsDisplay.textContent = currentQs.question;
    optionsFetching();

    totalScore.textContent = `Your Score: ${correctAns}/${quizData.length}`;
    nextButton.classList.add("end-quiz");
    qsSection.style.display = "block";
    optionForm.style.display = "block";
    btnContainer.style.display = "block";
    quizInfo.style.display = "block";
    resultScreen.style.display = "none";

    nextButton.disabled = true;
    isRadioBtnSelected = false;

    startbtn.style.display = "block";
    nextButton.style.display = "none";

    disabledRadioBtn();
    disabledRadioEffect();

    nextButton.removeEventListener("click", nextBtnSecondFunc);
    nextButton.addEventListener("click", nextBtnFunctionality);
    nextButton.innerHTML = "NEXT QUESTION";
    nextButton.classList.remove("end-quiz");
  });
  displayingLeaderBoard();
}
startNewewGame();

// Clean old scores and add timestamp for 24-hour expiration
function cleanOldScores() {
  const scores = JSON.parse(localStorage.getItem("quizScore")) || [];
  const now = new Date().getTime();
  const twentyFourHours = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  // Filter out scores older than 24 hours
  const validScores = scores.filter((score) => {
    return score.timestamp && now - score.timestamp < twentyFourHours;
  });

  // Update localStorage with valid scores only
  localStorage.setItem("quizScore", JSON.stringify(validScores));
  return validScores;
}

//adding new score to local storage and fetching it for leader board
function addNewSCore() {
  // Clean old scores first
  cleanOldScores();

  let scoreObj = {
    score: `${correctAns}/${quizData.length}`,
    time: usedTime(),
    timestamp: new Date().getTime(), // Add timestamp for 24-hour expiration
  };

  const saved = JSON.parse(localStorage.getItem("quizScore")) || [];
  const allUpdatedScore = [...saved, scoreObj];
  localStorage.setItem("quizScore", JSON.stringify(allUpdatedScore));
  displayingLeaderBoard();
}

//displaying top 3 scorer on leader board
function displayingLeaderBoard() {
  // Clean old scores before displaying
  const topScorer = cleanOldScores();

  const leaderBoard = topScorer.map((result) => {
    const [correct, total] = result.score.split("/").map(Number);
    const [totalMin, totalSec] = result.time.split(":").map(Number);
    return {
      originalResult: result,
      scorePercentage: (correct / total) * 100,
      totalTime: totalMin * 60 + totalSec,
    };
  });

  const sorted = leaderBoard.sort((a, b) => {
    if (a.scorePercentage !== b.scorePercentage) {
      return b.scorePercentage - a.scorePercentage;
    } else return a.totalTime - b.totalTime;
  });

  const tops = [1, 2, 3].map((i) => {
    const items = sorted[i - 1];
    if (items) {
      return `Score: ${items.originalResult.score} Time: ${items.originalResult.time}`;
    } else {
      return "Score: - Time: -";
    }
  });

  document.querySelector("#top1").textContent = tops[0];
  document.querySelector("#top2").textContent = tops[1];
  document.querySelector("#top3").textContent = tops[2];
}

document.addEventListener("DOMContentLoaded", () => {
  displayingLeaderBoard();
});
