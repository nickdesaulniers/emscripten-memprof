#include <stdlib.h>

void g () {
  malloc(4096);
}

void f () {
  malloc(2048);
  g();
}

int main () {
  int i = 0;
  int* a [10];
  for (; i < 10; ++i) {
    a[i] = malloc(1024);
  }
  f();
  g();
  for (i = 0; i < 10; ++i) {
    free(a[i]);
  }
}

