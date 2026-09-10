import { formatarBRL } from '../utils/moeda.js'

export default function ResumoCompra({ quantidadeDeItens, total, children }) {
  return (
    <section className="painel resumo" aria-labelledby="titulo-resumo">
      <h2 id="titulo-resumo">Resumo da compra</h2>
      <dl className="resumo__linhas">
        <div className="resumo__linha">
          <dt>Itens</dt>
          <dd>{quantidadeDeItens}</dd>
        </div>
        <div className="resumo__linha">
          <dt>Frete</dt>
          <dd>Grátis</dd>
        </div>
        <div className="resumo__linha resumo__linha--total">
          <dt>Total</dt>
          <dd>{formatarBRL(total)}</dd>
        </div>
      </dl>
      {children}
    </section>
  )
}
