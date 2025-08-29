+++
title = "C strchr function"
date = 2025-08-27T23:22:24.731+01:00
draft = false
description = "Learn string searching in C with this comprehensive strchr tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strchr function

last modified April 8, 2025

String operations are fundamental in C programming, and strchr is a
key function for searching characters within strings. This tutorial covers
strchr in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding strchr helps efficiently locate
characters in strings while maintaining program safety.

## What Is strchr?

The strchr function locates the first occurrence of a character in a
string. It's declared in string.h and takes two parameters: the
string pointer and the character to find. strchr returns a pointer
to the found character or NULL if not found. The search includes the null
terminator if specified. For bounds-checked searching, consider
strchr_s in C11 or later.

## Basic strchr Usage

This example demonstrates finding a character in a string using
strchr.

basic_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *str = "Hello, World!";
    char ch = 'W';
    
    char *result = strchr(str, ch);
    
    if (result != NULL) {
        printf("Found '%c' at position: %ld\n", ch, result - str);
    } else {
        printf("'%c' not found\n", ch);
    }

    return 0;
}

Here, strchr searches for 'W' in the string. The result is a
pointer to the found character. We calculate its position by subtracting the
string start address. This is a simple, efficient way to find characters in
null-terminated strings. Always check for NULL before using the result to avoid
undefined behavior.

## Finding All Occurrences

This example shows how to find all occurrences of a character in a string.

all_occurrences.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *str = "Mississippi";
    char ch = 's';
    const char *ptr = str;
    
    printf("Positions of '%c' in '%s':\n", ch, str);
    
    while ((ptr = strchr(ptr, ch)) != NULL) {
        printf("%ld ", ptr - str);
        ptr++; // Move past current match
    }
    printf("\n");

    return 0;
}

This code finds all 's' characters in "Mississippi" by repeatedly calling
strchr. After each find, we increment the pointer to search the
remaining string. The loop continues until strchr returns NULL.
This technique is useful for processing all occurrences of a character in a
string efficiently.

## Checking for Null Terminator

This example demonstrates searching for the null terminator with
strchr.

null_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *str = "Test string";
    char *term = strchr(str, '\0');
    
    if (term != NULL) {
        printf("Null terminator found at position: %ld\n", term - str);
        printf("String length: %ld\n", strlen(str));
    }

    return 0;
}

Here, we search for the null terminator using strchr. The position
should match the string length returned by strlen. This example
shows that strchr can find the null terminator like any other
character. This behavior is sometimes used to verify string termination or
calculate string length manually.

## Case-Sensitive Search

This example demonstrates the case-sensitive nature of strchr.

case_sensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *str = "Case Sensitive Search";
    char lower = 's';
    char upper = 'S';
    
    char *lower_result = strchr(str, lower);
    char *upper_result = strchr(str, upper);
    
    printf("'%c' found: %s\n", lower, lower_result ? "Yes" : "No");
    printf("'%c' found: %s\n", upper, upper_result ? "Yes" : "No");

    return 0;
}

strchr performs case-sensitive searches, distinguishing between 's'
and 'S'. The example shows different results for lowercase and uppercase
searches. For case-insensitive searches, consider strcasestr (not
standard C) or convert strings to uniform case first. This behavior is important
when case matters in your application logic.

## Safe Alternative: strchr_s

This example demonstrates the safer strchr_s function available in
C11.

safe_search.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char str[] = "Safe search example";
    char ch = 'e';
    char *result;
    
    errno_t err = strchr_s(str, sizeof(str), ch, &amp;result);
    
    if (err == 0 &amp;&amp; result != NULL) {
        printf("Found '%c' at position: %ld\n", ch, result - str);
    } else if (err != 0) {
        printf("Error in search\n");
    } else {
        printf("'%c' not found\n", ch);
    }

    return 0;
}

strchr_s adds bounds checking and explicit error handling. It takes
the string size as a parameter and returns errors through an errno_t value. This
helps prevent buffer overflows and undefined behavior. While not universally
available, it's recommended for security-critical code when targeting C11 or
later standards with bounds-checking support.

The macro __STDC_WANT_LIB_EXT1__ is defined as 1 to explicitly 
indicate that the program wants to use optional extensions from the C11 
standard library. Without this macro, certain safer functions, including 
strchr_s, may not be made available by the compiler. This feature 
allows developers to selectively enable additional functionality to improve 
security and reliability in their programs.

## Best Practices for Using strchr

- **Check for NULL:** Always verify the return value before use.

- **Consider case sensitivity:** Remember searches are case-sensitive by default.

- **Use const with literals:** Declare string pointers as const when appropriate.

- **Consider safer alternatives:** Use strchr_s in security-critical code when available.

- **Understand termination:** Remember the null terminator can be found.

## Source

[C strchr Documentation](https://en.cppreference.com/w/c/string/byte/strchr)

This tutorial has explored the strchr function, from basic usage to
advanced considerations. While powerful, always use string operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).