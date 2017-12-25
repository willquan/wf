const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  roles: state => state.user.roles,
  rights: state => state.user.rights,
  singlePageHeight: state => state.scroll.singlePageHeight,
}
export default getters
