import { destinationsApi } from "../../service/destinations-service";
import { type Destination } from "../../types/types";

const destinationForm = document.querySelector<HTMLFormElement>(
  "#destination-update-form",
)!;

async function fetchDestination() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      throw new Error("No destination ID provided");
    }

    const destination = await destinationsApi.getDestination(id);

    console.log(destination);
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
    // window.location.href = "/";
  } catch (error) {
    console.error("Error updating destination", error);
    alert("Failed to update destination. Please try again.");
  }
});

await fetchDestination();
