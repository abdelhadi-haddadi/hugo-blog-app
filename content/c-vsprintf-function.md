+++
title = "C vsprintf function"
date = 2025-08-27T23:22:38.040+01:00
draft = false
description = "Learn to use vsprintf in C with this comprehensive tutorial. Explore practical examples and best practices for formatted string output with variable arguments."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C vsprintf function

last modified April 6, 2025

Formatted string output is a cornerstone of C programming, enabling flexible text
generation. The vsprintf function provides powerful formatting
capabilities with variable arguments. This tutorial explores vsprintf
in depth, explains its relationship with va_list, and demonstrates
practical use cases. We'll also cover safer alternatives like
vsnprintf to prevent buffer overflows in production code.

## What Is vsprintf?

The vsprintf function formats and stores a series of characters in
a buffer, using a va_list argument list. It's the variable-argument
version of sprintf. The function takes a format string, a buffer,
and a va_list of arguments. Unlike sprintf, it's
designed for functions that accept variable arguments. However, it doesn't check
buffer size, making vsnprintf safer for most use cases.

## Basic vsprintf Example

This example demonstrates the fundamental usage of vsprintf to
format a string with variable arguments.

basic_vsprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void formatMessage(char *buffer, const char *format, ...) {
    va_list args;
    va_start(args, format);
    vsprintf(buffer, format, args);
    va_end(args);
}

int main() {
    char buffer[100];
    formatMessage(buffer, "Hello, %s! Today is %d-%02d-%02d.", 
                 "John", 2025, 4, 6);
    
    printf("%s\n", buffer);
    return 0;
}

The formatMessage function uses vsprintf to format a
string with variable arguments. va_start initializes the argument
list, and va_end cleans it up. The formatted string is stored in
the provided buffer. Note the fixed-size buffer (100 chars) which could overflow
if the formatted string exceeds this size.

## Safe Alternative with vsnprintf

This example shows the safer vsnprintf version that prevents buffer
overflows by specifying maximum length.

safe_vsnprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void safeFormat(char *buffer, size_t size, const char *format, ...) {
    va_list args;
    va_start(args, format);
    vsnprintf(buffer, size, format, args);
    va_end(args);
}

int main() {
    char buffer[20];
    safeFormat(buffer, sizeof(buffer), "The answer is %d", 42);
    
    printf("%s\n", buffer);
    return 0;
}

vsnprintf is the preferred choice as it limits the number of
characters written to the buffer. The second parameter specifies the buffer
size, preventing overflow. This example uses a small buffer (20 chars) to
demonstrate the safety mechanism. The function will truncate output if needed
rather than cause a buffer overflow.

## Creating a Custom printf Function

Learn how to create a wrapper function around vsprintf to implement
custom logging functionality.

custom_printf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;time.h&gt;

void logMessage(const char *format, ...) {
    char buffer[256];
    va_list args;
    
    // Get current time
    time_t now;
    time(&amp;now);
    char *time_str = ctime(&amp;now);
    time_str[strlen(time_str)-1] = '\0'; // Remove newline
    
    // Format the message
    va_start(args, format);
    vsprintf(buffer, format, args);
    va_end(args);
    
    printf("[%s] %s\n", time_str, buffer);
}

int main() {
    logMessage("Process started with PID: %d", 12345);
    logMessage("Warning: %s", "Low memory detected");
    return 0;
}

This example creates a logMessage function that prepends timestamps
to log messages. It uses vsprintf to format the variable arguments
and combines them with timestamp information. While useful for demonstration,
production code should use vsnprintf for safety. The timestamp is
obtained using time and formatted with ctime.

## Error Handling Function with vsprintf

Implement a reusable error reporting function using vsprintf to
format error messages consistently.

error_handler.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;stdlib.h&gt;

void errorExit(const char *format, ...) {
    char buffer[256];
    va_list args;
    
    va_start(args, format);
    vsprintf(buffer, format, args);
    va_end(args);
    
    fprintf(stderr, "ERROR: %s\n", buffer);
    exit(EXIT_FAILURE);
}

int main() {
    int value = -1;
    
    if (value &lt; 0) {
        errorExit("Invalid value %d (must be positive)", value);
    }
    
    return 0;
}

The errorExit function formats an error message using
vsprintf and exits the program. It writes to stderr
for proper error stream handling. This pattern is useful for consistent error
reporting throughout an application. Again, production code should use
vsnprintf to prevent potential buffer overflows in error messages.

## Building a String with Multiple vsprintf Calls

This example demonstrates how to build a complex string by making multiple
vsprintf calls to the same buffer.

multi_vsprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;string.h&gt;

void appendFormatted(char *buffer, const char *format, ...) {
    va_list args;
    size_t len = strlen(buffer);
    
    va_start(args, format);
    vsprintf(buffer + len, format, args);
    va_end(args);
}

int main() {
    char buffer[256] = "Report: ";
    
    appendFormatted(buffer, "System status: %s. ", "OK");
    appendFormatted(buffer, "CPU usage: %d%%. ", 42);
    appendFormatted(buffer, "Memory: %dMB free.", 1024);
    
    printf("%s\n", buffer);
    return 0;
}

The appendFormatted function appends formatted text to an existing
buffer by calculating the current length and writing at the correct offset. Each
call to vsprintf adds to the string. This technique is powerful but
requires careful buffer size management. The initial buffer is large enough (256
chars) to hold all expected content in this simple example.

## Best Practices for Using vsprintf

- **Prefer vsnprintf:** Always use vsnprintf in production code to prevent buffer overflows.

- **Validate Buffer Size:** Ensure your buffer is large enough for expected output plus null terminator.

- **Check Return Values:** vsprintf returns the number of characters written (excluding null).

- **Clean Up va_list:** Always pair va_start with va_end to avoid resource leaks.

- **Consider Alternatives:** For complex formatting, consider C++ streams or third-party libraries.

## Source

[C vsprintf Documentation](https://en.cppreference.com/w/c/io/vfprintf)

This tutorial has explored the vsprintf function and its safer
alternative vsnprintf. These functions are powerful tools for
formatted string generation with variable arguments. Remember to prioritize
safety by using buffer size checks in production code.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).