import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Clock,
  AmbientLight,
} from "three";
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
// camera.position.set(0, 10, 23);
const orbits = new OrbitControls(camera, canvas)
camera.position.set(-20, 10, 50);
gui.add(camera.position, "x");
gui.add(camera.position, "y");
gui.add(camera.position, "z");

const ambientLight = new AmbientLight();
scene.add(ambientLight);
gui.add(ambientLight, "intensity", 0, 100, 0.01);

scene.add(portfolios);
scene.add(ground);
// const clock = new Clock();
const animate = () => {
  // const elapsedTime = clock.getElapsedTime() * 0.1;
  // portfolios.rotation.y = elapsedTime;
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
