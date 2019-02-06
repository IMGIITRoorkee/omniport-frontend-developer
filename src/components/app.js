import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars'

import AppList from './app-list'
import AppDetail from './app-detail'
import AddApp from './add-app'

import main from 'formula_one/src/css/app.css'

export default class App extends React.PureComponent {
  render () {
    const { match } = this.props
    return (
      <Scrollbars autoHide>
        <Switch>
          <Route exact path={`${match.path}`} component={AppList} />
          <Route exact path={`${match.path}add`} component={AddApp} />
          <Route exact path={`${match.path}:id`} component={AppDetail} />
          <Route render={props => <Redirect to='/404' />} />
        </Switch>
      </Scrollbars>
    )
  }
}
