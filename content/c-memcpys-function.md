+++
title = "C memcpy_s function"
date = 2025-08-29T19:50:01.645+01:00
draft = false
description = "Learn safe memory copying in C with this comprehensive memcpy_s tutorial. Explore usage, practical examples, and best practices for secure memory operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C memcpy_s function

last modified April 8, 2025

Memory safety is critical in C programming, and memcpy_s provides
a safer alternative to traditional memcpy. This tutorial covers
memcpy_s in depth, including its syntax, usage, and advantages.
We'll explore practical examples demonstrating secure memory copying with bounds
checking. Understanding memcpy_s helps prevent buffer overflows
and other memory-related vulnerabilities in critical applications.

## What Is memcpy_s?

The memcpy_s function is a bounds-checked version of memcpy
introduced in C11. It copies memory between buffers while verifying destination
size. The function returns an error if the destination is too small or if any
parameters are invalid. Unlike memcpy, it helps prevent buffer
overflow vulnerabilities. It's part of the C11 Annex K bounds-checking
interfaces.

## Why Use memcpy_s Instead of memcpy?

memcpy_s provides runtime checks that memcpy lacks.
It verifies destination buffer size matches the requested copy operation.
This prevents buffer overflows that could lead to security vulnerabilities.
While not universally available, it's recommended for security-critical code.
The function returns error codes that help diagnose memory safety issues.

## Basic memcpy_s Usage

This example demonstrates basic usage of memcpy_s with bounds
checking.

basic_safe_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Safe copying";
    char dest[20];
    
    errno_t result = memcpy_s(dest, sizeof(dest), src, sizeof(src));

    if (result == 0) {
        printf("Copied successfully: %s\n", dest);
    } else {
        printf("Error %d: Copy failed\n", result);
    }

    return 0;
}

This code safely copies a string using memcpy_s. The destination
size is checked against the source size before copying. The function returns
zero on success and non-zero on failure. Error handling ensures program
stability even if the copy fails. This approach prevents buffer overflow
vulnerabilities present in unchecked memcpy usage.

## Handling Copy Failures

This example shows proper error handling when memcpy_s fails due
to insufficient destination space.

failed_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "This string is too long";
    char dest[10];
    
    errno_t result = memcpy_s(dest, sizeof(dest), src, sizeof(src));

    if (result != 0) {
        printf("Error %d: ", result);
        if (result == ERANGE) {
            printf("Destination buffer too small\n");
        } else if (result == EINVAL) {
            printf("Invalid parameters\n");
        }
        return 1;
    }

    printf("Copied successfully\n");
    return 0;
}

This code demonstrates handling different error conditions from
memcpy_s. The destination buffer is intentionally too small.
The function returns ERANGE when the destination is insufficient.
Other possible errors include EINVAL for invalid parameters.
Proper error handling makes programs more robust and secure.

## Copying Structures Safely

This example shows how to safely copy structures using memcpy_s.

safe_struct_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[30];
    float balance;
} Account;

int main() {
    Account acc1 = {1001, "John Doe", 1250.75f};
    Account acc2;
    
    errno_t result = memcpy_s(&amp;acc2, sizeof(Account), 
                            &amp;acc1, sizeof(Account));

    if (result == 0) {
        printf("Account copied successfully\n");
        printf("ID: %d, Name: %s, Balance: %.2f\n", 
               acc2.id, acc2.name, acc2.balance);
    } else {
        printf("Error copying account structure\n");
    }

    return 0;
}

This code safely copies an entire Account structure using
memcpy_s. The destination size is verified before copying.
The function ensures no buffer overflow occurs during the structure copy.
This technique is particularly useful for complex data structures.

## Partial Buffer Copying

This example demonstrates safe partial buffer copying with
memcpy_s.

partial_safe_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    int src[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int dest[5];
    
    // Copy first 5 elements (20 bytes)
    errno_t result = memcpy_s(dest, sizeof(dest), 
                           src, 5 * sizeof(int));

    if (result == 0) {
        printf("Copied elements: ");
        for (int i = 0; i &lt; 5; i++) {
            printf("%d ", dest[i]);
        }
        printf("\n");
    } else {
        printf("Error copying partial array\n");
    }

    return 0;
}

This code safely copies a portion of an integer array using
memcpy_s. The destination size is properly calculated and
verified. The function ensures only the specified number of bytes are
copied. This approach prevents buffer overflows when working with array
slices.

## Zero-Length Copy Protection

This example shows how memcpy_s handles zero-length copy
requests.

zero_length_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Test data";
    char dest[20];
    
    // Attempt zero-length copy
    errno_t result = memcpy_s(dest, sizeof(dest), 
                           src, 0);

    if (result == 0) {
        printf("Zero-length copy succeeded\n");
    } else {
        printf("Error %d: Zero-length copy failed\n", result);
    }

    return 0;
}

This code tests memcpy_s behavior with zero-length copies.
The function correctly handles this edge case without errors. Zero-length
copies are valid operations that produce no changes to memory.
memcpy_s returns success in this case while still verifying
buffer validity.

## Best Practices for Using memcpy_s

- **Always check return values:** Handle all possible error conditions properly.

- **Use correct buffer sizes:** Ensure destination size parameter matches actual buffer size.

- **Enable C11 extensions:** Define __STDC_WANT_LIB_EXT1__ before includes.

- **Consider portability:** Have fallback implementations for systems without Annex K.

- **Validate parameters:** Check for NULL pointers before calling.

## Source

[C memcpy_s Documentation](https://en.cppreference.com/w/c/string/byte/memcpy)

This tutorial has explored the memcpy_s function, demonstrating
its advantages over traditional memcpy. While requiring slightly
more code, it provides essential memory safety guarantees for secure
programming. Always consider using bounds-checked functions in security-
critical applications.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).