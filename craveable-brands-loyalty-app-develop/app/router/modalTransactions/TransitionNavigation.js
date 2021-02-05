
import { StackNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

// Tab-Navigators
import TransactionDetail from 'app/components/offerdetail/OfferDetail';

const routeConfiguration = {
    TransactionDetail: { screen: TransactionDetail }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'TransactionDetail',
    transitionConfig: () => {
        return { screenInterpolator: CardStackStyleInterpolator.forHorizontal}
    },
    navigationOptions: {
        gesturesEnabled: false,
    },
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);