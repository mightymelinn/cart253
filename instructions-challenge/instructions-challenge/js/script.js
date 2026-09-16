/**
 * Title of Project: The painting I did when I was 7
 * Author Name: Melinn (Supitcha Chailom)
 * 
 * When I had my first PC and open Paint, this is kind of painting I did. 
 */

"use strict";

/**
 * Set up the canvas size.
 */
function setup() {
  createCanvas(600, 400);
  noStroke();
}

/**
 * Draws from layers background to the foreground.
 */
function draw() {
  // Sky
  background(40, 20, 60);

  // Moon
  fill(255, 240, 180);
  ellipse(500, 100, 120, 120);

  // Hills
  fill(30, 80, 50); 
  ellipse(150, 450, 700, 400);
  
  fill(20, 60, 40);
  ellipse(500, 500, 800, 400);

  // House
  fill(100, 60, 40); 
  rect(120, 240, 60, 50);
  
  fill(180, 50, 50); 
  triangle(110, 240, 150, 200, 190, 240);
  
  fill(255, 255, 150); 
  rect(140, 260, 20, 20);

  // Birds
  fill(10);
  ellipse(400, 150, 40, 10); 
  ellipse(400, 150, 10, 15); 

  fill(10);
  ellipse(420, 170, 35, 7); 
  ellipse(420, 170, 7, 12); 

  fill(10);
  ellipse(360, 170, 45, 15); 
  ellipse(360, 170, 15, 20); 

  // Humen
  fill(10);
  ellipse(350, 310, 15, 15); 
  rect(345, 315, 10, 25); 

  fill(10);
  ellipse(370, 325, 12, 12);
  ellipse(370, 335, 8, 15); 

}