export default function TypeSelect({ onChange }) {
  return (
    <select onChange={onChange}>
      <option value="">Selecione o tipo</option>
      <option value="porcao">Porção Individual</option>
      <option value="copo">Copo</option>
      <option value="travessa">Travessa</option>
      <option value="">Nenhum</option>
    </select>
  );
}
