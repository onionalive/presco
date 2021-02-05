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
    TYPE_TWO_BUTTON,
    TYPE_GRID,
    TYPE_QUESTIONNAIRE
} from 'app/components/common/CommonInfoBox';
import PushNotification from 'react-native-push-notification';
import { isNumber } from 'util';
import Camera from 'react-native-camera';
import QRCodeScreen from 'app/components/common/QRCodeScreen';

// TODO: Update endpoint for where feedback goes to

/**
 * Confirm user wants to change password
 * @param {*} props 
 */
export const DeleteAccountScreenOne = (props) => {
    const { heading, buttonYes, buttonNo } = props.copy;
    // update this later
    const validator = () => { return { status: true }};    

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                // body="Updating your phone number will require it to be re-validated."
                validator={validator}
                updateAction={props.updateAction} 
                error={'props.error'} 
                updateError={() => console.log('props.updateError')}
                buttonTextLeft={buttonNo}
                buttonTextRight={buttonYes}
                actionRight={props.forward} 
                actionLeft={props.action}
                type={TYPE_TEXT}
                buttonType={TYPE_TWO_BUTTON}
            />
        </View>
    );
}

/**
 * Confirm user wants to change password
 * @param {*} props 
 */
export const DeleteAccountScreenTwo = (props) => {
    const { helper, options, button } = props.copy;
    // update this later
    const validator = () => { 
        return { status: true }
    };    

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                helper={helper}
                options={options}
                action={props.forward} 
                validator={validator}
                updateAction={props.updateAction} 
                error={'props.error'} 
                updateError={() => console.log('props.updateError')}
                button={button}
                type={TYPE_QUESTIONNAIRE}
            />
        </View>
    );
}

/**
 * Confirm user wants to change password
 * @param {*} props 
 */
export const DeleteAccountScreenThree = (props) => {
    const { heading, body, buttonNo, buttonYes } = props.copy;
    // update this later
    const validator = () => { return { status: true }};    

    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <CommonInfoBox 
                title={heading}
                body={body}
                actionLeft={props.actionLeft}
                actionRight={() => console.log('YES SELECTED')}
                buttonTextLeft={buttonNo}
                buttonTextRight={buttonYes}
                validator={validator}
                updateAction={props.updateAction} 
                error={'props.error'} 
                updateError={() => console.log('props.updateError')}
                secureTextEntry={true}
                type={TYPE_TEXT}
                buttonType={TYPE_TWO_BUTTON}
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
