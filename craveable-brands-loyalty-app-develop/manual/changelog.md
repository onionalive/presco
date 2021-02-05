# Changelog

## Outstanding issues
- Android RN Brightness lib
- react-native-linear-gradient conflicts on namespacing for start and end
- Login screen multiple windows

## 0.2.3
- Updates to the QR Code camera functionality
- Insertion of Firebase code

## 0.2.2
- Update TextInput to handle underlineColor prop
- Add SignupBox validators that are passed down from the SignUpScreens
- Add in text transition for input screen
- Add react-native-linear-gradient package - bridge issues in later RN versions, waiting for pull

## 0.2.1
- Create swiper container for Sign Up
- Create animation container for the sign up screens
- Implement the signup animation container
- Implement the Signup slider box
- Add keyboardAvoidingView for signup boxes
- Insert base styles for the signup slider
- Create a build a test version of the app
## 0.2.0
- Add in react-native-animatable 
- Work on Login Screen animations
## 0.1.3
- GET Tranxactor.getUserMemberships updated to work
- POST Tranxactor.createNewMember added
- ProfileReducer.createNewMember action creator added
- Create Firebase reducer + async storage
- PUT Tranxactor.terminateMember still to be pursued 
- Add Signup Screens
- Add Signup View

## 0.1.2
- Added login back in
- Fix the Firebase credentials
- Update Transactor error handling to deal with start handling certain error codes
- POST Create account successful, but you cannot use the same mobile number fields (which causes issues for reiteration)
- Waiting on a PUT update membership example for terminating
- GET Member cards currently returning 400
- GET Transactions fetching is okay
- GET Membership fetching is okay
- Transaction accordian logic discussion with designers
- Changed every certificate for the app bundle change, but this took forever - we need to decide on an app bundle, name and resolve the accounts
- Re-added the Login functionality but there are currently issues with chained requests to grab other information (Russell suggested a solution)
- Added back in push notifications with the new certificate
- Added back in the updated Firebase stuff
- Create the .p12 file and password but currently not in the email thread, just with me. Sent email replies.

## 0.1.1
- Update certificates and files for com.presentcompany.loyaltyapp

## 0.0.2
- Initialised the changelog.
- Auth disabled.
- Grand Central Dispatch warning with multiple login screens. Given the auth disabling, just dismiss all with the login.
- Async storage fetch disabled.
- Remember login disabled