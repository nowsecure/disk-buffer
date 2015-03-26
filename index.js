var Writable = require('stream').Writable;
var inherits = require('util').inherits;
var fs = require('fs');
var write = require('stream-write');

module.exports = DiskBuffer;
inherits(DiskBuffer, Writable);

var ids = 0;

function DiskBuffer(path, opts){
  Writable.call(this);
  opts = opts || {};

  this._path = path;
  this._id = ids++;
  this._fileId = 0;

  this._bytes = null;
  this._writes = null;

  this._flushBytes = opts.flushBytes || 0;
  this._flushWrites = opts.flushWrites || 0;

  this._ws = null;
  this._filePath = null;

  this._reset();
  this._open();
}

DiskBuffer.prototype._reset = function(){
  this._bytes = 0;
  this._writes = 0;
};

DiskBuffer.prototype._open = function(){
  this._filePath = this._pathname();
  this._ws = fs.createWriteStream(this._filePath);
};

DiskBuffer.prototype._write = function(chunk, enc, done){
  var self = this;
  write(this._ws, chunk, function(err){
    self._bytes += Buffer.byteLength(chunk);
    self._writes++;
    self._maybeFlush();
    done(err);
  });
};

DiskBuffer.prototype._flush = function(){
  this._reset();
  this.emit('flush', { path: this._filePath });
  this._open();
};

DiskBuffer.prototype._maybeFlush = function(){
  if (this._flushBytes && this._bytes >= this._flushBytes) {
    this._flush();
  }
  if (this._flushWrites && this._writes >= this._flushWrites) {
    this._flush();
  }
};

DiskBuffer.prototype._pathname = function(){
  return [this._path, process.pid, this._id, this._fileId++].join('.');
};

