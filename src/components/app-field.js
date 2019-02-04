import React from 'react'
import { connect } from 'react-redux'
import { Table, Icon, Popup } from 'semantic-ui-react'

import main from '../css/app-field.css'

class AppField extends React.PureComponent {
  handleClick = () => {
    let range = document.createRange()
    range.selectNodeContents(this.textArea)
    let sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    document.execCommand('copy')
    sel.removeAllRanges()
  }
  render () {
    const { activeApp, field, verboseName, editable } = this.props
    const { data } = activeApp
    return (
      <Table.Row>
        <Table.Cell>{verboseName}</Table.Cell>
        <Table.Cell>
          <div styleName='desc-container'>
            <code ref={textarea => (this.textArea = textarea)}>
              {data[field]}
            </code>
          </div>
        </Table.Cell>
        <Table.Cell>
          {
            <Popup
              trigger={
                <Icon
                  name='copy'
                  title='Click to copy'
                  onClick={this.handleClick}
                  color='grey'
                />
              }
              content={`${verboseName} copied!`}
              on='click'
            />
          }
        </Table.Cell>
      </Table.Row>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeApp: state.activeApp
  }
}
const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppField)
