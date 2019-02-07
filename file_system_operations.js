function listSplitFiles(video_id, success, failure) {
  let path = terminal_helper.joinPath(`${process.env.FILES_DIR}id_${video_id}`);
  terminal_helper.listFiles(
    path,
    lst_file_names => {
      let list = lst_file_names.filter(e => {
        return e !== `${video_id}.mp4` && e !== "";
      });
      success(list);
    },
    err => {
      failure(err);
    }
  );
}

// terminal_helper.js

function listFiles(path, success, failure) {
  var command = `cd ${path} && ls`;
  this.run(command, (err, data) => {
    if (err) {
      failure(err);
      return;
    }
    var list = data.split("\n");
    success(list);
  });
}