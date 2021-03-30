<template>
  <link-to :url="`/todo_lists`">Back to list</link-to>
  <div class="py-3 text-4xl text-indigo-300 font-bold my-5">
    {{message}}
  </div>
  <p v-if="successMsg" class="my-3 text-green-500">
    {{successMsg}}
  </p>
  <div class="bg-light-blue-300 inline-flex px-3 py-2 rounded-lg">
    <general-input v-model="inputString">Name</general-input>
    <general-button @custom-clicked="edit(id)">Edit</general-button>
  </div>
  <p v-if="errorMsg" class="my-3 text-red-500">
    {{errorMsg}}
  </p>
</template>

<script>
import GeneralInput from "./nested/general_input";
import GeneralButton from "./nested/general_button";
import LinkTo from "./nested/link_to";
import { ref } from "vue"
import axios from "axios";

export default {
  name: 'v-todo-list-edit',

  components: {
    GeneralInput,
    GeneralButton,
    LinkTo
  },

  props: {
    message: {
      type: String
    },
    name: {
      type: String
    },
    id: {
      type: Number,
      required: true
    }
  },

  setup(props) {

    const inputString = ref(props.name);
    const successMsg = ref('');
    const errorMsg = ref('');

    function edit(id) {
      let params = {todo_list: {name: inputString.value}}
      axios.put(`/todo_lists/${id}`, params).then((response) => {
        if (response.data.message) {
          successMsg.value = response.data.message
        }else {
          errorMsg.value = response.data.error_msg
        }
      });
    }

    return {
      inputString,
      edit,
      successMsg,
      errorMsg
    }
  }
}
</script>
