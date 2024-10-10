import { authApi } from "../../service/auth-service";
import { isLoggedIn } from "../../util/auth";
import { hideError, showError } from "../../util/form-validation";

// Redirect if already logged in
if (isLoggedIn()) {
  window.location.href = "/";
}

const form = document.getElementById("login-form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  let isValid = true;

  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) {
    isValid = false;
    showError(
      form.email as HTMLInputElement,
      "Please enter a valid email address",
    );
  } else {
    hideError(form.email as HTMLInputElement);
  }

  // Password validation
  if (!password || password.length > 20 || password.length < 1) {
    isValid = false;
    showError(form.password as HTMLInputElement, "Wrong password");
  } else {
    hideError(form.password as HTMLInputElement);
  }

  // If validation passes, proceed with login
  if (isValid) {
    try {
      await authApi.login({ email, password });
      setTimeout(() => window.location.assign("/"), 100);
    } catch (error) {
      console.error("Login error:", error);
      alert("Error logging in. Please try again.");
    }
  }
});
