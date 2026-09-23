/**
 * Title of Project: Ripple FX
 * Author Name: Melinn (Supitcha Chailom)
 * 
 * This is my attempt to try ripple fx. I found this tutorial on YouTube and I thought it was really cool.
 */

"use strict";

//Set up the ripple
let rippleX = 0;
let rippleY = 0;
let rippleSize = 0;
let rippleHue = 0;

/**
 * Set up Canvas
*/
function setup() {
  createCanvas(600, 400);
  colorMode(HSB, 360, 100, 100);
  noFill();
  strokeWeight(6);
}


/**
 * Draws the ripple growing bigger every frame.
*/
function draw() {
  background(330, 8, 100);

  // Only draw the ripple after a click
  if (rippleSize > 0) {
    stroke(rippleHue, 80, 100);
    ellipse(rippleX, rippleY, rippleSize);
    rippleSize += 8;
  }
}

/**
 * Adding MousePressed function to allow ripple drawing only when the mouse is clicked
*/
function mousePressed() {
  rippleX = mouseX;
  rippleY = mouseY;
  rippleSize = 1;
  rippleHue = random(360);
}