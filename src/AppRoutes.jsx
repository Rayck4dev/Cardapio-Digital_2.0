import { Routes, Route } from "react-router-dom";
import RequireAuth from "./private/RequireAuth.jsx";

// Rotas públicas
import Home from "./pages/Home.jsx";
import EscolhaCategoria from "./pages/EscolhaCategoria.jsx";
import Pudins from "./pages/Pudins.jsx";
import Especiais from "./pages/Especiais.jsx";
import Geladinhos from "./pages/Geladinhos.jsx";

// Rotas da ADM
import Dashboard from "../src/admin/Dashboard.jsx";
import AddProduto from "../src/admin/AddProduct.jsx";
import Produtos from "./admin/Products.jsx";
import EditarProduto from "./admin/EditProduct.jsx";

import Login from "./auth/Login.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* ✅ Rotas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/escolha" element={<EscolhaCategoria />} />
      <Route path="/pudins" element={<Pudins />} />
      <Route path="/especiais" element={<Especiais />} />
      <Route path="/geladinhos" element={<Geladinhos />} />

      {/* ✅ Rotas da ADM */}
      <Route
        path="/admin"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/adicionar"
        element={
          <RequireAuth>
            <AddProduto />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/produtos"
        element={
          <RequireAuth>
            <Produtos />
          </RequireAuth>
        }
      />

      <Route
        path="/admin/produtos/editar/:id"
        element={
          <RequireAuth>
            <EditarProduto />
          </RequireAuth>
        }
      />
    </Routes>
  );
}
