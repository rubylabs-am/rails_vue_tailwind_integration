<template>
  <link-to :url="`/todo_lists/${todoListId}/todo_items`">Back to items list</link-to>
  <div class="py-3 text-4xl text-indigo-300 font-bold my-5">
    {{message}}
  </div>
  <p v-if="successMsg" class="my-3 text-green-500">
    {{successMsg}}
  </p>
  <todo-item-form
      @form-submit="edit(todoListId, id)"
      button-name="Edit"
  >
  </todo-item-form>
  <p v-if="errorMsg" class="my-3 text-red-500">
    {{errorMsg}}
  </p>
</template>

<script>
import TodoItemForm from "./nested/todo_item_form";
import { ref, provide } from "vue"
import axios from "axios";
import LinkTo from "./nested/link_to";

export default {
  name: 'v-todo-item-edit',

  components: {
    LinkTo,
    TodoItemForm
  },

  props: {
    message: {
      type: String
    },
    itemName: {
      type: String
    },
    itemDetails: {
      type: String
    },
    todoListId: {
      type: Number,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    buttonName: {
      type: String
    }
  },

  setup(props) {

    const inputString = ref(props.itemName);
    const textAreaString = ref(props.itemDetails);
    const successMsg = ref('');
    const errorMsg = ref('');

    provide('inputString', inputString)
    provide('textAreaString', textAreaString)

    function edit(todo_list_id, id) {
      let params = {todo_item: {name: inputString.value, details: textAreaString.value}}
      axios.put(`/todo_lists/${todo_list_id}/todo_items/${id}`, params).then((response) => {
        if (response.data.message) {
          successMsg.value = response.data.message
        }else {
          errorMsg.value = response.data.error_msg
        }
      });
    }

    return {
      edit,
      successMsg,
      errorMsg
    }
  }
}
</script>
