import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { camera, ambience, solidBoxes } from './world.js';

// Player interactions + controls will go here

// fps camera control
export const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => {
  controls.lock();
  ambience.play();
});

// keyboard controls
const keys = {};
addEventListener('keydown', (e) => keys[e.code] = true);
addEventListener('keyup', (e) => keys[e.code] = false);

// add player collision
const playerBox = new THREE.Box3();
const playerSize = new THREE.Vector3(0.6, 1.6, 0.6);
const playerCenter = new THREE.Vector3();

function hitSomething() {
  playerCenter.copy(camera.position);
  playerCenter.y -= 0.8;
  playerBox.setFromCenterAndSize(playerCenter, playerSize);
  return solidBoxes.some((box) => playerBox.intersectsBox(box));
}

const speed = 3; // units per second

export function updatePlayer(dt) {
  const step = dt * speed;

  // walking
  const prevX = camera.position.x;
  const prevZ = camera.position.z;

  if (keys.KeyW) controls.moveForward(step);
  if (keys.KeyS) controls.moveForward(-step);
  if (keys.KeyD) controls.moveRight(step);
  if (keys.KeyA) controls.moveRight(-step);

  if (hitSomething()) {
    camera.position.x = prevX;
    camera.position.z = prevZ;
  }
}