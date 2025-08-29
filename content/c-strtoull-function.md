+++
title = "C strtoull function"
date = 2025-08-29T19:50:17.295+01:00
draft = false
description = "Learn string to unsigned long long conversion in C with this comprehensive strtoull tutorial. Explore usage, practical examples, and safer alternatives."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtoull function

last modified April 8, 2025

String to number conversion is a common task in C programming, and
strtoull provides a robust way to convert strings to unsigned
long long integers. This tutorial covers strtoull in depth,
including its syntax, usage, and error handling. We'll explore practical
examples and discuss why it's safer than alternatives like atoll.
Understanding strtoull helps create more reliable programs that
handle numeric input correctly.

## What Is strtoull?

The strtoull function converts a string to an unsigned long long
integer. It's declared in stdlib.h and provides robust error
handling. Unlike atoll, it detects conversion errors and supports
different number bases. The function takes three parameters: the input string,
optional end pointer, and numeric base (0 to 36). It returns the converted value
or 0 on error, with errno set to indicate specific problems.

## Basic strtoull Usage

This example demonstrates converting a simple decimal string to an unsigned long
long.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *num_str = "18446744073709551615";
    char *endptr;
    unsigned long long num;

    errno = 0;
    num = strtoull(num_str, &amp;endptr, 10);

    if (errno == ERANGE) {
        printf("Number out of range\n");
        return 1;
    } else if (*endptr != '\0') {
        printf("Invalid characters in input\n");
        return 1;
    }

    printf("Converted number: %llu\n", num);
    return 0;
}

Here, strtoull converts the maximum 64-bit unsigned value from a
string. We check errno for range errors and examine
endptr for invalid characters. The base 10 specifies decimal
conversion. This approach is much safer than atoll which provides
no error detection. Always validate the conversion result before using it.

## Hexadecimal Conversion

strtoull can convert hexadecimal strings when base 16 is specified.

hex_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *hex_str = "0xFFFFFFFFFFFFFFFF";
    char *endptr;
    unsigned long long num;

    errno = 0;
    num = strtoull(hex_str, &amp;endptr, 16);

    if (errno == ERANGE) {
        printf("Number out of range\n");
        return 1;
    } else if (*endptr != '\0' &amp;&amp; *endptr != '\n') {
        printf("Invalid characters in input\n");
        return 1;
    }

    printf("Hexadecimal %s = %llu in decimal\n", hex_str, num);
    return 0;
}

This example converts a hexadecimal string to an unsigned long long. The base 16
parameter enables hex conversion, and the "0x" prefix is allowed but optional.
We check both errno and endptr for errors. Note that
hexadecimal letters can be uppercase or lowercase. The function skips leading
whitespace before attempting conversion.

## Automatic Base Detection

When base 0 is specified, strtoull automatically detects the
numeric base.

auto_base.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *inputs[] = {"42", "052", "0x2A", NULL};
    char *endptr;
    unsigned long long num;

    for (int i = 0; inputs[i] != NULL; i++) {
        errno = 0;
        num = strtoull(inputs[i], &amp;endptr, 0);

        if (errno == ERANGE) {
            printf("%s: Number out of range\n", inputs[i]);
            continue;
        } else if (*endptr != '\0') {
            printf("%s: Invalid characters\n", inputs[i]);
            continue;
        }

        printf("%s = %llu (auto-detected base)\n", inputs[i], num);
    }

    return 0;
}

With base 0, strtoull interprets numbers like standard C constants:
decimal by default, octal if prefixed with 0, and hexadecimal if prefixed with
0x. This example converts decimal, octal, and hex strings automatically. The
function provides flexibility when the input format isn't known in advance.
Always validate the conversion results when using automatic base detection.

## Error Handling with strtoull

This example demonstrates comprehensive error handling with
strtoull.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;
#include &lt;limits.h&gt;

int main() {
    const char *test_cases[] = {
        "12345678901234567890",  // Valid
        "99999999999999999999",  // Too large
        "12abc",                 // Partial conversion
        "   -123",               // Negative (allowed but clamped)
        NULL
    };
    char *endptr;

    for (int i = 0; test_cases[i] != NULL; i++) {
        errno = 0;
        unsigned long long num = strtoull(test_cases[i], &amp;endptr, 10);

        printf("Input: \"%s\"\n", test_cases[i]);
        printf("Converted: %llu\n", num);

        if (errno == ERANGE) {
            printf("Error: Number out of range (ERANGE)\n");
        }
        if (*endptr != '\0') {
            printf("Warning: Stopped at invalid character '%c'\n", *endptr);
        }
        if (test_cases[i] == endptr) {
            printf("Error: No conversion performed\n");
        }
        printf("\n");
    }

    return 0;
}

This example shows various error conditions when using strtoull.
We test valid numbers, overflow, partial conversions, and negative values.
Negative numbers are technically allowed but converted to their unsigned
equivalent. The endptr helps identify where conversion stopped.
Multiple checks provide complete error detection for robust input handling.

## Using strtoull with Different Bases

strtoull supports conversion in bases from 2 to 36.

multi_base.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *binary = "101010";
    const char *ternary = "2101";
    const char *base36 = "z3kq";
    char *endptr;
    unsigned long long num;

    // Binary conversion (base 2)
    num = strtoull(binary, &amp;endptr, 2);
    printf("Binary %s = %llu\n", binary, num);

    // Ternary conversion (base 3)
    num = strtoull(ternary, &amp;endptr, 3);
    printf("Ternary %s = %llu\n", ternary, num);

    // Base36 conversion (digits 0-9, letters a-z)
    num = strtoull(base36, &amp;endptr, 36);
    printf("Base36 %s = %llu\n", base36, num);

    return 0;
}

This example demonstrates strtoull with different numeric bases.
Base 2 converts binary strings, base 3 handles ternary, and base 36 supports
alphanumeric digits (0-9, a-z). Letters can be uppercase or lowercase. The
function provides great flexibility for parsing numbers in various formats.
Remember that bases above 10 use letters as additional digits (a=10, b=11, etc).

## Best Practices for Using strtoull

- **Always check errno:** Set errno to 0 before calling and check for ERANGE after.

- **Examine endptr:** Verify where conversion stopped to detect invalid characters.

- **Prefer over atoll:** strtoull provides better error handling than atoll.

- **Handle negatives carefully:** Negative values are converted to their unsigned equivalent.

- **Consider locale:** Some locales use different digit characters.

## Source

[C strtoull Documentation](https://en.cppreference.com/w/c/string/byte/strtoull)

This tutorial has explored the strtoull function, from basic usage
to advanced error handling. Proper string-to-number conversion is essential for
secure and reliable C programs. Always validate inputs and handle potential
errors when working with numeric conversions.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).