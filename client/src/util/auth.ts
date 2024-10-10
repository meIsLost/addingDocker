export function isLoggedIn() {
  return document.cookie.includes("authToken");
}

export function logout() {
  document.cookie =
    "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

export function getAuthToken() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("authToken"))
    ?.split("=")[1];
}
