import { ctx, drawLine, drawFillRect, handle, rope } from "./gallow.js";

// Change this to change the levels from Cheek to Chin of the face
const LEVELS_FROM_CHEEK_TO_CHIN = 3;

// Head
const hat = {
  endY: handle.endY + 30,
  height: 20,

  top: {
    startX: rope.startX - 120 / 2,
    startY: handle.endY + 10,
    width: 120,
    color: "#aa1414",
  },
  bottom: {
    startX: rope.startX - 160 / 2,
    startY: handle.endY + 30,
    width: 160,
    color: "#ca1414",
  },
};

const hair = {
  startX: rope.startX - 180 / 2,
  startY: hat.endY + 20,
  endY: hat.endY + 30,
  width: 180,
  height: 80,
  color: "#642d1a",
};

const face = {
  startX: rope.startX - 140 / 2,
  endX: rope.startX - 140 / 2 + 140,
  startY: hair.endY,
  color: "#db9b4f",

  top: {
    endY: hair.endY + 60,
    width: 140,
    height: 60,
  },
  bottom: {
    startX: rope.startX - 120 / 2,
    endY: hair.endY + 60,
    width: 120,
    height: 11,
    levels: LEVELS_FROM_CHEEK_TO_CHIN,
  },
};

const ears = {
  startY: face.startY + 10,
  width: 10,
  height: 30,

  left: {
    startX: face.startX - 10,
  },
  right: {
    startX: face.endX,
  },
};

const eye = {
  startY: ears.startY + 12,
  endY: ears.startY + 23,
  color: "#000",

  left: {
    startX: rope.startX - 35,
    endX: rope.startX - 25,
  },
  right: {
    startX: rope.startX + 35,
    endX: rope.startX + 25,
  },
};

const nose = {
  startX: rope.startX - 35 / 2,
  startY: eye.endY,
  endY: eye.endY + 20,
  width: 35,
  height: 22,
  color: face.color,
};

const mustache = {
  startX: eye.left.startX,
  startY: nose.endY - 3,
  endX: eye.left.startX + 70,
  endY: nose.endY + 10,
  width: 70,
  height: 13,
  color: "#642d1a",
};

const mouth = {
  startX: face.startX,
  startY: mustache.endY,
  width: 50,
  height: 13,
  color: "#000",
};

// Body
const body = {
  startX: rope.startX - 120 / 2,
  startY: face.bottom.endY + face.bottom.height * face.bottom.levels,
  endY: rope.endY + 100,
  width: 120,
  height: 120,
  color: "#e90e11",
};

const jacket = {
  startX: body.startX,
  startY: body.startY + body.height / 2,
  endY: body.startY + body.height,
  width: body.width,
  height: body.height / 2,
  color: "#1b4b7d",

  pieces: {
    width: 20,
    height: 40,
  },
  left: {
    startX: body.startX + 10,
    startY: body.startY,
  },
  mid: {
    startY: body.startY + body.height / 2 - 20,
    width: 100,
    height: 20,
  },
  right: {
    startX: body.startX + body.width - 30,
  },
};

const buttons = {
  startY: jacket.mid.startY + jacket.mid.height - 3,
  width: 20,
  height: 20,
  color: "#f1f330",

  left: {
    startX: jacket.left.startX + 10,
  },
  right: {
    startX: jacket.right.startX - 10,
  },
};

// Arms
const arm = {
  startX: body.startX - 40,
  startY: body.startY,
  endY: rope.endY + 100,
  width: 40,
  height: 60,
  color: body.color,

  pieces: {
    width: 20,
    height: 20,
  },

  right: {
    startX: body.startX + body.width,
  },
};

const hand = {
  startY: arm.startY + arm.height / 2,
  width: 60,
  height: 40,
  color: "#db9b4f",

  left: {
    startX: arm.startX,
  },
  right: {
    startX: arm.right.startX,
  },
};

const finger = {
  startX: arm.startX + arm.width / 2,
  startY: hand.startY + hand.height,
  endY: hand.startY + hand.height + hand.height / 2,
  width: hand.height / 2,
  height: hand.height / 2,
  color: "#db9b4f",

  left: {
    startX: hand.left.startX + hand.height / 2,
  },
  right: {
    startX: hand.right.startX,
    endX: hand.right.startX + hand.height / 2,
  },
};

// Legs
const leg = {
  startY: finger.endY,
  endY: finger.endY + 50,
  width: 60,
  height: 50,
  color: "#1b4b7d",

  pieces: {
    startY: finger.endY + 70,
    width: 20,
    height: 20,
    color: "#5d2315",

    left: {
      startX: finger.left.startX - 20,
    },
    right: {
      startX: finger.right.startX - 40,
    },
  },

  left: {
    startX: finger.left.startX,
  },
  right: {
    startX: finger.right.startX - 40,
  },
};

const drawHead = () => {
  // Hat
  drawFillRect({
    x: hat.top.startX,
    y: hat.top.startY,
    width: hat.top.width,
    height: hat.height,
    color: hat.top.color,
  });

  drawFillRect({
    x: hat.bottom.startX,
    y: hat.bottom.startY,
    width: hat.bottom.width,
    height: hat.height,
    color: hat.bottom.color,
  });

  // Hair
  drawFillRect({
    x: hair.startX,
    y: hair.startY,
    width: hair.width,
    height: hair.height,
    color: hair.color,
  });

  // Face
  drawFillRect({
    x: face.startX,
    y: face.startY,
    width: face.top.width,
    height: face.top.height,
    color: face.color,
  });

  for (let i = 0; i < face.bottom.levels; i++) {
    drawFillRect({
      x: face.bottom.startX + i * face.bottom.height,
      y: face.top.endY + i * face.bottom.height,
      width: face.bottom.width - i * (face.bottom.height * 2),
      height: face.bottom.height,
      color: face.color,
    });
  }

  // Ears
  drawFillRect({
    // Left ear
    x: ears.left.startX,
    y: ears.startY,
    width: ears.width,
    height: ears.height,
    color: face.color,
  });

  drawFillRect({
    // Right ear
    x: ears.right.startX,
    y: ears.startY,
    width: ears.width,
    height: ears.height,
    color: face.color,
  });

  // Eyes
  ctx.lineWidth = 5;

  drawLine({
    // Left eye
    color: eye.color,
    startX: eye.left.startX,
    startY: eye.startY,
    endX: eye.left.endX,
    endY: eye.endY,
  });
  drawLine({
    color: eye.color,
    startX: eye.left.endX,
    startY: eye.startY,
    endX: eye.left.startX,
    endY: eye.endY,
  });

  drawLine({
    // Right eye
    color: eye.color,
    startX: eye.right.startX,
    startY: eye.startY,
    endX: eye.right.endX,
    endY: eye.endY,
  });
  drawLine({
    color: eye.color,
    startX: eye.right.endX,
    startY: eye.startY,
    endX: eye.right.startX,
    endY: eye.endY,
  });

  // Mustache
  drawFillRect({
    x: mustache.startX,
    y: mustache.startY,
    width: mustache.endX - mustache.startX,
    height: mustache.height,
    color: mustache.color,
  });

  // Nose
  drawFillRect({
    x: nose.startX,
    y: nose.startY,
    width: nose.width,
    height: nose.height,
    color: nose.color,
  });

  // Mouth
  drawFillRect({
    x: eye.left.endX,
    y: mouth.startY,
    width: mouth.width,
    height: mouth.height,
    color: mouth.color,
  });
};

const drawBody = () => {
  // Body
  drawFillRect({
    x: body.startX,
    y: body.startY,
    width: body.width,
    height: body.height,
    color: body.color,
  });

  // Jacket
  drawFillRect({
    x: jacket.left.startX,
    y: jacket.left.startY,
    width: jacket.pieces.width,
    height: jacket.pieces.height,
    color: jacket.color,
  }); // Left piece

  drawFillRect({
    x: jacket.right.startX,
    y: jacket.left.startY,
    width: jacket.pieces.width,
    height: jacket.pieces.height,
    color: jacket.color,
  }); // Right piece

  drawFillRect({
    x: jacket.left.startX,
    y: jacket.mid.startY,
    width: jacket.mid.width,
    height: jacket.mid.height,
    color: jacket.color,
  }); // Middle piece

  drawFillRect({
    x: jacket.startX,
    y: jacket.startY,
    width: jacket.width,
    height: jacket.height,
    color: jacket.color,
  }); // Bottom piece

  // Buttons
  drawFillRect({
    x: buttons.left.startX,
    y: buttons.startY,
    width: buttons.width,
    height: buttons.height,
    color: buttons.color,
  }); // Left button

  drawFillRect({
    x: buttons.right.startX,
    y: buttons.startY,
    width: buttons.width,
    height: buttons.height,
    color: buttons.color,
  }); // Right button
};

const drawArm = ({ side }) => {
  const armPieces = 3;

  // Draw arm
  for (let i = 0; i < armPieces; i++) {
    const sharedElements = {
      y: arm.startY + i * arm.pieces.height,
      width: arm.width + i * arm.pieces.width,
      height: arm.height - (i * arm.pieces.height) / 2,
      color: arm.color,
    };

    hand.startY = sharedElements.y + sharedElements.height / 2;
    hand.left.startX = arm.startX - i * arm.pieces.width;
    hand.right.startX = arm.right.startX;

    drawFillRect({
      x: hand[side].startX,
      ...sharedElements,
      color: arm.color,
    });
  }

  const handX =
    side === "left" ? hand.left.startX : hand.right.startX + finger.width;

  // Draw hand
  drawFillRect({
    x: handX,
    y: hand.startY,
    width: hand.width,
    height: hand.height,
    color: hand.color,
  });
  drawFillRect({
    // Finger
    x: finger[side].startX,
    y: finger.startY,
    width: finger.width,
    height: finger.height,
    color: finger.color,
  });
};

const drawLeg = ({ side }) => {
  // Leg
  drawFillRect({
    x: leg[side].startX,
    y: leg.startY,
    width: leg.width,
    height: leg.height,
    color: leg.color,
  });

  // Foot
  drawFillRect({
    // top
    x: leg[side].startX,
    y: leg.endY,
    width: leg.width,
    height: leg.pieces.height,
    color: leg.pieces.color,
  });

  drawFillRect({
    // Bottom
    x: leg.pieces[side].startX,
    y: leg.pieces.startY,
    width: leg.pieces.width * 4,
    height: leg.pieces.height,
    color: leg.pieces.color,
  });
};

const partsToDraw = {
  head: drawHead,
  body: drawBody,
  arm: drawArm,
  leg: drawLeg,
};

/**
 * It takes an object with a part and a side property, and then calls the function that is stored in
 * the partsToDraw object, passing in the side
 *
 * @param {String} part - The part of the body to draw
 * @param {String} side - The side of the part of the body to draw
 */
const drawPart = ({ part, side }) => {
  partsToDraw[part]({ side });
};

export { drawPart };
