import { useRows } from "@latticexyz/react";
import { Type as RecsType } from "@latticexyz/recs";
import { useMUD } from "./MUDContext";
import "./styles.css";
import Modal from "./component/modal";
import useModal from "../src/hooks/useModal";

import {
  Network,
  Alchemy,
  GetNftsForOwnerOptions,
  OwnedNft,
  Nft,
} from "alchemy-sdk";
import { useState, useEffect } from "react";
import { ethers } from "ethers";

export const App = () => {
  const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_APY_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  const [userAddress, setUserAddress] = useState(
    "0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3"
  );

  type NftWithPosition = OwnedNft & {
    landedTimestamp: number;
  };

  const [userNFTs, setUserNFTs] = useState<NftWithPosition[]>([]);
  const [board, setBoard] = useState<any>([]);
  const [selectedNft, setSelectedNft] = useState<NftWithPosition | null>(null);
  const [selectedLand, setSelectedLand] = useState<any>([]);

  const {
    systemCalls: { claimLand },
    network: { storeCache },
  } = useMUD();

  const mapLands = useRows(storeCache, { table: "MapLand" });

  const loadPlayerNft = async (playerAddress: string) => {
    console.log("LOADING Player ", playerAddress);
    const options: GetNftsForOwnerOptions = {
      contractAddresses: ["0xef1a89cbfabe59397ffda11fc5df293e9bc5db90"],
    };
    const nftsForOwner = await alchemy.nft.getNftsForOwner(
      playerAddress,
      options
    );

    const nfts = nftsForOwner.ownedNfts.map((nft) => {
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
      if (nftPosition.length > 0) {
        const position = nftPosition[0];
        landedTimestamp = parseInt(position.value.landedDate.toString()) * 1000;
        let playable = new Date().getTime() - landedTimestamp > 60 * 1000;
        console.log(playable);
      }

      return {
        ...nft,
        landedTimestamp: landedTimestamp,
      };
    });

    console.log(nfts);
    setUserNFTs(nfts);
  };

  useEffect(() => {
    initData();
  }, [mapLands]);

  const initData = async (): Promise<void> => {
    const boardSize = 10;
    const emptyBoard: any = [];
    for (var i = 0; i < boardSize; i++) {
      emptyBoard[i] = new Array(boardSize);
      for (var j = 0; j < boardSize; j++) {
        emptyBoard[i][j] =
          "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";
      }
    }
    mapLands.forEach(function (mapLand) {
      emptyBoard[mapLand.key.x][mapLand.key.y] = mapLand.value.image;
    });

    setBoard(emptyBoard);
  };

  const claim = async (nft: NftWithPosition) => {
    console.log(selectedLand[0]);
    await claimLand(
      selectedLand[0],
      selectedLand[1],
      nft!.contract.address,
      nft!.tokenId,
      nft!.media[0]?.thumbnail
    );
    nft.landedTimestamp = new Date().getTime();
  };

  const { isOpen, toggle } = useModal();

  return (
    <>
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <h2>Select Your Nft</h2>

          {userNFTs.map((nft) => (
            <div>
              <button
                type="button"
                disabled={
                  new Date().getTime() - nft.landedTimestamp <= 60 * 1000
                }
                onClick={async () => {
                  setSelectedNft(nft);
                  claim(nft);
                  toggle();
                }}
              >
                <span>
                  <img
                    style={{ padding: "4px" }}
                    width={33}
                    src={nft.media[0].thumbnail}
                  />
                </span>
              </button>
            </div>
          ))}
        </Modal>
        Play As{" "}
        <input
          name="playAsInput"
          value={userAddress}
          onChange={(evt) => setUserAddress(evt.target.value)}
        />
        <button
          type="button"
          onClick={async (event) => {
            event.preventDefault();
            loadPlayerNft(userAddress);
          }}
        >
          Play
        </button>
        <br />
        <br />
        <br />
        {board.map((row: any, i: number) => (
          <div key={i}>
            {row.map((col: string, j: number) => (
              <button
                type="button"
                onClick={async (event) => {
                  event.preventDefault();
                  setSelectedLand([i, j]);
                  toggle();
                }}
              >
                {i} {j}
                <span>
                  <img style={{ padding: "4px" }} width={33} src={col} />
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <br />
    </>
  );
};
