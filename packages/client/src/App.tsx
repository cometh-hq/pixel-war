import "./styles.css";
import { useComponentValue, useRows } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import Modal from "./component/modal";
import useModal from "./../src/hooks/useModal";
import { trunc } from "./utils/format";
import { Networks, ETHEREUM_MAINNET } from "./utils/Networks";
import {
  Network,
  Alchemy,
  GetNftsForOwnerOptions,
  OwnedNft,
  Nft,
} from "alchemy-sdk";
import { useState, useEffect } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";
import Countdown, { zeroPad } from "react-countdown";
import type { WalletState } from "@web3-onboard/core";

import { ghoulsAddress, ghoulsSlotOf } from "./utils/ghouls";

export const App = () => {
  const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_APY_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  const {
    components: { LoadingState },
    systemCalls: { claimLand, claimGhoul },
    network: { storeCache, network, singletonEntity },
  } = useMUD();

  const mapLands = useRows(storeCache, { table: "MapLand" });
  const loadingState = useComponentValue(LoadingState, singletonEntity);
  useEffect(() => {
    const previouslyConnectedWallets =
      window.localStorage.getItem("selectedWallet");

    if (
      previouslyConnectedWallets != null &&
      previouslyConnectedWallets !== ""
    ) {
      connect({
        autoSelect: {
          label: JSON.parse(previouslyConnectedWallets),
          disableModals: true,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (wallet) {
      const signature = localStorage.getItem("signature");
      if (!signature) {
        (async () => {
          await new Promise((resolve) => setTimeout(resolve, 2000));
          toggle();
        })();
      }
      setSignature(signature!);
      localStorage.setItem("selectedWallet", JSON.stringify(wallet?.label));
      const networks = new Networks();
      const currentNetwork = networks.getNetworkData(connectedChain!.id);

      if (currentNetwork !== ETHEREUM_MAINNET) {
        setChain({ chainId: ETHEREUM_MAINNET.chainId });
      }
      const provider = new ethers.providers.Web3Provider(wallet.provider);
      if (provider) {
        setSigner(provider!.getSigner());
      }
      getMudSignerAddress();
      setUserAddress(wallet?.accounts[0].address);
      loadPlayerNft("0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3");
    }
  }, [wallet]);

  useEffect(() => {
    initData();
    loadPublicGhoulsNFTs();
  }, [mapLands]);

  let interval: any = undefined;
  const alchemy = new Alchemy(settings);
  const [userAddress, setUserAddress] = useState("");
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const [mudAddress, setMudAddress] = useState<string>("");
  const [publicGhoulsNFTs, setPublicGhoulsNFTs] = useState<NftWithPosition[]>(
    []
  );
  const [modalMenu, setModalMenu] = useState<string>("classic");

  type NftWithPosition = OwnedNft & {
    landedTimestamp: number;
    imageUrl: string;
  };

  const [userNFTs, setUserNFTs] = useState<Array<NftWithPosition[]>>([]);
  const [board, setBoard] = useState<any>([]);
  const [selectedNft, setSelectedNft] = useState<NftWithPosition | undefined>(
    undefined
  );
  const [selectedLand, setSelectedLand] = useState<any>([]);
  const { isOpen, toggle } = useModal();

  const debug = async (): Promise<void> => {
    if (!interval) {
      console.log("############ ");
      interval = setInterval(displayState, 1000);
    }
  };
  const displayState = async (): Promise<void> => {
    console.log("LOAD STATE", loadingState?.msg, loadingState?.state);
  };

  const connectWallet = async (): Promise<void> => {
    toggle();
    let wallet: WalletState[] | null;
    try {
      wallet = await connect();
    } catch (err) {
      console.log(err);
    }

    if (wallet![0])
      localStorage.setItem("selectedWallet", JSON.stringify(wallet![0].label));
  };

  const disconnectWallet = (): void => {
    if (wallet?.label) {
      disconnect(wallet);
    }
    window.localStorage.removeItem("selectedWallet");
    window.localStorage.removeItem("signature");
    setSignature(undefined);
  };

  const getMudSignerAddress = async (): Promise<void> => {
    const mudSignerAddress = await network.signer.get()?.getAddress();
    if (!mudSignerAddress) {
      alert("mud signer address is undefined ");
      return;
    }
    setMudAddress(mudSignerAddress);
  };

  const signMessage = async (): Promise<void> => {
    try {
      const message = ethers.utils.defaultAbiCoder.encode(
        ["address"],
        [mudAddress]
      );
      console.log(
        "MESSAGE",
        ethers.utils.hashMessage(ethers.utils.arrayify(message))
      );

      const signature = await signer!.signMessage(
        ethers.utils.arrayify(message)
      );

      localStorage.setItem("signature", signature);
      setSignature(signature);
      toggle();
    } catch (error) {
      alert("The signature is wrong");
    }
  };

  const loadPublicGhoulsNFTs = async () => {
    console.log("LOADING public ghouls ");

    const options: GetNftsForOwnerOptions = {
      contractAddresses: ["0xef1a89cbfabe59397ffda11fc5df293e9bc5db90"],
    };

    const nftsForOwner = await alchemy.nft.getNftsForOwner(
      "jdetychey.eth",
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

  const initData = async (): Promise<void> => {
    console.log("##### mapLands", mapLands);
    const boardHeight = 20;
    const boardLength = 30;
    const emptyBoard: any = [];
    for (var i = 0; i < boardHeight; i++) {
      emptyBoard[i] = new Array(boardHeight);
      for (var j = 0; j < boardLength; j++) {
        emptyBoard[i][j] = "";
        /* "https://cdn-icons-png.flaticon.com/512/4211/4211763.png";*/
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

  const renderer = ({ minutes, seconds }: any) => {
    return (
      <h3 style={{ fontFamily: "poppins", fontSize: "800" }}>{`${zeroPad(
        minutes
      )}m${zeroPad(seconds)}s`}</h3>
    );
  };

  const isLocked = (timestamp: any) => {
    return new Date().getTime() - timestamp <= 60 * 1000;
  };

  const findSelectedNft = (imageUrl: string) => {
    let selectedNFT: NftWithPosition | undefined = undefined;
    if (imageUrl != "") {
      for (let i = 0; i < userNFTs.length; i++) {
        const filteredNFT = userNFTs[i].find(
          (nft) => nft!.imageUrl == imageUrl
        );

        if (filteredNFT) selectedNFT = filteredNFT;
      }
    }
    setSelectedNft(selectedNFT);
  };

  return (
    <>
      <div className="gridContainer">
        {wallet && signature && (
          <Modal isOpen={isOpen} toggle={toggle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <div className="modalSubMenu">
                <span
                  className="submenu"
                  style={{
                    marginRight: "15px",
                    fontSize: "12px",
                    fontWeight: modalMenu == "classic" ? 700 : 400,
                    textDecoration:
                      modalMenu == "classic" ? "underline" : "none",
                  }}
                  onClick={() => {
                    setModalMenu("classic");
                  }}
                >
                  Play with my NFTs
                </span>
                <span
                  className="submenu"
                  style={{
                    marginRight: "10px",
                    fontSize: "12px",
                    fontWeight: modalMenu == "experimental" ? 700 : 400,
                    textDecoration:
                      modalMenu == "experimental" ? "underline" : "none",
                  }}
                  onClick={() => {
                    setModalMenu("experimental");
                  }}
                >
                  Try with NFTs I don't own
                </span>
              </div>
              <div
                className="cross"
                onClick={() => {
                  toggle();
                }}
              >
                <img width={15} height={15} src={"/close.png"} />
              </div>
            </div>

            <h2 className="modalTitle">Select Your Nft</h2>

            {modalMenu == "classic" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  overflow: "hidden",
                  width: "100%",
                }}
              >
                <div
                  className="nftModal"
                  style={{
                    overflow: "scroll",
                    width: selectedNft ? "80%" : "100%",
                  }}
                >
                  {userNFTs.map((row: any, i: number) => (
                    <div className="row" key={i}>
                      {row.map((nft: any) => (
                        <>
                          <div
                            className="nft"
                            style={{
                              position: "relative",
                              cursor: isLocked(nft.landedTimestamp)
                                ? "not-allowed"
                                : "pointer",
                            }}
                            onClick={async () => {
                              if (!isLocked(nft.landedTimestamp)) {
                                claim(nft);
                                toggle();
                              }
                            }}
                          >
                            <img
                              style={{
                                position: "relative",
                                opacity: isLocked(nft.landedTimestamp)
                                  ? 0.1
                                  : 1,
                              }}
                              width={110}
                              src={nft.media[0].thumbnail}
                            />
                            {isLocked(nft.landedTimestamp) && (
                              <div
                                style={{
                                  position: "absolute",
                                  top: "20%",
                                  left: "20%",
                                }}
                              >
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
                {selectedNft && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      width: "30%",
                      marginLeft: "10px",
                      paddingTop: "10px",
                    }}
                  >
                    <h4>Current NFT on Tile:</h4>
                    <img
                      style={{ marginBottom: "20px" }}
                      width={100}
                      src={selectedNft.media[0].thumbnail}
                    />
                    <a
                      href={`https://opensea.io/assets/ethereum/${selectedNft.contract.address}/${selectedNft.tokenId}`}
                      rel="noopener noreferrer"
                      target="_blank"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "10px",
                        }}
                      >
                        <img
                          src={"opensea.svg"}
                          width={20}
                          style={{
                            filter: "invert() grayscale()",
                            marginRight: "5px",
                          }}
                        />
                        {selectedNft.title}
                      </div>
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div style={{ display: "flex" }}>
                  {publicGhoulsNFTs.map((nft) => (
                    <div
                      className="nft"
                      style={{
                        cursor: isLocked(nft.landedTimestamp)
                          ? "not-allowed"
                          : "pointer",
                      }}
                      onClick={async () => {
                        try {
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
                  ))}
                </div>
                <p
                  style={{
                    display: "flex",
                    maxWidth: "600px",
                    textAlign: "center",
                  }}
                >
                  This tab allows you to test the submission of a storage proof
                  for an NFT that you do not own on Ethereum L1.
                </p>
                <p>
                  The expected behavior is that the transaction fail on chain.
                </p>
                <a href="#" rel="noopener noreferrer" target="_blank">
                  read more
                </a>
              </>
            )}
          </Modal>
        )}
        <div className="grid">
          <div className="headerBox">
            <img width={120} src={"/pfpWeb3Onboard.png"} />
            <div className="profileBox">
              {wallet ? (
                <>
                  {signature ? (
                    <>
                      <span className="address">{trunc(userAddress)}</span>
                      <button
                        className="niceButton"
                        onClick={() => disconnectWallet()}
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="niceButton" onClick={() => toggle()}>
                        Import your NFTS!
                      </button>
                    </>
                  )}
                </>
              ) : (
                <button className="niceButton" onClick={() => toggle()}>
                  Connect your Wallet
                </button>
              )}
            </div>
          </div>
          <div className="board">
            {board.map((row: any, i: number) => (
              <div className="row" key={i}>
                {row.map((col: string, j: number) => (
                  <div
                    className="tile"
                    onClick={async (event) => {
                      event.preventDefault();
                      findSelectedNft(col);
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
      </div>
      {!wallet && !signature && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <div className="connectWallet">
            {!wallet && (
              <>
                <img
                  style={{ padding: "4px" }}
                  width={400}
                  src={"/logoHackhaton.png"}
                />
                <p>
                  Take the L2 space with NFTs you own in L1 <br></br> (no bridge
                  or oracle needed, everything works with storage proof{" "}
                  <a href="#" rel="noopener noreferrer" target="_blank">
                    read more
                  </a>
                  ){" "}
                </p>
                <p>
                  <button
                    className="niceButton"
                    onClick={() => connectWallet()}
                  >
                    {connecting && "connecting"}
                    Connect your Wallet
                  </button>
                </p>
              </>
            )}
          </div>
        </Modal>
      )}
      {wallet && !signature && (
        <Modal isOpen={isOpen} toggle={toggle}>
          <div className="connectWallet">
            <img
              style={{ padding: "4px" }}
              width={400}
              src={"/logoHackhaton.png"}
            />
            <p className="test">
              Prove that you own the address and start competing
            </p>

            <button
              className="niceButton"
              onClick={async () => await signMessage()}
            >
              Import your NFTs !{" "}
            </button>
            <br />
            <button className="niceButton" onClick={() => disconnectWallet()}>
              Log out
            </button>
          </div>
        </Modal>
      )}
    </>
  );
};
