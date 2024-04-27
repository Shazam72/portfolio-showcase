import {
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Raycaster,
  Vector2,
  Mesh,
  BoxGeometry,
  MeshNormalMaterial,
} from "three";
import "./style.css";
import portfolios, { PortfolioCylinder } from "./portfolios";
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
camera.position.set(0, 0, 0.0001);
const orbitControls = new OrbitControls(camera, canvas);

orbitControls.minPolarAngle = Math.PI / 2.5;
orbitControls.maxPolarAngle = Math.PI / 1.8;

scene.add(camera);

const mesh = new Mesh(new BoxGeometry(), new MeshNormalMaterial());
scene.add(mesh);

scene.add(portfolios);

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
