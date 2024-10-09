import html from "html-literal";
import { type Destination } from "../../types/types";

export function DestinationCard({ destination }: { destination: Destination }) {
  return html` <div class="flex p-5" id="destination-${destination._id}">
    <img class="size-3/12" src="${destination.imageUrl}" alt="" />
    <div class="flex flex-col pl-4 size-3/6">
      <h2 class="font-medium text-xl pb-2">${destination.location}</h2>
      <div class="flex gap-3 pl-1">
        <img
          class="size-4"
          src="images/2075808_destination_location_map_pin_iconfinder.svg"
          alt=""
        />
        <p>${destination.title}</p>
      </div>
      <div class="flex gap-3 p-1">
        <img
          class="size-4"
          src="images/9004671_calendar_date_schedule_event_iconfinder.svg"
          alt=""
        />
        <p class="text-xs">
          ${new Date(destination.startDate).toLocaleDateString()} -
          ${new Date(destination.endDate).toLocaleDateString()}
        </p>
      </div>
      <p class="justify-start text-sm pt-2 pr-2">${destination.description}</p>
      <div class="flex justify-end p-2"></div>
    </div>
    <div class="flex flex-col gap-2">
      <button
        onclick="window.location.href='/update?${destination._id}'"
        class="border px-2 py-1.5 rounded-md text-xs"
        id="updateBtn-${destination._id}"
      >
        Update
      </button>
      <button
        class="border border-red-700/20 px-2 py-1.5 rounded-md text-xs"
        id="deleteBtn-${destination._id}"
      >
        Delete
      </button>
    </div>
  </div>`;
}
