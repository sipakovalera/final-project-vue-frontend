export default {
  register(state, user) {
    state.user = user
  
  },
  login(state, {token, id}) {
    state.token = token, 
    state.user = id;
  },
  logout(state) {
    state.token = null,
    state.user = null
  }
};
