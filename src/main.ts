import { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight } from "three";
import "./style.css";
import portfolios from "./portfolios";
import ground from "./ground";
import gui from "./gui";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const SIZES = {
  WIDTH: innerWidth,
  HEIGHT: innerHeight,
};
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const renderer = new WebGLRenderer({ canvas });
const scene = new Scene();

renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);

const camera = new PerspectiveCamera(50, SIZES.WIDTH / SIZES.HEIGHT);
scene.add(camera);
const orbitControls = new OrbitControls(camera, canvas);
orbitControls.enableDamping = true;
camera.position.set(0, 0, 3);

const ambientLight = new AmbientLight();
scene.add(ambientLight);
gui.add(ambientLight, "intensity", 0, 100, 0.01);

scene.add(portfolios);

scene.add(ground);
const animate = () => {
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.addEventListener("keydown", (evt) => {
  if (evt.key == "ArrowUp") {
    portfolios.position.y--;
  } else if (evt.key == "ArrowDown") {
    portfolios.position.y++;
  }
});

animate();
