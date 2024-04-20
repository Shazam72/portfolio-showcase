import {
    BackSide,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three";

const textureLoader = new TextureLoader();
const cylinderGeoParams = {
  radius: 12,
  height: 10,
  radialSegments: 10,
  heightSegments: 1,
  openEnded: true,
  thetaStart: 0,
  thetaLength: 2 * Math.PI,
};
const group = new Group();
const colors = ["red", "green", "blue", "purple"];

const length = 3;
console.time();

const geometry = new CylinderGeometry(
  cylinderGeoParams.radius,
  cylinderGeoParams.radius,
  cylinderGeoParams.height,
  cylinderGeoParams.radialSegments,
  cylinderGeoParams.heightSegments,
  cylinderGeoParams.openEnded,
  0,
  Math.PI / 2
);
for (let y = 0; y < length; y++) {
    const cylinderGroup = new Group();
  for (let i = 0; i < 4; i++) {
      const idx = Math.max(1, Math.floor(Math.random() * colors.length));
    const texture = textureLoader.load(`/item${idx}.png`);
    texture.colorSpace = SRGBColorSpace;
    // texture.minFilter = NearestFilter
    // texture.generateMipmaps = false
    texture.center.set(0.5, 0.5);
    texture.flipY = false;
    texture.rotation = Math.PI;
    const material = new MeshBasicMaterial({
      side: BackSide,
      map: texture
    });
    const mesh = new Mesh(geometry, material);
    mesh.position.y = y * 10;
    mesh.rotation.y = (i * Math.PI) / 2;
    cylinderGroup.add(mesh);
  }
  cylinderGroup.rotation.y = Math.PI / 3 + Math.PI * Math.random();
  group.add(cylinderGroup);
}
console.timeEnd();
group.position.y = 5

export default group;
