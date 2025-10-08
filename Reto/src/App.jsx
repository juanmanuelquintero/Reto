import { BrowserRouter, Routes, Route } from "react-router-dom";
import Log from "./components/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Log />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
