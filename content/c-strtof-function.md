+++
title = "C strtof function"
date = 2025-08-27T23:22:32.527+01:00
draft = false
description = "Learn string to float conversion in C with this comprehensive strtof tutorial. Explore usage, practical examples, and safer alternatives for string parsing."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtof function

last modified April 8, 2025

String to number conversion is a common task in C programming, and strtof
is a robust function for converting strings to floating-point values. This tutorial
covers strtof in depth, including its syntax, usage, and error handling.
We'll explore practical examples and discuss why strtof is safer than
older alternatives like atof. Understanding strtof helps
create reliable programs that properly handle user input and data parsing.

## What Is strtof?

The strtof function converts a string to a single-precision floating-point
number. It's declared in stdlib.h and provides detailed error handling.
Unlike atof, strtof can detect conversion errors and parse
partial strings. The function takes a string to convert and an optional pointer to
store the position where parsing stopped. Always prefer strtof over
atof for robust input handling.

## Basic strtof Usage

This example demonstrates basic string to float conversion using strtof.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "3.14159";
    char *endptr;
    float value = strtof(str, &amp;endptr);

    if (str == endptr) {
        printf("No conversion performed\n");
    } else {
        printf("Converted value: %.5f\n", value);
    }

    return 0;
}

Here, strtof converts the string "3.14159" to a float. The endptr
parameter helps detect if conversion occurred. If str equals endptr,
no characters were converted. This basic example shows the safest way to use strtof
with error checking. Always check the endptr to verify successful conversion.

## Handling Conversion Errors

This example demonstrates proper error handling with strtof.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *str = "123.45abc";
    char *endptr;
    errno = 0;
    float value = strtof(str, &amp;endptr);

    if (str == endptr) {
        printf("No digits found\n");
    } else if (errno == ERANGE) {
        printf("Value out of range\n");
    } else {
        printf("Converted value: %f\n", value);
        printf("Remaining string: %s\n", endptr);
    }

    return 0;
}

This code shows comprehensive error checking with strtof. We reset errno
before conversion to detect range errors. The example converts "123.45abc", stopping at 'a'.
The endptr shows the remaining unparsed characters. This demonstrates how to
handle partial conversions and detect numeric overflow conditions.

## Parsing Multiple Values

This example shows how to parse multiple floating-point values from a string.

multiple_values.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "1.5 2.75 3.125 4.0625";
    char *endptr = (char *)str;
    float values[4];
    
    for (int i = 0; i &lt; 4; i++) {
        values[i] = strtof(endptr, &amp;endptr);
        printf("Value %d: %.4f\n", i + 1, values[i]);
    }

    return 0;
}

Here, strtof parses four float values from a space-separated string.
The endptr automatically advances through the string after each conversion.
This technique is useful for parsing configuration files or user input with multiple
values. Note how we initialize endptr with the input string and let
strtof update it.

## Locale-Aware Conversion

This example demonstrates locale-aware number parsing with strtof.

locale_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;locale.h&gt;

int main() {
    setlocale(LC_NUMERIC, "de_DE.UTF-8");
    const char *str = "1.234,56"; // German format
    char *endptr;
    float value = strtof(str, &amp;endptr);

    if (*endptr == ',') {
        // Try parsing again after decimal separator
        value = strtof(str, &amp;endptr);
    }

    printf("Converted value: %.2f\n", value);
    return 0;
}

This code shows how locale settings affect strtof parsing. In German
locale, comma is the decimal separator. The example handles cases where the input
might not match the current locale. For robust international applications, always
consider locale settings when parsing numeric input. This approach helps create
programs that work correctly across different regional formats.

## Safe Alternative: strtof_s

This example demonstrates the safer strtof_s function available in
C11 Annex K.

safe_conversion.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "987.654";
    char *endptr;
    float value;
    
    // Safe conversion with bounds checking
    errno_t result = strtof_s(str, &amp;endptr, &amp;value);

    if (result != 0) {
        printf("Conversion error occurred\n");
        return 1;
    }

    printf("Safely converted value: %f\n", value);
    return 0;
}

strtof_s adds additional safety checks to the conversion process.
It returns an error code instead of setting errno directly. This
version helps prevent certain classes of security vulnerabilities. While not
universally available, it's recommended for security-critical code when
targeting C11 or later standards with bounds-checking support.

The macro __STDC_WANT_LIB_EXT1__ is defined as 1 to explicitly 
indicate that the program wants to use optional extensions from the C11 
standard library. Without this macro, certain safer functions, including 
strtof_s, may not be made available by the compiler. This feature 
allows developers to selectively enable additional functionality to improve 
security and reliability in their programs.

## Best Practices for Using strtof

- **Always check endptr:** Verify where conversion stopped to detect errors.

- **Reset errno before conversion:** Clear errno to properly detect range errors.

- **Prefer over atof:** strtof provides better error handling than atof.

- **Consider locale settings:** Be aware of decimal separators in different locales.

- **Use safer alternatives when available:** Consider strtof_s in security-critical code.

## Source

[C strtof Documentation](https://en.cppreference.com/w/c/string/byte/strtof)

This tutorial has explored the strtof function, from basic usage to
advanced error handling. Proper string-to-float conversion is essential for
creating robust programs that handle user input safely and correctly.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).