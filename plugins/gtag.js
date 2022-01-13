import Vue from 'vue'
import VueGtag from 'vue-gtag'

Vue.use(VueGtag, {
  config: { id: 'G-BH6PFWW9SP', enable: process.env.NODE_ENV === 'production' },
})
