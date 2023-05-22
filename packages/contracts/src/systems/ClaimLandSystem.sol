// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { MapLand, MapLandData, NftPosition, NftPositionData } from "../codegen/Tables.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";


contract ClaimLandSystem is System {
  using ECDSA for bytes32;
  using ECDSA for bytes;

  error Debug(bytes32 message);
  
  function claim(uint32 x, uint32 y, address tokenAddress, uint256 tokenId, string memory image, bytes memory signature, address account) public {

    bytes32 message = abi.encode(_msgSender()).toEthSignedMessageHash();


    require(message.recover(signature) == account, "invalid signature");

    NftPositionData memory playedNftPosition = NftPosition.get(tokenAddress, tokenId);

    uint256 timeDiff = block.timestamp - playedNftPosition.landedDate;
    require(timeDiff >= 60, "Nft claimed less than one minute ago");


    MapLandData memory mapLand = MapLand.get(x, y);
    MapLand.set(x, y, MapLandData({tokenAddress: tokenAddress, tokenId: tokenId, image:image }));
    NftPosition.set(tokenAddress, tokenId,  NftPositionData({x: x, y:y, landedDate: block.timestamp}));

    if (mapLand.tokenId != 0) {
      NftPositionData memory clearPositionData = NftPositionData({x: 0, y:0, landedDate: 0});
      NftPosition.set(mapLand.tokenAddress, mapLand.tokenId, clearPositionData) ;
    }
  }
}
