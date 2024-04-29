import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  TextureLoader,
} from "three";

const textureLoader = new TextureLoader();
textureLoader.setPath("btn/textures/");
const alphaMap = textureLoader.load("alpha.png");
alphaMap.flipY = false;
alphaMap.center.set(0.5, 0.5);
alphaMap.rotation = Math.PI;

const btnGeo = new PlaneGeometry(1.5, 1.5);
const btnMat = new MeshBasicMaterial({
  side: DoubleSide,
  transparent: true,
  opacity: 0.7,
  alphaMap: alphaMap,
});

const generateBtn = () => {
  const btn = new Mesh(btnGeo, btnMat);
  return btn;
};

export { generateBtn };
