import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Table,
  Label,
  Header,
  Image,
  Icon,
  Modal
} from 'semantic-ui-react'
import moment from 'moment'

import { getTheme, getThemeObject } from 'formula_one'
import RedirectURLs from './redirect-uris'
import AppField from './app-field'
import AppFieldSelect from './app-field-select'
import AppTeam from './app-team'
import AppBranding from './app-branding'
import { setActiveApp } from '../actions'

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

class AppList extends React.PureComponent {
  componentDidMount () {
    this.props.SetActiveApp(this.props.match.params.id)
  }
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <Container>
        {activeApp.isLoaded ? (
          <div styleName='app-detail-container'>
            <div color={getTheme()}>
              <div styleName='app-branding-container'>
                <div styleName='app-logo-container'>
                  {data.logo ? (
                    <Image
                      src={data.logo}
                      alt={data.name}
                      avatar
                      style={{ width: '4em', height: '4em' }}
                    />
                  ) : (
                    <Icon name='cube' color={getTheme()} size='huge' />
                  )}
                </div>
                <div styleName='app-branding-text'>
                  <Header as='h3'>
                    {data.name}
                    <Header.Subheader>{data.description}</Header.Subheader>
                    <Header.Subheader>
                      {moment(data['created']).format(
                        'MMMM Do YYYY, h:mm:ss a'
                      )}
                    </Header.Subheader>
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
                <div>
                  <Modal
                    size='mini'
                    trigger={<Icon name='pencil' />}
                    dimmer='blurring'
                    style={{
                      borderTop: `${getThemeObject().hexCode} 2px solid`
                    }}
                  >
                    <Modal.Header>Edit app branding</Modal.Header>
                    <Modal.Content scrolling>
                      <AppBranding />
                    </Modal.Content>
                  </Modal>
                </div>
              </div>
            </div>
            <Table basic='very'>
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
                <AppFieldSelect
                  field='authorization_grant_type'
                  fieldName='authorizationGrantType'
                  verboseName='Authorization grant type'
                  options={agtOptions}
                />
                <AppFieldSelect
                  field='client_type'
                  fieldName='clientType'
                  verboseName='Client type'
                  options={clientOptions}
                />
              </Table.Body>
            </Table>
            <AppTeam />
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
    SetAppList: () => {
      dispatch(setAppList())
    },
    SetActiveApp: id => {
      dispatch(setActiveApp(id))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList)
