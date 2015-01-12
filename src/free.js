function freeProxy (address) {
  console.log('nick free', {
    address: address,
    // Maybe slice(4)
    stackTrace: window.printStackTrace(),
  });
};

