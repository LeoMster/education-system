import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isAuth: false
  }),
  actions: {
    changeAuth() {
      this.isAuth = true
    }
  }
})