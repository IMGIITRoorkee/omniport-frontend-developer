import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Icon,
  Button,
  Image,
  Label,
  Segment,
  Modal,
  Message
} from 'semantic-ui-react'
import { capitalize, startCase } from 'lodash'

import { getTheme } from 'formula_one'
import { errorExist } from '../utils'
import { changeActiveApp, changeActiveAppWithFile } from '../actions'

import inline from 'formula_one/src/css/inline.css'
import main from '../css/app-field.css'

class AppBranding extends React.Component {
  constructor (props) {
    super(props)
    const { activeApp } = this.props
    const { data } = activeApp
    this.state = {
      name: data.name,
      fileSrc: data.logo,
      logo: data.logo,
      success: false,
      error: false,
      message: ''
    }
  }
  removeImage = () => {
    this.setState({
      logo: null,
      active: false,
      fileSrc: ''
    })
  }
  fileChange = e => {
    this.setState({
      logo: e.target.files[0],
      fileSrc: e.target.files[0]
        ? URL.createObjectURL(e.target.files[0])
        : null
    })
  }
  handleChange = e => {
    const {
      target: { name, value }
    } = e
    this.setState({
      [name]: value
    })
  }
  handleClick = e => {
    if (this.props.activeApp.inEditMode === 'none') {
      if (
        this.state.fileSrc === '' ||
        this.state.logo === null ||
        this.state.logo === this.state.fileSrc
      ) {
        let data = {
          name: this.state.name
        }
        if (!this.state.logo) {
          data['logo'] = null
        }
        this.props.ChangeActiveApp(
          this.props.activeApp.data.id,
          'branding',
          data,
          this.successCallback,
          this.errCallback
        )
      } else {
        var formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('logo', this.state.logo)
        this.props.ChangeActiveAppWithFile(
          this.props.activeApp.data.id,
          'branding',
          formData,
          this.successCallback,
          this.errCallback
        )
      }
    }
  }
  successCallback = res => {
    this.setState({
      success: true,
      error: false,
      message: ''
    })
  }
  errCallback = err => {
    this.setState({
      error: true,
      success: false,
      message: err.response.data
    })
  }
  render () {
    const { activeApp } = this.props
    const { fileSrc, error, success, message } = this.state
    const content = (
      <Label color={getTheme()} floating onClick={this.removeImage}>
        <Icon name='close' fitted />
      </Label>
    )
    return (
      <React.Fragment>
        <Modal.Content scrolling>
          <Form>
            {error && (
              <Message
                negative
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
                content={`Successfully updated`}
              />
            )}
            <Form.Field error={errorExist(message, 'logo')}>
              <label>Logo</label>
            </Form.Field>
            {!fileSrc ? (
              <React.Fragment>
                <label htmlFor='uploadLogo'>
                  <Button
                    as='span'
                    icon='upload'
                    basic
                    color={getTheme()}
                    styleName='inline.margin-bottom-1em'
                    content='Upload'
                  />
                </label>
                <input
                  type='file'
                  accept='image/*'
                  onChange={this.fileChange}
                  name='logo'
                  id='uploadLogo'
                  styleName='inline.display-none'
                />
              </React.Fragment>
            ) : (
              <Segment basic compact>
                {content}
                <Image src={fileSrc} style={{ width: '4em', height: '4em' }} />
              </Segment>
            )}
            <Form.Field error={errorExist(message, 'name')}>
              <label>App name</label>
              <input
                onChange={this.handleChange}
                placeholder='App name'
                name='name'
                value={this.state.name}
                autoComplete='off'
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            icon='check'
            primary
            disabled={!this.state.name}
            onClick={this.handleClick}
            loading={activeApp.inEditMode === 'branding' && !error && !success}
            content='Update'
          />
        </Modal.Actions>
      </React.Fragment>
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
    },
    ChangeActiveAppWithFile: (
      id,
      field,
      data,
      successCallback,
      errCallback
    ) => {
      dispatch(
        changeActiveAppWithFile(id, field, data, successCallback, errCallback)
      )
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBranding)
