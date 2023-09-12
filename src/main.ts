import { useWrapper } from "./wrapper"
import example from "./example-component"

const namedNodeMapToAttributes = (nodeMap: NamedNodeMap) => {
  const attrs = {}
  for (let i = 0; i < nodeMap.length; i++) {
    const { name, value } = nodeMap[i]
    attrs[name] = value
  }
  return attrs
}

function context(root: HTMLElement) {
  const wrapperFactory = useWrapper(root)
  const attributes = namedNodeMapToAttributes(root.attributes)
  const appRoot = wrapperFactory(root.nodeName.toLowerCase(), attributes, "")
  return appRoot
}

function App(el: HTMLElement) {
  const rootWrapper = context(el)
  return rootWrapper
}

const app = document.getElementById("app") as HTMLElement
App(app).__(template, { count: 1 })

function template(_: Wrapper, { getState, setState }) {
  const { count } = getState()
  const onclick = (n: number) => setState({ count: count + n })
  const buttonStyle = `border-radius: 8px; background-color: white; border: solid; border-width: ${-count}px; border-color: skyblue; padding: ${count}px; cursor: pointer`
  const helloStyle = {
    backgroundColor: "salmon",
    color: "white",
    borderRadius: "8px",
    padding: "16px"
  }
  window.setState = setState

  return _.div("hello", { class: "bg-yellow", style: helloStyle }, _ => {
    _.h1(`count is currently ${count}`)
    _.div("chicken", _ => {
      _.div("fish")
    })
    _.button("Increase", {
      style: buttonStyle,
      onclick: () => onclick(1),
    })
    _.button("Decrease", {
      style: buttonStyle,
      onclick: () => onclick(-1),
    })
    // _.__(example)
    if (count > 1) {
      _.div("You can only see me when the count is greater than 1")
    }
  })
}
