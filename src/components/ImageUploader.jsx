export default function ImageUploader({
  foto,
  setFoto,
  preview,
  setPreview,
  fileInputRef,
  removerImagem,
}) {
  return (
    <>
      <label htmlFor="foto" className="paineladicionar-upload-label">
        Escolher imagem
      </label>

      <input
        type="file"
        id="foto"
        ref={fileInputRef}
        className="paineladicionar-upload-input"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (!file) return;
          setFoto(file);
          setPreview(URL.createObjectURL(file));
        }}
      />

      {preview && (
        <div className="paineladicionar-preview-container">
          <img src={preview} className="paineladicionar-preview" />
          <button
            type="button"
            className="paineladicionar-remover"
            onClick={removerImagem}
          >
            Remover imagem
          </button>
        </div>
      )}
    </>
  );
}
