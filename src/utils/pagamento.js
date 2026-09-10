const TEMPO_DE_PROCESSAMENTO = 1500

export function temTodosOsDigitosIguais(numeroDoCartao) {
  const digitos = numeroDoCartao.replace(/\D/g, '')

  if (digitos.length !== 16) {
    return false
  }

  return digitos.split('').every((digito) => digito === digitos[0])
}

export function processarPagamento(dadosDoCartao) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ aprovado: !temTodosOsDigitosIguais(dadosDoCartao.numero) })
    }, TEMPO_DE_PROCESSAMENTO)
  })
}
