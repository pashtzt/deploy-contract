// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

exports.main = async (params, signer) => {
  const Default = await hre.ethers.getContractFactory("DefaultContract");
  const deployed = await Default.connect(signer).deploy('Test message');
  await deployed.deployed();
  console.log("DefaultContract deployed to:", deployed.address);


}

