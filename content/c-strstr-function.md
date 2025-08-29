+++
title = "C strstr function"
date = 2025-08-27T23:22:31.408+01:00
draft = false
description = "Learn string searching in C with this comprehensive strstr tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strstr function

last modified April 8, 2025

String operations are fundamental in C programming, and strstr is a
key function for finding substrings. This tutorial covers strstr in
depth, including its syntax, usage, and potential pitfalls. We'll explore
practical examples and discuss safer alternatives for critical applications.
Understanding strstr helps efficiently search strings while
maintaining program safety and reliability.

## What Is strstr?

The strstr function locates the first occurrence of a substring in
a string. It's declared in string.h and takes two parameters: the
haystack string and needle substring. strstr returns a pointer to
the found substring or NULL if not found. For security-critical code, consider
bounds-checked alternatives or validate inputs carefully.

## Basic strstr Usage

This example demonstrates finding a substring using strstr.

basic_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *text = "The quick brown fox jumps over the lazy dog";
    const char *sub = "fox";
    
    char *result = strstr(text, sub);
    
    if (result != NULL) {
        printf("Found '%s' at position: %ld\n", sub, result - text);
    } else {
        printf("'%s' not found\n", sub);
    }
    
    return 0;
}

Here, strstr searches for "fox" in the sample text. The function
returns a pointer to the first character of the found substring. We calculate the
position by subtracting the text pointer from the result pointer. This is a
simple, efficient way to find substrings in C strings. Always check for NULL
return values.

## Case-Insensitive Search

This example shows how to implement case-insensitive search using strstr.

case_insensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;ctype.h&gt;

char* stristr(const char *haystack, const char *needle) {
    do {
        const char *h = haystack;
        const char *n = needle;
        
        while (tolower(*h) == tolower(*n) &amp;&amp; *n) {
            h++;
            n++;
        }
        
        if (*n == 0) {
            return (char*)haystack;
        }
    } while (*haystack++);
    
    return NULL;
}

int main() {
    const char *text = "C Programming Language";
    const char *sub = "PROGRAMMING";
    
    char *result = stristr(text, sub);
    
    if (result) {
        printf("Found '%s' at position: %ld\n", sub, result - text);
    } else {
        printf("'%s' not found\n", sub);
    }
    
    return 0;
}

This implements a case-insensitive version of strstr called
stristr. It converts characters to lowercase before comparison.
The function follows the same pattern as strstr but with case
ignored. Note that this is not part of standard C library. For production code,
consider more efficient algorithms like Boyer-Moore for large texts.

## Finding Multiple Occurrences

This example demonstrates finding all occurrences of a substring.

multiple_occurrences.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *text = "apple orange apple banana apple";
    const char *sub = "apple";
    
    const char *ptr = text;
    int count = 0;
    
    while ((ptr = strstr(ptr, sub)) {
        printf("Found '%s' at position: %ld\n", sub, ptr - text);
        ptr += strlen(sub);
        count++;
    }
    
    printf("Total occurrences: %d\n", count);
    return 0;
}

This code finds all occurrences of "apple" in the text. After each find, it
advances the search pointer past the found substring. The loop continues until
strstr returns NULL. This technique is useful for counting or
processing all matches in a string. Be careful not to create infinite loops with
zero-length substrings.

## Extracting Text Between Delimiters

This example shows how to extract text between delimiters using strstr.

extract_between.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *text = "Data: [important] and [secret]";
    const char *start_delim = "[";
    const char *end_delim = "]";
    
    const char *start = text;
    const char *end;
    
    while ((start = strstr(start, start_delim))) {
        start += strlen(start_delim);
        end = strstr(start, end_delim);
        
        if (!end) break;
        
        int length = end - start;
        char extracted[256];
        strncpy(extracted, start, length);
        extracted[length] = '\0';
        
        printf("Extracted: %s\n", extracted);
        
        start = end + strlen(end_delim);
    }
    
    return 0;
}

This code extracts text between square brackets. It first finds the start
delimiter, then looks for the end delimiter. The length between them is
calculated and the substring is copied to a buffer. This pattern is useful for
parsing structured text. Always ensure your buffer is large enough for the
extracted content.

## Safe String Search Considerations

This example demonstrates safer string search with length checking.

safe_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

char* safe_strstr(const char *haystack, size_t haystack_len,
                 const char *needle, size_t needle_len) {
    if (!haystack || !needle || needle_len == 0 || haystack_len &lt; needle_len) {
        return NULL;
    }
    
    for (size_t i = 0; i &lt;= haystack_len - needle_len; i++) {
        if (strncmp(haystack + i, needle, needle_len) == 0) {
            return (char*)(haystack + i);
        }
    }
    
    return NULL;
}

int main() {
    char buffer[256] = "Safe string handling is important";
    char search[] = "string";
    
    char *result = safe_strstr(buffer, sizeof(buffer), 
                             search, strlen(search));
    
    if (result) {
        printf("Found '%s' at position: %ld\n", search, result - buffer);
    } else {
        printf("'%s' not found\n", search);
    }
    
    return 0;
}

This implements a safer version of strstr that includes length
checks. It prevents potential buffer overflows by knowing the maximum lengths.
The function returns NULL for invalid inputs or when the needle is larger than
the haystack. For security-critical applications, such bounds checking is
essential. This approach is more robust than standard strstr.

## Best Practices for Using strstr

- **Check for NULL returns:** Always verify if the substring was found.

- **Validate inputs:** Ensure strings are properly null-terminated.

- **Consider case sensitivity:** Use case-insensitive versions when needed.

- **Watch for empty strings:** Searching for "" returns the original string.

- **Use bounds checking:** Implement length checks for security-critical code.

## Source

[C strstr Documentation](https://en.cppreference.com/w/c/string/byte/strstr)

This tutorial has explored the strstr function, from basic usage to
advanced considerations. While powerful, always use string operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).