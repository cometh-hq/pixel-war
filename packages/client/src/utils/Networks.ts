export interface Network {
  network: "bsc" | "polygon" | "fantom" | "ethereum";
  chainId: string;
  chainIdNumber: number;
  chainName: string;
  chainUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  minimumNeededForWrap: number;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  iconUrls?: string[]; // Currently ignored.
}

const POLYGON_MAINNET: Network = {
  network: "polygon",
  chainId: "0x89",
  chainIdNumber: 137,
  chainName: "Polygon",
  chainUrl: "https://polygon.technology",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  minimumNeededForWrap: 0.02,
  rpcUrls: ["https://polygon-rpc.com"],
  blockExplorerUrls: ["https://polygonscan.com"],
};

const ETHEREUM_MAINNET: Network = {
  network: "ethereum",
  chainId: "0x1",
  chainIdNumber: 1,
  chainName: "Ethereum",
  chainUrl: "https://polygon.technology",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  minimumNeededForWrap: 0.002,
  rpcUrls: ["https://rpc.ankr.com/eth"],
  blockExplorerUrls: ["https://etherscan.io"],
};

class Networks {
  private networks: Map<string, Network>;
  private testnet: Network | undefined;

  constructor() {
    this.networks = new Map();
    this.networks.set(POLYGON_MAINNET.chainId, POLYGON_MAINNET);
    this.networks.set(ETHEREUM_MAINNET.chainId, ETHEREUM_MAINNET);
  }

  public getNetworkData(chainId: string): Network | undefined {
    return this.networks.get(chainId.toLowerCase());
  }

  public getNetworkDataByChainIdNumber(
    chainIdNumber: number
  ): Network | undefined {
    let result: Network | undefined;

    this.networks.forEach((el) => {
      if (el.chainIdNumber === chainIdNumber) {
        result = el;
      }
    });
    return result;
  }
}

export { Networks, POLYGON_MAINNET, ETHEREUM_MAINNET };
