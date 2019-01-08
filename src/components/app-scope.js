import React from 'react'
import { connect } from 'react-redux'
import { startCase } from 'lodash'
import { Segment, Header, Label, Table } from 'semantic-ui-react'

import { getTheme } from 'formula_one'
import colorData from 'formula_one/src/assets/colorData'

class AppScope extends React.Component {
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
  render () {
    const { activeApp } = this.props
    const { data } = activeApp
    return (
      <React.Fragment>
        <Segment attached='top' color={getTheme()}>
          <Header as='h3'>Scope</Header>
        </Segment>
        <Segment attached='bottom'>
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
        </Segment>
      </React.Fragment>
    )
  }
}

function mapStateToProps (state) {
  return {
    activeApp: state.activeApp
  }
}

export default connect(mapStateToProps)(AppScope)
