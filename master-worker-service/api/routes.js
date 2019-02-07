const addJobHandler = require('./handlers/addJobHandler');
const getJobHandler = require('./handlers/getJobHandler');
const delJobHandler = require('./handlers/delJobHandler');

let routes = [
  {
    method: 'POST', 
    path: '/jobs', 
    handler: addJobHandler
  },
  {
    method: 'GET', 
    path: '/jobs/{id}', 
    handler: getJobHandler
  },
  {
    method: 'DELETE', 
    path: '/jobs/{id}', 
    handler: delJobHandler
  }
];

module.exports = routes;