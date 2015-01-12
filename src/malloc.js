function mallocProxy (address, size) {
  console.log('nick malloc', arguments);
};
//var bytes = require('bytes');

//var stackTrace = function () {
  //// TODO: differentiate between runtime malloc and source malloc
  //return window.printStackTrace().slice(5);
//};

//module.exports = function buildMallocProxy (previousMalloc) {
  //return function mallocProxy (size) {
    //console.log(bytes(size).toUpperCase() + ' malloc: ' + stackTrace()[0], window.printStackTrace());
    //var ptr = previousMalloc(size);
    //if (!ptr) return 0;
    //return ptr;
  //};
//};

