/**
 * Title of Project: CART211
 * Author Name: Melinn (Supitcha Chailom)
 * 
 * One of assignments in CART211 is to create a binary art piece.
 */

"use strict";

const cellSize = 12;

/**
 * Set up the canvas.
 */
function setup() {
  createCanvas(600, 400);
  textFont("monospace");
  textSize(12);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  noLoop(); //
}

/**
 * Binary
 */
function draw() {
  // Light grey background
  background(225);

  for (let y = cellSize / 2; y < height; y += cellSize) {
    for (let x = cellSize / 2; x < width; x += cellSize) {
      let bit = floor(random(2)); // 0 or 1
      let lensDistance = dist(x, y, 300, 225);

      // Lens
      if (dist(x, y, 275, 200) < 14) {
        fill(255, 245, 230);
      }
      // Lens centre
      else if (lensDistance < 50) {
        fill(50, 25, 10);
      }
      // Lens ring
      else if (lensDistance < 72) {
        fill(215, 170, 120);
      }
      // Lens edge
      else if (lensDistance < 84) {
        fill(70, 40, 20);

      text(bit, x, y);
      }
    }
  }
}