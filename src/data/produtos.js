const TEMPO_DE_CARREGAMENTO = 600

const produtos = [
  {
    id: 'fone-nx-500',
    nome: 'Fone Bluetooth NX-500',
    descricao: 'Cancelamento de ruído e 30h de bateria',
    preco: 349.9,
    quantidade: 1,
  },
  {
    id: 'teclado-aurora-tkl',
    nome: 'Teclado Mecânico Aurora TKL',
    descricao: 'Switches silenciosos e layout ABNT2',
    preco: 289,
    quantidade: 1,
  },
  {
    id: 'mouse-orbit',
    nome: 'Mouse Ergonômico Orbit',
    descricao: 'Sem fio, 6 botões programáveis',
    preco: 159.9,
    quantidade: 2,
  },
  {
    id: 'hub-usbc-7em1',
    nome: 'Hub USB-C 7 em 1',
    descricao: 'HDMI 4K, leitor SD e carga de 100W',
    preco: 219.5,
    quantidade: 1,
  },
]

export function buscarProdutos() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(produtos), TEMPO_DE_CARREGAMENTO)
  })
}
