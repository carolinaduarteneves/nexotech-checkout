import { Link } from 'react-router-dom'

export default function Pagamento() {
  return (
    <section aria-labelledby="titulo-pagamento">
      <h1 id="titulo-pagamento">Dados do cartao</h1>
      <Link className="botao botao--secundario" to="/">
        Voltar ao carrinho
      </Link>
    </section>
  )
}
