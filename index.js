"use strict";

// DOM Elements
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");
const btnNew = document.querySelector(".btn-new");
const diceImg = document.querySelector(".dice-img");
const total0El = document.querySelector(".total-score--0");
const total1El = document.querySelector(".total-score--1");
const current0El = document.querySelector(".current-score--0");
const current1El = document.querySelector(".current-score--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");

// Initialize The Game,-
let totalScore, currentScore, activePlayer, isPlaying;
const initGame = function() {
    totalScore = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    isPlaying = true;

    player0.classList.add("active");
    player1.classList.remove("active");
    player0.classList.remove("winner");
    player1.classList.remove("winner");
    diceImg.classList.add("hidden");
    
    total0El.textContent = 0;
    total1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
}
initGame();

// Switch Player
const switchPlayer = function() {
    currentScore = 0;
    document.querySelector(`.current-score--${activePlayer}`).textContent = currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0.classList.toggle("active");
    player1.classList.toggle("active");
}

// Roll The Dice
btnRoll.addEventListener("click", function() {
    if(isPlaying) {
        const dice = Math.floor(Math.random() * 6) + 1; // Random dice
        diceImg.src = `img/dice-${dice}.png` // Change dice image
        diceImg.classList.remove("hidden");
        
        if(dice !== 1) { // Increse current score
            currentScore += dice;
            document.querySelector(`.current-score--${activePlayer}`).textContent = currentScore;
        } else { // Switch turn if 1 is rolled
            switchPlayer();
        }
    }
})

// Hold The Hand
btnHold.addEventListener("click", function() {
    if(isPlaying) {
        totalScore[activePlayer] += currentScore;
        document.querySelector(`.total-score--${activePlayer}`).textContent = totalScore[activePlayer];

        if(totalScore[activePlayer] >= 100) { // Check The Winner
            document.querySelector(`.player--${activePlayer}`).classList.add("winner");
            diceImg.classList.add("hidden");
            isPlaying = false;
        } else {
            switchPlayer();
        }
    }
})

// New Game
btnNew.addEventListener("click", initGame);