<template>
  <v-row class="align-center">
    <v-col>
      <v-autocomplete
        v-model="filters.name"
        :items="nameFilters"
        solo
        label="Имя"
        hide-details
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-menu
        v-model="menu"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="computedDateFormatted"
            label="Дата приема на работу"
            readonly
            solo
            v-bind="attrs"
            v-on="on"
            hide-details
          ></v-text-field>
        </template>
        <v-date-picker
          v-model="filters.dates"
          range
          @input="datepickerHandler"
          locale="ru"
          color="primary darken-1"
        ></v-date-picker>
      </v-menu>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="filters.appointment"
        :items="appointmentFilters"
        solo
        label="Должность"
        hide-details
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="filters.department"
        :items="departmentFilters"
        solo
        label="Отдел"
        hide-details
      ></v-autocomplete>
    </v-col>
    <v-col>
      <v-autocomplete
        v-model="filters.boss"
        :items="bossFilters"
        solo
        label="Начальник"
        hide-details
        item-text="name"
        item-value="id"
        :return-object="true"
      ></v-autocomplete>
    </v-col>
    <v-spacer></v-spacer>

    <v-btn x-large icon @click="clearFilter">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </v-row>
</template>

<script>

export default {
  props: ['accounts'],
  data: () => ({
    filters: { dates: [] },
    menu: false
  }),
  computed: {
    nameFilters () {
      return this.accounts.filter((acc) => acc.name).map((acc) => acc.name)
    },
    appointmentFilters () {
      return this.accounts.filter((acc) => acc.appointment).map((acc) => acc.appointment)
    },
    departmentFilters () {
      return this.accounts.filter((acc) => acc.department).map((acc) => acc.department)
    },
    bossFilters () {
      return this.accounts.filter((acc) => acc.boss).map((acc) => this.getActualAccountName(acc))
    },
    computedDateFormatted () {
      if (
        this.formatDate(this.filters.dates[0]) &&
        this.formatDate(this.filters.dates[1])
      ) {
        return (
          this.formatDate(this.filters.dates[0]) +
          ' - ' +
          this.formatDate(this.filters.dates[1])
        )
      } else {
        return ''
      }
    }
  },
  methods: {
    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}.${month}.${year}`
    },
    datepickerHandler () {
      if (this.filters.dates.length === 2) this.menu = false
    },
    clearFilter () {
      this.filters = { dates: [] }
    },
    getActualAccountName (oldAcc) {
      console.log({
        id: this.accounts.filter((acc) => acc.id === oldAcc.boss.id)[0].id,
        name: this.accounts.filter((acc) => acc.id === oldAcc.boss.id)[0].name
      })
      return {
        id: this.accounts.filter((acc) => acc.id === oldAcc.boss.id)[0].id,
        name: this.accounts.filter((acc) => acc.id === oldAcc.boss.id)[0].name
      }
    }
  },
  watch: {
    filters: {
      handler () {
        this.$emit('doFilter', this.filters)
      },
      deep: true
    }
  }
}
</script>
