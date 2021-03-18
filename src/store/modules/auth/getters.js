export default {
  isLoggedIn: state => state.token !== null,
  user: state => state.user
};
