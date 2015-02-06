function MemProf () {
   //Key value pairs where the keys are addresses, value is a pair of size and
  // stack trace.
  this.outstandingMallocs = {};
  this.canvas = null;
  this.totalMemory = null;

  this.constructUI();
};

MemProf.prototype.mallocProxy = function (address, size) {
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
  // Instead, we should take a snapshot of memory here and at leats wait until
  // vsync or less to update UI
  this.updateUI();
};

MemProf.prototype.freeProxy = function (address) {
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

MemProf.prototype.constructUI = function () {
  var canvas = document.createElement('canvas');
  canvas.width = window.innerWidth * 0.8;
  canvas.height = window.innerHeight * 0.1;
  canvas.style.border = '1px solid black';
  canvas.style.display = 'block';
  canvas.style.margin = '10vh auto';
  document.body.appendChild(canvas);
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
};

MemProf.prototype.bytesToPixelsRoundDown = function (bytes) {
  return (bytes * this.canvas.width * this.canvas.height /
          TOTAL_MEMORY) | 0;
};

MemProf.prototype.bytesToPixelsRoundUp = function (bytes) {
  return ((bytes * this.canvas.width * this.canvas.height +
           TOTAL_MEMORY - 1) / TOTAL_MEMORY) | 0;
};

MemProf.prototype.fillLine = function (startBytes, endBytes) {
  var startPixels = this.bytesToPixelsRoundDown(startBytes);
  var endPixels = this.bytesToPixelsRoundUp(endBytes);
  //console.log(startPixels, endPixels, startBytes, endBytes);
  var x0 = (startPixels / this.canvas.height) | 0;
  var y0 = startPixels - x0 * this.canvas.height;
  var x1 = (endPixels / this.canvas.height) | 0;
  var y1 = endPixels - x1 * this.canvas.height;

  if (y0 > 0 && x0 < x1) {
    this.ctx.fillRect(x0, y0, 1, this.canvas.height - y0);
    y0 = 0;
    ++x0;
  }

  if (y1 < this.canvas.height && x0 < x1) {
    this.ctx.fillRect(x1, 0, 1, y1);
    y1 = this.canvas.height - 1;
    --x1;
  }

  this.ctx.fillRect(x0, 0, x1 + 1 - x0, this.canvas.height);
};

MemProf.prototype.updateUI = function () {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.fillStyle = 'black';
  this.fillLine(STATIC_BASE, STATICTOP);

  this.ctx.fillStyle = 'pink';
  this.fillLine(STACK_BASE, STACK_MAX);

  this.ctx.fillStyle = '#70FF70';
  this.fillLine(DYNAMIC_BASE, DYNAMICTOP);
};

var memProf = new MemProf;

