//Loads .env file contents into process.env by default.
import dotenv from "dotenv";
dotenv.config();

import dbConnect from "./lib/dbConnect.js"; //Handles MongoDB connection
import app from "./app.js"; //Express app instance

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await dbConnect(); //Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server runnning on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.log("MongoDB connection failed:", err.message);
    process.exit(1); //exit process on failure
  }
};

startServer();
