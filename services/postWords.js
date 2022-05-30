import { BASE_URL } from "./settings.js";

/**
 * It takes a word as an argument, and then it sends a POST request to the API with the word as the
 * body of the request.
 *
 * @param word - the word to be sent to the API.
 * @returns  An array of objects with words.
 */
export const postWords = async (word) => {
  try {
    const response = await fetch(`${BASE_URL}/words`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ word }),
    });
    const { data } = await response.json();
    return data;
  } catch (error) {
    console.error(`Error: ${error}, function: postWords`);
  }
};
