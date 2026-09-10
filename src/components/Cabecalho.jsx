import { Link } from 'react-router-dom'
import logo from '../assets/img/logo.svg'

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho__interno">
        <Link className="cabecalho__link" to="/">
          <img className="cabecalho__logo" src={logo} alt="" />
          <span>
            <span className="cabecalho__marca">NexoTech</span>
            <span className="cabecalho__descricao">Checkout da loja</span>
          </span>
        </Link>
      </div>
    </header>
  )
}
