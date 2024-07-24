// console.log("Hello World");
console.log(THREE);
const scene = new THREE.Scene();

const geomeertry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geomeertry, material);
scene.add(cube);
const size = {
    width: 700,
    height: 500
}
const camera = new THREE.PerspectiveCamera(75, size.width / size.height);
camera.position.z = 5;
// camera.position.y = 5;
// camera.position.x = 5;
scene.add(camera);

//rendering
const target = document.querySelector(".wbgl")
const renderer = new THREE.WebGLRenderer({canvas: target});

renderer.setSize(size.width,size.height)
renderer.render(scene,camera)