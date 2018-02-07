'use strict';
require('dotenv').config();
const auth = require('./modules/auth');
const callAppsScript = require('./modules/callAppsScript');

const hasTokens =
  typeof process.env.ACCESS_TOKEN !== 'undefined' &&
  typeof process.env.REFRESH_TOKEN !== 'undefined';

if (hasTokens) {
  auth.setCredentials({
    token_type: 'Bearer',
    access_token: process.env.ACCESS_TOKEN,
    refresh_token: process.env.REFRESH_TOKEN,
  });
  callAppsScript(auth, function(resp) {
    console.log(resp.data);
  });
} else {
  console.log(`
Please get authorization tokens by running \`yarn auth\`
  `);
  process.exit(1);
}
