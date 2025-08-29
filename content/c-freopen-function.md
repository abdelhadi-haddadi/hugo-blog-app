+++
title = "C freopen function"
date = 2025-08-27T23:22:14.520+01:00
draft = false
description = "Learn stream redirection in C with this comprehensive freopen tutorial. Explore practical examples and best practices for efficient stream operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C freopen function

last modified April 6, 2025

Stream redirection is a powerful technique in C programming that allows you to
change the destination of standard streams. The freopen function
enables this redirection, offering flexibility in file handling. This tutorial
explores freopen in depth, explaining its parameters and providing
practical examples. Mastering stream redirection enhances your ability to manage
input/output operations efficiently in various scenarios.

## What Is freopen?

The freopen function in C reassociates an existing file stream with
a different file. It takes three parameters: filename, mode, and the stream to
redirect. Common streams include stdin, stdout, and
stderr. The function returns the new stream pointer or
NULL on failure. Always check the return value to ensure successful
redirection and restore original streams when needed.

## Redirecting stdout to a File

This example demonstrates how to redirect standard output to a file using
freopen.

redirect_stdout.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = freopen("output.txt", "w", stdout);
    
    if (fp == NULL) {
        perror("Failed to redirect stdout");
        return 1;
    }

    printf("This text goes to output.txt\n");
    fclose(fp);  // Restores stdout to original destination
    
    return 0;
}

Here, freopen redirects stdout to "output.txt" in
write mode ("w"). Subsequent printf calls write to the file instead
of the console. The function returns the new stream pointer, which we check for
errors. Closing the file with fclose restores the original
stdout destination.

## Redirecting stdin from a File

Learn how to read input from a file instead of the keyboard by redirecting
stdin.

redirect_stdin.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = freopen("input.txt", "r", stdin);
    
    if (fp == NULL) {
        perror("Failed to redirect stdin");
        return 1;
    }

    char buffer[100];
    fgets(buffer, sizeof(buffer), stdin);  // Reads from input.txt
    printf("Read from file: %s", buffer);
    
    fclose(fp);  // Restores stdin to original source
    return 0;
}

This code redirects stdin to read from "input.txt" using read mode
("r"). The fgets function then reads from the file instead of
waiting for keyboard input. After processing, fclose restores the
original stdin source. This technique is useful for automated
testing.

## Redirecting stderr to a File

Capture error messages in a file by redirecting the standard error stream.

redirect_stderr.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = freopen("errors.log", "w", stderr);
    
    if (fp == NULL) {
        perror("Failed to redirect stderr");
        return 1;
    }

    fprintf(stderr, "Error: Invalid operation\n");  // Logs to file
    fclose(fp);  // Restores stderr to console
    
    return 0;
}

By redirecting stderr to "errors.log", all error messages written
with fprintf(stderr, ...) go to the file. This is particularly
valuable for logging application errors. The fclose call ensures
subsequent errors appear on the console again.

## Temporarily Redirecting stdout

This example shows how to temporarily redirect output and then restore it.

temp_redirect.c
  

#include &lt;stdio.h&gt;

int main() {
    // Save original stdout
    FILE *original_stdout = freopen("temp_output.txt", "w", stdout);
    
    if (original_stdout == NULL) {
        perror("Failed to redirect stdout");
        return 1;
    }

    printf("This goes to temp file\n");
    
    // Restore original stdout
    freopen("/dev/tty", "w", stdout);  // Linux/macOS
    // freopen("CON", "w", stdout);    // Windows
    
    printf("This appears on console\n");
    return 0;
}

The code first redirects stdout to a temporary file. After writing
some output, it restores the original stream destination. On Unix-like systems,
"/dev/tty" represents the terminal; Windows uses "CON". This technique is useful
when you need temporary redirection for specific operations.

## Combining Multiple Redirections

Redirect both stdout and stderr to different files in
one program.

multi_redirect.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *out_file = freopen("output.log", "w", stdout);
    FILE *err_file = freopen("errors.log", "w", stderr);
    
    if (out_file == NULL || err_file == NULL) {
        perror("Redirection failed");
        return 1;
    }

    printf("Regular program output\n");
    fprintf(stderr, "Error message\n");
    
    fclose(out_file);
    fclose(err_file);
    return 0;
}

This example demonstrates simultaneous redirection of both output streams. Regular
output goes to "output.log" while errors are written to "errors.log". Each stream
requires its own freopen call. Proper error checking ensures both
redirections succeed before proceeding with program execution.

## Appending to a Log File

Use freopen in append mode to maintain a growing log file.

append_log.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *log_file = freopen("app.log", "a", stdout);
    
    if (log_file == NULL) {
        perror("Failed to open log file");
        return 1;
    }

    printf("Log entry 1\n");
    printf("Log entry 2\n");
    
    fclose(log_file);
    return 0;
}

Append mode ("a") ensures new content is added to the end of "app.log" without
overwriting existing entries. This is ideal for logging scenarios where you want
to maintain a history of program output. Each run of the program adds to the log
rather than starting fresh.

## Redirecting to /dev/null

Silence output completely by redirecting to the null device.

null_redirect.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *null_out = freopen("/dev/null", "w", stdout);
    
    if (null_out == NULL) {
        perror("Failed to redirect to /dev/null");
        return 1;
    }

    printf("This won't appear anywhere\n");
    
    // Restore stdout for demonstration
    freopen("/dev/tty", "w", stdout);
    printf("This appears on console\n");
    
    return 0;
}

Redirecting to "/dev/null" (or "NUL" on Windows) discards all output. This is
useful when you want to suppress output completely. The example shows how to
restore normal output afterward. Note that error messages redirected this way
will also be silenced.

## Best Practices for Using freopen

- **Check Return Values:** Always verify freopen doesn't return NULL to catch failures.

- **Restore Streams When Done:** Return streams to their original state after temporary redirection.

- **Use Appropriate Modes:** Choose between "w", "a", "r+" etc. based on your needs.

- **Consider Platform Differences:** Use "/dev/tty" for Unix and "CON" for Windows when restoring.

- **Close Files Properly:** Always call fclose to release resources and restore streams.

## Source

[C freopen Documentation](https://en.cppreference.com/w/c/io/freopen)

This tutorial has demonstrated the versatility of freopen for stream
redirection in C. From logging to input/output management, these techniques
enhance your file handling capabilities. Mastering stream redirection opens new
possibilities for flexible program design.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).