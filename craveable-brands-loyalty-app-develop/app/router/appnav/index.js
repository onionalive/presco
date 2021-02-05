import React from "react";
import { BackHandler } from "react-native";
import { addNavigationHelpers, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';
import AppNav from './AppNavigation';
import {
    addAppNavListener
} from 'app/app';
import last from 'lodash/last';


class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }


  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
  	// finish the logic here, now only handle the go back modal
    const { dispatch, appNav } = this.props;
    const last_route = last(appNav.routes);
    console.log(last_route);
    if(last_route.routeName === 'Main'){
    	const isTag = last_route.routes.length === 1 && last_route.routes[0].index !== 0;
    	if(last_route.routes.length > 1 || isTag){
    		dispatch(NavigationActions.back());
    	}
    }
    return true;
  };

  render() {
	  const { dispatch, appNav } = this.props;
	  const navigation = addNavigationHelpers({
	    dispatch,
	    state: appNav,
	    addListener: addAppNavListener
	  })
	  return <AppNav navigation={navigation} />
  }
}

const mapStateToProps = state => ({ appNav: state.appNav })

export default connect(mapStateToProps)(ReduxNavigation);