<template>
  <div class="py-3 text-4xl text-indigo-300 font-bold my-5">
    {{message}}
  </div>
  <todo-item-form @form-submit="addItem"></todo-item-form>
  <ol class="px-3 py-2 rounded-lg mt-2">
    <li v-for="(todoItem, index) in todoItems" class="my-2 flex">
      <p class="mr-4" >
        {{todoItem.title}}
      </p>
      <link-to :url="`/todo_lists/${todoListId}/todo_items/${todoItem.id}`">
        Details
      </link-to>
      <link-to :url="`/todo_lists/${todoListId}/todo_items/${todoItem.id}/edit`">
        Edit
      </link-to>
      <general-button @custom-clicked="removeTodo(todoListId, todoItem.id)">
        Remove
      </general-button>
    </li>
  </ol>
</template>

<script>
import { ref, provide } from "vue";
import axios from "axios"
import GeneralButton from "./nested/general_button";
import GeneralInput from "./nested/general_input";
import LinkTo from "./nested/link_to";
import TodoItemForm from './nested/todo_item_form'

export default {
  name: 'v-todo-items',

  props: {
    message: {
      type: String,
      default: 'Todo Items'
    },
    todoListId: {
      type: Number
    }
  },

  components: {
    LinkTo,
    GeneralInput,
    GeneralButton,
    TodoItemForm
  },
  setup(props) {
    console.log('v-todo-lists:props', props)

    const todoListId = props.todoListId;
    const todoItems = ref([]);

    axios.get(`/todo_lists/${todoListId}/todo_items.json`).then(function (response) {
      console.log('this is response',response.data);
      response.data.forEach(function (el) {
        todoItems.value.push({
          id: el.id,
          title: el.name
        })
      })
    });

    const inputString = ref('');
    const textAreaString = ref('');

    provide('inputString', inputString)
    provide('textAreaString', textAreaString)

    function addItem() {
      if (inputString.value.length === 0) {
        return alert('Please type something');
      }

      let params = { todo_item: { name:  inputString.value, details: textAreaString.value }}
      axios.post(`/todo_lists/${todoListId}/todo_items`, params)
        .then((response) => {
          console.log('when todo list created: ', response);
          if (response.data.todo_item) {
            todoItems.value.unshift({
              id: response.data.todo_item.id,
              title: response.data.todo_item.name
            });
          }
        }, (error) => {
            console.log('when in create has error: ', error);
      });
      inputString.value = '';
      textAreaString.value = '';
    }

    function doneOrNot() {

    }

    function removeTodo(todo_list_id, id) {
      if (!confirm('Do you really want to delete?')) return;

      axios.delete(`/todo_lists/${todo_list_id}/todo_items/${id}`).then(response => {
        console.log('last todo list: ', response);
        todoItems.value = todoItems.value.filter((el) => el.id != id);
      });
    }

    return {
      todoItems,
      addItem,
      removeTodo,
      doneOrNot
    }
  }
}
</script>
