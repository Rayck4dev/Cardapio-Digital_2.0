import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";
import { toast } from "react-toastify";

export default function EditarProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

  const [produto, setProduto] = useState(null);
  const [novaImagem, setNovaImagem] = useState(null);

  async function carregarProduto() {
    const { data, error } = await supabase
      .from("products_ofc")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      toast.error("Erro ao carregar produto");
      return;
    }

    setProduto(data);
  }

  useEffect(() => {
    document.title = "Edição | Painel ADM";
  }, []);

  useEffect(() => {
    carregarProduto();
  }, []);

  function handleImageChange(e) {
    setNovaImagem(e.target.files[0]);
  }

  async function salvarAlteracoes() {
    let image_url = produto.image_url;

    // Se o usuário enviou nova imagem
    if (novaImagem) {
      const { error: uploadError } = await supabase.storage
        .from("produtos")
        .upload(novaImagem.name, novaImagem, { upsert: true });

      if (uploadError) {
        toast.error("Erro ao enviar imagem");
        return;
      }

      image_url = novaImagem.name;
    }

    const { error } = await supabase
      .from("products_ofc")
      .update({
        name: produto.name,
        price: produto.price,
        image_url,
      })
      .eq("id", id);

    if (error) {
      toast.error("Erro ao salvar alterações");
      return;
    }

    toast.success("Produto atualizado com sucesso!");
    navigate("/admin/produtos");
  }

  async function excluirProduto() {
    const confirmar = confirm("Tem certeza que deseja excluir este produto?");

    if (!confirmar) return;

    // excluir imagem
    if (produto.image_url) {
      await supabase.storage.from("produtos").remove([produto.image_url]);
    }

    const { error } = await supabase.from("products_ofc").delete().eq("id", id);

    if (error) {
      toast.error("Erro ao excluir produto");
      return;
    }

    toast.success("Produto excluído!");
    navigate("/admin/produtos");
  }

  if (!produto) return <p>Carregando...</p>;

  return (
    <div className="editar-container">
      <div className="produto-card editar-card editar-card">
        <img
          src={
            novaImagem
              ? URL.createObjectURL(novaImagem)
              : `${SUPABASE_URL}/storage/v1/object/public/produtos/${produto.image_url}`
          }
          alt={produto.name}
          className="editar-img"
        />

        <h3>{produto.name_ofc}</h3>

        <div className="preco-container">
          {produto.price.split("|").map((opcao, i) => {
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

        <div className="editar-form">
          <label>Sabor</label>
          <input
            type="text"
            value={produto.name}
            onChange={(e) => setProduto({ ...produto, name: e.target.value })}
          />

          <label>Preço</label>
          <textarea
            value={produto.price}
            onChange={(e) => setProduto({ ...produto, price: e.target.value })}
          />

          <label htmlFor="novaImagem" className="botao-imagem">
            Trocar imagem
          </label>
          <input
            id="novaImagem"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
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
