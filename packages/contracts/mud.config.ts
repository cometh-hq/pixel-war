import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      schema: "uint32",
    },
    MapLand: {
      keySchema: {
        x: "uint32",
        y: "uint32",
      },
      schema: {
        tokenAddress: "address",
        tokenId: "uint256",
      },
    },
  },
});
