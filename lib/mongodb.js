import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

if (process.env.NODE_ENV === "development") {
  // In development, use a global variable so that we don't create multiple MongoClient instances
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, it's better to not use a global variable
  client = new MongoClient(MONGODB_URI, options);
  clientPromise = client.connect();
}

export default clientPromise;
