mergeInto(LibraryManager.library, {
  emscripten_trace_record_allocation: mallocProxy,
  emscripten_trace_record_free: freeProxy,
});

