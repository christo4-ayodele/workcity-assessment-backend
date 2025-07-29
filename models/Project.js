import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String,required: true, trim: true},
    description: { type: String},
    status: { type: String,enum: ["pending", "in progress", "completed"], default: "pending"},
    deadline: { type: Date},
    client: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true},
    },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
