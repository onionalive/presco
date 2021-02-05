import React, { PropTypes } from 'react';
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
// Tab-Navigators
import TabBar from '../tabbar/TabBarNavigation';
import ModalNav from '../modal/TransitionNavigation';
import ModalTransactionsNav from '../modalTransactions/TransitionNavigation';
import ModalStoreInfoNav from '../modalStoreInfo/TransitionNavigation';
import ModalStoreLocationsNav from '../modalStoreLocations/TransitionNavigation';
import OnboardingNav from '../onboarding/OnboardingNavigation';
import LandscapeNav from '../landscape/LandscapeNavigation';
import LoyaltyStatusNav from '../../components/loyaltyStatus/LoyaltyStatus';
import ModalEditPasswordNav from '../modalEditPassword/TransitionNavigation';
import ModalEditPhoneNav from '../modalEditPhone/TransitionNavigation';
import ModalDeleteAccountNav from '../modalDeleteAccount/TransitionNavigation';
import ModalAddCardNav from '../modalAddCard/TransitionNavigation';
import ModalCardDetailsNav from '../modalCardDetails/TransitionNavigation';
import ModalStoreMapNav from '../modalStoreMap/TransitionNavigation';
import Help from '../../components/help/Help';

const routeConfiguration = {
    TabBar: { screen: TabBar },
    ModalNav: { screen: ModalNav },
    ModalTransactionsNav: { screen: ModalTransactionsNav },
    ModalStoreInfoNav: { screen: ModalStoreInfoNav },
    ModalStoreLocationsNav: { screen: ModalStoreLocationsNav },
    ModalDeleteAccountNav: { screen: ModalDeleteAccountNav },
    LoyaltyStatusNav: { screen: LoyaltyStatusNav },
    EditPasswordPathway: { screen: ModalEditPasswordNav },
    EditPhonePathway: { screen: ModalEditPhoneNav },
    ModalAddCardNav: { screen: ModalAddCardNav },
    ModalStoreMapNav: { screen: ModalStoreMapNav },
    ModalCardDetailsNav: { screen: ModalCardDetailsNav },
    Help: { screen: Help }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'TabBar',
    mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false,
    }    
};
  
export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);
