export default {
  name: 'v-test-button',
  template: `
    <button @click="clicked()" class="py-2 px-5
            ring-offset-2 hover:ring-2 hover:ring-indigo-200
            focus:ring-2 focus:ring-indigo-400 focus:outline-none
            text-gray-700 rounded-lg shadow
            bg-gradient-to-r from-blue-300 to-green-300">
      <slot>Hit me!</slot>
    </button>
  `,
  setup(props, { emit }) {
    function clicked() {
      emit('custom-clicked')
    }

    return { clicked }
  }
}
