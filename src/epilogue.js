var lib = {
  $memProf: new MemProf,
  // Seemingly can't use bind here, possible emscripten bug?
  emscripten_trace_record_allocation: function (address, size) {
    memProf.mallocProxy(address, size);
  },
  emscripten_trace_record_free: function (address) {
    memProf.freeProxy(address);
  },
};

// The identifier `memProf` becomes a global identifier.
autoAddDeps(lib, '$memProf');
mergeInto(LibraryManager.library, lib);
