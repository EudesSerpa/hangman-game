import { renderAlphabet } from "./alphabet.js";
import { drawBackgound } from "./backgroundCanvas.js";
import { drawGallow } from "./gallow.js";
import { drawPart } from "./hangman.js";

// Alphabet
renderAlphabet();

// Canvas
drawBackgound();
drawGallow();

// drawPart({ part: "head" });
// drawPart({ part: "body" });
// drawPart({ part: "arm", side: "left" });
// drawPart({ part: "arm", side: "right" });
// drawPart({ part: "leg", side: "left" });
// drawPart({ part: "leg", side: "right" });
