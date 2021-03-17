<template>
  <a :href="url" class="mr-4 py-0 px-5
          ring-offset-2 hover:ring-1 hover:ring-indigo-500
          focus:ring-2 focus:ring-indigo-400 focus:outline-none
          bg-gradient-to-r from-yellow-100 to-green-200
          text-gray-500 rounded-lg shadow"
  >
    <slot>Link</slot>
  </a>
</template>

<script>
export default {
  name: 'v-link-to',

  props: {
    url: {
      type: String,
      default: ''
    }
  }
}

</script>
