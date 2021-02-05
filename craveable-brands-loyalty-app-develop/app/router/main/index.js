import React, { PropTypes } from 'react';
import MainNav from './MainNavigation';
import { connect } from 'react-redux';
import {
    addMainListener
} from 'app/app';

const MainNavigation = (props) => {
  const { dispatch, mainNav } = props
  const navigation = addNavigationHelpers({
    dispatch,
    state: mainNav,
    addListener: addMainListener
  });
 return <MainNav navigation={navigation} />
}
const mapStateToProps = state => ({ mainNav: state.mainNav })

export default connect(mapStateToProps)(MainNavigation);