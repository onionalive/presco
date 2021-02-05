import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Text, View, FlatList, TouchableHighlight, Image, Dimensions, ScrollView, ListView, RefreshControl } from 'react-native';
import _ from 'lodash';
import Images from 'app/img/Image';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';

const { width, height } = Dimensions.get('window');
const defaultMessage = 20;

class StoreListView extends Component {
	 constructor (props) {
	    super(props)
	    this.state = {
	      refreshing: false
	    }
	  }

	 handlePress = (store) => {
 	 	const { navigation } = this.props;
		navigation.navigate('ModalStoreInfoNav', { store });
	 }

	 renderItem = ({item}) => {
	    const { 
			iconStyle, 
			titleStyle, 
			itemContainer,
			titleContainer,
			iconContainer
		} = styles;
		const { store } = item;

	    return (
	      <TouchableHighlight onPress={() => {this.handlePress(store)}} underlayColor='transparent'>
	        <View style={itemContainer}>
	          <View style={titleContainer}>
	          	<Text style={titleStyle}>{store.title}</Text>
	          	{item.distance && <Text>{parseFloat(item.distance).toFixed(2)}km away</Text>}
	          </View>
	          <View style={iconContainer}>
	          	<Image style={iconStyle} source={Images.chevronRightBlack}/>
	           </View>	
	        </View>
	      </TouchableHighlight>
	    )
	 }

	 renderButton = () => {
	 	return (
	 		<TouchableHighlight onPress={() => this.props.enableAction()} underlayColor='transparent' style={styles.buttomButtonContainer}>
		        <View>
		          <Text style={styles.buttonText}>USE MY LOCATION</Text>
		        </View>
		     </TouchableHighlight>
	 	)
	 }

	 componentDidUpdate(prevProps) {
    	if(this.props.storeList !== prevProps.storeList) {
    		_.delay(() => {this.refs.locationlist && this.refs.locationlist.scrollToIndex({animated: true, index: 0, viewPosition: 0})}, 1000);
    	}
  	 }

	  // loadMore = (distanceFromEnd) => {
	  //   	console.log('distanceFromEnd', distanceFromEnd);
			// const { numberToShow } = this.state;
			// if( numberToShow <= 40 ){
			// 	const { storeList } = this.props;
			// 	const newNumber = numberToShow + 5 ;
			// 	const data = _.take(storeList, newNumber);
			// 	console.log('data.length', data.length)
			// 	this.setState({
			// 		numberToShow: newNumber,
			// 		stores: data
			// 	})
			// }
	  // }

	render() {
		const { stores, refreshing,  showGetLocationButton } = this.state;
		const { storeList, showEnableButton } = this.props;
		return(
			<View style={{ flexDirection: 'column', flex: 1}}>
				<FlatList
					getItemLayout={(data, index) => (
					    {length: 50, offset: 50 * index, index}
					 )}
					initialScrollIndex={0}
			        ref="locationlist"
			        extraData={storeList}
			        style={{backgroundColor: 'white'}}
			        data={storeList}
			        keyExtractor={item => item.id}
			        scrollEventThrottle={16}
			        renderItem={this.renderItem}
			    />
			    { showEnableButton && this.renderButton() }
		    </View>
		)
	}
}

const styles = {
    buttonText: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    },
	buttomButtonContainer: {
    	backgroundColor: Colours.cPrimary,
        position: 'absolute',
        width: '100%',
    	bottom: 0,
  		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 50
  	},
	iconContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	 	marginRight: 20
	 },
	itemContainer: {
		height: 55,
		marginTop: 10,
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: width,
		borderBottomWidth: 1,
		borderBottomColor: Colours.cGrey
	},
	titleContainer: {
		flexDirection: 'column',
		marginLeft: 20,
		marginBottom: 10 
	},
	iconStyle: {
		width: 15,
		height: 15
	},
	titleStyle: {
		marginVertical: 5,
		...Fonts.fUtilityBold,
		fontSize: 13,
		color: Colours.cOffBlack
	},
	textStyle: {
		fontSize: 20
	},
	initStyle: {
		flex: 1
	},
	flexCenter: {
		minHeight: height,
		justifyContent: 'center',
		alignItems: 'center'
	},
};

export default StoreListView;
