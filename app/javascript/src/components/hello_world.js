import { ref } from 'vue'

export default {
  name: 'v-hello-world',
  template: `
    <p>{{ message }}</p>
  `,
  setup() {
    const message = ref('Hello World')

    return {
      message
    }
  }
}
