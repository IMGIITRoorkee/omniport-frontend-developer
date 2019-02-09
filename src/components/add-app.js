import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Button,
  Message,
  TextArea,
  Dropdown,
  Progress,
  Checkbox,
  Header,
  Table,
  Container,
  Placeholder
} from 'semantic-ui-react'
import { words, startCase, capitalize } from 'lodash'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { urlDeveloperTerms, urlAppView, urlBase } from '../urls'
import { errorExist } from '../utils'
import { setAppList, setOptionsList, addApp } from '../actions'

import inline from 'formula_one/src/css/inline.css'
import main from '../css/app-list.css'

const clientOptions = [
  { key: 'confidential', value: 'confidential', text: 'Confidential' },
  { key: 'public', value: 'public', text: 'Public' }
]

class AddApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logo: null,
      fileSrc: '',
      name: '',
      redirect_urls: '',
      client_type: 'confidential',
      description: '',
      descPercent: 100,
      descColour: 'red',
      descLength: 0,
      agreed: false,
      scope: {},
      success: false,
      error: false,
      message: ''
    }
  }
  componentDidMount () {
    if (!this.props.optionsList.isLoaded) {
      this.props.SetOptionsList()
    }
  }
  handleChange = e => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }
  handleDropdownChange = (e, { name, value }) => {
    this.setState({
      [name]: value
    })
  }
  handleRedirectURLChange = (e, { value }) => {
    this.setState({
      redirect_urls: value.replace(/\n/g, ' ').replace(/\s\s+/g, ' ')
    })
  }
  handleDescriptionChange = (e, { value }) => {
    const descLength = words(value).length
    const descDenom = descLength <= 127 ? 127 : 511
    const descPercent =
      descLength === 0 ? 100 : Math.floor((descLength / descDenom) * 100)
    const descColour = descLength >= 127 && descLength <= 511 ? 'green' : 'red'
    this.setState({
      description: value,
      descPercent,
      descColour,
      descLength
    })
  }
  handleToggleChange = () => {
    this.setState({
      agreed: !this.state.agreed
    })
  }
  handleCheckboxChange = (e, { checked }) => {
    const prevScope = this.state.scope
    prevScope[e.target.id] = checked
    this.setState({
      scope: prevScope
    })
  }
  convertDictionary = options => {
    let dict = {}
    for (let i = 0; i < options.length; i++) {
      if (!dict[options[i].value.split('.')[0]]) {
        dict[options[i].value.split('.')[0]] = []
      }
      dict[options[i].value.split('.')[0]].push(options[i])
    }
    return dict
  }
  handleClick = () => {
    const {
      name,
      redirect_urls,
      description,
      client_type,
      agreed,
      scope
    } = this.state
    const dataPoints = Object.keys(scope).map(sco => {
      if (scope[sco]) {
        return sco
      }
    })
    const data = {
      name: name,
      redirect_uris: redirect_urls,
      description: description,
      client_type: client_type,
      agree_to_terms: agreed,
      data_points: dataPoints
    }
    this.props.AddApp(data, this.successCallback, this.errCallback)
  }
  successCallback = res => {
    this.setState({
      success: true,
      error: false,
      message: ''
    })
    this.props.history.push(urlAppView(res.data.id))
  }
  errCallback = err => {
    this.setState({
      error: true,
      success: false,
      message: err.response.data
    })
  }
  render () {
    const { optionsList } = this.props
    const { error, success, message } = this.state
    return (
      <Container>
        <div styleName='main.app-list-container'>
          <CustomBreadcrumb
            list={[
              { name: 'Developer', link: urlBase() },
              { name: 'Add a new app' }
            ]}
          />
          <Form>
            {error && (
              <Message
                negative
                icon='frown outline'
                header='Error'
                list={Object.keys(message)
                  .map(cat => {
                    return message[cat].map(x => {
                      return `${capitalize(startCase(cat))}: ${x}`
                    })
                  })
                  .map(x => {
                    return x[0]
                  })}
              />
            )}
            {success && (
              <Message
                positive
                header='Success'
                content={`Successfully added`}
              />
            )}
            <Form.Field error={error && errorExist(message, 'name')}>
              <label>App name</label>
              <input
                onChange={this.handleChange}
                placeholder='App name'
                name='name'
                value={this.state.name}
                autoComplete='off'
              />
            </Form.Field>
            <Form.Field
              error={error && errorExist(message, 'redirectUris')}
              required
            >
              <label>Redirect URLs</label>
              <TextArea
                autoHeight
                placeholder='Multiple URLs are allowed, separated by a space. Use the format https://example.com/path/to/resource/'
                value={this.state.redirect_urls}
                onChange={this.handleRedirectURLChange}
              />
              Multiple URLs are allowed, separated by a space.
            </Form.Field>
            <Form.Field
              error={error && errorExist(message, 'client_type')}
              required
            >
              <label>Client type</label>
              <Dropdown
                selection
                name='client_type'
                options={clientOptions}
                placeholder='Select client type'
                defaultValue='confidential'
                onChange={this.handleDropdownChange}
              />
            </Form.Field>
            <Form.Field
              error={error && errorExist(message, 'description')}
              required
            >
              <label>Description</label>
              <TextArea
                autoHeight
                placeholder='Describe your app in 127 to 511 words'
                name='description'
                value={this.state.description}
                onChange={this.handleDescriptionChange}
                attached='top'
              />
              <Progress
                attached='bottom'
                percent={this.state.descPercent}
                color={this.state.descColour}
              />
              Describe your app in 127 to 511 words. {this.state.descLength}{' '}
              word
              {this.state.descLength !== 1 ? 's ' : ' '}
              written so far.
            </Form.Field>
            <Form.Field error={error && errorExist(message, 'dataPoints')}>
              <label>Scope</label>
              {optionsList.isLoaded
                ? Object.keys(
                  this.convertDictionary(
                    optionsList.data.actions.POST.dataPoints.child.choices
                  )
                ).map(category => {
                  return (
                    <Table compact='very' basic key={category}>
                      <Table.Header>
                        <Table.Row>
                          <Table.Cell>
                            <strong>{startCase(category)}</strong>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {this.convertDictionary(
                          optionsList.data.actions.POST.dataPoints.child
                            .choices
                        )[category].map(choice => {
                          return (
                            <Table.Row key={choice.value}>
                              <Table.Cell>
                                <Checkbox
                                  id={choice.value}
                                  label={choice.value}
                                  onChange={this.handleCheckboxChange}
                                />
                              </Table.Cell>
                              <Table.Cell textAlign='right'>
                                {choice.displayName}
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                  )
                })
                : [...Array(4)].map((item, index) => {
                  return (
                    <Table compact='very' basic key={index}>
                      <Table.Header>
                        <Table.Row>
                          <Table.Cell>
                            <Placeholder style={{ minWidth: '100%' }}>
                              <Placeholder.Line length='full' />
                            </Placeholder>
                          </Table.Cell>
                        </Table.Row>
                      </Table.Header>
                      <Table.Body>
                        {[...Array(5)].map((index, item) => {
                          return (
                            <Table.Row>
                              <Table.Cell>
                                <Placeholder style={{ minWidth: '100%' }}>
                                  <Placeholder.Line length='full' />
                                </Placeholder>
                              </Table.Cell>
                            </Table.Row>
                          )
                        })}
                      </Table.Body>
                    </Table>
                  )
                })}
            </Form.Field>
            <Form.Field
              error={error && errorExist(message, 'agreesToTerms')}
              required
            >
              <p>
                Before submitting the form make sure to read the{' '}
                <a href={urlDeveloperTerms()} target='_blank'>
                  developer terms of use
                </a>
                .
              </p>
              <Checkbox
                label='I agree to the developer terms of use.'
                onChange={this.handleToggleChange}
                checked={this.state.agreed}
              />
            </Form.Field>
            <Form.Field>
              <Button
                icon='add'
                content='Add'
                onClick={this.handleClick}
                primary
                disabled={!this.state.agreed}
              />
            </Form.Field>
          </Form>
        </div>
      </Container>
    )
  }
}

function mapStateToProps (state) {
  return {
    appList: state.appList,
    optionsList: state.optionsList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetAppList: () => {
      dispatch(setAppList())
    },
    SetOptionsList: () => {
      dispatch(setOptionsList())
    },
    AddApp: (data, successCallback, errCallback) => {
      dispatch(addApp(data, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddApp)
