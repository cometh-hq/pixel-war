# PFP Pixel War

PFP Pixel War is a collaborative game where the players use NFTs they own on L1 Ethereum mainnet to use them in L2 (Optimism Rollup) via Storage proofs and MUD.
It's inspired from r/place by Reddit a 3.5-day experiment with 160 million pixel changes operated by over 10.5 million users,  at an average pace of about 2 million pixels placed per hour.

## This project was build for ETHGLobal Autonomous wordl Hackathon

[ETHGLobal Autonomous wordl Hackathon Event](https://ethglobal.com/events/autonomous)

**Our interpretation of an Autonomous World**
  * Trustless
  * Collaborative and user generated
  * Real time
  * Our idea is easy to understand (simple showcase)
  * Builds on existing assets (NFTs)
  * Uses the network effect (target Web3 community who likes to flex their PFP)

**Technical motivations**
  * Challenge to prove the ownership of an L1 NFT on L2
  * Challenge to make this verifier a precompile in op-geth
  * Discovery and Stress test the MUD framework


## Storage Proof
**Objective**
Prove on a Layer 2 that Bob owns a NFT on Layer 1.

You can have a look to the [Pixel Wars Contracts README](https://github.com/cometh-game/pixel-war/blob/master/packages/contracts/README.md)

We wrote a detailed technical [article](https://medium.com/@vincentlg/pfp-war-project-use-the-l1-state-on-optimism-l2-with-storage-proof-fc0124db7caf) on how we did this.

## About the hackathon

**About Optimism and Storage proof**
The implementation of the Ethereum Merkle Patricia Trie was an interesting tech challenge. 
We deepened our understanding of EVM, precompiles and  how the state is stored.

**About MUD Framework**
Really simplifies the work on the front-end
Some issues with the public testnet indexer
Great support from the MUD team
Ultra-simplified smart-contract dev and management
Binding between UI and contract state is realy cool

**About EthGlobal**
Top organization and Guidance / Top resources

**About life**
Keep learning, Keep building :D

## Run the project

`pnpm install`

`pnpm dev`













