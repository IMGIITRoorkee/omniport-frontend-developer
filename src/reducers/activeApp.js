const initialState = {
  isLoaded: false,
  inEditMode: 'none',
  data: {}
}
const activeApp = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ACTIVE_APP':
      return action.payload
    case 'SET_CHANGING':
      return { ...action.payload, data: state.data }
    default:
      return state
  }
}

export default activeApp
