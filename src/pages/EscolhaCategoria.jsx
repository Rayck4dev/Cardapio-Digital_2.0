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
        "text-[#5c2c00] bg-[#fff0e5] hover:bg-[#ffe5d9] border border-[#f7c59f] shadow-[0_4px_8px_rgba(0,0,0,0.2)]",
    },
    {
      id: "especiais",
      emoji: "✨",
      nome: "Especiais",
      estilo:
        "text-[#3c2a6e] bg-[#f0f0ff] hover:bg-[#e5e5ff] border border-[#c2b6ff] shadow-[0_4px_8px_rgba(0,0,0,0.2)]",
    },
    {
      id: "geladinhos",
      emoji: "❄️",
      nome: "Geladinhos Gourmets",
      estilo:
        "text-[#004d66] bg-[#e0f7ff] hover:bg-[#d0f0ff] border border-[#a0e0ff] shadow-[0_4px_8px_rgba(0,0,0,0.2)]",
    },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start px-4 py-12"
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Logo */}
      <div className="bg-white p-2 rounded-[20%] border-8 border-[#ffffff] shadow-[0_4px_12px_rgba(0,0,0,0.2)] h-[120px] w-[120px] flex items-center justify-center overflow-hidden mt-[40px] mb-4">
        <a href="/">
          <img
            src={logo}
            alt="Logo Delícias no Pote"
            className="h-full w-full object-contain"
          />
        </a>
      </div>

      <h1
        style={{ fontFamily: '"Caveat Brush", cursive', color: "#401900" }}
        className="text-[3.2em] mb-[5px]"
      >
        Delícias no Pote
      </h1>

      <h2
        className="text-[2.2em] text-[#c4722d] mt-[5px] text-center p-[12px]"
        style={{
          fontFamily: '"Emilys Candy"',
        }}
      >
        O que adoça seu dia hoje?
      </h2>

      <div className="flex flex-col text-center gap-[15px] ">
        {categorias.map((cat) => (
          <Link
            key={cat.id}
            to={`/${cat.id}`}
            style={{
              fontFamily: '"Caveat Brush", cursive',
              fontWeight: "bold",
            }}
            className={`text-[1.5em] px-[40px] py-[15px] rounded-[15px] mb-[10px] no-underline transition duration-300 botao-hover ${cat.estilo} sombra-${cat.id}`}
          >
            {cat.emoji} {cat.nome}
          </Link>
        ))}
      </div>

      <ChuvaAnimada emoji="🍮" quantidade={15} cor="#db9e32" duracao={60} />

      <p
        className="text-[1.3rem] text-[#401900] p-[12px] text-center max-w-md"
        style={{
          fontFamily: '"Emilys Candy"',
          fontWeight: "Bold",
        }}
      >
        Escolha uma categoria deliciosa e descubra nossas opções artesanais
        feitas com carinho 💖
      </p>
    </div>
  );
}
