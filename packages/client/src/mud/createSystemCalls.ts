import { getComponentValue } from "@latticexyz/recs";
import { awaitStreamValue } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls(
  { worldSend, txReduced$, singletonEntity }: SetupNetworkResult,
  { Counter }: ClientComponents
) {
  const increment = async () => {
    const tx = await worldSend("increment", []);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
    return getComponentValue(Counter, singletonEntity);
  };

  const claimGhoul = async (
    x: number,
    y: number,
    tokenId: string,
    image: string,
    signature: string,
    storageRoot: string,
    stateProof: string[],
    storageProof: string[],
  ) => {
    const tx = await worldSend("claimGhoul", [
      x,
      y,
      tokenId,
      image,
      signature,
      storageRoot,
      stateProof,
      storageProof
    ]);

    const receipt = await tx.wait();

    console.log(receipt);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimLand = async (
    x: number,
    y: number,
    tokenAddress: string,
    tokenId: string,
    image: string,
    signature: string,
    account: string
  ) => {
    const tx = await worldSend("claim", [
      x,
      y,
      tokenAddress,
      tokenId,
      image,
      signature,
      account,
    ]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    increment,
    claimLand,
    claimGhoul,
  };
}
