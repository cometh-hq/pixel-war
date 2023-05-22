import ReactDOM from "react-dom/client";
import { mount as mountDevTools } from "@latticexyz/dev-tools";
import { App } from "./App";
import { setup } from "./mud/setup";
import { MUDProvider } from "./MUDContext";
import { Web3OnboardProvider } from "@web3-onboard/react";
import web3Onboard from "./services/web3-onboard";
import "@fontsource/poppins";

const rootElement = document.getElementById("react-root");
if (!rootElement) throw new Error("React root not found");
const root = ReactDOM.createRoot(rootElement);

// TODO: figure out if we actually want this to be async or if we should render something else in the meantime
setup().then((result) => {
  root.render(
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <MUDProvider value={result}>
        <App />
      </MUDProvider>
    </Web3OnboardProvider>
  );
  mountDevTools();
});
