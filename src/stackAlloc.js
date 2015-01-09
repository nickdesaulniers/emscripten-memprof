var bytes = require('bytes');

var stack_memory_area_size = 0;
var stack_base = 0x0;
var stack_top = 0x0;
var stack_max = 0x0;
var stack_watermark = 0;

var stackTrace = function () {
  return window.printStackTrace().slice(6);
};

// Doesn't really work :(
function linkSource (trace) {
  var re = /@(.*):(\d+):/;
  var matches = trace.match(re);
  return 'view-source:' + matches[1] + '#line' + matches[2];
};

module.exports = function buildStackAllocProxy (previousStackAlloc) {
  return function stackAllocProxy (size) {
    var trace = stackTrace()[0];
    console.log(bytes(size).toUpperCase() + ' Stack allocation: ' + trace);
    //console.log(linkSource(trace));
    return previousStackAlloc(size);
  };
};

