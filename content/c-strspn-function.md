+++
title = "C strspn function"
date = 2025-08-29T19:50:14.011+01:00
draft = false
description = "Learn string span operations in C with this comprehensive strspn tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strspn function

last modified April 8, 2025

String operations are fundamental in C programming, and strspn is a
key function for analyzing string content. This tutorial covers
strspn in depth, including its syntax, usage, and practical
applications. We'll explore examples demonstrating how to validate input and
parse strings. Understanding strspn helps create robust string
processing while maintaining program safety and reliability.

## What Is strspn?

The strspn function calculates the length of the initial segment of
a string that consists entirely of characters from another string. It's declared
in string.h and takes two parameters: the string to examine and the
set of acceptable characters. strspn returns the number of matching
characters at the start of the string. For security, always validate input
before processing to prevent buffer overflows.

## Basic strspn Usage

This example demonstrates basic usage of strspn to find digits.

basic_span.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *str = "12345abc";
    const char *digits = "0123456789";
    
    size_t span = strspn(str, digits);

    printf("String: %s\n", str);
    printf("Initial digit span: %zu\n", span);

    return 0;
}

Here, strspn scans str and counts how many initial
characters match those in digits. It returns 5 because "12345" are
all digits. The function stops at 'a' which isn't in the digit set. This is
useful for validating string formats or extracting numeric prefixes. The
%zu format specifier correctly prints the size_t return
value.

## Validating Input with strspn

strspn can validate that a string contains only allowed characters.

input_validation.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdbool.h&gt;

bool is_valid_hex(const char *str) {
    const char *hex_chars = "0123456789ABCDEFabcdef";
    return strspn(str, hex_chars) == strlen(str);
}

int main() {
    const char *test1 = "1A3F9C";
    const char *test2 = "1G5H9Z";

    printf("%s is %s\n", test1, is_valid_hex(test1) ? "valid" : "invalid");
    printf("%s is %s\n", test2, is_valid_hex(test2) ? "valid" : "invalid");

    return 0;
}

This example checks if strings contain only hexadecimal characters. The
is_valid_hex function returns true if the entire string consists of
hex digits. strspn scans the string until it finds a non-hex
character. By comparing the span length with the string length, we validate the
entire input. This technique is useful for sanitizing user input.

## Parsing Numeric Prefixes

This example shows how to extract and convert a numeric prefix from a string.

parse_prefix.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *data = "42apples";
    const char *digits = "0123456789";
    
    size_t num_len = strspn(data, digits);
    
    if (num_len &gt; 0) {
        char num_str[20] = {0};
        strncpy(num_str, data, num_len);
        int number = atoi(num_str);
        
        printf("Numeric prefix: %d\n", number);
        printf("Remaining string: %s\n", data + num_len);
    } else {
        printf("No numeric prefix found\n");
    }

    return 0;
}

Here, strspn finds the length of the numeric prefix in
data. We then copy this prefix to a temporary buffer and convert it
to an integer. The remaining part of the string is also available for further
processing. This approach is useful for parsing mixed-format strings. Note that
strncpy is used safely with a properly sized buffer.

## Finding Token Boundaries

strspn can help identify token boundaries in string processing.

token_boundaries.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

void print_tokens(const char *str, const char *delims) {
    const char *ptr = str;
    
    while (*ptr) {
        size_t span = strspn(ptr, delims);
        ptr += span;  // Skip delimiters
        
        size_t len = strcspn(ptr, delims);
        if (len &gt; 0) {
            printf("Token: %.*s\n", (int)len, ptr);
            ptr += len;
        }
    }
}

int main() {
    const char *text = "  apple, banana;  cherry ";
    const char *delimiters = " ,;";
    
    print_tokens(text, delimiters);
    return 0;
}

This code uses both strspn and strcspn to tokenize a
string. strspn skips leading delimiters, while
strcspn finds the next delimiter. The combination efficiently
splits the string into tokens. The %.*s format prints a substring
with specified length. This technique is useful for custom string parsing.

## Validating Filenames

This example demonstrates using strspn for filename validation.

filename_validation.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdbool.h&gt;

bool is_valid_filename(const char *name) {
    const char *valid_chars = 
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        "abcdefghijklmnopqrstuvwxyz"
        "0123456789-_.";
    
    if (strlen(name) == 0 || strlen(name) &gt; 255) return false;
    if (name[0] == '.') return false;
    
    return strspn(name, valid_chars) == strlen(name);
}

int main() {
    const char *test1 = "document.pdf";
    const char *test2 = "bad*file.txt";

    printf("%s is %s\n", test1, is_valid_filename(test1) ? "valid" : "invalid");
    printf("%s is %s\n", test2, is_valid_filename(test2) ? "valid" : "invalid");

    return 0;
}

This code checks if filenames contain only allowed characters.
strspn verifies the entire string consists of valid characters.
Additional checks ensure proper length and prevent hidden files (starting with
'.'). This is more robust than simple character searches. Always combine
strspn with other validation for complete security.

## Best Practices for Using strspn

- **Validate input first:** Ensure strings are null-terminated before processing.

- **Combine with other checks:** Use length checks with character validation.

- **Consider locale:** Character sets may vary in different locales.

- **Use for prefix matching:** Ideal for checking string starts with valid characters.

- **Prefer over manual loops:** More readable and optimized than custom character scanning.

## Source

[C strspn Documentation](https://en.cppreference.com/w/c/string/byte/strspn)

This tutorial has explored the strspn function, from basic usage to
advanced validation techniques. When used properly, it provides efficient string
analysis while helping prevent security issues from malformed input.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).