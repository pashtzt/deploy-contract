const hre = require("hardhat");

exports.main = async (params, signer) => {

  const Nft = await hre.ethers.getContractFactory("DeployNft");
  const deployed = await Nft.connect(signer).deploy();
  await deployed.deployed();
  console.log("DeployNft deployed to:", deployed.address);
  const walletAddress = signer.getAddress();
  await deployed.mint(walletAddress);
  console.log('Mint Nft');


}

