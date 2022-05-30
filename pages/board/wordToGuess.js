import { getWords } from "../../services/getWords.js";
import { randomIndex } from "../../utils/randomIndex.js";

/**
 * It gets a words array from the getWords service,
 * and then picks a random word from the array.
 * @returns {string} A random word from the words array.
 */
const getRandomWord = async () => {
  try {
    const words = await getWords();
    const wordObj = words[randomIndex(words)];
    return wordObj?.word;
  } catch (error) {
    console.error(`Error: ${error}, function: getRandomWord`);
  }
};

const wordToGuess = getRandomWord().then((word) => word?.trim().toUpperCase());

export { wordToGuess };
