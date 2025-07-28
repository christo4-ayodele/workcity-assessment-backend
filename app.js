import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import clientRoutes from "./routes/client.js";
const app = express();

//Middlewares

//Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

//Automatically parse incoming JSON requests
app.use(express.json());

// ===== ROUTES =====
app.use("/api/auth", authRoutes);
// app.use('/api/projects', projectRoutes);

app.use("/api/clients", clientRoutes);
export default app;
