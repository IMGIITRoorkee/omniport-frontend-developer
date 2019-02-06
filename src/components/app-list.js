import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Card,
  Label,
  Grid,
  Segment,
  Placeholder
} from 'semantic-ui-react'

import CustomBreadcrumb from 'core/common/src/components/custom-breadcrumb'
import { TileCard } from 'formula_one'
import { setAppList } from '../actions'
import { urlAddAppView, urlAppView } from '../urls'

import main from '../css/app-list.css'

class AppList extends React.PureComponent {
  componentDidMount () {
    this.props.SetAppList()
  }
  render () {
    const { appList } = this.props
    return (
      <Container>
        <div styleName='app-list-container'>
          <CustomBreadcrumb list={[{ name: 'Developer' }]} />
          <Card.Group stackable doubling itemsPerRow={3}>
            <React.Fragment>
              <TileCard
                name='Add'
                iconName='add'
                desc={<span>Add a new app</span>}
                as={Link}
                to={urlAddAppView()}
              />
              {appList.isLoaded
                ? appList.data.map(app => {
                  return (
                    <TileCard
                      as={Link}
                      to={urlAppView(app.id)}
                      key={app.id}
                      name={app.name}
                      desc={
                        app.isApproved ? (
                          <span>
                              Approved
                            <Label circular color='green' empty />
                          </span>
                        ) : (
                          <span>
                              Not approved
                            <Label circular color='red' empty />
                          </span>
                        )
                      }
                      imageUrl={app.logo}
                      iconName='cube'
                    />
                  )
                })
                : [...Array(5)].map((item, index) => {
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
            </React.Fragment>
          </Card.Group>
        </div>
      </Container>
    )
  }
}

function mapStateToProps (state) {
  return {
    appList: state.appList
  }
}
const mapDispatchToProps = dispatch => {
  return {
    SetAppList: () => {
      dispatch(setAppList())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppList)
