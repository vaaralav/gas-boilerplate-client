'use strict';
const google = require('googleapis');
const script = google.script('v1');

module.exports = exports = function callAppsScript(auth, cb = () => {}) {
  var script = google.script('v1');

  // Make the API request. The request object is included here as 'resource'.
  script.scripts.run(
    {
      auth: auth,
      resource: {
        function: 'foo',
      },
      scriptId: process.env.SCRIPT_ID,
    },
    function(err, resp) {
      if (err) {
        // The API encountered a problem before the script started executing.
        console.log('The API returned an error: ' + err);
        return;
      }
      if (resp.error) {
        // The API executed, but the script returned an error.

        // Extract the first (and only) set of error details. The values of this
        // object are the script's 'errorMessage' and 'errorType', and an array
        // of stack trace elements.
        var error = resp.error.details[0];
        console.log('Script error message: ' + error.errorMessage);
        console.log('Script error stacktrace:');

        if (error.scriptStackTraceElements) {
          // There may not be a stacktrace if the script didn't start executing.
          for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
            var trace = error.scriptStackTraceElements[i];
            console.log('\t%s: %s', trace.function, trace.lineNumber);
          }
        }
      } else {
        return cb(resp);
      }
    }
  );
};
