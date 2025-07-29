import Project from "../models/Project.js";
import Client from "../models/Client.js";

//Create Project
export const createProject = async (req, res) => {
  try {
    const { title, description, status, deadline, client } = req.body;

    if (!title || !client) {
      return res
        .status(400)
        .json({ message: "Title and Client ID are required." });
    }

    //Check if the client exists
    const existingClient = await Client.findById(client);

    if (!existingClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    const project = await Project.create({
      title,
      description,
      status,
      deadline,
      client,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error("Create project error: ", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Get All Projects
export const getAllProjects = async (req, res) => {
  try {
    const allProjects = await Project.find()
      .populate("client", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
};

//Get single project
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("client");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch project" });
  }
};

//Update Project
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update project" });
  }
};

//Delete Project
export const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Project deleted sucessfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project" });
  }
};

//Get all Projects for specific client
export const getProjectsByClient = async (req, res) => {
  try {
    const clientId = req.params.clientId;
    const projects = await Project.find({ client: clientId }).populate(
      "client",
      "name"
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects for client" });
  }
};
