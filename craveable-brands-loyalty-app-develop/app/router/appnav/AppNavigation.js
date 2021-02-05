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
import LoginNav from '../login/LoginNavigation';
import LoyaltyStatusNav from '../../components/loyaltyStatus/LoyaltyStatus';
import ModalEditPasswordNav from '../modalEditPassword/TransitionNavigation';
import ModalEditPhoneNav from '../modalEditPhone/TransitionNavigation';
import ModalDeleteAccountNav from '../modalDeleteAccount/TransitionNavigation';
import ModalAddCardNav from '../modalAddCard/TransitionNavigation';
import ModalCardDetailsNav from '../modalCardDetails/TransitionNavigation';
import ModalStoreMapNav from '../modalStoreMap/TransitionNavigation';
import RootScreen from 'app/components/common/RootScreen';
import RetryScreen from 'app/components/retryscreen/RetryScreen';
import ForgetPassScreen from 'app/components/forgetpass/ForgetPassWord';
import HypeScreen from 'app/components/hypescreen/HypeScreen';
import Help from '../../components/help/Help';
import FinishSignUpActivation from 'app/components/finishsignupactivation/FinishSignUpActivation';
import MainNavigation from '../main/MainNavigation';

const routeConfiguration = {
    RootNav: { screen: RootScreen },
    Main: {screen: MainNavigation},
    HypeScreeNav: { screen: HypeScreen },
    FinishActivation: { screen: FinishSignUpActivation },
    RetryNav: { screen: RetryScreen },
    ForgetPassNav: { screen: ForgetPassScreen },
    LoginNav: { screen: LoginNav },
    OnboardingNav: { screen: OnboardingNav },
    LandscapeNav: { screen: LandscapeNav }
};

// going to disable the header for now
const stackNavigatorConfiguration = {
    headerMode: 'none',
    initialRouteName: 'RootNav',
    // mode: 'modal',
    navigationOptions: {
        gesturesEnabled: false,
    }    
};

export default StackNavigator(routeConfiguration,stackNavigatorConfiguration);

