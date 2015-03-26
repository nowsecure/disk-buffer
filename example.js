var DiskBuffer = require('.');
var write = require('stream-write');

var b = new DiskBuffer('/tmp/artifacts', {
  flushBytes: 1024
});

b.on('flush', console.log);

(function next(){
  write(b, Math.random().toString(16).slice(2), function(err){
    if (err) throw err;
    setTimeout(next, 10);
  });
})();
