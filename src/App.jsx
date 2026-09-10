import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cabecalho from './components/Cabecalho.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Pagamento from './pages/Pagamento.jsx'
import Resultado from './pages/Resultado.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <a className="pular-para-conteudo" href="#conteudo">
          Pular para o conteúdo
        </a>

        <Cabecalho />

        <main className="conteudo" id="conteudo" tabIndex={-1}>
          <Routes>
            <Route path="/" element={<Carrinho />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/sucesso" element={<Resultado />} />
            <Route path="/falha" element={<Resultado />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="rodape">
          <p>
            Loja fictícia criada para um mini-projeto de Front-End React. A compra é simulada no
            navegador: nenhum dado de cartão é enviado ou armazenado.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  )
}
