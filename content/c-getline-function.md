+++
title = "C getline function"
date = 2025-08-27T23:22:17.974+01:00
draft = false
description = "Learn line reading in C with this comprehensive getline tutorial. Explore usage, practical examples, and best practices for efficient line-by-line input."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C getline function

last modified April 6, 2025

Reading input line by line is a common requirement in C programming. The
getline function provides a robust solution for this task,
automatically handling memory allocation. This tutorial explains how to use
getline effectively, covering its parameters, return values, and
memory management. With practical examples, you'll learn to read from files and
standard input safely and efficiently.

## What Is getline?

The getline function reads an entire line from a stream, storing it
in a buffer it allocates automatically. It's part of the POSIX standard and
available in GNU C Library. Unlike fgets, getline
handles memory allocation dynamically, resizing as needed for long lines. It
returns the number of characters read or -1 on failure. Always free the buffer
after use to prevent memory leaks.

## Basic getline Usage

This example demonstrates the simplest way to use getline to read
from standard input.

basic_getline.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter a line: ");
    read = getline(&amp;line, &amp;len, stdin);

    if (read != -1) {
        printf("You entered: %s", line);
    } else {
        printf("Error reading input\n");
    }

    free(line);  // Always free allocated memory
    return 0;
}

Here, getline takes three parameters: a pointer to the buffer
(&amp;line), a pointer to the buffer size (&amp;len), and the
input stream (stdin). The function allocates memory as needed and
returns the number of characters read. The newline character is included in the
output. Don't forget to free the allocated memory when done.

## Reading from a File

Learn how to use getline to read lines from a file efficiently.

file_getline.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp;
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    while ((read = getline(&amp;line, &amp;len, fp)) != -1) {
        printf("Line length: %zu\n", read);
        printf("Content: %s", line);
    }

    free(line);
    fclose(fp);
    return 0;
}

This example opens a file and reads it line by line using getline.
The loop continues until getline returns -1 (EOF). Each line's
length and content are printed. Notice how len is managed
automatically by getline, growing as needed for longer lines. Both
the buffer and file are properly closed after use.

## Handling Long Lines

getline automatically handles memory allocation for lines of any
length. This example demonstrates this capability.

long_lines.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter a very long line: ");
    read = getline(&amp;line, &amp;len, stdin);

    if (read != -1) {
        printf("Buffer size: %zu\n", len);
        printf("Line length: %zu\n", read);
    }

    free(line);
    return 0;
}

Unlike fixed-size buffers, getline dynamically resizes its buffer to
accommodate input of any length. The len parameter shows the
allocated buffer size, which may be larger than the actual line length. This
approach prevents buffer overflows and simplifies handling of unpredictable input
sizes.

## Processing Each Character

This example shows how to process individual characters in a line read by
getline.

process_chars.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;ctype.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter text: ");
    read = getline(&amp;line, &amp;len, stdin);

    if (read != -1) {
        for (size_t i = 0; i &lt; read; i++) {
            printf("%c ", toupper(line[i]));
        }
        printf("\n");
    }

    free(line);
    return 0;
}

After reading a line with getline, we can access each character
individually. This example converts each character to uppercase using
toupper. The loop runs from 0 to read-1, covering all
characters in the line (including the newline). Remember that read
gives the exact number of characters read, while len shows the
allocated buffer size.

## Removing the Newline Character

getline includes the newline character in its output. This example
shows how to remove it if needed.

remove_newline.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter text: ");
    read = getline(&amp;line, &amp;len, stdin);

    if (read != -1) {
        // Remove newline if present
        if (line[read - 1] == '\n') {
            line[read - 1] = '\0';
            read--;
        }
        printf("Text without newline: %s\n", line);
        printf("Length: %zu\n", read);
    }

    free(line);
    return 0;
}

The newline character can be removed by checking if the last character is
'\n' and replacing it with a null terminator. This modifies the
line in place and adjusts the length. This technique is useful when you need to
process the line content without the newline character, such as for string
comparisons or further manipulation.

## Reading Multiple Lines

This example demonstrates reading multiple lines until a specific condition is
met.

multiple_lines.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;string.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter lines (type 'quit' to exit):\n");
    while ((read = getline(&amp;line, &amp;len, stdin)) != -1) {
        // Remove newline for comparison
        if (line[read - 1] == '\n') {
            line[read - 1] = '\0';
        }

        if (strcmp(line, "quit") == 0) {
            break;
        }

        printf("You typed: %s\n", line);
    }

    free(line);
    return 0;
}

This program continuously reads input until the user types "quit". Each line is
processed by removing the newline character before comparison. The same buffer is
reused for each line, with getline automatically managing memory
allocation and reallocation as needed. This pattern is common in interactive
programs and text processors.

## Error Handling

Proper error handling is crucial when using getline. This example
shows robust error checking.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    errno = 0;  // Clear error state
    read = getline(&amp;line, &amp;len, stdin);

    if (read == -1) {
        if (errno == ENOMEM) {
            fprintf(stderr, "Error: Out of memory\n");
        } else if (feof(stdin)) {
            printf("End of input reached\n");
        } else {
            perror("Error reading input");
        }
    } else {
        printf("Read %zu characters\n", read);
    }

    free(line);
    return 0;
}

This example demonstrates comprehensive error handling for getline.
It checks for specific error conditions like memory exhaustion
(ENOMEM) and end-of-file separately. The errno
variable and perror provide detailed error information. Always check
for errors when using getline, especially in production code where
input might be unpredictable.

## Best Practices for Using getline

- **Always Initialize Pointers:** Set line to NULL and len to 0 for automatic allocation.

- **Check Return Values:** Verify getline doesn't return -1 before using the buffer.

- **Free Allocated Memory:** Use free(line) to prevent memory leaks.

- **Handle Newlines:** Remember getline includes the newline character in its output.

- **Reuse Buffers:** The same buffer can be reused for multiple lines, reducing allocations.

## Source

[getline man page](https://man7.org/linux/man-pages/man3/getline.3.html)

This tutorial has explored the versatile getline function, from
basic usage to advanced techniques. With automatic memory management and
efficient line reading, getline is superior to alternatives like
fgets for many use cases. Mastering it will make your C programs
more robust and maintainable.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).