import express from "express";
import cors from "cors";
import resourceRoutes from "./routes/resource.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/resources", resourceRoutes);

export default app;
