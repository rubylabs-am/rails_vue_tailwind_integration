import { ref } from 'vue';
import TestButton from './nested/test_button';
import TestInput from './nested/test_input';

export default {
  name: 'v-test',
  template: `
    <div class="bg-light-blue-300 inline-block px-3 py-1 rounded-lg">
      <p>{{ message }}</p>
      <p>{{ myNum }}</p>
      <p><span class="mr-2">{{ symbolsCount }}:</span>{{ inputString }}</p>
    </div>

    <test-button @click="clicked()">
      count {{ myNum }}
    </test-button>

    <test-button @custom-clicked="clicked()"></test-button>

    <test-input
        v-model="inputString"
        v-model:string-length="symbolsCount">
    </test-input>
  `,
  props: {
    message: {
      type: String,
      default: 'test'
    },
  },
  components: {
    TestButton,
    TestInput
  },
  setup() {
    const myNum = ref(0);
    const inputString = ref('');
    const symbolsCount = ref(0);

    function clicked() {
      myNum.value++
    }

    return {
      myNum,
      inputString,
      symbolsCount,
      clicked
    }
  }
}
