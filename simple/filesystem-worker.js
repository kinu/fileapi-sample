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
  fs.root.getFile('tmp.txt', {create:true}, successCallback, error);
  fs.root.getFile('tmp2.txt', {create:true}, successCallback, error);
}

onmessage = function(event) {
  if (!this.webkitRequestFileSystem)
    postMessage("WORKER: FileSystem not supported.");
  else
    webkitRequestFileSystem(TEMPORARY, 100, getFileSystem, error);
};

onerror = function(e) {
  postMessage(e);
};
