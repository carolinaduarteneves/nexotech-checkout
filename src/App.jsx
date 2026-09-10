import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cabecalho from './components/Cabecalho.jsx'
import Carrinho from './pages/Carrinho.jsx'
import Pagamento from './pages/Pagamento.jsx'
import Resultado from './pages/Resultado.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Cabecalho />
        <main className="conteudo">
          <Routes>
            <Route path="/" element={<Carrinho />} />
            <Route path="/pagamento" element={<Pagamento />} />
            <Route path="/sucesso" element={<Resultado />} />
            <Route path="/falha" element={<Resultado />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}
