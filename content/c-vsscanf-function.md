+++
title = "C vsscanf function"
date = 2025-08-29T19:50:22.605+01:00
draft = false
description = "Learn string parsing in C with this comprehensive vsscanf tutorial. Explore format specifiers, practical examples, and best practices for efficient string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C vsscanf function

last modified May 15, 2025

String parsing is a crucial skill in C programming, enabling you to extract data
from formatted strings efficiently. The vsscanf function provides
powerful string scanning capabilities with variable arguments. This tutorial
explains vsscanf in depth, covering its syntax, format specifiers,
and practical applications. Learn to parse complex string data safely and
effectively with comprehensive examples and best practices.

## What Is vsscanf?

The vsscanf function is a variant of sscanf that
accepts a va_list argument instead of variable arguments. It reads
formatted input from a string, similar to scanf, but with the
flexibility of variable argument lists. This function is declared in
stdarg.h and is particularly useful when creating wrapper functions
for string parsing. Always validate input and buffer sizes to prevent security
vulnerabilities.

## Basic vsscanf Syntax

The function prototype for vsscanf is:

int vsscanf(const char *str, const char *format, va_list arg);

Parameters:

- str: The input string to parse

- format: Format string specifying expected input

- arg: Variable argument list (va_list)

The function returns the number of successfully matched and assigned input items.
A return value of EOF indicates a read error occurred before any
matching. Note that vsscanf doesn't modify the original string.

## Simple vsscanf Example

This basic example demonstrates how to use vsscanf to parse integers
from a string.

simple_vsscanf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;string.h&gt;

void parse_numbers(const char *str, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    
    int result = vsscanf(str, fmt, args);
    printf("Parsed %d values\n", result);
    
    va_end(args);
}

int main() {
    const char *data = "10 20 30";
    int a, b, c;
    
    parse_numbers(data, "%d %d %d", &amp;a, &amp;b, &amp;c);
    printf("Values: %d, %d, %d\n", a, b, c);
    
    return 0;
}

This example shows a wrapper function parse_numbers that uses
vsscanf to parse three integers from a string. The
va_start macro initializes the variable argument list, which is
then passed to vsscanf. After parsing, va_end cleans
up the argument list. The function returns the count of successfully parsed
values.

## Parsing Different Data Types

vsscanf can handle various data types using appropriate format
specifiers. This example demonstrates parsing multiple data types from a string.

multi_type_vsscanf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void parse_data(const char *str, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    
    int count = vsscanf(str, fmt, args);
    printf("Successfully parsed %d items\n", count);
    
    va_end(args);
}

int main() {
    const char *input = "John 25 78.5 A";
    char name[20];
    int age;
    float score;
    char grade;
    
    parse_data(input, "%19s %d %f %c", &amp;name, &amp;age, &amp;score, &amp;grade);
    printf("Name: %s\nAge: %d\nScore: %.1f\nGrade: %c\n", 
           name, age, score, grade);
    
    return 0;
}

This example parses a string containing a name (string), age (integer), score
(float), and grade (character). Note the use of %19s to prevent
buffer overflow by limiting string input to 19 characters plus the null
terminator. Always specify maximum widths for string inputs to ensure safety.
The function reports how many items were successfully parsed.

## Advanced Format Specifiers

vsscanf supports advanced format specifiers for precise parsing.
This example demonstrates scanning with width specifiers and pattern matching.

advanced_format_vsscanf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void advanced_parse(const char *str, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    
    int result = vsscanf(str, fmt, args);
    if (result == EOF) {
        printf("Parsing failed\n");
    } else {
        printf("Matched %d items\n", result);
    }
    
    va_end(args);
}

int main() {
    const char *log_entry = "[2023-05-15 14:30:45] ERROR: File not found";
    int year, month, day, hour, min, sec;
    char level[10], message[50];
    
    advanced_parse(log_entry, "[%d-%d-%d %d:%d:%d] %9[^:]: %49[^\n]", 
                  &amp;year, &amp;month, &amp;day, &amp;hour, &amp;min, &amp;sec, level, message);
    
    printf("Date: %d-%02d-%02d\nTime: %02d:%02d:%02d\n"
           "Level: %s\nMessage: %s\n", 
           year, month, day, hour, min, sec, level, message);
    
    return 0;
}

This example parses a complex log entry format using advanced specifiers. The
%[^:] format matches all characters until a colon is encountered,
while %[^\n] matches until a newline. Width specifiers (%9
and %49) prevent buffer overflows. The function handles date, time,
log level, and message extraction in a single operation, demonstrating
vsscanf's powerful pattern matching capabilities.

## Error Handling with vsscanf

Proper error handling is crucial when parsing input. This example shows how to
validate vsscanf results and handle parsing errors.

error_handling_vsscanf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;stdbool.h&gt;

bool safe_parse(const char *str, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    
    int expected, actual;
    // First count the expected number of conversions
    for (expected = 0; fmt[expected]; ) {
        if (fmt[expected++] == '%' &amp;&amp; fmt[expected] != '%' &amp;&amp;      
            fmt[expected] != '*') {
            expected++;
        }
    }
    
    actual = vsscanf(str, fmt, args);
    va_end(args);
    
    return actual == expected;
}

int main() {
    const char *good_input = "42 3.14 hello";
    const char *bad_input = "42 not_a_float hello";
    
    int num;
    float f;
    char str[20];
    
    if (safe_parse(good_input, "%d %f %19s", &amp;num, &amp;f, str)) {
        printf("Good parse: %d, %.2f, %s\n", num, f, str);
    } else {
        printf("Failed to parse good input\n");
    }
    
    if (safe_parse(bad_input, "%d %f %19s", &amp;num, &amp;f, str)) {
        printf("Parsed bad input (unexpected)\n");
    } else {
        printf("Correctly rejected bad input\n");
    }
    
    return 0;
}

This example implements a safer parsing function that verifies the expected
number of conversions matches the actual count. The safe_parse
function first counts the format specifiers in the format string, then compares
this with vsscanf's return value. This approach helps detect
partial or failed parsing attempts. Always validate parsing results before using
the extracted values in your program.

## Building a Custom Parser with vsscanf

vsscanf is excellent for creating custom parsers. This example shows
a configuration file parser using vsscanf.

config_parser_vsscanf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;string.h&gt;
#include &lt;stdbool.h&gt;

bool parse_config_line(const char *line, const char *key, 
                      const char *fmt, void *value) {
    char current_key[50];
    va_list args;
    
    // First try to match the key
    if (vsscanf(line, " %49[^= \t] = %[^\n]", current_key, (char *)value) != 2) {
        return false;
    }
    
    if (strcmp(current_key, key) != 0) {
        return false;
    }
    
    // If format specified, parse the value properly
    if (fmt) {
        va_start(args, value);
        int result = vsscanf((char *)value, fmt, args);
        va_end(args);
        return result == 1;
    }
    
    return true;
}

int main() {
    const char *config = "width = 1024\nheight = 768\ntitle = My Application";
    int width, height;
    char title[50];
    
    char *line = strtok((char *)config, "\n");
    while (line) {
        if (parse_config_line(line, "width", "%d", &amp;width)) {
            printf("Found width: %d\n", width);
        }
        else if (parse_config_line(line, "height", "%d", &amp;height)) {
            printf("Found height: %d\n", height);
        }
        else if (parse_config_line(line, "title", "%49[^\n]", title)) {
            printf("Found title: %s\n", title);
        }
        
        line = strtok(NULL, "\n");
    }
    
    return 0;
}

This example demonstrates building a configuration file parser using
vsscanf. The parse_config_line function handles
key-value pairs separated by equals signs. It first extracts the key and value as
strings, then optionally parses the value according to a specified format. The
parser supports different data types and provides flexible configuration
handling. This approach can be extended to handle more complex file formats.

## Best Practices for Using vsscanf

- **Validate Input Length:** Always check that input strings are properly terminated and within expected bounds.

- **Use Width Specifiers:** Prevent buffer overflows by specifying maximum widths for string conversions.

- **Check Return Values:** Verify the number of successfully parsed items matches expectations.

- **Consider Alternatives:** For complex parsing, consider using strtok or regular expressions instead.

- **Handle Errors Gracefully:** Provide meaningful error messages when parsing fails.

## Source

[C vsscanf Documentation](https://en.cppreference.com/w/c/io/vfscanf)

This tutorial has explored the vsscanf function in depth, from
basic usage to advanced parsing techniques. Mastering vsscanf
enables you to create flexible and powerful string parsing routines in your C
programs. Remember to always prioritize safety when parsing untrusted input.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).