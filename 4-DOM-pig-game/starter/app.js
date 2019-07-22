/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/var scores, roundScore, activePlayer, rollHistory, winScore;

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  winScore = 100;
  rollHistory = [];

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-0-panel').classList.remove('active')
  document.querySelector('.player-1-panel').classList.remove('active')

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';


  document.querySelector('.player-0-panel').classList.add('active')

}

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  var dice = Math.floor(Math.random() * 6) + 1;
  var dice2 = Math.floor(Math.random() * 6) + 1;

  rollHistory.push(dice);
  //display result
  diceImage(dice, '.dice');
  diceImage(dice2, '.dice2');


  document.querySelector('.dice').style.display = 'block';
  document.querySelector('.dice2').style.display = 'block';


  document.getElementById(`current-${activePlayer}`).textContent = dice;
  //update round score if rolled number is not 1
  if (dice !== 1 && dice2 !== 1 ) {
    roundScore += dice += dice2;

    document.getElementById(`current-${activePlayer}`).textContent = roundScore;
  } else {
    nextPlayer();
  }

  if (rollHistory.length > 0) {
    if (rollHistory[rollHistory.length - 2] === 6 && dice === 6) {
      nextPlayer();
      win();
    }
  }
});

function diceImage(number, dice) {
  var diceDOM = document.querySelector(dice);
  diceDOM.src = `dice-${number}.png`;
}

document.querySelector('.btn-hold').addEventListener('click', function () {

  scores[activePlayer] += roundScore;
  document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
  roundScore = 0;
  if (scores[activePlayer] >= winScore ) {
    // document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
    win();

  } else {
    nextPlayer();
  }

});

document.querySelector('.btn-submit').addEventListener('click', function () {

  var customScore = document.getElementById('custom-score').value;

  if (!Number.isNaN(parseInt(document.getElementById('custom-score').value, 10))) {
    winScore = document.getElementById('custom-score').value;
    document.getElementById('custom-score').value = `Win score is ${winScore}`;
  } else {
    document.getElementById('custom-score').value = 'Not number';
  }

});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

}

function win() {
  document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
  document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
  document.querySelector('.btn-roll').style.display = 'none';
  document.querySelector('.btn-hold').style.display = 'none';
}



document.querySelector('.btn-new').addEventListener('click', init);

/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/
