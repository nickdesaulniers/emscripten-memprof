default:
	cat ../src/memprof.js > ../memoryprofiler3.js
	emcc test.c -o test.html --tracing --js-library ../src/epilogue.js --pre-js ../stacktrace.js --pre-js ../src/memprof.js --profiling

