/**
 * Navigation configuration
 */

import { StackNavigator } from 'react-navigation'
// Screens
import More from '../../components/more/More';
// import Help from '../../components/help/Help';

const routeConfiguration = {
  More: { screen: More },
  // Help: { screen: Help },
}
// going to disable the header for now
const stackNavigatorConfiguration = {
  headerMode: 'none',
  initialRouteName: 'More'
}

export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);