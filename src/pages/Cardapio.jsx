import fundo from "../assets/fundoatual.png";
import { pudins, especiais, geladinhos } from "../types/categorias.js";

export default function Cardapio() {
  const categorias = [
    { titulo: "🍮Pudins Gourmets", itens: pudins },
    { titulo: "✨Especiais", itens: especiais },
    { titulo: "❄️Geladinhos Gourmets", itens: geladinhos },
  ];

  return (
    <div
      className="min-h-screen w-full px-4 py-8 flex flex-col items-center"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="min-h-screen w-full px-4 py-8 flex flex-col items-center fundo-suave"></div>
      <h1 className="titulo-cardapio">Bem Vindo(a) ao Cardápio!</h1>

      {categorias.map((categoria, index) => (
        <section key={index} className="secao-cardapio">
          <h2 className="subtitulo-cardapio">{categoria.titulo}</h2>
          <div className="grid-cardapio">
            {categoria.itens.map((item, i) => (
              <div key={i} className="card-item">
                {Array.isArray(item.imagem) ? (
                  item.imagem.map((img, j) => (
                    <img
                      key={j}
                      src={img}
                      alt={`${item.nome} ${j + 1}`}
                      className="foto-produto"
                    />
                  ))
                ) : (
                  <img
                    src={item.imagem}
                    alt={item.nome}
                    className="foto-produto"
                  />
                )}
                <h3>{item.nome}</h3>
                <p>{item.preco}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
