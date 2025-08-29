+++
title = "C strcpy function"
date = 2025-08-27T23:22:25.883+01:00
draft = false
description = "Learn string copying in C with this comprehensive strcpy tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strcpy function

last modified April 8, 2025

String operations are fundamental in C programming, and strcpy is a
key function for copying strings between memory locations. This tutorial covers
strcpy in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding strcpy helps with string
operations while maintaining program safety and reliability.

## What Is strcpy?

The strcpy function copies a null-terminated string from source to
destination. It's declared in string.h and takes two parameters:
destination and source pointers. strcpy copies until it encounters
the null terminator. It doesn't check for buffer sizes, making it potentially
unsafe. For security-critical code, consider strncpy or
strlcpy for bounds-checked copying.

## Basic strcpy Usage

This example demonstrates copying a string using strcpy.

basic_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];

    // Copy string including null terminator
    strcpy(dest, src);

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

Here, strcpy copies the entire string from src to
dest, including the null terminator. The destination buffer must be
large enough to hold the copied string. This is a simple way to copy strings
when you know the destination size. Always ensure the destination has enough
space to prevent buffer overflows.

## Copying Strings with strncpy

This example demonstrates the safer strncpy function.

safe_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "This is a long string";
    char dest[10];
    
    // Safe copy with length limit
    strncpy(dest, src, sizeof(dest));
    dest[sizeof(dest) - 1] = '\0'; // Ensure null termination

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

strncpy copies up to n characters, preventing buffer
overflows. However, it may not null-terminate the string if the source is too
long. We manually add the null terminator to ensure safety. This is the
recommended approach when dealing with fixed-size buffers. Always specify the
destination buffer size as the limit.

## Dangers of strcpy

This example demonstrates the danger of using strcpy without size
checks.

dangerous_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "This string is definitely too long";
    char dest[10];
    
    // Unsafe copy - potential buffer overflow
    strcpy(dest, src);

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

This code causes a buffer overflow because the destination is too small. The
behavior is undefined and may crash or create security vulnerabilities. Never use
strcpy with untrusted input or without verifying sizes. Modern
compilers may warn about this unsafe usage. Always prefer bounded string
functions in production code.

## Copying Between Different Memory Locations

This example shows copying between dynamically allocated strings.

dynamic_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *src = "Dynamic string";
    char *dest = malloc(strlen(src) + 1); // +1 for null terminator
    
    if (dest == NULL) {
        printf("Memory allocation failed\n");
        return 1;
    }

    strcpy(dest, src);

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    free(dest);
    return 0;
}

Here, we allocate exactly enough memory for the source string plus its null
terminator. strcpy safely copies the string to the new location.
Always check malloc's return value and free allocated memory. This pattern is
common when duplicating strings. Note that we calculate the exact needed size
before allocation.

## Copying Partial Strings

This example demonstrates copying a portion of a string.

partial_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Copy this part only";
    char dest[10];
    
    // Copy first 8 characters
    strncpy(dest, src + 5, 8);
    dest[8] = '\0'; // Ensure null termination

    printf("Source: %s\n", src);
    printf("Partial copy: %s\n", dest);

    return 0;
}

We use pointer arithmetic to skip the first 5 characters of the source. The
strncpy function copies exactly 8 characters. We manually add the
null terminator since we're copying a partial string. This technique is useful
for extracting substrings. Always ensure proper null termination when working
with partial strings.

## Best Practices for String Copying

- **Prefer strncpy:** Always use length-limited functions when possible.

- **Check buffer sizes:** Ensure destination has enough space.

- **Null-terminate manually:** When using strncpy, add null terminator if needed.

- **Avoid strcpy:** Never use strcpy with untrusted or variable-length input.

- **Consider strlcpy:** If available, strlcpy is even safer than strncpy.

## Source

[C strcpy Documentation](https://en.cppreference.com/w/c/string/byte/strcpy)

This tutorial has explored the strcpy function, from basic usage to
advanced considerations. While simple, string operations require careful handling
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).