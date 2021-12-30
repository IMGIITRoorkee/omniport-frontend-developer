import React from 'react'
import { connect } from 'react-redux'
import { startCase } from 'lodash'
import { 
  Form,
  Segment, 
  Header, 
  Label, 
  Checkbox,
  Table,
  Dimmer,
  Icon,
  Loader,
  Placeholder
} from 'semantic-ui-react'

import { setOptionsList, changeActiveApp } from '../actions'
import { errorExist } from '../utils'

import main from '../css/app-detail.css'

class AppScope extends React.Component {
  constructor (props) {
    super(props)
    const { activeApp } = props
    const { data } = activeApp
    this.state = {
      editMode: false,
      scope: this.convertAlreadySelectedDictionary(data.dataPoints),
      error: false,
      message: ''
    }
  }
  componentDidMount () {
    if (!this.props.optionsList.isLoaded) {
      this.props.SetOptionsList()
    }
  }
  convertDictionary = options => {
    let dict = {}
    for (let i = 0; i < options.length; i++) {
      if (!dict[options[i].split('.')[0]]) {
        dict[options[i].split('.')[0]] = []
      }
      dict[options[i].split('.')[0]].push(options[i])
    }
    return dict
  }
  convertAlreadySelectedDictionary = options => {
    let dict = {}
    for (let i = 0; i < options.length; i++) {
      dict[options[i]]=true;
    }
    return dict
  }
  convertOptionsListDictionary = options => {
    let dict = {}
    for (let i = 0; i < options.length; i++) {
      if (!dict[options[i].value.split('.')[0]]) {
        dict[options[i].value.split('.')[0]] = []
      }
      dict[options[i].value.split('.')[0]].push(options[i])
    }
    return dict
  }
  handleCheckboxChange = (e, { checked }) => {
    const prevScope = this.state.scope
    prevScope[e.target.id] = checked
    this.setState({
      scope: prevScope
    })
  }
  handleClick = () => {
    const {
      scope
    } = this.state
    if (this.props.activeApp.inEditMode === 'none') {
      if (this.state.editMode) {
        const dataPoints = Object.keys(scope).filter(sco => {
          if (scope[sco]) {
            return sco
          }
        })
        this.props.ChangeActiveApp(
          this.props.activeApp.data.id,
          'dataPoints',
          {
            data_points: dataPoints
          },
          this.successCallback,
          this.errCallback
        )
      } else {
        this.setState({
          editMode: !this.state.editMode
        })
      }
    }
  }
  successCallback = res => {
    this.setState({
      error: false,
      message: '',
      editMode: !this.state.editMode
    })
  }
  errCallback = err => {
    this.setState({
      error: true,
      message: err.response.data
    })
  }
  render () {
    const { optionsList } = this.props
    const { activeApp } = this.props
    const { editMode, error, message } = this.state
    const { data, inEditMode } = activeApp
    return (
      <React.Fragment>
        <Segment attached='top' styleName='app-scope-segment'>
          <Header as='h4' styleName='app-scope-header'>Scope</Header>
          {editMode || error ? (
            <Icon name='save' onClick={this.handleClick} color='blue' link />
          ) : inEditMode === 'dataPoints' ? (
            <Loader active inline size='mini' />
          ) : (
            <Icon name='pencil' onClick={this.handleClick} color='grey' link />
          )}
        </Segment>
        <Segment attached='bottom'>
            {editMode || inEditMode === 'dataPoints' ? (
              <Dimmer.Dimmable dimmed={inEditMode === 'dataPoints'}>
                <Form>
                  {message
                    ? message['dataPoints'][0]
                    : ""
                  }
                  <Form.Field error={error && errorExist(message, 'dataPoints')}>
                    {(optionsList.isLoaded && optionsList.data.actions.hasOwnProperty("POST"))
                      ? 
                      Object.keys(
                        this.convertOptionsListDictionary(
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
                              {this.convertOptionsListDictionary(
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
                                        checked = {(this.state.scope[choice.value]) ? true:false}
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
                </Form>
                <Dimmer active={inEditMode === 'dataPoints'} inverted>
                  <Loader />
                </Dimmer>
              </Dimmer.Dimmable>
            ):(
                data.dataPoints.length > 0 ? (
                  <Table basic='very' compact='very'>
                    <Table.Body>
                      {Object.keys(this.convertDictionary(data.dataPoints)).map(
                        (category, i) => {
                          return (
                            <Table.Row key={i}>
                              <Table.Cell>{startCase(category)}</Table.Cell>
                              <Table.Cell>
                                <Label.Group key={category}>
                                  {this.convertDictionary(data.dataPoints)[
                                    category
                                  ].map(scope => {
                                    return <Label key={scope}>{scope}</Label>
                                  })}
                                </Label.Group>
                              </Table.Cell>
                            </Table.Row>
                          )
                        }
                      )}
                    </Table.Body>
                  </Table>
                ) : (
                  <p>No scopes selected</p>
                )
              )}
        </Segment>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeApp: state.activeApp,
    optionsList: state.optionsList
  }
}

const mapDispatchToProps = dispatch => {
  return {
    SetOptionsList: () => {
      dispatch(setOptionsList());
    },
    ChangeActiveApp: (id, field, data, successCallback, errCallback) => {
      dispatch(changeActiveApp(id, field, data, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(AppScope)