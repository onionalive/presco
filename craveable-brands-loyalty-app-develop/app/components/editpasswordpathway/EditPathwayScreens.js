import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
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
    TYPE_TWO_BUTTON
} from 'app/components/common/CommonInfoBox';
import PushNotification from 'react-native-push-notification';
import { isNumber } from 'util';
import Camera from 'react-native-camera';
import QRCodeScreen from 'app/components/common/QRCodeScreen';
import Tranxactor from 'app/common/Tranxactor';

// TODO: Update the Firebase copy for SignUpSeven onwards
export const RequestToken = (props) => {
    const { heading, body, button } = props.copy;
    // update this later
    const validator = () => { 
        return { status: true };
    };    

    const getToken = async () => {
        try {
            const resetTokenData = await Tranxactor.resetUserPasswordToken({
                emailAddress: props.emailAddress
            });

            props.forward();
            if (__DEV__) console.log('### resetTokenData:', resetTokenData.data);
        } catch(err) {
            props.updateNotificationBottom({
                title: 'Error',
                subtitle: err.response.data.errorMessage,
                buttons: [
                    { title: 'Dismiss', action: null },
                ],
                footer: '',
                view: 'ONE'
            });
        }
    };

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                action={getToken}
                validator={validator}
                error={'props.error'} 
                updateError={() => console.log('props.updateError')}
                button={button}
                secureTextEntry={true}
                body={body}
                type={TYPE_TEXT}
            />
        </View>
    );
}

export const RequestSent = (props) => {
    const { heading, body, button } = props.copy;
    // update this later
    const validator = () => { 
        return { status: true };
    };    

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                action={props.action} 
                validator={validator}
                updateAction={props.updateAction} 
                error={'props.error'} 
                updateError={() => console.log('props.updateError')}
                button={button}
                secureTextEntry={true}
                body={body}
                type={TYPE_TEXT}
            />
        </View>
    );
}


// /**
//  * Confirm the Old Password
//  * @param {*} props 
//  */
// export const OldPassword = (props) => {
//     const { heading, field, button } = props.copy;
//     // update this later
//     const validator = async (value) => { 
//         try {
//             const upperCaseRegex        = new RegExp('[A-Z]+');
//             const lowerCaseRegex        = new RegExp('[a-z]+');
//             const alphaNumericRegex     = new RegExp('[0-9]+');

//             if (value.length < 6 || value.length > 18) {
//                 return {
//                     status: false,
//                     message: 'Password length must be between 6 and 18 characters.'
//                 };
//             } else if (!upperCaseRegex.test(value)) {
//                 return {
//                     status: false,
//                     message: 'Password must contain at least one uppercase character.'
//                 };
//             } else if (!lowerCaseRegex.test(value)) {
//                 return {
//                     status: false,
//                     message: 'Password must contain at least one lowercase character.'
//                 };
//             } else if (!alphaNumericRegex.test(value)) {
//                 return {
//                     status: false,
//                     message: 'Password must contain at least one numeric character.'
//                 };
//             } else {
//                 return {
//                     status: true
//                 }
//             }
//         } catch(err) {
//             console.log(err);
//             return {
//                 status: false,
//                 message: 'There has been an error.'
//             };
//         }
//     }; 

//     return (
//         <View style={[styles.initStyle, styles.flexCenter]}>
//             <CommonInfoBox 
//                 title={heading}
//                 placeholder={field}
//                 action={props.forward} 
//                 validator={validator}
//                 updateAction={props.updateAction} 
//                 error={'props.error'} 
//                 updateError={() => console.log('props.updateError')}
//                 button={button}
//                 secureTextEntry={true}
//             />
//         </View>
//     );
// }

// export const NewPassword = (props) => {
//     const { heading, field, button } = props.copy;
//     // update this later
//     const validator = async (value) => { 
//         try {
//             const upperCaseRegex        = new RegExp('[A-Z]+');
//             const lowerCaseRegex        = new RegExp('[a-z]+');
//             const alphaNumericRegex     = new RegExp('[0-9]+');

//             if (value.length < 6 || value.length > 18) {
//                 return {
//                     status: false,
//                     message: 'Password length must be between 6 and 18 characters.'
//                 };
//             } else if (!upperCaseRegex.test(value)) {
//                 return {
//                     status: false,
//                     message: 'Password must contain at least one uppercase character.'
//                 };
//             } else if (!lowerCaseRegex.test(value)) {
//                 return {
//                     status: false,
//                     message: 'Password must contain at least one lowercase character.'
//                 };
//             } else if (!alphaNumericRegex.test(value)) {
//                 return {
//                     status: false,
//                     message: 'Password must contain at least one numeric character.'
//                 };
//             } else {
//                 return {
//                     status: true
//                 }
//             }
//         } catch(err) {
//             console.log(err);
//             return {
//                 status: false,
//                 message: 'There has been an error.'
//             };
//         }
//     };

//     return (
//         <View style={[styles.initStyle, styles.flexCenter]}>
//             <CommonInfoBox 
//                 title={heading}
//                 placeholder={field}
//                 action={props.forward} 
//                 validator={validator}
//                 updateAction={props.updateAction} 
//                 error={'props.error'} 
//                 updateError={() => console.log('props.updateError')}
//                 button={button}
//                 secureTextEntry={true}
//             />
//         </View>
//     );
// }

// export const NewPasswordConfirm = (props) => {
//     const { heading, field, button } = props.copy;
//     // update this later
//     const validator = async () => { 
//         try {
//             const status = props.passwordsMatch ? true : false;
//             if (__DEV__) {
//                 console.log('### STATUS', status);
//                 console.log('Email address:', props.emailAddress);
//                 console.log('New password:', props.newPassword);
//             }

//             if (status) {
//                 return { status: true };
//             } else {
//                 return { 
//                     status: false,
//                     message: 'New passwords do not match.' 
//                 };
//             }
//         } catch(err) {
//             return { 
//                 status: false,
//                 message: err.response.data.message 
//             };
//         }
//     };  
    
//     const changePassword = async () => {
//         try {
//             const resetTokenData = await Tranxactor.resetUserPasswordToken({
//                 emailAddress: props.emailAddress
//             });
    
//             if (__DEV__) console.log('resetTokenData:', resetTokenData.data);
    
//             const res = await Tranxactor.updateUserPassword(
//                 resetTokenData.data.resetTokenId,
//                 {
//                     emailAddress: props.emailAddress,
//                     password: props.newPassword
//                 }
//             );
    
//             if (__DEV__) console.log('updateUserPassword:', res.data);
    
//             if (res.status == 200) {
//                 props.forward();
//             } else {
//                 if (__DEV__) console.log('Status:', res);
//             }
//         } catch(err) {
//             if (__DEV__) console.log('!!! ERROR:', err);
//         }
//     }

//     return (
//         <View style={[styles.initStyle, styles.flexCenter]}>
//             <CommonInfoBox 
//                 title={heading}
//                 placeholder={field}
//                 action={changePassword} 
//                 validator={validator}
//                 updateAction={props.updateAction} 
//                 error={'props.error'} 
//                 updateError={() => console.log('props.updateError')}
//                 button={button}
//                 secureTextEntry={true}
//             />
//         </View>
//     );
// }

// export const RegisteredNewPassword = (props) => {
//     const { heading, body, button } = props.copy;
//     // update this later
//     const validator = () => { 
//         return { status: true };
//     };    

//     return (
//         <View style={[styles.initStyle, styles.flexCenter]}>
//             <CommonInfoBox 
//                 title={heading}
//                 action={props.action} 
//                 validator={validator}
//                 updateAction={props.updateAction} 
//                 error={'props.error'} 
//                 updateError={() => console.log('props.updateError')}
//                 button={button}
//                 secureTextEntry={true}
//                 body={body}
//                 type={TYPE_TEXT}
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
