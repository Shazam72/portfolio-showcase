import {
  Mesh,
  MeshStandardMaterial,
  PlaneGeometry,
} from "three";

const ground = new Mesh(
  new PlaneGeometry(300, 300),
  new MeshStandardMaterial({ roughness: 0, metalness: 0 })
);
ground.position.y = 0.5;
ground.rotateX(-Math.PI / 2);

export default ground;
