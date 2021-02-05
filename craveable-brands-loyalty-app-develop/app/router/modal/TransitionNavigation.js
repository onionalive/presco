
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import ModalPromo from 'app/components/common/modal/ModalPromo';

const routeConfiguration = {
    ModalPromo: { screen: props => <ModalPromo {...props} /> }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'ModalPromo',
    transitionConfig: ()=> {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);