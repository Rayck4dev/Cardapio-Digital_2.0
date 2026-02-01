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
      className="min-h-screen w-full flex flex-col items-center justify-center text-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${fundo})` }}
    >
      <HiddenAdminTrigger>
        <div className="bg-white p-2 rounded-[20%] border-8 border-white shadow-lg h-[120px] w-[120px] flex items-center justify-center overflow-hidden mb-2 z-[1] relative">
          <img
            src={logo}
            alt="Logo Delícias no Pote"
            className="h-full w-full object-contain rounded-[20%] "
          />
        </div>
      </HiddenAdminTrigger>

      <h1 className="font-caveat text-[3.2em] mb-1 mt-6 text-[#401900]">
        Delícias no Pote
      </h1>

      <EmojiRain />

      <p className="font-caveat text-[1.8em] font-bold text-[#c4722d] m-1 z-[1]">
        Produção Artesanal
      </p>

      <div className="flex flex-col items-center gap-8 mt-10 z-[1]">
        <a
          href="/escolha"
          className="flex items-center justify-center gap-3 text-black bg-[#ffbcbe] hover:bg-[#ffa4a7] text-xl px-2 py-4 rounded-xl border border-[#ffaaad] shadow-md no-underline transition-transform duration-300 hover:scale-105 font-caveat font-bold w-[280px] sm:w-[320px]"
        >
          <FaUtensils className="text-2xl" /> CARDÁPIO
        </a>

        <a
          href="https://wa.link/ek35qv"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 text-black bg-[#ffbcbe] hover:bg-[#ffa4a7] text-xl px-2 py-4 rounded-xl border border-[#ffaaad] shadow-md no-underline transition-transform duration-300 hover:scale-105 font-caveat font-bold w-[280px] sm:w-[320px]"
        >
          <FaWhatsapp className="text-2xl" /> WHATSAPP
        </a>

        <a
          href="https://instagram.com/deliciasnopote.rm"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 text-black bg-[#ffbcbe] hover:bg-[#ffa4a7] text-xl px-2 py-4 rounded-xl border border-[#ffaaad] shadow-md no-underline transition-transform duration-300 hover:scale-105 font-caveat font-bold w-[280px] sm:w-[320px]"
        >
          <FaInstagram className="text-2xl" /> INSTAGRAM
        </a>
      </div>
    </div>
  );
}
