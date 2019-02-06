import React from 'react'
import {
  Card,
  Grid,
  Table,
  Segment,
  Placeholder,
  Header
} from 'semantic-ui-react'
import { isBrowser } from 'react-device-detect'

import main from '../css/app-detail.css'

export default class EmptyAppDetail extends React.Component {
  render () {
    return (
      <div styleName='app-detail-container'>
        <Segment basic>
          <Placeholder>
            <Placeholder.Line length='very long' />
          </Placeholder>
        </Segment>
        <Header dividing />
        <Segment>
          <Placeholder>
            <Placeholder.Header image style={{ width: '100%' }}>
              <Placeholder.Line length='full' />
              <Placeholder.Line length='long' />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
        <Table>
          <Table.Body>
            {[...Array(7)].map((item, index) => {
              return (
                <Table.Row>
                  <Table.Cell>
                    <Placeholder style={{ minWidth: '100%' }}>
                      <Placeholder.Line length='full' />
                      <Placeholder.Line length='full' />
                    </Placeholder>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        {isBrowser && (
          <React.Fragment>
            <Segment attached='top'>
              <Placeholder>
                <Placeholder.Header>
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            </Segment>
            <Segment attached='bottom'>
              <Table basic='very' compact='very'>
                <Table.Body>
                  {[...Array(4)].map((item, index) => {
                    return (
                      <Table.Row key={index}>
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
            </Segment>
          </React.Fragment>
        )}
        <Segment attached='top'>
          <Placeholder>
            <Placeholder.Header>
              <Placeholder.Line />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
        <Segment attached='bottom'>
          <Card.Group itemsPerRow={3} stackable doubling>
            {[...Array(6)].map((item, index) => {
              return (
                <Card key={index}>
                  <Segment>
                    <Placeholder>
                      <Placeholder.Header image>
                        <Placeholder.Line />
                        <Placeholder.Line />
                      </Placeholder.Header>
                    </Placeholder>
                  </Segment>
                </Card>
              )
            })}
          </Card.Group>
        </Segment>
        <div styleName='delete-button-container'>
          <Placeholder style={{ height: '3em', width: '10em' }}>
            <Placeholder.Image />
          </Placeholder>
        </div>
      </div>
    )
  }
}
