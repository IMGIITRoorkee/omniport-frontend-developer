import React from 'react'
import { connect } from 'react-redux'
import {
  Segment,
  Header,
  Card,
  Icon,
  Modal,
  Grid,
  Button,
  Dropdown
} from 'semantic-ui-react'

import { UserCard } from 'formula_one'
import AppTeamEditor from './app-team-editor'
import { changeActiveApp } from '../actions'

import main from '../css/app-team.css'

class AppTeam extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modalOpen: '',
      toDelete: {}
    }
  }
  handleOpen = person =>
    this.setState({ modalOpen: person.id, toDelete: person })
  handleDelete = () => {
    const { toDelete } = this.state
    const updatedMembers = this.props.activeApp.data.teamMembers.filter(x => {
      return x.id !== toDelete.id
    })
    this.props.ChangeActiveApp(this.props.activeApp.data.id, 'delete_member', {
      teamMembers: updatedMembers
    })
    this.setState({
      modalOpen: '',
      toDelete: {}
    })
  }
  handleClose = () => this.setState({ modalOpen: false, toDelete: {} })
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <div>
        <Segment attached='top'>
          <Grid stackable verticalAlign='middle'>
            <Grid.Column width={10}>
              <Header as='h4' styleName='heading-container'>
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
                    <Dropdown
                      icon={{ name: 'ellipsis vertical', color: 'grey' }}
                      pointing='top right'
                    >
                      <Dropdown.Menu>
                        <Modal
                          trigger={
                            <Dropdown.Item
                              onClick={() => this.handleOpen(member)}
                            >
                              <Icon name='close' />
                              Delete
                            </Dropdown.Item>
                          }
                          open={
                            this.state.modalOpen &&
                            this.state.modalOpen === member.id
                          }
                          onClose={this.handleClose}
                          size='small'
                          dimmer='blurring'
                          closeIcon
                        >
                          <Modal.Header>
                            <Icon name='warning sign' color='red' />
                            Confirm irreversible deletion
                          </Modal.Header>
                          <Modal.Content>
                            Are you sure you want to remove{' '}
                            <strong>{this.state.toDelete.fullName}</strong> from
                            members of <strong>{activeApp.data.name}</strong>?
                            This action <strong>cannot</strong> be undone.
                          </Modal.Content>
                          <Modal.Actions>
                            <Button
                              basic
                              icon='left arrow'
                              content='Keep'
                              color='grey'
                              onClick={this.handleClose}
                            />
                            <Button
                              negative
                              onClick={this.handleDelete}
                              icon='close'
                              content="Delete, I'm sure"
                            />
                          </Modal.Actions>
                        </Modal>
                      </Dropdown.Menu>
                    </Dropdown>
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
