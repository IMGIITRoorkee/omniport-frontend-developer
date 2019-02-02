import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Label,
  Header,
  Image,
  Icon,
  Input,
  Modal,
  Button,
  Segment
} from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'

import { getTheme, getThemeObject } from 'formula_one'
import RedirectURLs from './redirect-uris'
import AppField from './app-field'
import AppFieldSelect from './app-field-select'
import AppTeam from './app-team'
import AppBranding from './app-branding'
import AppDate from './app-date'
import AppScope from './app-scope'
import AppTextareaField from './app-textarea-field'
import { setActiveApp, deleteApp } from '../actions'

import main from '../css/app-detail.css'

const agtOptions = [
  {
    key: 'authorization-code',
    value: 'authorization-code',
    text: 'Authorization code'
  },
  { key: 'implicit', value: 'implicit', text: 'Implicit' },
  { key: 'password', value: 'password', text: 'Resource owner password based' },
  {
    key: 'client-credentials',
    value: 'client-credentials',
    text: 'Client credentials'
  }
]

const clientOptions = [
  { key: 'confidential', value: 'confidential', text: 'Confidential' },
  { key: 'public', value: 'public', text: 'Public' }
]

class AppList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      enteredName: '',
      modalOpen: false
    }
  }
  handleChange = (e, { value }) => {
    this.setState({
      enteredName: value
    })
  }
  handleOpen = () => {
    this.setState({
      modalOpen: true,
      enteredName: ''
    })
  }
  handleClose = () => {
    this.setState({
      modalOpen: false,
      enteredName: ''
    })
  }
  handleRemove = () => {
    this.props.DeleteApp(this.props.activeApp.data.id)
    this.setState({
      modalOpen: false,
      enteredName: ''
    })
  }
  componentDidMount () {
    this.props.SetActiveApp(this.props.match.params.id, err => {
      this.props.history.push('/404')
    })
  }
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <Container>
        {activeApp.isLoaded ? (
          <div styleName='app-detail-container'>
            <Segment color={getTheme()}>
              <div styleName='app-branding-container'>
                <div styleName='app-logo-container'>
                  {data.logo ? (
                    <Image
                      src={data.logo}
                      alt={data.name}
                      style={{ width: '4em', height: '4em' }}
                    />
                  ) : (
                    <Icon name='cube' color={getTheme()} size='huge' />
                  )}
                </div>
                <div styleName='app-branding-text vertical-center'>
                  <Header as='h3'>
                    {data.name}
                    <Header.Subheader>
                      {data.isApproved ? (
                        <span>
                          Approved
                          <Label circular color='green' empty />
                        </span>
                      ) : (
                        <span>
                          Not approved
                          <Label circular color='red' empty />
                        </span>
                      )}
                    </Header.Subheader>
                  </Header>
                </div>
                <div styleName='vertical-center'>
                  <Modal
                    size='mini'
                    trigger={<Icon name='pencil' />}
                    dimmer='blurring'
                  >
                    <Modal.Header>Edit app branding</Modal.Header>
                    <AppBranding />
                  </Modal>
                </div>
              </div>
            </Segment>
            <Table
              style={{ borderTop: `2px solid ${getThemeObject().hexCode}` }}
            >
              <Table.Body>
                <AppField
                  field='clientId'
                  verboseName='Client ID'
                  editable={false}
                />
                <AppField
                  field='clientSecret'
                  verboseName='Client secret'
                  editable={false}
                />
                <RedirectURLs />
                <AppTextareaField
                  field='description'
                  verboseName='Description'
                  fieldName='description'
                  editable
                />
                <AppFieldSelect
                  field='client_type'
                  fieldName='clientType'
                  verboseName='Client type'
                  editable
                  options={clientOptions}
                />
                <AppFieldSelect
                  field='authorization_grant_type'
                  fieldName='authorizationGrantType'
                  verboseName='Authorization grant type'
                  options={agtOptions}
                />
                <AppDate />
              </Table.Body>
            </Table>
            {isBrowser && <AppScope />}
            <AppTeam />
            <div styleName='delete-button-container'>
              <Modal
                onClose={this.handleClose}
                onOpen={this.handleOpen}
                open={this.state.modalOpen}
                trigger={
                  <Button
                    basic
                    icon='trash alternate'
                    negative
                    onClick={this.handleOpen}
                    content='Delete app'
                  />
                }
                dimmer='blurring'
                size='mini'
              >
                <Modal.Header>
                  <Icon name='warning sign' color='red' />
                  Confirm irreversible deletion
                </Modal.Header>
                <Modal.Content>
                  <div>
                    Are you sure you want to remove{' '}
                    <strong>{activeApp.data.name}</strong> permanently? This
                    action <strong>cannot</strong> be undone.
                  </div>
                  <div styleName='warninig-container'>
                    Please type in the name of the app to confirm.
                  </div>
                  <Input
                    fluid
                    value={this.enteredName}
                    onChange={this.handleChange}
                  />
                </Modal.Content>
                <Modal.Actions>
                  <Button
                    basic
                    icon='left arrow'
                    content='Keep'
                    positive
                    onClick={this.handleClose}
                  />
                  <Button
                    basic
                    icon='trash alternate'
                    content="Delete, I'm sure"
                    negative
                    onClick={this.handleRemove}
                    disabled={this.state.enteredName !== data.name}
                  />
                </Modal.Actions>
              </Modal>
            </div>
          </div>
        ) : (
          'Loading'
        )}
      </Container>
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
    SetActiveApp: (id, errCallback) => {
      dispatch(setActiveApp(id, errCallback))
    },
    DeleteApp: id => {
      dispatch(deleteApp(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList)
