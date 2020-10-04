<template>
  <v-footer
    color="indigo"
    app
  >
    <span class="white--text">&copy; {{ date }}</span>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    date: new Date().getFullYear()
  })
}
</script>
