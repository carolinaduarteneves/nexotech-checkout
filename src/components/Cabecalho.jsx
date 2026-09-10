import logo from '../assets/img/logo.svg'

export default function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="cabecalho__interno">
        <img className="cabecalho__logo" src={logo} alt="" />
        <div>
          <p className="cabecalho__marca">NexoTech</p>
          <p className="cabecalho__descricao">Checkout da loja</p>
        </div>
      </div>
    </header>
  )
}
