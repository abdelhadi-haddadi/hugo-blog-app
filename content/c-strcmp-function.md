+++
title = "C strcmp function"
date = 2025-08-27T23:22:25.888+01:00
draft = false
description = "Learn string comparison in C with this
comprehensive strcmp tutorial. Explore usage, practical examples, and safer
alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strcmp function

last modified April 8, 2025

String comparison is fundamental in C programming, and strcmp is a
key function for comparing strings lexicographically. This tutorial covers
strcmp in depth, including its syntax, usage, and potential
pitfalls. We'll explore practical examples and discuss safer alternatives for
critical applications. Understanding strcmp helps perform accurate
string comparisons while maintaining program safety and reliability.

## What Is strcmp?

The strcmp function compares two strings lexicographically. It's
declared in string.h and takes two parameters: pointers to the
strings being compared. strcmp returns an integer indicating the
comparison result: zero for equality, negative if first string is less, positive
if greater. For safety-critical code, consider strncmp for
length-limited comparisons or platform-specific secure versions.

## Basic strcmp Usage

This example demonstrates basic string comparison using strcmp.

basic_compare.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str1[] = "apple";
    char str2[] = "banana";
    
    int result = strcmp(str1, str2);

    if (result == 0) {
        printf("Strings are equal\n");
    } else if (result &lt; 0) {
        printf("'%s' comes before '%s'\n", str1, str2);
    } else {
        printf("'%s' comes after '%s'\n", str1, str2);
    }

    return 0;
}

Here, strcmp compares "apple" and "banana" lexicographically. The
function returns a negative value because 'a' comes before 'b' in ASCII. The
comparison is case-sensitive and continues until differing characters or null
terminators are found. Always ensure strings are properly null-terminated to
avoid undefined behavior.

## Case-Insensitive Comparison

This example shows how to perform case-insensitive comparison using standard C.

case_insensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;ctype.h&gt;

int case_insensitive_cmp(const char *s1, const char *s2) {
    while (*s1 &amp;&amp; *s2) {
        int diff = tolower(*s1) - tolower(*s2);
        if (diff != 0) return diff;
        s1++;
        s2++;
    }
    return *s1 - *s2;
}

int main() {
    char str1[] = "Apple";
    char str2[] = "apple";
    
    int result = case_insensitive_cmp(str1, str2);

    if (result == 0) {
        printf("Strings are equal (case-insensitive)\n");
    } else {
        printf("Strings are different\n");
    }

    return 0;
}

This custom function compares strings case-insensitively by converting characters
to lowercase. The standard strcmp is case-sensitive, so we need
additional logic for case-insensitive comparison. The function returns zero for
equal strings, following strcmp convention. Note that this is more
complex than using platform-specific functions like stricmp.

## Comparing Fixed-Length Strings

This example demonstrates using strncmp for safer comparisons.

fixed_length.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str1[] = "HelloWorld";
    char str2[] = "HelloMoon";
    
    // Compare first 5 characters only
    int result = strncmp(str1, str2, 5);

    if (result == 0) {
        printf("First 5 characters are equal\n");
    } else {
        printf("First 5 characters are different\n");
    }

    return 0;
}

strncmp compares only the specified number of characters, making it
safer for potentially non-null-terminated strings. Here, it compares only the
first 5 characters of each string. This is useful when comparing fixed-length
fields or when you only care about a prefix. Unlike strcmp, it
won't read past the specified length, reducing buffer overflow risks.

## Sorting Strings with strcmp

This example shows how to use strcmp in a sorting algorithm.

string_sort.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define COUNT 5

void sort_strings(char *arr[], int n) {
    for (int i = 0; i &lt; n-1; i++) {
        for (int j = i+1; j &lt; n; j++) {
            if (strcmp(arr[i], arr[j]) &gt; 0) {
                char *temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
}

int main() {
    char *fruits[COUNT] = {"banana", "apple", "pear", "orange", "kiwi"};
    
    sort_strings(fruits, COUNT);

    printf("Sorted fruits:\n");
    for (int i = 0; i &lt; COUNT; i++) {
        printf("%s\n", fruits[i]);
    }

    return 0;
}

This code sorts an array of strings using strcmp to determine
lexicographical order. The bubble sort algorithm swaps strings based on
strcmp results. Note that we're swapping pointers, not copying
string contents. For production code, consider more efficient sorting algorithms
like quicksort. The example demonstrates strcmp's role in ordering
operations.

## Secure Alternative: strcmp_s

This example demonstrates the safer strcmp_s function from C11.

safe_compare.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str1[] = "test";
    char str2[10];
    
    // Simulate potential buffer issue
    strncpy(str2, "test", 4);
    str2[4] = '\0';

    // Safe comparison with additional checks
    errno_t result = strcmp_s(str1, sizeof(str1), str2, sizeof(str2));

    if (result == 0) {
        printf("Strings are equal\n");
    } else if (result &gt; 0) {
        printf("str1 is greater than str2\n");
    } else if (result &lt; 0) {
        printf("str1 is less than str2\n");
    } else {
        printf("Comparison error\n");
    }

    return 0;
}

strcmp_s adds runtime constraints checking to prevent undefined
behavior with invalid strings. It verifies that string arguments are not null
and that sizes are valid. While not universally available, it's recommended for
security-critical code when targeting C11 or later standards. The function
returns zero on success, with comparison results matching strcmp.

The macro __STDC_WANT_LIB_EXT1__ is defined as 1 to explicitly 
indicate that the program wants to use optional extensions from the C11 
standard library. Without this macro, certain safer functions, including 
strcmp_s, may not be made available by the compiler. This feature 
allows developers to selectively enable additional functionality to improve 
security and reliability in their programs.

## Best Practices for Using strcmp

- **Ensure null termination:** Both strings must be properly null-terminated.

- **Consider case sensitivity:** Use custom functions or platform-specific versions for case-insensitive comparison.

- **Use strncmp for safety:** When comparing untrusted input or fixed-length fields.

- **Check for empty strings:** Handle empty strings explicitly if needed.

- **Consider locale:** For localized applications, be aware of locale-specific comparison rules.

## Source

[C strcmp Documentation](https://en.cppreference.com/w/c/string/byte/strcmp)

This tutorial has explored the strcmp function, from basic usage to
advanced considerations. While powerful, always use string operations carefully
to prevent security vulnerabilities and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).