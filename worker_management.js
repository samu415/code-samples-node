function startWorker(receiptHandle, videoID) {

  let workerObj = fork(
    program,
    [videoID, receiptHandle],
    []
  );

  let worker = {
    video_id: videoID,
    worker_pid: workerObj.pid,
    receipt_handle: receiptHandle,
    started_at: new Date(),
    worker_timeout: null,
    status: null
  }

  workers.push(worker);

  // Catch any output of child process
  workerObj.on('msg', (msg) => {

    // Get workers index first
    workerIndex = workers.findIndex(
      w => w.worker_pid === workerObj.pid
    );

    if (msg) {
      if (parseInt(process.env.SILENT_WORKERS) === 0 && !msg.includes('[STATUS]')) {
        // Worker output is active
        console.log(msg);
      }
      else if (msg.includes('[STATUS]')) {
        // Workers are silent, except status updated
        workers[workerIndex].status = msg.split("[STATUS]")[1];
      }
      else if (msg.includes('[ERROR]')) {
        // ... and errors
        console.log(msg);
      }
    }

    // Set timeout after first output has received to avoid null pointer exceptions
    if (workers[workerIndex].worker_timeout == null) {
      workers[workerIndex].worker_timeout = setTimeout(function () {
        killWorkerAfterTimeOut(workers[workerIndex].worker_pid)
      }, process.env.WORKER_TIMEOUT_DURATION);
    }
    else {
      // Reset timeout after master has received any output
      resetTimeOut(workers[workerIndex].worker_pid);
    }
  });

  // Catch any exit signals
  workerObj.on('exit', (code, msg) => {

    let workerIndex = workers.findIndex(
      w => w.worker_pid === workerObj.pid
    );

    if (code == 0) {
      // Success
      if (workerIndex != -1 && workers[workerIndex] != undefined) {
        finishWorkerProcess(workerIndex);
      }
      else {
        logger.error(
          `Worker ${workerObj.pid} is done but was not found in workers list.`
        );
        finishWorkerProcess(workerIndex);
        cleanUp();
      }
    }
    else if (!code && msg === 'SIGTERM') {
      // Master has killed process after time out
      logger.log(
        `Worker ${workerObj.pid} has stopped after time out. (${code}, ${msg})`
      );
      finishWorkerProcess(workerIndex);
      cleanUp();
    }
    else {
      // Any other failed runs
      logger.error(
        `Worker ${workerObj.pid} has stopped. (${code}, ${msg})`
      );
      finishWorkerProcess(workerIndex);
      cleanUp();
    }
  });
}