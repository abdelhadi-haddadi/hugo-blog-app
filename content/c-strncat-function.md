+++
title = "C strncat function"
date = 2025-08-29T19:50:10.653+01:00
draft = false
description = "Learn string concatenation in C with this comprehensive strncat tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strncat function

last modified April 8, 2025

String operations are fundamental in C programming, and strncat is a
key function for safely concatenating strings. This tutorial covers
strncat in depth, including its syntax, usage, and advantages over
strcat. We'll explore practical examples and discuss why
strncat is preferred for secure programming. Understanding
strncat helps prevent buffer overflows while maintaining program
safety and reliability.

## What Is strncat?

The strncat function concatenates a specified number of characters
from one string to another. It's declared in string.h and takes
three parameters: destination string, source string, and maximum bytes to copy.
strncat is safer than strcat because it limits the
number of copied characters. It always null-terminates the result, making it
preferable for secure coding practices.

## Basic strncat Usage

This example demonstrates basic string concatenation using strncat.

basic_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[20] = "Hello";
    char src[] = ", World!";

    // Concatenate first 7 characters from src
    strncat(dest, src, 7);

    printf("Result: %s\n", dest);
    printf("Destination length: %zu\n", strlen(dest));

    return 0;
}

Here, strncat appends up to 7 characters from src to
dest. The destination buffer must have enough space for the result.
Unlike strcat, strncat won't overflow the destination
if properly sized. Always ensure the destination has space for both the new
characters and the null terminator.

## Preventing Buffer Overflow

This example shows how strncat prevents buffer overflow compared to
strcat.

safe_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[10] = "Hello";
    char src[] = "World! This is too long";

    // Safe concatenation with length limit
    strncat(dest, src, sizeof(dest) - strlen(dest) - 1);

    printf("Safe result: %s\n", dest);

    return 0;
}

This code safely limits concatenation to the remaining space in dest.
The calculation sizeof(dest) - strlen(dest) - 1 ensures space for
the null terminator. Unlike strcat, this won't overflow the buffer
even if the source is too large. This pattern is essential for secure string
handling in C programs.

## Concatenating Partial Strings

This example demonstrates selective concatenation of part of a source string.

partial_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[30] = "Colors: ";
    char src[] = "Red, Green, Blue, Yellow";

    // Concatenate only first 3 colors
    strncat(dest, src, 13);

    printf("Selected colors: %s\n", dest);

    return 0;
}

Here, strncat copies only the first 13 characters from
src, resulting in "Colors: Red, Green, B". This shows how
strncat can extract portions of strings. The count parameter gives
precise control over how much data is appended. Always verify the destination
has sufficient space for the selected portion.

## Multiple Concatenations

This example shows multiple safe concatenations using strncat.

multi_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[50] = "User: ";
    char name[] = "John Doe";
    char role[] = " (Administrator)";
    char email[] = " - johndoe@example.com";

    // Safe multiple concatenations
    strncat(dest, name, sizeof(dest) - strlen(dest) - 1);
    strncat(dest, role, sizeof(dest) - strlen(dest) - 1);
    strncat(dest, email, sizeof(dest) - strlen(dest) - 1);

    printf("User info: %s\n", dest);

    return 0;
}

This code safely builds a string from multiple components using
strncat. Each call checks remaining space to prevent overflow. The
pattern sizeof(dest) - strlen(dest) - 1 is repeated for each
concatenation. This approach is safer than using strcat when
building strings from multiple sources. The result is always null-terminated.

## Handling Empty Destination

This example demonstrates strncat behavior with empty destinations.

empty_concat.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char dest[20] = "";  // Empty string
    char src[] = "Initial content";

    // Concatenate to empty destination
    strncat(dest, src, sizeof(dest) - 1);

    printf("Result: %s\n", dest);
    printf("Length: %zu\n", strlen(dest));

    return 0;
}

When the destination is empty, strncat works like a bounded copy.
The example shows safe initialization of a string buffer. The size limit ensures
no overflow occurs even if the source is large. This pattern is useful for
initializing buffers with default content. The result is always a valid
null-terminated string.

## Best Practices for Using strncat

- **Check buffer sizes:** Always ensure destination has enough space.

- **Count null terminator:** Remember to reserve space for it.

- **Prefer over strcat:** Use strncat for safer code.

- **Initialize buffers:** Either zero-fill or null-terminate before use.

- **Verify parameters:** Check for NULL pointers before calling.

## Source

[C strncat Documentation](https://en.cppreference.com/w/c/string/byte/strncat)

This tutorial has explored the strncat function, from basic usage to
secure programming patterns. By using strncat instead of
strcat, you can prevent buffer overflows and create more robust C
programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).