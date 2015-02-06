var lib = {
  // Seemingly can't use bind here, possible emscripten bug?
  emscripten_trace_record_allocation: function (address, size) {
    memProf.mallocProxy(address, size);
  },
  emscripten_trace_record_free: function (address) {
    memProf.freeProxy(address);
  },
};

mergeInto(LibraryManager.library, lib);
