import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

import PriceList from "../components/PriceList";
import ImageUploaderEdit from "../components/ImageUploaderEdit";
import CategorySelect from "../components/CategorySelect";
import TypeSelect from "../components/TypeSelect";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

  const [produto, setProduto] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [precos, setPrecos] = useState([]);

  useEffect(() => {
    async function carregarCategorias() {
      const { data } = await supabase.from("categories_ofc").select("*");
      setCategorias(data || []);
    }
    carregarCategorias();
  }, []);

  async function carregarProduto() {
    const { data, error } = await supabase
      .from("products_ofc")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      Swal.fire("Erro", "Não foi possível carregar o produto.", "error");
      return;
    }

    setProduto(data);

    const lista = data.price
      ? data.price.split("|").map((item) => {
          const texto = item.trim();

          if (!texto) return { label: "", valor: "" };

          if (texto.startsWith("R$")) {
            return {
              label: "",
              valor: texto.replace("R$", "").trim(),
            };
          }

          const partes = texto.split(" R$");
          return {
            label: partes[0] || "",
            valor: partes[1]?.trim() || "",
          };
        })
      : [{ label: "", valor: "" }];

    setPrecos(lista);
  }

  useEffect(() => {
    document.title = "Edição | Painel ADM";
    carregarProduto();
  }, []);

  function formatarValor(valor) {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = (parseInt(apenasNumeros, 10) || 0) / 100;

    return numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  async function salvarAlteracoes() {
    let image_url = produto.image_url;

    if (novaImagem) {
      const fileName = `${Date.now()}_${novaImagem.name}`;

      const { error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(fileName, novaImagem, { upsert: true });

      if (uploadError) {
        Swal.fire("Erro", "Não foi possível enviar a imagem.", "error");
        return;
      }

      image_url = fileName;
    }

    const precoFinal = precos
      .filter((p) => p.valor)
      .map((p) =>
        p.label ? `${p.label} R$${p.valor}` : `R$${p.valor}`
      )
      .join(" | ");

    const { error } = await supabase
      .from("products_ofc")
      .update({
        name: produto.name,
        category_id: produto.category_id,
        tipo: produto.tipo,
        price: precoFinal,
        image_url,
      })
      .eq("id", id);

    if (error) {
      Swal.fire("Erro", "Não foi possível salvar as alterações.", "error");
      return;
    }

    Swal.fire("Produto salvo! 🍓", "Alterações aplicadas.", "success");
    navigate("/admin/produtos");
  }

  async function excluirProduto() {
    const confirm = await Swal.fire({
      title: "Excluir produto?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#e1002a",
    });

    if (!confirm.isConfirmed) return;

    if (produto.image_url) {
      await supabase.storage.from("produtos").remove([produto.image_url]);
    }

    await supabase.from("products_ofc").delete().eq("id", id);

    Swal.fire("Excluído!", "O produto foi removido.", "success");
    navigate("/admin/produtos");
  }

  if (!produto) {
    return (
      <div className="loading-overlay">
        <ClipLoader size={60} color="#ff4fa3" />
      </div>
    );
  }

  return (
    <div className="editar-container">
      <div className="produto-card editar-card">
        <img
          src={
            novaImagem
              ? URL.createObjectURL(novaImagem)
              : `${SUPABASE_URL}/storage/v1/object/public/produtos/${produto.image_url}`
          }
          alt={produto.name}
          className="editar-img"
        />

        <div className="editar-form">
          <label>Sabor</label>
          <input
            className="paineleditarinput"
            type="text"
            value={produto.name}
            onChange={(e) => setProduto({ ...produto, name: e.target.value })}
          />

          <label>Categoria</label>
          <CategorySelect
            categorias={categorias}
            value={produto.category_id}
            onChange={(e) =>
              setProduto({ ...produto, category_id: e.target.value })
            }
          />

          <label>Tipo</label>
          <TypeSelect
            value={produto.tipo || ""}
            onChange={(e) =>
              setProduto({ ...produto, tipo: e.target.value })
            }
          />

          <label>Pesos e Preços</label>
          <PriceList
            precos={precos}
            setPrecos={setPrecos}
            formatarValor={formatarValor}
          />

          <ImageUploaderEdit
            novaImagem={novaImagem}
            setNovaImagem={setNovaImagem}
          />

          <div className="editar-actions">
            <button className="editar-salvar" onClick={salvarAlteracoes}>
              Salvar Alterações
            </button>

            <button className="editar-excluir" onClick={excluirProduto}>
              Excluir Produto
            </button>

            <button
              type="button"
              className="editar-voltar"
              onClick={() => navigate("/admin/produtos")}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
