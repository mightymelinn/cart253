import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// For scene, camera, render, lights, floor, anything related to environment.

// set up
export const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
export const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

export const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment()).texture;
scene.environmentIntensity = 0.2;

// add outline highlight
export const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

export const outlinePass = new OutlinePass(new THREE.Vector2(innerWidth, innerHeight), scene, camera);
outlinePass.visibleEdgeColor.set('white');
outlinePass.edgeStrength = 3;
outlinePass.edgeGlow = 1;
composer.addPass(outlinePass);

composer.addPass(new OutputPass());

// add sounds

// ambient sound
export const ambience = new Audio('ES_Fluxure - Ethan Sloan.mp3');
ambience.loop = true;
ambience.volume = 0.3;

// add lights
const sun = new THREE.DirectionalLight('#fff2e0', 3);
sun.position.set(5, 10, 5);
sun.castShadow = true;
Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10 });
scene.add(sun);

scene.add(new THREE.HemisphereLight('white', 'gray', 0.1));

// add house from UE5
new GLTFLoader().load('L_house.glb', (gltf) => {
  const house = gltf.scene;
  scene.add(house);
  house.updateMatrixWorld(true);

  house.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.castShadow = true;
    obj.receiveShadow = true;

    // add collision TEST
    const box = new THREE.Box3().setFromObject(obj);
    if (box.max.y - box.min.y < 0.3) return;
    solidBoxes.push(box);
  });
});

// add collision
export const solidBoxes = [];

// add pickup items
export const items = [];
const itemPositions = [
  [2, 0.25, 0],
  [-3, 0.25, -3],
  [0, 0.25, -7],
];

for (const pos of itemPositions) {
  const item = new THREE.Mesh(
    new THREE.BoxGeometry(0.5, 0.5, 0.5),
    new THREE.MeshStandardMaterial({ color: 'yellow' })
  );
  item.position.set(...pos);
  item.castShadow = true;
  scene.add(item);
  items.push(item);
  item.userData.box = new THREE.Box3().setFromObject(item);
  solidBoxes.push(item.userData.box);
}

export function updateWorld(dt) {
}