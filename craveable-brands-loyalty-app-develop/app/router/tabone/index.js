// React
import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import NavigatorTabOne from './TabOneNavigation'
// Redux
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        navigationState: state.tabOne
    }
}
class TabOneNavigation extends React.Component {
render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabOne
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(TabOneNavigation)