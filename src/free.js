function freeProxy (address) {
  console.log('nick free', {
    address: address,
    // Maybe slice(4)
    stackTrace: window.printStackTrace(),
  });
  if (address in outstandingMallocs) {
    delete outstandingMallocs[address];
  } else {
    throw new Error ('free for which there was not a malloc');
  }
};

