+++
title = "C strcat function"
date = 2025-08-29T19:50:07.229+01:00
draft = false
description = "Learn string concatenation in C with this comprehensive strcat tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strcat function

last modified April 8, 2025

String operations are fundamental in C programming, and strcat is a
key function for concatenating strings. This tutorial covers strcat
in depth, including its syntax, usage, and potential pitfalls. We'll explore
practical examples and discuss safer alternatives for critical applications.
Understanding strcat helps manipulate strings while maintaining
program safety and reliability.

## What Is strcat?

The strcat function concatenates (appends) one string to another.
It's declared in string.h and takes two parameters: the destination
string and source string. strcat appends the source string to the
destination string, overwriting its null terminator. The destination buffer must
have enough space for the combined strings. For safety-critical code, consider
strncat for bounds-checked concatenation.

## Basic strcat Usage

This example demonstrates basic string concatenation using strcat.

basic_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[50] = "Hello, ";
    char src[] = "World!";

    // Concatenate src to dest
    strcat(dest, src);

    printf("Result: %s\n", dest);

    return 0;
}

Here, strcat appends src to dest,
resulting in "Hello, World!". The destination buffer must be large enough to
hold both strings. This is a simple way to combine strings when you know the
exact size needed. Always ensure the destination has enough space to prevent
buffer overflows.

## Concatenating Multiple Strings

strcat can be used multiple times to build complex strings, as
shown in this example.

multi_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char sentence[100] = "The ";
    char adj[] = "quick ";
    char noun[] = "brown fox ";
    char verb[] = "jumps over ";

    // Build the sentence piece by piece
    strcat(sentence, adj);
    strcat(sentence, noun);
    strcat(sentence, verb);
    strcat(sentence, "the lazy dog.");

    printf("%s\n", sentence);

    return 0;
}

This example constructs a sentence by concatenating multiple strings. Each
strcat call appends another piece to the growing string. The
destination buffer must accommodate the final combined length. This technique is
useful for building dynamic strings from components. Always verify buffer sizes
when using multiple concatenations.

## Potential Buffer Overflow

This example demonstrates the danger of using strcat without proper
bounds checking.

overflow_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[10] = "Hello";
    char src[] = ", World! This is too long!";
    
    // Unsafe concatenation - buffer overflow
    strcat(dest, src);

    printf("Result: %s\n", dest);

    return 0;
}

This code causes undefined behavior because dest is too small for
the combined strings. strcat doesn't check buffer sizes and will
write past the end of dest. For such cases, strncat
should be used instead, as it limits the number of characters copied. Buffer
overflows can lead to crashes or security vulnerabilities.

## Safe Alternative: strncat

This example demonstrates the safer strncat function.

safe_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[20] = "Hello";
    char src[] = ", World! This is too long!";
    
    // Safe concatenation with bounds checking
    strncat(dest, src, sizeof(dest) - strlen(dest) - 1);

    printf("Result: %s\n", dest);

    return 0;
}

strncat adds bounds checking and limits the number of characters
copied. The third parameter specifies the maximum number of characters to
append. We calculate available space by subtracting current length from buffer
size. This helps prevent buffer overflows. Always include space for the null
terminator in your calculations.

## Building a Path with strcat

This example shows how to construct a file path using strcat.

path_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char path[256] = "/home/user/";
    char dir[] = "documents/";
    char file[] = "report.txt";

    // Build the complete path
    strcat(path, dir);
    strcat(path, file);

    printf("Full path: %s\n", path);

    return 0;
}

Here, strcat is used to construct a complete file path from
components. The destination buffer must be large enough for the final path.
This technique is common in file operations. When building paths, consider
using platform-specific path separators. Always validate the final path length
against buffer size.

## Best Practices for Using strcat

- **Check buffer sizes:** Ensure destination has enough space for the combined strings.

- **Prefer strncat:** Use strncat for bounds-checked concatenation.

- **Initialize buffers:** Always initialize destination buffers before concatenation.

- **Count null terminators:** Remember to include space for the null terminator.

- **Consider alternatives:** For complex string building, consider snprintf.

## Source

[C strcat Documentation](https://en.cppreference.com/w/c/string/byte/strcat)

This tutorial has explored the strcat function, from basic usage to
advanced considerations. While convenient, always use string operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).