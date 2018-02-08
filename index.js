'use strict';
require('dotenv').config();
const auth = require('./modules/auth');
const callAppsScript = require('./modules/callAppsScript');

function isNonEmptyString(maybeString) {
  return typeof maybeString === 'string' && maybeString.length > 0;
}

const hasTokens =
  isNonEmptyString(process.env.ACCESS_TOKEN) &&
  isNonEmptyString(process.env.REFRESH_TOKEN);

if (hasTokens) {
  auth.setCredentials({
    token_type: 'Bearer',
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN
  });
  callAppsScript(auth, function(resp) {
    console.log(resp.data);
  });
} else {
  console.log(`
Google OAuth2 tokens are not defined.
Please get authorization tokens by running \`yarn auth\`.
  `);
  process.exit(1);
}
