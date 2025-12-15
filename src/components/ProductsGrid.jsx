import ProductCard from "../components/ProductCard";

export default function ProdutosGrid({
  produtosFiltrados,
  SUPABASE_URL,
  navigate,
  excluirProduto,
}) {
  return (
    <div className="produtos-grid">
      {produtosFiltrados.map((p) => (
        <ProductCard
          key={p.id}
          p={p}
          SUPABASE_URL={SUPABASE_URL}
          navigate={navigate}
          excluirProduto={excluirProduto}
        />
      ))}
    </div>
  );
}
