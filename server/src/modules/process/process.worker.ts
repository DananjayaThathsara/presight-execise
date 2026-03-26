import { parentPort } from "worker_threads";
import { Job, JobResult } from "../../types";

if (parentPort) {
  console.log("Worker thread started and ready");

  // Listen for messages from the main thread
  parentPort.on("message", (job: Job) => {
    console.log(`Worker received job: ${job.id}`);

    setTimeout(() => {
      // Build the result object
      const result: JobResult = {
        id: job.id,
        socketId: job.socketId,
        result: `Job ${job.id} completed successfully with data: ${job.data}`,
      };

      console.log(`Worker finished job: ${job.id}`);

      parentPort!.postMessage(result);
    }, 2000);
  });
}
