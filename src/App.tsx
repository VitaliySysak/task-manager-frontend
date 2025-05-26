import { Route, Routes } from "react-router-dom";
import { Home } from "./components/shared/home";
import { Auth } from "./components/shared";
import { SentryError } from "./components/shared/sentry-error";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
      <Route path="/sentry-error" element={<SentryError />}></Route>
    </Routes>
  );
}

export default App;
