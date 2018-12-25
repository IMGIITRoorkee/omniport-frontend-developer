const initialState = {
  isLoaded: false
}
const appList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APPLIST':
      return action.payload
    default:
      return state
  }
}

export default appList
