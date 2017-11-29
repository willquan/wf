const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  access: state => state.user.access,
  scroll: state => state.scroll.scroll,
  currentScroll: state => state.scroll.currentScroll,
}
export default getters
