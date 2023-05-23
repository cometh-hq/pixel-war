# Pixel War Contracts

## Overview

Each NFT verified by storage proofs is represented as a System in MUD. This way, the game can be extended by adding new Systems to the World.
`ClaimBasedGhoulsSystem` knows at which slot the ownership of a given tokenId can be verified and uses a storage proof to verify said ownership.

## Libs

### MPT.sol

MPT is a library that implements verification of Ethereum's MPT proofs. Given a root, a key and a proof, it verifies that the proof correctly describes the path to the value pointed by the key and is included in the trie.
`verifyAccount` verifies the state trie of Ethereum
`verifyStorageSlot` verifies a storage trie of an Ethereum contract

### StorageVerifier

StorageVerifier is an utility that wraps state and storage verification
