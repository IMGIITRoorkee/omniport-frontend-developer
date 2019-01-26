import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { isMobile, isBrowser } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import Sidebar from 'core/common/src/components/primary-sidebar'
import { AppHeader, AppFooter, AppMain } from 'formula_one'
import AppList from './app-list'
import AppDetail from './app-detail'

import main from 'formula_one/src/css/app.css'
import AddApp from './add-app'

export default class App extends React.PureComponent {
  render () {
    const { match } = this.props
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Backend developer',
        link: 'https://dhruvkb.github.io/'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend developer',
        link: 'https://pradumangoyal.github.io'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='app'>
          <AppHeader userDropdown />
          {isMobile && <Sidebar />}
          <AppMain>
            <div styleName='main.app-main'>
              {isBrowser && <Sidebar />}
              <Scrollbars autoHide>
                <Switch>
                  <Route exact path={`${match.path}`} component={AppList} />
                  <Route exact path={`${match.path}add`} component={AddApp} />
                  <Route
                    exact
                    path={`${match.path}:id`}
                    component={AppDetail}
                  />
                </Switch>
              </Scrollbars>
            </div>
          </AppMain>
          <AppFooter creators={creators} />
        </div>
      </React.Fragment>
    )
  }
}
