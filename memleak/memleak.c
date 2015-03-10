#include <stdlib.h>
int main () {
  void* ptr;
  int k = 4096;
  for (int i = 0; ; k *= 2) {
    ptr = malloc(k);
    malloc(1);
    free(ptr);
  }
}
