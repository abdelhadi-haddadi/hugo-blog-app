+++
title = "C malloc and free Tutorial"
date = 2025-08-29T19:49:57.229+01:00
draft = false
description = "C tutorial on dynamic memory allocation using malloc and free, covering their usage, benefits, and practical examples."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C malloc and free Tutorial

last modified January 29, 2024

Dynamic memory allocation in C is a powerful feature that allows programs to
allocate memory at runtime. The malloc function is used to allocate
memory, and the free function is used to deallocate it. This
tutorial covers the basics of malloc and free, their
usage, and practical examples.

## What Are malloc and free?

The malloc function allocates a block of memory of a specified size
and returns a pointer to the beginning of the block. The free
function deallocates the memory previously allocated by malloc,
making it available for future allocations. Proper use of these functions is
crucial to avoid memory leaks and undefined behavior.

## Basic Memory Allocation

This example demonstrates how to allocate and deallocate memory using
malloc and free.

basic_allocation.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int *ptr;
    ptr = (int *)malloc(5 * sizeof(int));  // Allocate memory for 5 integers

    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i &lt; 5; i++) {
        ptr[i] = i + 1;  // Assign values to the allocated memory
    }

    for (int i = 0; i &lt; 5; i++) {
        printf("%d ", ptr[i]);  // Print the values
    }

    free(ptr);  // Deallocate the memory
    return 0;
}

The malloc function allocates memory for 5 integers, and the
free function deallocates the memory. Always check if
malloc returns NULL to handle allocation failures.

## Allocating Memory for a String

This example demonstrates how to allocate memory for a string and deallocate it using free.

string_allocation.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

int main() {
    char *str;
    str = (char *)malloc(50 * sizeof(char));  // Allocate memory for a string

    if (str == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    strcpy(str, "Hello there!");  // Copy a string into the allocated memory
    printf("%s\n", str);  // Print the string

    free(str);  // Deallocate the memory
    return 0;
}

The malloc function allocates memory for a string, and the
free function deallocates it. The strcpy function is
used to copy a string into the allocated memory.

## Reallocating Memory

This example demonstrates how to reallocate memory using the
realloc function.

reallocation.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int *ptr;
    ptr = (int *)malloc(5 * sizeof(int));  // Allocate memory for 5 integers

    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i &lt; 5; i++) {
        ptr[i] = i + 1;  // Assign values to the allocated memory
    }

    ptr = (int *)realloc(ptr, 10 * sizeof(int));  // Reallocate memory for 10 integers

    if (ptr == NULL) {
        printf("Memory reallocation failed\n");
        return 1;
    }

    for (int i = 5; i &lt; 10; i++) {
        ptr[i] = i + 1;  // Assign values to the reallocated memory
    }

    for (int i = 0; i &lt; 10; i++) {
        printf("%d ", ptr[i]);  // Print the values
    }

    free(ptr);  // Deallocate the memory
    return 0;
}

The realloc function is used to resize the previously allocated
memory block. It can expand or shrink the memory block as needed.

## Allocating Memory for a 2D Array

This example demonstrates how to allocate memory for a 2D array using
malloc.

2d_array_allocation.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int rows = 3, cols = 4;
    int **arr;

    // Allocate memory for rows
    arr = (int **)malloc(rows * sizeof(int *));

    if (arr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    // Allocate memory for columns
    for (int i = 0; i &lt; rows; i++) {
        arr[i] = (int *)malloc(cols * sizeof(int));
        if (arr[i] == NULL) {
            printf("Memory allocation failed\n");
            return 1;
        }
    }

    // Assign values to the 2D array
    for (int i = 0; i &lt; rows; i++) {
        for (int j = 0; j &lt; cols; j++) {
            arr[i][j] = i * cols + j + 1;
        }
    }

    // Print the 2D array
    for (int i = 0; i &lt; rows; i++) {
        for (int j = 0; j &lt; cols; j++) {
            printf("%d ", arr[i][j]);
        }
        printf("\n");
    }

    // Deallocate memory
    for (int i = 0; i &lt; rows; i++) {
        free(arr[i]);
    }
    free(arr);

    return 0;
}

The malloc function is used to allocate memory for a 2D array.
Memory is allocated for each row and column separately, and free is
used to deallocate the memory.

## Handling Memory Leaks

This example demonstrates how to avoid memory leaks by properly deallocating memory.

memory_leak.c
  

#include 
#include 

int main() {
    int *ptr;
    ptr = (int *)malloc(5 * sizeof(int));  // Allocate memory for 5 integers

    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i &lt; 5; i++) {
        ptr[i] = i + 1;  // Assign values to the allocated memory
    }

    // Memory leak: Forgot to free the allocated memory
    // free(ptr);

    return 0;
}

Forgetting to call free results in a memory leak, where the
allocated memory is not deallocated. Always ensure that every
malloc call is paired with a corresponding free call.

## Using calloc for Zero-Initialized Memory

This example demonstrates how to use calloc to allocate
zero-initialized memory.

calloc_example.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int *ptr;
    ptr = (int *)calloc(5, sizeof(int));  // Allocate and zero-initialize memory for 5 integers

    if (ptr == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    for (int i = 0; i &lt; 5; i++) {
        printf("%d ", ptr[i]);  // Print the zero-initialized values
    }

    free(ptr);  // Deallocate the memory
    return 0;
}

The calloc function allocates memory and initializes it to zero. It
is useful when you need zero-initialized memory.

## Best Practices for Using malloc and free

- **Check for NULL:** Always check if malloc or calloc returns NULL to handle allocation failures.

- **Pair malloc with free:** Ensure that every malloc call is paired with a corresponding free call to avoid memory leaks.

- **Use calloc for Zero-Initialization:** Use calloc when you need zero-initialized memory.

- **Avoid Dangling Pointers:** Set pointers to NULL after calling free to avoid dangling pointers.

## Source

[C malloc Documentation](https://en.cppreference.com/w/c/memory/malloc)

In this article, we have explored the use of malloc and free in C and demonstrated their usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all C tutorials](/all/#c).