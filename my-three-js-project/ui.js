import { game, ambience } from './world.js';
import { controls } from './player.js';

const gameSection = document.getElementById('game');
const menu = document.getElementById('menu');
const letter = document.getElementById('letter');

// fade in anim
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// click 
gameSection.addEventListener('click', () => {
  if (game.ended) return;

  if (!game.started) {
    game.started = true;
    gameSection.scrollIntoView();
    document.body.style.overflow = 'hidden';
    menu.classList.add('hidden');
    document.getElementById('progress').style.display = 'block';
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