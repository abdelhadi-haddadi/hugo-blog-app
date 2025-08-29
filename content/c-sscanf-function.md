+++
title = "C sscanf function"
date = 2025-08-27T23:22:23.607+01:00
draft = false
description = "Learn string parsing in C with this comprehensive sscanf tutorial. Explore format specifiers, practical examples, and best practices for safe string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C sscanf function

last modified April 6, 2025

String parsing is a crucial skill in C programming, allowing you to extract and
convert data from strings efficiently. The sscanf function is a
powerful tool for this purpose, offering various format specifiers to match your
needs. This tutorial explores sscanf in depth, explains its format
specifiers, and provides practical examples. Always prefer safe alternatives like
sscanf_s in secure environments to prevent buffer overflows.

## What Is sscanf?

The sscanf function reads formatted input from a string instead of
standard input. It takes three parameters: the input string, a format string,
and variable arguments where results are stored. The function returns the number
of successfully matched items. Unlike scanf, it's safer as it
doesn't read directly from user input. However, always validate the return value
to ensure proper parsing.

## Basic String Parsing

Let's start with a simple example that extracts basic data types from a string.

basic_parse.c
  

#include &lt;stdio.h&gt;

int main() {
    char input[] = "John 25 3.5";
    char name[20];
    int age;
    float height;

    int result = sscanf(input, "%s %d %f", name, &amp;age, &amp;height);

    if (result == 3) {
        printf("Name: %s\n", name);
        printf("Age: %d\n", age);
        printf("Height: %.1f\n", height);
    } else {
        printf("Failed to parse all items\n");
    }

    return 0;
}

This example demonstrates basic sscanf usage. The format string
"%s %d %f" matches a string, integer, and float from the input.
The result variable checks if all three items were parsed
successfully. Always include this validation to handle parsing errors
gracefully. The extracted values are then printed to confirm successful parsing.

## Parsing with Field Widths

Prevent buffer overflows by specifying maximum field widths when reading strings.

width_specifier.c
  

#include &lt;stdio.h&gt;

int main() {
    char input[] = "ProgrammingInC 42";
    char lang[15];  // Buffer for language name
    int version;

    int result = sscanf(input, "%14s %d", lang, &amp;version);

    if (result == 2) {
        printf("Language: %s\n", lang);
        printf("Version: %d\n", version);
    } else {
        printf("Parsing failed\n");
    }

    return 0;
}

The %14s format specifier limits string reading to 14 characters,
leaving room for the null terminator in our 15-character buffer. This is crucial
for security to prevent buffer overflows. The example also shows how to mix
different data types in a single sscanf call. Always match your
buffer sizes with field width specifiers for safety.

## Advanced Format Specifiers

Use advanced format specifiers to parse complex string patterns precisely.

advanced_format.c
  

#include &lt;stdio.h&gt;

int main() {
    char date_str[] = "2025-04-15";
    int year, month, day;

    int result = sscanf(date_str, "%d-%d-%d", &amp;year, &amp;month, &amp;day);

    if (result == 3) {
        printf("Year: %d\n", year);
        printf("Month: %d\n", month);
        printf("Day: %d\n", day);
    } else {
        printf("Date parsing failed\n");
    }

    return 0;
}

This example parses a date string with hyphen separators using multiple integer
specifiers. The format string "%d-%d-%d" exactly matches the input
structure. Note how the hyphens in the format string must match those in the
input for successful parsing. The return value check ensures all three date
components were extracted before using them.

## Skipping Characters

Learn how to skip unwanted characters during parsing using the asterisk modifier.

skip_characters.c
  

#include &lt;stdio.h&gt;

int main() {
    char log_entry[] = "Error: 404 - Not Found";
    int error_code;

    int result = sscanf(log_entry, "Error: %d - %*s", &amp;error_code);

    if (result == 1) {
        printf("Error code: %d\n", error_code);
    } else {
        printf("Failed to parse error code\n");
    }

    return 0;
}

The %*s format specifier with asterisk tells sscanf to
read but discard the string that follows. Here, we extract only the error code
while skipping the error message. The return value is 1 because only one item
(error_code) is stored. This technique is useful when you need only specific
parts of a formatted string.

## Secure Alternative: sscanf_s

For secure coding, use sscanf_s which requires buffer size parameters.

secure_sscanf.c
  

#define __STDC_WANT_LIB_EXT1__ 1
#include &lt;stdio.h&gt;

int main() {
    char input[] = "SecureCoding 123";
    char name[20];
    int value;

    int result = sscanf_s(input, "%s %d", name, (unsigned)sizeof(name), &amp;value);

    if (result == 2) {
        printf("Name: %s\n", name);
        printf("Value: %d\n", value);
    } else {
        printf("Secure parsing failed\n");
    }

    return 0;
}

The sscanf_s function is the secure version of sscanf,
requiring buffer size for string arguments. Note the #define needed
to enable this C11 feature. The size parameter (unsigned)sizeof(name)
prevents buffer overflows. While not universally available, it's recommended for
security-critical applications where available.

## Best Practices for Using sscanf

- **Check Return Values:** Always verify the number of successfully parsed items.

- **Use Field Widths:** Specify maximum widths for string conversions to prevent overflows.

- **Prefer Secure Versions:** Use sscanf_s when available for better security.

- **Validate Input:** Ensure the input string matches your expected format before parsing.

- **Handle Errors Gracefully:** Provide meaningful error messages when parsing fails.

## Source

[C sscanf Documentation](https://en.cppreference.com/w/c/io/fscanf)

This tutorial has demonstrated the versatility of sscanf for string
parsing in C, from basic extraction to advanced pattern matching. Proper use of
format specifiers and validation ensures robust and secure string processing in
your applications.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).