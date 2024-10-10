export function showError(input: HTMLInputElement, message: string) {
  const errorElement = input.nextElementSibling! as HTMLDivElement;
  errorElement.textContent = message;
  errorElement.style.display = "block";
}

export function hideError(input: HTMLInputElement) {
  const errorElement = input.nextElementSibling! as HTMLDivElement;
  errorElement.style.display = "none";
}
