+++
title = "C getdelim function"
date = 2025-08-27T23:22:16.828+01:00
draft = false
description = "Learn dynamic line reading in C with this comprehensive getdelim tutorial. Explore usage, practical examples, and best practices for efficient input handling."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C getdelim function

last modified April 6, 2025

The getdelim function is a powerful tool in C for reading input
lines of variable length. Unlike fgets, it automatically handles
memory allocation, making it ideal for processing unknown input sizes. This
tutorial explores getdelim's parameters, return values, and
practical applications. You'll learn to read files efficiently, handle custom
delimiters, and manage memory properly. Mastering getdelim will
enhance your input processing capabilities in C programs.

## What Is getdelim?

The getdelim function reads input until it encounters a specified
delimiter or end-of-file. It dynamically allocates memory as needed, storing the
result in a provided buffer. The function takes four parameters: a pointer to the
buffer, its size, the delimiter character, and the input stream. On success, it
returns the number of characters read, excluding the null terminator. On failure,
it returns -1, setting errno to indicate the error.

## Basic getdelim Usage

This example demonstrates reading a line from standard input using getdelim.

basic_getdelim.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter a line of text: ");
    read = getdelim(&amp;line, &amp;len, '\n', stdin);

    if (read == -1) {
        perror("getdelim failed");
        free(line);
        return 1;
    }

    printf("You entered: %s", line);
    free(line);
    return 0;
}

Here, getdelim reads from stdin until it encounters a
newline character. The line pointer is initially NULL, allowing
getdelim to allocate memory as needed. The len
variable tracks the buffer size. After use, we free the allocated memory to
prevent leaks. This approach handles input of any length without buffer
overflows.

## Reading from a File

Learn how to read an entire file line by line using getdelim.

file_reading.c
  

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

    while ((read = getdelim(&amp;line, &amp;len, '\n', fp)) != -1) {
        printf("Line length: %zu\n", read);
        printf("Content: %s", line);
    }

    free(line);
    fclose(fp);
    return 0;
}

This code opens "data.txt" and reads it line by line. The getdelim
function automatically reallocates memory if a line exceeds the current buffer
size. The loop continues until getdelim returns -1 (EOF). Each
iteration prints the line length and content. Remember to free the buffer and
close the file when done.

## Custom Delimiter

Use getdelim with a custom delimiter to parse special formats.

custom_delimiter.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *token = NULL;
    size_t len = 0;
    ssize_t read;

    printf("Enter items separated by commas: ");
    read = getdelim(&amp;token, &amp;len, ',', stdin);

    while (read != -1) {
        printf("Token: %s\n", token);
        read = getdelim(&amp;token, &amp;len, ',', stdin);
    }

    free(token);
    return 0;
}

Here, getdelim reads input until it finds a comma. The loop
processes each token separately. Note that the delimiter remains in the output,
and subsequent calls continue where the previous one left off. This technique is
useful for parsing CSV data or custom file formats. Always free the allocated
buffer after processing.

## Handling Binary Data

Process binary data with null characters using getdelim.

binary_data.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp;
    char *data = NULL;
    size_t len = 0;
    ssize_t read;

    fp = fopen("binary.dat", "rb");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    read = getdelim(&amp;data, &amp;len, '\0', fp);
    if (read != -1) {
        printf("Read %zd bytes of binary data\n", read);
    }

    free(data);
    fclose(fp);
    return 0;
}

This example uses the null character ('\0') as a delimiter to read binary data.
getdelim handles embedded nulls correctly, unlike string-based
functions. The file is opened in binary mode ("rb") to prevent platform-specific
newline conversions. The function reads until it encounters a null byte or EOF.

## Error Handling

Proper error handling with getdelim ensures robust programs.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;
#include &lt;errno.h&gt;

int main() {
    char *line = NULL;
    size_t len = 0;
    ssize_t read;

    read = getdelim(&amp;line, &amp;len, '\n', stdin);
    if (read == -1) {
        if (errno == EINVAL) {
            fprintf(stderr, "Invalid parameters\n");
        } else if (errno == ENOMEM) {
            fprintf(stderr, "Memory allocation failed\n");
        } else {
            perror("getdelim error");
        }
        free(line);
        return 1;
    }

    printf("Success: %s", line);
    free(line);
    return 0;
}

This code demonstrates comprehensive error handling for getdelim. It
checks for specific error conditions (invalid parameters or memory allocation
failure) and provides appropriate feedback. The errno variable
contains the specific error code. Always free resources even when errors occur.

## Reading Fixed-Size Chunks

Use getdelim with preallocated buffers for fixed-size reads.

fixed_buffer.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

#define BUF_SIZE 256

int main() {
    char buffer[BUF_SIZE];
    size_t len = BUF_SIZE;
    ssize_t read;

    printf("Enter input: ");
    read = getdelim(&amp;buffer, &amp;len, '\n', stdin);

    if (read == -1) {
        perror("getdelim failed");
        return 1;
    }

    printf("Read %zd bytes: %s", read, buffer);
    return 0;
}

This example uses a fixed-size buffer instead of dynamic allocation. The
len variable is initialized to the buffer size. If the input
exceeds the buffer, getdelim will return -1 with errno
set to ENOMEM. This approach is useful when you want to limit memory usage but
still benefit from getdelim's functionality.

## Processing Multiple Delimiters

Implement a multi-delimiter parser using multiple getdelim calls.

multi_delimiter.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    char *segment = NULL;
    size_t len = 0;
    ssize_t read;
    const char delimiters[] = {',', ';', ':', '\0'};

    printf("Enter text with mixed delimiters: ");
    
    for (int i = 0; i &lt; sizeof(delimiters); i++) {
        read = getdelim(&amp;segment, &amp;len, delimiters[i], stdin);
        if (read == -1) break;
        printf("Segment %d (%c): %s\n", i+1, delimiters[i], segment);
    }

    free(segment);
    return 0;
}

This advanced example processes input with multiple delimiters. The loop iterates
through an array of delimiters, using each in turn with getdelim.
Each call reads until the next occurrence of the current delimiter. The technique
is useful for parsing complex input formats with several separator types.

## Best Practices for Using getdelim

- **Always Check Return Values:** Verify getdelim didn't fail before using the buffer.

- **Free Allocated Memory:** Remember to free the buffer when done to prevent leaks.

- **Handle Large Inputs:** Be prepared for memory allocation failures with extremely large inputs.

- **Consider Buffer Reuse:** Reuse buffers between calls when processing multiple inputs.

- **Validate Delimiters:** Choose delimiters carefully to match your data format.

## Source

[getdelim man page](https://man7.org/linux/man-pages/man3/getdelim.3.html)

This tutorial has explored the versatile getdelim function, from
basic line reading to advanced parsing techniques. With dynamic memory
management and flexible delimiter handling, getdelim is a powerful
tool for input processing in C.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).