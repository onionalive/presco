// React
import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import NavigatorTabTwo from './TabTwoNavigation'
// Redux
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        navigationState: state.tabTwo
    }
}
class TabTwoNavigation extends React.Component {
render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabTwo
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
export default connect(mapStateToProps)(TabTwoNavigation)