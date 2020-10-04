<template>
  <v-form>
    <v-container class="pa-6">
      <v-row>
        <v-text-field
          v-model="name"
          :error-messages="nameErrors"
          :counter="20"
          label="Имя"
          required
          @input="$v.name.$touch()"
          @blur="$v.name.$touch()"
        ></v-text-field>
      </v-row>
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
        <v-text-field
          v-model="passwordConfirm"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :error-messages="passwordConfirmErrors"
          :type="showPassword ? 'text' : 'password'"
          label="Подтвердите Пароль"
          counter
          @click:append="showPassword = !showPassword"
          @input="$v.passwordConfirm.$touch()"
          @blur="$v.passwordConfirm.$touch()"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-col>
          <slot></slot>
        </v-col>
        <v-spacer></v-spacer>
        <v-col class="d-flex flex-row">
          <v-btn
            class="mr-4"
            @click="submit"
            :loading="loading"
            :disabled="$v.$invalid || loading"
            color="primary"
            >Войти</v-btn
          >
          <v-btn color="warning" @click="clear">Очистить</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  maxLength,
  minLength,
  sameAs
} from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

export default {
  mixins: [validationMixin],
  data: () => ({
    name: '',
    login: '',
    password: '',
    passwordConfirm: '',
    showPassword: false
  }),
  validations: {
    name: { required, maxLength: maxLength(20) },
    login: {
      required,
      maxLength: maxLength(10),
      async isUnique (value) {
        if (value === '') return true
        return await this.isLoginUnique(value)
      }
    },
    password: { required, minLength: minLength(6) },
    passwordConfirm: { sameAsPassword: sameAs('password') }
  },
  computed: {
    ...mapState({
      loading: (state) => state.meta.loading
    }),
    nameErrors () {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength &&
        errors.push('Необходимо ввести не более 20 символов')
      !this.$v.name.required && errors.push('Имя не может быть пустым.')
      return errors
    },
    loginErrors () {
      const errors = []
      if (!this.$v.login.$dirty) return errors
      !this.$v.login.maxLength &&
        errors.push('Необходимо ввести не более 10 символов')
      !this.$v.login.required && errors.push('Логин не может быть пустым.')
      !(this.$v.login.isUnique || this.loading) && errors.push('Такой логин уже используется')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength &&
        errors.push('Необходимо ввести не менее 6 символов')
      !this.$v.password.required && errors.push('Пароль не может быть пустым.')
      return errors
    },
    passwordConfirmErrors () {
      const errors = []
      if (!this.$v.passwordConfirm.$dirty) return errors
      !this.$v.passwordConfirm.sameAsPassword &&
        errors.push('Пароли должны совпадать.')
      return errors
    }
  },

  methods: {
    ...mapActions({
      registration: 'registration',
      isLoginUnique: 'isLoginUnique'
    }),
    async submit () {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        const account = {
          name: this.name,
          login: this.login,
          password: this.password
        }
        await this.registration(account)
        this.clear()
        this.$router.push('/')
      }
    },
    clear () {
      this.$v.$reset()
      this.name = ''
      this.login = ''
      this.password = ''
      this.passwordConfirm = ''
    }
  }
}
</script>
