import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform, AsyncStorage } from 'react-native';
import Button from 'app/components/common/Button';
import CardStackContainer from 'app/components/cardstackcontainer/CardStackContainer';
import CardStackChild from 'app/components/common/CardStackChild';
import CardStackActions from 'app/components/common/CardStackActions';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import InputField from 'app/components/common/InputField';
import CommonInfoBox, {
    TYPE_TEXT,
    TYPE_CAMERA,
    TYPE_CAMERA_DISABLED,
    TYPE_TWO_BUTTON,
    TYPE_TWO_INPUT
} from 'app/components/common/CommonInfoBox';
import PushNotification from 'react-native-push-notification';
import { isNumber } from 'util';
import Camera from 'react-native-camera';
import QRCodeScreen from 'app/components/common/QRCodeScreen';
import Tranxactor from 'app/common/Tranxactor';

import SInfo from 'react-native-sensitive-info';

// TODO: Update the Firebase copy for SignUpSeven onwards

/** 
 * Notes:
 * Each component renders a type of CommonInfoBox
 * and there is a validation method specific to each
 * view that is passed to that component to validate
 * the user input appropriately.
 * 
 * The copy comes from the Firebase Reducer and is passed
 * to these components using props from SignUpView.js
 * 
 * The Camera "SignUpNine" has been changed and exported
 * as a class given the complexity. It is also used elsewhere
 * in the app and could be pulled out of both places and
 * stored just as one component.
 */

/**
 * Name
 * @param {*} props 
 */
export const EnterName = (props) => {
    const validator = (firstName, lastName) => {
        if (firstName.length === 0) {
            return {
                status: false,
                message: props.copy.fieldTooltip,
                type: 'firstName'
            };
        } else if (lastName.length === 0) {
            return {
                status: false,
                message: 'Please enter your last name',
                type: 'lastName'
            };
        } else {
            return {
                status: true
            };
        }
    }

    const { heading, field, button } = props.copy;

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading} 
                placeholder={field} 
                error={props.error}
                placeholderTwo={'Enter your last name'} 
                errorTwo={props.error}
                action={props.forward} 
                validator={validator}
                updateAction={props.updateAction}
                updateActionTwo={props.updateActionTwo}
                updateError={props.updateError}
                button={button}
                type={TYPE_TWO_INPUT}
            />
        </View>
    );
}
/**
 * Email
 * @param {*} props 
 */
export const EnterEmail = (props) => {
    const validator = (value) => {
        if (!value.includes('@')) {
            return {
                status: false,
                message: props.copy.fieldTooltip
            };
        } else {
            return {
                status: true
            };
        }
    }

    const { heading, field, fieldTooltip, button } = props.copy;

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading} 
                validator={validator}
                placeholder={field}
                action={props.forward} 
                updateAction={props.updateAction} 
                error={props.error}
                updateError={props.updateError}
                button={button}
                keyboardType='email-address'
            />
        </View>
    );
}

/**
 * Mobile
 * @param {*} props 
 */
export const EnterPhone = (props) => {

    const validator = (value) => {
        if (!value.length === 10) {
            return {
                status: false,
                message: props.copy.fieldTooltip
            };
        } else {
            return {
                status: true
            }
        }
        // if (false) {
        //     PushNotification.localNotification({
        //         /* Android Only Properties */
        //         tag: 'bottom', // (optional) add tag to message
    
        //         // /* iOS only properties */
        //         category: 'bottom', // (optional) default: null
    
        //         /* iOS and Android properties */
        //         title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
        //         message: "My Notification Message", // (required)
        //         playSound: false, // (optional) default: true
        //         soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        //         // number: '10', // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        //         // repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
        //         // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
        //     });
        // }
    }

    const { heading, button, helper, field } = props.copy;

    const body = props.copy.body.replace('[name]', props.userName);
    
    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                body={body}
                placeholder={field}
                helper={helper}
                action={props.forward} 
                validator={validator}
                updateAction={props.updateAction} 
                error={props.error} 
                updateError={props.updateError}
                button={button}
                keyboardType='phone-pad'
            />
        </View>
    );
}

/**
 * Password
 * @param {*} props 
 * Currently API is enforcing this: 
 * 1. password must have between 6 and 18 characters 
 * 2. must contain at least 1 lowercase
 * 3. 1 uppercase 
 * 4. 1 numeric character
 */
export const EnterPassword = (props) => {
    const { heading, field, button } = props.copy;
    // update this later
    const validator = async (value) => { 
        try {
            const upperCaseRegex        = new RegExp('[A-Z]+');
            const lowerCaseRegex        = new RegExp('[a-z]+');
            const alphaNumericRegex     = new RegExp('[0-9]+');

            if (value.length < 6 || value.length > 18) {
                return {
                    status: false,
                    message: 'Password length must be between 6 and 18 characters.'
                };
            } else if (!upperCaseRegex.test(value)) {
                return {
                    status: false,
                    message: 'Password must contain at least one uppercase character.'
                };
            } else if (!lowerCaseRegex.test(value)) {
                return {
                    status: false,
                    message: 'Password must contain at least one lowercase character.'
                };
            } else if (!alphaNumericRegex.test(value)) {
                return {
                    status: false,
                    message: 'Password must contain at least one numeric character.'
                };
            } else {
                return {
                    status: true
                }
            }
        } catch(err) {
            console.log(err);
            return {
                status: false,
                message: 'There has been an error.'
            };
        }
    };
    
    const notif = (message) => ({
        title: 'Error',
        subtitle: message ? message : `There was an error when creating your account.`,
        buttons: [
            { 
                title: 'Dismiss',
                action: null
            }
        ],
        view: 'ONE'
    });
    
    const signup = async () => {
        try {
            const res = await Tranxactor.createNewMember(props.signupData);

            if (__DEV__) {
                console.log('### init createNewMember'); 
                console.log('createNewMember res:', res);   
            }

            if (res.status === 200) {
                props.forward();
            } else {
                if (__DEV__) console.log(res.status);
                props.updateNotificationBottom(notif(res.response.data.errorMessage));
            }
        } catch(err) {
            if (__DEV__) console.log('### createNewemer errored', err);
            props.updateNotificationBottom(notif());
        }
    }

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                body={field}
                placeholder={'Password'}
                action={signup} 
                validator={validator}
                updateAction={props.updateAction} 
                error={props.error}
                updateError={props.updateError}
                button={button}
                secureTextEntry={false}
            />
        </View>
    );
}

/**
 * Validate Number
 * @param {*} props 
 */
export const ValidateRegistration = (props) => {
    const { heading, placeholder, button } = props.copy;
    const body = props.copy.body.replace('[phone]', props.userPhone);

    const validator = async (value) => { 
        return {
            status: true
        };
    };

    const checkUserData = async () => {
        try {
            if (__DEV__) console.log('### Log in with the new account using the sign up data:', props.signupData);
            
            const tokenData = await Tranxactor.getToken({
				username: props.signupData.emailAddress,
				password: props.signupData.password
            });
            
            if (__DEV__) console.log('Token acquired', tokenData);

            const { status, data } = tokenData;
            if (status === 200) {
                if (__DEV__) console.log('### DATA BACK', data);
    

                SInfo.setItem('token', data.token, {});
                SInfo.setItem('masterToken', data.masterToken, {});
                const [userDetails, memberships] = [
                    await Tranxactor.getUserDetails(data.token),
                    await Tranxactor.getIdentifierList(data.userId, data.token)
                ];
    
                if (userDetails.status === 200 && memberships.status === 200) {
                    try {
                        /** 
                         * Sync all the useful information we get with AsyncStorage
                         */
                        if (userDetails.data.memberStatus.value === 'Loyalty Member // Registered') {
                            props.setExpiration(data.expiration); // store expiration in reducer
                            const userInfo = userDetails.data;
                            props.updateProfile(userInfo);
                            AsyncStorage.setItem('loggedIn', 'true', () => console.log('loggedIn set'));
                            AsyncStorage.setItem('onboarding', 'true', () => console.log('onboarding set'));
                            AsyncStorage.setItem('userId', userInfo.id, () => console.log('userId set'));
                            AsyncStorage.setItem('userName', userInfo.firstName, () => console.log('userName set'));
                            AsyncStorage.setItem('userType', userInfo.type, () => console.log('userType set'));
                            props.updateMemberships(memberships.data._embedded.memberIdentifiers);
                            
                            props.forward();
                        } else {
                            const notif = {
                                title: 'Error',
                                subtitle: 'We could not validate your registration. Please ensure you have visited the link we sent to your phone!',
                                buttons: [
                                    { 
                                        title: 'Dismiss',
                                        action: null
                                    }
                                ],
                                footer: 'Forget about it',
                                view: 'ONE'
                            };
                            props.updateNotificationBottom(notif);
                        }
                    } catch(err) {
                        console.log(err);

                        const notif = {
                            title: 'Error',
                            subtitle: `There was an error when making that request.`,
                            buttons: [
                                { 
                                    title: 'Dismiss',
                                    action: null
                                }
                            ],
                            view: 'ONE'
                        };
                        props.updateNotificationBottom(notif);
                    }
                }
            } else if (status === 400) {
                const notif = {
                    title: 'Error',
                    subtitle: 'This is the error',
                    buttons: [
                        { 
                            title: 'Dismiss',
                            action: null
                        }
                    ],
                    view: 'ONE'
                };
                props.updateNotificationBottom(notif);
            } else {
                const notif = {
                    title: 'Error',
                    subtitle: 'We could not validate the account.',
                    buttons: [
                        { 
                            title: 'Dismiss',
                            action: null
                        }
                    ],
                    view: 'ONE'
                };
                props.updateNotificationBottom(notif);
            }  
        } catch(err) {
            console.log('call failed', err);
            const notif = {
                title: 'Error',
                subtitle: `There was an error when making that request.`,
                buttons: [
                    { 
                        title: 'Dismiss',
                        action: null
                    }
                ],
                view: 'ONE'
            };
            props.updateNotificationBottom(notif);
        }
    }

    // TODO: The input field should not be shown on the Signup Box
    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading} 
                body={body}
                placeholder={placeholder}
                action={checkUserData} 
                button={button}
                validator={validator}
                type={TYPE_TEXT}
                error={props.error}
                updateError={props.updateError}
            />
        </View>
    );
}

/**
 * Voucher
 * @param {*} props 
 */
export const VoucherGifted = (props) => {
    const { heading, body, button } = props.copy;

    const validator = () => { return { status: true }};

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading} 
                body={body}
                action={props.forward} 
                validator={validator}
                button={button}
                type={TYPE_TEXT}
            />
        </View>
    );
}

/**
 * SMS Validation
 * @param {*} props 
 */
export const ConfirmRegistration = (props) => {
    const {
        heading,
        body,
        buttonAdd,
        buttonContinue
    } = props.copy;
    
    const validator = () => { 
        return { status: true }
    }; 
    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox title={heading} 
                actionLeft={props.forward} 
                actionRight={props.action} 
                buttonTextLeft={buttonAdd}
                buttonTextRight={buttonContinue}
                validator={validator}
                type={TYPE_TWO_BUTTON}
                buttonType={TYPE_TWO_BUTTON}
                body={body}
            />
        </View>
    );
}

/**
 * Add Card
 * @param {*} props 
 */
// export const SignupEight = (props) => {
//     const validator = () => { return { status: true }}; 
//     return (
//         <View style={[styles.initStyle, styles.flexCenter]}>
//             <CommonInfoBox title="Add flame rewards" 
//                 placeholder="Your card number" 
//                 action={props.forward} 
//                 button={'Next'}
//                 validator={validator}
//             />
//         </View>
//     );
// }

// /**
//  * Camera
//  * @param {*} props 
//  */
// export class SignupNine extends Component {
//     state = {
//         manual: false,
//         cameraAuth: false
//     };
    
//     validator = () => { return { status: true }}; 

//     isCameraEnabled = () => {
//         return this.state.cameraAuth ?
//             this.renderScanner() :
//             this.renderError();
//     }

//     renderError = () => {
//         return (
//             <CommonInfoBox title="Add your flame rewards card" 
//                 body="Please enable camera access to scan your QR Code/Barcode" 
//                 action={this.props.forward} 
//                 button={'Next'}
//                 validator={this.validator}
//                 type={TYPE_CAMERA_DISABLED}
//             />
//         );
//     }
    
//     renderScanner = () => {
//         return (
//             <CommonInfoBox title="Add your flame rewards card" 
//                 placeholder="Your name" 
//                 action={this.props.forward} 
//                 button={'Next'}
//                 validator={this.validator}
//                 updateAction={this.props.updateAction} 
//                 type={TYPE_CAMERA}
//                 key="CommonInfoBox"
//             />
//         );
//     }
    
//     renderManual = () => (
//         <CommonInfoBox title="Add your flame rewards card" 
//             placeholder="Your card number" 
//             action={this.props.forward} 
//             button={'Next'}
//             validator={this.validator}
//             updateAction={this.props.updateAction} 
//         />
//     );

//     updateView = (isScanner) => {
//         this.setState({
//             ...this.state,
//             manual: isScanner ? false : true
//         });
//     }

//     componentDidMount() {
//         if (Platform.OS === 'ios') {
//             Camera.checkVideoAuthorizationStatus()
//                 .then(res => this.setState({
//                     ...this.state,
//                     cameraAuth: res
//                 }))
//                 .catch(err => console.log(err));
//         }
//     }

//     render() {
//         return (
//             <View style={[styles.initStyle, styles.flexCenter]}>
//                 {
//                     this.state.manual ? 
//                     this.renderManual() :
//                     this.isCameraEnabled()
//                 }
//                 <Button 
//                     key="button"
//                     action={() => this.updateView(this.state.manual)}>
//                     <Text style={{
//                         ...Fonts.fUtility,
//                         color: Colours.cWhite,
//                         margin: 10
//                     }}>{this.state.manual ?
//                         'Scan card' :
//                         'Enter manually'}</Text>
//                 </Button>
//             </View>
//         );
//     }
// }

// /**
//  * Verify
//  * @param {*} props 
//  */
// export const SignupTen = (props) => {
//     const validator = () => { return { status: true }}; 
//     const addCard = () => {
//         // console.log('primaryCard', props.primaryCard);

//         if (true) {
//             // send a success notification
//             props.action();
//         } else {
//             // do something for no success
//         }
//     }

//     return (
//         <View style={[styles.initStyle, styles.flexCenter]}>
//             <CommonInfoBox 
//                 title="Verify your card"
//                 placeholder="Your pin" 
//                 action={addCard} 
//                 button={'Verify card'}
//             />
//         </View>
//     );
// }

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
        flex: 1,
        marginRight: 30,
        marginLeft: 30
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
    title: {
        ...Fonts.fHeadingLarge,
        color: Colours.cWhite,
        maxWidth: 200,
        textAlign: 'center',
        marginBottom: 10
    },
    subtitle: {
        ...Fonts.fInputFieldText,
        color: Colours.cWhite,
        maxWidth: 200,
        textAlign: 'center',
        marginBottom: 10
    },
    utility: {
        ...Fonts.fUtility,
        color: Colours.cWhite,
        maxWidth: 280,
        textAlign: 'center',
        marginBottom: 60
    }
};

const inputStyle = {
    container: {
        paddingLeft: 20,
        paddingRight: 20
    },
    textStyle: {
        color: Colours.cWhite
    }
}

const buttonStyles = {
    button: {
        backgroundColor: Colours.cPrimary,
        padding: 12,
        paddingLeft: 18,
        paddingRight: 18,
        borderRadius: 4,
        minWidth: 180,
        alignItems: 'center',
        marginBottom: 10
    },
    text: {
        ...Fonts.fPrimary,
        color: Colours.cWhite,
        fontSize: 14
    }
}
