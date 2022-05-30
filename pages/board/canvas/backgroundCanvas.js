import { ctx, canvasWidth, canvasHeight } from "./gallow.js";

// Amount of stars to draw
const STARS = 200;

/**
 * It draws a bunch of stars and a grassy background.
 */
export const drawBackgound = () => {
  for (let i = 0; i < STARS; i++) {
    const x = Math.random() * canvasWidth;
    const y = Math.random() * canvasHeight;
    const radius = Math.random() * 1.2;

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 360);
    ctx.fillStyle = "hsla(200,100%,50%,0.8)";
    ctx.fill();
  }

  const grass = ctx.createLinearGradient(0, 0, 0, canvasHeight);
  grass.addColorStop(0.8, "#114b38");
  grass.addColorStop(1, "#2d8113");

  ctx.fillStyle = grass;
  ctx.fillRect(0, canvasHeight - 150, canvasWidth, canvasHeight);
};
