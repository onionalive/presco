import Tranxactor from 'app/common/Tranxactor';

// Initial state
let initialState = {
	name: '',
	lastName: '',
	email: '',
	phone: '',
	error: 'This is the err message',
	password: '',
	cardNumber: '',
	cardPin: ''
}

/* Actions */
const UPDATE_NAME = 'SignUpReducer/UPDATE_NAME';
const UPDATE_LAST_NAME = 'SignUpReducer/UPDATE_LAST_NAME';
const UPDATE_EMAIL = 'SignUpReducer/UPDATE_EMAIL';
const UPDATE_PHONE = 'SignUpReducer/UPDATE_PHONE';
const UPDATE_ERROR = 'SignUpReducer/UPDATE_ERROR';
const UPDATE_PASSWORD = 'SignUpReducer/UPDATE_PASSWORD';
const UPDATE_CARD_NUMBER = 'SignUpReducer/UPDATE_CARD_NUMBER';
const UPDATE_CARD_PIN = 'SignUpReducer/UPDATE_CARD_PIN';

/* Action Creators */
export function updateName(text) {
  return {
    type: UPDATE_NAME,
    value: text
  };
}

export function updateLastName(text) {
  return {
    type: UPDATE_LAST_NAME,
    value: text
  };
}

export function updateEmail(text) {
  return {
    type: UPDATE_EMAIL,
    value: text
  };
}

export function updatePhone(text) {
  return {
    type: UPDATE_PHONE,
    value: text
  };
}

export function updatePassword(text) {
  return {
    type: UPDATE_PASSWORD,
    value: text
  };
}

export function updateCardNumber(text) {
  return {
    type: UPDATE_CARD_NUMBER,
    value: text
  };
}

export function updateCardPin(text) {
  return {
    type: UPDATE_CARD_PIN,
    value: text
  };
}

export function updateError(text) {
	return {
		type: UPDATE_ERROR,
		value: text
	};
}

export function createAccount(data) {
	return function(dispatch) {
		Tranxactor.createNewMember(data)
			.then(response => {
				console.log(response);
				dispatch({
					type: TYPE,
					payload: response.data.message
				});
			});
	}
}

export const SignUpReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case UPDATE_NAME:
			return { ...state, name: action.value};
		case UPDATE_LAST_NAME:
			return { ...state, lastName: action.value};
		case UPDATE_EMAIL:
			return { ...state, email: action.value};
		case UPDATE_PHONE:
			return { ...state, phone: action.value};
		case UPDATE_ERROR:
			return { ...state, error: action.value};
		case UPDATE_PASSWORD:
			return { ...state, password: action.value};
		case UPDATE_CARD_NUMBER:
			return { ...state, cardNumber: action.value };
		case UPDATE_CARD_PIN:
			return { ...state, cardPin: action.value };
		default:
			return state;
	}
}