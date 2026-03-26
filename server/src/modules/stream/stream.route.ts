import { Router } from "express";
import { streamText } from "./stream.service";

// Create a new router for stream-related routes
export const streamRouter = Router();

streamRouter.get("/stream", (req, res) => {
  streamText(req, res);
});
