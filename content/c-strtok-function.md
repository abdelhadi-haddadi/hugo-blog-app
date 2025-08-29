+++
title = "C strtok function"
date = 2025-08-27T23:22:32.522+01:00
draft = false
description = "Learn string tokenization in C with this
comprehensive strtok tutorial. Explore usage, practical examples, and safer
alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtok function

last modified April 8, 2025

String manipulation is fundamental in C programming, and strtok is a
key function for splitting strings into tokens. This tutorial covers
strtok in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives like
strtok_s. Understanding strtok helps with parsing and
processing string data while maintaining program safety.

## What Is strtok?

The strtok function breaks a string into tokens using specified
delimiters. It's declared in string.h and modifies the original
string by replacing delimiters with null characters. strtok is not
thread-safe and maintains internal state between calls. For safety-critical
code, consider strtok_s or strtok_r which provide
bounds checking and thread safety. Always use caution with string modification.

## Basic strtok Usage

This example demonstrates basic string tokenization using strtok.

basic_tokenize.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "apple,orange,banana";
    char *token;

    // Get first token
    token = strtok(str, ",");
    
    // Get remaining tokens
    while (token != NULL) {
        printf("Token: %s\n", token);
        token = strtok(NULL, ",");
    }

    return 0;
}

Here, strtok splits the string at each comma delimiter. The first
call uses the string pointer, while subsequent calls use NULL. The function
returns pointers to each token. Note that strtok modifies the
original string. This is a simple way to parse comma-separated values or similar
delimited data.

## Multiple Delimiters with strtok

strtok can handle multiple delimiter characters, as shown here.

multi_delim.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "apple orange,banana;pear";
    char *token;

    // Use space, comma, and semicolon as delimiters
    token = strtok(str, " ,;");
    
    while (token != NULL) {
        printf("Token: %s\n", token);
        token = strtok(NULL, " ,;");
    }

    return 0;
}

This example uses multiple delimiters (space, comma, semicolon) to split the
string. The delimiter string contains all characters that should separate
tokens. strtok treats any sequence of these characters as a single
delimiter. This flexibility makes it useful for parsing various text formats.
Remember that consecutive delimiters are treated as one.

## Safe Alternative: strtok_s

This example demonstrates the safer strtok_s function available in
C11.

safe_tokenize.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "one:two:three";
    char *token;
    char *context;

    // Safe tokenization with context pointer
    token = strtok_s(str, ":", &amp;context);
    
    while (token != NULL) {
        printf("Token: %s\n", token);
        token = strtok_s(NULL, ":", &amp;context);
    }

    return 0;
}

strtok_s adds thread safety by using an explicit context pointer
instead of internal state. The context pointer tracks tokenization progress.
This function is recommended for multithreaded applications. While not
universally available, it's included in C11's optional Annex K. The macro
__STDC_WANT_LIB_EXT1__ enables these safer functions.

## Tokenizing with Different Delimiters

This example shows how to change delimiters between strtok calls.

changing_delims.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "name=John Doe;age=30;city=New York";
    char *token;

    // First split by semicolon
    token = strtok(str, ";");
    
    while (token != NULL) {
        printf("Field: %s\n", token);
        
        // For each field, split by equals
        char *key = strtok(token, "=");
        char *value = strtok(NULL, "=");
        
        printf("  Key: %s, Value: %s\n", key, value);
        token = strtok(NULL, ";");
    }

    return 0;
}

This code first splits the string by semicolons, then splits each resulting
token by equals signs. Nested tokenization is possible by using different
delimiters. However, this approach can be confusing and may lead to errors.
For complex parsing, consider dedicated parsing libraries or writing custom
parsers. Always document such nested tokenization clearly.

## Tokenizing a File Line by Line

This example demonstrates reading a file and tokenizing each line.

file_tokenize.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    FILE *file = fopen("data.txt", "r");
    if (file == NULL) {
        perror("Error opening file");
        return 1;
    }

    char line[256];
    while (fgets(line, sizeof(line), file) {
        // Remove newline character
        line[strcspn(line, "\n")] = '\0';
        
        char *token = strtok(line, ",");
        while (token != NULL) {
            printf("Token: %s\n", token);
            token = strtok(NULL, ",");
        }
        printf("----\n");
    }

    fclose(file);
    return 0;
}

This program reads a file line by line, tokenizing each line with commas.
fgets reads each line safely with buffer size checking. The
newline character is removed before tokenization. This pattern is useful for
processing CSV files or other line-based formats. Remember to always check file
operations for errors and close files properly.

## Best Practices for Using strtok

- **Avoid modifying source strings:** Make copies if you need the original.

- **Consider thread safety:** Use strtok_s or strtok_r in multithreaded code.

- **Handle empty tokens:** Consecutive delimiters produce empty tokens.

- **Document delimiter changes:** When changing delimiters between calls.

- **Check for NULL returns:** Always verify tokens before using them.

## Source

[C strtok Documentation](https://en.cppreference.com/w/c/string/byte/strtok)

This tutorial has explored the strtok function, from basic usage to
advanced considerations. While powerful for string parsing, always use it
carefully to prevent security issues and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).