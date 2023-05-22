import injectedModule from "@web3-onboard/injected-wallets";
import walletConnectModule from "@web3-onboard/walletconnect";
import coinbaseModule from "@web3-onboard/coinbase";

import { init } from "@web3-onboard/react";

const injected = injectedModule();
const coinbaseWallet = coinbaseModule();

const walletConnect = walletConnectModule({
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "gnosis",
      "imtoken",
      "pillar",
      "rabby",
    ],
  },
  connectFirstChainId: true,
});

const mainnetChains = [
  {
    id: "0x1",
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: `https://eth-mainnet.g.alchemy.com/v2/${
      import.meta.env.VITE_ALCHEMY_APY_KEY
    }`,
  },
];

export default init({
  wallets: [injected, coinbaseWallet, walletConnect],
  chains: mainnetChains,
  appMetadata: {
    name: "PFP wars",
    icon: "/pfpWeb3Onboard.png",
    logo: "/pfpWeb3Onboard.png",
    description: "PFP war",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
});
