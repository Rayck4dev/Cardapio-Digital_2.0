import { useState } from "react";
import { FaArrowUp, FaHome, FaWhatsapp, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function MenuFlutuante() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const voltarTopo = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-[1.5em] right-[1.5em] flex flex-col items-center gap-[1em] z-[50] md:hidden">
      {open && (
        <>
          {/* Botão Topo */}
          <button
            onClick={voltarTopo}
            style={{
              backgroundColor: "#f7c59f",
              border: "2px solid #db9e32",
              animationDelay: "0.1s",
            }}
            className="botao-animado p-[1em] rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition duration-[300ms]"
          >
            <FaArrowUp size={20} />
          </button>

          {/* Botão Home */}
          <button
            onClick={() => navigate("/escolha")}
            style={{
              backgroundColor: "#f7c59f",
              border: "2px solid #c4722d",
              animationDelay: "0.25s",
            }}
            className="botao-animado p-[1em] rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition duration-[300ms]"
          >
            <FaHome size={20} color="#401900" />
          </button>

          {/* Botão WhatsApp */}
          <a
            href="https://wa.me/556999974993"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              backgroundColor: "#25D366",
              border: "2px solid #4DAB8C",
              animationDelay: "0.4s",
            }}
            className="botao-animado p-[1em] rounded-[8px] shadow-[0_4px_8px_rgba(0,0,0,0.2)] transition duration-[300ms]"
          >
            <FaWhatsapp size={20} color="#401900" />
          </a>
        </>
      )}

      {/* Botão principal */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          backgroundColor: "#c4722d",
          border: "2px solid #db9e32",
        }}
        className="text-white p-[1.2em] rounded-[8px] shadow-[0_6px_12px_rgba(0,0,0,0.25)] hover:opacity-80 transition duration-[300ms]"
      >
        <FaBars size={22} color="#ffffff" />
      </button>
    </div>
  );
}
