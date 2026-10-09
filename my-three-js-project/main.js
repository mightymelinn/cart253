import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';

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
scene.add(new THREE.AmbientLight('white', 0.5));

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

//animation
const speed = 3; // units per second
let last = 0;

renderer.setAnimationLoop((time) => {
  const step = Math.min((time - last) / 1000, 0.1) * speed;
  last = time;

  if (keys.KeyW) controls.moveForward(step);
  if (keys.KeyS) controls.moveForward(-step);
  if (keys.KeyD) controls.moveRight(step);
  if (keys.KeyA) controls.moveRight(-step);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});