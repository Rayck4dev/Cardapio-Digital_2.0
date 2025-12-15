import { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const emailLimpo = email.trim();
    const senhaLimpa = senha.trim();

    const { error } = await supabase.auth.signInWithPassword({
      email: emailLimpo,
      password: senhaLimpa,
    });

    if (error) {
      toast.error("Email ou senha incorretos");
      setLoading(false);
      return;
    }

    toast.success("Bem-vinda!");

    setTimeout(() => {
      navigate("/admin");
    }, 150);
  }

  return (
    <div className="login-container">
      <h1>Entrar</h1>

      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="senha-wrapper" style={{ position: "relative" }}>
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <span
            onClick={() => setMostrarSenha(!mostrarSenha)}
            style={{
              position: "absolute",
              right: "1px",
              top: "45%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "1.4rem",
            }}
          >
            {mostrarSenha ? "👁️" : "🍓"}
          </span>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? <ClipLoader size={22} color="#fff" /> : "Entrar"}
        </button>
      </form>
    </div>
  );
}
