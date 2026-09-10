import { useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Resultado() {
  const { pathname } = useLocation()
  const aprovado = pathname === '/sucesso'
  const tituloRef = useRef(null)

  // Depois da navegação o foco fica perdido no body: trazer para o título anuncia o resultado.
  useEffect(() => {
    tituloRef.current.focus()
  }, [pathname])

  return (
    <section className="painel resultado" aria-labelledby="titulo-resultado">
      <p
        className={`resultado__selo resultado__selo--${aprovado ? 'aprovado' : 'recusado'}`}
        aria-hidden="true"
      >
        {aprovado ? '✓' : '!'}
      </p>

      <h1
        className={aprovado ? 'resultado__titulo' : 'resultado__titulo resultado__titulo--recusado'}
        id="titulo-resultado"
        ref={tituloRef}
        tabIndex={-1}
      >
        {aprovado ? 'Compra aprovada' : 'tentativa de golpe'}
      </h1>

      <p className="resultado__texto">
        {aprovado
          ? 'Pagamento autorizado e pedido confirmado. Você receberá o comprovante por e-mail.'
          : 'O número informado tem todos os dígitos iguais e foi bloqueado pela nossa verificação. Use outro cartão para tentar de novo.'}
      </p>

      {aprovado ? (
        <Link className="botao botao--primario" to="/">
          Voltar ao carrinho
        </Link>
      ) : (
        <Link className="botao botao--primario" to="/pagamento">
          Tentar novamente
        </Link>
      )}
    </section>
  )
}
