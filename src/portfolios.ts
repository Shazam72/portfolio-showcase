import {
  CylinderGeometry,
  DoubleSide,
  Group,  Mesh,
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
  thetaLength: Math.PI / 2.03,
};
const portfolios = new Group();
const portfolioItems: Group[] = [];
const colors = ["red", "green", "blue", "purple"];

const length = 3;
console.time();

let geometry = new CylinderGeometry(
  cylinderGeoParams.radius,
  cylinderGeoParams.radius,
  cylinderGeoParams.height,
  cylinderGeoParams.radialSegments,
  cylinderGeoParams.heightSegments,
  cylinderGeoParams.openEnded,
  cylinderGeoParams.thetaStart,
  cylinderGeoParams.thetaLength
);
for (let y = 0; y < length; y++) {
  const portfolioItem = new Group();
  for (let i = 0; i < 4; i++) {
    const idx = Math.max(1, Math.floor(Math.random() * colors.length));
    const texture = textureLoader.load(`/item${idx}.png`);
    texture.colorSpace = SRGBColorSpace;
    // texture.minFilter = NearestFilter
    // texture.generateMipmaps = false
    // texture.center.set(0.5, 0.5);
    // texture.flipY = false;
    // texture.rotation = Math.PI;
    const material = new MeshBasicMaterial({
      side: DoubleSide,
      map: texture,
    });
    const mesh = new Mesh(geometry, material);
    mesh.name=`item-${y}-${i}`
    mesh.addEventListener("click", (evt) => {
      console.log(evt);
    });
    mesh.rotation.y = (i * Math.PI) / 2;
    portfolioItem.add(mesh);
  }
  portfolioItem.position.y = y * (cylinderGeoParams.height + 0.3);
  portfolioItem.rotation.y = Math.PI / 3 + Math.PI * Math.random();
  portfolios.add(portfolioItem);
  portfolioItems.push(portfolioItem);
}
console.timeEnd();
portfolios.position.y = 5;

const animate = () => {
  const elapsed = 0.002;
  portfolioItems.forEach((portfolioItem, idx) => {
    portfolioItem.rotateY((idx % 2 == 0 ? -1 : 1) * elapsed);
  });
  requestAnimationFrame(animate);
};
animate();

export const onPortfolioHover = (
  mesh: Mesh<CylinderGeometry, MeshBasicMaterial>
) => {
  mesh.material.color.set("gray");
};
export const onPortfolioHoverEnd = (
  mesh: Mesh<CylinderGeometry, MeshBasicMaterial>
) => {
  mesh.material.color.set("");
};

export default portfolios;
