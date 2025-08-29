+++
title = "C strtol function"
date = 2025-08-27T23:22:33.618+01:00
draft = false
description = "Learn safe string conversion in C with this comprehensive strtol tutorial. Explore usage, practical examples, and safer alternatives for string to number conversion."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtol function

last modified April 8, 2025

String to number conversion is a common task in C programming, and strtol
is a robust function for this purpose. This tutorial covers strtol
in depth, including its syntax, usage, and error handling. We'll explore why
strtol is safer than functions like atoi and provide
practical examples. Understanding strtol helps write more reliable
code when processing numeric input from strings.

## What Is strtol?

The strtol function converts a string to a long integer. It's
declared in stdlib.h and provides robust error checking. Unlike
atoi, strtol detects conversion errors and supports
different number bases. It takes three parameters: the string to convert, an
optional pointer to store the end position, and the numeric base. Always prefer
strtol over atoi for reliable string conversion.

## Basic strtol Usage

This example demonstrates basic string to long conversion using strtol.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char str[] = "12345";
    char *endptr;
    long num;

    num = strtol(str, &amp;endptr, 10);

    if (*endptr != '\0') {
        printf("Conversion error: non-numeric characters\n");
        return 1;
    }

    printf("Converted number: %ld\n", num);
    return 0;
}

Here, strtol converts the string "12345" to a long integer using
base 10. The endptr helps detect conversion errors by pointing to
the first invalid character. We check if *endptr is the null
terminator to ensure complete conversion. This approach is much safer than
atoi which provides no error detection.

## Handling Different Number Bases

strtol can convert numbers in various bases, as shown in this
example.

base_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char hex_str[] = "1a3f";
    char bin_str[] = "101011";
    char *endptr;
    long hex_num, bin_num;

    hex_num = strtol(hex_str, &amp;endptr, 16);
    if (*endptr != '\0') {
        printf("Hex conversion error\n");
        return 1;
    }

    bin_num = strtol(bin_str, &amp;endptr, 2);
    if (*endptr != '\0') {
        printf("Binary conversion error\n");
        return 1;
    }

    printf("Hex %s = %ld\n", hex_str, hex_num);
    printf("Binary %s = %ld\n", bin_str, bin_num);
    return 0;
}

This example converts a hexadecimal string (base 16) and a binary string (base 2).
The third parameter specifies the numeric base. Base 0 allows strtol
to auto-detect the base from string prefixes (0x for hex, 0 for octal). Always
check endptr to verify successful conversion of the entire string.

## Error Detection with strtol

This example demonstrates comprehensive error handling with strtol.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;
#include &lt;limits.h&gt;

int main() {
    char str[] = "99999999999999999999";
    char *endptr;
    long num;

    errno = 0;
    num = strtol(str, &amp;endptr, 10);

    if (errno == ERANGE) {
        printf("Number out of range\n");
        if (num == LONG_MAX) printf("Overflow occurred\n");
        if (num == LONG_MIN) printf("Underflow occurred\n");
        return 1;
    }

    if (*endptr != '\0') {
        printf("Conversion stopped at: %s\n", endptr);
        return 1;
    }

    printf("Converted number: %ld\n", num);
    return 0;
}

This code shows how to detect range errors (ERANGE) when converting
very large numbers. We check errno after conversion to identify
overflow/underflow. The example also demonstrates checking endptr
for partial conversions. Proper error handling makes strtol much
more reliable than simpler conversion functions.

## Parsing Numbers from Mixed Strings

This example shows how to extract numbers from strings containing non-numeric
data.

mixed_string.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char input[] = "values: 42, 17, 99, xyz";
    char *ptr = input;
    char *endptr;
    long num;

    // Skip non-numeric prefix
    while (*ptr &amp;&amp; (*ptr &lt; '0' || *ptr &gt; '9')) ptr++;

    while (*ptr) {
        num = strtol(ptr, &amp;endptr, 10);
        
        if (ptr == endptr) break; // No conversion
        
        printf("Found number: %ld\n", num);
        
        // Move to next potential number
        ptr = endptr;
        while (*ptr &amp;&amp; (*ptr &lt; '0' || *ptr &gt; '9')) ptr++;
    }

    return 0;
}

This code parses multiple numbers from a string with mixed content. It uses
endptr to advance through the string after each conversion. The
loop skips non-numeric characters between numbers. This technique is useful for
processing configuration files or user input where numbers appear among other
text. The example demonstrates strtol's flexibility in real-world
parsing scenarios.

## Safe Alternative: strtol with Input Validation

This example demonstrates a wrapper function for safer strtol usage.

safe_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;
#include &lt;limits.h&gt;

int safe_strtol(const char *str, long *result) {
    char *endptr;
    
    if (str == NULL || *str == '\0') {
        return 0; // Empty string
    }

    errno = 0;
    *result = strtol(str, &amp;endptr, 10);

    if (errno == ERANGE) {
        return 0; // Out of range
    }

    if (*endptr != '\0') {
        return 0; // Extra characters
    }

    return 1; // Success
}

int main() {
    char input[100];
    long num;

    printf("Enter a number: ");
    fgets(input, sizeof(input), stdin);

    if (safe_strtol(input, &amp;num)) {
        printf("Valid number: %ld\n", num);
    } else {
        printf("Invalid input\n");
    }

    return 0;
}

The safe_strtol function provides comprehensive input validation.
It checks for empty strings, range errors, and trailing characters. This wrapper
makes strtol usage more convenient and safer in production code.
The example shows how to use it with user input from fgets. Such
validation is crucial when processing untrusted input.

## Best Practices for Using strtol

- **Always check errno:** Detect overflow/underflow by examining errno after conversion.

- **Inspect endptr:** Verify the entire string was converted by checking *endptr.

- **Initialize variables:** Ensure endptr and errno are properly initialized.

- **Choose appropriate base:** Select the correct numeric base or use 0 for auto-detection.

- **Consider wrappers:** Create helper functions for common conversion patterns.

## Source

[C strtol Documentation](https://en.cppreference.com/w/c/string/byte/strtol)

This tutorial has explored the strtol function, from basic usage to
advanced error handling. Proper string conversion is essential for robust C
programs, and strtol provides the tools needed for reliable
operation. Always prefer it over simpler but unsafe alternatives like
atoi.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).