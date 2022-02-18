import Vue from 'vue'
import Vuex from 'vuex'
import hotels from './hotels'
import reservations from './reservations'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const store = new Vuex.Store({
    modules: {
      hotels,
      reservations
    },

    // // enable strict mode (adds overhead!)
    // // for dev mode only
    // strict: process.env.DEBUGGING
  })

  return store
}
