import * as THREE from "three";
import gsap from "gsap";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Sizes
const sizes = {
  width: 800,
  height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

// let time = Date.now()
//using clock
let clock = new THREE.Clock()

// GSAP Library to move the object statically
// gsap.to(mesh.position, {
//   x: 2,
//   duration: 1,
//   delay: 1,

// })

const tick =()=>{

  //using Javascript 
  // const currentTime = Date.now();
  // const delta = currentTime - time
  // time = currentTime;
  // console.log(delta);

  const elapsedTime = clock.getElapsedTime()
  // console.log(elapsedTime);

  mesh.rotation.y = elapsedTime
  // mesh.position.y = Math.sin(elapsedTime)
  camera.position.y = Math.cos(elapsedTime)
  camera.lookAt(mesh.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick)
}

tick()