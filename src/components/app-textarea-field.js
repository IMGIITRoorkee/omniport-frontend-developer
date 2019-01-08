import React from 'react'
import { connect } from 'react-redux'
import { Form, Icon, TextArea, Table, Loader, Dimmer } from 'semantic-ui-react'

import { changeActiveApp, changeActiveAppWithFile } from '../actions'

import main from '../css/app-field.css'

class AppTextareaField extends React.Component {
  constructor (props) {
    super(props)
    const { activeApp, field, fieldName } = this.props
    const { data } = activeApp
    this.state = {
      [field]: data[fieldName]
    }
  }
  handleChange = e => {
    const {
      target: { name, value }
    } = e
    this.setState({
      [name]: value
    })
  }
  handleClick = e => {
    if (this.props.activeApp.inEditMode === 'none') {
      if (this.state.editMode) {
        this.props.ChangeActiveApp(
          this.props.activeApp.data.id,
          this.props.field,
          {
            [this.props.field]: this.state[this.props.field]
          }
        )
      }
      this.setState({
        editMode: !this.state.editMode
      })
    }
  }
  render () {
    const { verboseName, fieldName, activeApp, field, editable } = this.props
    const { editMode } = this.state
    const { data, inEditMode } = activeApp
    return (
      <Table.Row>
        <Table.Cell>{verboseName}</Table.Cell>
        <Table.Cell>
          <div styleName='desc-container'>
            {editMode || inEditMode === field ? (
              <Dimmer.Dimmable dimmed={inEditMode === field}>
                <Form>
                  <Form.Field>
                    <TextArea
                      onChange={this.handleChange}
                      placeholder='Description'
                      name='description'
                      autoHeight
                      value={this.state.description}
                    />
                  </Form.Field>
                </Form>{' '}
                <Dimmer active={inEditMode === field} inverted>
                  <Loader />
                </Dimmer>
              </Dimmer.Dimmable>
            ) : (
              data[fieldName]
            )}
          </div>
        </Table.Cell>
        <Table.Cell>
          {editable ? (
            editMode ? (
              <Icon name='save' onClick={this.handleClick} />
            ) : inEditMode === field ? (
              <Loader active inline size='mini' />
            ) : (
              <Icon name='pencil' onClick={this.handleClick} />
            )
          ) : (
            false
          )}
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
  return {
    ChangeActiveApp: (id, field, data) => {
      dispatch(changeActiveApp(id, field, data))
    },
    ChangeActiveAppWithFile: (id, field, data) => {
      dispatch(changeActiveAppWithFile(id, field, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppTextareaField)
