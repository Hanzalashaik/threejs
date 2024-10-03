import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import suntexture from "./static/textures/sun.jpg";

// Create scene
const scene = new THREE.Scene();

const textureLoader = new THREE.TextureLoader();
const sunTexture = textureLoader.load(suntexture);
const earthTexture = textureLoader.load("./static/textures/earth.jpg");
const moonTexture = textureLoader.load("./static/textures/moon.jpg");
const marsTexture = textureLoader.load("./static/textures/mars.jpg");
const jupiterTexture = textureLoader.load("./static/textures/jupiter.jpg");
const mercuryTexture = textureLoader.load("./static/textures/mercury.jpg");
const venusTexture = textureLoader.load("./static/textures/venus.jpg");

const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath("static/spaceTexture/"); // Note the trailing slash
const spaceTexture = cubeTextureLoader.load([
  "px.png",
  "nx.png",
  "py.png",
  "ny.png",
  "pz.png",
  "nz.png",
]);
scene.background = spaceTexture;

// Create materials
const materials = {
  mercury: new THREE.MeshStandardMaterial({ map: mercuryTexture }),
  venus: new THREE.MeshStandardMaterial({ map: venusTexture }),
  earth: new THREE.MeshStandardMaterial({ map: earthTexture }),
  mars: new THREE.MeshStandardMaterial({ map: marsTexture }),
  moon: new THREE.MeshStandardMaterial({ map: moonTexture }),
  jupiter: new THREE.MeshStandardMaterial({ map: jupiterTexture }),
};

// Create the Sun
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ map: sunTexture });
const sun = new THREE.Mesh(sphereGeometry, sunMaterial);
scene.add(sun);
sun.scale.setScalar(5); // Sun is larger than planets

// Define planets and moons
const planets = [
  {
    name: "Mercury",
    radius: 0.5,
    distance: 7,
    speed: 0.04,
    material: materials.mercury,
  },
  {
    name: "Venus",
    radius: 0.9,
    distance: 9,
    speed: 0.03,
    material: materials.venus,
  },
  {
    name: "Earth",
    radius: 1,
    distance: 12,
    speed: 0.02,
    material: materials.earth,
    moons: [
      {
        name: "Moon",
        radius: 0.27,
        distance: 2,
        speed: 0.015,
        material: materials.moon,
      },
    ],
  },
  {
    name: "Mars",
    radius: 0.6,
    distance: 15,
    speed: 0.015,
    material: materials.mars,
    moons: [
      {
        name: "Phobos",
        radius: 0.1,
        distance: 1.5,
        speed: 0.02,
        material: materials.moon,
      },
      {
        name: "Deimos",
        radius: 0.2,
        distance: 2.5,
        speed: 0.025,
        material: materials.moon,
      },
    ],
  },
  {
    name: "Jupiter",
    radius: 2,
    distance: 20,
    speed: 0.01,
    material: materials.jupiter,
  },
];

// Create planet and moon meshes
const createPlanet = (planet) => {
  const planetMesh = new THREE.Mesh(sphereGeometry, planet.material);
  planetMesh.scale.setScalar(planet.radius);
  planetMesh.position.x = planet.distance;
  scene.add(planetMesh);

  return planetMesh;
};

const createMoon = (moon, planet) => {
  const moonMesh = new THREE.Mesh(sphereGeometry, moon.material);
  moonMesh.scale.setScalar(moon.radius);
  moonMesh.position.x = planet.distance + moon.distance; // Position moon relative to its planet
  planet.add(moonMesh); // Add moon as a child of the planet

  return moonMesh;
};

// Store all the planet meshes
const planetMeshes = planets.map((planet) => {
  const planetMesh = createPlanet(planet);

  // Check if the planet has moons before adding them
  if (planet.moons) {
    planet.moons.map((moon) => createMoon(moon, planetMesh));
  }

  return planetMesh;
});

// Add lighting
const pointLight = new THREE.PointLight(0xffffff, 10);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
scene.add(directionalLight);
scene.add(pointLight);

// Set up camera
const camera = new THREE.PerspectiveCamera(
  35,
  window.innerWidth / window.innerHeight,
  0.1,
  400
);
camera.position.z = 40;
camera.position.y = 5;

// Get canvas and create renderer
const canvas = document.querySelector("canvas.threejs");
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

function renderLoop() {
  planetMeshes.forEach((planetMesh, index) => {
    const planetData = planets[index];

    // Rotate planet
    planetMesh.rotation.y += planetData.speed;

    // Update planet's position
    planetMesh.position.x =
      Math.sin(planetMesh.rotation.y) * planetData.distance;
    planetMesh.position.z =
      Math.cos(planetMesh.rotation.y) * planetData.distance;

    // Rotate moons relative to their planet
    planetMesh.children.forEach((moon, moonIndex) => {
      const moonData = planetData.moons[moonIndex];
      moon.rotation.y += moonData.speed;

      // Update moon's position relative to the planet
      moon.position.x = Math.sin(moon.rotation.y) * moonData.distance;
      moon.position.z = Math.cos(moon.rotation.y) * moonData.distance;
    });
  });

  //resizing
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  // Set the renderer size to match the window size
  renderer.setSize(window.innerWidth, window.innerHeight);

  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(renderLoop);
}

renderLoop();
