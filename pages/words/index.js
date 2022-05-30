import { postWords } from "../../services/postWords.js";

const form = document.querySelector("form");
const inputWord = document.getElementById("word-input");

inputWord.focus(); // focus on input field

const requirements = {
  word: {
    required: true,
    minLength: 3,
    regexOnlyLetters: /^[A-Z]+$/,
  },
};

/**
 * It validates the word based on the requirements.
 *
 * @param word - the word to be validated
 * @returns {object} - an object with errors.
 */
const validations = (word) => {
  const errors = {};

  if (requirements.word.required && !word) {
    errors.required = "Word is required)";
  }

  if (
    requirements.word.minLength &&
    word.length < requirements.word.minLength
  ) {
    errors.minLength = `Word must be at least ${requirements.word.minLength} characters long`;
  }

  if (!requirements.word.regexOnlyLetters.test(word)) {
    errors.onlyLetters = "Word must be only letters";
  }

  return errors;
};

/**
 * It takes a reference node and an error message and returns a list item with a label that contains a reference to the input and the error message.
 *
 * @param idNode - The id of the input field that contains the error.
 * @param error - The error message to display.
 */
const listItemError = (idNode, error) =>
  `<li>
    <label for="${idNode}">
      ${error}
    </label>
  </li>`;

/**
 * It sends the word to the server and redirects to the board page.
 *
 * @param word - the word that the user has entered
 */
const sendWord = (word) => {
  postWords(word)
    .then((respose) => {
      console.log(respose);
      window.location.assign("/pages/board/index.html");
    })
    .catch((error) => {
      console.log(`Error: ${error}, function: sendWord`);
    });
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
 * It handles the submit event.
 *
 * @param e - the event object.
 */
const handleSubmit = (e) => {
  e.preventDefault();

  const wordInputId = inputWord.id;
  const dataInput = inputWord?.value.trim().toUpperCase();

  const listOfWords = dataInput.replace(/\s/g, "").split(",");
  const listOfErrors = [];

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

  if (listOfErrors.length > 0) {
    listOfErrors.forEach(({ position, word, errors }) => {
      const errorMessages = Object.values(errors);
      const listItem = `<li>
          ${position}° word: "${word}"
        
          <ul class="add-word__form--errors inner-errors">
            ${errorMessages
              .map((error) => listItemError(wordInputId, error))
              .join("")}
          </ul>
        </li>`;

      renderListErrors(listItem);
    });
  } else {
    renderListErrors("");
    listOfWords.forEach(sendWord);
    form.reset();
  }
};

form.addEventListener("submit", handleSubmit);
