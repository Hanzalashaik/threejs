import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);

//setting position

// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;
//samething
mesh.position.set(0.7, -0.6, 1);

//rotation
// mesh.rotation.y = 4
// mesh.rotation.x = 0.5
//samething rotation
mesh.rotation.set(9, Math.PI / 4, 0)

//Scaling
// mesh.scale.set(2, 0.5, 0.5);

scene.add(mesh);
console.log(mesh.position.length());
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
scene.add(camera);
// console.log(mesh.position.distanceTo(camera.position)); 
// console.log(mesh.position.normalize());
// camera.position.set(1,1,3)
camera.lookAt(mesh.position)

//Axes Helper
const axesHelper = new THREE.AxesHelper( );
scene.add( axesHelper );

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
