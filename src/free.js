var stackTrace = window.printStackTrace;

module.exports = function buildFreeProxy (previousFree) {
  return function freeProxy (ptr) {
    console.log('free at: ', stackTrace());
    if (ptr) return previousFree(ptr);
  };
};

