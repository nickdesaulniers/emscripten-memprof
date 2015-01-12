// not really a proxy object, rename?
function mallocProxy (address, size) {
  console.log('nick malloc', {
    address: address,
    size: size,
    // Maybe slice(5)
    stackTrace: window.printStackTrace(),
  });
};

