import { type Destination } from "../types/types";

export const destinationsApi = {
  async getDestinations(): Promise<Destination[]> {
    const response = await fetch("/v1/destinations");
    const data = await response.json<Destination[]>();
    console.log(data);
    return data;
  },

  async deleteDestination(id: string): Promise<{ message: string }> {
    const response = await fetch(`/v1/destinations/${id}`, {
      method: "DELETE",
    }).then((res) => res.json<{ message: "Deleted" }>());

    return response;
  },
} as const;
