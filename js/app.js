/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * app.js */


let game;
let randomPhrase;
let phrase;
const startButton = document.querySelector('#btn__reset');
const qwertyKeyBoard = document.querySelector('#qwerty');

/**
 * Eventlistener on Start Game or Play Again button that starts or resets game
 */
startButton.addEventListener('click', ()=>{
  qwertyKeyBoard.focus();
  game = new Game();
  game.startGame();
  randomPhrase = game.getRandomPhrase();
  phrase = new Phrase(randomPhrase.phrase);
  if (startButton.value === 'play_again') {
    game.resetGame();
    game = new Game();
    game.startGame();
    randomPhrase = game.getRandomPhrase();
    phrase = new Phrase(randomPhrase.phrase);
  }
  console.log(`No peaking! Alright, here you go: ${game.activePhrase.phrase}`);
});

/**
 * Eventlistener on onbaord qwerty keyboard
 */
qwertyKeyBoard.addEventListener('click', (e)=>{
  if (e.target.type === 'submit') {
    game.handleInteraction(e.target.textContent);
    qwertyKeyBoard.focus();
  }
});

/**
 * It is possible to use physical keyboard
 */
qwertyKeyBoard.tabIndex = -1;

qwertyKeyBoard.addEventListener('keydown', (e) => {
  qwertyKeyBoard.focus();
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const keyButton = document.querySelector(`button[value="${e.key}"]`);
    if (keyButton.disabled !== true) {
      e.preventDefault();
      qwertyKeyBoard.focus();
      game.handleInteraction(e.key);
      if (game.checkForWin()) {
        game.gameOver(true);
      }
    }
  }
});