+++
title = "C atoi function"
date = 2025-08-27T23:22:06.363+01:00
draft = false
description = "Learn string to integer conversion in C with this
comprehensive atoi tutorial. Explore usage, practical examples, and safer
alternatives for string conversion."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C atoi function

last modified April 8, 2025

String to integer conversion is a common task in C programming, and atoi is a
basic function for this purpose. This tutorial covers atoi in depth,
including its syntax, usage, and limitations. We'll explore practical examples
and discuss safer alternatives like strtol for robust applications.
Understanding string conversion functions helps handle user input and text data
effectively.

## What Is atoi?

The atoi function converts a string to an integer. It's declared in
stdlib.h and takes one parameter: the string to convert.
atoi skips whitespace, then converts subsequent characters until
it encounters a non-digit. It has no error detection - invalid input returns 0.
For robust code, prefer strtol which provides error checking and
supports different number bases.

## Basic atoi Usage

This example demonstrates converting a simple numeric string using
atoi.

basic_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char num_str[] = "12345";
    int num = atoi(num_str);

    printf("String: %s\n", num_str);
    printf("Integer: %d\n", num);

    return 0;
}

Here, atoi converts the string "12345" to the integer 12345.
The function handles leading whitespace automatically. This works well for
well-formed numeric strings. However, it provides no way to detect invalid
input. For user input or untrusted data, consider safer alternatives.

## Handling Invalid Input

This example shows atoi's behavior with invalid input.

invalid_input.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char invalid1[] = "abc123";
    char invalid2[] = "123abc";
    
    printf("\"%s\" converts to %d\n", invalid1, atoi(invalid1));
    printf("\"%s\" converts to %d\n", invalid2, atoi(invalid2));

    return 0;
}

atoi returns 0 for strings that don't start with digits ("abc123").
It converts leading digits but ignores trailing non-digits ("123abc" becomes 123).
This silent failure can cause bugs in programs. The function also doesn't detect
overflow - large numbers may return unexpected values.

## Safe Alternative: strtol

This example demonstrates the safer strtol function.

safe_conversion.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    char input[] = "123456789012345";
    char *endptr;
    long num;
    
    errno = 0;
    num = strtol(input, &amp;endptr, 10);
    
    if (errno == ERANGE) {
        printf("Number out of range\n");
    } else if (*endptr != '\0') {
        printf("Invalid characters in input\n");
    } else {
        printf("Converted number: %ld\n", num);
    }

    return 0;
}

strtol provides robust error checking. It sets errno on
overflow and returns a pointer to the first invalid character. The third parameter
specifies the number base (10 for decimal). This makes strtol
suitable for production code where input validation matters.

## Converting Multiple Numbers

This example shows how to convert multiple numbers from a string.

multiple_numbers.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char data[] = "42 99 17";
    int n1, n2, n3;
    
    n1 = atoi(data);
    n2 = atoi(data + 3);
    n3 = atoi(data + 6);
    
    printf("Numbers: %d, %d, %d\n", n1, n2, n3);

    return 0;
}

Here we convert three space-separated numbers by adjusting the pointer passed to
atoi. This works when the input format is known and consistent.
For more complex parsing, strtok combined with strtol
would be better. Always validate results when using atoi in this
way.

## Handling Negative Numbers

This example demonstrates atoi's handling of negative numbers.

negative_numbers.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char neg_str[] = "-32768";
    char pos_str[] = "+2147483647";
    
    printf("\"%s\" converts to %d\n", neg_str, atoi(neg_str));
    printf("\"%s\" converts to %d\n", pos_str, atoi(pos_str));

    return 0;
}

atoi correctly handles negative numbers and optional plus signs.
It follows the same conversion rules as positive numbers. However, it still
lacks overflow detection - very large negative numbers may wrap around.
For full range checking, strtol remains the better choice.

## Best Practices for String Conversion

- **Prefer strtol for safety:** Use strtol when input validation matters.

- **Check for overflow:** atoi silently overflows - dangerous for untrusted input.

- **Validate input first:** When using atoi, verify string format beforehand.

- **Consider strtoul for unsigned:** For unsigned integers, strtoul is available.

- **Handle base conversions:** strtol supports different bases (2-36).

## Source

[C atoi Documentation](https://en.cppreference.com/w/c/string/byte/atoi)

This tutorial has explored the atoi function, from basic usage to
its limitations. While simple, always consider safer alternatives for production
code where input validation and error detection are important.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).