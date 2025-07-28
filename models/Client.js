import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    company: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: { type: String },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", clientSchema);

export default Client;
