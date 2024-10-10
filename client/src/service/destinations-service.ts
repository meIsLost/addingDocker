import { type Destination } from "../types/types";
import { getAuthToken } from "../util/auth";

export const destinationsApi = {
  async getDestinations(): Promise<Destination[]> {
    const response = await fetch("/v1/destinations");
    return await response.json<Destination[]>();
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
        Authorization: `Bearer ${getAuthToken()}`,
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
        Authorization: `Bearer ${getAuthToken()}`,
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

  async createDestination(
    destination: Omit<Destination, "_id" | "id" | "imageUrl">,
  ) {
    const response = await fetch("/v1/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(destination),
    });

    if (!response.ok) {
      throw new Error("Failed to create destination");
    }

    return await response.json<{ message: "Created" }>();
  },
} as const;
