import * as THREE from 'three';

// set up 3d world
const scene = new THREE.Scene();
// set up cam
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
// set up renderer? 
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);
// add cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({color: 'red'})
);
scene.add(new THREE.DirectionalLight('pink', 3));
scene.add(new THREE.AmbientLight('white', 0.5
));
scene.add(cube);
camera.position.z = 3;
//make a cube spinning
renderer.setAnimationLoop(() => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
});