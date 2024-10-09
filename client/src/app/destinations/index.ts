import { destinationsApi } from "../../service/destinations-service";
import { DestinationCard } from "./DestinationCard";

const destinations = await destinationsApi.getDestinations();

async function onDelete(id: string) {
  if (confirm("Are you sure you want to delete this destination?")) {
    console.log("Deleting", id);
    // Remove the deleted destination from the DOM
    document.getElementById(`destination-${id}`)!.remove();
    await destinationsApi.deleteDestination(id);
    console.log("Deleted", id);
  }
}

const destinationList = destinations
  .map((destination) => DestinationCard({ destination }))
  .join(""); // Use .join() to create a string of HTML

document.querySelector<HTMLDivElement>("#destination-list")!.innerHTML =
  destinationList;

// Manually attach event listeners after rendering
destinations.forEach((destination) => {
  document
    .getElementById(`deleteBtn-${destination._id}`)
    ?.addEventListener("click", () => onDelete(destination._id));
});
