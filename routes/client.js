import express from "express";
import {
  createClient,
  deletClient,
  getAllClients,
  getClientById,
  updateClient,
} from "../controllers/clientController.js";

const router = express.Router();

router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deletClient);

export default router;
