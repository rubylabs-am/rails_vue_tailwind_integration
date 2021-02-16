import { createApp, onBeforeMount, onMounted, onUnmounted, getCurrentInstance } from 'vue';
// import TurbolinksAdapter from 'vue-turbolinks';
import TurbolinksAdapter from './components/nested/turbolinks';
import AllComponents from '@/components';

const vueSelector = new RegExp('^v-');

function componentsNamesInMarkup(container) {
  const allElements = container.querySelectorAll('*');
  const componentsNames = {};

  for (let i = 0; i < allElements.length; i++) {
    const elName = allElements[i].localName;
    if (vueSelector.test(elName)) componentsNames[elName] = true;
  }

  return Object.keys(componentsNames);
}

export default {
  start() {
    // document.addEventListener('turbolinks:load', function (event) {
    //   document.querySelectorAll('a[href^="#"]').forEach(function (el) {
    //     el.setAttribute('data-turbolinks', false);
    //   });
    // });
    document.addEventListener('turbolinks:load', () => {
      this.mountAppOnPage()
    })
  },
  mountAppOnPage() {
    const rootEl = document.querySelector('[data-behavior="vue"]');
    const componentsNames = componentsNamesInMarkup(rootEl)

    if (!componentsNames.length) return;

    const app = createApp({}).use(TurbolinksAdapter)

    componentsNames.forEach((componentName) =>
      app.component(componentName, AllComponents[componentName])
    )

    app.mount(rootEl)
  }
}
