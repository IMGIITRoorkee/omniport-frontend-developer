import { combineReducers } from 'redux'
import AppList from './appList'
import ActiveApp from './activeApp'

const rootReducers = combineReducers({
  appList: AppList,
  activeApp: ActiveApp
})

export default rootReducers
