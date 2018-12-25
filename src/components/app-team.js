import React from 'react'
import { connect } from 'react-redux'
import { Segment, Header, Card, Icon, Modal } from 'semantic-ui-react'

import { UserCard, getTheme, getThemeObject } from 'formula_one'
import { changeActiveApp } from '../actions'

import main from '../css/app-field.css'

class AppTeam extends React.Component {
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
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <div>
        <Segment attached='top' color={getTheme()}>
          <div>
            <Header as='h3'>Team members</Header>
            <Modal
              size='mini'
              trigger={<Icon name='pencil' />}
              dimmer='blurring'
              style={{
                borderTop: `${getThemeObject().hexCode} 2px solid`
              }}
            >
              <Modal.Header>Edit app branding</Modal.Header>
              <Modal.Content scrolling>'hihihi'</Modal.Content>
            </Modal>
          </div>
        </Segment>
        <Segment attached='bottom'>
          <Card.Group itemsPerRow={3} stackable doubling>
            {data.teamMembers.map((member, index) => {
              return (
                <UserCard
                  name={member.fullName}
                  roles={member.roles}
                  image={member.displayPicture}
                  username={member.shortName}
                  key={index}
                />
              )
            })}
          </Card.Group>
        </Segment>
      </div>
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
)(AppTeam)
