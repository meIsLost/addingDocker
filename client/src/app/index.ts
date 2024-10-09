import html from "html-literal";
import { DestinationCard } from "../components/DestinationCard";
import { destinationsApi } from "../service/destinations-service";

const destinationListContainer =
  document.querySelector<HTMLDivElement>("#destination-list")!;

destinationListContainer.innerHTML = html`<div id="loader" class="text-center">
  Loading...
</div>`;

async function fetchDestinations() {
  try {
    const destinations = await destinationsApi.getDestinations();

    destinationListContainer.innerHTML = destinations
      .map(DestinationCard)
      .join("");

    destinations.forEach((destination) => {
      document
        .getElementById(`deleteBtn-${destination._id}`)
        ?.addEventListener("click", () => onDelete(destination._id));
    });
  } catch (error) {
    console.error("Error fetching destinations:", error);
    destinationListContainer.innerHTML = html`<div
      id="loader"
      class="text-center"
    >
      Failed to load destinations. Please try again later.
    </div>`;
  }
}

async function onDelete(id: string) {
  if (confirm("Are you sure you want to delete this destination?")) {
    console.log("Deleting", id);
    // Remove the deleted destination from the DOM
    document.getElementById(`destination-${id}`)!.remove();
    // Call the delete API
    await destinationsApi.deleteDestination(id);
    console.log("Deleted", id);
  }
}

await fetchDestinations();
