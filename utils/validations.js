const requirements = {
  word: {
    required: true,
    minLength: 3,
    maxLength: 10,
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
    errors.required = "Word is required";
  }

  if (
    requirements.word.minLength &&
    word.length < requirements.word.minLength
  ) {
    errors.minLength = `Word must be at least ${requirements.word.minLength} characters long`;
  }

  if (
    requirements.word.maxLength &&
    word.length > requirements.word.maxLength
  ) {
    errors.maxLength = `Word must be at most ${requirements.word.maxLength} characters long`;
  }

  if (!requirements.word.regexOnlyLetters.test(word)) {
    errors.onlyLetters = "Word must be only letters";
  }

  return errors;
};

export { validations };
