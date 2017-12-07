import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/libs/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: '',
    access: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ACCESS: (state, access) => {
      state.access = access
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.userName.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(data => {
          setToken(data.token)
          commit('SET_TOKEN', data.token);
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(data => {
          commit('SET_ROLES', data.role)
          let temp = {};
          data.access.forEach(element => {
            temp[element.categery] = element
          });
          commit('SET_ACCESS', temp);
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
