import { alphabetContainer, renderAlphabet } from "./alphabet.js";
import { drawBackgound } from "./backgroundCanvas.js";
import { ctx, canvas, drawGallow } from "./gallow.js";
import { drawPart } from "./hangman.js";
import { drawAttempts } from "./attempts.js";
import { wordToGuess } from "./wordToGuess.js";

let guessAttempts = 6;
let guessedLetters = new Set();

// --- Alphabet
renderAlphabet();

// --- Canvas

drawBackgound();
drawGallow();
drawAttempts(guessAttempts);

// --- Logic for the game
const partToDrawPerAttempt = {
  6: { part: "head" }, // start
  5: { part: "body" },
  4: { part: "arm", side: "left" },
  3: { part: "arm", side: "right" },
  2: { part: "leg", side: "left" },
  1: { part: "leg", side: "right" }, // end
};

/**
 * It creates a div to be the container for the letter and a span to contain the letter.
 * (The div acts as the underscore for the letter).
 */
async function renderUnderscores() {
  try {
    const wordSection = document.querySelector(".word");
    const word = await wordToGuess;

    word.split("").forEach(() => {
      const letterContainer = document.createElement("div");
      const span = document.createElement("span");

      letterContainer.classList.add("word--letter");
      letterContainer.appendChild(span);

      wordSection.appendChild(letterContainer);
    });
  } catch (error) {
    console.log(`Error: ${error}, function: renderUnderscores`);
  }
}

/**
 * It takes a letter as an argument, then it loops through the wordToGuess and checks if the letter is
 * in the word. If it is, it renders the letter in the correct position.
 *
 * @param {string} letter - The letter to be rendered.
 * @param {boolean} isCorrect - If the letter is correct or not.
 */
async function renderLetter(letter, isCorrect = true) {
  try {
    const wordSection = document.querySelector(".word");
    const word = await wordToGuess;

    word.split("").forEach((letterToCheck, index) => {
      if (letterToCheck === letter) {
        const letterContainer = wordSection.children[index];
        const span = letterContainer.children[0];
        const text = document.createTextNode(letter);

        span.appendChild(text);

        if (!isCorrect) {
          letterContainer.classList.add("not-guessed");
        }
      }
    });
  } catch (error) {
    console.log(`Error: ${error}, function: renderLetter`);
  }
}

/**
 * It checks if the letter(button) pressed is in the word to guess, if it is, it renders the letter, if not, it
 * draws a part of the hangman and decreases the guess attempts.
 *
 * @param event - The event object that is passed to the event handler.
 */
async function checkLetterPressed(event) {
  try {
    if (!event.target || event.target.tagName !== "BUTTON") {
      return;
    }

    const buttonPressed = event.target;
    const letter = buttonPressed.textContent;
    const word = await wordToGuess;
    const isLetterInWord = word.includes(letter);

    buttonPressed.disabled = true;

    if (isLetterInWord) {
      buttonPressed.classList.add("meet");
      guessedLetters.add(letter);

      renderLetter(letter);
      checkIfWon();
    } else {
      buttonPressed.classList.add("wrong");

      const partToDraw = partToDrawPerAttempt[guessAttempts];
      drawPart({
        part: partToDraw.part,
        side: partToDraw?.side,
      });

      checkIfLost();
    }
  } catch (error) {
    console.log(`Error: ${error}, function: checkLetterPressed`);
  }
}

/**
 * It checks if the user has won the game:
 * If the guessed letters are the same as the letters in the word to guess.
 *
 * If the user has won, it calls the endGame function.
 */
async function checkIfWon() {
  try {
    const word = await wordToGuess;
    const lettersInWordToGuess = new Set(word.split(""));

    if (guessedLetters.size === lettersInWordToGuess.size) {
      endGame({
        text: "You win!",
        imgUrl:
          "https://stickers.wiki/static/stickers/line_talking_super_mario/file_226273.webp?ezimgfmt=rs:144x144/rscb1/ng:webp/ngcb1",
        textColor: "#2fd04a",
      });
    }
  } catch (error) {
    console.log(`Error: ${error}, function: checkIfWon`);
  }
}

/**
 * It checks if the user has lost the game:
 * If the guess attempts is 0.
 *
 * If the user has lost, it renders the letters left in the word to guess and calls the endGame function.
 */
async function checkIfLost() {
  try {
    guessAttempts--;

    drawAttempts(guessAttempts);

    if (guessAttempts === 0) {
      const word = await wordToGuess;
      const setWord = new Set(word.split(""));
      const leftLetters = [...setWord].filter(
        (letter) => !guessedLetters.has(letter)
      );

      leftLetters.forEach((letter) => {
        renderLetter(letter, false);
      });

      endGame({
        text: "You lost!",
        imgUrl:
          "https://stickers.wiki/static/stickers/line_talking_super_mario/file_226284.webp?ezimgfmt=rs:144x144/rscb1/ng:webp/ngcb1",
        textColor: "#e9110e",
      });
    }
  } catch (error) {
    console.log(`Error: ${error}, function: checkIfLost`);
  }
}

/**
 * It disables all buttons, draws a transparent background, writes a message on the canvas, and draws
 * an image.
 *
 * @param {object} options - The options object that contains the text, image url and text color.
 * @param {string} options.text - The text to be written on the canvas.
 * @param {string} options.imgUrl - The image url to be drawn on the canvas.
 * @param {string} options.textColor - The color of the text.
 */
function endGame({ text, imgUrl, textColor = "#fff" }) {
  // Disable all buttons
  const buttons = document.querySelectorAll(".letter-btn");
  Array.from(buttons).forEach((button) => {
    button.disabled = true;
  });

  // Background transparency
  ctx.fillStyle = "#3c3c3c99";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Write win message on canvas
  ctx.font = "700 7rem Comic Sans MS, sans-serif";
  ctx.fillStyle = textColor;
  const textWidth = ctx.measureText(text).width;
  ctx.shadowColor = "#000";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 10;

  ctx.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2 - 90);

  // draw an image
  const img = new Image();
  img.src = imgUrl;
  img.onload = () => {
    ctx.drawImage(
      img,
      canvas.width / 2 - 200,
      canvas.height / 2 - 50,
      400,
      400
    );
  };
}

renderUnderscores();

alphabetContainer.addEventListener("click", checkLetterPressed);
