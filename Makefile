#src = src/malloc.js src/free.js src/stackAlloc.js src/hooks.js src/node_modules/bytes/index.js
src = src/malloc.js src/free.js src/epilogue.js

default:
	cat $(src) > memoryprofiler3.js

