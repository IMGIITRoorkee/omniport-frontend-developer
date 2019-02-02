import React from 'react'
import { connect } from 'react-redux'
import {
  Dimmer,
  Form,
  Table,
  Label,
  Icon,
  TextArea,
  Loader
} from 'semantic-ui-react'

import { getTheme } from 'formula_one'
import { changeActiveApp } from '../actions'

import main from '../css/app-field.css'

class RedirectURLs extends React.Component {
  constructor (props) {
    super(props)
    const { activeApp } = props
    const { data } = activeApp
    this.state = {
      editMode: false,
      value: data['redirectUris'].replace(/\n/g, ' ').replace(/\s\s+/g, ' '),
      error: false,
      message: ''
    }
  }
  handleChange = (e, { value }) => {
    this.setState({
      value: value.replace(/\n/g, ' ').replace(/\s\s+/g, ' ')
    })
  }
  handleClick = () => {
    if (this.props.activeApp.inEditMode === 'none') {
      if (this.state.editMode) {
        this.props.ChangeActiveApp(
          this.props.activeApp.data.id,
          'redirectUris',
          {
            redirect_uris: this.state.value
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
    const { activeApp } = this.props
    const { editMode, error, message } = this.state
    const { data, inEditMode } = activeApp
    return (
      <Table.Row>
        <Table.Cell>Redirect URLs</Table.Cell>
        <Table.Cell>
          <div styleName='desc-container'>
            {editMode || inEditMode === 'redirectUris' ? (
              <Dimmer.Dimmable dimmed={inEditMode === 'redirectUris'}>
                <Form>
                  <Form.Field error={error}>
                    <TextArea
                      autoHeight
                      placeholder='Multiple urls are allowed seperated with space'
                      value={this.state.value}
                      onChange={this.handleChange}
                    />
                    {message
                      ? message['redirectUris'][0]
                      : 'Multiple URLs are allowed, separated by a space.'}
                  </Form.Field>
                </Form>
                <Dimmer active={inEditMode === 'redirectUris'} inverted>
                  <Loader />
                </Dimmer>
              </Dimmer.Dimmable>
            ) : (
              <Label.Group>
                {data['redirectUris']
                  .replace(/\n/g, ' ')
                  .replace(/\s\s+/g, ' ')
                  .split(' ')
                  .map((url, index) => {
                    if (url !== ' ') {
                      return (
                        <Label
                          as='a'
                          href={url}
                          key={index}
                          target='_blank'
                          color={getTheme()}
                        >
                          {url}
                        </Label>
                      )
                    }
                  })}
              </Label.Group>
            )}
          </div>
        </Table.Cell>
        <Table.Cell>
          {editMode || error ? (
            <Icon name='save' onClick={this.handleClick} />
          ) : inEditMode === 'redirectUris' ? (
            <Loader active inline size='mini' />
          ) : (
            <Icon name='pencil' onClick={this.handleClick} />
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
    ChangeActiveApp: (id, field, data, successCallback, errCallback) => {
      dispatch(changeActiveApp(id, field, data, successCallback, errCallback))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RedirectURLs)
