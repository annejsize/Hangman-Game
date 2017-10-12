// ------------- GLOBAL VARIABLES ----------------
// ===============================================
// Arrays and variables for holding data
var wordOptions = ["spooky", "ghosts", "zombies", "monsters", "Trump", "witches"];
var selectedWord = "";
var lettersInWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game counters
var winCount = 0;
var lossCount = 0;
var guessesLeft = 9;

// ------------- FUNCTIONS ---------------
// ===============================================
//

function startGame() {
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersInWord = selectedWord.split("");
  numBlanks = selectedWord.length;

  //Reseters
  guessesLeft = 9;
  var wrongLetters = [];
  var blanksAndSuccesses = [];

  //Populate blanks and correct guesses with the right number of blanks.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  //Change HTML to reflect round conditions
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("winCounter").innerHTML = winCount;
  document.getElementById("lossCounter").innerHTML = lossCount;

  //TESTERS
  console.log(selectedWord);
  console.log(lettersInWord);
  console.log(numBlanks);
}

function checkLetters(letter) {
  //Check to see if the letter is even in the wordToGuess
  var isLetterInWord = false;

  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }
  if (isLetterInWord) {
    for (var j = 0; j < numBlanks; j++) {
      if (selectedWord[j] == letter) {
        blanksAndSuccesses[j] = letter;
      }
    }
  } else {
    wrongLetters.push(letter);
    guessesLeft--;
  }
}

function roundComplete() {
  console.log("Win Count: " + winCount + " | Loss Count: " + lossCount + " | Guesses Left " + guessesLeft);

  document.getElementById("numGuesses").innerHTML = guessesLeft;
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("wrongGuesses").innerHTML = wrongLetters.join(" ");


  if (lettersInWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!");

    document.getElementById("winCounter").innerHTML = winCount;
    startGame();
  } else if (guessesLeft == 0) {
    lossCount++;
    alert("You lost. *sad face*");
    document.getElementById("lossCounter").innerHTML = lossCount;

    startGame();
  }
}


// ------------- MAIN PROCESSES ---------------//
// ===============================================
//
startGame();

document.onkeyup = function(event) {
  //Get the letters the user inputs from keyboard
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();
  //
  console.log(letterGuessed);
}
