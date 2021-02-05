// React
import React, { Component } from 'react';
// Navigation
import { addNavigationHelpers } from 'react-navigation';
import TabBarNavigator from './TabBarNavigation';

// Redux
import { connect } from 'react-redux';
import {
    addTabBarListener
} from 'app/app';

const mapStateToProps = (state) => {
	return {
        navigationState: state.tabBar
	}
}

class TabBar extends Component {
	render() {
        const { navigationState, dispatch } = this.props;
        const navigation = addNavigationHelpers({
            dispatch: dispatch,
            state: navigationState,
            addListener: addTabBarListener
        });

        return (
            <TabBarNavigator
                navigation={this.props.screenProps.navigation}
                screenProps={{
                    ...this.props.screenProps
                }}
            />
        );
	}
}

export default connect(mapStateToProps)(TabBar);