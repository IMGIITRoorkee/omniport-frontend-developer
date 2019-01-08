const initialState = {
  isLoaded: false,
  data: []
}
const appList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_APPLIST':
      return action.payload
    case 'DELETE_APP':
      return {
        isLoaded: true,
        data: state.data.filter(x => {
          return x.id !== action.payload
        })
      }
    default:
      return state
  }
}

export default appList
