import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    MapLand: {
      keySchema: {
        value: "bytes32",
      },
      schema: {
        tokenAddress: "address",
        tokenId: "uint256",
        image: "string",
      },
    },
    NftPosition: {
      keySchema: {
        tokenAddress: "address",
        tokenId: "uint256",
      },
      schema: {
        x: "uint32",
        y: "uint32",
        landedDate: "uint256",
      },
    },
  },
});
