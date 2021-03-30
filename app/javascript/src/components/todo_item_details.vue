<template>
  <link-to :url="`/todo_lists/${todoListId}/todo_items`">Back to items list</link-to>
  <div class="py-3 text-4xl text-indigo-300 font-bold my-5">
    {{name}}
  </div>
  <div class="py-2 text-3xl text-indigo-300 font-bold my-4">
    Description
  </div>
  <p class="w-1/2">{{description}}</p>
</template>

<script>
import LinkTo from "./nested/link_to";

export default {
  name: 'v-todo-item-details',

  components: {
    LinkTo
  },

  props: {
    name: {
      type: String
    },
    description: {
      type: String
    },
    todoListId: {
      type: Number
    }
  }

}
</script>