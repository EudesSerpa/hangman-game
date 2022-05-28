import { BASE_URL } from "./settings.js";

/**
 * It gets data from the API and returns it.
 * @returns An array of objects with words.
 */
export const getWords = async () => {
  const response = await fetch(`${BASE_URL}/words`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const { data } = await response.json();
  return data;
};
