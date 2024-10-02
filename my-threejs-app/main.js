import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();

//create custom geometery
// const bufferGeometry = new THREE.BufferGeometry();

// const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 0, 0, 2]);
// const BufferAttribute = new THREE.BufferAttribute(vertices, 3);

// bufferGeometry.setAttribute("position", BufferAttribute);

// Create a cube geometry and material
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 3, 3, 3);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: "limeGreen",
  // wireframe: true,
  transparent: true,
  opacity: 0.5,
});
// Create a mesh with the geometry and material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

//Rotation stuff
// ****
// cubeMesh.rotation.reorder("YXZ");

// cubeMesh.rotation.x = -THREE.MathUtils.degToRad(45);
// cubeMesh.rotation.y = -THREE.MathUtils.degToRad(45);

// ***

// Add axes to the scene
// const axesHelper = new THREE.AxesHelper(2);
// scene.add(axesHelper);

//grouping the cubes
// *****/
// const cubeMesh2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
// const cubeMesh3 = new THREE.Mesh(cubeGeometry, cubeMaterial);

// cubeMesh.position.x = -2;
// cubeMesh3.position.x = 2;

// const group = new THREE.Group();
// group.add(cubeMesh);
// group.add(cubeMesh2);
// group.add(cubeMesh3);

// scene.add(group);

// cubeMesh.position.z = 2;
// cubeMesh.position.x = -1;
// ****

// Add the cube to the scene
scene.add(cubeMesh);

const aspectRatio = window.innerWidth / window.innerHeight;

// Create a camera with a perspective view
const camera = new THREE.PerspectiveCamera(30, aspectRatio, 0.1, 30);

// Create an orthographic camera

// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   200
// );
camera.position.z = 5;
scene.add(camera);

// Select the canvas element for rendering
const canvas = document.querySelector("canvas.threejs");

// Create a WebGL renderer and link it to the canvas
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

const controls = new OrbitControls(camera, canvas);
// console.log(controls);
// controls.autoRotate = true;
// controls.autoRotateSpeed = 5;
controls.enableDamping = true;

const clock = new THREE.Clock();
let previousTime = 0;

function renderLoop() {
  //animations

  // const currentTime = clock.getElapsedTime();
  // const deltaTime = currentTime - previousTime;
  // previousTime = currentTime;

  // cubeMesh.rotation.y += THREE.MathUtils.degToRad(45) * deltaTime * 2;
  // cubeMesh.rotation.x += THREE.MathUtils.degToRad(45) * deltaTime * 2;

  // cubeMesh.position.x = Math.sin(currentTime);
  // cubeMesh.position.y = Math.sin(currentTime);
  // cubeMesh.position.z = Math.sin(currentTime);

  // cubeMesh.scale.x = Math.sin(clock.getElapsedTime());

  //resizing
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Set the renderer size to match the window size
  renderer.setSize(window.innerWidth, window.innerHeight);
  // manual doing antialiasing
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
