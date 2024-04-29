import {
  CylinderGeometry,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
  SRGBColorSpace,
  TextureLoader,
} from "three";
import { getPortfolioLinks } from "./getPortfolioLink";
import { generateBtn } from "./btn";

export type PortfolioCylinder = Mesh<CylinderGeometry, MeshBasicMaterial>;

const textureLoader = new TextureLoader().setPath("portfolios/");
const yOffset = 4;
const xOffset = 8;
const cylinderGeoParams = {
  radius: 12,
  height: yOffset,
  radialSegments: 10,
  heightSegments: 1,
  openEnded: true,
  thetaStart: 0,
  thetaLength: Math.PI / 4.05,
};
const portfolios = new Group();
const portfolioItems: Group[] = [];

const generatePortfolios = async () => {
  console.time();
  const portfolioInfos = await getPortfolioLinks();
  const length = portfolioInfos.length / xOffset;

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

  for (let y = 0; y < length; y++) {
    const portfolioItem = new Group();
    for (let i = 0; i < xOffset; i++) {
      const idx = y * 4 + i;
      
      const material = new MeshBasicMaterial({
        side: DoubleSide,
      });
      
      const cylinderGroup = new Group();
      cylinderGroup.userData.isCylinderGroup = true;

      const btn = generateBtn();
      btn.position.set(4.5, 0, 10.8);
      btn.rotateY(Math.PI / xOffset);
      btn.visible = false;
      btn.userData.link = portfolioInfos[idx].link;

      const cylinder = new Mesh(cylinderGeo, material);
      cylinderGroup.add(cylinder, btn);
      cylinder.userData.img = portfolioInfos[idx].img;
      const texture = textureLoader.load(cylinder.userData.img);
      texture.colorSpace = SRGBColorSpace;
      texture.center.set(0.5, 0.5);
      texture.flipY = false;
      texture.rotation = Math.PI;
      cylinder.material.map = texture;
      cylinder.name = `item-${y}-${i}`;

      cylinderGroup.rotation.y = (2 * (i * Math.PI)) / xOffset;
      portfolioItem.add(cylinderGroup);
    }
    portfolioItem.position.y =
      y * (cylinderGeoParams.height + 0.1) -
      (cylinderGeoParams.height * yOffset) / 2;
    // portfolioItem.rotation.y = Math.PI / 3 + Math.PI * Math.random();
    portfolios.add(portfolioItem);
    portfolioItems.push(portfolioItem);
  }
  console.timeEnd();
};

generatePortfolios();
const animate = () => {
  const elapsed = 0.0007;
  portfolioItems.forEach((portfolioItem, idx) => {
    portfolioItem.rotateY((idx % 2 == 0 ? -1 : 1) * elapsed);
  });
  requestAnimationFrame(animate);
};
animate();

export default portfolios;
