+++
title = "C strtok_s function"
date = 2025-08-27T23:22:32.519+01:00
draft = false
description = "Learn safe string tokenization in C with this comprehensive strtok_s tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtok_s function

last modified April 8, 2025

String tokenization is a common operation in C programming, and strtok_s
is the safer version of the strtok function for splitting strings.
This tutorial covers strtok_s in depth, including its syntax, usage,
and advantages over strtok. We'll explore practical examples and
discuss why strtok_s should be preferred in modern C programming.
Understanding strtok_s helps write more secure and reliable string
processing code.

## What Is strtok_s?

The strtok_s function is a safer alternative to strtok
for splitting strings into tokens. It's part of the C11 standard's Annex K
bounds-checking interfaces. strtok_s adds a context parameter to
maintain state between calls, making it thread-safe. It also performs runtime
constraints checking. Unlike strtok, it can detect invalid
parameters and buffer overflows. Always prefer strtok_s in new code
where security matters.

## Basic strtok_s Usage

This example demonstrates basic string tokenization using strtok_s.

basic_tokenize.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "apple,banana,cherry";
    char *token;
    char *context = NULL;
    const char *delim = ",";

    // First call to strtok_s
    token = strtok_s(str, delim, &amp;context);

    while (token != NULL) {
        printf("Token: %s\n", token);
        // Subsequent calls with NULL as first argument
        token = strtok_s(NULL, delim, &amp;context);
    }

    return 0;
}

This code splits a comma-separated string into individual tokens.
strtok_s maintains its state in the context pointer.
The first call uses the string to tokenize, while subsequent calls use NULL.
Each call returns a pointer to the next token or NULL when done. The context
parameter makes this thread-safe compared to strtok.

## Tokenizing with Multiple Delimiters

strtok_s can handle multiple delimiter characters, as shown here.

multi_delim.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "apple;banana cherry,orange";
    char *token;
    char *context = NULL;
    const char *delim = "; ,";

    token = strtok_s(str, delim, &amp;context);

    while (token != NULL) {
        printf("Fruit: %s\n", token);
        token = strtok_s(NULL, delim, &amp;context);
    }

    return 0;
}

This example tokenizes a string using multiple delimiters: semicolon, space, and
comma. strtok_s treats any sequence of these characters as a single
delimiter. The output shows all fruits separated regardless of which delimiter
was used. This flexibility makes strtok_s useful for parsing
complex input. Always ensure your delimiter string includes all possible
separators.

## Handling Empty Tokens

This example demonstrates how strtok_s handles consecutive
delimiters.

empty_tokens.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "apple,,banana,,,cherry";
    char *token;
    char *context = NULL;
    const char *delim = ",";
    int count = 0;

    token = strtok_s(str, delim, &amp;context);

    while (token != NULL) {
        printf("Token %d: '%s'\n", ++count, token);
        token = strtok_s(NULL, delim, &amp;context);
    }

    printf("Total tokens: %d\n", count);
    return 0;
}

When consecutive delimiters appear, strtok_s skips empty tokens
between them. This example has multiple commas in sequence, but only three
non-empty tokens are found. If you need to preserve empty tokens, consider
alternative approaches like strsep or manual parsing. The context
parameter ensures correct state tracking even with complex delimiter patterns.

## Tokenizing in Nested Loops

This example shows how to use strtok_s in nested tokenization.

nested_tokenize.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data[] = "name=John;age=30;city=New York";
    char *outer_token;
    char *outer_context = NULL;
    char *inner_token;
    char *inner_context = NULL;
    const char *outer_delim = ";";
    const char *inner_delim = "=";

    outer_token = strtok_s(data, outer_delim, &amp;outer_context);

    while (outer_token != NULL) {
        printf("Pair: %s\n", outer_token);
        
        inner_token = strtok_s(outer_token, inner_delim, &amp;inner_context);
        printf("  Key: %s\n", inner_token);
        inner_token = strtok_s(NULL, inner_delim, &amp;inner_context);
        printf("  Value: %s\n", inner_token);

        outer_token = strtok_s(NULL, outer_delim, &amp;outer_context);
    }

    return 0;
}

This code demonstrates nested tokenization by first splitting on semicolons, then
on equals signs. Each level uses its own context variable, allowing safe nested
operation. The outer loop splits key-value pairs, while the inner loop separates
keys from values. This pattern is common in configuration file parsing. The
separate context variables prevent interference between tokenization levels.

## Error Handling with strtok_s

This example shows proper error handling with strtok_s.

error_handling.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

int main() {
    char *str = NULL;  // Invalid input
    char *token;
    char *context = NULL;
    const char *delim = ",";

    token = strtok_s(str, delim, &amp;context);

    if (token == NULL &amp;&amp; errno != 0) {
        perror("strtok_s failed");
        return 1;
    }

    while (token != NULL) {
        printf("Token: %s\n", token);
        token = strtok_s(NULL, delim, &amp;context);
    }

    return 0;
}

strtok_s sets errno when encountering invalid
parameters. This example demonstrates checking for errors after a failed call.
When passed a NULL string pointer, strtok_s returns NULL and sets
errno to EINVAL. Always check both the return value and
errno for robust error handling. This is a key advantage over
strtok, which provides no error reporting mechanism.

## Best Practices for Using strtok_s

- **Always use separate context variables:** For nested or parallel tokenization.

- **Check for errors:** Verify both return value and errno after each call.

- **Prefer over strtok:** Use strtok_s in all new code for thread safety.

- **Don't modify the string during tokenization:** This can lead to undefined behavior.

- **Handle empty tokens appropriately:** Decide if you need to detect or skip them.

## Source

[C strtok_s Documentation](https://en.cppreference.com/w/c/string/byte/strtok)

This tutorial has explored the strtok_s function, from basic usage
to advanced scenarios. As the safer alternative to strtok, it
should be your first choice for string tokenization in modern C programming.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).