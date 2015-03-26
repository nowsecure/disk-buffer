var test = require('tape');
var DiskBuffer = require('.');
var write = require('stream-write');

test('flushBytes', function(t){
  var b = new DiskBuffer('/tmp/artifacts', {
    flushBytes: 10
  });

  b.on('flush', function(flush){
    t.ok(flush.path);
    t.end();
  });

  b.write('foo');
  b.write('bar');
  b.write('baz');
  b.write('beep');
});

test('flushWrites', function(t){
  var b = new DiskBuffer('/tmp/artifacts', {
    flushWrites: 3
  });

  b.on('flush', function(flush){
    t.ok(flush.path);
    t.end();
  });

  b.write('foo');
  b.write('bar');
  b.write('baz');
  b.write('beep');
});

test('fs error', function(t){
  var b = new DiskBuffer('/does/not/exist');
  b.on('error', function(err){
    t.ok(err);
    t.end();
  });
});

