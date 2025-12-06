import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import EscolhaCategoria from "./pages/EscolhaCategoria.jsx";
import Pudins from "./pages/Pudins.jsx";
import Especiais from "./pages/Especiais.jsx";
import Geladinhos from "./pages/Geladinhos.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/escolha" element={<EscolhaCategoria />} />
      <Route path="/pudins" element={<Pudins />} />
      <Route path="/especiais" element={<Especiais />} />
      <Route path="/geladinhos" element={<Geladinhos />} />
    </Routes>
  );
}
