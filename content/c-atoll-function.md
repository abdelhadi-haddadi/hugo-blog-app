+++
title = "C atoll function"
date = 2025-08-29T19:49:50.590+01:00
draft = false
description = "Learn string to long long conversion in C with this comprehensive atoll tutorial. Explore usage, practical examples, and safer alternatives for string conversion."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C atoll function

last modified April 8, 2025

String to number conversion is a common task in C programming, and atoll is a
function for converting strings to long long integers. This tutorial covers
atoll in depth, including its syntax, usage, and limitations. We'll explore
practical examples and discuss safer alternatives like strtoll for
critical applications. Understanding string conversion functions helps handle
user input and configuration data safely and reliably.

## What Is atoll?

The atoll function converts a string to a long long integer. It's declared in
stdlib.h and takes one parameter: the string to convert.
atoll skips whitespace, then converts subsequent characters to a number.
It has no error detection, returning 0 for invalid inputs. For robust code,
consider strtoll which provides error checking and supports different
bases.

## Basic atoll Usage

This example demonstrates basic string to long long conversion using
atoll.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char num_str[] = "123456789012345";
    long long num = atoll(num_str);

    printf("String: %s\n", num_str);
    printf("Converted number: %lld\n", num);

    return 0;
}

Here, atoll converts the string "123456789012345" to its numeric
equivalent. The function handles large numbers that fit in a long long. Note
that atoll doesn't detect overflow - values too large will wrap
around. Always validate input strings before conversion when using
atoll in production code.

## Handling Invalid Input

This example shows atoll's behavior with invalid input strings.

invalid_input.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char invalid1[] = "abc123";
    char invalid2[] = "";
    char partial[] = "123abc";

    printf("'%s' -&gt; %lld\n", invalid1, atoll(invalid1));
    printf("'%s' -&gt; %lld\n", invalid2, atoll(invalid2));
    printf("'%s' -&gt; %lld\n", partial, atoll(partial));

    return 0;
}

atoll returns 0 for completely non-numeric strings and empty strings.
For strings starting with numbers, it converts the leading numeric portion.
This behavior can mask errors, making strtoll preferable for robust
input validation. Always check input strings when using atoll to
ensure they contain valid numeric data.

## Safe Alternative: strtoll

This example demonstrates the safer strtoll function with error checking.

safe_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    char num_str[] = "12345678901234567890";
    char *endptr;
    long long num;

    errno = 0;
    num = strtoll(num_str, &amp;endptr, 10);

    if (errno == ERANGE) {
        printf("Number out of range\n");
    } else if (endptr == num_str) {
        printf("No digits found\n");
    } else if (*endptr != '\0') {
        printf("Extra characters after number\n");
    } else {
        printf("Converted number: %lld\n", num);
    }

    return 0;
}

strtoll provides robust error checking through errno and
the endptr parameter. It detects overflow (setting ERANGE),
invalid input, and trailing characters. The third parameter specifies the
numeric base (10 for decimal). For production code, strtoll is
recommended over atoll due to its comprehensive error handling.

## Converting Different Bases

This example shows how to convert numbers from different bases using
strtoll.

different_bases.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char hex_str[] = "1a3f";
    char bin_str[] = "1011";
    char oct_str[] = "755";

    long long hex_num = strtoll(hex_str, NULL, 16);
    long long bin_num = strtoll(bin_str, NULL, 2);
    long long oct_num = strtoll(oct_str, NULL, 8);

    printf("Hex '%s' -&gt; %lld\n", hex_str, hex_num);
    printf("Binary '%s' -&gt; %lld\n", bin_str, bin_num);
    printf("Octal '%s' -&gt; %lld\n", oct_str, oct_num);

    return 0;
}

strtoll can convert numbers from various bases by changing the third
parameter. Base 16 handles hexadecimal, base 2 binary, and base 8 octal. Base 0
interprets the prefix (0x for hex, 0 for octal). This flexibility makes
strtoll more versatile than atoll, which only handles
decimal numbers. Always specify the correct base for accurate conversions.

## Handling Large Numbers

This example demonstrates atoll with very large numbers.

large_numbers.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;limits.h&gt;

int main() {
    char max_ll[] = "9223372036854775807";
    char overflow[] = "9223372036854775808";

    long long num1 = atoll(max_ll);
    long long num2 = atoll(overflow);

    printf("Max long long: %lld\n", num1);
    printf("Overflow value: %lld\n", num2);
    printf("LLONG_MAX: %lld\n", LLONG_MAX);

    return 0;
}

atoll converts the maximum 64-bit signed integer correctly but
produces undefined behavior for larger values. The overflow case may return
LLONG_MIN or wrap around. Unlike strtoll,
atoll provides no way to detect overflow. For handling large numbers
safely, always prefer strtoll with proper error checking.

## Best Practices for String Conversion

- **Prefer strtoll:** Use strtoll for robust error checking.

- **Validate input:** Check strings before conversion when using atoll.

- **Handle overflow:** Be aware that atoll doesn't detect overflow.

- **Check for trailing characters:** strtoll's endptr helps detect them.

- **Consider locale:** Some locales use different digit characters.

## Source

[C atoll Documentation](https://en.cppreference.com/w/c/string/byte/atoll)

This tutorial has explored the atoll function, from basic usage to
its limitations. While simple, always consider safer alternatives like
strtoll for production code where input validation and error
handling are important.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).