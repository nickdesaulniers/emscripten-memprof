var stackTrace = window.printStackTrace;

module.exports = function buildMallocProxy (previousMalloc) {
  return function mallocProxy (size) {
    console.log('malloc at: ' + stackTrace()[5], stackTrace());
    var ptr = previousMalloc(size);
    if (!ptr) return 0;
    return ptr;
  };
};

