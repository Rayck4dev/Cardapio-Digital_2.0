import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

import Filtros from "../components/Filtros";
import ProductsGrid from "../components/ProductsGrid";

export default function Produtos() {
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);

  const [loading, setLoading] = useState(true);

  const [filtroNome, setFiltroNome] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("");

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

  async function carregarCategorias() {
    const { data, error } = await supabase.from("categories_ofc").select("*");

    if (error) {
      toast.error("Erro ao carregar categorias");
      return;
    }

    setCategorias(data);
  }

  useEffect(() => {
    document.title = "Produtos | Painel ADM";
    carregarCategorias();
    carregarProdutos();
  }, []);

  async function excluirProduto(id, image_url) {
    const confirm = await Swal.fire({
      title: "Tem certeza?",
      text: "Você deseja excluir este produto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e1002a",
      cancelButtonColor: "#888",
      background: "#fff0f5",
    });

    if (!confirm.isConfirmed) return;

    const { error } = await supabase.from("products_ofc").delete().eq("id", id);

    if (error) {
      Swal.fire("Erro", "Não foi possível excluir o produto.", "error");
      return;
    }

    await supabase.storage.from("produtos").remove([image_url]);

    Swal.fire({
      title: "Excluído!",
      text: "O produto foi removido com sucesso.",
      icon: "success",
      confirmButtonColor: "#c4722d",
    });

    carregarProdutos();
  }

  const produtosFiltrados = produtos
    .filter((p) => p.name.toLowerCase().includes(filtroNome.toLowerCase()))
    .filter((p) => (filtroCategoria ? p.category_id == filtroCategoria : true))
    .filter((p) => (filtroTipo ? p.tipo === filtroTipo : true));

  return (
    <div className="produtos-container">
      <div className="produtos-header">
        <h1>Todos os Produtos</h1>

        <button
          className="produtos-add"
          onClick={() => navigate("/admin/adicionar")}
        >
          + Adicionar Produto
        </button>
      </div>

      <Filtros
        filtroNome={filtroNome}
        setFiltroNome={setFiltroNome}
        filtroCategoria={filtroCategoria}
        setFiltroCategoria={setFiltroCategoria}
        filtroTipo={filtroTipo}
        setFiltroTipo={setFiltroTipo}
        categorias={categorias}
      />

      {loading ? (
        <div className="loading-overlay">
          <ClipLoader size={60} color="#ff4fa3" />
        </div>
      ) : (
        <ProductsGrid
          produtosFiltrados={produtosFiltrados}
          SUPABASE_URL={SUPABASE_URL}
          navigate={navigate}
          excluirProduto={excluirProduto}
        />
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
