import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import fundo from "../assets/fundoatual.png";

export default function DashboardHome() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Painel Administrativo | Delicias no Pote";
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="paineladmin-global paineladmin-wrapper max-w-xl w-full">

        <div className="paineladmin-header">
          <h1>Bem-Vinda, Andressa!🍓</h1>

          <button className="logout-btn" onClick={handleLogout}>
            Sair
          </button>
        </div>

        <p>O que você deseja fazer hoje?</p>

        <div className="paineladmin-opcoes">
          <Link to="/admin/produtos" className="paineladmin-card">
            <span>📦</span>
            <h2>Todos os Produtos</h2>
            <p>Veja tudo que está cadastrado e gerencie seus produtos</p>
          </Link>

          <Link to="/admin/adicionar" className="paineladmin-card">
            <span>➕</span>
            <h2>Adicionar Produto</h2>
            <p>Cadastre um novo item</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
