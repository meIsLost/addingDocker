import { MongoClient } from "mongodb";
const URL = "mongodb://127.0.0.1:27017/test";
const client = new MongoClient(URL);

let dbConnection;
const connectToDb = async () => {
    try {
      const client = await MongoClient.connect(URL);

      dbConnection = client.db();
    } catch (err) {
      console.error('Failed to connect to MongoDB: ', err);
      throw err;
    }
  };  

const getDb = () => {
if (!dbConnection) {
    throw new Error('Error connecting to database.');
    }
    return dbConnection;
};

export { connectToDb, getDb };