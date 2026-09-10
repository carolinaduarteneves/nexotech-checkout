import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import CampoFormulario from '../components/CampoFormulario.jsx'
import ResumoCompra from '../components/ResumoCompra.jsx'
import { usePagamento } from '../hooks/usePagamento.js'
import { useProdutos } from '../hooks/useProdutos.js'
import { cartaoSchema } from '../schemas/cartaoSchema.js'
import { formatarBRL } from '../utils/moeda.js'

export default function Pagamento() {
  const { carregando, erro, total, quantidadeDeItens } = useProdutos()
  const { processando, pagar } = usePagamento()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(cartaoSchema),
    defaultValues: { titular: '', numero: '', validade: '', cvv: '' },
  })

  return (
    <section aria-labelledby="titulo-pagamento">
      <h1 id="titulo-pagamento">Pagamento</h1>
      <p className="subtitulo">
        Use dados fictícios: nada é enviado para fora do navegador nem armazenado.
      </p>

      {carregando && (
        <p className="aviso" role="status">
          Carregando resumo da compra…
        </p>
      )}

      {erro && (
        <p className="aviso aviso--erro" role="alert">
          {erro}
        </p>
      )}

      {!carregando && !erro && (
        <div className="pagamento">
          <form
            className="painel formulario"
            aria-labelledby="titulo-dados-cartao"
            onSubmit={handleSubmit(pagar)}
            noValidate
          >
            <h2 id="titulo-dados-cartao">Dados do cartão</h2>

            <CampoFormulario
              id="titular"
              rotulo="Nome impresso no cartão"
              autoComplete="cc-name"
              erro={errors.titular?.message}
              {...register('titular')}
            />

            <CampoFormulario
              id="numero"
              rotulo="Número do cartão"
              dica="16 dígitos. Espaços e hífens são ignorados."
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              erro={errors.numero?.message}
              {...register('numero')}
            />

            <div className="formulario__linha">
              <CampoFormulario
                id="validade"
                rotulo="Validade"
                dica="Formato MM/AA"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="12/29"
                erro={errors.validade?.message}
                {...register('validade')}
              />

              <CampoFormulario
                id="cvv"
                rotulo="CVV"
                dica="3 dígitos"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                erro={errors.cvv?.message}
                {...register('cvv')}
              />
            </div>

            <button
              className="botao botao--primario botao--largo"
              type="submit"
              disabled={processando}
            >
              {processando ? 'Processando compra…' : `Pagar ${formatarBRL(total)}`}
            </button>

            <p className="apenas-leitor-de-tela" role="status">
              {processando ? 'Processando compra…' : ''}
            </p>

            <Link className="botao botao--secundario botao--largo" to="/">
              Voltar ao carrinho
            </Link>
          </form>

          <ResumoCompra quantidadeDeItens={quantidadeDeItens} total={total} />
        </div>
      )}
    </section>
  )
}
