import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import StoreLocations from 'app/components/storemodal/StoreModal';

const routeConfiguration = {
    StoreLocations: { screen: StoreLocations }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'StoreLocations',
    transitionConfig: () => {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);