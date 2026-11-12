import * as THREE from 'three';
import { scene, camera, items, outlinePass, solidBoxes } from './world.js';

// Game mechanics: pick up objects

const pickables = [...items]; // list of my pickable objects
const range = 2.5;
const raycaster = new THREE.Raycaster();
raycaster.far = range;
const screenCenter = new THREE.Vector2(0, 0);
let lookedAt = null;

// pickup sfx
const pickupSound = new Audio('ES_Pickup.mp3');

// pickup UI
const pickupText = document.createElement('div');
pickupText.textContent = 'Press E to pick up';
pickupText.style.cssText = 'position:fixed; transform:translate(-50%, -100%); color:white; font:16px sans-serif; display:none; pointer-events:none;';
document.body.appendChild(pickupText);
const textPosition = new THREE.Vector3();

// progress UI
const total = pickables.length;
const progress = document.createElement('div');
progress.style.cssText = 'position:fixed; top:20px; left:20px; color:white; font:20px sans-serif;';
document.body.appendChild(progress);

function updateProgress() {
  progress.textContent = `Items: ${total - pickables.length}/${total}`;
}
updateProgress();

// game end
function endGame() {
  const message = document.createElement('div');
  message.textContent = 'Game End';
  message.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); color:white; font:48px sans-serif;';
  document.body.appendChild(message);
}

addEventListener('keydown', (e) => {
  if (e.code !== 'KeyE' || !lookedAt) return;

  // remove obj after press E
  scene.remove(lookedAt);
  pickupSound.currentTime = 0;
  pickupSound.play();
  solidBoxes.splice(solidBoxes.indexOf(lookedAt.userData.box), 1);
  pickables.splice(pickables.indexOf(lookedAt), 1);
  lookedAt = null;

  if (pickables.length === 0) endGame();
  updateProgress();
});

export function updatePickup() {
  // outline items nearby
  const nearby = pickables.filter((item) => camera.position.distanceTo(item.position) < range);
  outlinePass.selectedObjects = nearby;

  // more feedback when the player is looking at (will cahnge to text UI later)
  if (lookedAt) lookedAt.material.emissive.setHex(0x000000);

  raycaster.setFromCamera(screenCenter, camera);
  const hit = raycaster.intersectObjects(nearby)[0];
  lookedAt = hit ? hit.object : null;

  // show white glow
  if (lookedAt) lookedAt.material.emissive.setHex(0x666666);

  // show text UI
  if (lookedAt) {
    textPosition.copy(lookedAt.position);
    textPosition.y += 0.5;
    textPosition.project(camera);
    pickupText.style.left = (textPosition.x + 1) / 2 * innerWidth + 'px';
    pickupText.style.top = (1 - textPosition.y) / 2 * innerHeight + 'px';
    pickupText.style.display = 'block';
  } else {
    pickupText.style.display = 'none';
  }
}