import { useConnectWallet } from "@web3-onboard/react";
import type { WalletState } from "@web3-onboard/core";

const ConnectWallet = () => {
  const [{ wallet, connecting }, connect] = useConnectWallet();

  const connectWallet = async (): Promise<void> => {
    let wallet: WalletState[] | null;
    try {
      wallet = await connect();
    } catch (err) {
      console.log(err);
    }

    if (wallet![0])
      localStorage.setItem("selectedWallet", JSON.stringify(wallet![0].label));
  };

  return (
    <div className="connectWallet">
      <img
        style={{ padding: "4px" }}
        width={700}
        src={"../src/assets/logoHackhaton.png"}
      />
      <p className="test">
        Take the L2 space with NFTs you own in L1 (no bridge needed, everything
        works with storage proof)
      </p>
      <a href="#" rel="noopener noreferrer" target="_blank">
        more infos
      </a>

      <button className="connectButton" onClick={() => connectWallet()}>
        {connecting && "connecting"}
        Connect your Wallet
      </button>

      <p>You will be able to use your Ethereum L1 NFTs !</p>
    </div>
  );
};

export default ConnectWallet;
