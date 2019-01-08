import React from 'react'
import { connect } from 'react-redux'
import {
  Segment,
  Header,
  Card,
  Icon,
  Modal,
  Grid,
  Button
} from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'

import { UserCard, getTheme } from 'formula_one'
import AppTeamEditor from './app-team-editor'
import { changeActiveApp } from '../actions'

import main from '../css/app-team.css'

class AppTeam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: false,
      toDelete: {}
    }
  }
  handleOpen = person => this.setState({ modalOpen: true, toDelete: person })
  handleDelete = () => {
    const { toDelete } = this.state
    const updatedMembers = this.props.activeApp.data.teamMembers.filter(x => {
      return x.id !== toDelete.id
    })
    this.props.ChangeActiveApp(this.props.activeApp.data.id, 'delete_member', {
      teamMembers: updatedMembers
    })
    this.setState({
      modalOpen: false,
      toDelete: {}
    })
  }
  handleClose = () => this.setState({ modalOpen: false, toDelete: {} })
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <div>
        <Segment attached='top' color={getTheme()}>
          <Grid stackable verticalAlign='middle'>
            <Grid.Column width={10}>
              <Header as='h3' styleName='heading-container'>
                Team members
              </Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <AppTeamEditor />
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment attached='bottom'>
          <Card.Group itemsPerRow={3} stackable doubling>
            {data.teamMembers.map((member, index) => {
              return (
                <UserCard
                  name={member.fullName}
                  roles={member.roles.map(x => {
                    return x.role
                  })}
                  image={member.displayPicture}
                  key={index}
                  right={
                    <Modal
                      trigger={
                        <Icon
                          onClick={() => this.handleOpen(member)}
                          name='close'
                        />
                      }
                      open={this.state.modalOpen}
                      onClose={this.handleClose}
                      size='small'
                      dimmer='blurring'
                    >
                      <Modal.Header>
                        <Icon name='warning sign' color='red' />
                        Confirm irreversible deletion
                      </Modal.Header>
                      <Modal.Content>
                        Are you sure you want to remove{' '}
                        <strong>{this.state.toDelete.fullName}</strong> from
                        members of <strong>{activeApp.data.name}</strong>? This
                        action <strong>cannot</strong> be undone.
                      </Modal.Content>
                      <Modal.Actions>
                        <Button positive onClick={this.handleClose}>
                          <Icon name='left arrow' /> Keep
                        </Button>
                        <Button negative onClick={this.handleDelete}>
                          <Icon name='close' /> Delete, I'm sure
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  }
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
