import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import TransitionNavigation from './TransitionNavigation'
// Redux
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        navigationState: state.modalCardDetailsNav
    }
}

class ModalCardDetailsNav extends React.Component {
render(){
    const { navigationState, dispatch } = this.props
    return (
      <TransitionNavigation
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
export default connect(mapStateToProps)(ModalCardDetailsNav);