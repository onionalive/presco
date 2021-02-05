import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import AddCardPathway from 'app/components/addcardpathway/AddCardPathway';

const routeConfiguration = {
    AddCardPathway: { screen: AddCardPathway }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'AddCardPathway',
    transitionConfig: () => {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);