var lib = {
  // Key value pairs where the keys are addresses, value is a pair of size and
  // stack trace.
  $outstandingMallocs: {},
  emscripten_trace_record_allocation: mallocProxy,
  emscripten_trace_record_free: freeProxy,
};

autoAddDeps(lib, '$outstandingMallocs');
mergeInto(LibraryManager.library, lib);
