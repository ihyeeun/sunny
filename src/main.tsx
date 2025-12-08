import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Analytics } from "@vercel/analytics/next";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";

import Modals from "@shared/provider/modal-provider.tsx";
import AuthWatcher from "@features/auth/components/auth-watcher.tsx";

import App from "./App.tsx";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Analytics />
      <ReactQueryDevtools />
      <Toaster />
      <Modals />
      <AuthWatcher>
        <App />
      </AuthWatcher>
    </QueryClientProvider>
  </BrowserRouter>,
);
