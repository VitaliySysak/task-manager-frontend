import { Route, Routes } from "react-router-dom";
import { Home } from "./components/shared/home";
import { Auth } from "./components/shared";
import { SentryError } from "./components/shared/sentry-error";
import { PrivacyPolicy } from "./components/shared/privacy-policy";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
      <Route path="/sentry-error" element={<SentryError />}></Route>
      <Route path="/privacy" element={<PrivacyPolicy />}></Route>
    </Routes>
  );
}

export default App;
