import React from 'react'
import { connect } from 'react-redux'
import { Dimmer, Dropdown, Form, Table, Icon, Loader } from 'semantic-ui-react'

import { changeActiveApp } from '../actions'

import main from '../css/app-field.css'

class AppFieldSelect extends React.Component {
  constructor (props) {
    super(props)
    const { activeApp, field } = props
    const { data } = activeApp
    this.state = {
      editMode: false,
      value: data[field]
    }
  }
  handleChange = (e, { value }) => {
    this.setState({
      value: value
    })
  }
  handleClick = () => {
    if (this.props.activeApp.inEditMode === 'none') {
      if (this.state.editMode) {
        this.props.ChangeActiveApp(
          this.props.activeApp.data.id,
          this.props.field,
          {
            [this.props.field]: this.state.value
          }
        )
      }
      this.setState({
        editMode: !this.state.editMode
      })
    }
  }
  render () {
    const {
      activeApp,
      field,
      verboseName,
      options,
      fieldName,
      editable
    } = this.props
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
                  <Dropdown
                    selection
                    name={field}
                    options={options}
                    placeholder={`Select ${verboseName}`}
                    defaultValue={data[fieldName]}
                    value={this.state.value}
                    onChange={this.handleChange}
                  />
                </Form>
                <Dimmer active={inEditMode === field} inverted>
                  <Loader />
                </Dimmer>
              </Dimmer.Dimmable>
            ) : (
              options.find(x => x.value === data[fieldName]).text
            )}
          </div>
        </Table.Cell>
        <Table.Cell>
          {editable ? (
            editMode ? (
              <Icon name='save' onClick={this.handleClick} color='blue' />
            ) : inEditMode === field ? (
              <Loader active inline size='mini' />
            ) : (
              <Icon name='pencil' onClick={this.handleClick} color='grey' />
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
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppFieldSelect)
