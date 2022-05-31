import { postWords } from "../../services/postWords.js";
import { validations } from "../../utils/validations.js";

const form = document.querySelector("form");
const inputWord = document.getElementById("word-input");

inputWord.focus(); // focus on input field

/**
 * It creates a list item with a list of errors.
 *
 * @param {object} data - the data to be rendered
 * @param {string} data.idNode - the id of the input field that generated the error
 * @param {string} data.errorPosition - the position of the word that generated the error
 * @param {string} data.word - the word that generated the error
 * @param {array} data.listError - the list of errors that contains the word
 *
 * @returns {string} - the list item with the errors
 */
const listItemError = ({ idNode, errorPosition, word, listError }) => {
  const errorItemDetails = (error) =>
    `<li>
    <label for="${idNode}">
      ${error}
    </label>
  </li>`;

  return `<li>
      ${errorPosition}° word: "${word}"
    
      <ul class="add-word__form--errors inner-errors">
        ${listError.map(errorItemDetails).join("")}
      </ul>
    </li>`;
};

/**
 * It takes an array of list items and renders them in the error list.
 * Only one list item is rendered at a time.
 *
 * @param items - the list items to be rendered.
 */
const renderListErrors = (items) => {
  const errorList = document.querySelector(".add-word__form--errors");

  errorList.innerHTML = items;
};

/**
 * It sends the word to the server and redirects to the board page.
 *
 * @param word - the word that the user has entered
 */
const sendWord = (word) => {
  postWords(word)
    .then(() => {
      const boardPathname = `${window.location.pathname.replace(
        "words/index.html",
        "board/index.html"
      )}`;
      window.location.assign(`${window.location.origin}${boardPathname}`);
    })
    .catch((error) => {
      console.log(`Error: ${error}, function: sendWord`);
    });
};

/**
 * It takes a string of words separated by commas, validates each word, and if there are no errors,
 * sends each word to the server.
 *
 * @param e - the event object
 */
const handleSubmit = (e) => {
  e.preventDefault();

  const wordInputId = inputWord.id;
  const dataInput = inputWord?.value.trim().toUpperCase();

  const listOfWords = dataInput.replace(/\s/g, "").split(",");
  const listOfErrors = [];

  // check if each word is valid
  listOfWords.forEach((word, idx) => {
    const errors = validations(word);
    const errorData = Object.entries(errors);

    if (errorData.length > 0) {
      listOfErrors.push({
        position: `${idx + 1}`,
        word,
        errors,
      });
    }
  });

  // render the errors or send the word to the server
  if (listOfErrors.length > 0) {
    listOfErrors.forEach(({ position, word, errors }) => {
      const errorMessages = Object.values(errors);

      renderListErrors(
        listItemError({
          idNode: wordInputId,
          errorPosition: position,
          word,
          listError: errorMessages,
        })
      );
    });
  } else {
    renderListErrors("");
    listOfWords.forEach(sendWord);
    form.reset();
  }
};

form.addEventListener("submit", handleSubmit);
