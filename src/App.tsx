import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/shared/home";
import { Auth } from "./components/shared";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
