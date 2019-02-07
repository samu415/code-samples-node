function identify(account, file_path) {
  let output = '';
  let deferred = Q.defer();
  let options = [
    `./test.py`,
    process.env.HOST_ADDRESS, 
    this.getAccessKey(account), 
    this.getAccessSecret(account), 
    process.env.ACRCLOUD_RECOGNIZE_TYPE, 
    file_path
  ];

  // Spawn child process
  let py_sdk = spawn('python', options);

  // Listeners
  py_sdk.stderr.on('data', function (err) {
    logger.error(err);
  });

  py_sdk.stdout.on('data', function(data) {
    output += data;
  });

  py_sdk.on('exit', (code, msg) => {
    if(code == 0) {
      deferred.resolve(output);  
    }
    else {
      deferred.reject(msg);
    }
  })

  return deferred.promise;
}