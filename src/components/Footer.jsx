import { FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-90 bg-[#ffd6e7] border-t border-[#d4a373] py-4 px-6">
      <div className="w-90 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
        <a
          href="https://instagram.com/raycka_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-pink-600 hover:text-[#a0522d] transition-colors duration-300 font-audiowide text-sm sm:text-base"
        >
          <FaInstagram className="text-lg" />© 2026{" "}
          <span className="underline">Raycka DevLab</span>
        </a>
      </div>
    </footer>
  );
}
