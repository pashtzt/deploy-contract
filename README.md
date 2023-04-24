# BetMe

BetMe is a decentralised, peer-to-peer prediction market, built via Account Abstraction technologies for improve UI experience.

### How it's works

![grid](https://challenge-darcksday.vercel.app/tech.d18822a9.png)

For build AA and gasless transaction we use combination of Gelato 1Balance && Relay, Web3Auth and Safe Contract Address. To display current
prices on
the UI, we using the RedStone API. On the contract side, we implemented the RedStone Price Feed to obtain current prices and close bets. The
Gelato Web3 functions are responsible for generating and updating the redstonePayload (byte code required for the getPrice function) and
controlled the expiration of bets for distribute funds.

### Ethereum Smart Contracts

Three smart contracts were written in Solidity for BetMe:

- `CustomChallenge.sol` - This contract responsible for Custom bets. Deployed on Mumbai Testnet `0xDb0C8933A0EEe4a07d8A524f27E9041fA58C0AFc`
- `PriceChallenge.sol` - This contract responsible for Price bets. Extend RedStonePrice contract. Deployed on Mumbai
  Testnet `0xbB2c5955eFf974Dd4F870f4902183732318C9415`

### Quick Links for Code

Here are some quick links to code in this repo, including some examples of where hackathon sponsor tech was used:

- [Contracts](smart_contract/)
- [Frontend](src/)
- [Gelato Gasless Wallet](src/context/Web3Context.js#L52)
- [Web3Auth](src/context/Web3Context.js#L70)
- [Gelato Gasless Transaction](src/context/GelatoTxContext.js)

### Gelato Web3Functions Repository

[Link](https://github.com/darcksday/betme-gelato-functions)

## Next Steps

- Run on mainnet and add ability deposits via credit card
- Launching pool bets, with dynamic coefficient and unlimited participants
- Dynamic automated events (sources of information for Oracle setup manually)
- Add ability to bet for more assets,real-world events,sport, politics etc.

---

## Installation

These instructions will get you a copy of the project up and running on your Mumbai testnet for development and testing purposes.

### Prerequisites

```
nodeJS >= 16.0
npm
```

Install dependencies and create environment file:

```
npm install
cp .env-example .env
```

Fill environment variables.

### Deploy & run

```
npx hardhat run smart_contract/scripts/deploy.js --network mumbai
npm run start
```

### Build for Production

```
npm run build
```

### Create Gelato Relay Apps

1. Go to https://relay.gelato.network/apps
2. Deposits some tokens to 1Balance
3. Create App and copy Api Key
4. Fill GELATO_API_KEY on .env

### Create Gelato Web3Function task

1. `git clone https://github.com/darcksday/betme-gelato-functions`
2. `npm install`
3. `cp .env-example .env`
4. Fill environment variables.
5. `npx w3f deploy src/web3-functions/my-web3-function/index.ts`
6. Copy CID
7. Go to https://app.gelato.network/
8. Create task with you contract and CID

---



## Tech Stack

- React
- Tailwind
- Hardhat
- Gelato Gasless Wallet
- Safe Wallet
- Web3Auth


## Links

- Try it now: https://challenge-seven-psi.vercel.app/  (on Mumbai testnet)
- Demo Video: https://youtu.be/u4QmkGzS8wQ

## Contact

- Twitter: @MacksPopov
- Discord: Macks darcksday#0596
- Github: @darcksday

![grid](https://challenge-seven-psi.vercel.app/logo2.dbbde0f4.png)