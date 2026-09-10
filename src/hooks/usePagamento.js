import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { processarPagamento } from '../utils/pagamento.js'

export function usePagamento() {
  const [processando, setProcessando] = useState(false)
  const navigate = useNavigate()

  async function pagar(dadosDoCartao) {
    setProcessando(true)
    const { aprovado } = await processarPagamento(dadosDoCartao)
    setProcessando(false)
    navigate(aprovado ? '/sucesso' : '/falha')
  }

  return { processando, pagar }
}
