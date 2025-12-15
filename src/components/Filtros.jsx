export default function Filtros({
  filtroNome,
  setFiltroNome,
  filtroCategoria,
  setFiltroCategoria,
  filtroTipo,
  setFiltroTipo,
  categorias,
}) {
  return (
    <div className="filtros-container">
      <input
        type="text"
        placeholder="Buscar por nome..."
        className="filtro-input"
        value={filtroNome}
        onChange={(e) => setFiltroNome(e.target.value)}
      />

      <select
        className="filtro-select"
        value={filtroCategoria}
        onChange={(e) => setFiltroCategoria(e.target.value)}
      >
        <option value="">Todas as categorias</option>
        {categorias.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <select
        className="filtro-select"
        value={filtroTipo}
        onChange={(e) => setFiltroTipo(e.target.value)}
      >
        <option value="">Todos os tipos</option>
        <option value="porcao">Porção Individual</option>
        <option value="copo">Copo</option>
        <option value="travessa">Travessa</option>
      </select>
    </div>
  );
}
