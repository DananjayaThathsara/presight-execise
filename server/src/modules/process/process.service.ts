import { Worker } from "worker_threads";
import path from "path";
import { emitJobResult } from "../../config/socket";
import { Job, JobResult } from "../../types";

const jobQueue: Job[] = [];

// Create a worker thread that runs the process.worker.ts file
const isCompiled = __filename.endsWith(".js");

const worker = new Worker(
  path.join(__dirname, isCompiled ? "process.worker.js" : "process.worker.ts"),
  isCompiled ? undefined : { execArgv: ["--require", "ts-node/register"] },
);

console.log("Worker thread created");

worker.on("message", (result: JobResult) => {
  console.log(`Worker completed job: ${result.id}`);
  emitJobResult(result.socketId, result.id, result.result);
});

worker.on("error", (err: Error) => {
  console.error("Worker error:", err);
});

export function processJob(job: Job): void {
  // Add the new job to the queue
  jobQueue.push(job);
  console.log(`Job ${job.id} added to queue. Queue size: ${jobQueue.length}`);
  worker.postMessage(job);
}

// This function can be called from the route handler when a new job is created
export function getQueueStatus(): Job[] {
  return jobQueue;
}
