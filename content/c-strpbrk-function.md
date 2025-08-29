+++
title = "C strpbrk function"
date = 2025-08-29T19:50:12.882+01:00
draft = false
description = "Learn string scanning in C with this comprehensive strpbrk tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strpbrk function

last modified April 8, 2025

String scanning operations are essential in C programming, and strpbrk is a
powerful function for locating characters in strings. This tutorial covers
strpbrk in depth, including its syntax, usage, and practical applications.
We'll explore various examples and discuss safer alternatives where appropriate.
Understanding strpbrk helps efficiently process and analyze string data.

## What Is strpbrk?

The strpbrk function searches a string for any of a set of characters.
It's declared in string.h and takes two parameters: the string to
search and a set of characters to look for. strpbrk returns a pointer
to the first occurrence of any character from the set, or NULL if none are found.
For security-critical code, consider validating input strings before scanning.

## Basic strpbrk Usage

This example demonstrates finding vowels in a string using strpbrk.

basic_scan.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *text = "Hello, World!";
    const char *vowels = "aeiouAEIOU";
    
    char *result = strpbrk(text, vowels);
    
    if (result != NULL) {
        printf("First vowel '%c' found at position %ld\n", 
               *result, result - text);
    } else {
        printf("No vowels found\n");
    }

    return 0;
}

Here, strpbrk scans text for any vowel character.
It returns a pointer to the first match ('e' in this case) or NULL if no vowels
are found. The position is calculated by pointer arithmetic. This is a simple,
efficient way to find specific character groups in strings. Always check for NULL
to handle cases where no matches are found.

## Finding Multiple Occurrences

This example shows how to find all occurrences of characters from a set.

multiple_scan.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *text = "The quick brown fox jumps over the lazy dog";
    const char *search_chars = "aeiou";
    
    char *ptr = (char *)text;
    int count = 0;
    
    while ((ptr = strpbrk(ptr, search_chars)) != NULL) {
        printf("Found '%c' at position %ld\n", *ptr, ptr - text);
        ptr++;
        count++;
    }
    
    printf("Total vowels found: %d\n", count);
    return 0;
}

This code counts all vowels in a sentence by repeatedly calling strpbrk.
After each match, the pointer is incremented to continue searching the remaining
string. The loop terminates when strpbrk returns NULL. This pattern
is useful for processing all occurrences of multiple characters in a string.
Note that the original string remains unchanged.

## Validating Input Characters

This example demonstrates input validation using strpbrk.

input_validation.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;stdbool.h&gt;

bool is_valid_filename(const char *name) {
    const char *invalid_chars = "\\/:*?\"&lt;&gt;|";
    return strpbrk(name, invalid_chars) == NULL;
}

int main() {
    const char *filename = "report_2024.pdf";
    
    if (is_valid_filename(filename)) {
        printf("'%s' is a valid filename\n", filename);
    } else {
        printf("'%s' contains invalid characters\n", filename);
    }
    
    return 0;
}

Here, strpbrk checks for invalid filename characters. The function
returns true if no invalid characters are found. This is a practical application
for input validation in file operations. The approach is efficient for checking
against multiple disallowed characters. For more complex validation, regular
expressions might be more appropriate.

## Tokenizing with strpbrk

This example shows how to use strpbrk for simple tokenization.

tokenize.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *data = "name=John;age=30;city=New York";
    const char *delimiters = ";=";
    
    char *ptr = (char *)data;
    char *token;
    
    while ((token = strpbrk(ptr, delimiters)) != NULL) {
        printf("Found delimiter '%c' at position %ld\n", *token, token - ptr);
        ptr = token + 1;
    }
    
    return 0;
}

This code identifies all delimiters in a key-value string. strpbrk
finds either ';' or '=' characters. While not a full tokenizer, this demonstrates
how strpbrk can help parse structured text. For complete parsing,
you would need to extract the values between delimiters. This approach is useful
for simple configuration strings or data formats.

## Case-Insensitive Search

This example implements case-insensitive search using strpbrk.

case_insensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;ctype.h&gt;

char *strpbrk_ci(const char *s, const char *accept) {
    while (*s != '\0') {
        for (const char *a = accept; *a != '\0'; a++) {
            if (tolower(*s) == tolower(*a)) {
                return (char *)s;
            }
        }
        s++;
    }
    return NULL;
}

int main() {
    const char *text = "Hello World";
    const char *search = "aeiou";
    
    char *result = strpbrk_ci(text, search);
    
    if (result != NULL) {
        printf("Found '%c' at position %ld\n", *result, result - text);
    }
    
    return 0;
}

Since strpbrk is case-sensitive, this example provides a custom
case-insensitive version. The function compares lowercase versions of each
character. This approach is useful when case doesn't matter in the search.
Note that this implementation is less efficient than standard strpbrk
due to the extra function calls. For performance-critical code, consider
converting strings to a single case first.

## Best Practices for Using strpbrk

- **Check for NULL returns:** Always handle cases where no matches are found.

- **Validate input strings:** Ensure strings are properly null-terminated.

- **Consider performance:** For repeated searches, preprocess strings if possible.

- **Use const correctness:** Mark input strings as const when they shouldn't be modified.

- **Combine with other functions:** Use with strcspn or strspn for more complex operations.

## Source

[C strpbrk Documentation](https://en.cppreference.com/w/c/string/byte/strpbrk)

This tutorial has explored the strpbrk function, from basic usage to
advanced applications. While powerful for character scanning, always consider
input validation and edge cases to ensure robust string processing in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).