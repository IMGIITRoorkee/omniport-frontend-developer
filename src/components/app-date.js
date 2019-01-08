import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Popup } from 'semantic-ui-react'
import moment from 'moment'

import main from '../css/app-field.css'

class AppDate extends React.PureComponent {
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <Table.Row>
        <Table.Cell>Created on</Table.Cell>
        <Table.Cell>
          <div styleName='desc-container'>
            {moment(data['created']).format('MMMM Do YYYY, h:mm:ss a')}
          </div>
        </Table.Cell>
        <Table.Cell />
      </Table.Row>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeApp: state.activeApp
  }
}

export default connect(
  mapStateToProps,
  null
)(AppDate)
