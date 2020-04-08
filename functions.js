const wordList = [
  "vis",
  "toeter",
  "developer",
  "telefoon",
  "moeder",
  "snoer",
  "geeuw"
];

const wordPicker = () => {
  let index = Math.floor(Math.random() * wordList.length);
  return wordList[index];
};

const guessWord = (word, inputs) => {
  let remaining = word.filter(letter => {
    return !inputs.includes(letter);
  });
  return remaining.length === 0;
};

let gameOver;

const winTheGame = () => {
  document.querySelector(".win").style.display = "block";
  gameOver = true;
};

const loseTheGame = () => {
  document.querySelector(".lose").style.display = "block";
  gameOver = true;
};

const filterLetters = (word, inputs) => {
  let wrongLetters = inputs.filter(letter => {
    return !word.includes(letter);
  });
  document.querySelector(".guessed_letters").innerHTML = wrongLetters.join(" ");
};

const showTheWord = (word, inputs) => {
  let display = word.map(letter => inputs.includes(letter) ? letter : "_")
  document.querySelector(".the_word").innerHTML = display.join(" ");
};

let tries = 0;

const guessLetter = () => {

  if (gameOver) {
    return;
  }
  const inputUser = document.querySelector("input").value;
  document.querySelector("input").value = "";

  if (inputs.includes(inputUser) || inputUser === "") {
    return;
  }

  if (!word.includes(inputUser)) {
    tries++;
    document.querySelector(".lives span").innerHTML = 5 - tries;
  }

  inputs.push(inputUser);
  showTheWord(word, inputs);
  filterLetters(word, inputs);

  if (guessWord(word, inputs)) {
    winTheGame();
  } else if (tries >= 5) {
    loseTheGame();
  }
};

const startGame = () => {
  gameOver = false;
  document.querySelector(".win").style.display = "none";
  document.querySelector(".lose").style.display = "none";
  document.querySelector("input").value = "";

  word = wordPicker(wordList).split("");
  document.querySelector(".lose p span").innerHTML = word.join("");
  tries = 0;

  document.querySelector(".lives span").innerHTML = 5 - tries;

  inputs = [];
  showTheWord(word, inputs);
  filterLetters(word, inputs);
}



document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".guess").addEventListener("click", guessLetter);
  document
    .querySelector(".restart")
    .addEventListener("click", startGame);
  startGame();
});



module.exports = {
  wordPicker,
  guessWord,
  winTheGame,
  loseTheGame,
  filterLetters,
  showTheWord
}