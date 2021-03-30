<template>
<!--  <p class="p-10 text-2xl text-yellow-500 font-bold my-10 capitalize"> {{ formTitle }} todo list</p>-->
  <div id="app">
    <form @submit.prevent="submitForm">
      <div class="flex mt-2">
        <label for="name" class="py-2 px-4">Name:</label><br>
        <input id="name" type="text" v-model="name" class="py-2
          px-4 border border-yellow-400 rounded-2xl mr-2"/>

      </div>
      <v-crud-button type="submit" class="capitalize my-5"> {{ formTitle }}</v-crud-button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import VCrudButton from "./nested/crud_button";

export default {
  name: 'v-todo-list-form',
  components: {VCrudButton},
  props: {
    list: {
      type: Object
    },
    form_type:{ type: String}
  },

  setup(props, { emit }) {
    const name = ref('')
    const formTitle = props.form_type

    function submitForm() {
      const todoList = { name: name.value }
      let req;

      if (props.form_type === 'edit') {
        req = axios.put(`/todo_lists/${props.list.id}`, todoList)
      } else {
        req = axios.post('/todo_lists', todoList)
      }

      req.then((response) => emit('todoListResponse', response.data))
    }

    return {
      submitForm,
      name,
      formTitle,
    }
  }
}
</script>
