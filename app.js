import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/client.js";
import projectRoutes from "./routes/project.js";
const app = express();

//Middlewares

//Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

//Automatically parse incoming JSON requests
app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
export default app;
