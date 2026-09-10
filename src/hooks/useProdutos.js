import { useEffect, useState } from 'react'
import { buscarProdutos } from '../data/produtos.js'
import { calcularTotal, contarItens } from '../utils/carrinho.js'

export function useProdutos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    // No StrictMode o efeito roda duas vezes; a flag descarta o resultado da execução antiga.
    let efeitoAtivo = true

    async function carregar() {
      try {
        const lista = await buscarProdutos()
        if (efeitoAtivo) {
          setProdutos(lista)
        }
      } catch {
        if (efeitoAtivo) {
          setErro('Não foi possível carregar os produtos do carrinho.')
        }
      } finally {
        if (efeitoAtivo) {
          setCarregando(false)
        }
      }
    }

    carregar()

    return () => {
      efeitoAtivo = false
    }
  }, [])

  return {
    produtos,
    carregando,
    erro,
    total: calcularTotal(produtos),
    quantidadeDeItens: contarItens(produtos),
  }
}
