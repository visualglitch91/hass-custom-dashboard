import { h } from "../utils/preact.mjs";
import { clsx, css } from "../utils/general.mjs";

css(`
  .component__paper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(47,59,82,0.6);
    backdrop-filter: blur(10px);
    box-shadow: rgb(17, 35, 52) 3px 3px 13px -6px;
    border-radius: 5px;
    color: white;
  }
`);

export default function Paper({ class: className, children }) {
  return h`
    <div class=${clsx("component__paper", className)}>
      ${children}
    </div>
  `;
}
