// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import { System } from "@latticexyz/world/src/System.sol";
import { MapLand, MapLandData, NftPosition, NftPositionData } from "../codegen/Tables.sol";
import { MPT } from "../libs/MPT.sol";
import { StorageVerifier } from "../libs/StorageVerifier.sol";
import { ECDSA } from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ClaimBasedGhoulsSystem is System, StorageVerifier {
  using ECDSA for bytes32;
  using ECDSA for bytes;

  function _setPosition(uint32 x, uint32 y, address tokenAddress, uint256 tokenId, string memory image) private {
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

  function claimGhoul(
    uint32 x, uint32 y,
    uint256 tokenId,
    string memory image,
    bytes memory signature,
    bytes32 storageRoot,
    bytes[] memory stateProof,
    bytes[] memory storageProof
  ) public {
    bytes32 message = abi.encode(_msgSender()).toEthSignedMessageHash();
    address owner = message.recover(signature);

    bytes32 root = 0x46ef9d82ce11c07fd77ff6db917ebb25f17f0b6819a7d702d9079ceb2f9ef8ea;
    address tokenAddress = 0xeF1a89cbfAbE59397FfdA11Fc5DF293E9bC5Db90;

    MPT.Account memory basedGhouls = MPT.Account({
      accountAddress: tokenAddress,
      balance: 0,
      nonce: 1,
      storageRoot: storageRoot,
      codeHash: 0xfc1ea81db44e2de921b958dc92da921a18968ff3f3465bd475fb86dd1af03986
    });

    MPT.StorageSlot memory slot = MPT.StorageSlot({
      position: uint256(keccak256(abi.encode(tokenId, 103))),
      value: uint256(uint160(owner))
    });

    _verifyStorage(root, basedGhouls, slot, stateProof, storageProof);
    _setPosition(x, y, tokenAddress, tokenId, image);
  }
}
