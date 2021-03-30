<template>
  <div class="py-5 text-5xl text-indigo-300 font-bold my-5">
    {{message}}
  </div>
  <div class="bg-light-blue-300 inline-flex px-3 py-2 rounded-lg">
    <general-input
        v-model="inputString">
      Todo list
    </general-input>
    <general-button @custom-clicked="addTodoList">
      Add
    </general-button>
  </div>

  <ol class="px-3 py-2 rounded-lg mt-2">
    <li v-for="todoList in todoLists" class="my-2 flex">
      <p class="mr-4" >
        {{todoList.title}}
      </p>
      <link-to :url="`/todo_lists/${todoList.id}/todo_items`">
        Items
      </link-to>
      <link-to :url="`/todo_lists/${todoList.id}/edit`">
        Edit
      </link-to>
      <general-button @custom-clicked="removeTodo(todoList.id)">
        Remove
      </general-button>
    </li>
  </ol>
</template>

<script>
import axios from "axios"
import GeneralButton from "./nested/general_button";
import GeneralInput from "./nested/general_input";
import {ref} from "vue";
import LinkTo from "./nested/link_to";

export default {
  name: 'v-todo-lists',

  props: {
    message: {
      type: String,
      default: 'Todo List'
    }
  },

  components: {
    LinkTo,
    GeneralInput,
    GeneralButton,
  },
  setup(props) {
    console.log('v-todo-lists:props', props)

    const todoLists = ref([]);

    axios.get('/todo_lists.json').then(function (response) {
      console.log('this is response',response.data);
      response.data.forEach(function (el) {
        todoLists.value.unshift({
          id: el.id,
          title: el.name
        })
      })
    });

    const inputString = ref('');

    function addTodoList() {
      if (inputString.value.length === 0) {
        return alert('Please type something');
      }

      let params = { name:  inputString.value}
      axios.post('/todo_lists', params).then((response) => {
        console.log('when todo list created: ', response);
        if (response.data.todo_list) {
          todoLists.value.unshift({
            id: response.data.todo_list.id,
            title: response.data.todo_list.name
          });
        }
      }, (error) => {
        console.log('when in create has error: ', error);
      });
      inputString.value = ''
    }

    function removeTodo(id) {
      if (!confirm('Do you really want to delete?')) return;

      axios.delete(`/todo_lists/${id}`).then(response => {
        console.log('last todo list: ', response);
        todoLists.value = todoLists.value.filter((el) => el.id != id);
      });
    }

    return {
      todoLists,
      inputString,
      addTodoList,
      removeTodo
    }
  }
}
</script>
