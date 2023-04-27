const { Wallet } = require("ethers");
const inquirer = require('inquirer');


exports.runScript = async (filename, params) => {
  const hre = require("hardhat");
  const wallets = require("../../wallets.json");
  const readline = require("node:readline");
  const signers = await hre.ethers.getSigners();
  const { main } = require('./' + filename)
  const childProcess = require('node:child_process');
  const network = hre.network.name;
  const workerProcess = childProcess.execSync(`npx hardhat compile --network ${network}`);
  console.log(workerProcess.toString());
  return new Promise(async (resolve, reject) => {


    for (let i = 0; i < wallets.keys.length; i++) {

      const signer = (signers.length) ? signers[i] : undefined;
      const prtKey = wallets.keys[i];
      const walletAddress = await new Wallet(prtKey).getAddress();
      console.log(`Start running on ${walletAddress}`);
      try {
        await main(params, signer, prtKey)
      } catch (e) {
        console.error(e);


        const answer = await inquirer.prompt({
          name: 'result',
          type: 'list',
          message: `Error on ${walletAddress}. Do you want  repeat or skip on this wallet?`,
          choices: [
            'Skip',
            'Repeat',
          ],
        });
        if (answer['result'] === 'Repeat') {
          i--;
        }

      }

    }

    resolve(true);


  });


}