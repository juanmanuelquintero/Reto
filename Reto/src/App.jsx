import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "./components/login";
import Ingreso from "./components/control-ingreso";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log />} />
        <Route path="/Ingreso" element={<Ingreso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
