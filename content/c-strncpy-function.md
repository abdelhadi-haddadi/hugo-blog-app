+++
title = "C strncpy function"
date = 2025-08-27T23:22:29.201+01:00
draft = false
description = "Learn string copying in C with this comprehensive strncpy tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strncpy function

last modified April 8, 2025

String operations are fundamental in C programming, and strncpy is a
key function for copying strings safely. This tutorial covers strncpy
in depth, including its syntax, usage, and potential pitfalls. We'll explore
practical examples and discuss safer alternatives for critical applications.
Understanding strncpy helps prevent buffer overflows while
maintaining program safety and reliability.

## What Is strncpy?

The strncpy function copies up to n characters from the source
string to the destination. It's declared in string.h and takes
three parameters: destination, source, and maximum characters to copy.
Unlike strcpy, strncpy provides bounds checking to
prevent buffer overflows. However, it doesn't guarantee null-termination if
the source is longer than n characters.

## Basic strncpy Usage

This example demonstrates copying a string with strncpy.

basic_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];

    // Copy up to 14 characters
    strncpy(dest, src, 14);

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

Here, strncpy copies up to 14 characters from src to
dest. The destination buffer must be large enough to hold the copied
data. Unlike strcpy, this version prevents buffer overflow if the
source is too long. However, it may not null-terminate the destination if the
source length equals or exceeds the count.

## Ensuring Null Termination

This example shows how to guarantee null-termination when using strncpy.

null_terminated.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "This is a long string";
    char dest[10];

    // Copy up to 9 characters and ensure null termination
    strncpy(dest, src, sizeof(dest) - 1);
    dest[sizeof(dest) - 1] = '\0';

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

This code safely copies a string while ensuring null-termination. We copy one
fewer character than the destination size and explicitly add the null terminator.
This is a common pattern when using strncpy with fixed-size buffers.
Always remember that strncpy doesn't automatically null-terminate
if the source string is longer than the specified count.

## Copying Partial Strings

This example demonstrates copying a portion of a string using strncpy.

partial_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Programming in C";
    char dest[10];

    // Copy first 5 characters of "Programming"
    strncpy(dest, src, 5);
    dest[5] = '\0'; // Ensure null termination

    printf("Source: %s\n", src);
    printf("First 5 characters: %s\n", dest);

    return 0;
}

Here, we copy only the first 5 characters from the source string. We explicitly
add a null terminator after copying to ensure proper string termination.
This technique is useful when you need a substring or want to limit the length
of copied data. Always remember to manually null-terminate when copying partial
strings with strncpy.

## Comparing strncpy and strcpy

This example highlights the difference between strncpy and
strcpy.

compare_copy.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char long_str[] = "This string is definitely too long";
    char small_buf[10];

    // Dangerous strcpy (potential buffer overflow)
    // strcpy(small_buf, long_str); // Would crash
    
    // Safer strncpy
    strncpy(small_buf, long_str, sizeof(small_buf) - 1);
    small_buf[sizeof(small_buf) - 1] = '\0';

    printf("Safe copy: %s\n", small_buf);
    return 0;
}

This example demonstrates why strncpy is safer than strcpy.
The commented-out strcpy would cause a buffer overflow. The
strncpy version limits the copy to the buffer size and ensures
null-termination. Always prefer strncpy or similar safe functions
when dealing with potentially untrusted input or fixed-size buffers.

## Using strncpy with Arrays of Structures

This example shows strncpy used with an array of structures.

struct_array.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define MAX_NAME 20
#define NUM_STUDENTS 3

typedef struct {
    int id;
    char name[MAX_NAME];
} Student;

int main() {
    Student class[NUM_STUDENTS];
    const char *names[NUM_STUDENTS] = {"Alice", "Bob", "Charlie"};

    for (int i = 0; i &lt; NUM_STUDENTS; i++) {
        class[i].id = i + 1;
        strncpy(class[i].name, names[i], MAX_NAME - 1);
        class[i].name[MAX_NAME - 1] = '\0';
    }

    printf("Student List:\n");
    for (int i = 0; i &lt; NUM_STUDENTS; i++) {
        printf("%d: %s\n", class[i].id, class[i].name);
    }

    return 0;
}

This code safely copies student names into an array of structures using
strncpy. Each name is limited to MAX_NAME - 1
characters to leave room for the null terminator. This pattern is common
when working with fixed-size string fields in structures. It prevents buffer
overflows while maintaining data integrity.

## Best Practices for Using strncpy

- **Always check buffer sizes:** Ensure destination has enough space including null terminator.

- **Explicitly null-terminate:** Add null terminator when copying maximum characters.

- **Prefer strncpy over strcpy:** Use strncpy for safer string copying in most cases.

- **Consider strlcpy where available:** Some systems offer strlcpy which always null-terminates.

- **Validate input:** Check source strings before copying when possible.

## Source

[C strncpy Documentation](https://en.cppreference.com/w/c/string/byte/strncpy)

This tutorial has explored the strncpy function, from basic usage to
advanced considerations. While safer than strcpy, proper usage of
strncpy requires attention to null-termination and buffer sizes.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).