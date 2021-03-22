export default {
  isLoggedIn: state => state.token !== null,
  userId: state => state.user
};
