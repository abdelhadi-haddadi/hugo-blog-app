+++
title = "C strncmp function"
date = 2025-08-27T23:22:29.206+01:00
draft = false
description = "Learn string comparison in C with this comprehensive strncmp tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strncmp function

last modified April 8, 2025

String comparison is fundamental in C programming, and strncmp is a
key function for comparing strings safely. This tutorial covers strncmp
in depth, including its syntax, usage, and advantages over strcmp.
We'll explore practical examples and discuss security considerations.
Understanding strncmp helps write safer code by preventing buffer
overflows during string comparisons.

## What Is strncmp?

The strncmp function compares two strings up to a specified number
of characters. It's declared in string.h and takes three parameters:
two string pointers and a maximum comparison length. Unlike strcmp,
it won't read beyond the specified limit, making it safer for untrusted input.
It returns zero for equal strings, negative if the first string is less, and
positive if greater in lexicographical order.

## Basic strncmp Usage

This example demonstrates basic string comparison using strncmp.

basic_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str1[] = "Hello";
    char str2[] = "Hello, World!";
    
    // Compare first 5 characters
    int result = strncmp(str1, str2, 5);

    if (result == 0) {
        printf("First 5 characters are equal\n");
    } else {
        printf("First 5 characters are different\n");
    }

    return 0;
}

Here, strncmp compares only the first 5 characters of both strings.
The comparison is case-sensitive and stops at the first differing character or
when the specified length is reached. This example shows how to safely compare
string prefixes without risking buffer overflows. The result is zero because
both strings start with "Hello".

## Comparing Fixed-Length Strings

strncmp is ideal for comparing fixed-length strings or buffers, as
shown here.

fixed_length_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char password[8] = "secret";
    char input[8] = "secrets";
    
    // Compare exactly 8 bytes (buffer size)
    int match = strncmp(password, input, sizeof(password));

    if (match == 0) {
        printf("Access granted\n");
    } else {
        printf("Access denied\n");
    }

    return 0;
}

This example compares two fixed-size buffers completely, including any padding
bytes. The comparison uses sizeof to get the exact buffer size.
This approach prevents timing attacks that might occur with null-terminated
string comparisons. Note that for security-critical code, specialized comparison
functions might be better.

## Case-Insensitive Comparison

This example demonstrates case-insensitive comparison using strncasecmp.

case_insensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;strings.h&gt; // For strncasecmp

int main() {
    char str1[] = "HELLO";
    char str2[] = "hello";
    
    // Case-insensitive compare first 5 chars
    int result = strncasecmp(str1, str2, 5);

    if (result == 0) {
        printf("Strings are equal ignoring case\n");
    } else {
        printf("Strings are different\n");
    }

    return 0;
}

strncasecmp (or _strnicmp on Windows) performs
case-insensitive comparison up to the specified length. This is useful for
case-insensitive matching while maintaining length safety. The function is
declared in strings.h on Unix-like systems. Note that locale
settings may affect case conversion rules.

## Comparing Substrings

This example shows how to compare substrings using pointer arithmetic with
strncmp.

substring_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char text[] = "The quick brown fox";
    char search[] = "quick";
    
    // Compare substring starting at position 4
    int found = strncmp(text + 4, search, strlen(search));

    if (found == 0) {
        printf("Substring found\n");
    } else {
        printf("Substring not found\n");
    }

    return 0;
}

Here, we compare a substring of text starting at position 4 with
the search string. Pointer arithmetic (text + 4) moves
to the desired starting position. This technique is useful for parsing and
searching within strings. Always ensure the substring length doesn't exceed the
remaining string length to avoid undefined behavior.

## Safe String Comparison with Length Check

This example demonstrates a safer comparison that checks string lengths first.

safe_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int safe_str_compare(const char *s1, const char *s2, size_t max_len) {
    size_t len1 = strnlen(s1, max_len);
    size_t len2 = strnlen(s2, max_len);
    
    if (len1 != len2) return 1; // Different lengths
    return strncmp(s1, s2, max_len);
}

int main() {
    char input1[20] = "password";
    char input2[20] = "password123";
    
    if (safe_str_compare(input1, input2, sizeof(input1)) {
        printf("Strings are different\n");
    } else {
        printf("Strings are equal\n");
    }

    return 0;
}

This example combines strnlen and strncmp for a more
robust comparison. The helper function first checks if strings have equal lengths
within the limit. This prevents partial matches from being considered equal when
lengths differ. The strnlen function ensures we don't read beyond
the specified maximum length, adding another safety layer.

## Best Practices for Using strncmp

- **Specify maximum length:** Always set a reasonable limit to prevent overflows.

- **Check lengths first:** Consider comparing lengths before content for efficiency.

- **Handle null terminators:** Remember strncmp may compare non-string data.

- **Use case-insensitive variants:** When case doesn't matter, use strncasecmp.

- **Validate input:** Ensure pointers are valid before comparison.

## Source

[C strncmp Documentation](https://en.cppreference.com/w/c/string/byte/strncmp)

This tutorial has explored the strncmp function, from basic usage to
advanced safety considerations. While simple, proper string comparison is crucial
for security and correctness in C programs. Always prefer length-limited functions
like strncmp over their unlimited counterparts.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).