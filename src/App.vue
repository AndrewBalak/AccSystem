<template>
  <v-app>
    <v-slide-x-reverse-transition>
      <v-alert :type="alert.type" class="alert" v-if="alert.show">
        {{alert.message}}
      </v-alert>
    </v-slide-x-reverse-transition>
    <component :is="layout">
      <router-view></router-view>
    </component>
    <v-overlay :value="loading" opacity="0.1">
      <v-progress-circular
        indeterminate
        size="128"
        color="green"
      ></v-progress-circular>
    </v-overlay>
  </v-app>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    EmptyLayout,
    MainLayout
  },
  async mounted () {
    await this.init()
  },
  computed: {
    ...mapState({
      loading: (state) => state.meta.loading,
      alert: (state) => state.meta.alert
    }),
    layout () {
      return `${this.$route.meta.layout || 'empty'}-layout`
    }
  },
  methods: {
    ...mapActions({
      init: 'init'
    })
  }
}
</script>
<style scoped>
.alert{
  position: absolute;
  top: 64px;
  right: 0;
  z-index: 1;
}
</style>
