import { destinationsApi } from "../../service/destinations-service";
import { type Destination } from "../../types/types";
import { isLoggedIn } from "../../util/auth";
import { hideError, showError } from "../../util/form-validation";

if (!isLoggedIn()) {
  window.location.assign("/login");
}

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
>("#destination-update-form")!;

async function fetchDestination() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      throw new Error("No destination ID provided");
    }

    const destination = await destinationsApi.getDestination(id);

    destinationForm.location.value = destination.location;
    destinationForm.title.value = destination.title;
    destinationForm.startDate.value = new Date(destination.startDate)
      .toISOString()
      .split("T")[0];
    destinationForm.endDate.value = new Date(destination.endDate)
      .toISOString()
      .split("T")[0];
    destinationForm.description.value = destination.description;
    destinationForm.country.value = destination.country;
    destinationForm.imageUrl.value = destination.imageUrl;
  } catch (error) {
    console.error("Error fetching destination", error);
  }
}

destinationForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(destinationForm);

  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) {
    throw new Error("No destination ID provided");
  }

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

  if (!destination.description || destination.description.length < 1) {
    isValid = false;
    showError(destinationForm.description, "Please enter a valid description");
  } else {
    hideError(destinationForm.description);
  }

  if (isValid) {
    try {
      await destinationsApi.updateDestination(id, destination);
      alert("Destination updated successfully");

      // add a button to the form to redirect to the home page
      const homeButton = document.getElementById("redirect-btn")!;
      homeButton.onclick = () => window.location.assign("/");
      homeButton.classList.remove("hidden");
    } catch (error) {
      console.error("Error updating destination", error);
      alert("Failed to update destination. Please try again.");
    }
  }
});

fetchDestination().then().catch(console.error);
