import { useEffect } from "react";
import logo from "../assets/LOGOSVG.svg";
import fundo from "../assets/fundoatual.png";
import EmojiRain from "../components/EmojiRain.jsx";
import HiddenAdminTrigger from "../components/HiddenAdminTrigger.jsx";
import { FaWhatsapp, FaInstagram, FaUtensils } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    document.title = "Delicias no Pote";
  }, []);

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center text-center px-4 py-8 relative "
      style={{
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* LOGO ENVOLVIDA PELO ATALHO SECRETO */}
      <HiddenAdminTrigger>
        <div className="bg-white p-2 rounded-[20%] border-8 border-[#ffffff] shadow-[0_4px_12px_rgba(0,0,0,0.2)] h-[120px] w-[120px] flex items-center justify-center overflow-hidden mt-6 mb-4 z-[1] relative">
          <img
            src={logo}
            alt="Logo Delícias no Pote"
            className="h-full w-full object-contain"
          />
        </div>
      </HiddenAdminTrigger>

      <h1
        style={{ fontFamily: '"Caveat Brush", cursive', color: "#401900" }}
        className="text-[3.2em] mb-[5px]"
      >
        Delícias no Pote
      </h1>

      <EmojiRain />

      <p
        style={{
          fontFamily: '"Caveat Brush", cursive',
          color: "#c4722d",
          fontWeight: "bold",
        }}
        className="text-[1.8em] m-[5px] z-[1]"
      >
        Produção Artesanal
      </p>

      <div className="flex flex-col items-center gap-[15px] mt-[35px] z-[1]">
        <a
          href="/escolha"
          style={{ fontFamily: '"Caveat Brush", cursive', fontWeight: "bold" }}
          className="flex items-center justify-center gap-[0.5rem] text-[#000000] bg-[#ffbcbe] hover:bg-[#ffa4a7] text-[1.3em] px-[100px] py-[15px] rounded-[15px] border border-[#ffaaad] shadow-[0_4px_8px_rgba(0,0,0,0.2)] m-[10px] no-underline transition duration-300"
        >
          <FaUtensils /> CARDÁPIO
        </a>

        <a
          href="https://wa.link/ek35qv"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: '"Caveat Brush", cursive', fontWeight: "bold" }}
          className="flex items-center justify-center gap-[0.5rem] text-[#000000] bg-[#ffbcbe] hover:bg-[#ffa4a7] text-[1.3em] px-[100px] py-[15px] rounded-[15px] border border-[#ffaaad] shadow-[0_4px_8px_rgba(0,0,0,0.2)] m-[10px] no-underline transition duration-300"
        >
          <FaWhatsapp /> WHATSAPP
        </a>

        <a
          href="https://instagram.com/deliciasnopote.rm"
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontFamily: '"Caveat Brush", cursive', fontWeight: "bold" }}
          className="flex items-center justify-center gap-[0.5rem] text-[#000000] bg-[#ffbcbe] hover:bg-[#ffa4a7] text-[1.3em] px-[100px] py-[15px] rounded-[15px] border border-[#ffaaad] shadow-[0_4px_8px_rgba(0,0,0,0.2)] m-[10px] no-underline transition duration-300"
        >
          <FaInstagram /> INSTAGRAM
        </a>
      </div>
    </div>
  );
}
