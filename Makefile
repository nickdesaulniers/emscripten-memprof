src = src/malloc.js src/free.js src/epilogue.js

default:
	cat $(src) > memoryprofiler3.js

