/* global variables */
const wordList = require('word-list-json');
const prompt = require('prompt-sync')();
const TOTAL_ATTEMPTS = 6;
var attempts = 0;


/* return a new word */ 
function newWord() {
  let index = Math.floor(Math.random() * wordList.length);                    
  let word = wordList[index];
  return word;
}

function endGame() {
  let again = prompt("would you like to play again? (y/n) ").toLowerCase();
  if ( again == 'y') hangmanGame();
  else if (again == 'n') process.exit();
  else {
    console.log("please write a valid answer");
    endGame();
  }
}

/* game */
function hangmanGame() {

  console.log("welcome to the game :)");

  let word = newWord();

  /* setting up the game */
  console.log("please write only one character at a time. you have six (6) attempts");

  let letters = new Set([...word]);

  let wrongLetters = new Set();
  let rightLetters = new Set();
 
  attempts = 0;

  /* run game until user runs out of attempts */ 
  while ( attempts != TOTAL_ATTEMPTS) {

    /*console.log(letters);
    console.log(wrongLetters, wrongLetters.size);
    console.log(rightLetters, rightLetters.size);*/

    let print = word.split("").map( x => rightLetters.has(x) ? x : '_').join(" ");
    console.log(print);
    

    if(wrongLetters.size > 0) console.log("letters used: " + [...wrongLetters].join(', '));
    console.log("attempts left: ", (TOTAL_ATTEMPTS - attempts));

    /* get user input */
    let inp = prompt('>').toLowerCase();

    
    if (!isNaN(inp)) console.log("please writer a letter, not a number");
    else if ( inp.length > 1 ) console.log("you can only write one character at a time");
    else if ( word.includes(inp) ) {

      rightLetters.add(inp);

      /* fill in the game with the letters that are right */
 
      if (rightLetters.size == letters.size) {
        console.log("you won! :)");
        endGame();
      }

    } else if (!(wrongLetters.has(inp))) {

        wrongLetters.add(inp);
        attempts += 1;
        

    } else {
      console.log("letter already used");
    }
  }
  console.log("you lost :(");
  console.log("the word was: ", word);
  endGame();
}



hangmanGame();