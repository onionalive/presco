
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import Landscape from 'app/components/landscape/Landscape';

const routeConfiguration = {
    Landscape: { screen: Landscape }
};

const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'Landscape',
    transitionConfig: ()=> {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    }
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);