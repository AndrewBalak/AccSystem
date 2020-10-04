<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left" v-for="(header, idx) in headers" :key="idx">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <router-link
          v-for="account in accounts"
          :key="account.id"
          tag="tr"
          :to="'/account/' + account.id"
        >
          <td>{{ account.name }}</td>
          <td>{{ formatDate(account.date) }}</td>
          <td>{{ account.appointment }}</td>
          <td>{{ account.department }}</td>
          <td>
            {{
              (account.boss && account.boss.name)
                ? getActualAccountName(account.boss)
                : ""
            }}
          </td>
        </router-link>
        <p class="text-h5 pa-5" v-if="accounts.length === 0"> Нет данных</p>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: ['accounts', 'headers'],
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    getActualAccountName (oldAcc) {
      return this.accounts.filter((acc) => acc.boss && acc.boss.id === oldAcc.id)[0].name
    }
  }
}
</script>

<style scoped>
.theme--light.v-data-table
  > .v-data-table__wrapper
  > table
  > tbody
  > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background-color: #e8eaf6;
  cursor: pointer;
}
</style>
