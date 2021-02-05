import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
// import StoreMap from 'app/components/storemap/StoreMap';
// Tab-Navigators
import StoreMap from 'app/components/common/modal/ModalMap';


const routeConfiguration = {
    StoreMap: { screen: StoreMap }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'StoreMap',
    transitionConfig: () => {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);