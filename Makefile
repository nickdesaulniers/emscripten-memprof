src = src/malloc.js src/free.js src/stackAlloc.js src/hooks.js src/node_modules/bytes/index.js

default:
	watchify $(src) -o memoryprofiler2.js -v -d

