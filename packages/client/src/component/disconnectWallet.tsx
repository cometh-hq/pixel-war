import { useConnectWallet } from "@web3-onboard/react";
import { useNavigate } from "react-router-dom";

const DisconnectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const navigate = useNavigate();

  const disconnectWallet = (): void => {
    if (wallet?.label) {
      disconnect(wallet);
    }
    window.localStorage.removeItem("selectedWallet");
    window.localStorage.removeItem("signature");
    navigate("/");
  };

  return (
    <button className="disconnectButton" onClick={() => disconnectWallet()}>
      Log out
    </button>
  );
};

export default DisconnectWallet;
