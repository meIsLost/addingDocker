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

  try {
    await destinationsApi.createDestination(destination);
    alert("Destination created successfully");
    destinationForm.reset();

    // add a button to the form to redirect to the home page
    const homeButton = document.getElementById("redirect-btn")!;
    homeButton.onclick = () => (window.location.href = "/");
    homeButton.classList.remove("hidden");
  } catch (error) {
    console.error("Error creating destination", error);
    alert("Failed to create destination");
  }
});
