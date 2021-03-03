export default {
    name: 'v-todo-button',
    template: `
        <button @click="clicked()" class="py-0 px-5
                ring-offset-2 hover:ring-1 hover:ring-indigo-500
                focus:ring-2 focus:ring-indigo-400 focus:outline-none
                bg-gradient-to-r from-yellow-100 to-green-200
                text-gray-500 rounded-lg shadow">
          <slot>Add</slot>
        </button>
  `,
    setup(props, { emit }) {
        function clicked() {
            emit('custom-clicked')
        }

        return { clicked }
    }
}
