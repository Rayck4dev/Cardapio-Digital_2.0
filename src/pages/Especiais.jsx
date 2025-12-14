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


  return (
    <div className="min-h-screen w-full fundo-pudins relative flex flex-col items-center px-4 py-12 z-[1]">
      <h1 className="titulo-especial">✨ Especiais</h1>

      <div className="caixas-poeticas-container">
        {Object.entries(textosPoeticos).map(([nome, texto]) => (
          <div key={nome} className="caixa-poetica">
            <h3 className="poetico-nome"> {nome}</h3>
            <p className="poetico-texto">{texto}</p>
          </div>
        ))}
      </div>

      <section className="secao-cardapio">
        <div className="grid-cardapio">
          {produtos.map((item) => (
            <div
              key={item.id}
              className="card-item produto-card card-especiais relative"
            >
              {/* ✅ Bannerzinho */}
              {item.tipo && (
                <div className={`tag-especial-tipo ${item.tipo}`}>
                  {item.tipo === "copo" && "Copo"}
                  {item.tipo === "travessa" && "Travessa"}
                  {item.tipo === "porcao" && "Porção Individual"}
                </div>
              )}

              {/* ✅ Imagem */}
              <img
                src={`/photos/${item.image_url}`}
                alt={item.name}
                className="foto-produto"
              />

              {/* ✅ Nome */}
              <h3>{item.name}</h3>

              {/* ✅ Preços */}
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
      <ChuvaAnimada emoji="🌟" quantidade={18} cor="#a89be0" duracao={60} />
    </div>
  );
}
