import axios from "axios";

export default {
  async register({ commit }, user) {
    const response = await axios.post('/register', user)
    commit('register', response);
  },
  async login({ commit }, { login, password }) {
    const response = await axios.post('/login', { login, password })
    if(response.data.token){
      const token = await response.data.token;
      const id = await response.data.user.id;
      localStorage.setItem('token', token);
      localStorage.setItem('id', id); 
      commit('login', {token, id}); 
    }
  },
  logout({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    delete axios.defaults.headers.common["Authorization"];
  }
};
