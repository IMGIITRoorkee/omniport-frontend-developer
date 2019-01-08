const initialState = {
  isLoaded: false,
  data: {}
}
const optionsList = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OPTIONSLIST':
      return action.payload
    default:
      return state
  }
}

export default optionsList
