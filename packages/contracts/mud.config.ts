import { mudConfig } from "@latticexyz/world/register";
import "@latticexyz/world/snapsync";

export default mudConfig({
  snapSync: true,
  tables: {
    MapLand: {
      keySchema: {
        x: "uint32",
        y: "uint32",
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
