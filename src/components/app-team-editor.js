import React from 'react'
import { connect } from 'react-redux'
import { TextArea, Button } from 'semantic-ui-react'

import { getTheme } from 'formula_one'
import { changeActiveApp } from '../actions'

import inline from 'formula_one/src/css/inline.css'

class AppTeamEditor extends React.Component {
  constructor (props) {
    super(props)
    const { activeApp } = this.props
    const { data } = activeApp
    this.state = {
      teamMembers: data.teamMembers.join(',')
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
  handleClick = e => {}
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <Form>
        <Form.Field>
          <label>Description</label>
          <TextArea
            onChange={this.handleChange}
            placeholder='Add enrolment number, email address or phone number'
            name='description'
            autoHeight
            value={this.state.description}
          />
        </Form.Field>
        <Button
          color={getTheme()}
          disabled={!this.state.name || !this.state.description}
          floated='right'
          onClick={this.handleClick}
          loading={activeApp.inEditMode === 'branding'}
        >
          Update
        </Button>
      </Form>
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
)(AppTeamEditor)
