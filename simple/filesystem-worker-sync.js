onmessage = function(event) {
  postMessage("Requesting fileSystem....");
  var fs = webkitRequestFileSystemSync(TEMPORARY, 100);
  postMessage("Got file system: " + fs.name);

  postMessage("root: " + fs.root.fullPath);
  var entry = fs.root.getFile('tmp.txt', {create:true});
  postMessage("entry: " + entry.fullPath);
  postMessage("entry: " + entry.isFile);

  var meta = entry.getMetadata();
  postMessage("entry's mod date: " + meta.modificationTime);

  var entry2 = fs.root.getFile('tmp12345.txt', {create:true});
  postMessage("entry2: " + entry2.fullPath);
  var entry3 = fs.root.getDirectory('foo', {create:true});
  postMessage("entry3: " + entry3.fullPath);
  postMessage("entry3: " + entry3.isDirectory);

  var reader = fs.root.createReader();
  var entries = reader.readEntries();
  postMessage("entries.length: " + entries.length);
  for (var i = 0; i < entries.length; ++i)
    postMessage("entries[" + i + "]:" + entries[i].fullPath);

  postMessage("Modifying entries...");

  entry.remove();
  entry2.moveTo(entry3, 'movedUnderfoo');

  var entry4 = fs.root.getDirectory('entry4', {create:true});
  var entry5 = entry4.copyTo(fs.root, 'newEntry');

  postMessage("---- (removed entry, moved entry2, copied entry3) -----");
  reader = fs.root.createReader();
  entries = reader.readEntries();
  postMessage("entries.length: " + entries.length);
  for (var i = 0; i < entries.length; ++i)
    postMessage("entries[" + i + "]:" + entries[i].fullPath);
  postMessage("----");

  postMessage("*** FINISHED *** (followed with failure cases)");

  postMessage("This should fail...");
  try {
    fs.root.getFile('a\\b', {create:true});
  } catch (e) {
    postMessage('Got exception (expected):' + e.code);
  }
};

onerror = function(e) {
    postMessage(e);
};
