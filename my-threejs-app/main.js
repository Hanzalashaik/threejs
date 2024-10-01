import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Create a scene
const scene = new THREE.Scene();

// Create a cube geometry and material
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

// Create a mesh with the geometry and material
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial);

// Add the cube to the scene
scene.add(cubeMesh);

// Create a camera with a perspective view
const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  30
);
camera.position.z = 5;
scene.add(camera);

// Select the canvas element for rendering
const canvas = document.querySelector("canvas.threejs");

// Create a WebGL renderer and link it to the canvas
const renderer = new THREE.WebGLRenderer({ canvas });

const controls = new OrbitControls(camera, canvas);
console.log(controls);
// controls.autoRotate = true;
// controls.enableDamping = true;

// Set the renderer size to match the window size
renderer.setSize(window.innerWidth, window.innerHeight);

function renderLoop() {
  // controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
