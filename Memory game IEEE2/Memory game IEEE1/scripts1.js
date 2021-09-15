const cards = document.querySelectorAll('.memory-card');
var points = 0;
var track=0; //the track variable is used to signal when the game is finished, i.e when track = 6

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  // activates the flip class of the card
  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCards() : unflipCards();
}

//when a match is found, those two cards need to have their event listeners removed
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
  score();
}
//If cards do not match, then they are flipped back and returned to their original positon and board is reset
function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
  score_negative();
}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//everytime the user open the game. THe cards are shuffled into random positons. 
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();


function score(){
  document.getElementById("score").innerHTML= ++points;
  track++;
  //if track = 6, game is over and after 1500ms delay, tryAgain function is called
  if(track==6)
  {
    setTimeout(()=>{
      tryAgain();
    },1500);
    
  }
}
//Sends out an alert box to check if user wants to play again.
function tryAgain(){
  if (confirm("Play again?")) {
    //if user confrims, the page reloads
    location.reload();
  } else {
    alert('Thank you for playing!');
  }
}
//deducts points when the user makes an incorrect flip
function score_negative(){
  document.getElementById("score").innerHTML= --points;
}
//Adds an event listener to each card and waits for the user to click on it. When it is clicked, function flipCard is triggered
cards.forEach(card => card.addEventListener('click', flipCard));
