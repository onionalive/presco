import React from 'react'
// Navigation
import { addNavigationHelpers } from 'react-navigation'
import LoginNavigation from './LoginNavigation'
// Redux
import { connect } from 'react-redux'
const mapStateToProps = (state) => {
    return {
        navigationState: state.loginNav
    }
}
class LoginNav extends React.Component {
render(){
    const { navigationState, dispatch } = this.props;
    return (
        <LoginNavigation
            navigation={
            addNavigationHelpers({
                dispatch: dispatch,
                state: navigationState
            })
            }
        />
    );
  }
}
export default connect(mapStateToProps)(LoginNav);