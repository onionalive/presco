// React
import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import NavigatorTabFour from './TabFourNavigation'
// Redux
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        navigationState: state.tabFour
    }
}
class TabThreeNavigation extends React.Component {
render(){
    const { navigationState, dispatch } = this.props
    return (
      <NavigatorTabFour
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
export default connect(mapStateToProps)(TabFourNavigation)