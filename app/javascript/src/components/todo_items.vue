<template>
  <p class="p-10 text-2xl text-yellow-500 font-bold my-10 capitalize"> {{ list.name }}'s ToDo Items </p>
  <div>
    <form @submit.prevent="addTodo">
      <div class="flex flex-col mt-2">
        <div class=" flex flex-row pb-2">
          <label for="name" class="py-2 px-4">Name:</label><br>
          <input id="name" type="text" v-model="name" class="py-2
          px-4 border border-yellow-400 rounded-2xl mr-2"/>
        </div>
        <div class="flex flex-row pb-2">
          <label for="details" class="py-2 px-4">Details:</label><br>
          <input id="details" type="text" v-model="details" class="py-2
          px-4 border border-yellow-400 rounded-2xl mr-2"/>
        </div>
      </div>
      <v-crud-button type="submit" class="capitalize my-5"> Create </v-crud-button>
    </form>
  </div>
  <ul>
    <li v-for="todo in todoItems.slice().reverse()" :key="todo.id" class="flex mt-2 border relative">
      <label>
        <input type="checkbox" @change="completeItem(todo.id, todo)"  v-model="todo.completed">
      </label>
      <div class="pl-4" v-if="todo.completed">
        <del>{{ todo.name }} {{ todo.details}}</del>
      </div>
      <div class="pl-4" v-else>
        <span>{{ todo.name }} {{ todo.details}}</span>
      </div>
      <div class="absolute right-0" >
        <button class="bg-yellow-400 rounded-r-sm px-3" v-on:click="removeTodo(todo.id)">X</button>
      </div>
    </li>
  </ul>
</template>

<script>
import {ref} from "vue";
import axios from "axios";
import VCrudButton from "./nested/crud_button";

export default {
  name: 'v-todo-items',
  components: {VCrudButton},
  props: {
    list: {
      type: Object
    },
  },

  setup(props) {
    const todoItems = ref([]);
    const list = props.list
    const name = ref('')
    const details = ref('')

    axios.get(`/todo_lists/${props.list.id}/todo_items.json`)
        .then(response => {
          todoItems.value = response.data;
        });

    function addTodo() {
      axios.post(`/todo_lists/${props.list.id}/todo_items`, {
        name: name.value,
        details: details.value,
        todo_list_id: list.id
      }).then(response => {
        todoItems.value.push(response.data)})
      this.name = ''
      this.details = ''
    }

    function completeItem(id) {
      axios.put(`/todo_lists/${props.list.id}/todo_items/${id}`, {
        completed: event.target.checked,
      })
    }

    function removeTodo(id) {
      axios.delete(`/todo_lists/${props.list.id}/todo_items/${id}.json`).then(response => {
        this.todoItems = this.todoItems.filter(item => item.id !== id)
      });
    }

    return {
      todoItems,
      name,
      details,
      list,
      addTodo,
      removeTodo,
      completeItem,
    }
  }
}
</script>
