import {Tranxactor} from 'app/common';
import SInfo from 'react-native-sensitive-info';
import { find } from 'lodash';
// Initial state
let initialState = {
	cards: []
}

/* Actions */
const RECEIVE_CARDS = 'LoyaltyCardReducer/RECEIVE_CARDS';
const RECEIVE_CARDS_FAILURE = 'LoyaltyCardReducer/RECEIVE_CARDS_FAILURE';

export const getLoyaltyCards = (memberId, token) => async dispatch => {	
	try {
		// const token = await SInfo.getItem('token', {});
		const {data, status} = await Tranxactor.getIdentifierList(memberId, token);
		if(status === 200) {
			const cards = data._embedded && data._embedded.memberIdentifiers || [];
			dispatch({ type: RECEIVE_CARDS, payload: cards })
		}
	} catch(err) {
		console.log('GetCardsList ERROR', err);
		// dispatch({ type: RECEIVE_CARDS_FAILURE })
	}
}

export const removeCard = (memberId, identifierId, token) => async dispatch => {
	try {
		// const token = await SInfo.getItem('token', {});
		return await Tranxactor.removeCard(identifierId, token);
		// return { status: 401 }
	} catch(err) {
		console.log('removeCard ERROR', err);
	}
}



export const LoyaltyCardReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case RECEIVE_CARDS:
			return { ...state, cards: action.payload };
		case RECEIVE_CARDS_FAILURE:
			return initialState;
		default:
			return state;
	}
}




/* ------------- Selectors ------------- */

export const displayCards = (State) => {
	return State.LoyaltyCardReducer.cards.filter((card, i) => {
		if (card.identifierStatus && card.identifierStatus.id == '1' 
			&& card.memberIdentifierType && card.memberIdentifierType.id == '1'
			) {
			return card;
		} 
   });
}


export const membershipCardId = (State) => {
	const cards = State.LoyaltyCardReducer.cards;
  	let primary_card;
  	primary_card = find(cards, (membership) => {
		return membership.memberIdentifierType && membership.memberIdentifierType.value === 'Card ISO'
			&& membership.identifierStatus && membership.identifierStatus.id === '1';
	});
  	return primary_card ? primary_card.memberIdentifier : null;
}
