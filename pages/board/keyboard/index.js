import { range } from "../../../utils/range.js";

export const keyboardContainer = document.querySelector(".keyboard");

/* Creating an array of the alphabet. */
const alphabet = range({
  start: "A".charCodeAt(0),
  stop: "Z".charCodeAt(0),
  step: 1,
}).map((x) => String.fromCharCode(x));

/**
 * For each letter in the alphabet array, it creates a button element and add the letter as text.
 */
export function renderKeyboard() {
  alphabet.forEach((letter) => {
    const letterBtn = document.createElement("button");
    const text = document.createTextNode(letter);

    letterBtn.setAttribute("id", `letter-${letter}`);
    letterBtn.setAttribute("aria-label", `${letter} button`);
    letterBtn.classList.add("letter-btn", "btn");
    letterBtn.appendChild(text);

    keyboardContainer.appendChild(letterBtn);
  });
}
