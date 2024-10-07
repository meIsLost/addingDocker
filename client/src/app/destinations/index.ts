import html from "html-literal";
import { destinationsApi } from "../../service/destinations-service";
import { DestinationCard } from "./DestinationCard";

const destinations = await destinationsApi.getDestinations();
console.log(destinations);

const destinationList = destinations.map((destination) =>
  DestinationCard({ destination }),
);
document.querySelector<HTMLDivElement>("#destination-list")!.innerHTML = html`
  ${destinationList}
`;
