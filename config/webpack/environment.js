const path = require("path")

const { environment } = require('@rails/webpacker')
const { DefinePlugin } = require('webpack')
const { VueLoaderPlugin } = require('vue-loader')


environment.config.merge({
  resolve:{
    alias: {
      vue: 'vue/dist/vue.esm-bundler.js',
      '@': path.resolve(__dirname, "..", "..", 'app/javascript/src')
    }
  }
})


environment.plugins.prepend('VueLoaderPlugin', new VueLoaderPlugin())

environment.plugins.prepend('Define', new DefinePlugin({
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: process.env.NODE_ENV != 'production'
}))

environment.loaders.prepend('vue', {
  test: /\.vue$/,
  use: [{
    loader: 'vue-loader'
  }]
})

module.exports = environment
