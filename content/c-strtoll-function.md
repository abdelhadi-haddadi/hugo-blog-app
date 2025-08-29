+++
title = "C strtoll function"
date = 2025-08-29T19:50:16.190+01:00
draft = false
description = "Learn string to long long conversion in C with this comprehensive strtoll tutorial. Explore usage, practical examples, and safer alternatives for number parsing."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtoll function

last modified April 8, 2025

String to number conversion is a common task in C programming, and strtoll
is a robust function for converting strings to long long integers. This tutorial
covers strtoll in depth, including its syntax, usage, and error
handling. We'll explore practical examples and discuss why strtoll
is safer than alternatives like atoll. Understanding
strtoll helps create reliable programs that handle numeric input
safely and correctly.

## What Is strtoll?

The strtoll function converts a string to a long long integer. It's
declared in stdlib.h and provides robust error checking. Unlike
atoll, it detects conversion errors and supports different bases.
strtoll takes three parameters: the string to convert, an optional
pointer to store the end position, and the numeric base. For security-critical
code, always prefer strtoll over simpler but unsafe functions.

## Basic strtoll Usage

This example demonstrates converting a simple decimal string to a long long.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *str = "123456789012345";
    char *endptr;
    long long num = strtoll(str, &amp;endptr, 10);

    if (*endptr != '\0') {
        printf("Conversion stopped at: %s\n", endptr);
    } else {
        printf("Converted number: %lld\n", num);
    }

    return 0;
}

Here, strtoll converts the string to a long long in base 10. The
endptr helps detect where conversion stopped. If the entire string
was converted, endptr points to the null terminator. This example
shows proper error checking, unlike atoll which provides no error
detection. Always check endptr to validate conversions.

## Handling Different Bases

strtoll can convert numbers from various bases, as shown here.

base_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *hex_str = "0x1a3f";
    char *bin_str = "101101";
    char *oct_str = "0777";
    char *endptr;

    long long hex_num = strtoll(hex_str, &amp;endptr, 0);
    long long bin_num = strtoll(bin_str, &amp;endptr, 2);
    long long oct_num = strtoll(oct_str, &amp;endptr, 8);

    printf("Hex conversion: %lld\n", hex_num);
    printf("Binary conversion: %lld\n", bin_num);
    printf("Octal conversion: %lld\n", oct_num);

    return 0;
}

This example shows conversions with different bases. Base 0 allows automatic
detection of hex (0x prefix), octal (0 prefix), or decimal. Explicit bases (2
for binary, 8 for octal) force interpretation in that base. The function skips
leading whitespace and stops at the first invalid character. This flexibility
makes strtoll versatile for various input formats.

## Error Handling with strtoll

This example demonstrates comprehensive error handling with strtoll.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;
#include &lt;limits.h&gt;

int main() {
    char *str = "999999999999999999999999";
    char *endptr;
    errno = 0;
    
    long long num = strtoll(str, &amp;endptr, 10);

    if (errno == ERANGE) {
        printf("Range error: ");
        if (num == LLONG_MAX) printf("Overflow\n");
        else if (num == LLONG_MIN) printf("Underflow\n");
    } else if (*endptr != '\0') {
        printf("Partial conversion: stopped at '%s'\n", endptr);
    } else {
        printf("Successful conversion: %lld\n", num);
    }

    return 0;
}

This code shows proper error handling for strtoll. We check
errno for range errors (ERANGE) and examine the return value for
overflow/underflow. The endptr helps detect partial conversions.
Always set errno to 0 before calling strtoll to
distinguish current errors from previous ones. This approach provides complete
error detection missing in simpler functions.

## Using strtoll with User Input

This example shows safe handling of user input with strtoll.

user_input.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    char input[100];
    printf("Enter a number: ");
    fgets(input, sizeof(input), stdin);

    char *endptr;
    errno = 0;
    long long num = strtoll(input, &amp;endptr, 10);

    if (endptr == input) {
        printf("Error: No digits found\n");
    } else if (*endptr != '\n' &amp;&amp; *endptr != '\0') {
        printf("Error: Invalid characters in input\n");
    } else if (errno == ERANGE) {
        printf("Error: Number out of range\n");
    } else {
        printf("You entered: %lld\n", num);
    }

    return 0;
}

Here, fgets safely reads user input, and strtoll
converts it with full error checking. We verify if any digits were converted
(endptr == input), check for trailing characters, and handle range
errors. This approach prevents crashes from invalid input and provides clear
error messages. Always use this pattern when processing user-provided numbers.

## Advanced strtoll Features

This example demonstrates locale-aware conversion and advanced parsing.

advanced_features.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;locale.h&gt;

int main() {
    setlocale(LC_NUMERIC, "de_DE.UTF-8"); // German locale uses ',' as decimal
    char *str = "1.234.567"; // German thousand separators
    char *endptr;

    long long num = strtoll(str, &amp;endptr, 10);

    if (*endptr != '\0') {
        printf("Stopped at: '%s'\n", endptr);
        printf("Converted part: %lld\n", num);
    } else {
        printf("Full conversion: %lld\n", num);
    }

    return 0;
}

This example shows how locale settings affect strtoll. In German
locale, periods are thousand separators, not decimal points. The function stops
at the first non-digit character but returns the converted portion. Note that
strtoll only handles integer parts - for floating-point numbers,
use strtod. This demonstrates strtoll's behavior with
locale-specific number formats.

## Best Practices for Using strtoll

- **Always check errno:** Set to 0 before calling and check for ERANGE after.

- **Examine endptr:** Verify where conversion stopped to detect invalid input.

- **Prefer over atoll:** strtoll provides error detection that atoll lacks.

- **Handle locale carefully:** Be aware of locale-specific number formats.

- **Validate user input:** Combine with safe input functions like fgets.

## Source

[C strtoll Documentation](https://en.cppreference.com/w/c/string/byte/strtoll)

This tutorial has explored the strtoll function, from basic usage to
advanced features. Proper use of strtoll creates robust programs
that safely handle numeric input conversion with comprehensive error detection.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).