
# disk-buffer

  Disk buffer as a writable stream, which after `n` bytes written and/or `m` writes finishes the file, emits an event and starts writing to a new one.

  [![build status](https://secure.travis-ci.org/nowsecure/disk-buffer.svg)](http://travis-ci.org/nowsecure/disk-buffer)

## Example

```js
var DiskBuffer = require('disk-buffer');

var b = new DiskBuffer('/tmp/artifacts', {
  flushBytes: 1024,
  flushWrites: 20
});

b.on('flush', function(flush){
  // do something with the file at
  // `flush.path`
});

someData().pipe(b);
```

## Installation

```bash
$ npm install disk-buffer
```

## API

### DiskBuffer(path, opts)

  Create a new `DiskBuffer`. The `path` given is used for the base of the filenames created, which append ".{pid}.{id}.{fid}".

  Options:

  - `.flushBytes`: flush after this many bytes written
  - `.flushWrites`: flush after this many writes

### `flush` event

  For every flush, an event with the following properties is emitted:

  - `path`: the file's location
  - `opened`: a date object of the file's creation

## Kudos

  This is inspired by [tj/go-disk-buffer](https://github.com/tj/go-disk-buffer).

## License

  MIT

