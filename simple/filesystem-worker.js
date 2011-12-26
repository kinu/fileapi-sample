function error(e) {
  postMessage("Got error:" + e.code);
}

function fileCallback(f) {
  postMessage("Obtained file:" + f.type);
}

function successCallback(e) {
  postMessage("Created entry:" + e.fullPath);
  e.file(fileCallback, error);
}

function getFileSystem(fs) {
  postMessage("Got file system: " + fs.name);
  flags = new Flags;
  flags.create = true;
  fs.root.getFile('tmp.txt', flags, successCallback, error);
  fs.root.getFile('tmp2.txt', flags, successCallback, error);
}

onmessage = function(event) {
  if (!this.requestFileSystem)
    postMessage("WORKER: FileSystem not supported.");
  else
    requestFileSystem(TEMPORARY, 100, getFileSystem, error);
};

onerror = function(e) {
  postMessage(e);
};
