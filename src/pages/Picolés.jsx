import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import MenuFlutuante from "../components/MenuFlutuante";
import ChuvaAnimada from "../components/ChuvaAnimada";

export default function Picolés() {
  const [produtos, setProdutos] = useState([]);

  const textosPoeticos = {
    "Pudim de Chocolate Branco com Caramelo Crocante":
      "Um picolé cremoso sabor pudim tradicional, trufado com calda de caramelo, cobertura com uma camada de chocolate branco com caramelo crocante",

    "Pudim de Chocolate ao Leite":
      "Um picolé cremoso sabor pudim tradicional, trufado com calda de caramelo, cobertura com uma camada crocante de chocolate ao leite",

    Prestígio:
      "Um picolé cremoso sabor Prestígio, trufado com creme de brigadeiro, coberto com uma camada crocante de chocolate ao leite",

    "Ninho com Nutella":
      "Um picolé cremoso sabor ninho, trufado com Nutella, coberto com uma camada crocante de chocolate ao leite.",
  };

  useEffect(() => {
    document.title = "Picolés | Delicias no Pote";
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("products_ofc")
        .select("*")
        .eq("category_id", "48bb168c-9488-49e7-b4bd-d3d077997184");

      if (error) {
        console.error(error);
      } else {
        setProdutos(data);
      }
    };

    fetchProdutos();
  }, []);

  const scrollToProduct = (id) => {
    const elemento = document.getElementById(`prod-${id}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "center" });
      elemento.classList.add("destaque-picole");
      setTimeout(() => {
        elemento.classList.remove("destaque-picole");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-pink-100 relative flex flex-col items-center z-[1]">
      <h1 className="titulo-cardapio text-pudimGelado">🍧 Picolés Gourmet</h1>

      <div className="caixas-poeticas-container mb-10">
        {Object.entries(textosPoeticos).map(([nome, texto]) => {
          const produtoAlvo = produtos.find(
            (p) => p.name.toLowerCase() === nome.toLowerCase(),
          );

          return (
            <div
              key={nome}
              className="caixa-poetica bg-[#fff8e7] shadow-md rounded-lg p-4 mb-4 flex flex-col items-center"
            >
              <h3 className="poetico-nome text-[#5a3e2b]">{nome}</h3>
              <p className="poetico-texto text-[#3b82f6] text-center mb-4">
                {texto}
              </p>

              {produtoAlvo && (
                <button
                  onClick={() => scrollToProduct(produtoAlvo.id)}
                  className="btn-ver-produto-picole"
                >
                  Quero esse! 🍧
                </button>
              )}
            </div>
          );
        })}
      </div>

      <section className="secao-cardapio">
        <div className="grid-cardapio">
          {produtos.map((item) => (
            <div
              key={item.id}
              id={`prod-${item.id}`}
              className="card-item card-picole produto-card relative bg-gradient-to-b from-[#f5deb3] to-[#a7c7e7]"
            >
              <img
                src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/produtos/${item.image_url}`}
                alt={item.name}
                className="foto-produto"
              />

              <h3 className="text-[#5a3e2b]">{item.name}</h3>

              <div className="preco-container">
                {item.price.split("|").map((opcao, i) => {
                  const partes = opcao.trim().split(" R$");
                  return (
                    <div key={i} className="preco-linha">
                      {partes.length > 1 ? (
                        <>
                          <span className="tag-peso">{partes[0]}</span>
                          <span className="tag-preco">R${partes[1]}</span>
                        </>
                      ) : (
                        <span className="tag-preco">{partes[0]}</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MenuFlutuante />
      <ChuvaAnimada emoji="🍧" quantidade={12} cor="#a7c7e7" duracao={60} />
    </div>
  );
}
