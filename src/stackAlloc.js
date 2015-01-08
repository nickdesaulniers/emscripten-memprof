var stackTrace = window.printStackTrace;
module.exports = function buildStackAllocProxy (previousStackAlloc) {
  return function stackAllocProxy (size) {
    console.log('Stack allocation at: ', stackTrace());
    return previousStackAlloc(size);
  };
};

