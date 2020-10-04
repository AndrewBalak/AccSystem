<template>
  <v-form>
    <v-container class="pa-6">
      <v-row>
        <v-text-field
          v-model="login"
          :error-messages="loginErrors"
          :counter="10"
          label="Логин"
          required
          @input="$v.login.$touch()"
          @blur="$v.login.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="passwordErrors"
          :type="showPassword ? 'text' : 'password'"
          label="Пароль"
          counter
          @click:append="showPassword = !showPassword"
          required
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col>
          <slot></slot>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex justify-end">
          <v-btn color="primary" @click="submit">Войти</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

export default {
  mixins: [validationMixin],
  data: () => ({
    login: '',
    password: '',
    showPassword: false
  }),
  validations: {
    login: {
      required,
      async isUnique (value) {
        if (value === '') return true
        return !(await this.isLoginUnique(value))
      }
    },
    password: {
      async isCorrect (value) {
        if (value === '') return true
        return await this.isPasswordCorrect({ login: this.login, password: value })
      }
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.meta.loading
    }),
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) return errors
      !this.$v.login.required && errors.push('Логин не может быть пустым.')
      !this.$v.login.isUnique && errors.push('Пользователя с таким логином не найдено')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.isCorrect && errors.push('Неверный пароль.')
      return errors
    }
  },
  methods: {
    ...mapActions({
      signIn: 'signIn',
      isLoginUnique: 'isLoginUnique',
      isPasswordCorrect: 'isPasswordCorrect'
    }),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        await this.signIn({ login: this.login })
        this.clear()
        this.$router.push('/')
      }
    },
    clear () {
      this.$v.$reset()
      this.login = ''
      this.password = ''
    }
  }
}
</script>
