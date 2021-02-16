const files = require.context('.', false, /\.(js|vue)$/)
const components = {}

files.keys().forEach((key) => {
  if (key === './index.js') return

  const component = files(key).default
  components[component.name] = component
})

export default components
