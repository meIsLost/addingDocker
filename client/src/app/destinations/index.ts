import html from "html-literal";
import { destinationsApi } from "../../service/destinations-service";

const destinations = await destinationsApi.getDestinations();
console.log(destinations);

const destinationList = destinations.map(
  (destination) =>
    html` <div class="flex p-5">
      <img class="size-3/12" src="images/thailand1.jpg" alt="" />
      <div class="flex flex-col pl-4 size-3/6">
        <h2 class="font-medium text-xl pb-2">Thailand</h2>
        <!-- <img class="size-3" src="images/352549_more_vert_iconfinder.svg" alt=""> -->
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
        <p class="justify-start text-sm pt-2 pr-2">
          ${destination.description}
        </p>
        <div class="flex justify-end p-2">
          <!-- <button class="text-white bg-forestGreen pr-2 pl-2 p-1 rounded-xl w-fit">Learn more</button> -->
        </div>
      </div>
    </div>`,
);
document.querySelector<HTMLDivElement>("#destination-list")!.innerHTML = html`
  ${destinationList}
`;
