import { useEffect } from "react";
import fundo from "../assets/fundoatual.png";
import logo from "../assets/LOGOSVG.svg";
import { Link } from "react-router-dom";
import ChuvaAnimada from "../components/ChuvaAnimada";

export default function EscolhaCategoria() {
  useEffect(() => {
    document.title = "Categorias | Delicias no Pote";
  }, []);

  const categorias = [
    {
      id: "pudins",
      emoji: "🍮",
      nome: "Pudins Gourmets",
      estilo:
        "text-[#5c2c00] bg-[#fff0e5] hover:bg-[#ffe5d9] border border-[#f7c59f] shadow-md",
    },
    {
      id: "especiais",
      emoji: "✨",
      nome: "Especiais",
      estilo:
        "text-[#3c2a6e] bg-[#f0f0ff] hover:bg-[#e5e5ff] border border-[#c2b6ff] shadow-md",
    },
    {
      id: "geladinhos",
      emoji: "❄️",
      nome: "Geladinhos Gourmets",
      estilo:
        "text-[#004d66] bg-[#e0f7ff] hover:bg-[#d0f0ff] border border-[#a0e0ff] shadow-md",
    },
    {
      id: "picoles",
      emoji: "🍧",
      nome: "Picolés Gourmets",
      estilo:
        "text-pink-500 bg-[#ffd6e7] hover:bg-[#ffc2dd] border border-[#ff99cc] shadow-md",
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <div className="bg-white p-2 rounded-[20%] border-8 border-white shadow-lg h-[120px] w-[120px] flex items-center justify-center overflow-hidden mt-10 mb-4">
        <a href="/">
          <img
            src={logo}
            alt="Logo Delícias no Pote"
            className="h-full w-full object-contain rounded-[20%]"
          />
        </a>
      </div>

      <h1 className="font-caveat text-[3.2em] mb-1 mt-2 text-[#401900]">
        Delícias no Pote
      </h1>

      <h2 className="font-emilys text-[2.2em] text-[#c4722d] mt-1 mb-2 text-center p-3">
        O que adoça seu dia hoje?
      </h2>

      <div className="flex flex-col text-center gap-4 mt-6">
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            to={`/${cat.id}`}
            className={`font-caveat font-bold text-xl px-12 py-4 rounded-xl mb-2 no-underline transition-transform duration-300 hover:scale-105 ${cat.estilo}`}
          >
            {cat.emoji} {cat.nome}
          </Link>
        ))}
      </div>

      <ChuvaAnimada emoji="🍮" quantidade={15} cor="#db9e32" duracao={60} />

      <p className="font-emilys text-lg text-[#401900] p-3 text-center max-w-md font-bold mt-6">
        Escolha uma categoria deliciosa e descubra nossas opções artesanais
        feitas com carinho 💖
      </p>
    </div>
  );
}
