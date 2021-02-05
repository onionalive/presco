# Chicken Loyalty - React Native repo 

This is the main repo for Chicken Loyalty. Most documentation can be found by generating docs using `esdoc` and exporing the exported library.

## Exporting and running in Release mode 

### iOS

1. If you haven't run `npm run bundle:fix`, do so to fix an npm package that does not correctly use babel.
2. Run `npm run bundle:ios`
3. On Xcode, click from the top menu `Product > Scheme > Edit Scheme`
4. Under `Run`, change `Build Configuration` to `Release`

## Setting Up

### iOS
* Ensure you have cocoapods installed (run `gem install cocoapods`)
* From the root directory, `cd ios` and `pod install`
* Back in the root directory `npm install`, then `react-native link`
* Run `npm start`

### Android
* Ensure you have gradle installed (run `brew install gradle`)

### React Native Debugger
* Install `brew update && brew cask install react-native-debugger` and follow installation instructions
* Make sure all debugger clients of React Native are closed and open RNDebugger from your Applications
* Enable `Debug JS Remotely` via the developer menu (CMD + D) on your app emulator
* Troubleshooting: [https://githßub.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md](https://github.com/jhen0409/react-native-debugger/blob/master/docs/getting-started.md) 


## Symlinks 

We are using symlinks to point towards the correct project for Oporto/Red Rooster.

For Android, please change everything as your would from changing in the symlink directory. If you run into any issues, change into the `android` directory and run `./gradlew clean`.

## Changelog

Check the `manual/changelog.md` file for any important feature disabling during the build process.

## Theme 

To switch between themes, we have the React Native JS runtime bundler accept a `THEME` env variable that currently points to either `oporto` or `redrooster`. This can be accessed throughout the app using `process.env.THEME`. There is some initial cache resets to allow the env variables to swap.

## App

All React files for the app itself can be found at `/app/`. This React app depends on using Redux to hold global state.

The global `combineReducers` function is found in `/app/reducers.js`.

### Absolute imports 

Using the `package.json` folder in `app`, you can use absolute imports from `app/...`

### Components

All major visual components are found within `/app/components/`, however any files related to navigation can be found in the `/app/router/` folder.

The router has been set up to work with Redux - follow the current examples for more info on how to complete a route or check out [React Navigation](https://reactnavigation.org/docs/views/transitioner).
Components for the app can be found 

### Building Components 

This repo also Storybook. Best practise for focusing on the one component would be to run it through Storybook and add to the story so others can view the docs and see state changes. 

Given that we are using Redux, it is important that we use the `.addDecorator()` function to wrap components in the Redux Store. One small example has been left in the `/storybook/stories/index.js` file.

### Reducers 

**ProfileReducer:** All action creators and actions for the overall "Profile" are to be created here. You can link them into the component by call upon the correct `state.ProfileReducer.stateName` when using `mapStateToProps`.

## Static Typing

Flow is included with the project. Run `npm run flow` to run a server. Any libs from node_modules throwing errors will need to be added to `libdefs.js` and the reducer files generally get throw an issue for the `state` and `action` parameters.

### Important Notices

#### OCT 5 2017

Each reducer requires an abitrary action/state. Either set these up with the required objects they need or just use `// $FlowFixMe` on the line above the export of the reducer.

Example:

```javascript
// $FlowFixMe
export const HomeReducer = (state = initialState, action) => {
	switch(action.type) {
		/* Action Switch */
		case TITLE:
			return { ...state, loanType: action.value};
		default:
			return state;
	}
}
```

## Testing 

We are using Mocha, Chai and Enzyme where possible. The option to use Jest is also there.

### Common functions

All the functions with `app/common` are common to both this repo and the web repo - MAKE SURE THAT YOU ARE TESTING BOTH WHEN MAKING ANY CHANGES IF BOTH REPOS ARE BEING WORKED ON.

There is a `stub.json` file as of this writing that contains each function's return data (while the API keys are being sorted out) which has been ordered with the following conventio `function_name_to_test > status_code > return_data_for_each_code`. You can use `moxios` with these functions to fetch this data to "return" while testing offline.

## Debugging

Everytime I’ve reinstalled I’ve had to run `react-native-git-upgrade`, then `react-native link`, then `npm run dev:clean`,  deleted the app off the phone/simulator, then `command + shift + k` in xcode for a clean and then run a build - sometimes also closing Xcode and re-opening helped.

### Important Notices

#### OCT 4 2017
The tests themselves with Shallow etc do not currently work as the latest version of RN requires a version of React pre-release that does not have the corresponding test-utils package up to date.

#### OCT 5 2017
Looks as if the issue is the `react-native-mock` lib requiring to be up to date. Currently watching the issue https://github.com/RealOrangeOne/react-native-mock/pull/130

In the meantime, if tests need to be written just test the JavaScript funcs themselves with unit tests that do not require any React libs to render or consider Jest.

The Mocha tests could still deal with functionality but will not be able to render elements with the config shadow dom settings found in `test/setup.js`.

#### DEC 11 2017

Please ensure you use `ChickenLoyalty.xcworkspace` when launching the app in XCode. If you use `ChickenLoyalty.xcodeproj` you will get linker issues due to Cocoapods being added.
