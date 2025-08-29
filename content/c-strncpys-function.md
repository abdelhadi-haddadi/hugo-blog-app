+++
title = "C strncpy_s function"
date = 2025-08-29T19:50:11.767+01:00
draft = false
description = "Learn safe string copying in C with this comprehensive strncpy_s tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strncpy_s function

last modified April 8, 2025

String operations are fundamental in C programming, and strncpy_s is a
key function for safe string copying. This tutorial covers strncpy_s
in depth, including its syntax, usage, and advantages over unsafe alternatives.
We'll explore practical examples and discuss when to use this safer function.
Understanding strncpy_s helps prevent buffer overflows and other
common string-related vulnerabilities.

## What Is strncpy_s?

The strncpy_s function is a bounds-checked version of strncpy
that copies up to a specified number of characters from source to destination.
It's part of C11's Annex K bounds-checking interfaces and provides runtime
constraint checks. Unlike strcpy or strncpy, it
returns an error if the destination buffer is too small. This makes it safer
for security-critical applications where buffer overflows must be prevented.

## Basic strncpy_s Usage

This example demonstrates basic string copying using strncpy_s.

basic_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];
    
    // Safe copy with bounds checking
    errno_t result = strncpy_s(dest, sizeof(dest), src, sizeof(src));

    if (result != 0) {
        printf("Error: %d\n", result);
        return 1;
    }

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

Here, strncpy_s copies from src to dest
with bounds checking. The function checks that dest has enough space.
If successful, it returns 0; otherwise, it returns a non-zero error code.
This prevents buffer overflows that could occur with strcpy or
strncpy. Always check the return value for error conditions.

## Handling Small Destination Buffers

This example shows how strncpy_s handles destination buffers that
are too small.

small_buffer.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "This string is too long";
    char dest[10];
    
    // Attempt to copy with insufficient space
    errno_t result = strncpy_s(dest, sizeof(dest), src, sizeof(src));

    if (result != 0) {
        printf("Error detected: %d\n", result);
        printf("Destination buffer is too small\n");
        return 1;
    }

    printf("Copied successfully: %s\n", dest);
    return 0;
}

This code demonstrates strncpy_s's safety features. The destination
buffer is too small for the source string, so the function returns an error code.
The destination buffer remains unchanged in case of error, preventing potential
buffer overflows. This behavior contrasts with strncpy, which would
truncate without warning. Always handle error conditions appropriately.

## Partial String Copying

This example shows how to copy only part of a string using strncpy_s.

partial_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Programming in C";
    char dest[20];
    
    // Copy only first 11 characters
    errno_t result = strncpy_s(dest, sizeof(dest), src, 11);

    if (result != 0) {
        printf("Error: %d\n", result);
        return 1;
    }

    printf("Partial copy: %s\n", dest);
    return 0;
}

Here, strncpy_s copies only the first 11 characters from the source
string. The function ensures the destination buffer is large enough for the
specified number of characters. Unlike strncpy, it guarantees
null-termination of the destination string. This makes the result always a valid
string. The count parameter specifies the maximum number of characters to copy.

## Copying with Dynamic Allocation

This example demonstrates using strncpy_s with dynamically allocated
memory.

dynamic_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char src[] = "Dynamic memory example";
    size_t len = strlen(src) + 1;
    char *dest = malloc(len);
    
    if (dest == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    // Safe copy to dynamically allocated buffer
    errno_t result = strncpy_s(dest, len, src, len);

    if (result != 0) {
        printf("Error: %d\n", result);
        free(dest);
        return 1;
    }

    printf("Copied: %s\n", dest);
    free(dest);
    return 0;
}

This example shows strncpy_s with a dynamically allocated buffer.
The buffer size is calculated to exactly fit the source string including the
null terminator. The function verifies the copy operation stays within bounds.
Always free dynamically allocated memory when done. This pattern is useful when
working with strings of unknown length at compile time.

## Zero-Length Copies and Edge Cases

This example explores edge cases with strncpy_s, including zero-length
copies.

edge_cases.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Edge case testing";
    char dest[20] = {0};
    
    // Case 1: Zero-length copy
    errno_t result = strncpy_s(dest, sizeof(dest), src, 0);
    printf("Zero-length result: %d\n", result);
    
    // Case 2: Destination size zero
    result = strncpy_s(dest, 0, src, sizeof(src));
    printf("Zero-dest-size result: %d\n", result);
    
    // Case 3: NULL pointers
    result = strncpy_s(NULL, sizeof(dest), src, sizeof(src));
    printf("NULL dest result: %d\n", result);
    
    return 0;
}

This code tests various edge cases of strncpy_s. The function
returns non-zero for invalid operations like zero-length destinations or NULL
pointers. These checks help catch programming errors early. Always test edge
cases when working with string operations. The behavior is well-defined for
these cases, unlike with traditional string functions.

## Best Practices for Using strncpy_s

- **Always check return values:** Handle errors appropriately to prevent silent failures.

- **Ensure proper null-termination:** Unlike strncpy, strncpy_s guarantees this when space permits.

- **Use correct buffer sizes:** Include space for the null terminator in your calculations.

- **Prefer over unsafe alternatives:** Use strncpy_s instead of strcpy or strncpy in security-sensitive code.

- **Initialize destination buffers:** Helps debugging when errors occur.

## Source

[C strncpy_s Documentation](https://en.cppreference.com/w/c/string/byte/strncpy)

This tutorial has explored the strncpy_s function, from basic usage to
advanced considerations. While more verbose than traditional string functions,
its safety features make it essential for secure programming. Always prefer
bounds-checked functions when working with untrusted input or security-critical
code.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).