import { useRows } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import Modal from "../component/modal";
import DisconnectWallet from "../component/disconnectWallet";
import useModal from "../../src/hooks/useModal";
import { trunc } from "../utils/format";
import {
  Network,
  Alchemy,
  GetNftsForOwnerOptions,
  OwnedNft,
  Nft,
} from "alchemy-sdk";
import { useState, useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";
import Countdown, { zeroPad } from "react-countdown";

import { ghoulsAddress, ghoulsSlotOf } from "../utils/ghouls";

export const Grid = () => {
  const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_APY_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const [{ wallet }] = useConnectWallet();

  const alchemy = new Alchemy(settings);
  const [userAddress, setUserAddress] = useState(
    "0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3"
  );

  const [publicGhoulsNFTs, setPublicGhoulsNFTs] = useState<NftWithPosition[]>(
    []
  );

  type NftWithPosition = OwnedNft & {
    landedTimestamp: number;
    imageUrl: string;
  };

  const [userNFTs, setUserNFTs] = useState<Array<NftWithPosition[]>>([]);
  const [board, setBoard] = useState<any>([]);
  const [selectedNft, setSelectedNft] = useState<NftWithPosition | null>(null);
  const [selectedLand, setSelectedLand] = useState<any>([]);

  const {
    systemCalls: { claimLand, claimGhoul },
    network: { storeCache, network },
  } = useMUD();

  const mapLands = useRows(storeCache, { table: "MapLand" });

  const loadPublicGhoulsNFTs = async () => {
    console.log("LOADING public ghouls ");

    const options: GetNftsForOwnerOptions = {
      contractAddresses: ["0xef1a89cbfabe59397ffda11fc5df293e9bc5db90"],
    };

    const nftsForOwner = await alchemy.nft.getNftsForOwner(
      "vincentlg.eth",
      options
    );

    const nftsWithMedia = nftsForOwner.ownedNfts.filter(
      (nftsForOwner) => nftsForOwner.media.length > 0
    );

    const nfts = nftsWithMedia.map((nft) => {
      const nftAddress = ethers.utils.getAddress(nft.contract.address);
      const nftPosition = storeCache.tables.NftPosition.scan({
        key: {
          eq: {
            tokenAddress: nftAddress,
            tokenId: BigInt(nft.tokenId),
          },
        },
      });

      let landedTimestamp = 0;
      const imageUrl = nft.media[0]?.thumbnail ? nft.media[0]!.thumbnail : "";
      if (nftPosition.length > 0) {
        const position = nftPosition[0];
        landedTimestamp = parseInt(position.value.landedDate.toString()) * 1000;
        let playable = new Date().getTime() - landedTimestamp > 60 * 1000;
        console.log(playable);
      }

      return {
        ...nft,
        landedTimestamp: landedTimestamp,
        imageUrl: imageUrl,
      };
    });

    setPublicGhoulsNFTs(nfts);
  };

  const loadPlayerNft = async (playerAddress: string) => {
    console.log("LOADING Player ", playerAddress);

    /*const options: GetNftsForOwnerOptions = {
      contractAddresses: ["0xef1a89cbfabe59397ffda11fc5df293e9bc5db90"],
    };*/

    const nftsForOwner = await alchemy.nft.getNftsForOwner(playerAddress);

    const nftsWithMedia = nftsForOwner.ownedNfts.filter(
      (nftsForOwner) => nftsForOwner.media.length > 0
    );

    const nfts = nftsWithMedia.map((nft) => {
      const nftAddress = ethers.utils.getAddress(nft.contract.address);
      const nftPosition = storeCache.tables.NftPosition.scan({
        key: {
          eq: {
            tokenAddress: nftAddress,
            tokenId: BigInt(nft.tokenId),
          },
        },
      });

      let landedTimestamp = 0;
      const imageUrl = nft.media[0]?.thumbnail ? nft.media[0]!.thumbnail : "";
      if (nftPosition.length > 0) {
        const position = nftPosition[0];
        landedTimestamp = parseInt(position.value.landedDate.toString()) * 1000;
        let playable = new Date().getTime() - landedTimestamp > 60 * 1000;
        console.log(playable);
      }

      return {
        ...nft,
        landedTimestamp: landedTimestamp,
        imageUrl: imageUrl,
      };
    });

    const formattedNfts = [];

    for (let i = 0; i < nfts.length; i += 5) {
      formattedNfts.push(nfts.slice(i, i + 5));
    }

    setUserNFTs(formattedNfts);
  };

  useEffect(() => {
    initData();

    loadPublicGhoulsNFTs();
    if (wallet) {
      setUserAddress(wallet?.accounts[0].address);
      loadPlayerNft("0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3");
    }
  }, [mapLands]);

  const initData = async (): Promise<void> => {
    const boardHeight = 15;
    const boardLength = 20;
    const emptyBoard: any = [];
    for (var i = 0; i < boardHeight; i++) {
      emptyBoard[i] = new Array(boardHeight);
      for (var j = 0; j < boardLength; j++) {
        emptyBoard[i][j] =
          "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";
      }
    }
    mapLands.forEach(function (mapLand) {
      emptyBoard[mapLand.key.x][mapLand.key.y] = mapLand.value.image;
    });

    setBoard(emptyBoard);
  };

  const claim = async (nft: NftWithPosition): Promise<void> => {
    console.log(selectedLand[0]);
    const signature = window.localStorage.getItem("signature");
    const mudSignerAddress = await network.signer.get()?.getAddress();
    console.log(signature, mudSignerAddress, userAddress);

    if (nft!.contract.address.toLowerCase() === ghoulsAddress.toLowerCase()) {
      const slot = ghoulsSlotOf(nft.tokenId);

      const RPC =
        "https://mainnet.infura.io/v3/dc7c60b22021400a97355601e710833d";
      const snapshopBlock =
        "0xab60720eb3fb4bba53e99959153dcdc44cd269b6a48a66d3aa7a6c5b5a906eb0";
      const provider = new ethers.providers.JsonRpcProvider(RPC);

      const proof = await provider.send("eth_getProof", [
        ghoulsAddress,
        [slot],
        snapshopBlock,
      ]);

      console.log("storageHash", proof.storageHash);
      console.log(proof.accountProof);
      console.log(proof.storageProof[0].proof);
      console.log({ signature });

      await claimGhoul(
        selectedLand[0],
        selectedLand[1],
        nft.tokenId,
        nft!.imageUrl,
        signature!,
        proof.storageHash,
        proof.accountProof,
        proof.storageProof[0].proof
      );
    } else {
      await claimLand(
        selectedLand[0],
        selectedLand[1],
        nft!.contract.address,
        nft!.tokenId,
        nft!.imageUrl
      );
    }

    nft.landedTimestamp = new Date().getTime();
  };

  const { isOpen, toggle } = useModal();

  function renderer({ minutes, seconds }: any) {
    return <p>{`${zeroPad(minutes)}m${zeroPad(seconds)}s`}</p>;
  }

  return (
    <>
      <div className="gridContainer">
        <Modal isOpen={isOpen} toggle={toggle}>
          <h2 style={{ fontFamily: "poppins" }}>Select Your Nft</h2>
          {/*   <div style={{ display: "flex" }}>
            {publicGhoulsNFTs.map((nft) => (
              <div>
                <div
                  className="nft"
                  style={{
                    pointerEvents:
                      new Date().getTime() - nft.landedTimestamp <= 60 * 1000
                        ? "auto"
                        : "none",
                  }}
                  onClick={async () => {
                    try {
                      setSelectedNft(nft);
                      await claim(nft);
                      toggle();
                    } catch {
                      alert("You don't own this NFT");
                    }
                  }}
                >
                  <img
                    style={{ padding: "4px" }}
                    width={150}
                    height={150}
                    src={nft.imageUrl}
                  />
                </div>
              </div>
            ))}
          </div> */}
          <div className="nftModal" style={{ overflow: "scroll" }}>
            {userNFTs.map((row: any, i: number) => (
              <div className="row" key={i}>
                {row.map((nft: any) => (
                  <>
                    <div
                      className="nft"
                      style={{ position: "relative" }}
                      onClick={async () => {
                        setSelectedNft(nft);
                        claim(nft);
                        toggle();
                      }}
                    >
                      <img
                        style={{
                          position: "relative",
                          opacity:
                            new Date().getTime() - nft.landedTimestamp <=
                            60 * 1000
                              ? 0.2
                              : 1,
                        }}
                        width={150}
                        src={nft.media[0].thumbnail}
                      />
                      {new Date().getTime() - nft.landedTimestamp <=
                        60 * 1000 && (
                        <div style={{ zIndex: 2, position: "absolute" }}>
                          <Countdown
                            renderer={renderer}
                            date={nft.landedTimestamp + 60 * 1000}
                          />
                        </div>
                      )}
                    </div>
                  </>
                ))}
              </div>
            ))}
          </div>
        </Modal>
        <div className="profileBox">
          <span style={{ fontSize: "12px", color: "lightgray" }}>
            {trunc(userAddress)}
          </span>
          <DisconnectWallet />
        </div>
        <div className="grid">
          {board.map((row: any, i: number) => (
            <div className="row" key={i}>
              {row.map((col: string, j: number) => (
                <div
                  className="tile"
                  onClick={async (event) => {
                    event.preventDefault();
                    setSelectedLand([i, j]);
                    toggle();
                  }}
                >
                  <img width={33} src={col} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <img className="backgroundImage" width={300} src={"../weAbove.png"} />
    </>
  );
};
