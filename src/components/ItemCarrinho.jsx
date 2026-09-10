import { calcularSubtotal } from '../utils/carrinho.js'
import { formatarBRL } from '../utils/moeda.js'

export default function ItemCarrinho({ produto }) {
  return (
    <li className="item">
      <div className="item__dados">
        <h3 className="item__nome">{produto.nome}</h3>
        <p className="item__descricao">{produto.descricao}</p>
        <p className="item__valores">
          Quantidade: {produto.quantidade} · Preço unitário: {formatarBRL(produto.preco)}
        </p>
      </div>
      <p className="item__subtotal">
        <span className="item__rotulo">Subtotal</span>
        <strong>{formatarBRL(calcularSubtotal(produto))}</strong>
      </p>
    </li>
  )
}
