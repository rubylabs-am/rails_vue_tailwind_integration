<template>
  <div class="py-10 text-9xl text-indigo-300 font-bold my-10">
    {{message}}
  </div>
  <div class="bg-light-blue-300 inline-flex px-3 py-2 rounded-lg">
    <test-input
        v-model="inputString">
      Todo
    </test-input>
    <todo-button @custom-clicked="clicked">
      Add
    </todo-button>
  </div>

  <ol class="px-3 py-2 rounded-lg mt-2">
    <li v-for="(todo, index) in todoItems" class="my-2 flex">
      <todo-button @custom-clicked="doneOrNot(index)">
        {{todo.isDone ? 'Undone': 'Done'}}
      </todo-button>
      <p class="mx-3" :class="{'line-through': todo.isDone}">
        {{todo.title}}
      </p>
      <todo-button @custom-clicked="removeTodo(index)">
        Remove
      </todo-button>
    </li>
  </ol>
</template>>

<script>
import TodoButton from "./nested/todo_button";
import TestInput from "./nested/test_input";
import {ref} from "vue";

export default {
  name: 'v-another-todos',

  props: {
    message: {
      type: String,
      default: 'Todos'
    }
  },

  components: {
    TodoButton,
    TestInput
  },
  setup() {
    const todoItems = ref([
      {
        id: 1,
        title: 'Do the dishes',
        isDone: false
      },
      {
        id: 2,
        title: 'Take out the trash',
        isDone: false
      },
      {
        id: 3,
        title: 'Mow the lawn',
        isDone: false

      }
    ]);
    const inputString = ref('');
    const nextTodoId = ref(4);

    function clicked() {
      if (inputString.value.length === 0) {
        return alert('Please type something');
      }

      todoItems.value.push({
        id: nextTodoId.value++,
        title: inputString.value,
        isDone: false
      });
      inputString.value = ''
    }

    function doneOrNot(index) {
      if (todoItems.value[index].isDone) {
        todoItems.value[index].isDone = false;
      }else {
        todoItems.value[index].isDone = true;
      }
    }

    function removeTodo(index) {
      todoItems.value.splice(index, 1);
    }

    return {
      todoItems,
      inputString,
      clicked,
      removeTodo,
      doneOrNot
    }
  }
}
</script>