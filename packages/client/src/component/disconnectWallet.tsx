import { useConnectWallet } from "@web3-onboard/react";

const DisconnectWallet = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();

  const disconnectWallet = (): void => {
    if (wallet?.label) {
      disconnect(wallet);
    }
    window.localStorage.removeItem("selectedWallet");
  };

  return (
    <div className="connectWallet">
      <button className="disconnectButton" onClick={() => disconnectWallet()}>
        Disconnect
      </button>
    </div>
  );
};

export default DisconnectWallet;
