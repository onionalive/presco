import React, { Component } from 'react';
import { Text, View, SafeAreaView, Platform, AsyncStorage, Alert } from 'react-native';
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
import { TYPE_QUESTIONNAIRE } from '../common/CommonInfoBox';
import Tranxactor from '../../common/Tranxactor';
import SInfo from 'react-native-sensitive-info';
import Permissions from 'react-native-permissions';
// TODO: Update the Firebase copy for SignUpSeven onwards

/**
 * Scan or manual add the card to the app
 * @param {*} props 
 */
export class CameraScan extends Component {
    state = {
        manual: false,
        cameraAuth: false
    };
    
    validator = () => { return { status: true }}; 

    isCameraEnabled = () => {
        return this.state.cameraAuth ?
            this.renderScanner() :
            this.renderError();
    }

    openSettings = () => {
        Alert.alert(
          'Enable Location Service from Settings?',
          '',
          [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed')},
            {text: 'OK', onPress: () => Permissions.openSettings()},
          ],
          { cancelable: false }
        )
    }

    enableCamera = async () => {
        await Permissions.request('camera', 'always').then(response => {
             console.log(response);
           if(response === 'authorized') {
               this.setState({ cameraAuth: true })
           } else if(Permissions.canOpenSettings() && Platform.OS === 'ios'){
                this.openSettings();
           }
        })
    }

    renderError = () => {
        const { heading, body, error, button } = this.props.copy.addCard2;
        return (
            <CommonInfoBox title={heading} 
                body={body}
                buttonText={button}
                action={this.enableCamera} 
                validator={this.validator}
                type={TYPE_CAMERA_DISABLED}
            />
        );
    }
    
    renderScanner = () => {
        const { heading, body, error, button } = this.props.copy.addCard1;
        return (
            <CommonInfoBox title={heading} 
                placeholder="Your name" 
                action={this.props.forward} 
                validator={this.validator}
                type={TYPE_CAMERA}
                key="CommonInfoBox"
                updateAction={this.props.updateAction}
            />
        );
    }

    dismiss = () => {
        this.props.action({
            title: 'Add card',
            subtitle: 'Card successfully added'
        });
    }
    
    renderManual = () => {
        const { heading, field, button } = this.props.copy.manualCard;
        return (
            <CommonInfoBox title={heading}
                placeholder={field}
                action={this.props.forward} 
                button={button}
                validator={this.validator}
                updateAction={this.props.updateAction}
            />
    )};

    updateView = (isScanner) => {
        this.setState({
            ...this.state,
            manual: isScanner ? false : true
        });
    }

    componentDidMount() {
        if (Platform.OS === 'ios') {
            Camera.checkVideoAuthorizationStatus()
                .then(res => this.setState({
                    ...this.state,
                    cameraAuth: res
                }))
                .catch(err => console.log(err));
        }
    }

    render() {
        return (
            <View style={[styles.initStyle, styles.flexCenter]}>
                {
                    this.state.manual ? 
                    this.renderManual() :
                    this.isCameraEnabled()
                }
                <Button 
                    key="button"
                    action={() => this.updateView(this.state.manual)}>
                    <Text style={{
                        ...Fonts.fUtility,
                        color: Colours.cWhite,
                        margin: 10
                    }}>{this.state.manual ?
                        'Scan card' :
                        'Enter manually'}</Text>
                </Button>
            </View>
        );
    }
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
export const EnterIdentPassword = (props) => {
    const { heading, body, error, button, field } = props.copy;

    const validator = async (value) => {
        if (value.length < 6) {
            props.updateFLAddCardType(0);
            return await validatorAccessCode(value);
        } else {
            props.updateFLAddCardType(0);
            return await validatorPassword(value);
        }
    }

    const validatorPassword = async (value) => { 
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

    const validatorAccessCode = async (value) => { 
        try {
            const alphaNumericRegex = new RegExp('[^0-9]+');

            console.log('alpa', alphaNumericRegex.test(value));

            if (value.length !== 4 || alphaNumericRegex.test(value)) {
                return {
                    status: false,
                    message: error
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
    
    // const addCard = async () => {
    //     try {
    //         if (__DEV__) console.log('### init createNewMember. Add card data:', props.data);

            

    //         const res = await Tranxactor.addCard(props.data);

    //         if (__DEV__) console.log('Tranxactor.addCard:', res.data);

    //         if (true) props.forward();
    //     } catch(err) {
    //         if (__DEV__) console.log('!!! ERROR: addCard:', err);
    //         console.log('FAILED m9');
    //     }
    // }

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                body={body}
                placeholder={field}
                action={props.forward}
                validator={validator}
                updateAction={props.updateAction}
                button={button}
                secureTextEntry={false}
                error={props.error}
                updateError={props.updateError}
            />
        </View>
    );
}

/**
 * Acceptor Password
 * @param {*} props 
 * Currently API is enforcing this: 
 * 1. password must have between 6 and 18 characters 
 * 2. must contain at least 1 lowercase
 * 3. 1 uppercase 
 * 4. 1 numeric character
 */
 
export const EnterAcceptorPassword = (props) => {
    const { heading, body, error, button, field } = props.copy;

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
    
    const addCard = async () => {
        try {
            if (__DEV__) console.log('### init createNewMember. Add card data:', props.data);
            const token = await SInfo.getItem('token', {});
            const userId = await AsyncStorage.getItem('userId');
            const res = await Tranxactor.addCard(token, props.data);
            if (__DEV__) console.log('Tranxactor.addCard:', res.data);
            if (res.status === 200) {
                props.updateSuccess(token, userId);
            }
        } catch(err) {
            if (__DEV__) {
                console.log('data', err.response.data);
                // console.log('ADD CARD FAILED');
            }

            props.updateNotificationBottom({
                title: 'Error',
                subtitle: err.response.data.errorMessage,
                buttons: [
                    { title: 'Dismiss', action: props.updateFailure },
                ],
                footer: '',
                view: 'ONE'
            });
        }
    }

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                body={body}
                placeholder={field}
                action={addCard}
                validator={validator}
                updateAction={props.updateAction}
                button={button}
                secureTextEntry={false}
                error={props.error}
                updateError={props.updateError}
            />
        </View>
    );
}



/**
 * Merge Cards from other accounts
 * @param {*} props 
 */
export const MergeCards = (props) => {
    const validator = () => { return { status: true }}; 
    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title="This card is already linked. Merge anyway?"
                body="You don't get the points but any further points accumulated with this card will be attributed to your account... But the original accounts needs to verify by email to check that this is legit" 
                action={props.action}
                button={'Yes'}
                validator={validator}
                type={TYPE_TEXT}
            />
        </View>
    );
}

/**
 * Add Card Success
 * @param {*} props 
 */
export const AddCardSuccess = (props) => {
    const { heading, body, button } = props.copy;
    const validator = () => { return { status: true }}; 
    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                body={body}
                action={props.action}
                button={button}
                validator={validator}
                type={TYPE_TEXT}
            />
        </View>
    );
}

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
