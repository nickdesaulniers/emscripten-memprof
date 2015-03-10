default:
	emcc memleak.c -o a.html --tracing --js-library ../src/glue.js --pre-js ../stacktrace.js --pre-js ../src/memprof.js --post-js ../src/epilogue.js
