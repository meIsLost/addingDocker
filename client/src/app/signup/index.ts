import { userApi } from "../../service/user-service";
import { isLoggedIn } from "../../util/auth";
import { hideError, showError } from "../../util/form-validation";

if (isLoggedIn()) {
  window.location.assign("/");
}

const form = document.getElementById("signup-form") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const username = formData.get("username") as string;
  const name = formData.get("name") as string;

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
    showError(
      form.password as HTMLInputElement,
      "Password must be between 1 and 20 characters",
    );
  } else {
    hideError(form.password as HTMLInputElement);
  }

  // Username validation pattern
  if (!username || username.length > 20 || username.length < 1) {
    isValid = false;
    showError(
      form.username as HTMLInputElement,
      "Username must be between 1 and 20 characters",
    );
  } else {
    hideError(form.username as HTMLInputElement);
  }

  // name validation
  if (!name || name.length > 20 || name.length < 1) {
    isValid = false;

    showError(
      form.name as unknown as HTMLInputElement,
      "Name must be between 1 and 20 characters",
    );
  } else {
    hideError(form.name as unknown as HTMLInputElement);
  }

  if (isValid) {
    try {
      await userApi.signUp({ email, password, username, name });
      setTimeout(() => window.location.assign("/"), 100);
    } catch (error) {
      console.error("SignUp error:", error);
      alert("Failed to sign up. Please try again later.");
    }
  }
});
