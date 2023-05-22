import "./styles.css";
import ConnectWallet from "./component/ConnectWallet";
import DisconnectWallet from "./component/disconnectWallet";
import Grid from "./component/grid";
import { useMUD } from "./MUDContext";
import { Networks, ETHEREUM_MAINNET } from "./utils/Networks";

import { useState, useEffect } from "react";
import { useConnectWallet, useSetChain } from "@web3-onboard/react";
import { ethers } from "ethers";

export const App = () => {
  const [{ wallet }, connect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();

  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [mudAddress, setMudAddress] = useState<string>("");
  const [hasSigned, setHasSigned] = useState<boolean>(false);

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

    getMudSignerAddress();
  }, []);

  useEffect(() => {
    if (wallet && !signer) {
      const networks = new Networks();
      const currentNetwork = networks.getNetworkData(connectedChain!.id);

      if (currentNetwork !== ETHEREUM_MAINNET) {
        setChain({ chainId: ETHEREUM_MAINNET.chainId });
      }
      localStorage.setItem("selectedWallet", JSON.stringify(wallet?.label));
      const provider = new ethers.providers.Web3Provider(wallet.provider);
      if (provider) {
        setSigner(provider!.getSigner());
      }
    }
  }, [wallet]);

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
      setHasSigned(true);
    } catch (error) {
      alert("The signature is wrong");
    }
  };

  return (
    <div className="container">
      {!wallet && <ConnectWallet />}
      {wallet && !hasSigned && (
        <div className="connectWallet">
          <img
            style={{ padding: "4px" }}
            width={700}
            src={"../src/assets/logoHackhaton.png"}
          />
          <p className="test">Prove that you own the address</p>

          <button
            className="connectButton"
            onClick={async () => await signMessage()}
          >
            Verify Address
          </button>
          <DisconnectWallet />
        </div>
      )}
      {wallet && hasSigned && <Grid />}
    </div>
  );
};
