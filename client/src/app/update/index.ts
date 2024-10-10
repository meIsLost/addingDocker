import { destinationsApi } from "../../service/destinations-service";

async function fetchDestination() {
  try {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) {
      throw new Error("No destination ID provided");
    }

    const destination = await destinationsApi.getDestination(id);

    const destinationForm =
      document.querySelector<HTMLFormElement>("#destination-form")!;

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

await fetchDestination();
