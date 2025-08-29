+++
title = "C strlen function"
date = 2025-08-29T19:50:10.648+01:00
draft = false
description = "Learn string length operations in C with this comprehensive strlen tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strlen function

last modified April 8, 2025

String operations are fundamental in C programming, and strlen is a
key function for determining string length. This tutorial covers
strlen in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding strlen helps manage string
operations while maintaining program safety and reliability.

## What Is strlen?

The strlen function calculates the length of a null-terminated
string. It's declared in string.h and takes one parameter: a
pointer to the string. strlen counts characters until it encounters
the null terminator. For safety-critical code, consider strnlen
which includes a maximum length parameter to prevent buffer overflows.

## Basic strlen Usage

This example demonstrates basic string length calculation using
strlen.

basic_length.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char text[] = "Hello, World!";
    size_t length = strlen(text);

    printf("String: %s\n", text);
    printf("Length: %zu\n", length);

    return 0;
}

Here, strlen counts the characters in text until it
finds the null terminator. The length is stored in a size_t
variable, which is the correct type for sizes in C. The function returns 13 for
"Hello, World!" as it doesn't count the null terminator. Always ensure strings
are properly null-terminated before using strlen.

## Comparing String Lengths

This example shows how to compare string lengths using strlen.

compare_lengths.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str1[] = "apple";
    char str2[] = "banana";

    size_t len1 = strlen(str1);
    size_t len2 = strlen(str2);

    if (len1 &gt; len2) {
        printf("'%s' is longer\n", str1);
    } else if (len2 &gt; len1) {
        printf("'%s' is longer\n", str2);
    } else {
        printf("Strings are equal length\n");
    }

    return 0;
}

This code compares the lengths of two strings using strlen. The
lengths are stored in size_t variables before comparison. Note that
this compares only lengths, not content. String length comparison is often used
in sorting algorithms or input validation. Remember that strlen
must traverse the entire string to find its length.

## Using strlen with Pointers

This example demonstrates strlen with string pointers.

pointer_length.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *message = "Pointer to a string literal";
    size_t length = strlen(message);

    printf("Message: %s\n", message);
    printf("Length: %zu\n", length);
    printf("First character: %c\n", *message);
    printf("Last character before null: %c\n", *(message + length - 1));

    return 0;
}

Here, strlen works with a pointer to a string literal. The function
traverses the string until it finds the null terminator. We demonstrate accessing
the first and last characters using pointer arithmetic. Note that string literals
are immutable in C. The const qualifier helps prevent accidental
modification of the literal.

## Safe Alternative: strnlen

This example demonstrates the safer strnlen function.

safe_length.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char buffer[10] = "Test";
    size_t max_len = sizeof(buffer);
    
    // Safe length check with bounds
    size_t length = strnlen(buffer, max_len);

    printf("String: %s\n", buffer);
    printf("Length: %zu\n", length);
    printf("Buffer size: %zu\n", max_len);

    return 0;
}

strnlen takes a maximum length parameter to prevent reading beyond
the buffer. It returns either the string length or the maximum length, whichever
is smaller. This is crucial for security when processing untrusted input.
strnlen is available in POSIX and many modern C implementations.
Always prefer it when working with buffers of known maximum size.

## Calculating String Length Manually

This example shows how strlen works internally.

manual_length.c
  

#include &lt;stdio.h&gt;

size_t my_strlen(const char *str) {
    size_t count = 0;
    while (*str++) {
        count++;
    }
    return count;
}

int main() {
    char text[] = "Understand strlen";
    size_t length = my_strlen(text);

    printf("String: %s\n", text);
    printf("Calculated length: %zu\n", length);

    return 0;
}

This implementation mimics strlen by counting characters until the
null terminator. The function takes a const pointer since it
doesn't modify the string. Note that real implementations are often highly
optimized using architecture-specific instructions. Understanding this helps
appreciate why strlen has O(n) time complexity.

## Best Practices for Using strlen

- **Check for null pointers:** Always validate strings aren't NULL before calling strlen.

- **Prefer strnlen for buffers:** Use strnlen when maximum size is known.

- **Avoid in performance-critical loops:** strlen's O(n) complexity can impact performance.

- **Store lengths when reused:** Cache results if you need the length multiple times.

- **Ensure proper termination:** Verify strings are null-terminated before using strlen.

## Source

[C strlen Documentation](https://en.cppreference.com/w/c/string/byte/strlen)

This tutorial has explored the strlen function, from basic usage to
advanced considerations. While simple, always use string operations carefully to
prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).