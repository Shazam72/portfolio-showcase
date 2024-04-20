import { PlaneGeometry } from "three";
import { Reflector } from "three/examples/jsm/Addons.js";

const groundMirror = new Reflector(new PlaneGeometry(30, 30), {
  clipBias: 0.003,
  textureWidth: window.innerWidth * window.devicePixelRatio,
  textureHeight: window.innerHeight * window.devicePixelRatio,
  
});
groundMirror.position.y = 0.5;
groundMirror.rotateX(-Math.PI / 2);

export default groundMirror;
