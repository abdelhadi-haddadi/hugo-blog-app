+++
title = "C memcpy function"
date = 2025-08-27T23:22:19.114+01:00
draft = false
description = "Learn memory copying in C with this comprehensive memcpy tutorial. Explore usage, practical examples, and safer alternatives for memory operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C memcpy function

last modified April 8, 2025

Memory operations are fundamental in C programming, and memcpy is a
key function for copying data between memory locations. This tutorial covers
memcpy in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding memcpy helps optimize memory
operations while maintaining program safety and reliability.

## What Is memcpy?

The memcpy function copies a block of memory from one location to
another. It's declared in string.h and takes three parameters: the
destination pointer, source pointer, and number of bytes to copy.
memcpy performs a binary copy without checking for overlapping
regions or buffer sizes. For safety-critical code, consider
memmove for overlapping regions or memcpy_s for
bounds-checked copying.

## Basic memcpy Usage

This example demonstrates copying data between two arrays using
memcpy.

basic_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];

    // Copy 14 bytes (including null terminator)
    memcpy(dest, src, 14);

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

Here, memcpy copies 14 bytes from src to
dest, including the null terminator. The destination buffer must be
large enough to hold the copied data. This is a simple, efficient way to copy
data when you know the exact size needed. Always ensure the destination has
enough space to prevent buffer overflows.

## Copying Structures with memcpy

memcpy can efficiently copy entire structures, as shown in this
example.

struct_copy.c
  

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

    // Copy the entire structure
    memcpy(&amp;s2, &amp;s1, sizeof(Student));

    printf("Copied Student:\n");
    printf("ID: %d\n", s2.id);
    printf("Name: %s\n", s2.name);
    printf("Score: %.1f\n", s2.score);

    return 0;
}

This example copies a Student structure using memcpy.
The sizeof operator ensures we copy the exact number of bytes
needed. This method is faster than field-by-field assignment for large
structures. Note that this works for simple structures without pointers to
dynamically allocated memory.

## Handling Overlapping Memory Regions

This example demonstrates the danger of using memcpy with
overlapping regions.

overlap_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data[] = "ABCDEFGHIJ";
    
    // Attempt to copy with overlapping regions
    memcpy(data + 2, data, 5);

    printf("Result: %s\n", data);

    return 0;
}

This code shows undefined behavior because memcpy doesn't handle
overlapping memory regions. The source and destination overlap by 3 bytes.
For such cases, memmove should be used instead, as it properly
handles overlaps. The output of this program is unpredictable and may vary
across compilers and platforms.

## Safe Alternative: memcpy_s

This example demonstrates the safer memcpy_s function available in
C11.

safe_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[10] = "Test";
    char dest[5];
    
    // Safe copy with bounds checking
    errno_t result = memcpy_s(dest, sizeof(dest), src, sizeof(src));

    if (result != 0) {
        printf("Error: Buffer too small or invalid parameters\n");
        return 1;
    }

    printf("Copied safely: %s\n", dest);
    return 0;
}

memcpy_s adds bounds checking and returns an error if the
destination is too small. This helps prevent buffer overflows. The function
returns zero on success and non-zero on failure. While not universally
available, it's recommended for security-critical code when targeting C11 or
later standards with bounds-checking support.

The macro __STDC_WANT_LIB_EXT1__ is defined as 1 to explicitly 
indicate that the program wants to use optional extensions from the C11 
standard library. Without this macro, certain safer functions, including 
memcpy_s, may not be made available by the compiler. This feature 
allows developers to selectively enable additional functionality to improve 
security and reliability in their programs.

## Copying Partial Arrays

This example shows how to copy a portion of an array using memcpy.

partial_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    int src[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int dest[4];
    
    // Copy middle 4 elements (3,4,5,6)
    memcpy(dest, src + 2, 4 * sizeof(int));

    printf("Copied elements: ");
    for (int i = 0; i &lt; 4; i++) {
        printf("%d ", dest[i]);
    }
    printf("\n");

    return 0;
}

Here, memcpy copies four integers starting from the third element of
the source array. The size is calculated as 4 * sizeof(int) to get
the correct byte count. This technique is useful for extracting portions of
arrays or buffers. Always verify the destination has sufficient space for the
copied data.

## Best Practices for Using memcpy

- **Check buffer sizes:** Ensure destination has enough space for the copied data.

- **Avoid overlapping regions:** Use memmove if source and destination might overlap.

- **Consider safer alternatives:** Use memcpy_s in security-critical code when available.

- **Verify pointer validity:** Ensure both source and destination pointers are valid.

- **Use correct size calculations:** Remember that the size parameter is in bytes.

## Source

[C memcpy Documentation](https://en.cppreference.com/w/c/string/byte/memcpy)

This tutorial has explored the memcpy function, from basic usage to
advanced considerations. While powerful, always use memory operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).