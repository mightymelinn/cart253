import * as THREE from 'three';
import { DragControls } from 'three/addons/controls/DragControls.js';

// set up
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// add lights
scene.add(new THREE.DirectionalLight('pink', 3));
scene.add(new THREE.AmbientLight('white', 0.5));

// add cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({color: 'red'})
);
cube. position.x = -0.8;
scene.add(cube);

// add cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 32),
  new THREE.MeshStandardMaterial({color: 'blue'})
);
cylinder .position.set(1, 0, -5);
scene.add(cylinder);
new DragControls([cylinder], camera, renderer.domElement);

//animation
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});