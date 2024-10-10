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
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
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

  async updateDestination(id: string, destination: Partial<Destination>) {
    const response = await fetch(`/v1/destinations/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify(destination),
    });

    if (!response.ok) {
      if (response.status === 401) {
        alert("Unauthorized");
      }
      throw new Error("Failed to update destination");
    }
  },
} as const;
