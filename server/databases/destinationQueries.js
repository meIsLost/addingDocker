import { connectToDb, getDb } from "./connection.js";

export async function getAllDestinations() {
  try {
    await connectToDb();
    const db = getDb();
    const destinationsCollection = db.collection("destinations");
    const destinations = await destinationsCollection.find({}).toArray();
    return destinations;
  } catch (error) {
    throw error;
  }
}

export async function createDestination(destination) {
  try {
    await connectToDb();
    const db = getDb();
    const destinationCollection = db.collection("destinations");
    const result = await destinationCollection.insertOne(destination);
    return result.insertedId;
  } catch (error) {
    throw error;
  }
}
