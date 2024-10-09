declare global {
  interface Response {
    json<T = unknown>(): Promise<T>;
  }
}

export type Destination = {
  _id: string;
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  location: string;
  country: string;
  imageUrl: string;
};
