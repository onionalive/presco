/**
 * Navigation configuration
 */

import { StackNavigator } from 'react-navigation'
// Screens
import TabOneScreenOne from 'app/components/home/Home';
import TabOneScreenTwo from 'app/components/alt/Alt';

const routeConfiguration = {
  TabOneScreenOne: { screen: TabOneScreenOne },
  TabOneScreenTwo: { screen: TabOneScreenTwo },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'TabOneScreenOne'
}

export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);