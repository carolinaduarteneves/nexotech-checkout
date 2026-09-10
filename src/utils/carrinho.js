export function calcularSubtotal(produto) {
  return produto.preco * produto.quantidade
}

export function calcularTotal(produtos) {
  return produtos.reduce((total, produto) => total + calcularSubtotal(produto), 0)
}

export function contarItens(produtos) {
  return produtos.reduce((quantidade, produto) => quantidade + produto.quantidade, 0)
}
