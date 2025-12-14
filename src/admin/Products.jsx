import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

export default function Produtos() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregarProdutos() {
    setLoading(true);

    const { data, error } = await supabase
      .from("products_ofc")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar produtos");
      setLoading(false);
      return;
    }

    setProdutos(data);
    setLoading(false);
  }

  useEffect(() => {
    document.title = "Produtos | Painel ADM";
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, []);

  return (
    <div className="produtos-container">
      <div className="produtos-header">
        <h1>Todos os Produtos</h1>

        <button className="produtos-add" onClick={() => navigate("/admin/adicionar")}>
          + Adicionar Produto
        </button>
      </div>

      {loading ? (
        <div className="produtos-loading">
          <ClipLoader size={40} color="#ff9f1c" />
        </div>
      ) : (
        <div className="produtos-grid">
          {produtos.map((p) => (
            <div key={p.id} className="produto-card">
              <img
                src={`${SUPABASE_URL}/storage/v1/object/public/produtos/${p.image_url}`}
                alt={p.name}
                className="produto-img"
              />

              <h3>{p.name}</h3>

              <div className="preco-container">
                {p.price.split("|").map((opcao, i) => {
                  const partes = opcao.trim().split(" R$");

                  if (partes.length === 1) {
                    return (
                      <div key={i} className="preco-linha">
                        <span className="tag-preco">{partes[0]}</span>
                      </div>
                    );
                  }

                  const pesoOuTipo = partes[0];
                  const valor = partes[1];

                  return (
                    <div key={i} className="preco-linha">
                      <span className="tag-peso">{pesoOuTipo}</span>
                      <span className="tag-preco">R${valor}</span>
                    </div>
                  );
                })}
              </div>
              <div className="produto-actions">
                <button
                  className="produto-editar"
                  onClick={() => navigate(`/admin/produtos/editar/${p.id}`)}
                >
                  Editar
                </button>

                <button
                  className="produto-excluir"
                  onClick={() => excluirProduto(p.id, p.image_url)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button
        type="button"
        className="paineladicionar-voltar"
        onClick={() => navigate("/admin")}
      >
        Voltar ao Painel
      </button>
    </div>
  );
}
