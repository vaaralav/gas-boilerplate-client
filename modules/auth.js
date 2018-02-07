'use strict';
const google = require('googleapis');
const script = google.script('v1');
const OAuth2Client = google.auth.OAuth2;

module.exports = exports = new OAuth2Client(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  ['http://localhost:3000/oauthcallback']
);
