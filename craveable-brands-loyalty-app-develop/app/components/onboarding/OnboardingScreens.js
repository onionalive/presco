import React, { Component } from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import Button from 'app/components/common/Button';
import CardStackContainer from 'app/components/cardstackcontainer/CardStackContainer';
import CardStackChild from 'app/components/common/CardStackChild';
import CardStackActions from 'app/components/common/CardStackActions';
import Colours from 'app/styles/Colours';
import Fonts from 'app/styles/Fonts';
import InputField from 'app/components/common/InputField';

export const OnboardingBenefits = (props) => {
    const renderBenefitsStack = (data) => {
        return data.map((d, i) => {
            return (
                <CardStackChild
                    image={d.image}
                    title={d.heading}
                    subTitle={d.body}
                    index={i+1}
                    key={i}
                />
            );
        })
    }

	return (
        <SafeAreaView style={[styles.initStyle, styles.flexCenter]}>
            <View style={{ position: 'relative', flex: 1}}>
                <CardStackContainer
                    onTossLeft={card => console.log(card, 'tossed left')}
                    onTossRight={card => console.log(card, 'tossed right')}
                    actionsBar={toss => <CardStackActions toss={toss} />}
                >
                    {renderBenefitsStack(props.benefitsStack)}
                </CardStackContainer>
            </View>
            <View style={{height: 40}}>
                <Button action={props.action}>
                    <Text>OnboardingName - Return</Text>
                </Button>
            </View>
            <View style={{height: 40}}>
                <Button action={props.forward}
                    style={buttonStyles.button}
                    underlayColor={Colours.cPrimaryUnderlay}>
                    <Text style={buttonStyles.text}>{props.button}</Text>
                </Button>
            </View>
        </SafeAreaView>
	);
}

export const OnboardingName = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Text style={styles.title}>Set up your account</Text>
        <Text style={styles.subtitle}>We will start with your name</Text>
        <InputField
            alt
            placeholder='Enter Name' />
        <Button action={props.action}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text>OnboardingName - Return</Text>
        </Button>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingEmail = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Text style={styles.title}>Set up your account</Text>
        <Text style={styles.subtitle}>What is your email address</Text>
        <InputField
            alt
            placeholder='Enter Email' />
        <Button action={props.action}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text>OnboardingEmail - Return</Text>
        </Button>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingSetup = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Text style={styles.title}>Set up your account</Text>
        <Text style={styles.subtitle}>Set a password</Text>
        <InputField
            alt
            placeholder='Enter Password' />
        <InputField 
            alt
            placeholder='Confirm Password' />
        <Button action={props.action}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text>OnboardingSetup - Return</Text>
        </Button>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingMobile = (props) => {
    console.log(props);
    return (
        <View style={[styles.initStyle, styles.flexCenter]}>
            <Text style={styles.title}>Set up your account</Text>
            <Text style={styles.subtitle}>{`Hello , can we get your mobile number`}</Text>
            <InputField
                alt
                placeholder='Enter Password' />
            <Text style={styles.utility}>You will use these details to login so ensure you use details where we can reach you</Text>
            <Button action={props.forward}
                style={buttonStyles.button}
                underlayColor={Colours.cPrimaryUnderlay}>
                <Text style={buttonStyles.text}>Next</Text>
            </Button>
            <Button action={props.action}
                style={buttonStyles.button}
                underlayColor={Colours.cPrimaryUnderlay}>
                <Text>OnboardingMobile - Return</Text>
            </Button>
            <Button action={props.backward}>
                <Text>Backward</Text>
            </Button>
        </View>
    );
}

export const OnboardingVerification = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>Onboarding code verification - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingVerificationCompleted = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>Thanks for verifying - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingDoYouHaveFlameRewards = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>Do you have flame rewards - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingAddYourCard = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>OnboardingAddYourCard - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingScanBarcode = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>OnboardingScanBarcode - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingSetStoreMain = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>OnboardingSetStoreMain - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingSetStoreExplore = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.forward}
            style={buttonStyles.button}
            underlayColor={Colours.cPrimaryUnderlay}>
            <Text style={buttonStyles.text}>Next</Text>
        </Button>
        <Button action={props.action}>
            <Text>OnboardingSetStoreExplore - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

export const OnboardingSetStoreBySuburb = (props) => (
    <View style={[styles.initStyle, styles.flexCenter]}>
        <Button action={props.action}>
            <Text>OnboardingSetStoreBySuburb - Return</Text>
        </Button>
        <Button action={props.backward}>
            <Text>Backward</Text>
        </Button>
    </View>
);

const styles = {
	textStyle: {
		fontSize: 20
	},
	initStyle: {
        flex: 1,
        backgroundColor: Colours.cOffBlack
	},
	flexCenter: {
		justifyContent: 'center',
		alignItems: 'center'
	},
	swiperStyle: {
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