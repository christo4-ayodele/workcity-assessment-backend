import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

//create a cached mongodb connection to be more efficient and reduce unnecessary redundant calls
let cached = global.mongoose; //Reuse the existing global Mongoose connection cache (if available)

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }; //Initialize global Mongoose cache if it doesnt exist
}

const dbConnect = async () => {
  //If a connection already exists in cache, use it
  if (cached.conn) {
    console.log("Using cached MongoDB connection");
    return cached.conn;
  }

  //If no existing connection promise, create a new one
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        dbName: "Workcity", // Specify the database name
      })
      .then((mongooseInstance) => {
        console.log("Connected to MongoDB");
        return mongooseInstance;
      })
      .catch((err) => {
        console.error("MongoDB connection error: ", err.message);
        throw err;
      });
  }

  // Wait for the connection to resolve and cache it
  cached.conn = await cached.promise;
  return cached.conn;
};

export default dbConnect;
