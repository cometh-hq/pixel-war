import { useConnectWallet } from "@web3-onboard/react";
import DisconnectWallet from "./disconnectWallet";
import { ethers } from "ethers";
import { useMUD } from "../MUDContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SignMessage = () => {
  const [{ wallet }] = useConnectWallet();
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [mudAddress, setMudAddress] = useState<string>("");
  const navigate = useNavigate();

  const {
    network: { network },
  } = useMUD();

  useEffect(() => {
    if (wallet && !signer) {
      getMudSignerAddress();
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
    const message = ethers.utils.hashMessage(mudAddress);

    try {
      const signature = await signer!.signMessage(message);
      localStorage.setItem("signature", signature);
      navigate("/grid");
    } catch (error) {
      alert("The signature is wrong");
    }
  };

  return (
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
  );
};

export default SignMessage;
