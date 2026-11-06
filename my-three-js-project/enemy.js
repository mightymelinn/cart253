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

export function updateEnemy(dt) {
  if (!enemy) return;

  // freeze when the player is looking
  if (isSeen()) return;

  // update animation
  if (mixer) mixer.update(dt);
}