import { Platform } from 'react-native';
import config from 'craveable-brands-loyalty-app/app.config';

/**
 * Base settings
 */
const weight = {
    ExtraBold: '800',
    Bold: '700',
    SemiBold: '600',
    Light: '300',
    Normal: '400'
}

const styles = {
    Normal: 'normal',
    Italic: 'italic'
}

/**
 * Oporto Fonts
 */
const fBrawls                       = 'Brawls Typeface Rough';
const fBrawlsRough                  = 'BrawlsTypeface';
const fNewcastle                    = 'Newcastle';
const fNewcastleRusty               = 'Newcastle-Basic-Rusty';
const fCynthoSlabPro                = 'Cyntho Slab Pro';
const fCynthoSlabProRegular         = 'CynthoSlabPro-Regular';
const fCynthoSlabProBold            = 'CynthoSlabPro-Bold';
const fCynthoSlabProExtraLight      = 'CynthoSlabPro-Medium';

/**
 * Currently iOS only
 */
const oporto = {
    ios: {
        fPrimary: {
            fontFamily: fNewcastle,
            fontSize: 30,
            fontWeight: weight.Normal
        },
        fHeadingLarge: {
            fontFamily: fBrawls,
            fontSize: 36,
            fontWeight: weight.Normal
        },
        fHeadingMedium: {
            fontFamily: fBrawls,
            fontSize: 20,
            fontWeight: weight.Normal
        },
        fHeadingSmall: {
            fontFamily: fBrawls,
            fontSize: 16,
            fontWeight: weight.Normal
        },
        fBodyText: {
            fontFamily: fCynthoSlabPro,
            fontSize: 16,
            fontWeight: weight.Normal
        },
        fButtonText: {
            fontFamily: fBrawls,
            fontSize: 12,
            fontWeight: weight.Normal
        },
        fInputFieldText: {
            fontFamily: fCynthoSlabPro,
            fontSize: 16,
            fontWeight: weight.Normal
        },
        fUtility: {
            fontFamily: fCynthoSlabPro,
            fontSize: 12,
            fontWeight: weight.Normal
        },
        fUtilityBold: {
            fontFamily: fCynthoSlabProBold,
            fontSize: 12,
            fontWeight: weight.Bold
        }
    },
    android: {
        fPrimary: {
            fontFamily: fNewcastleRusty,
            fontSize: 30
        },
        fHeadingLarge: {
            fontFamily: fBrawlsRough,
            fontSize: 36
        },
        fHeadingMedium: {
            fontFamily: fBrawlsRough,
            fontSize: 20
        },
        fHeadingSmall: {
            fontFamily: fBrawlsRough,
            fontSize: 16
        },
        fBodyText: {
            fontFamily: fCynthoSlabProRegular,
            fontSize: 16
        },
        fButtonText: {
            fontFamily: fBrawlsRough,
            fontSize: 12
        },
        fInputFieldText: {
            fontFamily: fCynthoSlabProRegular,
            fontSize: 16
        },
        fUtility: {
            fontFamily: fCynthoSlabProRegular,
            fontSize: 12
        },
        fUtilityBold: {
            fontFamily: fCynthoSlabProBold,
            fontSize: 12
        }
    }
}

/**
 * Red Rooster Fonts
 */

// const redrooster = {
// 	fPrimary: cRedRoosterRed
// }

let theme;
switch(config.theme) {
    case 'oporto':
        if (Platform.OS === 'ios') {
            theme = oporto.ios;
        } else {
            theme = oporto.android;
        }
		break;
	case 'redrooster':
		theme = redrooster;
		break;
	default:
		throw new Error('Failed to get the theme. Please ensure you run the correct npm script for the theme.');
}

// // iOS
// {
//     fontFamily: 'OpenSans',
//     fontWeight: '600',
//     fontStyle: 'italic'
//   }

//   // Android
//   {
//     fontFamily: 'OpenSans-SemiBoldItalic'
//   }

export default Fonts = theme;
