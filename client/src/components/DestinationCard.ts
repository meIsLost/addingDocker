import html from "html-literal";
import { type Destination } from "../types/types";
import { isLoggedIn } from "../util/auth";

export function DestinationCard(destination: Destination) {
  return html` <div
    class="flex flex-col lg:flex-row justify-between p-5 gap-2 border-b"
    id="destination-${destination._id}"
  >
    <div class="w-full h-full flex flex-col lg:flex-row gap-6">
      <img
        class="lg:size-3/12 rounded-md"
        src="${destination.imageUrl}"
        alt="A picture of ${destination.location}"
      />
      <div class="flex flex-col gap-0.5">
        <h2 class="font-semibold text-xl">${destination.location}</h2>
        <div class="flex gap-1 items-center">
          <img
            class="size-3"
            src="images/2075808_destination_location_map_pin_iconfinder.svg"
            alt=""
          />
          <p class="text-sm font-medium">${destination.title}</p>
        </div>
        <p class="text-xs text-slate-600">
          ${new Date(destination.startDate).toLocaleDateString()} -
          ${new Date(destination.endDate).toLocaleDateString()}
        </p>
        <p class="justify-start text-sm pt-2 w-2/3">
          ${destination.description}
        </p>
      </div>
    </div>
    ${isLoggedIn()
      ? html` <div class="flex flex-col gap-1">
          <a
            href="/update?id=${destination._id}"
            class="border px-2 py-1.5 rounded-md text-xs font-medium inline-block text-center"
            id="updateBtn-${destination._id}"
          >
            Update
          </a>
          <button
            class="border border-red-500/30 bg-red-100/20 text-red-900 font-medium px-2 py-1.5 rounded-md text-xs"
            id="deleteBtn-${destination._id}"
          >
            Delete
          </button>
        </div>`
      : ""}
  </div>`;
}
