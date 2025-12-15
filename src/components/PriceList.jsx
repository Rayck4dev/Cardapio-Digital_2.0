export default function PriceList({ precos, setPrecos, formatarValor }) {
  function adicionarPreco() {
    setPrecos([...precos, { label: "", valor: "" }]);
  }

  function removerPreco(index) {
    const novaLista = precos.filter((_, i) => i !== index);
    setPrecos(novaLista);
  }

  function atualizarPreco(index, campo, valor) {
    const novaLista = [...precos];
    novaLista[index][campo] = valor;
    setPrecos(novaLista);
  }

  return (
    <div className="precos-dinamicos">
      {precos.map((p, index) => (
        <div key={index} className="linha-preco">
          <input
            type="text"
            placeholder="Ex: 500g"
            value={p.label}
            onChange={(e) => atualizarPreco(index, "label", e.target.value)}
          />

          <input
            type="text"
            placeholder="Valor (ex: 9,99)"
            value={p.valor}
            onChange={(e) =>
              atualizarPreco(index, "valor", formatarValor(e.target.value))
            }
          />

          {index > 0 && (
            <button
              type="button"
              className="remover-preco"
              onClick={() => removerPreco(index)}
            >
              X
            </button>
          )}
        </div>
      ))}

      <button type="button" className="add-preco" onClick={adicionarPreco}>
        + Adicionar preço
      </button>
    </div>
  );
}
