window.memoryprofiler_add_hooks = function () {
  window.Module['_malloc'] = window._malloc =
    require('./malloc.js')(window._malloc);
  window.Module['_free'] = window._free = require('./free.js')(window._free);
  window.Runtime.stackAlloc =
    require('./stackAlloc.js')(window.Runtime.stackAlloc)
};
