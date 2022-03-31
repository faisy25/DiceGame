'use strict';

const playersAdjustment = document.querySelector('.players-adjustment');
const btnAlign = document.querySelector('.btn-align');
const imgAlign = document.querySelector('.img-align');

const score0E = document.querySelector('#score--0');
const score1E = document.getElementById('score--1');
const currScore0 = document.getElementById('current--0');
const currScore1 = document.getElementById('current--1');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

const diceE = document.querySelector('.dice');
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playing, scores;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0E.textContent = 0;
  score1E.textContent = 0;
  currScore0.textContent = 0;
  currScore1.textContent = 0;
  diceE.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

roll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceE.classList.remove('hidden');
    diceE.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore = currentScore + dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      currScore0.textContent = currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

hold.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    //   console.log(scores[activePlayer]);
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceE.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

newGame.addEventListener('click', init);
