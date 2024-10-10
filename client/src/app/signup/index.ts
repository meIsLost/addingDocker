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

  let isValid = true;

  // Email validation pattern
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email||!emailPattern.test(email)) {
    isValid = false;
    // @ts-expect-error
    showError(form.email, "Please enter a valid email address");
  } else {
    // @ts-expect-error
    hideError(form.email);
  }

  // Password validation
  if (!password||password.length > 20 || password.length < 1) {
    isValid = false;
    // @ts-expect-error
    showError(form.password, "Password must be between 1 and 20 characters");
  } else {
    // @ts-expect-error
    hideError(form.password);
  }

  // Username validation pattern
  if (!username||username.length > 20 || username.length < 1) {
    isValid = false;
    // @ts-expect-error
    showError(form.username, "Username must be between 1 and 20 characters");
  } else {
    // @ts-expect-error
    hideError(form.username);
  }

  // name validation
  if (!name||name.length > 20 || name.length < 1) {
    isValid = false;
    // @ts-expect-error
    showError(form.name, "Name must be between 1 and 20 characters");
  } else {
    // @ts-expect-error
    hideError(form.name);
  }

  if (isValid){
  try {
    await userApi.signUp({ email, password, username, name });
    setTimeout(() => window.location.assign("/"), 100);
  } catch (error) {
    console.error("SignUp error:", error);
    alert("Failed to sign up. Please try again later.");
  }
}

function showError(input, message){
  const errorElement = input.nextElementSibling;
errorElement.textContent = message;
errorElement.style.display = "block";
}

function hideError(input) {
  const errorElement = input.nextElementSibling;
  errorElement.style.display = "none";
}
});
