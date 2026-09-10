import { Link } from 'react-router-dom'
import ItemCarrinho from '../components/ItemCarrinho.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'
import { useProdutos } from '../hooks/useProdutos.js'

export default function Carrinho() {
  const { produtos, carregando, erro, total, quantidadeDeItens } = useProdutos()

  const carrinhoVazio = !carregando && !erro && produtos.length === 0
  const carrinhoPronto = !carregando && !erro && produtos.length > 0

  return (
    <section aria-labelledby="titulo-carrinho">
      <h1 id="titulo-carrinho">Seu carrinho</h1>
      <p className="subtitulo">Confira os produtos antes de seguir para o pagamento.</p>

      {carregando && (
        <p className="aviso" role="status">
          Carregando produtos…
        </p>
      )}

      {erro && (
        <p className="aviso aviso--erro" role="alert">
          {erro}
        </p>
      )}

      {carrinhoVazio && <p className="aviso">Seu carrinho está vazio.</p>}

      {carrinhoPronto && (
        <div className="carrinho">
          <section className="painel" aria-labelledby="titulo-produtos">
            <h2 id="titulo-produtos">Produtos</h2>
            <ul className="lista-itens">
              {produtos.map((produto) => (
                <ItemCarrinho key={produto.id} produto={produto} />
              ))}
            </ul>
          </section>

          <ResumoCompra quantidadeDeItens={quantidadeDeItens} total={total}>
            <Link className="botao botao--primario botao--largo" to="/pagamento">
              Finalizar compra
            </Link>
          </ResumoCompra>
        </div>
      )}
    </section>
  )
}
