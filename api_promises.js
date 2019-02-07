// Calling API by using promises
const api = require('../api');

function reportToAPI(videoId, status) {
  return new Promise(function (completed, failed) {
    api.reportBack(videoId, status)
      .then(function (res) {
        if (res === '"Succeed"') {
          logger.log(`Video *${videoId}* was reported back to API xyz. (Status: ${status}).`);
          completed();
        }
        else if (res) {
          logger.error(res);
        }
        failed();
        return;
      })
      .catch(function (err) {
        logger.error(err);
        failed();
      });
  })
}

// api.js

const URL = process.env.API_BASE_URL;

module.exports = {

  reportBack: function(videoId, status) {
    var options = {
      method: 'POST',
      url: URL + process.env.API_REPORT_ROUTE,
      headers: {
        'Authorization': process.env.API_AUTH_TYPE + ' ' + auth_token
      },
      formData: {
        videoId: videoId,
        status: status
      }
    };
    return request(options);
  }
}