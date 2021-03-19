<template>
  <div>
    <v-crud-button @custom-clicked="createList"> + </v-crud-button>
  </div>
  <ul>
      <li v-for="list in todoLists" :key="list.id">
        <div class="flex mt-2 row-reverse">
          <span class="mr-auto p-2"> <a :href="`todo_lists/${list.id}`"> {{ list.name }}</a></span>
          <v-crud-button @custom-clicked="redirect_to_list(list.id)"> EDIT </v-crud-button>
          <v-crud-button @custom-clicked="deleteList(list.id)" > DELETE </v-crud-button>
        </div>
      </li>


  </ul>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import VCrudButton from "./nested/crud_button";
  export default {
    name: 'v-todo-lists',
    components: {VCrudButton},

    setup() {
      const todoLists = ref([]);

      axios.get("/todo_lists.json")
          .then(response => {
            todoLists.value = response.data;
          });

      function deleteList(id) {
        axios.delete(`/todo_lists/${id}.json`).then(response => {
          this.todoLists = this.todoLists.filter(list => list.id !== id)
        });
      }

      function redirect_to_list(id) {
        window.location.href = `/todo_lists/${id}/edit`
      }

      function createList() {
        window.location.href = `/todo_lists/new`
      }
      return {
        redirect_to_list,
        todoLists,
        createList,
        deleteList,
      }
    }
  }
</script>