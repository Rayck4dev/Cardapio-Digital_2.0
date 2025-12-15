export default function ProdutoCard({
  p,
  SUPABASE_URL,
  navigate,
  excluirProduto,
}) {
  return (
    <div className="produto-card">
      <img
        src={`${SUPABASE_URL}/storage/v1/object/public/produtos/${p.image_url}`}
        alt={p.name}
        className="produto-img"
      />

      <h3>{p.name}</h3>

      <div className="preco-container">
        {p.price.split("|").map((opcao, i) => {
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

      <div className="produto-actions">
        <button
          className="produto-editar"
          onClick={() => navigate(`/admin/produtos/editar/${p.id}`)}
        >
          Editar
        </button>

        <button
          className="produto-excluir"
          onClick={() => excluirProduto(p.id, p.image_url)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}
