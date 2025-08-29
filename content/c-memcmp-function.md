+++
title = "C memcmp function"
date = 2025-08-27T23:22:19.128+01:00
draft = false
description = "Learn memory comparison in C with this
comprehensive memcmp tutorial. Explore usage, practical examples, and safer
alternatives for memory operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C memcmp function

last modified April 8, 2025

Memory comparison is fundamental in C programming, and memcmp is a
key function for comparing data between memory locations. This tutorial covers
memcmp in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding memcmp helps optimize memory
operations while maintaining program safety and reliability.

## What Is memcmp?

The memcmp function compares two blocks of memory byte by byte.
It's declared in string.h and takes three parameters: pointers to
two memory blocks and the number of bytes to compare. memcmp
returns zero if the blocks are identical, negative if the first differing byte
is lower in the first block, or positive if higher. Unlike string comparison
functions, memcmp compares all bytes, including null bytes.

## Basic memcmp Usage

This example demonstrates comparing two arrays using memcmp.

basic_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char arr1[] = {1, 2, 3, 4, 5};
    char arr2[] = {1, 2, 3, 4, 5};
    char arr3[] = {1, 2, 3, 4, 6};

    int result1 = memcmp(arr1, arr2, sizeof(arr1));
    int result2 = memcmp(arr1, arr3, sizeof(arr1));

    printf("Comparison 1: %d\n", result1);
    printf("Comparison 2: %d\n", result2);

    return 0;
}

Here, memcmp compares two arrays byte by byte. The first comparison
returns 0 indicating identical content. The second returns a negative value
because the fifth byte in arr1 (5) is less than in
arr3 (6). The comparison is performed on raw bytes, not
interpreted values. Always ensure the size parameter matches your intended
comparison length.

## Comparing Strings with memcmp

memcmp can compare strings, but differs from strcmp as
shown in this example.

string_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str1[] = "apple";
    char str2[] = "apples";
    char str3[] = "apple\0extra";

    printf("strcmp(str1, str2): %d\n", strcmp(str1, str2));
    printf("memcmp(str1, str2, 5): %d\n", memcmp(str1, str2, 5));
    printf("memcmp(str1, str3, 6): %d\n", memcmp(str1, str3, 6));

    return 0;
}

This example shows key differences between strcmp and
memcmp. While strcmp stops at null terminators,
memcmp compares all specified bytes. The first memcmp
compares only 5 bytes and finds equality. The second compares through null
bytes. memcmp is useful when comparing binary data or when you
need to include null bytes in comparison.

## Comparing Structures with memcmp

This example demonstrates comparing structures using memcmp.

struct_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[20];
    float score;
} Student;

int main() {
    Student s1 = {101, "Alice", 95.5};
    Student s2 = {101, "Alice", 95.5};
    Student s3 = {102, "Bob", 88.0};

    int result1 = memcmp(&amp;s1, &amp;s2, sizeof(Student));
    int result2 = memcmp(&amp;s1, &amp;s3, sizeof(Student));

    printf("Comparison 1: %d\n", result1);
    printf("Comparison 2: %d\n", result2);

    return 0;
}

Here, memcmp compares entire structures byte by byte. The first
comparison returns 0 as the structures are identical. The second returns non-
zero as they differ. Note that padding bytes may affect comparison results.
This method is fast but may not work reliably with structures containing
pointers or floating-point numbers due to potential bit-level differences.

## Safe Alternative: memcmp_s

This example demonstrates the safer memcmp_s function available in
C11.

safe_compare.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data1[5] = {1, 2, 3, 4, 5};
    char data2[10] = {1, 2, 3, 4, 5};
    
    int result;
    errno_t err = memcmp_s(data1, sizeof(data1), 
                      data2, sizeof(data2), 
                      sizeof(data1), &amp;result);

    if (err != 0) {
        printf("Error: Invalid parameters or size mismatch\n");
        return 1;
    }

    printf("Comparison result: %d\n", result);
    return 0;
}

memcmp_s adds bounds checking and returns an error if parameters
are invalid. It checks that the comparison size doesn't exceed either buffer.
The function returns zero on success and non-zero on failure. While not
universally available, it's recommended for security-critical code when
targeting C11 or later standards with bounds-checking support.

The macro __STDC_WANT_LIB_EXT1__ is defined as 1 to explicitly 
indicate that the program wants to use optional extensions from the C11 
standard library. Without this macro, certain safer functions, including 
memcmp_s, may not be made available by the compiler. This feature 
allows developers to selectively enable additional functionality to improve 
security and reliability in their programs.

## Comparing Partial Arrays

This example shows how to compare portions of arrays using memcmp.

partial_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    int arr1[] = {1, 2, 3, 4, 5, 6, 7, 8};
    int arr2[] = {9, 10, 3, 4, 5, 6, 11, 12};
    
    // Compare middle 4 elements (3,4,5,6)
    int result = memcmp(arr1 + 2, arr2 + 2, 4 * sizeof(int));

    if (result == 0) {
        printf("Middle elements are identical\n");
    } else {
        printf("Middle elements differ\n");
    }

    return 0;
}

Here, memcmp compares four integers starting from the third element
of each array. The size is calculated as 4 * sizeof(int) to get
the correct byte count. This technique is useful for comparing specific
sections of arrays or buffers. The comparison returns 0 because the middle
elements are identical in both arrays.

## Best Practices for Using memcmp

- **Check buffer sizes:** Ensure both buffers are large enough for the comparison.

- **Understand byte ordering:** Results may vary on different endian systems.

- **Consider safer alternatives:** Use memcmp_s in security-critical code when available.

- **Verify pointer validity:** Ensure both pointers are valid before comparison.

- **Use correct size calculations:** Remember that the size parameter is in bytes.

## Source

[C memcmp Documentation](https://en.cppreference.com/w/c/string/byte/memcmp)

This tutorial has explored the memcmp function, from basic usage to
advanced considerations. While powerful, always use memory operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).