import { game, ambience } from './world.js';
import { controls } from './player.js';

const menu = document.getElementById('menu');
const letter = document.getElementById('letter');

// click
document.addEventListener('click', () => {
  if (game.ended) return;

  if (!game.started) {
    game.started = true;
    menu.style.display = 'none';
  }

  controls.lock();
  ambience.play();
});

// ending window ui
export function showLetter() {
  game.ended = true;
  controls.unlock();
  letter.style.display = 'block';
}