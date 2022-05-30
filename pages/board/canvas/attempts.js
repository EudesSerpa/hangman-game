import { ctx } from "./gallow.js";

const colorPerAttempt = {
  6: "#01dfdf", // greenish blue
  5: "#34b6bb",
  4: "#589797",
  3: "#807f7f",
  2: "#af5350",
  1: "#d63029",
  0: "#ff0000", // red
};

/**
 * It draws the attempts to guess on the canvas.
 * @param guessAttempts - the number of attempts the user has.
 */
function drawAttempts(guessAttempts) {
  const text = `Attempts: ${guessAttempts}`;
  let textWidth = 250;
  let textHeight = 65;

  ctx.font = "700 4.4rem Comic Sans MS, sans-serif";
  ctx.fillStyle = colorPerAttempt[guessAttempts];

  ctx.clearRect(50, 50, textWidth, textHeight); // clear the previous text
  ctx.fillText(text, 50, 100, textWidth);
}

export { drawAttempts };
