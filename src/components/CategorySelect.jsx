export default function CategorySelect({ categorias, onChange }) {
  return (
    <select onChange={onChange} required>
      <option value="">Selecione a categoria</option>
      {categorias.map((cat) => (
        <option key={cat.id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </select>
  );
}
