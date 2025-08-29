+++
title = "C ftell function"
date = 2025-08-27T23:22:15.720+01:00
draft = false
description = "Learn file position tracking in C with this
comprehensive ftell tutorial. Explore practical examples and best practices for
efficient file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C ftell function

last modified April 6, 2025

File position tracking is essential in C programming for efficient file handling.
The ftell function helps determine the current position within a
file stream. This tutorial explains ftell in depth, demonstrates
its usage with practical examples, and provides best practices. Mastering file
position tracking enables precise file operations and better error handling in
your programs.

## What Is ftell?

The ftell function in C returns the current file position indicator
for a given stream. It takes a FILE pointer as its only parameter
and returns a long value representing the position. For binary
streams, this value is the number of bytes from the beginning. For text streams,
the value is implementation-defined but useful for fseek. Always
check for errors as ftell returns -1L on failure.

## Basic ftell Usage

This example shows the simplest way to use ftell to get the current
file position.

basic_ftell.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("example.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    long position = ftell(fp);
    printf("Initial position: %ld\n", position);

    fclose(fp);
    return 0;
}

This code opens a file and immediately checks its position with ftell.
The initial position is typically 0 for a newly opened file. The position is
printed, and the file is closed. Error handling ensures the program fails
gracefully if the file can't be opened.

## Tracking Position While Reading

This example demonstrates how ftell tracks position changes while
reading a file.

read_tracking.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        long pos = ftell(fp);
        printf("Read '%c' at position %ld\n", ch, pos);
    }

    fclose(fp);
    return 0;
}

The program reads each character from the file while printing both the character
and its position. ftell is called after each read to get the
updated position. This shows how the position increments with each read
operation. The loop continues until EOF is encountered.

## Using ftell with fseek

This example shows how ftell and fseek work together
for random file access.

ftell_fseek.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("records.txt", "r+");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Get current position
    long start_pos = ftell(fp);
    printf("Start position: %ld\n", start_pos);

    // Move to end and get position
    fseek(fp, 0, SEEK_END);
    long end_pos = ftell(fp);
    printf("End position: %ld\n", end_pos);

    // Return to start
    fseek(fp, 0, SEEK_SET);

    fclose(fp);
    return 0;
}

The program demonstrates using ftell with fseek to
navigate a file. It first gets the starting position, then moves to the end to
get the file size. Finally, it returns to the start. This pattern is useful for
determining file size and resetting the position.

## Binary File Position Tracking

This example shows ftell usage with binary files, where positions
correspond directly to byte offsets.

binary_ftell.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "rb");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read first integer
    int value;
    fread(&amp;value, sizeof(int), 1, fp);
    long pos = ftell(fp);
    printf("After reading first int: position %ld\n", pos);

    // Skip next two integers
    fseek(fp, 2 * sizeof(int), SEEK_CUR);
    pos = ftell(fp);
    printf("After skipping two: position %ld\n", pos);

    fclose(fp);
    return 0;
}

With binary files, ftell returns precise byte offsets. The program
reads one integer (typically 4 bytes), then skips two more. Each operation's
effect on the position is shown. This demonstrates how binary file positions
directly correspond to byte counts.

## Error Handling with ftell

This example demonstrates proper error handling when using ftell.

ftell_error.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Force an error by closing the stream
    fclose(fp);
    long pos = ftell(fp);

    if (pos == -1L) {
        perror("ftell failed");
        return 1;
    }

    return 0;
}

The program intentionally creates an error condition by calling ftell
on a closed file stream. This shows how to check for ftell failures,
which return -1L. Proper error handling prevents undefined behavior and helps
debug issues. Always check ftell's return value when errors are
possible.

## Text File Position Caveats

This example highlights special considerations when using ftell with
text files.

text_ftell.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("textfile.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read first line
    char buffer[100];
    fgets(buffer, sizeof(buffer), fp);
    long pos = ftell(fp);
    printf("Position after first line: %ld\n", pos);

    // For text files, positions are only reliable with fseek
    fseek(fp, 0, SEEK_SET);
    pos = ftell(fp);
    printf("Position after rewind: %ld\n", pos);

    fclose(fp);
    return 0;
}

With text files, ftell positions are implementation-defined but
consistent when used with fseek. The program reads a line and shows
its position, then rewinds to demonstrate position reset. While text positions
aren't byte counts, they work reliably for returning to marked positions.

## Large File Support

This example demonstrates ftell with large files using the
ftello alternative.

large_ftell.c
  

#define _FILE_OFFSET_BITS 64
#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("largefile.bin", "rb");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Move to end to get size
    fseeko(fp, 0, SEEK_END);
    off_t size = ftello(fp);
    printf("File size: %lld bytes\n", (long long)size);

    fclose(fp);
    return 0;
}

For files larger than 2GB, ftello (with off_t) is
preferred over ftell. The program shows how to get a large file's
size. The _FILE_OFFSET_BITS macro ensures 64-bit file operations.
This is essential for modern applications handling large datasets.

## Best Practices for Using ftell

- **Check for Errors:** Always verify ftell doesn't return -1L before using the position.

- **Use with Binary Files:** For precise byte positions, prefer binary mode where possible.

- **Consider Large Files:** Use ftello when working with files that might exceed 2GB.

- **Pair with fseek:** Remember that text file positions are only meaningful with corresponding fseek calls.

- **Validate File Pointer:** Ensure the FILE pointer is valid and the stream is open before calling ftell.

## Source

[C ftell Documentation](https://en.cppreference.com/w/c/io/ftell)

This tutorial has explored the ftell function in C, demonstrating
its use in various scenarios from basic position tracking to large file handling.
Proper use of file position functions enables sophisticated file operations and
error handling in your applications.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).