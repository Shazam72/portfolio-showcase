import { Scene, WebGLRenderer, PerspectiveCamera, Clock, AmbientLight } from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import group from "./gallery/galery-item";
import Floor from "./floor";
import gui from "./gui";

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
camera.position.set(-20, 10, 50);
// const orbitControls = new OrbitControls(camera, canvas);
// orbitControls.enableDamping = true;
gui.add(camera.position,"x")
gui.add(camera.position,"y")
gui.add(camera.position,"z")

const ambientLight = new AmbientLight()
scene.add(ambientLight)
gui.add(ambientLight,"intensity",0,100,0.01)

scene.add(group);
scene.add(Floor)
const clock = new Clock();
const animate = () => {
  // orbitControls.update();
  const elapsedTime = clock.getElapsedTime() * 0.1;
  group.rotation.y = elapsedTime;
  // camera.lookAt(group.position)
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};

window.addEventListener("keydown", (evt) => {
  if (evt.key == "ArrowUp") {
    group.position.y--;
  } else if (evt.key == "ArrowDown") {
    group.position.y++;
  }
});

animate();
