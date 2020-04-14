const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  size: state => state.app.size,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  authorization: state => state.user.authorization,
  userInfo: state => state.user.userInfo,
  avatar: state => state.user.authorization.avatar,
  name: state => state.user.authorization.name,
  errorLogs: state => state.errorLog.logs
}
export default getters
