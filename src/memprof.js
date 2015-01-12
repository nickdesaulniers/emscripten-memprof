function MemProf () {
   //Key value pairs where the keys are addresses, value is a pair of size and
  // stack trace.
  this.outstandingMallocs = {};
  this.uiConstructed = false;
  this.canvas = null;
};

MemProf.prototype = {};

MemProf.prototype.mallocProxy = function mallocProxy (address, size) {
  if (!this.uiConstructed) {
    this.constructUI();
    this.uiConstructed = true;
  }

  console.log('malloc', {
    address: address,
    size: size,
    // Maybe slice(5)
    stackTrace: window.printStackTrace(),
  });
  this.outstandingMallocs[address] = {
    size: size,
    stackTrace: window.printStackTrace(),
  };
};

MemProf.prototype.freeProxy = function freeProxy (address) {
  // Maybe slice(4)
  var stackTrace = window.printStackTrace();
  console.log('free', {
    address: address,
    stackTrace: stackTrace,
  });
  if (address in this.outstandingMallocs) {
    delete this.outstandingMallocs[address];
  } else {
    throw new Error('free for which there was not a malloc', address,
      stackTrace);
  }
};

MemProf.prototype.constructUI = function constructUI () {
  var canvas = document.createElement('canvas');
  document.addEventListener('DOMContentLoaded', function () {
    canvas.width = document.innerWidth * 0.8;
    canvas.height = document.innerHeight * 0.1;
    document.body.appendChild(canvas);
    console.log(document.innerWidth, document.innerHeight, document.body.innerWidth, document.body.innerHeight);
  });
  this.canvas = canvas;
};

