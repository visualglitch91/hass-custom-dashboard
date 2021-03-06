import { render } from "preact";
import SimpleBar from "simplebar";
import { HassProvider } from "./utils/hass";
import { autoUpdater, isTouchDevice, loadCordovaJS } from "./utils/general";
import App from "./App";

autoUpdater();

const app = document.getElementById("app");

if (!app) {
  throw new Error("#app node not found");
}

const root = app;
const simplebar = !isTouchDevice ? new SimpleBar(root) : undefined;

function renderApp() {
  render(
    <HassProvider>
      <App />
    </HassProvider>,
    root
  );

  if (simplebar) {
    simplebar.recalculate();
  }
}

loadCordovaJS().then(() => {
  window.location.hash = "";

  document.addEventListener("resume", autoUpdater);
  document.addEventListener("resume", renderApp);

  window.addEventListener("focus", autoUpdater);
  window.addEventListener("focus", renderApp);

  window.addEventListener("resize", renderApp);

  renderApp();
});
