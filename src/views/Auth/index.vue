<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="4">
      <v-card class="elevation-12">
        <v-toolbar color="white">
          <template v-slot:default>
            <v-tabs v-model="currentTab" grow>
              <v-tabs-slider></v-tabs-slider>
              <v-tab
                v-for="tab in tabs"
                :key="tab.name"
                :href="'#' + tab.value"
              >
                {{ tab.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="currentTab">
          <v-tab-item v-for="tab in tabs" :key="tab.name" :value="tab.value">
            <component :is="tab.value">
              <v-btn color="primary" text link :to="backLink.path">
                <v-icon class="pr-2">mdi-arrow-left</v-icon>
                {{ backLink.text }}
              </v-btn>
            </component>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Registration from './components/Registration'
import Login from './components/Login'

export default {
  data: () => ({
    backLink: { text: 'Вернуться назад', path: '/' },
    tabs: [
      { name: 'Вход', value: 'login' },
      { name: 'Регистрация', value: 'registration' }
    ],
    currentTab: null
  }),
  components: {
    Registration,
    Login
  }
}
</script>
