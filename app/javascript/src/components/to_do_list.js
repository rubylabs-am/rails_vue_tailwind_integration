import {ref} from "vue";

export default {
    name: "v-todo-list",
    template: `
      <div class="inline-flex">
        <input type="text" class="rounded-l-sm p-4 border mr-0  text-gray-800 border-gray-200 bg-white" placeholder="Add todo..." v-on:keyup.enter="addTodo">
        <button v-on:submit="addTodo" class="px-8 rounded-r-sm bg-yellow-400  
          text-gray-800 font-bold p-4 uppercase border-yellow-500 border-t border-b border-r">
          Add
        </button>
      </div>
      <ul>
          <li v-for="todo in todos" class="flex mt-2 border relative">
            <label>
              <input type="checkbox" v-model="todo.done">
            </label>
            <div class="pl-4">
                <del v-if="todo.done">{{ todo.text }}</del>
                <span v-else>{{ todo.text }}</span>
            </div>
            <div class="absolute right-0" >
                <button class="bg-yellow-400 rounded-r-sm px-3" v-on:click="removeTodo(todo.id)">X</button>
            </div>
          </li>
      </ul>
    `,
    setup() {
        const todos = ref([
            {text: 'listing1', done: false, id: Date.now()+1},
            {text: 'listing2', done: true, id: Date.now()+2},
            {text: 'listing3', done: true, id: Date.now()+3},
            {text: 'listing4', done: false, id: Date.now()},
        ])
        function addTodo({target}) {
            todos.value.unshift({text: target.value, done: false, id: Date.now()})
            target.value = ''
        }

        function removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        }
        return {
            todos,
            addTodo,
            removeTodo
        }
    }
}