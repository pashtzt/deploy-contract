// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeployToken is ERC20 {

	constructor() ERC20("True Sight Governance Token", "TSGT") {
		_mint(msg.sender, 1000000 * 10 ** decimals());
	}

}