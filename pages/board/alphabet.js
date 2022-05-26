import { range } from "../../utils/range.js";

/* Creating an array of the alphabet. */
const alphabet = range({
  start: "A".charCodeAt(0),
  stop: "Z".charCodeAt(0),
  step: 1,
}).map((x) => String.fromCharCode(x));

/**
 * For each letter in the alphabet array, create a button element,
 * add the letter as text to the button,
 * add the letter class and btn class to the button,
 * and append the button to the alphabet
 * container.
 */
export function renderAlphabet() {
  const alphabetContainer = document.querySelector(".alphabet");

  alphabet.forEach((letter) => {
    const letterElement = document.createElement("button");
    const text = document.createTextNode(letter);
    letterElement.appendChild(text);
    letterElement.classList.add("letter", "btn");

    alphabetContainer.appendChild(letterElement);
  });
}
