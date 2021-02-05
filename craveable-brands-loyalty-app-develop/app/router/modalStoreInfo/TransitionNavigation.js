import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import StoreInfo from 'app/components/storeinfo/StoreInfo';

const routeConfiguration = {
    StoreInfo: { screen: StoreInfo }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'StoreInfo',
    transitionConfig: () => {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);