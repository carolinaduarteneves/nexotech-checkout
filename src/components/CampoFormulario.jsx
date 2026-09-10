export default function CampoFormulario({ id, rotulo, dica, erro, ...propsDoInput }) {
  const idDaDica = `${id}-dica`
  const idDoErro = `${id}-erro`
  const descricoes = [dica && idDaDica, erro && idDoErro].filter(Boolean).join(' ')

  return (
    <div className="campo">
      <label className="campo__rotulo" htmlFor={id}>
        {rotulo}
      </label>

      {dica && (
        <span className="campo__dica" id={idDaDica}>
          {dica}
        </span>
      )}

      <input
        className={erro ? 'campo__entrada campo__entrada--invalida' : 'campo__entrada'}
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descricoes || undefined}
        {...propsDoInput}
      />

      {erro && (
        <span className="campo__erro" id={idDoErro} role="alert">
          {erro}
        </span>
      )}
    </div>
  )
}
