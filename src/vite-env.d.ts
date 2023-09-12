/// <reference types="vite/client" />

interface StateManagers {
  setState: SetState
  getState: GetState
}

type SetState = (state: State) => void
type GetState = () => State;
type Template = (_: Wrapper, stateManagers: StateManagers) => Wrapper

interface State {
  [key: string]: any
}

type Attributes = {
  [key: string]: any
}

type ElCallback = (_: Wrapper) => void

type ElementFunction = (
  _1?: string | number | Attributes | ElCallback,
  _2?: string | number | Attributes | ElCallback,
  _3?: string | number | Attributes | ElCallback
) => Wrapper

interface Wrapper {
  name: string
  attributes: Attributes
  _?: Wrapper
  __: (template: Template, state?: State) => Wrapper
  callback: ElCallback | undefined
  isAppRoot: () => boolean
  innerText: string | number
  children: Wrapper[]
  state?: State
  el: HTMLElement | null
  _listeners: {
    [key: string]: EventListenerOrEventListenerObject[]
  }
  a: ElementFunction
  abbr: ElementFunction
  acronym: ElementFunction
  address: ElementFunction
  applet: ElementFunction
  area: ElementFunction
  article: ElementFunction
  aside: ElementFunction
  audio: ElementFunction
  b: ElementFunction
  base: ElementFunction
  basefont: ElementFunction
  bdi: ElementFunction
  bdo: ElementFunction
  big: ElementFunction
  blockquote: ElementFunction
  body: ElementFunction
  br: ElementFunction
  button: ElementFunction
  canvas: ElementFunction
  caption: ElementFunction
  center: ElementFunction
  cite: ElementFunction
  code: ElementFunction
  col: ElementFunction
  colgroup: ElementFunction
  data: ElementFunction
  datalist: ElementFunction
  dd: ElementFunction
  del: ElementFunction
  details: ElementFunction
  dfn: ElementFunction
  dialog: ElementFunction
  dir: ElementFunction
  div: ElementFunction
  dl: ElementFunction
  dt: ElementFunction
  em: ElementFunction
  embed: ElementFunction
  fieldset: ElementFunction
  figcaption: ElementFunction
  figure: ElementFunction
  font: ElementFunction
  footer: ElementFunction
  form: ElementFunction
  frame: ElementFunction
  frameset: ElementFunction
  h1: ElementFunction
  to: ElementFunction
  h6: ElementFunction
  head: ElementFunction
  header: ElementFunction
  hr: ElementFunction
  html: ElementFunction
  i: ElementFunction
  iframe: ElementFunction
  img: ElementFunction
  input: ElementFunction
  ins: ElementFunction
  kbd: ElementFunction
  label: ElementFunction
  legend: ElementFunction
  li: ElementFunction
  link: ElementFunction
  main: ElementFunction
  map: ElementFunction
  mark: ElementFunction
  meta: ElementFunction
  meter: ElementFunction
  nav: ElementFunction
  noframes: ElementFunction
  noscript: ElementFunction
  object: ElementFunction
  ol: ElementFunction
  optgroup: ElementFunction
  option: ElementFunction
  output: ElementFunction
  p: ElementFunction
  param: ElementFunction
  picture: ElementFunction
  pre: ElementFunction
  progress: ElementFunction
  q: ElementFunction
  rp: ElementFunction
  rt: ElementFunction
  ruby: ElementFunction
  s: ElementFunction
  samp: ElementFunction
  script: ElementFunction
  section: ElementFunction
  select: ElementFunction
  small: ElementFunction
  source: ElementFunction
  span: ElementFunction
  strike: ElementFunction
  strong: ElementFunction
  style: ElementFunction
  sub: ElementFunction
  summary: ElementFunction
  sup: ElementFunction
  svg: ElementFunction
  table: ElementFunction
  tbody: ElementFunction
  td: ElementFunction
  template: ElementFunction
  textarea: ElementFunction
  tfoot: ElementFunction
  th: ElementFunction
  thead: ElementFunction
  time: ElementFunction
  title: ElementFunction
  tr: ElementFunction
  track: ElementFunction
  tt: ElementFunction
  u: ElementFunction
  ul: ElementFunction
  var: ElementFunction
  video: ElementFunction
  wbr: ElementFunction
}
