import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// set up
const scene = new THREE.Scene();
scene.background = new THREE.Color('beige');
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// fps camera control
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => controls.lock());

// keyboard controls
const keys = {};
addEventListener('keydown', (e) => keys[e.code] = true);
addEventListener('keyup', (e) => keys[e.code] = false);

// add lights
scene.add(new THREE.DirectionalLight('pink', 3));
scene.add(new THREE.AmbientLight('white', 2));

// add floor
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(20, 0.1, 20),
  new THREE.MeshStandardMaterial({ color: 'gray' })
);
floor.position.y = -0.05;
scene.add(floor);

// add cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({color: 'red'})
);
cube.position.set(-0.8, 0.5, 0);
scene.add(cube);

// add cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 32),
  new THREE.MeshStandardMaterial({ color: 'blue' })
);
cylinder.position.set(1, 1, -5);
scene.add(cylinder);

// add collision
cube.geometry.computeBoundingBox();
const cubeBox = new THREE.Box3();
const cylinderBox = new THREE.Box3().setFromObject(cylinder);
const solidBoxes = [cubeBox, cylinderBox];

// add model from UE5
let mixer;
new GLTFLoader().load('SM_Emmi.glb', (gltf) => {
  scene.add(gltf.scene);
  solidBoxes.push(new THREE.Box3().setFromObject(gltf.scene));

  if (gltf.animations.length) {
    mixer = new THREE.AnimationMixer(gltf.scene);
    mixer.clipAction(gltf.animations[0]).play();
  }
});

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

// animation
const speed = 3; // units per second
let last = 0;

renderer.setAnimationLoop((time) => {
  const dt = Math.min((time - last) / 1000, 0.1);
  last = time;
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

  // update animation
  if (mixer) mixer.update(dt);
  renderer.render(scene, camera);

  // cube spinning
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.updateMatrixWorld();
  cubeBox.copy(cube.geometry.boundingBox).applyMatrix4(cube.matrixWorld);
});