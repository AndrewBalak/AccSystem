<template>
  <v-form>
    <v-row>
      <v-col>
        <v-text-field
          v-model="account.name"
          label="Имя"
          prepend-icon="mdi-account"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
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
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="account.date"
            @input="menu = false"
            locale="ru"
            color="primary darken-1"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="account.appointment"
          label="Должность"
          prepend-icon="mdi-star"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          v-model="account.department"
          label="Отдел"
          prepend-icon="mdi-office-building-outline"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="account.boss"
          :items="accounts"
          prepend-icon="mdi-account-cowboy-hat"
          chips
          label="Начальник"
          item-text="name"
          item-value="id"
          :return-object="true"
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              @click="data.select"
              color="grey darken-1"
              dark
            >
              <v-avatar left>
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-if="data.item.department"
                  v-html="data.item.department"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-autocomplete
          v-model="account.subordinates"
          :items="accounts"
          prepend-icon="mdi-account-group"
          chips
          label="Подчиненнные"
          item-text="name"
          item-value="id"
          :return-object="true"
          multiple
        >
          <template v-slot:selection="data">
            <v-chip
              v-bind="data.attrs"
              :input-value="data.selected"
              close
              @click="data.select"
              @click:close="removeSubordinate(data.item)"
              color="grey darken-1"
              dark
            >
              <v-avatar left>
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              {{ data.item.name }}
            </v-chip>
          </template>
          <template v-slot:item="data">
            <template v-if="typeof data.item !== 'object'">
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
            <template v-else>
              <v-list-item-avatar>
                <v-icon>mdi-account</v-icon>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-html="data.item.name"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="data.item.department"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'editable-form',
  props: ['account'],
  data: () => ({
    menu: false
  }),
  computed: {
    ...mapState({
      accounts: (state) =>
        state.data.accounts.map((acc) => {
          return { name: acc.name, id: acc.id, department: acc.department }
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
      return `${day}/${month}/${year}`
    },
    removeSubordinate (item) {
      console.log(item)
      const index = this.account.subordinates.indexOf(item.id)
      if (index >= 0) this.account.subordinates.splice(index, 1)
    }
  }
}
</script>
