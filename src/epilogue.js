Module.addOnExit(function () {
  console.log('runtime exit');
  console.log(memProf.outstandingMallocs,
              Object.keys(memProf.outstandingMallocs).length);
});

