<template>
  <form v-on:submit.prevent="clicked" class="w-1/2 bg-light-blue-300 flex flex-col px-3 py-2 rounded-lg">
    <label for="new-todo">Name</label>
    <input type="text" v-model="inputString" id="new-todo" class="p-1">
    <label for="new-todo-details">Description</label>
    <textarea v-model="textAreaString" id="new-todo-details" class="p-3"></textarea>
    <button class="w-24 my-2 py-2
        ring-offset-2 hover:ring-1 hover:ring-indigo-500
        focus:ring-2 focus:ring-indigo-400 focus:outline-none
        bg-gradient-to-r from-yellow-100 to-green-200
        text-gray-500 rounded-lg shadow"
    >
      {{buttonName}}
    </button>
  </form>
</template>

<script>
import { inject } from 'vue'

export default {
  name: 'v-todo-item-form',

  props: {
    buttonName: {
      type: String
    }
  },

  setup(props, { emit }) {
    const inputString = inject('inputString')
    const textAreaString = inject('textAreaString')

    function clicked() {
      emit('form-submit')
    }

    return {
      clicked,
      inputString,
      textAreaString
    }
  }
}
</script>
