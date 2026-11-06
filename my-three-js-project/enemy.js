import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { scene, camera } from './world.js';

let enemy = null;
let mixer = null;

// add enemy model
new GLTFLoader().load('ANMS_HorrorMaidenMoveWalkJitteryForward.glb', (gltf) => {
  enemy = gltf.scene;
  enemy.position.set(0, 0, -5);
  enemy.traverse((obj) => obj.castShadow = true);
  scene.add(enemy);

  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(enemy);
    mixer.clipAction(gltf.animations[0]).play();
  }
});

// check if the enemy is on screen
const frustum = new THREE.Frustum();
const viewMatrix = new THREE.Matrix4();
const enemyBox = new THREE.Box3();

function isSeen() {
  camera.updateMatrixWorld();
  viewMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(viewMatrix);
  enemyBox.setFromObject(enemy);
  return frustum.intersectsBox(enemyBox);
}

const enemySpeed = 7; // units per second
const direction = new THREE.Vector3();

// game over condition
let caught = false;

function catchPlayer() {
  caught = true;
  const message = document.createElement('div');
  message.textContent = 'She caught you';
  message.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); color:red; font:48px sans-serif;';
  document.body.appendChild(message);
  setTimeout(() => location.reload(), 1000); // setting a timeout to reload the page for 1 second
}

export function updateEnemy(dt) {
  if (!enemy || caught) return;

  // catch the player
  direction.set(camera.position.x - enemy.position.x, 0, camera.position.z - enemy.position.z);
  if (direction.length() < 1) {
    catchPlayer();
    return;
  }

  // freeze when the player is looking
  if (isSeen()) return;

  // update animation
  if (mixer) mixer.update(dt);

  // walk toward the player
  direction.normalize();
  enemy.position.addScaledVector(direction, enemySpeed * dt);
  enemy.lookAt(camera.position.x, enemy.position.y, camera.position.z);
}