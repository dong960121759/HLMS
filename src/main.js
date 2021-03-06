import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // internationalization
import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log
import Print from './utils/vue-print-nb/src'
import Keycloak from 'keycloak-js'
import * as filters from './filters' // global filters

Vue.use(Print)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'mini', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

const initOptions = {
  url: 'http://localhost:8180/auth', realm: 'Julong', clientId: 'login-app', onLoad: 'login-required', checkLoginIframe: false
}

const keycloak = Keycloak(initOptions)

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload()
  } else {
    console.info('Authenticated')

    new Vue({
      el: '#app',
      router,
      store,
      i18n,
      render: h => h(App, { props: { keycloak: keycloak }})
    })
  }
})
export { keycloak }
store.dispatch('user/keycloakLogin')
