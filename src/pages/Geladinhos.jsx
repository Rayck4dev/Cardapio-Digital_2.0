import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import MenuFlutuante from "../components/MenuFlutuante";
import ChuvaAnimada from "../components/ChuvaAnimada";

export default function Geladinhos() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    document.title = "Geladinhos | Delicias no Pote";
  }, []);

  useEffect(() => {
    const fetchProdutos = async () => {
      const { data, error } = await supabase
        .from("products_ofc")
        .select("*")
        .eq("category_id", "466648c6-b173-4a33-a638-5571dbafe61f");

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
      <h1 className="titulo-cardapio">❄️ Geladinhos Gourmet</h1>

      <section className="secao-cardapio">
        <div className="grid-cardapio">
          {produtos.map((item) => (
            <div key={item.id} className="card-item card-geladinhos produto-card relative">

              <img
                src={`/photos/${item.image_url}`}
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
      <ChuvaAnimada emoji="❄️" quantidade={15} cor="#60a5fa" duracao={60} />
    </div>
  );
}
