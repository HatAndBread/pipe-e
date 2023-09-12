export default function(_: Wrapper) {
  return _.div("I am a component!", { class: "bg-yellow" }, _ => {
    _.div("I am embedded within that component")
  })
}