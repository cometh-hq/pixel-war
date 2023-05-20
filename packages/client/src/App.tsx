import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";

export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment },
    network: { singletonEntity },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);

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
        Counter: <span>{counter?.value ?? "??"}</span>
      </div>
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          console.log("new counter value:", await increment());
        }}
      >
        Increment
      </button>

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
    </>
  );
};
