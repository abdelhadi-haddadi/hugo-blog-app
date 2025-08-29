+++
title = "C vprintf function"
date = 2025-08-27T23:22:36.947+01:00
draft = false
description = "Learn variable argument printing in C with this comprehensive vprintf tutorial. Explore usage, practical examples, and best practices for flexible output operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C vprintf function

last modified April 6, 2025

Variable argument handling is a powerful feature in C programming, enabling
flexible formatted output functions. The vprintf function is a
variadic version of printf that accepts a va_list
argument. This tutorial explains vprintf in depth, demonstrates
its usage, and provides practical examples. Understanding vprintf
helps you create custom formatted output functions and handle variable arguments
safely.

## What Is vprintf?

The vprintf function in C performs formatted output like
printf, but takes a va_list instead of variable
arguments. It's declared in stdarg.h and follows the same format
specifier rules as printf. This function is particularly useful
when creating wrapper functions around printf with variable
arguments. Always ensure proper initialization of va_list before
use and clean it up with va_end.

## Basic vprintf Example

This example demonstrates the fundamental usage of vprintf with
variable arguments.

basic_vprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void print_message(const char *format, ...) {
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
}

int main() {
    print_message("Hello, %s! You have %d new messages.\n", 
                 "John", 3);
    return 0;
}

Here, print_message is a wrapper function that accepts variable
arguments. The va_start macro initializes args to
point to the first variable argument. vprintf processes the format
string and arguments just like printf. Finally,
va_end cleans up the va_list.

## Creating a Custom Logging Function

This example shows how to create a logging function with timestamp using
vprintf.

custom_logger.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;time.h&gt;

void log_message(const char *format, ...) {
    time_t now;
    time(&amp;now);
    printf("[%.24s] ", ctime(&amp;now));
    
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
    
    printf("\n");
}

int main() {
    log_message("System started with %d%% memory available", 75);
    log_message("User %s logged in from IP %s", "admin", "192.168.1.1");
    return 0;
}

The log_message function prepends a timestamp to each log entry
using ctime. It then uses vprintf to handle the
variable arguments and format string. This pattern is common in logging systems
where you want consistent formatting across all log messages.

## Error Reporting Function

This example demonstrates creating an error reporting function that writes to
both stderr and a log file using vprintf and
vfprintf.

error_reporting.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;stdlib.h&gt;

void report_error(FILE *logfile, const char *format, ...) {
    va_list args;
    
    // Print to stderr
    va_start(args, format);
    fprintf(stderr, "ERROR: ");
    vfprintf(stderr, format, args);
    fprintf(stderr, "\n");
    va_end(args);
    
    // Print to log file if provided
    if (logfile != NULL) {
        va_start(args, format);
        fprintf(logfile, "ERROR: ");
        vfprintf(logfile, format, args);
        fprintf(logfile, "\n");
        va_end(args);
    }
}

int main() {
    FILE *log = fopen("error.log", "a");
    if (log == NULL) {
        report_error(NULL, "Failed to open log file");
        return 1;
    }
    
    report_error(log, "Invalid input value: %d", 42);
    report_error(log, "Connection timeout after %d seconds", 30);
    
    fclose(log);
    return 0;
}

This report_error function demonstrates using vfprintf
(the file version of vprintf) to output to multiple destinations.
Note that we must call va_start and va_end for each
use of the variable arguments. The function checks if the log file pointer is
valid before attempting to write to it.

## Safe vs Unsafe Variadic Functions

This example compares safe and unsafe usage of variadic functions with
vprintf.

safe_vprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

// Unsafe: No way to verify argument types match format
void unsafe_print(const char *format, ...) {
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
}

// Safer: Use format string attribute to enable compiler checks
void safe_print(const char *format, ...) 
    __attribute__((format(printf, 1, 2)));

void safe_print(const char *format, ...) {
    va_list args;
    va_start(args, format);
    vprintf(format, args);
    va_end(args);
}

int main() {
    // Compiler will warn about this with safe_print:
    // safe_print("Number: %s\n", 42);  // Wrong format specifier
    
    unsafe_print("Number: %s\n", 42);  // Undefined behavior
    safe_print("Number: %d\n", 42);    // Correct usage
    return 0;
}

The example shows two versions of a print function. The unsafe version has no
protection against mismatched format specifiers and arguments. The safer version
uses the format attribute (GCC/clang extension) to enable compiler
checks. While vprintf itself is safe when used correctly, wrapper
functions should include validation to prevent undefined behavior.

## Formatting to a String Buffer

This example demonstrates using vsnprintf (the safe version of
vsprintf) to format into a string buffer.

string_formatting.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;string.h&gt;

int format_string(char *buffer, size_t size, const char *format, ...) {
    va_list args;
    va_start(args, format);
    int result = vsnprintf(buffer, size, format, args);
    va_end(args);
    
    if (result &gt;= size) {
        // Truncation occurred
        buffer[size - 1] = '\0';
        return -1;
    }
    
    return result;
}

int main() {
    char buffer[64];
    
    if (format_string(buffer, sizeof(buffer), "The answer is %d", 42) &gt;= 0) {
        printf("Formatted string: '%s'\n", buffer);
    }
    
    // Test truncation
    if (format_string(buffer, 10, "This is too long for the buffer") &lt; 0) {
        printf("String was truncated to: '%s'\n", buffer);
    }
    
    return 0;
}

The format_string function safely formats data into a buffer of
specified size using vsnprintf. It checks for truncation and
ensures the string is always null-terminated. This is much safer than
vsprintf, which doesn't check buffer bounds. The function returns
the number of characters written (excluding null terminator) or -1 if truncation
occurred.

## Best Practices for Using vprintf

- **Always pair va_start with va_end:** For every va_start, there must be a corresponding va_end.

- **Use vsnprintf for string formatting:** Prefer vsnprintf over vsprintf to prevent buffer overflows.

- **Enable compiler checks:** Use format string attributes when available to catch mismatches at compile time.

- **Validate format strings:** When accepting format strings from user input, validate them carefully.

- **Consider thread safety:** va_list is not inherently thread-safe; synchronize access if needed.

## Source

[C vprintf Documentation](https://en.cppreference.com/w/c/io/vfprintf)

This tutorial has explored the vprintf function and its variants,
demonstrating how to create flexible formatted output functions in C. By
understanding these techniques, you can build more robust and maintainable code
that handles variable arguments safely and efficiently.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).