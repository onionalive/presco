import React from 'react';
import { Scene, Router, ActionConst } from 'react-native-router-flux';
import { Base, BucketOne } from './styles/colours';

// scene-target
// import PropertyInvestmentsPathway from './components/propertyinvestmentspathway/PropertyInvestmentsPathway'; 
// import HoldingCostsPathway from './components/holdingcostspathway/HoldingCostsPathway'; 
// import ExtraRepaymentsPathway from './components/extrarepaymentspathway/ExtraRepaymentsPathway'; 
import StampDutyPathway from './components/stampdutypathway/StampDutyPathway'; 
import RepaymentsPathway from './components/repaymentspathway/RepaymentsPathway'; 
import Profile from './components/profile/Profile'; 
import BorrowSwiper from './components/borrowswiper/BorrowSwiper'; 
import Borrow from './components/borrow/Borrow'; 
import CalculatorSelect from './components/calculatorselect/CalculatorSelect'; 
import Home from './components/home/Home';
import Table from './components/table/Table';

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root">
				<Scene 
					key="home" 
					component={Home} 
					title="Home" 
					inital={true}
					type={ActionConst.REPLACE}
					hideNavBar 
				/>
				<Scene 
					key="calc" 
					component={CalculatorSelect}
					hideNavBar
				/>
				<Scene  
					key="borrowSwiper"
					component={BorrowSwiper}
					hideNavBar
				/>
				<Scene  
					key="repaymentsPathway"
					component={RepaymentsPathway}
					hideNavBar
				/>
				<Scene  
					key="stampDutyPathway"
					component={StampDutyPathway}
					hideNavBar
				/>
				<Scene  
					key="table"
					component={Table}
					hideNavBar
				/>
				<Scene  
					key="profile"
					component={Profile}
					hideNavBar
				/>
			</Scene>
		</Router>
	);
};

export default RouterComponent;
