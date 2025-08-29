+++
title = "C strcat_s function"
date = 2025-08-27T23:22:24.751+01:00
draft = false
description = "Learn safe string concatenation in C with this comprehensive strcat_s tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strcat_s function

last modified April 8, 2025

String operations are fundamental in C programming, and strcat_s is a
key function for safely concatenating strings. This tutorial covers
strcat_s in depth, including its syntax, usage, and advantages over
strcat. We'll explore practical examples and discuss why safe string
functions are critical in modern C programming. Understanding strcat_s
helps prevent buffer overflows and other security vulnerabilities.

## What Is strcat_s?

The strcat_s function safely concatenates two strings by appending a
copy of the source string to the destination string. It's declared in
string.h and takes four parameters: destination pointer, destination
size, source pointer, and optionally the number of characters to append.
strcat_s performs bounds checking to prevent buffer overflows.
For security-critical code, always prefer strcat_s over the unsafe
strcat function.

## Basic strcat_s Usage

This example demonstrates basic string concatenation using strcat_s.

basic_concat.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[20] = "Hello";
    char src[] = ", World!";
    
    // Safe concatenation
    strcat_s(dest, sizeof(dest), src);

    printf("Result: %s\n", dest);
    return 0;
}

Here, strcat_s safely appends src to dest.
The second parameter specifies the total size of the destination buffer.
The function ensures the operation won't exceed the buffer's capacity.
This prevents buffer overflows that could occur with strcat.
Always include the null terminator when calculating buffer sizes.

## Handling Buffer Overflow

This example shows how strcat_s prevents buffer overflows.

overflow_prevention.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[10] = "Hello";
    char src[] = ", this is too long!";
    
    // Attempt safe concatenation
    errno_t result = strcat_s(dest, sizeof(dest), src);

    if (result != 0) {
        printf("Error: Buffer too small (code %d)\n", result);
        return 1;
    }

    printf("Result: %s\n", dest);
    return 0;
}

This code demonstrates strcat_s's bounds checking capability.
The destination buffer is too small for the source string, so the function
returns an error instead of causing a buffer overflow. The error code helps
identify the specific failure reason. This behavior makes strcat_s
much safer than strcat in production code.

## Concatenating Multiple Strings

This example shows how to safely concatenate multiple strings.

multi_concat.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[50] = "The";
    char part1[] = " quick";
    char part2[] = " brown";
    char part3[] = " fox";
    
    // Chain multiple safe concatenations
    strcat_s(dest, sizeof(dest), part1);
    strcat_s(dest, sizeof(dest), part2);
    strcat_s(dest, sizeof(dest), part3);

    printf("Result: %s\n", dest);
    return 0;
}

This example safely builds a longer string through multiple concatenations.
Each call to strcat_s checks the remaining buffer space.
The destination buffer must be large enough for all concatenated strings.
This pattern is common when constructing complex strings from components.
Always verify the total length won't exceed the destination capacity.

## Partial String Concatenation

This example demonstrates concatenating only part of a source string.

partial_concat.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[30] = "Selected: ";
    char src[] = "Apples,Oranges,Bananas";
    
    // Concatenate only first 6 chars of src
    strcat_s(dest, sizeof(dest), src, 6);

    printf("Result: %s\n", dest);
    return 0;
}

Here, strcat_s appends only the first 6 characters from src.
The fourth parameter specifies the maximum number of characters to append.
This is useful when you need to concatenate a substring.
The function still performs bounds checking on the destination buffer.
This provides both safety and flexibility in string operations.

## Building a Path String

This example shows a practical use case for building file paths.

path_builder.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char path[256] = "C:\\Program Files\\";
    char app[] = "MyApplication";
    char subdir[] = "\\config\\";
    char file[] = "settings.ini";
    
    // Build path safely
    strcat_s(path, sizeof(path), app);
    strcat_s(path, sizeof(path), subdir);
    strcat_s(path, sizeof(path), file);

    printf("Full path: %s\n", path);
    return 0;
}

This code constructs a complete file path from components using strcat_s.
Each segment is safely appended with bounds checking.
The destination buffer is sized to accommodate the maximum expected path length.
This pattern is common in file operations and configuration management.
Always use safe concatenation when building paths to prevent security issues.

## Best Practices for Using strcat_s

- **Always specify buffer size:** Provide the total destination buffer size, not remaining space.

- **Check return values:** Handle errors appropriately when concatenation fails.

- **Prefer over strcat:** Use strcat_s in all security-sensitive code.

- **Calculate sizes carefully:** Include space for null terminators in size calculations.

- **Initialize buffers:** Ensure destination strings are properly initialized before concatenation.

## Source

[C strcat_s Documentation](https://en.cppreference.com/w/c/string/byte/strcat)

This tutorial has explored the strcat_s function, from basic usage to
practical applications. Safe string handling is crucial for writing robust C
programs that resist buffer overflow vulnerabilities and undefined behavior.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).