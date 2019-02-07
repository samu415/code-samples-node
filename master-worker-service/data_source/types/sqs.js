const AWS_SDK = require('aws-sdk');

exports = module.exports = class {

  constructor(config, otherConfig) {
    AWS_SDK.config.accessKeyId = config.accessKeyId;
    AWS_SDK.config.secretAccessKey = config.secretAccessKey;
    AWS_SDK.config.region = config.region;
    this.type = 'SQS';
    this.queueName = otherConfig.name;
    this.sqsObj = new AWS_SDK.SQS();
    this.initialize();
  }

  initialize() {
    this.sqsObj.getQueueUrl({ QueueName: this.queueName }, (err, res) => {
      if (err) {
        console.error(err);
      }
      else if (res.QueueUrl) {
        this.queueUrl = res.QueueUrl;
        console.log(`Connected to ${this.queueName}`);
        this.receiveMessages();
      }
    });
  }

  receiveMessages() {
    this.sqsObj.receiveMessage(
      {
        QueueUrl: this.queueUrl
      },
      (err, data) => {
        if (err) {
          console.error(err);
        }
        else {
          if (data.Messages) {
            console.log(
              `[${this.queueName}] Received message ${data.Messages}`
            );
          }
          this.receiveMessages();
        }
      }
    );
  }
}