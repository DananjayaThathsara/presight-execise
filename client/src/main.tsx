import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App";

// Create a QueryClient with default options for caching and retrying failed requests
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // If a request fails, retry it once before showing an error
      retry: 1,
      // Keep data fresh for 5 minutes before refetching
      staleTime: 5 * 60 * 1000,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
