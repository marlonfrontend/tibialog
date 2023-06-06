import { defineStore } from 'pinia'

type StateProps = {
  loading: boolean
}
export const useCountryStore = defineStore('country', {
  state: (): StateProps => ({
    loading: false
  }),

  actions: {},

  getters: {}
})
