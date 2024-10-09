import { authApi } from "../../service/auth-service";
import { isLoggedIn } from "../../util/auth";

if (isLoggedIn()) {
  window.location.href = "/";
}

const form = document.getElementById("login-form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await authApi.login({ email, password });
    setTimeout(() => window.location.assign("/"), 100);
  } catch (error) {
    console.error("Login error:", error);
    alert("Error logging in. Please try again.");
  }
});
