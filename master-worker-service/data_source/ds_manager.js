const SourceTypeSQS = require('./types/sqs');

const SourceTypes = {
  SQS: SourceTypeSQS
}

exports = module.exports = class {

  constructor() {
    this.dataSources = [];
    this.SourceTypes = SourceTypes;
  }

  addSource(sourceType, sourceConfig, otherConfig) {
    let sourceTypeObj = new sourceType(
      sourceConfig,
      otherConfig
    );
    this.dataSources.push(sourceTypeObj);
  }
  
  listSources() {
    return this.dataSources;
  }
}