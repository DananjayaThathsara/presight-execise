import { Router } from "express";
import { processJob } from "./process.service";
import { Job } from "../../types";

export const processRouter = Router();

// Define the POST /api/process route to create a new job
processRouter.post("/process", (req, res) => {
  const { id, socketId } = req.body;
  const job: Job = {
    id,
    socketId,
    data: `task-${id}`,
  };
  processJob(job);
  res.json({
    status: "pending",
    id,
  });
});
