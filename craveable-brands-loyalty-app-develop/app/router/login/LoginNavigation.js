
import { StackNavigator } from 'react-navigation';

// Login
import LoginScreen from 'app/components/loginscreen/LoginScreen';

const routeConfiguration = {
    LoginScreen: { screen: LoginScreen }
};

const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'LoginScreen',
    navigationOptions: {
        gesturesEnabled: false,
    },
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);