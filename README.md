# NexoTech Checkout

Simulação da finalização de compra de uma loja de tecnologia, feita como SPA em React. A pessoa
confere os produtos do carrinho, informa os dados fictícios do cartão e recebe o resultado na hora,
sem recarregar a página.

> Projeto acadêmico. Toda a compra é simulada no navegador: não existe back-end, gateway de
> pagamento nem armazenamento dos dados digitados.

## Links do projeto

| Recurso | Link |
| --- | --- |
| Repositório | https://github.com/carolinaduarteneves/nexotech-checkout |
| Quadro no Trello | _preencher antes da entrega_ |
| Vídeo de apresentação | _preencher antes da entrega_ |

## Qual problema o projeto resolve

Uma loja virtual precisa da etapa final da compra: a tela em que a pessoa confirma o que está
levando, paga e descobre imediatamente se deu certo. É o momento em que o cliente mais desiste, então
o checkout precisa ser rápido, previsível e claro sobre o que deu errado.

Este projeto entrega essa experiência com quatro telas encadeadas, validação que explica cada erro no
próprio campo e uma regra antifraude simples: cartões com todos os dígitos iguais são recusados como
tentativa de golpe.

## Como executar

Pré-requisitos: **Node.js 20.19 ou superior** (o projeto foi desenvolvido na versão 24) e **npm**.

```bash
git clone https://github.com/carolinaduarteneves/nexotech-checkout.git
cd nexotech-checkout
npm install
npm run dev
```

Depois abra <http://localhost:5173> no navegador.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | sobe o servidor de desenvolvimento do Vite com recarga automática |
| `npm run build` | gera a versão de produção na pasta `dist/` |
| `npm run preview` | serve localmente o conteúdo já construído em `dist/` |
| `npm run lint` | roda o oxlint nos arquivos do projeto |

## Fluxo da aplicação

1. **`/` — Carrinho.** Os produtos são carregados de forma assíncrona; enquanto isso a tela mostra
   "Carregando produtos…". Depois aparecem nome, descrição, quantidade, preço unitário e subtotal de
   cada item, além do total da compra.
2. **`/pagamento`.** O botão "Finalizar compra" leva ao formulário do cartão, que repete o mesmo
   resumo e o mesmo total do carrinho.
3. **Validação.** Campos incompletos ou fora do formato mantêm a pessoa no formulário, com a mensagem
   de erro ligada ao campo correspondente.
4. **Processamento.** Com o formulário válido, o botão exibe "Processando compra…" e fica
   desabilitado por 1,5 s, o que impede envios duplicados.
5. **Resultado.** Cartões com todos os dígitos iguais vão para **`/falha`**, que mostra a mensagem
   `tentativa de golpe` e devolve ao formulário. Qualquer outro número válido vai para **`/sucesso`**,
   que confirma a aprovação e devolve ao carrinho.

## Regras de validação do cartão

| Campo | Regra |
| --- | --- |
| Titular | precisa estar preenchido |
| Número | exatamente 16 dígitos; espaços e hífens são descartados antes da validação |
| Validade | formato `MM/AA`, com mês entre `01` e `12` |
| CVV | exatamente 3 dígitos |

Não são validados bandeira, algoritmo de Luhn nem data de vencimento, porque o enunciado dispensa
essas verificações.

## Cartões para testar

| Número | Resultado |
| --- | --- |
| `4111 1111-1111 1111` | aprovado — mostra que espaços e hífens são ignorados |
| `5555 4444 3333 2222` | aprovado |
| `1111111111111112` | aprovado — só o último dígito é diferente |
| `1111 1111 1111 1111` | recusado — vai para a tela de falha |
| `0000-0000-0000-0000` | recusado — os separadores não escondem os dígitos repetidos |

Para os demais campos vale qualquer dado fictício no formato correto, por exemplo `08/29` e `123`.

## Tecnologias e técnicas utilizadas

- **React 19** com componentes funcionais e JSX.
- **Vite 8** como ferramenta de build e servidor de desenvolvimento.
- **React Router 7** para as quatro rotas, os links e a navegação programática após a compra.
- **React Hook Form 7** para o controle do formulário.
- **Zod 4** para o schema de validação, integrado ao formulário pelo `@hookform/resolvers`.
- **CSS puro**, escrito mobile-first, com variáveis de tema e uma única folha de estilos.
- **Promises e `async/await`** para simular tanto o carregamento dos produtos quanto o processamento
  da compra.
- **Módulos ES** separando páginas, componentes, hooks, dados e regras de negócio.

## Estrutura de pastas

```
nexotech-checkout/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                    ponto de entrada da aplicação
    ├── App.jsx                     rotas, cabeçalho, rodapé e link de pular conteúdo
    ├── pages/
    │   ├── Carrinho.jsx            produtos, subtotais e total da compra
    │   ├── Pagamento.jsx           formulário do cartão e envio
    │   └── Resultado.jsx           atende /sucesso e /falha conforme a URL
    ├── components/
    │   ├── Cabecalho.jsx           marca da loja e retorno ao carrinho
    │   ├── ItemCarrinho.jsx        um produto do carrinho, recebido por props
    │   ├── ResumoCompra.jsx        itens e total, reaproveitado nas duas telas
    │   └── CampoFormulario.jsx     rótulo, dica, campo e mensagem de erro
    ├── hooks/
    │   ├── useProdutos.js          carregamento assíncrono e totais do carrinho
    │   └── usePagamento.js         estado do processamento e destino da compra
    ├── utils/
    │   ├── carrinho.js             subtotal, total e contagem de itens
    │   ├── moeda.js                formatação em reais
    │   └── pagamento.js            regra dos dígitos iguais e compra simulada
    ├── schemas/
    │   └── cartaoSchema.js         schema Zod do formulário
    ├── data/
    │   └── produtos.js             array fixo de produtos
    └── assets/
        ├── styles/index.css        tema, layout e responsividade
        └── img/logo.svg            identidade visual da loja
```

## Decisões de projeto

**Uma página para os dois resultados.** `/sucesso` e `/falha` continuam sendo rotas separadas, mas
são atendidas pelo mesmo componente `Resultado`, que decide o conteúdo lendo a URL com `useLocation`.
Isso resolve o item bônus do enunciado e evita duplicar duas telas quase idênticas.

**O total nasce em um lugar só.** As telas de carrinho e de pagamento chamam o mesmo hook
`useProdutos`, que carrega os produtos e já devolve o total calculado. Assim o valor mostrado no
pagamento nunca diverge do carrinho, sem precisar de estado global.

**Sem Context API e sem biblioteca de estado.** Os dados vêm de props e de custom hooks, como pede o
módulo. Nenhuma informação precisa atravessar a árvore de componentes.

**Regras de negócio fora dos componentes.** `utils/carrinho.js` e `utils/pagamento.js` são funções
puras, sem React. Isso deixa cada regra testável isoladamente e mantém os componentes ocupados apenas
com a interface.

**Validação em um schema declarativo.** O Zod limpa os separadores do número do cartão antes de
checar o formato, então o handler de envio já recebe o número pronto para a regra antifraude.

## Acessibilidade

- HTML semântico em JSX: `header`, `main`, `footer`, `section` com nome acessível, listas e títulos
  em ordem (`h1` → `h2` → `h3`).
- Todos os campos têm `label` associado por `htmlFor`/`id`; dicas e mensagens de erro são ligadas ao
  campo por `aria-describedby`, e campos inválidos recebem `aria-invalid`.
- Mensagens de estado usam `role="status"` e `role="alert"`, então quem usa leitor de tela ouve o
  carregamento, os erros e o "Processando compra…".
- Depois da compra o foco vai para o título do resultado. Em uma SPA o foco ficaria perdido no
  `body`, e a troca de tela passaria despercebida por quem navega por teclado ou leitor de tela.
- Link "Pular para o conteúdo" no topo, visível apenas quando recebe foco.
- Foco visível em todos os elementos interativos, com botões e campos de 48px de altura para facilitar
  o toque no celular.
- O tema respeita `prefers-reduced-motion`.
- Auditoria com **axe-core** nas telas de carrinho, de pagamento com erros e de falha: nenhuma
  violação. O contraste de todos os pares de cor do tema foi calculado e o menor resultado foi
  4,71:1, acima do mínimo de 4,5:1 exigido pelo nível AA.

## Responsividade

O CSS é mobile-first: a base atende telas pequenas em uma coluna só, e a partir de 768px a lista de
produtos e o resumo passam a dividir a tela em duas colunas, com o resumo fixo durante a rolagem. Não
há largura mínima maior que a tela em nenhum bloco, então a página nunca rola na horizontal.

## Investigação com o debugger

**O que investiguei.** O enunciado manda desconsiderar espaços e hífens do número do cartão. A
dúvida era em que ponto o número é limpo: se a regra antifraude receberia `1111 1111 1111 1111` com
os espaços ainda dentro — o que faria `temTodosOsDigitosIguais` comparar espaços com dígitos.

**Como investiguei.** Coloquei um breakpoint na primeira linha de `pagar`, em
`src/hooks/usePagamento.js`, e paguei com `1111 1111-1111 1111`. Com a execução parada, inspecionei
`dadosDoCartao` no painel Scope do DevTools.

**O que descobri.** O campo `numero` já chegava como `"1111111111111111"`, sem espaços nem hífen. O
`.transform()` do schema Zod roda antes de o React Hook Form entregar os dados ao handler, ou seja, a
limpeza acontece na validação e não na regra de negócio. Confirmado isso, `temTodosOsDigitosIguais`
ainda mantém o próprio `replace`, porque é uma função pura que precisa funcionar mesmo se for chamada
de outro lugar.

Para reproduzir: abra o DevTools na aba Sources, encontre `usePagamento.js`, clique no número da
linha do `setProcessando(true)` e envie o formulário.

## Como o trabalho foi organizado

O repositório usa `main` para o código final, `develop` para concentrar os merges e uma branch por
tarefa, sempre criada a partir da `develop` e integrada por pull request.

| Branch | Objetivo |
| --- | --- |
| `feature/setup-estrutura` | limpar o boilerplate do Vite, criar as pastas, o tema e o logo |
| `feature/rotas-navegacao` | configurar as quatro rotas e a navegação entre elas |
| `feature/dados-produtos` | array de produtos, regras de cálculo e o hook `useProdutos` |
| `feature/tela-carrinho` | lista de produtos, componentes reutilizáveis e resumo |
| `feature/formulario-pagamento` | formulário com React Hook Form e validação com Zod |
| `feature/regra-processamento-compra` | regra dos dígitos iguais e processamento assíncrono |
| `feature/telas-resultado` | telas de sucesso e falha compartilhando a mesma página |
| `feature/acessibilidade-responsividade` | link de pular conteúdo, rodapé e resumo fixo |
| `feature/documentacao` | este README |
| `feature/ajuste-estado-processando` | reset garantido do estado de processamento em caso de erro |

## Melhorias possíveis

- **Máscaras de digitação** nos campos de número, validade e CVV, para o formato ficar evidente
  enquanto a pessoa digita em vez de só na hora do erro.
- **Carrinho editável**, com alteração de quantidade e remoção de itens — hoje ele é fixo, como o
  enunciado pede.
- **Produtos vindos de uma API real**, aproveitando os estados de carregamento, vazio e erro que o
  hook `useProdutos` já trata.
- **Testes automatizados** versionados no repositório, cobrindo a regra antifraude e o fluxo de compra
  de ponta a ponta.
- **Persistência do carrinho** entre recarregamentos da página.
- **Imagens dos produtos**, que hoje aparecem só como texto.
