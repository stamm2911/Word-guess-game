var startBtn = document.getElementById("start-button");
var secretWordIn = document.getElementById("secret-word");
var wins = document.getElementById("wins");
var losses = document.getElementById("losses");
var resetBtn = document.getElementById("reset-button");
var secLeft = document.getElementById("seconds-left");
var secretWordsArray = [
  "storage",
  "string",
  "document",
  "selector",
  "append",
  "attribute",
];
var totalWins;
var totalLosses;
var timeLeft = 8;
var secretWord;
var secretArray = [];
var randomNum = 0;
var gameStatus = startBtn.getAttribute("data-status");

init();

startBtn.addEventListener("click", function (event) {
  event.preventDefault();
  randomNum = Math.floor(Math.random() * 6);
  secretWord = secretWordsArray[randomNum].split("");
  gameStatus = startBtn.getAttribute("data-status");
  if (gameStatus === "off") {
    startBtn.setAttribute("data-status", "on");
    timeLeft = 8;
    timer();
    secretArray = [];
    secLeft.textContent = timeLeft;
    for (var i = 0; i < secretWord.length; i++) {
      secretArray.push(" - ");
    }
    secretWordIn.children[0].textContent = secretArray.join("");
  }
});

document.addEventListener("keypress", function (event) {
  event.preventDefault();
  event.stopPropagation();
  gameStatus = startBtn.getAttribute("data-status");
  if (gameStatus === "on") {
    var key = event.key.toLowerCase();
    if (secretWord.includes(key)) {
      for (var i = 0; i < secretWord.length; i++) {
        if (key == secretWord[i]) {
          secretArray[i] = key;
          secretWordIn.children[0].textContent = secretArray.join("");
        }
      }
      validateWin();
    }
  }
});

resetBtn.addEventListener("click", function (event) {
  event.preventDefault();
  totalWins = 0;
  totalLosses = 0;
  localStorage.setItem("totalWins", 0);
  localStorage.setItem("totalLosses", 0);
  wins.children[0].textContent = totalWins;
  losses.children[0].textContent = totalLosses;
});

function init() {
  secLeft.textContent = 8;
  totalWins = localStorage.getItem("totalWins");
  totalLosses = localStorage.getItem("totalLosses");
  wins.children[0].textContent = totalWins;
  losses.children[0].textContent = totalLosses;
}

function validateWin() {
  if (secretWordsArray[randomNum] === secretArray.join("")) {
    secretWordIn.children[0].textContent =
      "'" + secretWordsArray[randomNum] + "'" + " You won!!!🏆";
    startBtn.setAttribute("data-status", "off");
    totalWins++;
    localStorage.setItem("totalWins", totalWins);
    wins.children[0].textContent = totalWins;
  }
}

function timer() {
  var timerInterval = setInterval(function () {
    gameStatus = startBtn.getAttribute("data-status");
    if (gameStatus === "on") {
      timeLeft--;
      secLeft.textContent = timeLeft;
    } else if (gameStatus == "off") {
      clearInterval(timerInterval);
    }
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      startBtn.setAttribute("data-status", "off");
      secretWordIn.children[0].textContent = "You lost...";
      totalLosses++;
      localStorage.setItem("totalLosses", totalLosses);
      losses.children[0].textContent = totalLosses;
    }
  }, 1000);
}
