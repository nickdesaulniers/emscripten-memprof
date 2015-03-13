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
  this.updateUI();
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
  this.ctx.save();
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  this.ctx.fillStyle = 'black';
  this.fillLine(STATIC_BASE, STATICTOP);

  this.ctx.fillStyle = 'pink';
  this.fillLine(STACK_BASE, STACK_MAX);

  this.ctx.fillStyle = '#70FF70';
  this.fillLine(DYNAMIC_BASE, DYNAMICTOP);

  Object.keys(this.outstandingMallocs).sort().forEach(function (addr, i) {
    addr = parseInt(addr, 10);
    if (i % 3 === 0) {
      this.ctx.fillStyle = 'red';
    } else if (i % 3 === 1) {
      this.ctx.fillStyle = 'blue';
    } else {
      this.ctx.fillStyle = 'yellow';
    }
    this.fillLine(addr, addr + this.outstandingMallocs[addr].size);
  }.bind(this));

  this.ctx.restore();
};

MemProf.prototype.stackTraceHierarchy = function () {
  var hier = {};
  var re = /(.+)@.+:(\d+):.+/;

  function group (par, list) {
    var key = list.pop();
    // fix up key!
    var m = key.match(re);
    // demangle is injected into global scope by emscripten
    if (m && m.length === 3) key = demangle(m[1]) + '#' + m[2];
    if (!(key in par)) {
      par[key] = {};
    }
    if (!key.startsWith('_malloc') && list.length) group(par[key], list);
  };

  Object.keys(this.outstandingMallocs).forEach(function (addr) {
    group(hier, this.outstandingMallocs[addr].stackTrace);
  }.bind(this));

  return hier;
};

MemProf.prototype.numOutstandingMallocs = function () {
  return Object.keys(this.outstandingMallocs).length;
};

var memProf = new MemProf;

