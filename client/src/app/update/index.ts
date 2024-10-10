import { destinationsApi } from "../../service/destinations-service";
import { type Destination } from "../../types/types";

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
  } satisfies Partial<Destination>;

  try {
    await destinationsApi.updateDestination(id, destination);
    alert("Destination updated successfully");

    // add a button to the form to redirect to the home page
    const homeButton = document.getElementById("redirect-btn")!;
    homeButton.onclick = () => (window.location.href = "/");
    homeButton.classList.remove("hidden");
  } catch (error) {
    console.error("Error updating destination", error);
    alert("Failed to update destination. Please try again.");
  }
});

await fetchDestination();
