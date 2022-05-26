const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

ctx.lineCap = "round";
ctx.lineWidth = 15;

// Change this to change the x position
const X_GALLOW = canvasWidth / 3; // of the gallow on the canvas
const X_ROPE = 120; // of the rope on the handle

// Positions
const gallow = {
  x: X_GALLOW,
  y: canvasHeight / 4 - 50,
  width: 50,
  height: canvas.height - 150 - ctx.lineWidth,

  colors: {
    body: "#957641",
    base: "#585e3c",
    rope: "#7d654d",
  },
};

const stem = {
  startX: gallow.x,
  endX: gallow.x + gallow.width,
  startY: gallow.y,
  endY: gallow.height,
  width: gallow.width,
  height: gallow.height,
};

const handle = {
  startX: stem.startX - stem.width,
  endX: stem.startX - stem.width + 500,
  startY: stem.startY + stem.width,
  endY: 240,
  width: 500,
  height: stem.width - 10,

  supports: {
    startX: stem.endX + stem.width,
    startY: stem.startY + stem.width + 40,
  },
};

const base = {
  startX: stem.startX - gallow.width * 2,
  startY: canvasHeight - ctx.lineWidth,
  endX: stem.startX + handle.width,

  supports: {
    startX: stem.startX,
    startY: canvasHeight - ctx.lineWidth,
    height: 100,
  },
};

const rope = {
  startX: handle.endX - X_ROPE,
  startY: handle.startY,
  endX: handle.endX,
  endY: 280,
};

/**
 * It draws a line on the canvas
 *
 * @param {object} line - The line to be drawn
 * @param {number} line.startX - The x position of the start of the line
 * @param {number} line.startY - The y position of the start of the line
 * @param {number} line.endX - The x position of the end of the line
 * @param {number} line.endY - The y position of the end of the line
 * @param {string} line.color - The color of the line
 *
 */
const drawLine = ({ startX, startY, endX = startX, endY = startY, color }) => {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();
};

/**
 * "Draw a filled rectangle on the canvas."
 *
 * @param {object} rect - The rectangle to be drawn
 * @param {number} rect.x - The x position of the rectangle
 * @param {number} rect.y - The y position of the rectangle
 * @param {number} rect.width - The width of the rectangle
 * @param {number} rect.height - The height of the rectangle
 * @param {string} rect.color - The color of the rectangle
 */
const drawFillRect = ({ x, y, width, height, color }) => {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

/**
 * It draws a gallow
 */
const drawGallow = () => {
  // Draw the gallow
  // --- Stem
  drawFillRect({
    x: stem.startX,
    y: stem.startY,
    width: stem.width,
    height: stem.height,
    color: gallow.colors.body,
  });

  // --- Handle
  drawFillRect({
    x: handle.startX,
    y: handle.startY,
    width: handle.width,
    height: handle.height,
    color: gallow.colors.body,
  });

  // Handle supports
  const supports = 2;
  const supportDistance = 50;

  for (let i = 0; i < supports; i++) {
    drawLine({
      color: gallow.colors.body,
      startX: handle.supports.startX + i * supportDistance,
      startY: handle.supports.startY,
      endX: stem.endX,
      endY: handle.endY + gallow.width + i * supportDistance,
    });
  }

  // --- Base
  drawLine({
    color: gallow.colors.base,
    startX: base.startX,
    startY: base.startY,
    endX: base.endX,
  });

  // Base supports
  const baseSupports = 3;
  const baseSupportDistance = 70;

  for (let i = 0; i < baseSupports; i++) {
    // Logic for 1- 3 supports
    drawLine({
      color: gallow.colors.base,
      startX: stem.startX + (i / 2) * stem.width,
      startY: base.startY - base.supports.height,
      endX: stem.startX - baseSupportDistance + i * baseSupportDistance * 1.35,
      endY: base.startY,
    });
  }

  // --- Rope
  drawLine({
    color: gallow.colors.rope,
    startX: rope.startX,
    startY: rope.startY,
    endY: rope.endY,
  });

  // Knots
  const ropeKnots = 3;
  const ropeKnotDistance = 10;

  for (let i = 0; i < ropeKnots; i++) {
    // From bottom knot to top knot
    drawLine({
      color: gallow.colors.rope,
      startX: rope.startX + 10,
      startY: rope.endY - i * ropeKnotDistance,
      endX: rope.startX - 10,
      endY: rope.endY + 5 - i * ropeKnotDistance,
    });
  }

  // Circle
  ctx.beginPath();
  ctx.strokeStyle = gallow.colors.rope;
  ctx.arc(rope.startX, 340, 50, 0, Math.PI * 2);
  ctx.stroke();
};

export {
  canvas,
  ctx,
  canvasWidth,
  canvasHeight,
  drawLine,
  drawFillRect,
  drawGallow,
  handle,
  base,
  rope,
};
