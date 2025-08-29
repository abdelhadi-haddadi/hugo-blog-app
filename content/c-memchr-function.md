+++
title = "C memchr function"
date = 2025-08-27T23:22:17.963+01:00
draft = false
description = "Learn memory character searching in C with this
comprehensive memchr tutorial. Explore usage, practical examples, and safer
alternatives for memory operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C memchr function

last modified April 8, 2025

Memory operations are fundamental in C programming, and memchr is a
key function for searching characters in memory blocks. This tutorial covers
memchr in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding memchr helps efficiently
search memory while maintaining program safety and reliability.

## What Is memchr?

The memchr function searches for the first occurrence of a character
in a memory block. It's declared in string.h and takes three
parameters: the pointer to memory, the character to find, and the search size.
memchr performs a binary search without checking for null
terminators. For string operations, strchr might be more
appropriate as it handles null-terminated strings.

## Basic memchr Usage

This example demonstrates searching for a character in a memory block using
memchr.

basic_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data[] = "Hello, World!";
    char *result;
    char target = 'W';

    // Search for 'W' in first 13 bytes
    result = memchr(data, target, 13);

    if (result != NULL) {
        printf("Found '%c' at position %ld\n", target, result - data);
    } else {
        printf("Character '%c' not found\n", target);
    }

    return 0;
}

Here, memchr searches for 'W' in the first 13 bytes of
data. It returns a pointer to the found character or NULL if not
found. The position is calculated by pointer arithmetic. This is efficient for
binary data searches. Always check the return value before using the result.

## Searching in Binary Data

memchr can search binary data, as shown in this example with an
integer array.

binary_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    int numbers[] = {10, 20, 30, 40, 50};
    int target = 30;
    void *result;

    // Search for value 30 in the array
    result = memchr(numbers, target, sizeof(numbers));

    if (result != NULL) {
        size_t pos = ((int*)result - numbers);
        printf("Found %d at index %zu\n", target, pos);
    } else {
        printf("%d not found in array\n", target);
    }

    return 0;
}

This example searches for the integer 30 in an array. Note that this works only
if the byte representation matches exactly. The position is calculated by
pointer arithmetic after type casting. This technique is useful for raw memory
searches. Be cautious with endianness and alignment issues in binary data.

## Case-Sensitive Search

This example demonstrates case-sensitive search with memchr.

case_sensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char text[] = "CaseSensitiveSearch";
    char lower_target = 's';
    char upper_target = 'S';
    char *result;

    // Search for lowercase 's'
    result = memchr(text, lower_target, strlen(text));
    printf("Lowercase 's' %s\n", result ? "found" : "not found");

    // Search for uppercase 'S'
    result = memchr(text, upper_target, strlen(text));
    printf("Uppercase 'S' %s\n", result ? "found" : "not found");

    return 0;
}

memchr performs exact byte matching, making it case-sensitive.
This example shows different results for 's' and 'S' searches. For case-
insensitive searches, additional processing is needed. The function checks the
entire string length. This behavior is consistent with most low-level memory
operations in C.

## Searching with Size Limit

This example shows how to limit the search range with memchr.

limited_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data[] = "SearchInPartOfTheBuffer";
    char target = 'O';
    size_t search_len = 10; // Only search first 10 bytes

    char *result = memchr(data, target, search_len);

    if (result) {
        printf("Found '%c' in first %zu bytes\n", target, search_len);
    } else {
        printf("'%c' not found in first %zu bytes\n", target, search_len);
    }

    return 0;
}

Here, memchr searches only the first 10 bytes of the buffer. The
target 'O' appears later in the string but won't be found. This is useful when
working with partial buffers or specific memory regions. Always ensure the size
parameter doesn't exceed the actual buffer size. This prevents reading invalid
memory regions.

## Safe Alternative: memchr_s

This example demonstrates the safer memchr_s function available in
C11.

safe_search.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char buffer[20] = "SafeSearchExample";
    char target = 'x';
    void *result;
    
    // Safe search with bounds checking
    errno_t err = memchr_s(buffer, sizeof(buffer), target, 
                 sizeof(buffer), &amp;result);

    if (err == 0 &amp;&amp; result != NULL) {
        printf("Found '%c' at position %ld\n", 
               target, (char*)result - buffer);
    } else {
        printf("Character '%c' not found or error occurred\n", target);
    }

    return 0;
}

memchr_s adds bounds checking and returns an error if parameters
are invalid. This helps prevent buffer overflows. The function returns zero on
success and non-zero on failure. While not universally available, it's
recommended for security-critical code. The result is returned via a pointer
parameter rather than directly.

The macro __STDC_WANT_LIB_EXT1__ is defined as 1 to explicitly 
indicate that the program wants to use optional extensions from the C11 
standard library. Without this macro, certain safer functions, including 
memchr_s, may not be made available by the compiler. This feature 
allows developers to selectively enable additional functionality to improve 
security and reliability in their programs.

## Best Practices for Using memchr

- **Check boundaries:** Ensure the search size doesn't exceed the buffer size.

- **Verify results:** Always check the return value before using it.

- **Consider alternatives:** Use strchr for null-terminated strings.

- **Handle case sensitivity:** Implement additional logic for case-insensitive searches.

- **Use safe versions:** Prefer memchr_s when available for critical code.

## Source

[C memchr Documentation](https://en.cppreference.com/w/c/string/byte/memchr)

This tutorial has explored the memchr function, from basic usage to
advanced considerations. While powerful, always use memory operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).