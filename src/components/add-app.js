import React from 'react'
import { connect } from 'react-redux'
import {
  Modal,
  Form,
  Segment,
  Button,
  Icon,
  Image,
  Label,
  TextArea,
  Dropdown,
  Progress,
  Checkbox,
  Header,
  Table,
  Container
} from 'semantic-ui-react'
import { words, startCase } from 'lodash'

import { getTheme } from 'formula_one'
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
      scope: {}
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
      logo,
      description,
      client_type,
      agreed,
      scope
    } = this.state
    console.log(this.state)
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
    this.props.AddApp(data)
  }
  render () {
    const { fileSrc } = this.state
    const { optionsList } = this.props
    const content = (
      <Label color={getTheme()} floating onClick={this.removeImage}>
        <Icon name='close' fitted />
      </Label>
    )
    return (
      <Container>
        <div styleName='main.app-list-container'>
          <Header as='h3'>Add a new app</Header>
          <Form>
            <Form.Field>
              <label>App name</label>
              <input
                onChange={this.handleChange}
                placeholder='App name'
                name='name'
                value={this.state.name}
                autoComplete='off'
              />
            </Form.Field>
            <Form.Field>
              <label>Redirect URLs</label>
              <TextArea
                autoHeight
                placeholder='Multiple URLs are allowed, separated by a space'
                value={this.state.redirect_urls}
                onChange={this.handleRedirectURLChange}
              />
              Multiple URLs are allowed, separated by a space.
            </Form.Field>
            <Form.Field>
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
            <Form.Field>
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
            <Form.Field>
              <label>Scope</label>
              {optionsList.isLoaded &&
                Object.keys(
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
                          optionsList.data.actions.POST.dataPoints.child.choices
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
                })}
            </Form.Field>
            <Form.Field>
              <Checkbox
                label='I agree to the developer programme terms and conditions.'
                onChange={this.handleToggleChange}
                checked={this.state.agreed}
              />
            </Form.Field>
            <Form.Field>
              <Button
                basic
                icon='add'
                content='Add'
                onClick={this.handleClick}
                primary
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
    AddApp: data => {
      dispatch(addApp(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddApp)
