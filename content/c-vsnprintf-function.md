+++
title = "C vsnprintf function"
date = 2025-08-27T23:22:38.034+01:00
draft = false
description = "Learn safe string formatting in C with this comprehensive vsnprintf tutorial. Explore practical examples and best practices for buffer-safe operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C vsnprintf function

last modified April 6, 2025

String formatting is a core operation in C programming, enabling dynamic text
creation. The vsnprintf function provides a safe way to format
strings with variable arguments while preventing buffer overflows. This tutorial
explains vsnprintf in depth, compares it to unsafe alternatives,
and provides practical examples. Understanding these functions is crucial for
writing secure, robust C applications that handle strings safely.

## What Is vsnprintf?

The vsnprintf function formats and stores a string with variable
arguments, similar to snprintf, but accepts a va_list
instead of variable arguments directly. It writes up to a specified buffer size,
preventing overflow. Always include stdarg.h for
va_list support. This function returns the number of characters that
would be written if the buffer were large enough, allowing size checks.

## Basic vsnprintf Example

This example demonstrates the fundamental usage of vsnprintf with a
custom formatting function.

basic_vsnprintf.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

void format_string(char *buffer, size_t size, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    vsnprintf(buffer, size, fmt, args);
    va_end(args);
}

int main() {
    char buffer[50];
    format_string(buffer, sizeof(buffer), "Hello, %s! You are %d years old.", 
                 "John", 30);
    printf("%s\n", buffer);
    return 0;
}

Here, format_string wraps vsnprintf for cleaner usage.
The va_list handles variable arguments safely. The buffer size is
explicitly passed to prevent overflow. The formatted string is then printed. This
pattern is common in logging or message formatting functions where safety is
critical.

## Safe String Formatting with vsnprintf

This example shows how to safely format strings while preventing buffer overflows.

safe_formatting.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;

int safe_format(char *buf, size_t size, const char *fmt, ...) {
    va_list args;
    va_start(args, fmt);
    int result = vsnprintf(buf, size, fmt, args);
    va_end(args);
    
    if (result &gt;= size) {
        // Buffer was too small, truncation occurred
        buf[size - 1] = '\0';
        return -1;
    }
    return result;
}

int main() {
    char small_buf[10];
    if (safe_format(small_buf, sizeof(small_buf), "Long string %d", 12345) == -1) {
        printf("Buffer too small!\n");
    }
    printf("Result: '%s'\n", small_buf);
    return 0;
}

The safe_format function checks if the formatted string fits in the
buffer by comparing the return value to the buffer size. If truncation occurs, it
ensures proper null-termination and returns an error code. This demonstrates how
vsnprintf helps prevent buffer overflows, a common security
vulnerability in C programs.

## Building a Logging Function

Create a flexible logging function using vsnprintf for formatted
output.

logging_function.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;time.h&gt;

void log_message(FILE *stream, const char *format, ...) {
    char buffer[256];
    va_list args;
    
    // Get current time
    time_t now = time(NULL);
    struct tm *tm_info = localtime(&amp;now);
    strftime(buffer, sizeof(buffer), "[%Y-%m-%d %H:%M:%S] ", tm_info);
    fputs(buffer, stream);
    
    // Format the message
    va_start(args, format);
    vsnprintf(buffer, sizeof(buffer), format, args);
    va_end(args);
    
    fputs(buffer, stream);
    fputc('\n', stream);
}

int main() {
    log_message(stdout, "System started with PID: %d", getpid());
    log_message(stderr, "Warning: %s", "Low memory detected");
    return 0;
}

This logging function combines timestamp formatting with message formatting using
vsnprintf. The fixed-size buffer ensures safety while the variable
arguments provide flexibility. The function can output to any FILE
stream, making it reusable for both standard output and error logging. This
pattern is widely used in production code.

## Implementing a String Builder

Build a dynamic string piece by piece using vsnprintf in this
advanced example.

string_builder.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

typedef struct {
    char *buffer;
    size_t size;
    size_t capacity;
} StringBuilder;

void sb_init(StringBuilder *sb, size_t initial_capacity) {
    sb-&gt;buffer = malloc(initial_capacity);
    sb-&gt;size = 0;
    sb-&gt;capacity = initial_capacity;
    if (sb-&gt;buffer) sb-&gt;buffer[0] = '\0';
}

void sb_appendf(StringBuilder *sb, const char *format, ...) {
    va_list args;
    va_start(args, format);
    
    // Determine required space
    int needed = vsnprintf(NULL, 0, format, args) + 1;
    va_end(args);
    
    // Resize if necessary
    if (sb-&gt;size + needed &gt; sb-&gt;capacity) {
        size_t new_capacity = sb-&gt;capacity * 2;
        while (sb-&gt;size + needed &gt; new_capacity) new_capacity *= 2;
        char *new_buffer = realloc(sb-&gt;buffer, new_capacity);
        if (!new_buffer) return;
        sb-&gt;buffer = new_buffer;
        sb-&gt;capacity = new_capacity;
    }
    
    // Actually format the string
    va_start(args, format);
    vsnprintf(sb-&gt;buffer + sb-&gt;size, sb-&gt;capacity - sb-&gt;size, format, args);
    va_end(args);
    
    sb-&gt;size += needed - 1;
}

int main() {
    StringBuilder sb;
    sb_init(&amp;sb, 64);
    
    sb_appendf(&amp;sb, "User: %s\n", "johndoe");
    sb_appendf(&amp;sb, "Score: %d\n", 95);
    sb_appendf(&amp;sb, "Average: %.2f\n", 87.5);
    
    printf("%s", sb.buffer);
    free(sb.buffer);
    return 0;
}

This string builder implementation uses vsnprintf twice: first to
measure the required space (with NULL buffer), then to actually format the
string. The dynamic buffer grows as needed, preventing overflow while
maintaining efficiency. This approach is useful when building complex strings
from multiple components, such as in template engines or serialization code.

## Error Handling Wrapper

Create a robust error handling function that safely formats error messages.

error_handler.c
  

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;errno.h&gt;

void set_error(char *err_buf, size_t err_size, int err_code, 
              const char *format, ...) {
    char message[256];
    va_list args;
    
    // Format the custom message
    va_start(args, format);
    vsnprintf(message, sizeof(message), format, args);
    va_end(args);
    
    // Include system error if applicable
    if (err_code != 0) {
        vsnprintf(err_buf, err_size, "%s: %s", message, strerror(err_code));
    } else {
        vsnprintf(err_buf, err_size, "%s", message);
    }
}

int main() {
    char error_message[256];
    FILE *fp = fopen("nonexistent.txt", "r");
    
    if (fp == NULL) {
        set_error(error_message, sizeof(error_message), errno,
                "Failed to open file");
        fprintf(stderr, "Error: %s\n", error_message);
        return 1;
    }
    
    fclose(fp);
    return 0;
}

This error handling function combines custom messages with system error
information safely using vsnprintf. The buffer size is strictly
enforced to prevent overflow. The function handles both custom-formatted
messages and system errors (when err_code is non-zero). This
pattern is especially useful in library code where error reporting needs to be
both flexible and safe.

## Why vsnprintf Over vsprintf?

- **Buffer Safety:** vsnprintf prevents overflow by limiting writes to buffer size.

- **Truncation Detection:** Return value indicates if output was truncated.

- **Security:** Eliminates risk of buffer overflow vulnerabilities.

- **Predictable Behavior:** Always null-terminates the output string.

- **Modern Practice:** Recommended in secure coding standards like CERT C.

## Best Practices for vsnprintf

- **Always Check Return Value:** Detect truncation or errors by examining the return value.

- **Include Null Terminator:** Remember that vsnprintf needs space for the null byte.

- **Use sizeof for Stack Buffers:** sizeof(buffer) is safer than hardcoded sizes.

- **Consider Two-Pass Approach:** First call with NULL buffer to determine required size.

- **Validate Inputs:** Check for NULL pointers or invalid format strings.

## Source

[C vsnprintf Documentation](https://en.cppreference.com/w/c/io/vfprintf)

This tutorial has explored the vsnprintf function in depth,
demonstrating its importance for safe string formatting in C. From basic usage
to advanced patterns like string builders and error handlers,
vsnprintf provides a robust foundation for secure text processing.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).