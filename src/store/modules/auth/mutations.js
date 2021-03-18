export default {
  register(state, user) {
    state.user = user
  
  },
  login(state, token) {
    state.token = token
  },
  logout(state) {
    state.token = null,
    state.user = null
  }
};
