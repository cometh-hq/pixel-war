import { useRows } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import {
  Network,
  Alchemy,
  GetNftsForOwnerOptions,
  OwnedNft,
} from "alchemy-sdk";
import { useState } from "react";

export const App = () => {
  const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_APY_KEY, // Replace with your Alchemy API Key.
    network: Network.ETH_MAINNET, // Replace with your network.
  };

  const alchemy = new Alchemy(settings);

  const [userAddress, setUserAddress] = useState(
    "0x4D33B9C8A02EC9a892C98aA9561A3e743dF1FEA3"
  );
  const [userNFTs, setUserNFTs] = useState([] as OwnedNft[]);

  const {
    systemCalls: { claimLand },
    network: { storeCache },
  } = useMUD();

  const mapLands = useRows(storeCache, { table: "MapLand" });

  const loadPlayerNft = async (playerAddress: string) => {
    console.log("LOADING Player ", playerAddress);
    const options: GetNftsForOwnerOptions = {
      contractAddresses: ["0xef1a89cbfabe59397ffda11fc5df293e9bc5db90"],
    };
    const nftsForOwner = await alchemy.nft.getNftsForOwner(
      playerAddress,
      options
    );
    console.log(nftsForOwner.ownedNfts);
    setUserNFTs(nftsForOwner.ownedNfts);
  };

  const board = [
    [
      "https://i.seadn.io/gae/d-4SFBsv8GuWksh-AVEln50f-1mFWxbsNYxQJ6GUSG7E7Cb4iyKiHtVSGI54cxy1ZfbfFkBB8WoARPhJKbgdtDd7JfYQTT_vG2Ylkg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/Q1b5sc8ZMYJ_9XDnVS6U17q69RRXzJyaVMhr1W-jZ1v6g0lYo7lFkZ_CDum6KplN4MlZlzxDYDZ3oTcTipXu2gv9Nhf7UPpVXLZ0akE?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/d-4SFBsv8GuWksh-AVEln50f-1mFWxbsNYxQJ6GUSG7E7Cb4iyKiHtVSGI54cxy1ZfbfFkBB8WoARPhJKbgdtDd7JfYQTT_vG2Ylkg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/Q1b5sc8ZMYJ_9XDnVS6U17q69RRXzJyaVMhr1W-jZ1v6g0lYo7lFkZ_CDum6KplN4MlZlzxDYDZ3oTcTipXu2gv9Nhf7UPpVXLZ0akE?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
    ],
    [
      "https://i.seadn.io/gae/d-4SFBsv8GuWksh-AVEln50f-1mFWxbsNYxQJ6GUSG7E7Cb4iyKiHtVSGI54cxy1ZfbfFkBB8WoARPhJKbgdtDd7JfYQTT_vG2Ylkg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/Q1b5sc8ZMYJ_9XDnVS6U17q69RRXzJyaVMhr1W-jZ1v6g0lYo7lFkZ_CDum6KplN4MlZlzxDYDZ3oTcTipXu2gv9Nhf7UPpVXLZ0akE?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
    ],
    [
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
    ],
    [
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
    ],
    [
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://cdn-icons-png.flaticon.com/512/4211/4211763.png",
      "https://i.seadn.io/gae/o1kjRP-MajEW62NhSh0wSLO_ghONB9Ek5zbTOX2bLIJuGmL_LqksYP2gOTkqMgDhjQXT6-g17kkVqUcXk3r_RxVtP4Qvgm-no8M7Lg?auto=format&dpr=1&w=750",
      "https://i.seadn.io/gae/to2PmUZ_9YhGO_4c_Q5Rn7v6Gdivt4uDbYZRAcJR6OsZaz_Lh4DeXzkM29_LPC8d3W1l0mHxb9m8xMtzGwPp9WOVagYfHiBFWtw5PA?auto=format&dpr=1&w=750",
    ],
  ];

  return (
    <>
      <div>
        {board.map((row, i) => (
          <div key={i}>
            {row.map((col, j) => (
              <span key={j}>
                <img style={{ padding: "4px" }} width={33} src={col} />
              </span>
            ))}
          </div>
        ))}
      </div>
      <br />
      Play As{" "}
      <input
        name="playAsInput"
        value={userAddress}
        onChange={(evt) => setUserAddress(evt.target.value)}
      />
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          loadPlayerNft(userAddress);
        }}
      >
        Play
      </button>
      <br />
      {userNFTs.map((nft) => (
        <img src={nft.media[0].thumbnail} />
      ))}
      <br />
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          await claimLand(
            1,
            4,
            "0xef1a89cbfabe59397ffda11fc5df293e9bc5db90",
            "6428"
          );
          console.log("claim land 1 2 6427");
        }}
      >
        claim land 1 3 6428
      </button>
      <br />
      <>
        {mapLands.map((mapLand) => (
          <p>
            {mapLand.key.x} {mapLand.key.y} -
            {mapLand.value.tokenAddress.toString()} -
            {mapLand.value.tokenId.toString()} -
          </p>
        ))}
      </>
    </>
  );
};
