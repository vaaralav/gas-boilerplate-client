'use strict';
require('dotenv').config();
const auth = require('./modules/auth');
const opn = require('opn');
const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));

const scopes = ['https://www.googleapis.com/auth/script.external_request'];

app.get('/oauthcallback', function(req, res) {
  const { code } = req.query;
  console.log('this is sparta');
  return auth.getToken(code, function(err, tokens) {
    if (err) {
      return res.status(500).send(err.toString());
    }
    console.log(tokens);
    auth.setCredentials(tokens);
    res.status(200).send(`
      <h1>Credentials retrieved successfully</h1>
      <h2>Add following lines to your .env</2>
      <pre>
ACCESS_TOKEN="${tokens.access_token}"
REFRESH_TOKEN="${tokens.refresh_token}"
      </pre>
    `);
    process.exit();
  });
});

app.listen(3000, function() {
  console.log('Listening on 3000...');

  const url = auth.generateAuthUrl({ scope: scopes, access_type: 'offline' });

  console.log(`
To authorize this client please open the following URL in your browser and follow instructions:
${url}
  `);

  // Open the URL in the default browser
  opn(url);
});
