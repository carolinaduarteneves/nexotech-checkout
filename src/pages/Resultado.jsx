import { Link, useLocation } from 'react-router-dom'

export default function Resultado() {
  const { pathname } = useLocation()
  const aprovado = pathname === '/sucesso'

  return (
    <section aria-labelledby="titulo-resultado">
      <h1 id="titulo-resultado">{aprovado ? 'Compra aprovada' : 'tentativa de golpe'}</h1>
      {aprovado ? (
        <Link className="botao botao--primario" to="/">
          Voltar ao carrinho
        </Link>
      ) : (
        <Link className="botao botao--primario" to="/pagamento">
          Tentar novamente
        </Link>
      )}
    </section>
  )
}
