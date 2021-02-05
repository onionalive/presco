/**
 * Convert to app.config.js
 */

const OPORTO            = 'oporto';
const RED_ROOSTER       = 'redrooster';

const THEME             = OPORTO;

const OP_CODE           = 'OP_API';
const RR_CODE           = 'RR_API'

const RR_USER           = '6035650030006519250';
const RR_PASS           = '111111';

const TRANXACTOR_URL    = 'https://tr4ns2.tr4ns.com/TransactorAPI-SpringBootQSRH/api/2';
const STORES_URL        = 'https://www.oporto.com.au/api/stores/0/';

const GOOGLE_API_KEY     = 'XXX';
const GOOGLE_API_GEOCODE = 'https://maps.googleapis.com/maps/api/geocode/json';


export default config = {
    theme: OPORTO,
    username: RR_USER,
    password: RR_PASS,
    tranxactor: {
        api: TRANXACTOR_URL,
        headers: {
            'Content-Type': 'application/json',
            'x-api-version': '2.0',
            'moduleCode': THEME === OPORTO ? OP_CODE : RR_CODE
        },
		  memberId: 'enter_memberID',
		  token: 'enter_member_token'
    },
    firebaseConfig: {
        apiKey: '',
        authDomain: '',
        databaseURL: ''
    },
    stores: {
        api: STORES_URL
    },
    imgix: {
        host: 'my-domain.imgix.net',
        secureURLToken: 'ABC123'
    },
    marketingCloud: {
        appId: '',
        accessToken: '',
        gcmSenderId: ''
    },
    bluedot: {
        apiKey: '',
        username: '',
        packageName: ''
    },
    google: {
        apiKey: GOOGLE_API_KEY,
        api: {
            geocode: GOOGLE_API_GEOCODE
        }
    },
}
