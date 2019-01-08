import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Search, Icon } from 'semantic-ui-react'

import { UserCard } from 'formula_one'
import { urlSearchPerson } from '../urls'
import { changeActiveApp } from '../actions'

class AppTeamEditor extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: false,
      value: '',
      results: []
    }
  }
  handleSearchChange = (e, { value }) => {
    this.setState({
      value: value,
      isLoading: true
    })
    axios.get(urlSearchPerson(), { params: { search: value } }).then(res => {
      this.setState({
        results: res.data.slice(0, 3).map(person => {
          return { person, title: person.fullName }
        }),
        isLoading: false
      })
    })
  }
  handleResultSelect = (e, { result }) => {
    const { activeApp } = this.props
    const { data } = activeApp
    const prev_members = data.teamMembers.map(person => {
      return { id: person.id }
    })
    prev_members.push({ id: result.person.id })
    this.props.ChangeActiveApp(data.id, 'add_member', {
      teamMembers: prev_members
    })
    this.setState({
      value: ''
    })
  }
  render () {
    const { activeApp } = this.props
    const { isLoading, value, results } = this.state
    const { data } = activeApp
    const resultRenderer = ({ person, title }) => (
      <UserCard
        key={person.id}
        name={person.fullName}
        roles={person.roles.map(x => {
          return x.role
        })}
        image={person.displayPicture}
        right={
          data.teamMembers.find(x => {
            return x.id === person.id
          }) && <Icon name='check' color='green' />
        }
      />
    )
    return (
      <Search
        aligned='right'
        loading={isLoading}
        onSearchChange={this.handleSearchChange}
        onResultSelect={this.handleResultSelect}
        results={results}
        value={value}
        resultRenderer={resultRenderer}
        fluid
        input={{ fluid: true }}
        placeholder='Add members by their name or contact information'
      />
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
)(AppTeamEditor)
