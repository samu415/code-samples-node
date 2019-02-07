let config = {};

config.aws_sqs = {};
config.aws_sqs.accessKeyId = '123';
config.aws_sqs.secretAccessKey = '456';
config.aws_sqs.region = "us-west-1";
config.aws_sqs_queues = [
  'test-queue',
  'test-queue-high-prio'
];

config.api = {};
config.api.host = 'localhost';
config.api.port = 8000;

module.exports = config;