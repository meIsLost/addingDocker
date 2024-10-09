import { type Destination } from "../types/types";

declare global {
  interface Response {
    json<T = unknown>(): Promise<T>;
  }
}

const API_URL = "http://127.0.0.1:8082";

export const destinationsApi = {
  async getDestinations(): Promise<Destination[]> {
    const response = await fetch(`${API_URL}/v1/destinations`);
    const data = await response.json<Destination[]>();
    console.log(data);
    return data;
  },

  async deleteDestination(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_URL}/v1/destinations/${id}`, {
      method: "DELETE",
    }).then((res) => res.json<{ message: "Deleted" }>());

    return response;
  },
} as const;
