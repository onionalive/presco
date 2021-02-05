# !important - How does the layout work?

When you create a component eg. Test, create three files:

1. <ComponentName>View - this will be the view file
2. <ComponentName>Reducer - this will be the reducer AND where the actions and action creators are written
3. <ComponentName> - this will be the main file that brings the above two together using redux and the connect function.

### ---- <ComponentName>View.js

This is the main component view file. Within the render() method, use console.log(this.state) and/or console.log(this.props) to debug the current state/props. 

### ---- <ComponentName>Reducer.js

This will be where you create actions, action creators AND the reducer. 

`Actions` are just the declaration that will be used in the actual exported reducer switch itself. An example of declaring actions will look like this:

```
// Actions
const UPDATE_VALUE = 'CalculatorState/UPDATE_VALUE';
const UPDATE_ANNUAL_INCOME = 'CalculatorState/UPDATE_ANNUAL_INCOME';
const UPDATE_OTHER_INCOME = 'CalculatorState/UPDATE_OTHER_INCOME';
const UPDATE_INTEREST_RATE = 'CalculatorState/UPDATE_INTEREST_RATE';
const RESET_ANNUAL_INCOME = 'CalculatorState/RESET_ANNUAL_INCOME';
const RESET_OTHER_INCOME = 'CalculatorState/RESET_OTHER_INCOME';
const RESET_INTEREST_RATE = 'CalculatorState/RESET_INTEREST_RATE';
```

Action Creators are the functions that will manipulate the state and can be access in the View props via `this.props.funcName` - generally you will find these to be destructured.

If you required altering the state of the component, you will need to ensure that this file is imported to `reducer.js` file at the top level of `src` and the action creators will be used in the main `<ComponentName>.js` file on the same level with the `connect` function. More explanation for the importing of `Action Creators` below.

### ---- <ComponentName>.js 

ENSURE that you import both the <ComponentName>View.js AND the <ComponentName>Reducer.js files.

Example from the Calculator folder:

```
import CalculatorView from './CalculatorView';

// action creator
import { updateValue, resetValue } from './CalculatorReducer';
```

These will be used with the connect function to marry up the two files and ensure that the correct state is coming across.

Full file example:

```
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import CalculatorView from './CalculatorView';

// import the action creators
import { updateValue, resetValue } from './CalculatorReducer';

const mapStateToProps = (state) => {
	return { value: state.calculatorReducer.value };
}

// updateValue and resetValue have been imported action creators from the Reducer
export default connect(mapStateToProps, { updateValue, resetValue })(CalculatorView);
```

To understand more on the connect function, it can be found on the Redux website or below in the crash course.

# Redux Crash Course
	
						Store
			____________________________
			|							|
			|							|
Action ------->  Reducer ------> State	|
			|							|
			|___________________________|

__Reducer__

A reducer is a function that producers some amount of data.

__Action__

An Action is a plain JS object that tells a reducer how to modify it's data. It has _one requirement_: a TYPE property.

__State__

State is the _Application's Data_ -> all the data inside the application puts together the state.

__Store__

The Store is what holds the reducers and appliction's state (essentially holds means a reference to these). This is generally declared at the entry point of the components.

__Example Process__

Refer to `https://stephengrider.github.io/JSPlaygrounds/` for testing.

Action: Turn 'asdf' into an array of characters

Reducer: If the action's type is `split`, the reducer will take a string of characters and turn it into an array. The reducer will then return the data.

State: The array -> ['a','s','d','f']

From this, we can determine that we will always have either an empty array or an array of characters.

```
const reducer = (state = [], action) => {
	if (action.type === 'split') {
		return action.payload.split('');
	} else if (action.type === "add_character") {
		// DO NOT DO THE FOLLOWING
    	// state.push(action.payload);
		// return state;

		// we do NOT want to mutate the state, ALWAYS return a new data structure!!!
		return [...state, action.payload];
	}

	return state;
}

const store = Redux.createStore(reducer);

store.getState(); 	// at the moment, we have an empty array return []

const action = {
	type: 'split_string',
	payload: 'asdf'
};

// you must dispatch the action. Just creating the action will do nothing.
store.dispatch(action);

store.getState();	// this time we would get ['a','s','d','f']

const action2 = {
  type: 'addChar',
  payload: 'a'
};

store.dispatch(action2);

store.getState();
```

__How to Decide on Reducers we want to make?__

q) What are the different variables that we want to store a piece of state?

Look at the design and make decisions on the state. Eg. master and detail - 2 pieces of state?

__How do we access the state using Redux?__

In the store, we will have some piece of State - we want to push that into a component.

To build this connection, we use `connect` from `react-redux`. From here, we use `MapStateToProps` to do as it sounds.

__Notes__

No matter how many actions we dispatch, the reducer will always return an object.

# Uploading the App to the App Store

More details for all of this can be found on Confluence.

## Developer Portal

Head to developer.apple, login, select the section about `Identifiers` and create a new `App ID` identifier.

Ensure that this identifier has the same `bundle id` as the one inside of your app. 

## iTunesConnect

Once this is done, ensure that you create a new App on `iTunes Connect` through the portal.

## Xcode

Ensure that you have an App icon, then archive the app through `Product > Archive`.

Once the App is archived, you can then upload it to iTunes Connect. Select `Upload` to upload it to the store.

## TestFlight

For other users to use test flight, head to iTunes connect and select your app. Then, select test flight and add in the Internal/Extenal Testing emails.

Select the archived version that you wish to share and then send out the invites.

Invitees will need to download `Flight Test`, then redeem the code in the app that comes from the email.