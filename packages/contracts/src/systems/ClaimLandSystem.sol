// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { MapLand, MapLandData } from "../codegen/Tables.sol";

contract ClaimLandSystem is System {
  function claim(uint32 x, uint32 y, address tokenAddress, uint256 tokenId ) public {
   MapLand.set(x, y, MapLandData({tokenAddress: tokenAddress, tokenId: tokenId }));
  }
}
