+++
title = "C strtoul function"
date = 2025-08-27T23:22:34.726+01:00
draft = false
description = "Learn string conversion in C with this
comprehensive strtoul tutorial. Explore usage, practical examples, and safer
alternatives for string to number conversion."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtoul function

last modified April 8, 2025

String to number conversion is a common task in C programming, and
strtoul is a robust function for converting strings to unsigned
long integers. This tutorial covers strtoul in depth, including its
syntax, usage, and error handling. We'll explore practical examples and discuss
why strtoul is safer than functions like atoi.
Understanding strtoul helps create more reliable and secure string
parsing code.

## What Is strtoul?

The strtoul function converts a string to an unsigned long integer.
It's declared in stdlib.h and provides robust error handling.
Unlike atoi, it detects conversion errors and supports different
bases. The function takes three parameters: the string to convert, an optional
pointer to store the end position, and the numeric base (2 to 36). Always prefer
strtoul over atoi for production code.

## Basic strtoul Usage

This example demonstrates converting a simple decimal string to an unsigned long.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "12345";
    char *endptr;
    unsigned long value = strtoul(str, &amp;endptr, 10);

    if (*endptr != '\0') {
        printf("Conversion error at: %s\n", endptr);
        return 1;
    }

    printf("Converted value: %lu\n", value);
    return 0;
}

Here, strtoul converts the string "12345" to an unsigned long.
We use base 10 (decimal) and check endptr for conversion errors.
If conversion succeeds, endptr points to the string's null
terminator. This basic pattern is essential for safe string conversion.
Always check endptr to detect partial conversions.

## Hexadecimal Conversion

strtoul can convert hexadecimal strings when using base 16.

hex_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *hex_str = "0x1a3f";
    char *endptr;
    unsigned long value = strtoul(hex_str, &amp;endptr, 16);

    if (*endptr != '\0' &amp;&amp; *endptr != '\n') {
        printf("Conversion error at: %s\n", endptr);
        return 1;
    }

    printf("Hex value: %lu (0x%lx)\n", value, value);
    return 0;
}

This example converts the hexadecimal string "0x1a3f" to an unsigned long.
The base 16 tells strtoul to interpret the string as hex.
Note that the "0x" prefix is optional when using base 16. The function
also handles uppercase hex digits (A-F) and lowercase (a-f) equally.
Hexadecimal conversion is commonly used for parsing memory addresses or
bitmask values.

## Error Handling with strtoul

This example demonstrates comprehensive error handling with strtoul.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;
#include &lt;limits.h&gt;

int main() {
    const char *str = "99999999999999999999";
    char *endptr;
    unsigned long value;
    
    errno = 0;
    value = strtoul(str, &amp;endptr, 10);

    if (errno == ERANGE) {
        printf("Value out of range\n");
        return 1;
    }
    else if (*endptr != '\0') {
        printf("Invalid character at: %s\n", endptr);
        return 1;
    }

    printf("Converted value: %lu\n", value);
    return 0;
}

This code shows proper error handling for strtoul. We check
errno for range errors and endptr for invalid
characters. The large number will trigger ERANGE as it exceeds
ULONG_MAX. Always set errno to 0 before calling
strtoul to distinguish between 0 as a valid result and an
error. This pattern is crucial for robust string parsing.

## Automatic Base Detection

strtoul can automatically detect the numeric base when using 0.

auto_base.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *decimal = "12345";
    const char *hex = "0x1a3f";
    const char *octal = "0755";
    char *endptr;
    
    printf("Decimal: %lu\n", strtoul(decimal, &amp;endptr, 0));
    printf("Hex: %lu\n", strtoul(hex, &amp;endptr, 0));
    printf("Octal: %lu\n", strtoul(octal, &amp;endptr, 0));

    return 0;
}

When base 0 is specified, strtoul interprets the string like C
literals: leading "0x" means hex, leading "0" means octal, otherwise decimal.
This matches how C compilers interpret numeric constants. Automatic base
detection is convenient but may be less explicit than specifying the base
directly. Use this feature when you need to parse numbers in various formats.

## Parsing Multiple Numbers

This example shows how to parse multiple numbers from a string using
strtoul and the endptr.

multiple_numbers.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "10 20 30 40";
    char *endptr = (char *)str;
    
    while (*endptr != '\0') {
        unsigned long value = strtoul(endptr, &amp;endptr, 10);
        
        if (endptr == str) {
            break; // No conversion performed
        }
        
        printf("Parsed: %lu\n", value);
        
        // Skip whitespace
        while (*endptr == ' ') {
            endptr++;
        }
    }

    return 0;
}

This code parses multiple unsigned integers from a space-separated string.
After each conversion, endptr points to the next character,
allowing sequential parsing. We skip whitespace between numbers manually.
This technique is useful for parsing input files or command-line arguments.
Note the check for endptr == str to detect when no conversion
occurred.

## Best Practices for Using strtoul

- **Always check endptr:** Verify where conversion stopped.

- **Reset errno:** Set to 0 before calling to detect range errors.

- **Prefer over atoi:** strtoul has better error handling.

- **Choose appropriate base:** Use 0 for auto-detection when needed.

- **Validate input:** Check for empty strings or NULL pointers.

## Source

[C strtoul Documentation](https://en.cppreference.com/w/c/string/byte/strtoul)

This tutorial has explored the strtoul function, from basic usage to
advanced parsing techniques. Proper string conversion is essential for secure and
reliable C programs. Always prefer strtoul over simpler but less
safe alternatives like atoi.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).