+++
title = "C strerror function"
date = 2025-08-27T23:22:26.967+01:00
draft = false
description = "Learn error message handling in C with this comprehensive strerror tutorial. Explore usage, practical examples, and safer alternatives for error reporting."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strerror function

last modified April 8, 2025

Error handling is crucial in C programming, and strerror is a
key function for converting error numbers to human-readable messages. This
tutorial covers strerror in depth, including its syntax, usage,
and thread-safe alternatives. We'll explore practical examples and discuss
best practices for error reporting. Understanding strerror helps
create more robust and user-friendly applications.

## What Is strerror?

The strerror function converts error numbers to descriptive
strings. It's declared in string.h and takes one parameter: the
error number. The function returns a pointer to a static string describing
the error. For thread-safe code, consider strerror_r which stores
the message in a user-provided buffer. Always use the returned string
immediately or copy it to avoid overwrites.

## Basic strerror Usage

This example demonstrates converting a common error number to a message.

basic_error.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

int main() {
    // Set errno to a common error
    errno = ENOENT;
    
    // Get error message
    char *msg = strerror(errno);
    
    printf("Error %d: %s\n", errno, msg);
    
    return 0;
}

Here, strerror converts the ENOENT error number to
a descriptive string. The errno.h header provides standard error
numbers. The returned string is static and may be overwritten by subsequent
calls. This is the simplest way to get error descriptions in C programs.

## Using strerror with File Operations

This example shows strerror used with file operations.

file_error.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    
    if (fp == NULL) {
        printf("Failed to open file: %s\n", strerror(errno));
        return 1;
    }
    
    fclose(fp);
    return 0;
}

When fopen fails, errno is set to indicate the
error. strerror converts this to a readable message. This pattern
is common in file operations and system calls. Always check return values and
use errno for detailed error information. The message helps users
understand what went wrong.

## Thread-Safe Alternative: strerror_r

This example demonstrates the thread-safe strerror_r function.

threadsafe_error.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

int main() {
    char buf[256];
    
    // Get thread-safe error message
    strerror_r(EPERM, buf, sizeof(buf));
    
    printf("Error %d: %s\n", EPERM, buf);
    
    return 0;
}

strerror_r stores the error message in the provided buffer,
making it safe for multithreaded programs. The function takes the error
number, buffer, and buffer size. This prevents issues with static buffers
used by strerror. Always ensure the buffer is large enough for
the complete error message.

## Listing Common Error Messages

This example displays messages for several standard error numbers.

list_errors.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;

int main() {
    int errors[] = {EACCES, EAGAIN, EBADF, EEXIST, EINTR};
    int count = sizeof(errors)/sizeof(errors[0]);
    
    for (int i = 0; i &lt; count; i++) {
        printf("Error %d: %s\n", errors[i], strerror(errors[i]));
    }
    
    return 0;
}

The program lists messages for five common error numbers. The array contains
standard error codes from errno.h. This demonstrates how
strerror can help document possible error conditions. Note that
the exact messages may vary slightly between systems. This technique is useful
for debugging and logging.

## Custom Error Handling with strerror

This example shows a custom error handling function using strerror.

custom_error.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;errno.h&gt;
#include &lt;stdarg.h&gt;

void log_error(const char *format, ...) {
    va_list args;
    va_start(args, format);
    
    vfprintf(stderr, format, args);
    fprintf(stderr, ": %s\n", strerror(errno));
    
    va_end(args);
}

int main() {
    FILE *fp = fopen("/root/file.txt", "w");
    
    if (fp == NULL) {
        log_error("Failed to open protected file");
        return 1;
    }
    
    fclose(fp);
    return 0;
}

The log_error function combines custom messages with system
error information. It uses variable arguments for flexible formatting.
strerror appends the system error description. This creates
more informative error messages than either part alone. Such functions are
valuable in larger applications for consistent error reporting.

## Best Practices for Using strerror

- **Use immediately or copy:** The string pointer may be invalidated by subsequent calls.

- **Prefer strerror_r in threads:** The standard version isn't thread-safe.

- **Check errno promptly:** System calls may overwrite it.

- **Combine with perror:** For simple cases, perror may be more convenient.

- **Handle unknown errors:** Some numbers may not have standard messages.

## Source

[C strerror Documentation](https://en.cppreference.com/w/c/string/byte/strerror)

This tutorial has explored the strerror function, from basic
usage to advanced considerations. Proper error handling makes programs more
reliable and user-friendly. Always consider thread safety and message
persistence when implementing error reporting.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).