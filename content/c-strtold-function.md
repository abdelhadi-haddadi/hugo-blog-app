+++
title = "C strtold function"
date = 2025-08-27T23:22:33.608+01:00
draft = false
description = "Learn string to long double conversion in C with this
comprehensive strtold tutorial. Explore usage, practical examples, and safer
alternatives for numeric conversions."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtold function

last modified April 8, 2025

String to number conversion is a common task in C programming, and strtold
is the preferred function for converting strings to long double values. This tutorial
covers strtold in depth, including its syntax, usage, and error handling.
We'll explore practical examples and discuss why it's safer than alternatives like
atof. Understanding strtold helps create robust programs
that handle numeric input correctly.

## What Is strtold?

The strtold function converts a string to a long double floating-point
value. It's declared in stdlib.h and provides robust error handling.
Unlike atof, strtold can detect conversion errors and
supports different number bases. It takes three parameters: the string to convert,
a pointer to store the end position, and optionally the number base. Always prefer
strtold over atof for reliable string-to-number conversion.

## Basic strtold Usage

This example demonstrates basic string to long double conversion using strtold.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "3.14159265358979323846";
    char *endptr;
    long double value = strtold(str, &amp;endptr);

    if (str == endptr) {
        printf("No conversion performed\n");
    } else {
        printf("Converted value: %.20Lf\n", value);
    }

    return 0;
}

Here, strtold converts the string representation of pi to a long double.
The endptr helps detect if conversion occurred by comparing it to the
original string pointer. The precision of %.20Lf shows the long double's
extended precision. Always check endptr to verify successful conversion.

## Error Handling with strtold

This example shows proper error handling when using strtold.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *str = "invalid123.45";
    char *endptr;
    errno = 0;
    long double value = strtold(str, &amp;endptr);

    if (str == endptr) {
        printf("No digits were found\n");
    } else if (errno == ERANGE) {
        printf("Value out of range\n");
    } else {
        printf("Converted value: %Lf\n", value);
        printf("Remaining string: %s\n", endptr);
    }

    return 0;
}

This code demonstrates comprehensive error checking with strtold.
We check errno for range errors and endptr for conversion
success. The example intentionally uses an invalid string to show error detection.
Proper error handling is crucial when processing user input or external data.

## Hexadecimal Floating-Point Conversion

strtold supports hexadecimal floating-point notation as shown here.

hex_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "0x1.8p1";  // 1.5 * 2^1 = 3.0
    char *endptr;
    long double value = strtold(str, &amp;endptr);

    if (*endptr != '\0') {
        printf("Extra characters after number: %s\n", endptr);
    } else {
        printf("Hex float value: %Lf\n", value);
    }

    return 0;
}

This example converts a hexadecimal floating-point string to a long double.
The format 0x1.8p1 represents 1.5 (1 + 8/16) multiplied by 2^1.
Hexadecimal floating-point is useful in low-level programming and precise
specification of values. The endptr check verifies the entire string
was consumed.

## Locale-Aware Conversion

This example demonstrates locale-aware number conversion with strtold.

locale_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;locale.h&gt;

int main() {
    setlocale(LC_NUMERIC, "de_DE.UTF-8");
    const char *str = "1.234,56";  // German decimal format
    char *endptr;
    long double value = strtold(str, &amp;endptr);

    if (*endptr != '\0') {
        printf("Conversion stopped at: %s\n", endptr);
    } else {
        printf("Locale-aware value: %'Lf\n", value);
    }

    return 0;
}

Here, strtold attempts to parse a locale-specific number format.
Note that standard strtold typically expects period as decimal point.
For full locale support, consider strtod_l or manual preprocessing.
The example shows the importance of understanding your input's number format.

## Scientific Notation Conversion

This example shows strtold handling scientific notation.

scientific_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *str = "-6.02214076e23";
    char *endptr;
    errno = 0;
    long double value = strtold(str, &amp;endptr);

    if (errno == ERANGE) {
        printf("Value out of range\n");
    } else if (*endptr != '\0') {
        printf("Extra characters: %s\n", endptr);
    } else {
        printf("Avogadro's number: %Le\n", value);
    }

    return 0;
}

The code converts Avogadro's number from scientific notation to long double.
The %Le format specifier displays the result in scientific notation.
strtold correctly handles the sign, mantissa, and exponent components.
Range checking with errno is especially important for large exponents.

## Best Practices for Using strtold

- **Always check endptr:** Verify where conversion stopped in the input string.

- **Check errno for range errors:** Set errno to 0 before calling strtold.

- **Prefer strtold over atof:** atof provides no error detection capabilities.

- **Handle locale considerations:** Be aware of decimal point conventions.

- **Validate entire input:** Check if endptr points to expected position.

## Source

[C strtold Documentation](https://en.cppreference.com/w/c/string/byte/strtold)

This tutorial has explored the strtold function, from basic usage to
advanced considerations. Proper string-to-number conversion is essential for
robust input processing and data handling in C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).