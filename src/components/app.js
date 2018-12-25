import React from 'react'
import { Route } from 'react-router-dom'
import { isMobile, isBrowser } from 'react-device-detect'
import { Scrollbars } from 'react-custom-scrollbars'

import Sidebar from 'core/common/src/components/primary-sidebar'
import { AppHeader, AppFooter, AppMain, Tiles } from 'formula_one'
import AppList from './app-list'
import AppDetail from './app-detail'

import main from 'formula_one/src/css/app.css'

export default class App extends React.PureComponent {
  render () {
    const { match } = this.props
    const creators = [
      {
        name: 'Dhruv Bhanushali',
        role: 'Backend Developer'
      },
      {
        name: 'Praduman Goyal',
        role: 'Frontend Developer'
      }
    ]
    return (
      <React.Fragment>
        <div styleName='app'>
          <AppHeader mode='site' appName='developer' userDropdown />
          {isMobile && <Sidebar />}
          <AppMain>
            <div styleName='main.app-main'>
              {isBrowser && <Sidebar />}
              <Scrollbars autoHide>
                <Route exact path={`${match.path}`} component={AppList} />
                <Route exact path={`${match.path}:id`} component={AppDetail} />
              </Scrollbars>
            </div>
          </AppMain>
          <AppFooter creators={creators} />
        </div>
      </React.Fragment>
    )
  }
}
