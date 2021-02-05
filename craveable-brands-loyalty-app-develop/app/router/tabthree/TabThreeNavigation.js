/**
 * Navigation configuration
 */

import { StackNavigator } from 'react-navigation'
// Screens
import Offers from '../../components/offers/Offers';
import TabThreeScreenTwo from '../../components/alt/Alt';

const routeConfiguration = {
  Offers: { screen: Offers },
  TabThreeScreenTwo: { screen: TabThreeScreenTwo }
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'Offers'
}

export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);