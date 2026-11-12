import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Capsule } from 'three/addons/math/Capsule.js';
import { scene, camera, worldOctree } from './world.js';

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

// check if the player can see the enemy
const frustum = new THREE.Frustum();
const viewMatrix = new THREE.Matrix4();
const enemyBox = new THREE.Box3();
const ray = new THREE.Ray();
const enemyChest = new THREE.Vector3();

function isSeen() {
  // check enemy on screen
  camera.updateMatrixWorld();
  viewMatrix.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
  frustum.setFromProjectionMatrix(viewMatrix);
  enemyBox.setFromObject(enemy);
  if (!frustum.intersectsBox(enemyBox)) return false;

  // check the wall blocking enemy
  enemyChest.set(enemy.position.x, enemy.position.y + 1.2, enemy.position.z);
  ray.origin.copy(camera.position);
  ray.direction.subVectors(enemyChest, camera.position).normalize();

  const hit = worldOctree.rayIntersect(ray);
  const distanceToEnemy = camera.position.distanceTo(enemyChest);
  return !(hit && hit.distance < distanceToEnemy);
}

// check house collision
const enemyCapsule = new Capsule(new THREE.Vector3(), new THREE.Vector3(), 0.35);

function collideWithHouse() {
  enemyCapsule.start.set(enemy.position.x, enemy.position.y + 0.4, enemy.position.z);
  enemyCapsule.end.set(enemy.position.x, enemy.position.y + 1.6, enemy.position.z);

  const result = worldOctree.capsuleIntersect(enemyCapsule);
  if (result) {
    enemy.position.x += result.normal.x * result.depth;
    enemy.position.z += result.normal.z * result.depth;
  }
}

// footstep sound
const footsteps = new Audio('ES_Footsteps.mp3');
footsteps.loop = true;
const hearDistance = 10; // CHANGE LATER

const enemySpeed = 3; // units per second CHANGE LATER
const direction = new THREE.Vector3();

// game over condition
let caught = false;

function catchPlayer() {
  caught = true;
  footsteps.pause();
  const message = document.createElement('div');
  message.textContent = 'She caught you';
  message.style.cssText = 'position:fixed; top:50%; left:50%; transform:translate(-50%, -50%); color:red; font:48px sans-serif;';
  document.body.appendChild(message);
  //setTimeout(() => location.reload(), 1000); // setting a timeout to reload the page for 1 second CHANGE LATER
}

export function updateEnemy(dt) {
  if (!enemy || caught) return;

  // catch the player
  direction.set(camera.position.x - enemy.position.x, 0, camera.position.z - enemy.position.z);
  const distance = direction.length();
  if (distance < 1) {
    catchPlayer();
    return;
  }

  // footsteps get louder based on distance
  footsteps.volume = THREE.MathUtils.clamp(1 - distance / hearDistance, 0, 1);

  // freeze when the player is looking
  if (isSeen()) {
    footsteps.pause();
    return;
  }

  // footsteps play
  if (footsteps.paused) footsteps.play().catch(() => {});

  // update animation
  if (mixer) mixer.update(dt);

  // walk toward the player
  direction.normalize();
  enemy.position.addScaledVector(direction, enemySpeed * dt);
  collideWithHouse();
  enemy.lookAt(camera.position.x, enemy.position.y, camera.position.z);
}