#include <stdlib.h>
#include <stdio.h>
#include <time.h>
#include <math.h>
#include <float.h>
#ifdef __EMSCRIPTEN__
#include "emscripten.h"
#endif

const int k = 524288;
time_t last = 0;
const double period = 1.0;
void* ptr = NULL;

void loop () {
  void* tmp = NULL;
  time_t now = 0;
  double diff = difftime(time(&now), last);
  if (fabs(diff - period) < DBL_EPSILON) {
    last = now;

    malloc(8192);
    tmp = malloc(k);
    free(ptr);
    ptr = tmp;
  }
}

int main () {
  last = time(&last);
  emscripten_set_main_loop(loop, 0, 1);
}
