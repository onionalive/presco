// Set the initial state
let initialState = {
	data: [],
	query: 'Find a Broker'
}

// Actions
const SELECT = 'Table/SELECT'
const SET_BROKER_DATA = 'Table/SET_BROKER_DATA';
const SET_QUERY = 'Table/SET_QUERY';
const SET_STORED_LIST = 'Table/SET_STORED_LIST';

// Action Creators 
export const selectAction = (actionId) => {
	return {
		type: SELECT,
		payload: actionId
	};
};

export function setQuery(query) {
  return {
    type: SET_QUERY,
    query: query
  };
}

export function setBrokerData(data) {
  return {
    type: SET_BROKER_DATA,
    data: data
  };
}

export function setStoredList(data) {
  return {
    type: SET_STORED_LIST,
    data: data
  };
}

// Export a reducer function for each piece of different application state
export const TableReducer = (state = initialState, action) => {
	
	switch(action.type) {
		case SELECT:
			return action.payload;
		case SET_BROKER_DATA:
			return { ...state, data: action.data}; 
		case SET_STORED_LIST:
			return { ...state, storedList: action.data}; 
		case SET_QUERY:
			return { ...state, query: action.query}; 
		default:
			return state;
	}
}
