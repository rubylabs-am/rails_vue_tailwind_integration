<template>
  <div>
    <v-todo-list-form form_type="create" id="create" @todoListResponse="onTodoListResponse"> </v-todo-list-form>
  </div>
  <ul>
      <li v-for="list in todoLists" :key="list.id" class=" mt-2 border relative">
        <div class="flex mt-2 row-reverse">
          <span class="mr-auto p-2"> <a :href="`/todo_lists/${list.id}`"> {{ list.name }}</a></span>
          <v-crud-button v-on:click="list.isShow = !list.isShow"> EDIT </v-crud-button>
          <v-crud-button @custom-clicked="deleteList(list.id)" > DELETE </v-crud-button>
        </div>
        <div>
          <v-todo-list-form  :list="list" v-show="list.isShow"   form_type="edit" id="edit" @todoListResponse="onTodoListResponse" > </v-todo-list-form>
        </div>
      </li>


  </ul>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import VCrudButton from "./nested/crud_button";
import VTodoListForm from "./todo_list_form";
  export default {
    name: 'v-todo-lists',
    components: {VTodoListForm, VCrudButton},

    setup() {
      const todoLists = ref([]);
      const isShow = ref(false);

      axios.get("/todo_lists.json")
          .then(response => {
            todoLists.value = response.data;
          });

      function deleteList(id) {
        axios.delete(`/todo_lists/${id}.json`).then(response => {
          this.todoLists = this.todoLists.filter(list => list.id !== id)
        });
      }

      function onTodoListResponse(todoList) {
        if(!todoLists.value.some(list => list.id === todoList.id)){
          todoLists.value.push(todoList)}
        else{
          const index = todoLists.value.findIndex(list => list.id === todoList.id)
          todoLists.value.splice(index, 1, todoList)
        }
      }

      return {
        isShow,
        todoLists,
        deleteList,
        onTodoListResponse,
      }
    }
  }
</script>