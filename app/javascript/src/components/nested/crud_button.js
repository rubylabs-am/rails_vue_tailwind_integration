export default {
    name: 'v-crud-button',
    template: `
    <button @click="clicked()" class="bg-yellow-300 text-yellow-dark font-semibold hover:text-white py-2
       px-4 border border-yellow rounded-2xl mr-2 my-2">
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
