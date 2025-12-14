import { useState, useEffect, useRef } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

export default function AddProduto() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category_id: "",
    tipo: "",
  });

  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function carregarCategorias() {
      const { data, error } = await supabase.from("categories_ofc").select("*");
      if (error) {
        toast.error("Erro ao carregar categorias");
        return;
      }
      setCategorias(data);
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

  function formatarPreco(valor) {
    const apenasNumeros = valor.replace(/\D/g, "");
    const numero = (parseInt(apenasNumeros, 10) || 0) / 100;
    return numero.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageError("");

    try {
      if (!foto) {
        setImageError("Selecione uma imagem antes de salvar.");
        toast.error("Você precisa selecionar uma imagem.");
        return;
      }

      const fileName = `${Date.now()}_${foto.name}`;

      const { error: uploadError } = await supabase.storage
        .from("produtos") 
        .upload(fileName, foto, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error("Erro upload:", uploadError); 
        toast.error("Erro ao enviar a imagem.");
        return;
      }

      const { error } = await supabase.from("products_ofc").insert([
        {
          ...form,
          image_url: fileName,
        },
      ]);

      if (error) {
        console.error("Erro insert:", error);
        toast.error("Erro ao salvar o produto.");
        return;
      }

      toast.success("Produto adicionado com sucesso!");
      navigate("/admin/produtos");
    } finally {
      setLoading(false);
    }
  };

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

          <input
            type="text"
            placeholder="Preço"
            value={form.price}
            onChange={(e) => {
              const valorFormatado = formatarPreco(e.target.value);
              setForm({ ...form, price: valorFormatado });
            }}
            required
          />

          <select
            onChange={(e) => setForm({ ...form, category_id: e.target.value })}
            required
          >
            <option value="">Selecione a categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select onChange={(e) => setForm({ ...form, tipo: e.target.value })}>
            <option value="">Selecione o tipo</option>
            <option value="porcao">Porção Individual</option>
            <option value="copo">Copo</option>
            <option value="travessa">Travessa</option>
            <option value="">Nenhum</option>
          </select>

          <label htmlFor="foto" className="paineladicionar-upload-label">
            Escolher imagem
          </label>

          <input
            type="file"
            id="foto"
            ref={fileInputRef}
            className="paineladicionar-upload-input"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setFoto(file);
              setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <div className="paineladicionar-preview-container">
              <img src={preview} className="paineladicionar-preview" />
              <button
                type="button"
                className="paineladicionar-remover"
                onClick={removerImagem}
              >
                Remover imagem
              </button>
            </div>
          )}

          {imageError && <p className="paineladicionar-erro">{imageError}</p>}

          <button
            className="paineladicionar-botao"
            type="submit"
            disabled={loading}
          >
            {loading ? <ClipLoader size={22} color="#fff" /> : "Salvar Produto"}
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
