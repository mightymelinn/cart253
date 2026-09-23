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
  noStroke();
  fill(170, 230, 190);
  ellipse(300, 190, 260, 200);
  ellipse(300, 240, 190, 150);

  // Deco in the background
  noStroke();
  fill(255, 245, 250);
  ellipse(90, 80, 12, 12);
  ellipse(520, 70, 16, 16);
  ellipse(480, 330, 10, 10);
  ellipse(130, 320, 14, 14);
  ellipse(60, 200, 8, 8);
  ellipse(550, 210, 8, 8);

  // Eyes
  fill(45, 35, 70);
  ellipse(245, 205, 70, 85);
  ellipse(355, 205, 70, 85);
  
  fill(255);
  ellipse(257, 188, 24, 28);
  ellipse(367, 188, 24, 28);
  ellipse(235, 225, 10, 10);
  ellipse(345, 225, 10, 10);

  // Blush on
  fill(255, 160, 190);
  ellipse(210, 260, 38, 20);
  ellipse(390, 260, 38, 20);

  // Smile
  noFill();
  stroke(45, 35, 70);
  strokeWeight(4);
  arc(300, 262, 36, 24, 0, PI);
}