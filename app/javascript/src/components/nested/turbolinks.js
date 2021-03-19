function handleVueDestruction(vue) {
  const event = vue.$options.destroyEvent || defaultEvent();

  document.addEventListener(event, function teardown() {
    vue.$.appContext.app.unmount();
    document.removeEventListener(event, teardown);
  });
}

const Mixin = {
  beforeMount: function() {
    if (this === this.$root) {

      handleVueDestruction(this);
    }
  },
  unmounted: function () {
    if (this !== this.$root) return;

    const template = this.$.appContext.app._component.template;
    const container = this.$.appContext.app._container;

    container.innerHTML = template
  }
};

function plugin(app, options) {
  // Install a global mixin
  app.mixin(Mixin)
}

function defaultEvent() {
  if (typeof Turbo !== 'undefined') {
    return 'turbo:visit';
  }

  return 'turbolinks:visit';
}

export { Mixin as turbolinksAdapterMixin };
export default plugin;
