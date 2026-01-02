import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import MenuFlutuante from "../components/MenuFlutuante";
import ChuvaAnimada from "../components/ChuvaAnimada";

export default function Pudins() {
  useEffect(() => {
    document.title = "Pudins | Delicias no Pote";
  }, []);

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("products_ofc")
        .select("*")
        .eq("category_id", "7bf3f151-a575-4c7b-bf5c-57da2cc0af74")
        .order("ordem", { ascending: true });

      if (error) {
        console.error(error);
      } else {
        setProdutos(data);
      }
    };

    fetchProdutos();
  }, []);

  function estiloTipo(tipo) {
    const estilos = {
      porcao: {
        backgroundColor: "#FDE68A",
        color: "#92400E",
      },
      copo: {
        backgroundColor: "#FBCFE8",
        color: "#9D174D",
      },
      travessa: {
        backgroundColor: "#E0E7FF",
        color: "#3730A3",
      },
    };

    return (
      estilos[tipo] || {
        backgroundColor: "#f3f4f6",
        color: "#374151",
      }
    );
  }

  return (
    <div className="min-h-screen w-full fundo-pudins relative flex flex-col items-center px-4 py-12 z-[1]">
      <h1 className="titulo-cardapio">🍮 Pudins Gourmets</h1>

      <section className="secao-cardapio">
        <div className="grid-cardapio">
          {produtos.map((item) => (
            <div
              key={item.id}
              className="card-item produto-card card-pudins relative"
            >
              {item.tipo && (
                <div className={`tag-tipo ${item.tipo}`}>
                  {item.tipo === "porcao" && "Porção Individual"}
                  {item.tipo === "copo" && "Copo"}
                  {item.tipo === "travessa" && "Travessa"}
                </div>
              )}

              <img
                src={`${
                  import.meta.env.VITE_SUPABASE_URL
                }/storage/v1/object/public/produtos/${item.image_url}`}
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
            </div>
          ))}
        </div>
      </section>

      <MenuFlutuante />
      <ChuvaAnimada emoji="🍮" quantidade={15} cor="#db9e32" duracao={60} />
    </div>
  );
}
