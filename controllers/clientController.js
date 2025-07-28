import Client from "../models/Client.js";

//Create Client
export const createClient = async (req, res) => {
  try {
    const { name, email, company, phone, address } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const clientExists = await Client.findOne({ email });
    if (clientExists) {
      return res.status(409).json({ message: "Client already exists" });
    }

    const client = await Client.create({
      name,
      email,
      company,
      phone,
      address,
    });

    res.status(201).json(client);
  } catch (error) {
    console.error("Create client error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

//Get all Clients
export const getAllClients = async (req, res) => {
  try {
    const allClients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(allClients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
};

//Get Single Client by ID
export const getClientById = async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch client" });
  }
};

//Update Client
export const updateClient = async (req, res) => {
  try {
    const updateClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updateClient);
  } catch (error) {
    res.status(500).json({ message: "Failed to update Client" });
  }
};

//Delete Client
export const deletClient = async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete client" });
  }
};
