/**
 * Title of Project: Alien
 * Author Name: Melinn (Supitcha Chailom)
 * 
 * This is how I visualize myself as an alien.
 * 
 */

"use strict";

/**
 * Set up the canvas size.
 */
function setup() {
  createCanvas(600, 400);

}


function draw() {
  // Background
  background(255, 214, 230);

  // Head
  fill(170, 230, 190);
  ellipse(300, 190, 260, 200);
  ellipse(300, 240, 190, 150);

  // Eyes
  fill(45, 35, 70);
  ellipse(245, 205, 70, 85);
  ellipse(355, 205, 70, 85);

  // Smile
  noFill();
  stroke(45, 35, 70);
  strokeWeight(4);
  arc(300, 262, 36, 24, 0, PI);
}