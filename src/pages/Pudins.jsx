import { pudins } from "../types/categorias";
import MenuFlutuante from "../components/MenuFlutuante";
import ChuvaAnimada from "../components/ChuvaAnimada";

export default function Pudins() {
  return (
    <div className="min-h-screen w-full fundo-pudins relative flex flex-col items-center px-4 py-12 z-[1]">
      <h1 className="titulo-cardapio">🍮 Pudins Gourmets</h1>

      <section className="secao-cardapio">
        <div className="grid-cardapio">
          {pudins.map((item, index) => (
            <div key={index} className="card-item card-pudins">
              <img src={item.imagem} alt={item.nome} className="foto-produto" />
              <h3>{item.nome}</h3>
              <p>{item.preco}</p>
            </div>
          ))}
        </div>
      </section>

      <MenuFlutuante />

      <ChuvaAnimada emoji="🍮" quantidade={15} cor="#db9e32" duracao={60} />
    </div>
  );
}

