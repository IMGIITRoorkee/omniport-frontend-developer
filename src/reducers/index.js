import { combineReducers } from 'redux'
import AppList from './appList'
import ActiveApp from './activeApp'
import OptionsList from './optionsList'

const rootReducers = combineReducers({
  appList: AppList,
  activeApp: ActiveApp,
  optionsList: OptionsList
})

export default rootReducers
