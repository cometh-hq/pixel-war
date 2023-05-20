import { useComponentValue, useRows } from "@latticexyz/react";
import { useMUD } from "./MUDContext";

export const App = () => {
  const {
    components: { Counter },
    systemCalls: { increment, claimLand },
    network: { singletonEntity, storeCache },
  } = useMUD();

  const counter = useComponentValue(Counter, singletonEntity);
  const mapLands = useRows(storeCache, { table: "MapLand" });

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
      <br />
      <button
        type="button"
        onClick={async (event) => {
          event.preventDefault();
          await claimLand(1, 2, "6427");
          console.log("claim land 1 2 6427");
        }}
      >
        claim land 1 2 6427
      </button>
      <br />
      <>
        {mapLands.map((mapLand) => (
          <p>
            {mapLand.key.x} {mapLand.key.y} {mapLand.value.value.toString()}
          </p>
        ))}
      </>
    </>
  );
};
