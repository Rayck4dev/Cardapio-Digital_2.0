import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import MenuFlutuante from "../components/MenuFlutuante";
import ChuvaAnimada from "../components/ChuvaAnimada";
import { textosPoeticos } from "../types/textospoeticos";

export default function Especiais() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    document.title = "Especiais | Delicias no Pote";
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("products_ofc")
        .select("*")
        .eq("category_id", "bc4db9b9-6080-4956-a2eb-0dd431ea30b2");

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

      elemento.classList.add("destaque-card");
      setTimeout(() => {
        elemento.classList.remove("destaque-card");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen w-full fundo-pudins relative flex flex-col items-center z-[1]">
      <h1 className="titulo-especial">✨ Especiais</h1>

      <div className="caixas-poeticas-container">
        {Object.entries(textosPoeticos).map(([nome, texto]) => {
          const produtosRelacionados = produtos.filter(
            (p) => p.name.toLowerCase() === nome.toLowerCase(),
          );

          return (
            <div key={nome} className="caixa-poetica">
              <h3 className="poetico-nome">{nome}</h3>
              <p className="poetico-texto">{texto}</p>

              {produtosRelacionados.length > 0 && (
                <div className="container-botoes-atalho">
                  <p className="label-atalho">Ver opções disponíveis:</p>
                  <div className="flex-botoes-atalho">
                    {produtosRelacionados.map((prod) => (
                      <button
                        key={prod.id}
                        className={`btn-atalho ${prod.tipo}`}
                        onClick={() => scrollToProduct(prod.id)}
                      >
                        {prod.tipo === "copo" && "🥤 Copo"}
                        {prod.tipo === "travessa" && " 🥣 Travessa"}
                        {prod.tipo === "porcao" && "🍰 Individual"}
                        {!["copo", "travessa", "porcao"].includes(prod.tipo) &&
                          "✨ Ver"}
                      </button>
                    ))}
                  </div>
                </div>
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
              className="card-item produto-card card-especiais relative"
            >
              {item.tipo && (
                <div className={`tag-especial-tipo ${item.tipo}`}>
                  {item.tipo === "copo" && "Copo"}
                  {item.tipo === "travessa" && "Travessa"}
                  {item.tipo === "porcao" && "Porção Individual"}
                </div>
              )}

              <img
                src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/produtos/${item.image_url}`}
                alt={item.name}
                className="foto-produto"
              />

              <h3>{item.name}</h3>

              <div className="preco-container">
                {item.price.split("|").map((opcao, i) => {
                  const partes = opcao.trim().split(" R$");

                  if (partes.length === 1) {
                    return (
                      <div key={i} className="preco-linha">
                        <span className="tag-preco">{partes[0]}</span>
                      </div>
                    );
                  }

                  return (
                    <div key={i} className="preco-linha">
                      <span className="tag-peso">{partes[0]}</span>
                      <span className="tag-preco">R${partes[1]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <MenuFlutuante />
      <ChuvaAnimada emoji="🌟" quantidade={18} cor="#a89be0" duracao={60} />
    </div>
  );
}
