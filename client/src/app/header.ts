import html from "html-literal";
import { isLoggedIn } from "../util/auth";

if (isLoggedIn()) {
  document.querySelector("#header-buttons")!.innerHTML = html`
    <button
      class="border px-3.5 py-0.5 rounded-md font-medium hover:bg-slate-50"
      onclick="localStorage.removeItem('authToken'); window.location.href = '/'"
    >
      <a>Log out</a>
    </button>
  `;
} else {
  document.querySelector("#header-buttons")!.innerHTML = html`
    <button
      class="border px-3.5 py-0.5 rounded-md font-medium hover:bg-slate-50"
    >
      <a href="/login">Log in</a>
    </button>
    <button
      class="px-3.5 py-0.5 rounded-md bg-forestGreen/90 font-medium hover:bg-forestGreen"
    >
      <a href="/signup" class="text-white">Sign up</a>
    </button>
  `;
}
