import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { ActivityIndicator, Text, View, ListView, AsyncStorage } from 'react-native';
import { Oxygen } from '../../styles/colours';
import axios from 'axios';
import ListItem from '../cell/ListItem';
import * as Entities from 'entities';
import {Actions} from 'react-native-router-flux';

/* common */
import Header from '../common/Header';
import LayoutBorder from '../common/LayoutBorder';
import SearchView from '../common/SearchView';

class TableView extends Component {

	constructor(props) {
		super(props);

		this.renderRow = this.renderRow.bind(this);
		this.pressRow = this.pressRow.bind(this);
	}

	componentWillMount() {
		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = this.ds.cloneWithRows([]);
		this.props.setQuery('');
		this._fetchBrokers();
	}

	_fetchBrokers() {
		axios.get('http://oxygen.com.au/api/brokers/')
		.then((response) => {
			let data = response.data.map((elem) => {
				elem.bio = Entities.decodeHTML(elem.bio);
				return elem;
			});

			data.sort(this.sorting);

			this._addBrokerStorage(data);

			this.props.setBrokerData(data);
			this.dataSource = this.ds.cloneWithRows(data);
			this.props.updateLoading(true);
			this.props.setStoredList(data);
		})
		.catch((error) => {
			console.log('error');
			this.props.updateLoading(true);
			this._getBrokerStorage();
		});
	}

	_renderFooter() {
		if (!this.props.hasLoaded) {
			return (
				<View>
					<ActivityIndicator
						style={{height: 80}}
						size="large"
					/>
				</View>
			);
		} else {
			return null;
		}
	}

	_addBrokerStorage = async (data) => {
		try {
			await AsyncStorage.setItem('Brokers', JSON.stringify(data), () => {
				console.log('List saved');
			});
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	_getBrokerStorage() {
		try {
			AsyncStorage.getItem('Brokers', (err, result) => {
				if (err) {
					console.log(err);
				}

				if (result) {
					const data = JSON.parse(result);

					this.ds = new ListView.DataSource({
						rowHasChanged: (r1, r2) => r1 !== r2
					});

					this.props.setStoredList(data);
					this.props.setBrokerData(data);
					this.dataSource = this.ds.cloneWithRows(data);
					this.props.updateLoading(true);
					this.forceUpdate();
				}
				return;
			});
		} catch (error) {
			console.log(error);
		}
	}

	sorting(a, b) {
		if (a.fullName < b.fullName) {
			return -1;
		}
		if (a.fullName > b.fullName)  {
			return 1;
		}
		return 0;
	}

	renderRow(item) {
		return <ListItem item={ item } action={this.pressRow} />;
	}

	pressRow(id, fullName, email, phone, image) {
		const { isIdSet, storedId } = this.props;

		if (isIdSet && storedId === id) {
			this.props.setFavourite();
			this._removeStorage();
		} else {
			this.props.setFavourite(id, true, fullName, email, phone, image);
			this._addStorage(id, fullName, email, phone, image);
		}

		this.ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.dataSource = this.ds.cloneWithRows(this.props.tableData.data);
	}

	_addStorage = async (id, fullName, email, phone, image) => {
		try {
			const storedID = {
				id: id,
				fullName: fullName,
				email: email,
				phone: phone,
				image: image
			};
			await AsyncStorage.setItem('StoredID', JSON.stringify(storedID), () => {
				console.log('Favourite saved');
			});
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	_removeStorage = async () => {
		try {
			await AsyncStorage.removeItem('StoredID', () => {
				console.log('removed');
			});
		} catch (error) {
			console.log('AsyncStorage error: ' + error.message);
		}
	}

	_updateSearch(text) {
		this.props.setQuery(text.text);

		const storedList = this.props.storedList;

		let data = storedList.filter((item) => {
			let name = `${item.fullName}`.toLowerCase();
			return name.includes(text.text.toLowerCase());
		});

		if (data.length || !text.text.length) {
			this.dataSource = this.ds.cloneWithRows(data);
			this.props.setBrokerData(data);
		} else {
			this.ds = new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			});

			this.dataSource = this.ds.cloneWithRows(storedList);
			this.props.setBrokerData(storedList);
		}
	}

	render() {
		return (
			<View style={{flex: 1, backgroundColor: Oxygen.blue }}>
				<Header returnArrow={true} prev={() => Actions.pop()} />
				<LayoutBorder>
					<SearchView
						query={this.props.tableData.query}
						updateSearch={(text) => this._updateSearch(text)}
					/>
					<ListView
						dataSource={this.dataSource}
						enableEmptySections={true}
						renderFooter={() => this._renderFooter()}
						renderRow={this.renderRow}
					/>
				</LayoutBorder>
			</View>
		);
	}
}

export default TableView;
