// React
import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import NavigatorTabThree from './TabThreeNavigation'
// Redux
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        navigationState: state.tabThree,
        tabBarState: state.HomeReducer
    }
}
class TabThreeNavigation extends React.Component {
render(){
    const { navigationState, dispatch, tabBarState } = this.props;
    return (
      <NavigatorTabThree
        navigation={
          addNavigationHelpers({
            dispatch: dispatch,
            state: tabBarState,
          })
        }
      />
    )
  }
}
export default connect(mapStateToProps)(TabThreeNavigation)