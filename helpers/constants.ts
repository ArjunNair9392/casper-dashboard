import 'dotenv/config';

const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';
const scope = encodeURIComponent('https://www.googleapis.com/auth/drive.readonly');
const state = encodeURIComponent('https://casper-dashboard.vercel.app');
const redirectUri = encodeURIComponent('https://casper-dashboard.vercel.app/usable/folders');

const responseType = 'code';
const clientId = process.env.GOOGLE_CLIENT_ID || '771148068297-ke9e4o4c7gjhduggsi2cu1tgtmgelav2.apps.googleusercontent.com';

export const googleAuthURL = `${oauth2Endpoint}?scope=${scope}&access_type=offline&include_granted_scopes=true&response_type=${responseType}&state=${state}&redirect_uri=${redirectUri}&client_id=${clientId}`;

export const stateAbbreviations = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA",
    "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
    "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];