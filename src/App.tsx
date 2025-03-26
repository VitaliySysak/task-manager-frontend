import { Route, Routes } from "react-router-dom";
import { Home } from "./components/shared/home";
import { Auth } from "./components/shared";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/auth" element={<Auth />}></Route>
    </Routes>
  );
}

export default App;
