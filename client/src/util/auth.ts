export function isLoggedIn() {
  return Boolean(localStorage.getItem("authToken"));
}

export function logout() {
  localStorage.removeItem("authToken");
}
