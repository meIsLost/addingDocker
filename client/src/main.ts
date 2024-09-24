import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import html from "html-literal";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = html`
  <div>
    <div class="flex justify-evenly">
      <a href="https://vitejs.dev" target="_blank">
        <img src="${viteLogo}" class="logo" alt="Vite logo" />
      </a>
      <a href="https://www.typescriptlang.org/" target="_blank">
        <img
          src="${typescriptLogo}"
          class="logo vanilla"
          alt="TypeScript logo"
        />
      </a>
    </div>
    <h1 class="text-red-400 font-bold">Hello Vite!</h1>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);