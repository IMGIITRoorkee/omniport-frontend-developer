import React from "react";
import { connect } from "react-redux";
import { Table, Icon, Popup, Button, Label, Form, FormField } from "semantic-ui-react";
import main from "../css/app-field.css";
import axios from "axios";
import { getCookie } from 'formula_one'
import {urlAppHiddenDetail} from '../urls'

class AppField extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password_verified: this.props.password_verified,
      formOpen : false,
      password : "",
      hiddendata : "",
      message : ""
    };
  }
  handleOpen = () => this.setState({ formOpen: true });

  handleClose = () => this.setState({
     formOpen: false,
     message : "",
     password : ""
    });

  handlePasswordChange = (e,{value}) => {
    this.setState({
      ...this.state,
      password : value
    })
  }

  handleSubmitSecret = (e) => {
     e.preventDefault();

     const passwordjson = {
       password : this.state.password,
     }

     const headers = {
      'X-CSRFToken': getCookie('csrftoken'),
      'content-type' : 'application/json'
    }

     axios.post(urlAppHiddenDetail(this.props.activeApp.data['id']),passwordjson,{headers: headers})
      .then(res =>
        {
          this.setState({
            password_verified : true,
            hiddendata : res.data[this.props.field]
          })
        }
        )
        .catch(err => this.setState({message:err.response.data}))
  }

  handleClick = () => {
    let range = document.createRange();
    range.selectNodeContents(this.textArea);
    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    document.execCommand("copy");
    sel.removeAllRanges();
  };
  render() {
    const {
      activeApp,
      field,
      verboseName,
      editable,
    } = this.props;
    const { data } = activeApp;
    return (
      <Table.Row>
        <Table.Cell>{verboseName}</Table.Cell>
        {this.state.password_verified ? (
          <Table.Cell>
            <div styleName="desc-container">
              <code ref={(textarea) => (this.textArea = textarea)}>
                {this.state.hiddendata == ""
                  ? data[field]
                  : this.state.hiddendata}
              </code>
            </div>
          </Table.Cell>
        ) : (
          <Table.Cell>
            {this.state.formOpen ? (
              <Form size="small" onSubmit={this.handleSubmitSecret}>
              <Form.Group>
                <Form.Input
                  type={"password"}
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  placeholder="Enter Password"
                />
                <Button size="small" positive type="submit">Submit</Button>
                <Button size="small" onClick={this.handleClose}>Cancel</Button>
                {this.state.message=="" ? '': <Label basic color='red'>
                    {this.state.message}
                </Label>}
                </Form.Group>
              </Form>
            ) : (
              <Icon
                    name="eye"
                    link
                    size="large"
                    title="Click to verify your identity"
                    onClick={this.handleOpen}
                    color="black"
                  />
              
            )}
          </Table.Cell>
        )}
        <Table.Cell>
          {this.state.password_verified ? (
            <Popup
              trigger={
                <Icon
                  name="copy"
                  link
                  title="Click to copy"
                  onClick={this.handleClick}
                  color="grey"
                />
              }
              content={`${verboseName} copied!`}
              on="click"
            />
          ) : (
                <Icon
                  name="info circle"
                  size="normal"
                  link
                  title="Sharing of this data might lead to security threat!"
                  color="grey"
                />
          )}
        </Table.Cell>
      </Table.Row>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeApp: state.activeApp,
  };
}
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppField);
