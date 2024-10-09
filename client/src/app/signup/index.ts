import { userApi } from "../../service/user-service";
import { isLoggedIn } from "../../util/auth";

if (isLoggedIn()) {
  window.location.href = "/";
}

const form = document.getElementById("signup-form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;

  try {
    await userApi.signUp({ email, password, username, name });
    setTimeout(() => window.location.assign("/"), 100);
  } catch (error) {
    console.error("SignUp error:", error);
    alert("Failed to sign up. Please try again later.");
  }
});
