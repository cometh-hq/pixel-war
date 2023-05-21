import "./styles.css";
import ConnectWallet from "./component/ConnectWallet";
import DisconnectWallet from "./component/disconnectWallet";
import Grid from "./component/grid";
import { SiweMessage } from "siwe";
import { useMUD } from "./MUDContext";

import { useState, useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

export const App = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [mudAddress, setMudAddress] = useState<string | undefined>("");
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
      localStorage.setItem("selectedWallet", JSON.stringify(wallet?.label));
      const provider = new ethers.providers.Web3Provider(wallet.provider);
      if (provider) {
        setSigner(provider!.getSigner());
      }
    }
  }, [wallet]);

  const getMudSignerAddress = async (): Promise<void> => {
    const mudSignerAddress = await network.signer.get()?.getAddress();
    setMudAddress(mudSignerAddress);
  };

  const createMessage = (nonce: string): SiweMessage => {
    if (!window || !wallet) {
      throw new Error("No window nor wallet");
    }

    const domain = window.location.host;
    const uri = window.location.origin;

    const message = new SiweMessage({
      domain,
      uri,
      statement: `Sign in with Ethereum to PFP War as ${mudAddress}`,
      address: ethers.utils.getAddress(wallet?.accounts[0].address),
      version: "1",
      chainId: 1,
      nonce,
    });

    return message;
  };

  const signMessage = async (): Promise<void> => {
    const nonce = `${crypto.randomUUID().replace(/-/g, "")}`;
    const message = createMessage(nonce);
    const messageToSign = message.prepareMessage();
    const signature = await signer!.signMessage(messageToSign);

    try {
      await message.verify({
        signature,
        nonce: nonce,
      });
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
