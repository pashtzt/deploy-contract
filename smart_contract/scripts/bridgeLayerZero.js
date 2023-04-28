const hre = require("hardhat");
const destIds = require("../../zkSyncIds.json");
const inquirer = require("inquirer");


const deploy = async (ctFactory, signer, params) => {
  try {
    const ct = await ctFactory.connect(signer).deploy(...params);
    await ct.deployed();
    return ct;
  } catch (e) {
    console.error(e);

    let walletAddress = await signer.getAddress()
    const answer = await inquirer.prompt({
      name: 'result',
      type: 'list',
      message: `Error on ${walletAddress} when deploy contract. Do you want  repeat deploy  from place were crashed or skip  for this wallet?`,
      choices: [
        'Skip',
        'Repeat',
      ],
    });


    if (answer['result'] === 'Repeat') {
      return await deploy(ctFactory, signer, params)
    } else {
      return false;

    }


  }
}

const bridge = async (bridgeContract, signer, ether) => {
  await new Promise(resolve => setTimeout(resolve, 45000))

  try {
    return await bridgeContract.connect(signer).bridge(10000, { value: hre.ethers.utils.parseEther(ether) });
  } catch (e) {
    console.error(e);

    let walletAddress = await signer.getAddress()
    const answer = await inquirer.prompt({
      name: 'result',
      type: 'list',
      message: `Error on ${walletAddress} when bridge tokens. Do you want  repeat bridge  from place were crashed or skip  for this wallet?`,
      choices: [
        'Skip',
        'Repeat',
      ],
    });


    if (answer['result'] === 'Repeat') {
      return await bridge(bridgeContract, signer, ether)
    } else {
      return false;
    }
  }
}


//bridgeToNetwork, ether
exports.main = async (params, signer) => {
  const bridgeToNetwork = params['bridgenetwork'];
  const ether = params['ether'];
  const network = hre.network.name;

  const destChainId1 = destIds[network]
  const destChainId2 = destIds[bridgeToNetwork]

  hre.changeNetwork(network);
  const LZero1 = await hre.ethers.getContractFactory("LayerZero");
  const deployed1 = await LZero1.connect(signer).deploy(destChainId2.chainId, destChainId1.endpoint);
  await deployed1.deployed();
  console.log("Deploy LZero1 deployed to:", network, deployed1.address);


  //change network
  hre.changeNetwork(bridgeToNetwork);
  const LZero2 = await hre.ethers.getContractFactory("LayerZero");
  const signer2 = await hre.ethers.getSigner(signer.address);
  const deployed2 = await deploy(LZero2, signer2, [destChainId1.chainId, destChainId2.endpoint])


  if (deployed2) {

    console.log("Deploy LZero2 deployed to:", bridgeToNetwork, deployed2.address);


    await deployed1.trustAddress(deployed2.address);

    console.log(`Set trusted ${deployed1.address} - ${deployed2.address}`)

    await deployed2.trustAddress(deployed1.address);
    console.log(`Set trusted ${deployed2.address} - ${deployed1.address}`)

    //bridged
    hre.changeNetwork(network);
    const signer3 = await hre.ethers.getSigner(signer.address);

    const bridgeContract = await hre.ethers.getContractAt('LayerZero', deployed1.address, signer3);

    const hash = await bridge(bridgeContract, signer3, ether);

    if (hash) {
      console.log(`Token successfully  bridget from ${network} ${deployed1.address}  to ${bridgeToNetwork} ${deployed2.address} tx hash: ${hash.hash}`)
    }
  }


}
