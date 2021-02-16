import { computed } from 'vue';

export default {
  name: 'v-test-input',
  template: `
    <div class="p-6">
      <label :for="inputID">
        <slot>Test label</slot>
      </label>
      <input type="text" :id="inputID" v-model="message"/>
    </div>
  `,
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
