import {
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  PlaneGeometry,
  SRGBColorSpace,
  TextureLoader,
} from "three";
import { getPortfolioLinks } from "./getPortfolioLink";
import gui from "./gui";

export type PortfolioCylinder = Mesh<CylinderGeometry, MeshBasicMaterial>;

const textureLoader = new TextureLoader().setPath("portfolios/");
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

const portfolioInfos = await getPortfolioLinks();
const length = portfolioInfos.length / 4;
console.time();

let cylinderGeo = new CylinderGeometry(
  cylinderGeoParams.radius,
  cylinderGeoParams.radius,
  cylinderGeoParams.height,
  cylinderGeoParams.radialSegments,
  cylinderGeoParams.heightSegments,
  cylinderGeoParams.openEnded,
  cylinderGeoParams.thetaStart,
  cylinderGeoParams.thetaLength
);
const btnGeo = new PlaneGeometry(3, 1.5);
const btnMat = new MeshBasicMaterial({
  color: 0xff0fff,
  side: DoubleSide,
  transparent: true,
  opacity: 0.5
});
for (let y = 0; y < length; y++) {
  const portfolioItem = new Group();
  for (let i = 0; i < 4; i++) {
    const idx = y * 4 + i;

    const material = new MeshBasicMaterial({
      side: DoubleSide,
    });
    const cylinder = new Mesh(cylinderGeo, material);
    const btn = new Mesh(btnGeo, btnMat);
    btn.position.set(8.4, 0, 8.4);
    btn.rotateY(Math.PI / 4);
    const cylinderGroup = new Group();
    cylinderGroup.userData.isCylinderGroup = true;
    btn.visible = false;
    cylinderGroup.add(cylinder, btn);
    btn.userData.link = portfolioInfos[idx].link;
    cylinder.userData.img = portfolioInfos[idx].img;
    const texture = textureLoader.load(cylinder.userData.img);
    texture.colorSpace = SRGBColorSpace;
    texture.center.set(0.5, 0.5);
    texture.flipY = false;
    texture.rotation = Math.PI;
    cylinder.material.map = texture;
    cylinder.name = `item-${y}-${i}`;
    cylinderGroup.rotation.y = (i * Math.PI) / 2;
    portfolioItem.add(cylinderGroup);
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
    // portfolioItem.rotateY((idx % 2 == 0 ? -1 : 1) * elapsed);
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
