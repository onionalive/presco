/**
 * Navigation configuration
 */

import { StackNavigator } from 'react-navigation'
// Screens
import Profile from '../../components/profile/Profile';
import TabTwoScreenTwo from '../../components/alt/Alt';

const routeConfiguration = {
  Profile: { screen: Profile },
  TabTwoScreenTwo: { screen: TabTwoScreenTwo },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Profile'
}

export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);