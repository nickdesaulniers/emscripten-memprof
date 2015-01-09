(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/Nicholas/mozilla/emscripten-memprof/src/free.js":[function(require,module,exports){
var stackTrace = window.printStackTrace;

module.exports = function buildFreeProxy (previousFree) {
  return function freeProxy (ptr) {
    console.log('free at: ', stackTrace());
    if (ptr) return previousFree(ptr);
  };
};


},{}],"/Users/Nicholas/mozilla/emscripten-memprof/src/hooks.js":[function(require,module,exports){
window.memoryprofiler_add_hooks = function () {
  window.Module['_malloc'] = window._malloc =
    require('./malloc.js')(window._malloc);
  window.Module['_free'] = window._free = require('./free.js')(window._free);
  window.Runtime.stackAlloc =
    require('./stackAlloc.js')(window.Runtime.stackAlloc)
};

},{"./free.js":"/Users/Nicholas/mozilla/emscripten-memprof/src/free.js","./malloc.js":"/Users/Nicholas/mozilla/emscripten-memprof/src/malloc.js","./stackAlloc.js":"/Users/Nicholas/mozilla/emscripten-memprof/src/stackAlloc.js"}],"/Users/Nicholas/mozilla/emscripten-memprof/src/malloc.js":[function(require,module,exports){
var bytes = require('bytes');

var stackTrace = function () {
  // TODO: differentiate between runtime malloc and source malloc
  return window.printStackTrace().slice(5);
};

module.exports = function buildMallocProxy (previousMalloc) {
  return function mallocProxy (size) {
    console.log(bytes(size).toUpperCase() + ' malloc: ' + stackTrace()[0]);
    var ptr = previousMalloc(size);
    if (!ptr) return 0;
    return ptr;
  };
};


},{"bytes":"/Users/Nicholas/mozilla/emscripten-memprof/src/node_modules/bytes/index.js"}],"/Users/Nicholas/mozilla/emscripten-memprof/src/node_modules/bytes/index.js":[function(require,module,exports){

/**
 * Parse byte `size` string.
 *
 * @param {String} size
 * @return {Number}
 * @api public
 */

module.exports = function(size) {
  if ('number' == typeof size) return convert(size);
  var parts = size.match(/^(\d+(?:\.\d+)?) *(kb|mb|gb|tb)$/)
    , n = parseFloat(parts[1])
    , type = parts[2];

  var map = {
      kb: 1 << 10
    , mb: 1 << 20
    , gb: 1 << 30
    , tb: ((1 << 30) * 1024)
  };

  return map[type] * n;
};

/**
 * convert bytes into string.
 *
 * @param {Number} b - bytes to convert
 * @return {String}
 * @api public
 */

function convert (b) {
  var tb = ((1 << 30) * 1024), gb = 1 << 30, mb = 1 << 20, kb = 1 << 10, abs = Math.abs(b);
  if (abs >= tb) return (Math.round(b / tb * 100) / 100) + 'tb';
  if (abs >= gb) return (Math.round(b / gb * 100) / 100) + 'gb';
  if (abs >= mb) return (Math.round(b / mb * 100) / 100) + 'mb';
  if (abs >= kb) return (Math.round(b / kb * 100) / 100) + 'kb';
  return b + 'b';
}

},{}],"/Users/Nicholas/mozilla/emscripten-memprof/src/stackAlloc.js":[function(require,module,exports){
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


},{"bytes":"/Users/Nicholas/mozilla/emscripten-memprof/src/node_modules/bytes/index.js"}]},{},["/Users/Nicholas/mozilla/emscripten-memprof/src/malloc.js","/Users/Nicholas/mozilla/emscripten-memprof/src/free.js","/Users/Nicholas/mozilla/emscripten-memprof/src/stackAlloc.js","/Users/Nicholas/mozilla/emscripten-memprof/src/hooks.js","/Users/Nicholas/mozilla/emscripten-memprof/src/node_modules/bytes/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy5udm0vdjAuMTAuMjYvbGliL25vZGVfbW9kdWxlcy93YXRjaGlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwic3JjL2ZyZWUuanMiLCJzcmMvaG9va3MuanMiLCJzcmMvbWFsbG9jLmpzIiwic3JjL25vZGVfbW9kdWxlcy9ieXRlcy9pbmRleC5qcyIsInNyYy9zdGFja0FsbG9jLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHN0YWNrVHJhY2UgPSB3aW5kb3cucHJpbnRTdGFja1RyYWNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkRnJlZVByb3h5IChwcmV2aW91c0ZyZWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGZyZWVQcm94eSAocHRyKSB7XG4gICAgY29uc29sZS5sb2coJ2ZyZWUgYXQ6ICcsIHN0YWNrVHJhY2UoKSk7XG4gICAgaWYgKHB0cikgcmV0dXJuIHByZXZpb3VzRnJlZShwdHIpO1xuICB9O1xufTtcblxuIiwid2luZG93Lm1lbW9yeXByb2ZpbGVyX2FkZF9ob29rcyA9IGZ1bmN0aW9uICgpIHtcbiAgd2luZG93Lk1vZHVsZVsnX21hbGxvYyddID0gd2luZG93Ll9tYWxsb2MgPVxuICAgIHJlcXVpcmUoJy4vbWFsbG9jLmpzJykod2luZG93Ll9tYWxsb2MpO1xuICB3aW5kb3cuTW9kdWxlWydfZnJlZSddID0gd2luZG93Ll9mcmVlID0gcmVxdWlyZSgnLi9mcmVlLmpzJykod2luZG93Ll9mcmVlKTtcbiAgd2luZG93LlJ1bnRpbWUuc3RhY2tBbGxvYyA9XG4gICAgcmVxdWlyZSgnLi9zdGFja0FsbG9jLmpzJykod2luZG93LlJ1bnRpbWUuc3RhY2tBbGxvYylcbn07XG4iLCJ2YXIgYnl0ZXMgPSByZXF1aXJlKCdieXRlcycpO1xuXG52YXIgc3RhY2tUcmFjZSA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gVE9ETzogZGlmZmVyZW50aWF0ZSBiZXR3ZWVuIHJ1bnRpbWUgbWFsbG9jIGFuZCBzb3VyY2UgbWFsbG9jXG4gIHJldHVybiB3aW5kb3cucHJpbnRTdGFja1RyYWNlKCkuc2xpY2UoNSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkTWFsbG9jUHJveHkgKHByZXZpb3VzTWFsbG9jKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtYWxsb2NQcm94eSAoc2l6ZSkge1xuICAgIGNvbnNvbGUubG9nKGJ5dGVzKHNpemUpLnRvVXBwZXJDYXNlKCkgKyAnIG1hbGxvYzogJyArIHN0YWNrVHJhY2UoKVswXSk7XG4gICAgdmFyIHB0ciA9IHByZXZpb3VzTWFsbG9jKHNpemUpO1xuICAgIGlmICghcHRyKSByZXR1cm4gMDtcbiAgICByZXR1cm4gcHRyO1xuICB9O1xufTtcblxuIiwiXG4vKipcbiAqIFBhcnNlIGJ5dGUgYHNpemVgIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc2l6ZVxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHNpemUpIHtcbiAgaWYgKCdudW1iZXInID09IHR5cGVvZiBzaXplKSByZXR1cm4gY29udmVydChzaXplKTtcbiAgdmFyIHBhcnRzID0gc2l6ZS5tYXRjaCgvXihcXGQrKD86XFwuXFxkKyk/KSAqKGtifG1ifGdifHRiKSQvKVxuICAgICwgbiA9IHBhcnNlRmxvYXQocGFydHNbMV0pXG4gICAgLCB0eXBlID0gcGFydHNbMl07XG5cbiAgdmFyIG1hcCA9IHtcbiAgICAgIGtiOiAxIDw8IDEwXG4gICAgLCBtYjogMSA8PCAyMFxuICAgICwgZ2I6IDEgPDwgMzBcbiAgICAsIHRiOiAoKDEgPDwgMzApICogMTAyNClcbiAgfTtcblxuICByZXR1cm4gbWFwW3R5cGVdICogbjtcbn07XG5cbi8qKlxuICogY29udmVydCBieXRlcyBpbnRvIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gYiAtIGJ5dGVzIHRvIGNvbnZlcnRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gY29udmVydCAoYikge1xuICB2YXIgdGIgPSAoKDEgPDwgMzApICogMTAyNCksIGdiID0gMSA8PCAzMCwgbWIgPSAxIDw8IDIwLCBrYiA9IDEgPDwgMTAsIGFicyA9IE1hdGguYWJzKGIpO1xuICBpZiAoYWJzID49IHRiKSByZXR1cm4gKE1hdGgucm91bmQoYiAvIHRiICogMTAwKSAvIDEwMCkgKyAndGInO1xuICBpZiAoYWJzID49IGdiKSByZXR1cm4gKE1hdGgucm91bmQoYiAvIGdiICogMTAwKSAvIDEwMCkgKyAnZ2InO1xuICBpZiAoYWJzID49IG1iKSByZXR1cm4gKE1hdGgucm91bmQoYiAvIG1iICogMTAwKSAvIDEwMCkgKyAnbWInO1xuICBpZiAoYWJzID49IGtiKSByZXR1cm4gKE1hdGgucm91bmQoYiAvIGtiICogMTAwKSAvIDEwMCkgKyAna2InO1xuICByZXR1cm4gYiArICdiJztcbn1cbiIsInZhciBieXRlcyA9IHJlcXVpcmUoJ2J5dGVzJyk7XG5cbnZhciBzdGFja19tZW1vcnlfYXJlYV9zaXplID0gMDtcbnZhciBzdGFja19iYXNlID0gMHgwO1xudmFyIHN0YWNrX3RvcCA9IDB4MDtcbnZhciBzdGFja19tYXggPSAweDA7XG52YXIgc3RhY2tfd2F0ZXJtYXJrID0gMDtcblxudmFyIHN0YWNrVHJhY2UgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aW5kb3cucHJpbnRTdGFja1RyYWNlKCkuc2xpY2UoNik7XG59O1xuXG4vLyBEb2Vzbid0IHJlYWxseSB3b3JrIDooXG5mdW5jdGlvbiBsaW5rU291cmNlICh0cmFjZSkge1xuICB2YXIgcmUgPSAvQCguKik6KFxcZCspOi87XG4gIHZhciBtYXRjaGVzID0gdHJhY2UubWF0Y2gocmUpO1xuICByZXR1cm4gJ3ZpZXctc291cmNlOicgKyBtYXRjaGVzWzFdICsgJyNsaW5lJyArIG1hdGNoZXNbMl07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1aWxkU3RhY2tBbGxvY1Byb3h5IChwcmV2aW91c1N0YWNrQWxsb2MpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHN0YWNrQWxsb2NQcm94eSAoc2l6ZSkge1xuICAgIHZhciB0cmFjZSA9IHN0YWNrVHJhY2UoKVswXTtcbiAgICBjb25zb2xlLmxvZyhieXRlcyhzaXplKS50b1VwcGVyQ2FzZSgpICsgJyBTdGFjayBhbGxvY2F0aW9uOiAnICsgdHJhY2UpO1xuICAgIC8vY29uc29sZS5sb2cobGlua1NvdXJjZSh0cmFjZSkpO1xuICAgIHJldHVybiBwcmV2aW91c1N0YWNrQWxsb2Moc2l6ZSk7XG4gIH07XG59O1xuXG4iXX0=
