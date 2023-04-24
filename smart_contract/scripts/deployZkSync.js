// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { saveFrontendFiles } = require('./utils');
const hre = require("hardhat");
const { exit } = require("process");
const relayAddress = '0xBf175FCC7086b4f9bd59d5EAE8eA67b8f940DE0d';

async function main() {

  // Hardhat always runs to compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CustomChallenge = await hre.ethers.getContractFactory("CustomChallenge");
  const customChallenge = await CustomChallenge.deploy(relayAddress);
  await customChallenge.deployed();

  const PriceChallenge = await hre.ethers.getContractFactory("PriceChallenge");


  let startTime = new Date();
  startTime.setUTCHours(0, 0, 0, 0);
  startTime = startTime.getTime() / 1000;
  console.log(startTime)
  return false;

  const priceChallenge = await PriceChallenge.deploy(startTime);
  await priceChallenge.deployed();


  console.log("CustomChallenge deployed to:", customChallenge.address);
  saveFrontendFiles(customChallenge, "CustomChallenge");

  console.log("PriceChallenge deployed to:", priceChallenge.address);
  saveFrontendFiles(priceChallenge, "PriceChallenge");

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
