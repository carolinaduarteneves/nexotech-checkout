import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { processarPagamento } from '../utils/pagamento.js'

export function usePagamento() {
  const [processando, setProcessando] = useState(false)
  const navigate = useNavigate()

  async function pagar(dadosDoCartao) {
    setProcessando(true)

    // O finally evita que o botão fique travado se a simulação virar uma chamada que rejeita.
    try {
      const { aprovado } = await processarPagamento(dadosDoCartao)
      navigate(aprovado ? '/sucesso' : '/falha')
    } finally {
      setProcessando(false)
    }
  }

  return { processando, pagar }
}
