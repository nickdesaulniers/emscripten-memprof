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
var stackTrace = window.printStackTrace;

module.exports = function buildMallocProxy (previousMalloc) {
  return function mallocProxy (size) {
    console.log('malloc at: ' + stackTrace()[5], stackTrace());
    var ptr = previousMalloc(size);
    if (!ptr) return 0;
    return ptr;
  };
};


},{}],"/Users/Nicholas/mozilla/emscripten-memprof/src/stackAlloc.js":[function(require,module,exports){
var stackTrace = window.printStackTrace;
module.exports = function buildStackAllocProxy (previousStackAlloc) {
  return function stackAllocProxy (size) {
    console.log('Stack allocation at: ', stackTrace());
    return previousStackAlloc(size);
  };
};


},{}]},{},["/Users/Nicholas/mozilla/emscripten-memprof/src/malloc.js","/Users/Nicholas/mozilla/emscripten-memprof/src/free.js","/Users/Nicholas/mozilla/emscripten-memprof/src/stackAlloc.js","/Users/Nicholas/mozilla/emscripten-memprof/src/hooks.js"]);
