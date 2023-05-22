// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

/* Autogenerated file. Do not edit manually. */

interface IClaimLandSystem {
  error Debug(bytes32 message);

  function claim(uint32 x, uint32 y, address tokenAddress, uint256 tokenId, string memory image) external;
}
