import { Link } from 'react-router-dom'

export default function Carrinho() {
  return (
    <section aria-labelledby="titulo-carrinho">
      <h1 id="titulo-carrinho">Seu carrinho</h1>
      <Link className="botao botao--primario" to="/pagamento">
        Finalizar compra
      </Link>
    </section>
  )
}
