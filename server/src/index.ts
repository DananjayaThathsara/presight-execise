import express from "express";
import cors from "cors";
import { createServer } from "http";
import { initializeSocket } from "./config/socket";
import { peopleRouter } from "./modules/people/people.route";
import { streamRouter } from "./modules/stream/stream.route";
import { processRouter } from "./modules/process/process.route";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:5173", "https://presightexercise.dananjayathathsara.com"],
    credentials: true,
  }),
);
app.use(express.json());

//Task 1: GET /api/people
app.use("/api", peopleRouter);
//Task 2: GET /api/stream
app.use("/api", streamRouter);
//Task 3: POST /api/process
app.use("/api", processRouter);

const httpServer = createServer(app);

initializeSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log("-------------------------------------------------");
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Socket.io ready on ws://localhost:${PORT}`);
  console.log("-------------------------------------------------");
  console.log("Available endpoints:");
  console.log("  GET  /api/people   → Task 1");
  console.log("  GET  /api/stream   → Task 2");
  console.log("  POST /api/process  → Task 3");
  console.log("-------------------------------------------------");
});
