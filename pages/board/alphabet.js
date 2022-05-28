import { range } from "../../utils/range.js";

export const alphabetContainer = document.querySelector(".alphabet");

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
  alphabet.forEach((letter) => {
    const letterBtn = document.createElement("button");
    const text = document.createTextNode(letter);

    letterBtn.setAttribute("id", `letter-${letter}`);
    letterBtn.setAttribute("aria-label", `${letter} button`);
    letterBtn.classList.add("letter-btn", "btn");
    letterBtn.appendChild(text);

    alphabetContainer.appendChild(letterBtn);
  });
}
