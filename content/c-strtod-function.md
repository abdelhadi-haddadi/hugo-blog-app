+++
title = "C strtod function"
date = 2025-08-27T23:22:31.405+01:00
draft = false
description = "Learn string to double conversion in C with this
comprehensive strtod tutorial. Explore usage, practical examples, and safer
alternatives for numeric conversions."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strtod function

last modified April 8, 2025

String to number conversion is a common task in C programming, and strtod
is the standard function for converting strings to double values. This tutorial
covers strtod in depth, including its syntax, usage, and error
handling. We'll explore practical examples and discuss why strtod
is safer than alternatives like atof. Understanding proper string
conversion helps prevent bugs and security vulnerabilities in your programs.

## What Is strtod?

The strtod function converts a string to a double-precision floating
point value. It's declared in stdlib.h and takes two parameters: the
string to convert and an optional pointer to store the end of the conversion.
strtod provides robust error handling and detects invalid input,
unlike atof which offers no error detection. For security-critical
code, always prefer strtod over simpler but unsafe alternatives.

## Basic strtod Usage

This example demonstrates basic string to double conversion using
strtod.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *str = "3.14159";
    char *endptr;
    double value = strtod(str, &amp;endptr);

    if (str == endptr) {
        printf("No conversion performed\n");
    } else {
        printf("Converted value: %f\n", value);
        printf("Remaining string: \"%s\"\n", endptr);
    }

    return 0;
}

Here, strtod converts the string "3.14159" to a double value. The
endptr points to the first character not converted. This allows
checking if conversion succeeded and what part of the string was processed.
Always check endptr to verify successful conversion. The function
handles leading whitespace automatically.

## Error Handling with strtod

This example shows how to detect and handle conversion errors.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    const char *str = "123.45abc";
    char *endptr;
    errno = 0;
    double value = strtod(str, &amp;endptr);

    if (str == endptr) {
        printf("No digits found\n");
    } else if (errno == ERANGE) {
        printf("Value out of range\n");
    } else {
        printf("Converted value: %f\n", value);
        printf("Stopped at: '%s'\n", endptr);
    }

    return 0;
}

This code demonstrates comprehensive error checking with strtod. We
check errno for range errors and compare str with
endptr to detect no-conversion cases. The example also shows how
strtod stops at the first invalid character. Always reset
errno before calling strtod for reliable error
detection.

## Converting Different Number Formats

strtod handles various number formats as shown in this example.

number_formats.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *examples[] = {
        "42", "-3.14", "1.23e4", "0x1.8p1", "inf", "NAN"
    };
    
    for (int i = 0; i &lt; 6; i++) {
        char *endptr;
        double value = strtod(examples[i], &amp;endptr);
        
        printf("String: \"%s\"\n", examples[i]);
        printf("Converted to: %f\n\n", value);
    }

    return 0;
}

This example shows strtod converting different number formats:
integers, negatives, scientific notation, hexadecimal floating-point, infinity,
and NaN. The function handles all these standard C floating-point
representations. Note that hexadecimal floating-point and special values like
infinity require C99 or later. The conversion is locale-independent for the
decimal point.

## Safe Alternative: strtod with Full Validation

This example demonstrates complete input validation using strtod.

full_validation.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;
#include &lt;ctype.h&gt;

int validate_double(const char *str, double *result) {
    char *endptr;
    errno = 0;
    *result = strtod(str, &amp;endptr);
    
    if (str == endptr) return 0; // No conversion
    if (errno == ERANGE) return 0; // Out of range
    
    // Skip whitespace after number
    while (isspace((unsigned char)*endptr)) endptr++;
    
    return *endptr == '\0'; // Valid if reached end of string
}

int main() {
    const char *input = "  123.45  ";
    double value;
    
    if (validate_double(input, &amp;value)) {
        printf("Valid number: %f\n", value);
    } else {
        printf("Invalid number format\n");
    }

    return 0;
}

This robust validation function checks for complete number conversion with
strtod. It handles leading/trailing whitespace, range errors, and
ensures the entire string was consumed. The function returns 1 for valid numbers
and 0 for invalid input. This approach is recommended when processing untrusted
input or user-provided data. It's more secure than atof which
provides no error detection.

## Parsing Multiple Numbers from a String

This example shows how to extract multiple numbers from a string using
strtod.

multiple_numbers.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    const char *data = "12.5, 7.8, 3.14, 9.99";
    const char *ptr = data;
    char *endptr;
    
    while (*ptr != '\0') {
        double value = strtod(ptr, &amp;endptr);
        
        if (ptr == endptr) break; // No conversion
        
        printf("Found number: %f\n", value);
        
        // Move past the number and any separators
        ptr = endptr;
        while (*ptr == ',' || isspace(*ptr)) ptr++;
    }

    return 0;
}

Here, strtod is used in a loop to extract all numbers from a
comma-separated string. The endptr is used to advance through the
string after each conversion. This technique is useful for parsing configuration
files or user input containing multiple values. The code skips commas and
whitespace between numbers. Always check if ptr advanced to detect
conversion failures.

## Best Practices for Using strtod

- **Always check endptr:** Verify conversion occurred by comparing with input string.

- **Reset errno before calling:** Clear previous errors for reliable range detection.

- **Prefer over atof:** strtod provides error handling that atof lacks.

- **Validate entire input:** Check if endptr points to expected position.

- **Handle locale considerations:** Decimal point behavior may vary by locale.

## Source

[C strtod Documentation](https://en.cppreference.com/w/c/string/byte/strtod)

This tutorial has explored the strtod function, from basic usage to
advanced validation techniques. Proper string-to-number conversion is essential
for robust, secure C programs. Always prefer strtod over simpler
alternatives when input validation matters.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).