import React from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Icon,
  TextArea,
  Button,
  Image,
  Label,
  Segment
} from 'semantic-ui-react'

import { getTheme } from 'formula_one'
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
      description: data.description,
      fileSrc: data.logo,
      logo: data.logo
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
      if (this.state.fileSrc === '') {
        let data = {
          name: this.state.name,
          description: this.state.description
        }
        if (!this.state.logo) {
          data['logo'] = null
        }
        this.props.ChangeActiveApp(
          this.props.activeApp.data.id,
          'branding',
          data
        )
      } else {
        var formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('description', this.state.description)
        formData.append('logo', this.state.logo)
        this.props.ChangeActiveAppWithFile(
          this.props.activeApp.data.id,
          'branding',
          formData
        )
      }
    }
  }
  render () {
    const { activeApp } = this.props
    const { fileSrc } = this.state
    const content = (
      <Label color={getTheme()} floating onClick={this.removeImage}>
        <Icon name='close' fitted />
      </Label>
    )
    return (
      <Form>
        <Form.Field>
          <label>Logo</label>
        </Form.Field>
        {!fileSrc ? (
          <React.Fragment>
            <label htmlFor='uploadLogo'>
              <Button
                as='span'
                icon
                labelPosition='left'
                primary
                styleName='inline.margin-bottom-1em'
              >
                <Icon name='upload' />
                Upload
              </Button>
            </label>
            <input
              type='file'
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
        <Form.Field>
          <label>Name</label>
          <input
            onChange={this.handleChange}
            placeholder='Name'
            name='name'
            value={this.state.name}
            autoComplete='off'
          />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <TextArea
            onChange={this.handleChange}
            placeholder='Description'
            name='description'
            autoHeight
            value={this.state.description}
          />
        </Form.Field>
        <Button
          color={getTheme()}
          disabled={!this.state.name || !this.state.description}
          floated='right'
          onClick={this.handleClick}
          loading={activeApp.inEditMode === 'branding'}
        >
          Update
        </Button>
      </Form>
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
    },
    ChangeActiveAppWithFile: (id, field, data) => {
      dispatch(changeActiveAppWithFile(id, field, data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppBranding)
