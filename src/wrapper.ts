import { allHtmlElements } from "./all-elements"
import { allListeners } from "./all-listeners"
import kebab from "lodash.kebabcase"

const clearListeners = (wrapper: Wrapper) => {
  Object.entries(wrapper._listeners).forEach(([key, array]) => {
    array.forEach(listener => {
      wrapper.el?.removeEventListener(key, listener)
    })
  })
}

const useWrapper = (root: HTMLElement) => {
  let appRoot: Wrapper
  function wrapperFactory(
    name: string,
    attributes: Attributes,
    innerText: string | number,
    _?: Wrapper,
    callback?: ElCallback
  ): Wrapper {
    const self = {
      name,
      attributes,
      _,
      callback,
      innerText,
      el: !_ ? root : null,
      _listeners: {},
      isAppRoot: () => !_,
      __: (template: Template, state?: State) => {
        state ||= {}
        const setState = (newState: State) => {
          Object.entries(newState).forEach(([k, v]) => {
            state = state as State
            state[k] = v
            const result = self.__(template, state)
          })
        }
        const getState = () => state as State
        const result = template(self, { setState, getState })
        result.state = state
        build(result)
        return result
      },
      children: [],
    } as unknown as Wrapper
    if (self.isAppRoot()) appRoot = self
    for (let i = 0; i < allHtmlElements.length; i++) {
      const elName = allHtmlElements[i]
      self[elName] = function (
        _1?: string | number | Attributes | ElCallback,
        _2?: string | number | Attributes | ElCallback,
        _3?: string | number | Attributes | ElCallback
      ) {
        const args = Array.from(arguments)
        const innerText = args.find(a => ["number", "string"].includes(typeof a)) || ""
        const callback = args.find(a => typeof a === "function") as ElCallback | undefined
        const attributes = args.find(a => typeof a === "object") as Attributes | undefined
        const wrappedEl = wrapperFactory(elName, attributes || {}, innerText, self, callback)
        if (callback) callback(wrappedEl)
        self.children.push(wrappedEl)
        return wrappedEl
      }
    }
    return self
  }
  return wrapperFactory
}

const compare = (htmlEl: HTMLElement | undefined, wrapper: Wrapper) => {
  if (!htmlEl) {
    const newEl = wrapperToEl(wrapper)
    wrapper._?.el?.appendChild(newEl)
  } else if (htmlEl) {
    console.log(htmlEl.nodeName, htmlEl.innerText, wrapper.name, wrapper.innerText)
    if (htmlEl.nodeName.toLowerCase() !== wrapper.name) {
    }
  }
}

function build(wrapper: Wrapper) {
  const actualComponentHTML = wrapper._.el.children[0] as HTMLElement
  let actualChildren = actualComponentHTML?.children || []
  wrapperToEl(wrapper)
  if (!actualComponentHTML) {
    // this is the first build
    wrapper._.el.appendChild(wrapper.el as unknown as HTMLElement)
  } else {
    // compare current component root and new one.
    // Set the new wrapper's el to the current one.
    compare(actualComponentHTML, wrapper)
    wrapper.el = actualComponentHTML
  }
  const wrapChildren = (wrapper: Wrapper, nextChildren: HTMLCollection) => {
    const { children, el } = wrapper
    for (let i = 0; i < children.length; i++) {
      const childWrapper = wrapper.children[i]
      const childEl = nextChildren[i] as HTMLElement
      /// *** ///
      compare(childEl, childWrapper)
      /// *** ///
      wrapChildren(childWrapper, nextChildren[i]?.children || actualChildren)
    }
  }
  wrapChildren(wrapper, actualChildren)
}

function wrapperToEl(wrapper: Wrapper): HTMLElement {
  const el = document.createElement(wrapper.name)
  el.innerText = wrapper.innerText as string
  Object.entries(wrapper.attributes).forEach(([key, value]) => {
    if (allListeners.includes(key)) {
      const f = value as EventListenerOrEventListenerObject
      const listenerName = key.replace("on", "")
      wrapper._listeners[listenerName] ||= []
      wrapper._listeners[listenerName].push(f)
      el.addEventListener(listenerName, f)
    } else if (key === "style" && typeof value === "object") {
      let style = ""
      Object.entries(value).forEach(([k, v]) => {
        if (typeof v !== "string") {
          throw new Error(`Style object had a value that is not a string. ${k}: ${typeof v}`)
        }
        style += `${kebab(k)}:${v};`
      })
      el.setAttribute(key, style)
    } else {
      el.setAttribute(key, value as string)
    }
  })
  wrapper.el = el
  return el
}

export { useWrapper }
