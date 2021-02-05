// Initial state
let initialState = {
	notificationText: ':coffee: Your accounts have been merged! Way to give yourself an extra $1.00! Hungry?',
	notificationTextBottom: {
		title: ':coffee: About those accounts you wanted to merge...',
		subtitle: `We haven't got a confirmation yet, do you need it re-sent? Or should we forget it ever happened?`,
		buttons: [
			{ title: 'ButtonOne', action: () => console.log('actionOne') },
			{ title: 'ButtonTwo', action: () => console.log('actionTwo') }
		],
		footer: 'Forget about it',
		view: 'ONE'
	},
	showNotificationBottom: false
}


/* Actions */
const UPDATE_NOTIFICATION = 'OnboardingReducer/UPDATE_NOTIFICATION';
const UPDATE_NOTIFICATION_BOTTOM = 'OnboardingReducer/UPDATE_NOTIFICATION_BOTTOM';
const UPDATE_SHOW_NOTIFICATION_BOTTOM = 'OnboardingReducer/UPDATE_SHOW_NOTIFICATION_BOTTOM';

/* Action Creators */
export function updateNotification(message) {
  return {
    type: UPDATE_NOTIFICATION,
    value: message
  };
}

export function updateNotificationBottom(data) {
  return {
    type: UPDATE_NOTIFICATION_BOTTOM,
		value: data,
		showNotification: true
  };
}

export function updateShowNotificationBottom(state) {
  return {
    type: UPDATE_SHOW_NOTIFICATION_BOTTOM,
		showNotification: state
  };
}

// $FlowFixMe
export const HomeReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case UPDATE_NOTIFICATION:
			return { ...state, notificationText: action.value};
		case UPDATE_NOTIFICATION_BOTTOM:
			console.log('UPDATE_NOTIFICATION_BOTTOM');
			return { 
				...state, 
				notificationTextBottom: action.value, 
				showNotificationBottom: action.showNotification
			};
		case UPDATE_SHOW_NOTIFICATION_BOTTOM:
			return { 
				...state,
				showNotificationBottom: action.showNotification
			};
		default:
			return state;
	}
}
