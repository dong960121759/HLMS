import { keycloaklogin } from '@/api/user'
import { getToken, setToken, removeToken, setLocation } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { keycloak } from '@/main.js'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo, deptID) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      keycloaklogin({ username: username.trim(), password: password }).then(response => {
        // const { data } = response
        console.log(keycloak)
        console.log(keycloak.tokenParsed)
        const roles = keycloak.tokenParsed.resource_access['login-app'].roles
        console.log(roles)
        commit('SET_TOKEN', 'admin-token')
        setToken('admin-token')
        setLocation(deptID)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  keycloakLogin({ commit }) {
    commit('SET_TOKEN', keycloak.token)
    setToken(keycloak.token)
  },
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      // getInfo(state.token).then(response => {
      const data = {
        roles: keycloak.tokenParsed.resource_access['login-app'].roles,
        userId: keycloak.tokenParsed.preferred_username,
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: keycloak.tokenParsed.name
      }

      if (!data) {
        reject('Verification failed, please Login again.')
      }

      const { roles, userId, name, avatar, introduction } = data

      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        reject('getInfo: roles must be a non-null array!')
      }

      commit('SET_ROLES', roles)
      commit('SET_USERID', userId)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
      //  }).catch(() => {
    //  reject(error)
    })
    // })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      keycloak.logout()
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
