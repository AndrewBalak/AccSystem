
import delay from '@/functions/delay'

class Account {
  constructor ({ name, login, password, isAdmin }) {
    this.name = name
    this.login = login
    this.password = password
    this.id = Date.now()
    if (isAdmin) {
      this.isAdmin = isAdmin
    } else {
      this.isAdmin = false
    }
  }
}

class AccountsApi {
  constructor () {
    if (AccountsApi.exist) {
      return AccountsApi.instance
    }
    AccountsApi.instance = this
    AccountsApi.exist = true

    if (!(JSON.parse(localStorage.getItem('accounts')) || []).some((acc) => acc.isAdmin)) {
      const admin = new Account({ name: 'admin', login: 'root', password: 'root', isAdmin: true })
      const accounts = (JSON.parse(localStorage.getItem('accounts')) || [])
      accounts.push(admin)
      localStorage.setItem('accounts', JSON.stringify(accounts))
    }
  }

  async fetch () {
    await delay(500)
    return JSON.parse(localStorage.getItem('accounts'))
  }

  async addAccount (protoAcc) {
    await delay(500)
    const account = new Account(protoAcc)
    const accounts = (JSON.parse(localStorage.getItem('accounts')) || [])
    accounts.push(account)
    localStorage.setItem('accounts', JSON.stringify(accounts))
    return account
  }

  async updateAccounts (upAcc) {
    await delay(500)
    const accounts = JSON.parse(localStorage.getItem('accounts'))
    const updatedAccounts = accounts.map((acc) => acc.id === upAcc.id ? upAcc : acc)
    localStorage.setItem('accounts', JSON.stringify(updatedAccounts))
  }

  async getAccountById (id) {
    const accounts = JSON.parse(localStorage.getItem('accounts'))
    return accounts.filter((acc) => acc.id === id)[0]
  }

  isPasswordCorrect ({ login, password }) {
    return new Promise((resolve) => {
      const accounts = JSON.parse(localStorage.getItem('accounts'))
      const actualAccs = accounts.filter((acc) => acc.login === login)
      if (actualAccs[0] && actualAccs[0].password === password) {
        resolve(true)
      } else {
        resolve(false)
      }
    })
  }

  isLoginUnique (login) {
    return new Promise((resolve) => {
      const accounts = JSON.parse(localStorage.getItem('accounts'))
      if (accounts.some((acc) => acc.login === login)) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  }
}

export default AccountsApi
