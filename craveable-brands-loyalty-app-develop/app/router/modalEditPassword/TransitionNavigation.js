import React from 'react';
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import EditPasswordPathway from 'app/components/editpasswordpathway/EditPasswordPathway';

const routeConfiguration = {
    EditPasswordPathway: { screen: EditPasswordPathway }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'EditPasswordPathway',
    transitionConfig: () => {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);