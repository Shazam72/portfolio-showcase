import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  Vector2,
  Raycaster,
} from "three";
import "./style.css";
import portfolios, { PortfolioCylinder } from "./portfolios";
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

const camera = new PerspectiveCamera(30, SIZES.WIDTH / SIZES.HEIGHT);
scene.add(camera);
const d = new OrbitControls(camera, canvas);
d.enableDamping = true;
camera.position.set(0, 0, 3);
d.update();
gui.add(camera.position, "x", -100, 100, 0.5);
gui.add(camera.position, "y", -100, 100, 0.5);
gui.add(camera.position, "z", -100, 100, 0.5);

const ambientLight = new AmbientLight();
scene.add(ambientLight);
gui.add(ambientLight, "intensity", 0, 100, 0.01);

scene.add(portfolios);

const animate = () => {
  d.update();
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

const pointer = new Vector2();
const raycaster = new Raycaster();

canvas.addEventListener("mousemove", (evt) => {
  pointer.x = (evt.clientX / innerWidth - 0.5) * 2;
  pointer.y = (0.5 - evt.clientY / innerHeight) * 2;
  raycaster.setFromCamera(pointer, camera);
  const intersected = raycaster.intersectObject(portfolios, true)[0]?.object;
  portfolios.children.forEach((portfolioItem) => {
    portfolioItem.children.forEach((cylinderGroup) => {
      const cylinder = cylinderGroup.children[0] as PortfolioCylinder;
      const btn = cylinderGroup.children[1] as PortfolioCylinder;
      if (intersected?.id == cylinder.id || intersected?.id == btn?.id) {
        cylinder.material && cylinder.material.color.set("gray");
        btn && (btn.visible = true);
      } else {
        cylinder.material && cylinder.material.color.set("white");
        btn && (btn.visible = false);
      }
    });
  });
});
canvas.addEventListener("click", (evt) => {
  pointer.x = (evt.clientX / innerWidth - 0.5) * 2;
  pointer.y = (0.5 - evt.clientY / innerHeight) * 2;
  raycaster.setFromCamera(pointer, camera);
  const intersected = raycaster.intersectObject(portfolios, true)[0]?.object;
  portfolios.children.forEach((portfolioItem) => {
    portfolioItem.children.forEach((cylinderGroup) => {
      const btn = cylinderGroup.children[1] as PortfolioCylinder;
      if (intersected?.id == btn?.id) {
        window.open(btn.userData.link, "_blank");
      }
    });
  });
});

animate();
