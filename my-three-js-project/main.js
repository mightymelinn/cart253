import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// set up
const scene = new THREE.Scene();
scene.background = new THREE.Color('black');
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, 3);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
document.body.appendChild(renderer.domElement);
scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment()).texture;
scene.environmentIntensity = 0.2;

// fps camera control
const controls = new PointerLockControls(camera, document.body);
document.addEventListener('click', () => {
  controls.lock();
  ambience.play();
});

// keyboard controls
const keys = {};
addEventListener('keydown', (e) => keys[e.code] = true);
addEventListener('keyup', (e) => keys[e.code] = false);

// add sounds

// ambient sound
const ambience = new Audio('ES_Fluxure - Ethan Sloan.mp3');
ambience.loop = true;
ambience.volume = 0.3;

// add lights
const sun = new THREE.DirectionalLight('#fff2e0', 3);
sun.position.set(5, 10, 5);
sun.castShadow = true;
Object.assign(sun.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10 });
scene.add(sun);

scene.add(new THREE.HemisphereLight('white', 'gray', 0.1)
);

// add floor
const floor = new THREE.Mesh(
  new THREE.BoxGeometry(20, 0.1, 20),
  new THREE.MeshStandardMaterial({ color: 'gray' })
);
floor.position.y = -0.05;
floor.receiveShadow = true;
scene.add(floor);

// add cube
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(),
  new THREE.MeshStandardMaterial({color: 'red'})
);
cube.position.set(-0.8, 0.5, 0);
cube.castShadow = true;
scene.add(cube);

// add cylinder
const cylinder = new THREE.Mesh(
  new THREE.CylinderGeometry(1, 1, 2, 32),
  new THREE.MeshStandardMaterial({ color: 'blue' })
);
cylinder.position.set(1, 1, -5);
cylinder.castShadow = true;
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
  gltf.scene.traverse((obj) => obj.castShadow = true);
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

// Game mechanics: pick up objects
class PickHelper {
  constructor() {
    this.raycaster = new THREE.Raycaster();
    this.pickedObject = null;
    this.pickedObjectSavedColor = 0;
  }
  pick(normalizedPosition, objects, camera) {
    if (this.pickedObject) {
      this.pickedObject.material.emissive.setHex(this.pickedObjectSavedColor);
      this.pickedObject = null;
    }

    this.raycaster.setFromCamera(normalizedPosition, camera);
    
    const hits = this.raycaster.intersectObjects(objects);
    
    if (hits.length && hits[0].distance < 3) {
      this.pickedObject = hits[0].object;
      this.pickedObjectSavedColor = this.pickedObject.material.emissive.getHex();
      this.pickedObject.material.emissive.setHex(0xffffff);
    }
  }
}

const pickHelper = new PickHelper();
const pickables = [cube]; // list of my pickable objects
const screenCenter = new THREE.Vector2(0, 0);

addEventListener('keydown', (e) => {
  if (e.code !== 'KeyE' || !pickHelper.pickedObject) return;

  // remove obj after press E
  const obj = pickHelper.pickedObject;
  pickHelper.pickedObject = null;
  scene.remove(obj);
  pickables.splice(pickables.indexOf(obj), 1);

  // remove collision press E
  if (obj === cube) solidBoxes.splice(solidBoxes.indexOf(cubeBox), 1);
});

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

  // cube spinning
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.updateMatrixWorld();
  cubeBox.copy(cube.geometry.boundingBox).applyMatrix4(cube.matrixWorld);

  // update animation
  if (mixer) mixer.update(dt);

  // update highlighted object
  pickHelper.pick(screenCenter, pickables, camera);

  renderer.render(scene, camera);
});