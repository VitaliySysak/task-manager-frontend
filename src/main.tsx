import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/redux/store.ts";
import { Toaster } from "react-hot-toast";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://89bb35edb37f74cd2222c4c5d7cee202@o4508522520641536.ingest.de.sentry.io/4509390091321424",
  sendDefaultPii: true,
  integrations: [
    Sentry.feedbackIntegration({
      colorScheme: "dark",
      maskAllText: false,
    }),
  ],
  replaysOnErrorSampleRate: 1.0,
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
      <Toaster
        toastOptions={{
          style: {
            background: "var(--primary)",
            color: "#fff",
          },
        }}
      />
    </BrowserRouter>
  </Provider>
);
