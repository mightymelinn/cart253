import { scene, camera, renderer, composer, updateWorld } from './world.js';
import { updatePlayer } from './player.js';
import { updatePickup } from './pickup.js';
import { updateEnemy } from './enemy.js';

// This file will be the main entry of the game. It will calls the other file in order.

// animation
let last = 0;

renderer.setAnimationLoop((time) => {
  const dt = Math.min((time - last) / 1000, 0.1);
  last = time;

  updateWorld(dt);
  updatePlayer(dt);
  updateEnemy(dt);
  updatePickup();

    composer.render();
});