import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";

import testimonialRoutes from "./routes/testimonial.route.js";

const app = express();
app.use(express.json());
// app.use(
//   cors({
//     origin: process.env.FRONTEND_URL,
//   })
// );

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => res.send("Hello from the server"));

app.use("/api/testimonials", testimonialRoutes);

const startServer = async () => {
  try {
    await connectDB();

    // listen for local development
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () =>
        console.log("Server is up and running on PORT:", PORT)
      );
    }
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
