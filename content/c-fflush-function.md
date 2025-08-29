+++
title = "C fflush function"
date = 2025-08-27T23:22:09.867+01:00
draft = false
description = "Learn about output buffering in C with this comprehensive fflush tutorial. Explore practical examples and best practices for controlling when data is written to output streams."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fflush function

last modified April 6, 2025

Output buffering is a crucial concept in C programming that affects when data
appears in output streams. The fflush function gives you control
over this behavior, ensuring data is written when needed. This tutorial explains
fflush in depth, covering its purpose, common use cases, and
potential pitfalls. With practical examples, you'll learn to use
fflush effectively in your programs.

## What Is fflush?

The fflush function in C forces any buffered output data to be
written immediately to the associated output stream. It takes a single parameter:
a FILE pointer to the stream you want to flush. For output streams,
fflush writes any unwritten data. For input streams, the behavior
is implementation-defined. The function returns zero on success and
EOF on error.

## Basic fflush Usage with stdout

This example demonstrates the most common use of fflush with the
standard output stream.

basic_fflush.c
  

#include &lt;stdio.h&gt;

int main() {
    printf("This will appear immediately");
    fflush(stdout);  // Force output to appear now
    
    // Some time-consuming operation
    for (int i = 0; i &lt; 100000000; i++);
    
    printf("\nThis might appear later\n");
    return 0;
}

Without fflush, the first printf output might not
appear immediately due to buffering. The fflush(stdout) call
ensures the text is displayed before the time-consuming loop. The second
printf doesn't need flushing because \n typically
flushes the buffer automatically.

## Flushing File Output

Learn how to use fflush with file streams to ensure data is written
to disk.

file_fflush.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("output.txt", "w");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    fprintf(fp, "Important data that must be saved");
    fflush(fp);  // Ensure data is written to disk
    
    // Critical section where program might crash
    // Without fflush, data might be lost
    
    fclose(fp);
    return 0;
}

This example shows how fflush can protect against data loss. The
fprintf writes to the file buffer, but the data might not be on
disk yet. fflush(fp) forces the write operation, which is crucial
before potential crash points. Always remember to still call fclose
when done with the file.

## fflush with Input Streams

Understand the behavior of fflush when used with input streams.

input_fflush.c
  

#include &lt;stdio.h&gt;

int main() {
    int num;
    char ch;
    
    printf("Enter a number: ");
    fflush(stdout);  // Properly flush output before input
    
    scanf("%d", &amp;num);
    
    // Clear input buffer
    while ((ch = getchar()) != '\n' &amp;&amp; ch != EOF);
    
    printf("Enter a character: ");
    fflush(stdout);
    
    scanf("%c", &amp;ch);
    printf("You entered: %c\n", ch);
    
    return 0;
}

Here, fflush(stdout) ensures prompts appear before waiting for
input. Note that fflush(stdin) is undefined behavior in standard C.
To clear input buffers, read characters until \n or
EOF as shown. This approach works portably across different
platforms.

## fflush for Debugging

Use fflush to ensure debug messages appear immediately in log
files.

debug_fflush.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

void critical_function() {
    FILE *log = fopen("debug.log", "a");
    if (log == NULL) return;
    
    fprintf(log, "Entering critical function\n");
    fflush(log);  // Ensure log entry is saved
    
    // Simulate a crash
    if (rand() % 5 == 0) abort();
    
    fprintf(log, "Exiting critical function\n");
    fclose(log);
}

int main() {
    for (int i = 0; i &lt; 10; i++) {
        critical_function();
    }
    return 0;
}

This example demonstrates how fflush helps with debugging. Without
flushing, log messages might be lost if the program crashes. The
abort simulates a crash, but thanks to fflush, we
always see the "Entering" message. This technique is valuable for diagnosing
problems in unstable programs.

## fflush with stderr

Understand why fflush is rarely needed with stderr.

stderr_fflush.c
  

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;

int main() {
    fprintf(stderr, "Error message 1 (unbuffered)\n");
    
    fprintf(stdout, "Normal output (buffered)");
    sleep(2);  // Notice stdout doesn't appear immediately
    
    fprintf(stderr, "Error message 2 (still unbuffered)\n");
    
    fflush(stdout);  // Now stdout appears
    fprintf(stderr, "Error message 3 (no fflush needed)\n");
    
    return 0;
}

By default, stderr is unbuffered, so fflush isn't
typically needed. This example contrasts it with stdout, which is
buffered. The sleep demonstrates buffering behavior. Error messages
appear immediately, while normal output waits for fflush or a
newline. This automatic behavior makes stderr ideal for error
reporting.

## fflush and Fork Safety

Learn how fflush prevents duplicate output in forked processes.

fork_fflush.c
  

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;

int main() {
    printf("Before fork (buffered)");
    fflush(stdout);  // Clear buffer before fork
    
    pid_t pid = fork();
    if (pid == 0) {
        printf("\nChild process\n");
    } else {
        printf("\nParent process\n");
    }
    
    return 0;
}

When forking, buffered data gets duplicated in both processes. This example
shows how fflush prevents duplicate output by clearing buffers
before fork. Without flushing, "Before fork" might appear twice.
After flushing, each process only prints its own message. This technique is
essential for multi-process programming.

## Error Handling with fflush

Properly check for errors when using fflush.

error_fflush.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("output.txt", "w");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }
    
    fprintf(fp, "Important data");
    
    if (fflush(fp) == EOF) {
        perror("Failed to flush data");
        fclose(fp);
        return 1;
    }
    
    // Simulate disk full error
    // On some systems, fflush might detect write errors
    
    if (fclose(fp) == EOF) {
        perror("Failed to close file");
        return 1;
    }
    
    return 0;
}

This example demonstrates proper error handling with fflush. The
function returns EOF on failure, which might indicate disk full or
permission issues. Always check this return value for critical operations. Note
that some errors might only be detected during fclose, so both
checks are important for robust file handling.

## Best Practices for Using fflush

- **Use Sparingly:** Frequent flushing reduces performance; only flush when necessary.

- **Flush Before Input:** Ensure prompts appear before waiting for user input.

- **Flush Critical Data:** Protect against data loss by flushing before risky operations.

- **Check Return Values:** Always verify fflush succeeds for important data.

- **Avoid fflush(stdin):** This is undefined behavior in standard C; use other methods to clear input.

## Source

[C fflush Documentation](https://en.cppreference.com/w/c/io/fflush)

This tutorial has explored the fflush function in depth, from basic
usage to advanced scenarios. Proper understanding of output buffering and flushing
is essential for reliable I/O operations in C programs. Use these techniques to
ensure your program's output behaves as expected in all situations.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).