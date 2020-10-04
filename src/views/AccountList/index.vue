<template>
  <v-card>
    <v-container class="pa-5">
      <Filters @doFilter="doFilter" :accounts="accounts" :headers="headers" />
      <LoadingTable v-if="loadingData"/>
      <List v-else :accounts="filteredAccounts" :headers="headers" />
    </v-container>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import Filters from './components/Filter'
import List from './components/List'
import LoadingTable from './components/LoadingTable'

export default {
  components: {
    Filters,
    List,
    LoadingTable
  },
  data: () => ({
    headers: [
      'имя',
      'дата приема на работу',
      'должность',
      'отдел',
      'начальник'
    ],
    loadingData: true,
    filteredAccounts: []
  }),
  computed: {
    ...mapState({
      accounts: (state) => state.data.accounts
    })
  },
  watch: {
    accounts: {
      handler () {
        this.filteredAccounts = [...this.accounts]
        this.loadingData = false
      },
      immediate: true
    }
  },
  methods: {
    doFilter (filter) {
      this.loadingData = true
      this.filteredAccounts = [...this.accounts]
      for (const [key, value] of Object.entries(filter)) {
        if (value === undefined) continue
        if (key === 'dates') {
          if (value.length < 2) {
            continue
          } else {
            this.filteredAccounts = this.filteredAccounts.filter((acc) => {
              return (new Date(acc.date) - new Date(value[0]) >= 0 &&
            new Date(acc.date) - new Date(value[1]) <= 0)
            })
          }
        } else if (key === 'boss') {
          this.filteredAccounts = this.filteredAccounts.filter((acc) => acc.boss && acc.boss.id === value.id)
        } else {
          this.filteredAccounts = this.filteredAccounts.filter((acc) => acc[key] === value)
        }
      }
      setTimeout(() => {
        this.loadingData = false
      }, 100)
    }
  }
}
</script>
