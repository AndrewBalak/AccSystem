<template>
  <div>
    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn small color="success" dark link :to="loginLink.path" v-if="currentAccount === null">
        <v-icon small>mdi-login</v-icon>
        <span class="pl-2">{{ loginLink.name }}</span>
      </v-btn>
      <v-btn small color="warning" @click="signOut" v-else>
        <v-icon small>mdi-logout</v-icon>
        <span class="pl-2">{{ loginLink.name }}</span>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(link, idx) in links"
          :key="idx"
          link
          :to="link.path"
          active-class="indigo--text text--accent-4"
          exact
        >
          <v-list-item-action>
            <v-icon>{{link.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{link.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => ({
    title: 'Система учета сотрудников',
    drawer: null
  }),
  computed: {
    ...mapState({
      currentAccount: (state) => state.data.currentAccount
    }),
    loginLink () {
      return { name: this.currentAccount === null ? 'Войти' : 'Выйти', path: '/auth' }
    },
    links () {
      const links = [{ name: 'Список сотрудников', path: '/', icon: 'mdi-view-list' }]
      if (this.currentAccount !== null) {
        links.push({ name: 'Мой аккаунт', path: `/account/${this.currentAccount.id}`, icon: 'mdi-account' })
      }
      return links
    }
  },
  methods: {
    ...mapActions({
      signOut: 'signOut'
    })
  }
}
</script>
