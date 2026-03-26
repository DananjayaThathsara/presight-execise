import { Server } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

// Initialize this variable when setup the WebSocket
let io: SocketIOServer;

// called from index.ts to setup the WebSocket server
export function initializeSocket(httpServer: Server) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: ["http://localhost:5173", "https://presightexercise.dananjayathathsara.com"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket: Socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  console.log("Socket.io is ready");
}

//called from the worker thread when a job is completed
export function emitJobResult(socketId: string, jobId: string, result: string) {
  if (io) {
    io.to(socketId).emit("job_result", {
      id: jobId,
      result: result,
    });
  }
}
