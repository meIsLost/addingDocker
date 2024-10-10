import { destinationsApi } from "../../service/destinations-service";
import { type Destination } from "../../types/types";
import { hideError, showError } from "../../util/form-validation";

const destinationForm = document.querySelector<
  HTMLFormElement & {
    location: HTMLInputElement;
    title: HTMLInputElement;
    startDate: HTMLInputElement;
    endDate: HTMLInputElement;
    description: HTMLInputElement;
    country: HTMLInputElement;
    imageUrl: HTMLInputElement;
  }
>("#destination-form")!;

destinationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(destinationForm);

  const destination = {
    location: formData.get("location") as string,
    title: formData.get("title") as string,
    startDate: formData.get("startDate") as string,
    endDate: formData.get("endDate") as string,
    description: formData.get("description") as string,
    country: formData.get("country") as string,
    imageUrl: formData.get("imageUrl") as string,
  } satisfies Partial<Destination>;

  let isValid = true;

  if (!destination.location || destination.location.length < 1) {
    isValid = false;
    showError(destinationForm.location, "Please enter a valid location");
  } else {
    hideError(destinationForm.location);
  }

  if (!destination.title || destination.title.length < 1) {
    isValid = false;
    showError(destinationForm.title, "Please enter a valid title");
  } else {
    hideError(destinationForm.title);
  }

  if (!destination.startDate) {
    isValid = false;
    showError(destinationForm.startDate, "Please enter a valid start date");
  } else {
    hideError(destinationForm.startDate);
  }

  if (!destination.endDate) {
    isValid = false;
    showError(destinationForm.endDate, "Please enter a valid end date");
  } else {
    hideError(destinationForm.endDate);
  }

  if (!destination.description || destination.description.length < 1) {
    isValid = false;
    showError(destinationForm.description, "Please enter a valid description");
  } else {
    hideError(destinationForm.description);
  }

  if (!destination.country || destination.country.length < 1) {
    isValid = false;
    showError(destinationForm.country, "Please enter a valid country");
  } else {
    hideError(destinationForm.country);
  }

  if (!destination.imageUrl || destination.imageUrl.length < 1) {
    isValid = false;
    showError(destinationForm.imageUrl, "Please enter a valid image URL");
  } else {
    hideError(destinationForm.imageUrl);
  }

  if (isValid) {
    try {
      await destinationsApi.createDestination(destination);
      alert("Destination created successfully");
      destinationForm.reset();

      // add a button to the form to redirect to the home page
      const homeButton = document.getElementById("redirect-btn")!;
      homeButton.onclick = () => window.location.assign("/");
      homeButton.classList.remove("hidden");
    } catch (error) {
      console.error("Error creating destination", error);
      alert("Failed to create destination");
    }
  }
});
