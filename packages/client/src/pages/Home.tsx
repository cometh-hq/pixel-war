import "../styles.css";
import ConnectWallet from "../component/ConnectWallet";
import DisconnectWallet from "../component/disconnectWallet";
import SignMessage from "../component/signMessage";

import { useMUD } from "../MUDContext";
import { Networks, ETHEREUM_MAINNET } from "../utils/Networks";
import { useState, useEffect } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";

export const Home = () => {
  const [{ wallet }, connect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  const {
    network: { network },
  } = useMUD();

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
    if (wallet && !signer) {
      const networks = new Networks();
      const currentNetwork = networks.getNetworkData(connectedChain!.id);

      if (currentNetwork !== ETHEREUM_MAINNET) {
        setChain({ chainId: ETHEREUM_MAINNET.chainId });
      }
    }
  }, [wallet]);

  return (
    <div className="container">
      {!wallet && <ConnectWallet />}
      {wallet && <SignMessage />}
    </div>
  );
};
