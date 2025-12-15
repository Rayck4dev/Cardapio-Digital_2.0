export default function ImageUploaderEdit({ novaImagem, setNovaImagem }) {
  return (
    <>
      <label htmlFor="novaImagem" className="botao-imagem">
        Trocar imagem
      </label>

      <input
        id="novaImagem"
        type="file"
        accept="image/*"
        onChange={(e) => setNovaImagem(e.target.files[0])}
        style={{ display: "none" }}
      />
    </>
  );
}
