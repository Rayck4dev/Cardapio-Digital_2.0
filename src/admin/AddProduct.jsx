import { useState, useEffect, useRef } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

import PriceList from "../components/PriceList";
import ImageUploader from "../components/ImageUploader";
import CategorySelect from "../components/CategorySelect";
import TypeSelect from "../components/TypeSelect";

export default function AddProduto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category_id: "",
    tipo: "",
  });

  const [precos, setPrecos] = useState([{ label: "", valor: "" }]);
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function carregarCategorias() {
      const { data, error } = await supabase.from("categories_ofc").select("*");
      if (!error) setCategorias(data);
    }
    carregarCategorias();
  }, []);

  useEffect(() => {
    document.title = "Adicionar Produto | Painel ADM";
  }, []);

  function removerImagem() {
    setFoto(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function formatarValor(valor) {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = (parseInt(apenasNumeros, 10) || 0) / 100;

    return numero.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageError("");

    try {
      if (!foto) {
        setLoading(false);
        setImageError("Selecione uma imagem antes de salvar.");
        return;
      }

      const fileName = `${Date.now()}_${foto.name}`;

      const { error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(fileName, foto);

      if (uploadError) {
        setLoading(false);
        return;
      }

      const precoFinal = precos
        .filter((p) => p.valor)
        .map((p) => (p.label ? `${p.label} R$${p.valor}` : `R$${p.valor}`))
        .join(" | ");

      const { error } = await supabase.from("products_ofc").insert([
        {
          ...form,
          price: precoFinal,
          image_url: fileName,
        },
      ]);

      if (!error) {
        navigate("/admin/produtos");
      }

      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-overlay">
        <ClipLoader size={60} color="#ff4fa3" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center paineladicionar-bg">
      <div className="paineladicionar-wrapper max-w-xl w-full">
        <h1>Adicionar Produto</h1>
        <p>Preencha os dados abaixo para cadastrar um novo item</p>

        <form onSubmit={handleSubmit} className="paineladicionar-form">
          <input
            type="text"
            placeholder="Sabor"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />

          <CategorySelect
            categorias={categorias}
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          />

          <TypeSelect
            onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          />

          <PriceList
            precos={precos}
            setPrecos={setPrecos}
            formatarValor={formatarValor}
          />

          <ImageUploader
            foto={foto}
            setFoto={setFoto}
            preview={preview}
            setPreview={setPreview}
            fileInputRef={fileInputRef}
            removerImagem={removerImagem}
          />

          {imageError && <p className="paineladicionar-erro">{imageError}</p>}

          <button className="paineladicionar-botao" type="submit">
            Salvar Produto
          </button>
        </form>

        <div className="paineladicionar-voltar-container">
          <button
            type="button"
            className="paineladicionar-voltar"
            onClick={() => navigate("/admin")}
          >
            Voltar ao Painel
          </button>
        </div>
      </div>
    </div>
  );
}
