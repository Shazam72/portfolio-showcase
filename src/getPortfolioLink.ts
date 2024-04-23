type PortfolioInfo = {
  link: string;
  img: string;
};

const getPortfolioLinks = async () => {
  const portfolioInfos: PortfolioInfo[] = await (
    await fetch("/portfolios.json")
  ).json();
  const lastIdxToKeep = portfolioInfos.length - (portfolioInfos.length % 4);

  return portfolioInfos.slice(0, lastIdxToKeep);
};

export { getPortfolioLinks };
