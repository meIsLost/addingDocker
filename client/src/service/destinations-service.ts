import { type Destination } from "../types/types";

export const destinationsApi = {
  async getDestinations(): Promise<Destination[]> {
    const response = await fetch("/v1/destinations");
    const data = await response.json<Destination[]>();
    console.log(data);
    return data;
  },

  async getDestination(id: string): Promise<Destination> {
    const response = await fetch(`/v1/destinations/${id}`);
    const data = await response.json<Destination>();
    return data;
  },

  async deleteDestination(id: string): Promise<{ message: string }> {
    const response = await fetch(`/v1/destinations/${id}`, {
      method: "DELETE",
      headers: {
        Bearer: "Bearer " + localStorage.getItem("token"),
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert("Unauthorized");
      }
      throw new Error("Failed to delete destination");
    }

    return await response.json<{ message: "Deleted" }>();
  },
} as const;
