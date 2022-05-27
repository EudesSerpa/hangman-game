import { alphabetContainer, renderAlphabet } from "./alphabet.js";
import { drawBackgound } from "./backgroundCanvas.js";
import { drawGallow } from "./gallow.js";
import { drawPart } from "./hangman.js";

let guessAttempts = 6;
const wordToGuess = "JAVASCRIPT";

// --- Alphabet
renderAlphabet();

// --- Canvas
drawBackgound();
drawGallow();

// --- Logic for the game
const partToDrawPerAttempt = {
  6: { part: "head" }, // start
  5: { part: "body" },
  4: { part: "arm", side: "left" },
  3: { part: "arm", side: "right" },
  2: { part: "leg", side: "left" },
  1: { part: "leg", side: "right" }, // end
};

const removeBlanks = (word) => {
  return word.replace(/\s+/g, "");
};

/**
 * It creates a div to be the container for the letter and a span to contain the letter.
 * (The div acts as the underscore for the letter).
 */
const renderUnderscores = () => {
  const wordSection = document.querySelector(".word");
  const wordFormatted = removeBlanks(wordToGuess).split("");

  wordFormatted.forEach(() => {
    const letterContainer = document.createElement("div");
    const span = document.createElement("span");

    letterContainer.classList.add("word--letter");
    letterContainer.appendChild(span);

    wordSection.appendChild(letterContainer);
  });
};

renderUnderscores();

/**
 * It takes a letter as an argument, then it loops through the wordToGuess and checks if the letter is
 * in the word. If it is, it renders the letter in the correct position.
 *
 * @param letter - the letter that was guessed
 */
const renderLetter = (letter) => {
  const wordSection = document.querySelector(".word");
  const wordFormatted = removeBlanks(wordToGuess).split("");

  wordFormatted.forEach((letterToCheck, index) => {
    if (letterToCheck === letter) {
      const letterContainer = wordSection.children[index];
      const span = letterContainer.children[0];
      const text = document.createTextNode(letter);

      span.appendChild(text);
    }
  });
};

/**
 * It checks if the letter(button) pressed is in the word to guess, if it is, it renders the letter, if not, it
 * draws a part of the hangman and decreases the guess attempts.
 *
 * @param event - The event object that is passed to the event handler.
 */
const checkLetterPressed = (event) => {
  if (!event.target || event.target.tagName !== "BUTTON") {
    return;
  }

  const buttonPressed = event.target;
  const letter = buttonPressed.textContent;
  const isLetterInWord = wordToGuess.includes(letter);

  buttonPressed.disabled = true;

  if (isLetterInWord) {
    buttonPressed.classList.add("meet");
    renderLetter(letter);
  } else {
    buttonPressed.classList.add("wrong");

    const partToDraw = partToDrawPerAttempt[guessAttempts];
    drawPart({
      part: partToDraw.part,
      side: partToDraw?.side,
    });

    guessAttempts--;

    if (guessAttempts === 0) {
      console.log("You lose");
    }
  }
};

alphabetContainer.addEventListener("click", checkLetterPressed);
