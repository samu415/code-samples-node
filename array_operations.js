function compareResults(r1, r2) {
  // First try to group by ISRC
  if(r1.isrc !== undefined && r2.isrc !== undefined) { 
    let sameISRC = (r1.isrc === r2.isrc);
    return sameISRC;
  }
  // If not existing, group by title + artist
  else {
    let sameTitle = (r1.title.toUpperCase() === r2.title.toUpperCase());
    let sameArtist = false;
    r1.artist.forEach((artist_r1) => {
      r2.artist.forEach((artist_r2) => {
        if (artist_r1.name.toUpperCase() === artist_r2.name.toUpperCase()) {
          sameArtist = true;
        }
      });
    });
    return sameArtist && sameTitle;
  }
}

function groupTimestamp(video) {
  for (let i = 0; i < video.found.length - 1; i++) {
    let current = video.found[i];
    let next = video.found[i + 1];
    if (this.compareResults(current, next)) {
      let timestamp = `${current.timestamp} , ${next.timestamp}`;
      next.timestamp = timestamp;
      delete video.found[i];
    }
  }
}

function sortVideos(videos) {
  videos.sort(function (v1, v2) {
    if (v1.finished_at < v2.finished_at) {
      return 1;
    }
    if (v1.finished_at > v2.finished_at) {
      return -1;
    }
    return 0
  });
}