const config = require('./config');
const API = require('./api/api');
const DataSourceManager = require('./data_source/ds_manager');

let api = new API(config.api);
let dataSourceManager = new DataSourceManager();

for(i = 0; i < config.aws_sqs_queues.length; i++) {
  dataSourceManager.addSource(
    dataSourceManager.SourceTypes.SQS,
    config.aws_sqs,
    { name: config.aws_sqs_queues[i] }
  );
}

console.log(dataSourceManager.listSources());