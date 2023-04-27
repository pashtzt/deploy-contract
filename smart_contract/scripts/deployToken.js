// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

exports.main = async (params, signer) => {

  const Token = await hre.ethers.getContractFactory("DeployToken");


  const deployed = await Token.connect(signer).deploy();
  await deployed.deployed();
  console.log("DeployToken deployed to:", deployed.address);


}

