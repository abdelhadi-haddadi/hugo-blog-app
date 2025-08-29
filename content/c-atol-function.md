+++
title = "C atol function"
date = 2025-08-27T23:22:06.360+01:00
draft = false
description = "Learn string to long conversion in C with this
comprehensive atol tutorial. Explore usage, practical examples, and safer
alternatives for string conversion."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C atol function

last modified April 8, 2025

String conversion is fundamental in C programming, and atol is a
function for converting strings to long integers. This tutorial covers
atol in depth, including its syntax, usage, and limitations.
We'll explore practical examples and discuss safer alternatives like
strtol. Understanding string conversion helps handle user input
and configuration data while maintaining program safety.

## What Is atol?

The atol function converts a string to a long integer. It's declared
in stdlib.h and takes one parameter: the string to convert.
atol skips whitespace, then converts subsequent characters until
it encounters non-numeric data. It has no error detection, returning 0 for
invalid inputs. For robust code, prefer strtol which provides
error checking and supports different bases.

## Basic atol Usage

This example demonstrates converting a simple numeric string using
atol.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char num_str[] = "12345";
    long result = atol(num_str);

    printf("String: %s\n", num_str);
    printf("Converted long: %ld\n", result);

    return 0;
}

Here, atol converts the string "12345" to the long integer 12345.
The function handles leading whitespace automatically. This is simple but lacks
error checking. If num_str contained non-numeric characters,
atol would stop converting at the first invalid character.

## Handling Invalid Input

This example shows atol's behavior with invalid input.

invalid_input.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char input1[] = "42abc";
    char input2[] = "abc42";
    char input3[] = "   -123";

    printf("\"%s\" → %ld\n", input1, atol(input1));
    printf("\"%s\" → %ld\n", input2, atol(input2));
    printf("\"%s\" → %ld\n", input3, atol(input3));

    return 0;
}

This demonstrates atol's limitations. It converts "42abc" to 42,
ignoring letters after numbers. "abc42" returns 0 as conversion fails at the
first character. The function correctly handles "-123" with leading whitespace.
These behaviors show why atol is unsafe for validating user input.

## Safe Alternative: strtol

This example demonstrates the safer strtol function.

safe_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    char input[] = "123xyz";
    char *endptr;
    long result;

    errno = 0;
    result = strtol(input, &amp;endptr, 10);

    if (errno != 0) {
        perror("Conversion error");
        return 1;
    }

    if (endptr == input) {
        printf("No digits found\n");
        return 1;
    }

    printf("Converted: %ld\n", result);
    printf("Remaining: %s\n", endptr);

    return 0;
}

strtol provides robust error checking through errno and
the endptr parameter. It detects conversion errors and partial
conversions. The base parameter (10 here) supports different number systems.
This makes strtol suitable for validating user input and
configuration files where atol would be unsafe.

## Converting Large Numbers

This example shows atol handling large numbers and overflow.

large_numbers.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;limits.h&gt;

int main() {
    char max_long[] = "2147483647";   // LONG_MAX typically
    char overflow[] = "99999999999999999999";

    printf("Max long: %ld\n", atol(max_long));
    printf("Overflow: %ld\n", atol(overflow));

    return 0;
}

atol cannot detect overflow - it returns undefined values when
numbers exceed LONG_MAX. The first conversion works correctly,
but the second produces implementation-defined results, often LONG_MAX.
strtol sets errno to ERANGE for overflow,
making it the better choice for large number handling.

## Practical File Parsing Example

This example shows atol in a file parsing context.

file_parsing.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *file = fopen("data.txt", "r");
    if (!file) {
        perror("Failed to open file");
        return 1;
    }

    char buffer[100];
    long total = 0;

    while (fgets(buffer, sizeof(buffer), file)) {
        total += atol(buffer);
    }

    fclose(file);
    printf("Total: %ld\n", total);

    return 0;
}

This simple file parser uses atol to sum numbers from a file.
It assumes each line contains a valid number. In production code,
strtol would be better for error handling. The example shows
atol's convenience in controlled environments where input
format is guaranteed.

## Best Practices for String Conversion

- **Prefer strtol:** Use strtol for robust error checking.

- **Validate input:** Check strings before conversion when using atol.

- **Handle overflow:** Be aware atol doesn't detect numeric overflow.

- **Consider alternatives:** For floating-point, use strtod instead.

- **Check environment:** atol may be acceptable in trusted contexts.

## Source

[C atol Documentation](https://en.cppreference.com/w/c/string/byte/atol)

This tutorial has explored the atol function, from basic usage to
its limitations. While convenient, always consider safer alternatives like
strtol for production code where input validation matters.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).