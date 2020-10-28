import * as Components from './components'
const empty = '-'
export default {
  props: {
    config: Object,
    data: Object
  },
  functional: true,
  render: (h, c) => {
    const { props: { config = {}, data = {}}} = c
    const { prop, type = 'Default' } = config
    const value = data[prop] || config.value
    const isEmpty = value === '' || value === undefined
    return isEmpty ? h(Components.Default, { props: { value: empty }}) : h(Components[type], { props: { value, empty, data, ...config }})
  }
}
