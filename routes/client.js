import express from "express";
import {
  createClient,
  deletClient,
  getAllClients,
  getClientById,
  updateClient,
} from "../controllers/clientController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, createClient);
router.get("/", protect, getAllClients);
router.get("/:id", protect, getClientById);
router.put("/:id", protect, updateClient);
router.delete("/:id", protect, authorizeRoles("admin"), deletClient);

export default router;
