// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { MapLand, MapLandData, NftPosition, NftPositionData } from "../codegen/Tables.sol";

contract ClaimLandSystem is System {
  function claim(uint32 x, uint32 y, address tokenAddress, uint256 tokenId, string memory image ) public {

    NftPositionData memory playedNftPosition = NftPosition.get(tokenAddress, tokenId);
    if (playedNftPosition.landedDate != 0) {
      MapLand.set(playedNftPosition.x, playedNftPosition.y, MapLandData({tokenAddress: address(0) , tokenId: 0, image:"" }));
    }


    MapLandData memory mapLand = MapLand.get(x, y);
    MapLand.set(x, y, MapLandData({tokenAddress: tokenAddress, tokenId: tokenId, image:image }));
    NftPosition.set(tokenAddress, tokenId,  NftPositionData({x: x, y:y, landedDate: block.timestamp}));

    if (mapLand.tokenId != 0) {
      NftPositionData memory clearPositionData = NftPositionData({x: 0, y:0, landedDate: 0});
      NftPosition.set(mapLand.tokenAddress, mapLand.tokenId, clearPositionData) ;
    }
  }
}
