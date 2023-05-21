import { useComponentValue, useRows, useRow } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import "./styles.css";
import Modal from "./component/modal";
import useModal from "../src/hooks/useModal";

import {
  Network,
  Alchemy,
  GetNftsForOwnerOptions,
  OwnedNft,
} from "alchemy-sdk";
import { useState } from "react";

export const App = () => {
  const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_APY_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);
  const [userAddress, setUserAddress] = useState(
    "0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3"
  );

  const [userNFTs, setUserNFTs] = useState([] as OwnedNft[]);

  const [board, setBoard] = useState([] as any);

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
    console.log(nftsForOwner.ownedNfts);
    setUserNFTs(nftsForOwner.ownedNfts);
  };

  const boardSize = 10;
  const emptyBoard: any = [];
  for (var i = 0; i < boardSize; i++) {
    emptyBoard[i] = new Array(boardSize);
    for (var j = 0; j < boardSize; j++) {
      emptyBoard[i][j] =
        "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";
    }
  }

  const initData = async (): Promise<any> => {
    const mapLands = await useRows(storeCache, { table: "MapLand" });
    mapLands.forEach(function (mapLand) {
      emptyBoard[mapLand.key.x][mapLand.key.y] =
        "https://gateway.ipfs.io/ipfs/bafybeihlond74ij2vbzyuagma2uxtv2b7e4nmty6ujxbapqopsarzy3yo4/" +
        mapLand.value.tokenId.toString() +
        ".png";
    });
    // Binding bug for now
    //setBoard(emptyBoard);
  };

  initData();

  const { isOpen, toggle } = useModal();

  return (
    <>
      <div>
        <button onClick={toggle}>Open Modal </button>
        <Modal isOpen={isOpen} toggle={toggle}>
          <button
            type="button"
            onClick={async (event) => {
              event.preventDefault();
              loadPlayerNft(userAddress);
            }}
          >
            Load my NFTs
          </button>
          {userNFTs.map((nft) => (
            <img src={nft.media[0].thumbnail} />
          ))}
        </Modal>
        {board.map((row, i) => (
          <div key={i}>
            {row.map((col: any, j: any) => (
              <button
                type="button"
                onClick={async (event) => {
                  event.preventDefault();
                  await claimLand(
                    i,
                    j,
                    "0xef1a89cbfabe59397ffda11fc5df293e9bc5db90",
                    "1049"
                  );
                  console.log(
                    "claim land %%%%",
                    i,
                    j,
                    "0xef1a89cbfabe59397ffda11fc5df293e9bc5db90",
                    1049
                  );
                }}
              >
                claim land {i} {j}
                <span>
                  <img style={{ padding: "4px" }} width={33} src={col} />
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
      <br />
      Play As{" "}
      <input
        name="playAsInput"
        value={userAddress}
        onChange={(evt) => setUserAddress(evt.target.value)}
      />
      <br />
      <>
        {mapLands.map((mapLand) => (
          <p>
            {mapLand.key.x} {mapLand.key.y} -
            {mapLand.value.tokenAddress.toString()} -
            {mapLand.value.tokenId.toString()} -
          </p>
        ))}
      </>
      <br />
      <br />
      <>
        {board.map((row) => (
          <p>{row}</p>
        ))}
      </>
    </>
  );
};
