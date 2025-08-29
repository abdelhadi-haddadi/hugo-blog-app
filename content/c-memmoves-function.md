+++
title = "C memmove_s function"
date = 2025-08-27T23:22:20.225+01:00
draft = false
description = "Learn safe memory moving in C with this
comprehensive memmove_s tutorial. Explore usage, practical examples, and why to
prefer it over unsafe alternatives."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C memmove_s function

last modified April 8, 2025

Memory operations are critical in C programming, and memmove_s is a
safe function for moving data between memory locations. This tutorial covers
memmove_s in depth, including its syntax, usage, and advantages.
We'll explore practical examples and compare it with unsafe alternatives.
Understanding memmove_s helps write secure and reliable memory
operations in modern C programs.

## What Is memmove_s?

The memmove_s function safely moves a block of memory from one
location to another. It's declared in string.h and takes five
parameters: destination pointer, destination size, source pointer, bytes to
move, and optional error handler. Unlike memmove, it performs
bounds checking to prevent buffer overflows. It's part of C11's Annex K bounds-
checking interfaces. Always prefer memmove_s over
memmove when security matters.

## Basic memmove_s Usage

This example demonstrates safe moving of data between two arrays using
memmove_s.

basic_move.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];

    // Safely move 14 bytes (including null terminator)
    errno_t result = memmove_s(dest, sizeof(dest), src, 14);

    if (result != 0) {
        printf("Error moving memory: %d\n", result);
        return 1;
    }

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

Here, memmove_s moves 14 bytes from src to
dest, including the null terminator. The function checks that the
destination buffer is large enough. If successful, it returns zero; otherwise,
it returns an error code. This is a safe way to move data when you know the
exact size needed.

## Handling Overlapping Memory Regions

This example demonstrates how memmove_s safely handles overlapping
regions.

overlap_move.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data[20] = "ABCDEFGHIJ";
    
    // Safely move with overlapping regions
    errno_t result = memmove_s(data + 2, sizeof(data) - 2, data, 5);

    if (result != 0) {
        printf("Error moving memory: %d\n", result);
        return 1;
    }

    printf("Result: %s\n", data);

    return 0;
}

This code safely moves data within an overlapping region.
memmove_s properly handles the overlap while ensuring no buffer
overflow occurs. The destination size parameter prevents writing beyond the
buffer's bounds. This behavior makes memmove_s superior to both
memcpy and memmove for secure programming.

## Moving Structures with memmove_s

memmove_s can safely move entire structures, as shown in this
example.

struct_move.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[20];
    float score;
} Student;

int main() {
    Student s1 = {101, "Alice", 95.5};
    Student s2;

    // Safely move the entire structure
    errno_t result = memmove_s(&amp;s2, sizeof(Student), &amp;s1, sizeof(Student));

    if (result != 0) {
        printf("Error moving structure: %d\n", result);
        return 1;
    }

    printf("Moved Student:\n");
    printf("ID: %d\n", s2.id);
    printf("Name: %s\n", s2.name);
    printf("Score: %.1f\n", s2.score);

    return 0;
}

This example moves a Student structure using
memmove_s. The sizeof operator ensures we move the
exact number of bytes needed. The function verifies the destination has
sufficient space. This method is safe and efficient for moving structures.
Note that it works best for simple structures without internal pointers.

## Partial Array Moving

This example shows how to safely move a portion of an array using
memmove_s.

partial_move.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    int src[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int dest[4];
    
    // Safely move middle 4 elements (3,4,5,6)
    errno_t result = memmove_s(dest, sizeof(dest), src + 2, 4 * sizeof(int));

    if (result != 0) {
        printf("Error moving array portion: %d\n", result);
        return 1;
    }

    printf("Moved elements: ");
    for (int i = 0; i &lt; 4; i++) {
        printf("%d ", dest[i]);
    }
    printf("\n");

    return 0;
}

Here, memmove_s moves four integers starting from the third element
of the source array. The size is calculated as 4 * sizeof(int) to
get the correct byte count. The function verifies the destination array has
enough space. This technique is useful for extracting portions of arrays or
buffers safely.

## Error Handling with memmove_s

This example demonstrates comprehensive error handling with
memmove_s.

error_handling.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

void handle_memmove_error(errno_t err) {
    switch (err) {
        case EINVAL:
            printf("Invalid parameters\n");
            break;
        case ERANGE:
            printf("Destination buffer too small\n");
            break;
        default:
            printf("Unknown error: %d\n", err);
    }
}

int main() {
    char big[20] = "Large buffer";
    char small[5];

    // Attempt to move too much data
    errno_t result = memmove_s(small, sizeof(small), big, sizeof(big));

    if (result != 0) {
        handle_memmove_error(result);
        return 1;
    }

    printf("Move successful\n");
    return 0;
}

This code shows proper error handling for memmove_s. The function
returns specific error codes that can be checked and handled appropriately.
EINVAL indicates invalid parameters, while ERANGE
means the destination is too small. Robust error handling makes programs more
reliable and secure. Always check the return value of
memmove_s.

## Best Practices for Using memmove_s

- **Always check return values:** Verify the operation succeeded before using moved data.

- **Use correct buffer sizes:** Ensure destination size parameter matches actual buffer size.

- **Prefer over memmove:** Use memmove_s whenever security is important.

- **Initialize buffers:** Initialize destination buffers when possible for better debugging.

- **Consider platform support:** Verify memmove_s is available on your target platforms.

## Source

[C memmove_s Documentation](https://en.cppreference.com/w/c/string/byte/memmove)

This tutorial has explored the memmove_s function, from basic usage
to advanced error handling. As a secure alternative to memmove, it
provides essential safety checks for memory operations. Always prefer bounds-
checked functions in security-critical code to prevent vulnerabilities.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).