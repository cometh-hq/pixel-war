import { awaitStreamValue } from "@latticexyz/utils";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export function createSystemCalls({
  worldSend,
  txReduced$,
}: SetupNetworkResult) {
  const claimGhoul = async (
    x: number,
    y: number,
    tokenId: string,
    image: string,
    signature: string,
    storageRoot: string,
    stateProof: string[],
    storageProof: string[]
  ) => {
    const tx = await worldSend("claimGhoul", [
      x,
      y,
      tokenId,
      image,
      signature,
      storageRoot,
      stateProof,
      storageProof,
    ]);

    const receipt = await tx.wait();

    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  const claimLand = async (
    x: number,
    y: number,
    tokenAddress: string,
    tokenId: string,
    image: string
  ) => {
    const tx = await worldSend("claim", [x, y, tokenAddress, tokenId, image]);
    await awaitStreamValue(txReduced$, (txHash) => txHash === tx.hash);
  };

  return {
    claimLand,
    claimGhoul,
  };
}
