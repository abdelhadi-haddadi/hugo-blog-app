+++
title = "C strcpy_s function"
date = 2025-08-27T23:22:26.982+01:00
draft = false
description = "Learn string copying in C with this
comprehensive strcpy_s tutorial. Explore usage, practical examples, and safer
alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strcpy_s function

last modified April 8, 2025

String operations are fundamental in C programming, and strcpy_s is a
safer alternative to strcpy for copying strings. This tutorial covers
strcpy_s in depth, including its syntax, usage, and advantages over
traditional string functions. We'll explore practical examples and discuss when
to use this safer function. Understanding strcpy_s helps prevent
buffer overflows and improves program security.

## What Is strcpy_s?

The strcpy_s function copies a null-terminated string from source to
destination with bounds checking. It's part of C11's Annex K and takes three
parameters: destination pointer, destination size, and source pointer.
strcpy_s prevents buffer overflows by verifying the destination has
enough space. Unlike strcpy, it returns an error code on failure.
This makes it safer for security-critical applications.

## Why Use strcpy_s Instead of strcpy?

Traditional strcpy is unsafe because it doesn't check buffer sizes,
leading to potential buffer overflows. strcpy_s adds runtime
constraint checking to prevent these vulnerabilities. It requires explicit
destination buffer size and returns error codes for invalid operations.
While not universally available, it's recommended when targeting secure
environments. Always prefer strcpy_s where security matters.

## Basic strcpy_s Usage

This example demonstrates basic string copying using strcpy_s.

basic_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];

    // Safe string copy
    errno_t result = strcpy_s(dest, sizeof(dest), src);

    if (result == 0) {
        printf("Copied successfully: %s\n", dest);
    } else {
        printf("Error copying string\n");
    }

    return 0;
}

Here, strcpy_s copies the string from src to
dest with bounds checking. The destination size is specified as
sizeof(dest) to ensure safety. The function returns zero on success
and non-zero on failure. This example checks the return value to handle errors
properly. Always verify the result when using secure functions.

## Handling Small Buffers

This example shows how strcpy_s prevents buffer overflows.

small_buffer.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "This string is too long";
    char dest[10];

    // Attempt to copy to small buffer
    errno_t result = strcpy_s(dest, sizeof(dest), src);

    if (result != 0) {
        printf("Error %d: Buffer too small\n", result);
        return 1;
    }

    printf("Copied: %s\n", dest);
    return 0;
}

This code demonstrates strcpy_s's protection against buffer
overflows. The destination buffer is too small for the source string.
strcpy_s detects this and returns an error code instead of causing
undefined behavior. The program checks the return value and handles the error
gracefully. This is a major improvement over traditional strcpy.

## Copying to Dynamically Allocated Memory

This example shows safe string copying to dynamically allocated memory.

dynamic_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char src[] = "Dynamic allocation test";
    char *dest = malloc(50);

    if (dest == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    // Safe copy to dynamic memory
    errno_t result = strcpy_s(dest, 50, src);

    if (result == 0) {
        printf("Copied: %s\n", dest);
    } else {
        printf("Copy failed\n");
    }

    free(dest);
    return 0;
}

Here, strcpy_s copies a string to dynamically allocated memory.
The destination size is explicitly provided as the allocated buffer size.
The program checks both memory allocation success and copy operation success.
Always remember to free dynamically allocated memory when done. This approach
combines memory safety with string operation safety.

## Using strcpy_s with Structures

This example demonstrates using strcpy_s within structures.

struct_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[20];
} Employee;

int main() {
    Employee emp;
    char src[] = "John Doe";

    // Safe copy into structure member
    errno_t result = strcpy_s(emp.name, sizeof(emp.name), src);

    if (result == 0) {
        emp.id = 1001;
        printf("Employee %d: %s\n", emp.id, emp.name);
    } else {
        printf("Failed to set employee name\n");
    }

    return 0;
}

This code safely copies a string into a structure member using strcpy_s.
The destination size is specified as the size of the structure's character array.
This prevents buffer overflows when working with fixed-size structure members.
The example shows proper error handling for the string copy operation.
This pattern is useful for safely initializing structure string fields.

## Combining strcpy_s with String Concatenation

This example shows how to safely build strings using strcpy_s and
strcat_s together.

concat_copy.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char part1[] = "Hello";
    char part2[] = " World!";
    char buffer[20];

    // Safe initial copy
    errno_t result = strcpy_s(buffer, sizeof(buffer), part1);

    if (result != 0) {
        printf("Initial copy failed\n");
        return 1;
    }

    // Safe concatenation
    result = strcat_s(buffer, sizeof(buffer), part2);

    if (result == 0) {
        printf("Combined string: %s\n", buffer);
    } else {
        printf("Concatenation failed\n");
    }

    return 0;
}

This example demonstrates building a string safely using strcpy_s
for the initial copy and strcat_s for concatenation. Both functions
perform bounds checking to prevent buffer overflows. The program checks each
operation's return value for errors. This approach is safer than using
strcpy and strcat without size checks. Always verify
buffer sizes when combining string operations.

## Best Practices for Using strcpy_s

- **Always check return values:** Handle errors properly when strcpy_s fails.

- **Use correct buffer sizes:** Provide the actual destination buffer size, not string length.

- **Prefer over traditional strcpy:** Use strcpy_s in security-sensitive code.

- **Combine with other safe functions:** Use strcat_s for concatenation.

- **Verify compiler support:** Ensure your compiler supports Annex K before using.

## Source

[C strcpy_s Documentation](https://en.cppreference.com/w/c/string/byte/strcpy)

This tutorial has explored the strcpy_s function, demonstrating its
advantages over strcpy for secure string operations. While not
universally available, it provides essential safety features for modern C
programming. Always consider security when handling strings in C.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).