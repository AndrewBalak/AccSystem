<template>
  <v-card>
    <v-container class="pa-5">
      <v-row align="center" justify="center">
        <v-col>
          <h1 class="text-h4">{{ computedTitle }}</h1>
        </v-col>
        <v-spacer class="flex-grow-0"></v-spacer>
        <v-col class="d-flex justify-end">

          <v-tooltip bottom color="lime lighten-1" v-if="canEdit">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs">
                <v-fab-transition>
                  <v-btn
                    v-if="!edit"
                    v-show="!edit"
                    color="lime"
                    icon
                    outlined
                    fab
                    large
                    @click="editStatusChange"
                    :disabled="loadingInput"
                    v-on="on"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </v-fab-transition>
              </div>
            </template>
            <span>Редактировать</span>
          </v-tooltip>

          <v-tooltip bottom color="success lighten-1">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs">
                <v-fab-transition>
                  <v-btn
                    v-if="edit"
                    v-show="edit"
                    color="success lighten-1"
                    class="mr-4 ml-4"
                    icon
                    outlined
                    fab
                    large
                    :disabled="!canSave"
                    @click="save"
                    v-on="on"
                  >
                    <v-icon>mdi-content-save</v-icon>
                  </v-btn>
                </v-fab-transition>
              </div>
            </template>
            <span>Сохранить</span>
          </v-tooltip>

          <v-tooltip bottom color="warning lighten-1">
            <template v-slot:activator="{ on, attrs }">
              <div v-bind="attrs">
                <v-fab-transition>
                  <v-btn
                    v-if="edit"
                    v-show="edit"
                    color="warning lighten-1"
                    icon
                    outlined
                    fab
                    large
                    @click="cancel"
                    :disabled="loadingInput"
                    v-on="on"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-fab-transition>
              </div>
            </template>
            <span>Отменить</span>
          </v-tooltip>
        </v-col>
      </v-row>
      <keep-alive>
        <component :account="account" :is="computedForm"></component>
      </keep-alive>
    </v-container>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import EditableForm from './components/EditableForm'
import ReadableForm from './components/ReadableForm'
import LoadingForm from './components/LoadingForm'

export default {
  components: {
    'editable-form': EditableForm,
    'readable-form': ReadableForm,
    'loading-form': LoadingForm
  },
  data: () => ({
    edit: false,
    loadingInput: false,
    account: {},
    accountBackUp: {}
  }),
  mounted () {
    this.init()
  },
  computed: {
    ...mapState({
      currentAccount: (state) => state.data.currentAccount
    }),
    isPageCurrentAccount () {
      if (this.currentAccount) {
        return +this.$route.params.id === this.currentAccount.id
      }
      return false
    },
    canEdit () {
      return this.isPageCurrentAccount || (this.currentAccount && this.currentAccount.isAdmin)
    },
    computedTitle () {
      return this.isPageCurrentAccount
        ? 'Мой аккаунт'
        : 'Персональные данные сотрудника'
    },
    computedForm () {
      return this.loadingInput
        ? 'loading-form'
        : this.edit
          ? 'editable-form'
          : 'readable-form'
    },
    canSave () {
      return JSON.stringify(this.account) !== JSON.stringify(this.accountBackUp)
    }
  },
  methods: {
    ...mapActions({
      getAccountById: 'getAccountById',
      updateAccount: 'updateAccount'
    }),
    async init () {
      const account = await this.getAccountById(+this.$route.params.id)
      this.account = { ...account }
      this.accountBackUp = { ...account }
    },
    editStatusChange () {
      this.edit = !this.edit
      this.loadingInput = true
      setTimeout(() => {
        this.loadingInput = false
      }, 500)
    },
    save () {
      this.editStatusChange()
      this.accountBackUp = { ...this.account }
      this.updateAccount(this.account)
    },
    cancel () {
      this.editStatusChange()
      this.account = { ...this.accountBackUp }
    }
  },
  watch: {
    '$route.params': {
      handler () {
        this.init()
      },
      immediate: true
    }
  }
}
</script>
