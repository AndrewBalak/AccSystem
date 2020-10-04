<template>
  <v-col>
    <v-row>
      <v-col>
        <h2 class="title mb-2">Имя </h2>
        <span class="body-1">{{account.name ? account.name : 'Нет данных'}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="title mb-2">Дата приема на работу</h2>
        <span class="body-1">{{computedDateFormatted ? computedDateFormatted : 'Нет данных'}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="title mb-2">Должность </h2>
        <span class="body-1">{{account.appointment ? account.appointment : 'Нет данных'}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="title mb-2">Отдел </h2>
        <span class="body-1">{{account.department ? account.department : 'Нет данных'}}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="title mb-2">Начальник </h2>
        <v-chip link :to="account.boss.id.toString()" v-if="account.boss">
          <v-avatar left>
            <v-icon>mdi-account</v-icon>
          </v-avatar>
          {{ getActualAccountName(account.boss) }}
        </v-chip>
        <span v-else class="body-2">Нет данных</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2 class="title mb-2">Подчиненные</h2>
        <v-chip-group column v-if="account.subordinates && account.subordinates.length > 0">
          <v-chip v-for="(subordinate, idx) in account.subordinates" :key="idx" link :to="subordinate.id.toString()">
            <v-avatar left>
              <v-icon>mdi-account</v-icon>
            </v-avatar>
            {{ getActualAccountName(subordinate) }}
          </v-chip>
        </v-chip-group>
        <span v-else class="body-2">Нет данных</span>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'readable-form',
  props: ['account'],
  computed: {
    ...mapState({
      accounts: (state) =>
        state.data.accounts.map((acc) => {
          return { name: acc.name, id: acc.id }
        })
    }),
    computedDateFormatted () {
      return this.formatDate(this.account.date)
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    getActualAccountName (oldAcc) {
      return this.accounts.filter((acc) => acc.id === oldAcc.id)[0].name
    }
  }
}
</script>
