+++
title = "C vfprintf function"
date = 2025-08-29T19:50:19.633+01:00
draft = false
description = "Learn about vfprintf in C with this comprehensive tutorial. Explore variable argument handling, practical examples, and best practices for formatted output."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C vfprintf function

last modified April 6, 2025

Formatted output is essential in C programming for creating readable and
structured data. The vfprintf function provides powerful
capabilities for writing formatted output to files with variable arguments.
This tutorial explores vfprintf in depth, explaining its
relationship with va_list and demonstrating practical use cases.
Understanding vfprintf helps create flexible output functions.

## What Is vfprintf?

The vfprintf function writes formatted output to a file stream
using a variable argument list. It's declared in stdio.h and
requires three parameters: a file pointer, format string, and va_list
argument. This function is particularly useful when creating wrapper functions
for printf-style output. Always ensure proper initialization of
the va_list before passing it to vfprintf.

## Basic vfprintf Example

This example demonstrates the fundamental usage of vfprintf with
variable arguments.

basic_vfprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void write_log(FILE *fp, const char *format, ...) {
    va_list args;
    va_start(args, format);
    vfprintf(fp, format, args);
    va_end(args);
}

int main() {
    FILE *fp = fopen("log.txt", "w");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    write_log(fp, "Log entry: %s, error code: %d\n", "File not found", 404);
    fclose(fp);
    return 0;
}

This code creates a write_log function that accepts variable
arguments. The va_start macro initializes the argument list, which
is then passed to vfprintf. The format string specifies how to
interpret the arguments. Finally, va_end cleans up the argument
list. The result is written to "log.txt".

## Creating a Custom printf Function

Learn how to create a custom printf-like function using vfprintf.

custom_printf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void my_printf(const char *format, ...) {
    va_list args;
    va_start(args, format);
    vfprintf(stdout, format, args);
    va_end(args);
}

int main() {
    my_printf("Custom printf: %s %d %f\n", "Test", 42, 3.14);
    return 0;
}

Here, my_printf mimics the standard printf by using
vfprintf with stdout as the output stream. The
variable arguments are processed according to the format string. This pattern is
useful for creating specialized output functions with custom behavior.

## Error Logging with vfprintf

Implement a robust error logging system using vfprintf to write to
both file and console.

error_logger.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;time.h&gt;

void log_error(FILE *fp, const char *format, ...) {
    time_t now;
    time(&amp;now);
    fprintf(fp, "[%.24s] ", ctime(&amp;now));

    va_list args;
    va_start(args, format);
    vfprintf(fp, format, args);
    va_end(args);

    // Also print to stderr
    va_start(args, format);
    vfprintf(stderr, format, args);
    va_end(args);
}

int main() {
    FILE *fp = fopen("errors.log", "a");
    if (!fp) {
        perror("Failed to open log file");
        return 1;
    }

    log_error(fp, "Critical error: %s\n", "Disk full");
    fclose(fp);
    return 0;
}

This example shows a comprehensive error logging function. It first writes a
timestamp, then uses vfprintf to output the formatted error
message to both a log file and stderr. The va_list is
reused for both outputs. This approach ensures consistent error reporting
across multiple destinations.

## Formatting Different Data Types

Demonstrate vfprintf's ability to handle various data types in a
single function call.

multi_format.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void print_data(FILE *fp, const char *format, ...) {
    va_list args;
    va_start(args, format);
    vfprintf(fp, format, args);
    va_end(args);
}

int main() {
    FILE *fp = fopen("data.txt", "w");
    if (!fp) {
        perror("Failed to open file");
        return 1;
    }

    print_data(fp, "Integer: %d\nFloat: %.2f\nString: %s\n", 
               42, 3.14159, "Hello");
    fclose(fp);
    return 0;
}

The print_data function accepts multiple data types through the
format string. vfprintf correctly interprets each format specifier
(%d, %f, %s) and processes the
corresponding arguments. This flexibility makes vfprintf ideal for
functions that need to handle diverse data types.

## Safe vs Unsafe Functions

When working with vfprintf, consider security implications. The
standard vfprintf is vulnerable to format string attacks if user
input is used as the format string. For safer alternatives, consider:

- vfprintf_s (C11 Annex K) which performs runtime checks

- Validating format strings before passing them to vfprintf

- Never using untrusted input as a format string

- Using constant format strings when possible

- Checking return values for error conditions

## Best Practices for Using vfprintf

- **Initialize va_list properly:** Always use va_start before and va_end after vfprintf.

- **Validate file pointers:** Ensure the FILE pointer is valid before calling vfprintf.

- **Use constant format strings:** When possible, use string literals for format strings to prevent vulnerabilities.

- **Check return values:** vfprintf returns the number of characters written or negative for errors.

- **Consider thread safety:** In multithreaded programs, protect shared FILE pointers with synchronization mechanisms.

## Source

[C vfprintf Documentation](https://en.cppreference.com/w/c/io/vfprintf)

This tutorial has explored the vfprintf function in C, demonstrating
its versatility in handling formatted output with variable arguments. From basic
usage to advanced logging systems, vfprintf provides powerful
capabilities for flexible output generation.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).