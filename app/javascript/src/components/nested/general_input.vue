<template>
  <div class="p-6">
    <label :for="inputID" class="pr-2">
      <slot>Test label</slot>
    </label>
    <input type="text" :id="inputID" v-model="message"/>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'v-general-input',

  props: {
    modelValue: String,
    stringLength: Number
  },

  setup(props, { emit }) {
  const message = computed({
    get: () => props.modelValue,
    set: (value) => {
      emit('update:modelValue', value);
      emit('update:stringLength', value.length);
    }
  });

    return {
      message,
      inputID: Math.floor((Math.random() * 100) + 1) + (+new Date)
    }
  }
}
</script>
