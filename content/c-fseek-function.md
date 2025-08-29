+++
title = "C fseek function"
date = 2025-08-29T19:49:58.321+01:00
draft = false
description = "Learn file positioning in C with this comprehensive fseek tutorial. Explore usage, practical examples, and best practices for efficient file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fseek function

last modified April 6, 2025

File positioning is crucial for efficient file handling in C programming. The
fseek function allows precise navigation within files, enabling
random access operations. This tutorial explains fseek in depth,
covering its parameters, return values, and practical applications. With eight
detailed examples, you'll master file positioning for both text and binary files.
Understanding fseek enhances your ability to work with large files
and complex data structures.

## What Is fseek?

The fseek function in C repositions the file pointer to a specific
location within a file. It takes three parameters: a FILE pointer,
a long integer offset, and an origin specifier. The origin can be
SEEK_SET (start), SEEK_CUR (current), or
SEEK_END (end). fseek returns 0 on success and
non-zero on failure. It works with both text and binary files, though behavior
may differ slightly between them.

## Basic fseek Syntax

The function prototype for fseek is straightforward but powerful.

fseek syntax
  

int fseek(FILE *stream, long offset, int whence);

The stream parameter is the file pointer obtained from
fopen. offset specifies the number of bytes to move,
which can be positive or negative. whence determines the reference
point for the offset. Always check the return value to ensure the operation
succeeded. Proper error handling prevents unexpected behavior in file operations.

## Moving to a Specific Position

This example demonstrates how to jump to a specific position in a file.

seek_position.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Move to 10th byte from beginning
    if (fseek(fp, 10, SEEK_SET)) {
        perror("Error seeking file");
        fclose(fp);
        return 1;
    }

    int ch = fgetc(fp);
    printf("Character at position 10: %c\n", ch);

    fclose(fp);
    return 0;
}

Here, fseek positions the file pointer 10 bytes from the start
(SEEK_SET). We then read and print the character at that position.
The error handling ensures we catch any issues during file operations. This
technique is useful for accessing specific records in fixed-length files.
Remember to close the file after operations complete.

## Seeking from Current Position

Learn how to move relative to the current file position with this example.

seek_relative.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read first character
    int ch1 = fgetc(fp);
    printf("First character: %c\n", ch1);

    // Move 5 bytes forward from current position
    if (fseek(fp, 5, SEEK_CUR)) {
        perror("Error seeking file");
        fclose(fp);
        return 1;
    }

    int ch2 = fgetc(fp);
    printf("Character after skipping 5: %c\n", ch2);

    fclose(fp);
    return 0;
}

After reading the first character, fseek with SEEK_CUR
moves the pointer 5 bytes forward. This relative positioning is valuable when
processing files with variable-length records. The example shows how to skip
ahead from your current location. Always verify the seek operation succeeded
before proceeding with reads or writes.

## Seeking from End of File

This example shows how to position the file pointer relative to the end.

seek_end.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Move to 5 bytes before end
    if (fseek(fp, -5, SEEK_END)) {
        perror("Error seeking file");
        fclose(fp);
        return 1;
    }

    printf("Last 5 characters:\n");
    int ch;
    while ((ch = fgetc(fp)) != EOF) {
        putchar(ch);
    }

    fclose(fp);
    return 0;
}

Using SEEK_END with a negative offset positions the pointer before
the file's end. Here, we read and display the last 5 characters. This technique
is perfect for examining file trailers or footers. Negative offsets are only
valid with SEEK_END and SEEK_CUR. The example
includes robust error handling for production-quality code.

## Finding File Size with fseek

Combine fseek and ftell to determine a file's size.

file_size.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Seek to end
    if (fseek(fp, 0, SEEK_END)) {
        perror("Error seeking file");
        fclose(fp);
        return 1;
    }

    // Get position (file size)
    long size = ftell(fp);
    printf("File size: %ld bytes\n", size);

    fclose(fp);
    return 0;
}

Moving to the end with fseek and calling ftell
reveals the file's size in bytes. This method works for both text and binary
files. The size represents the offset from the start to the end position.
Remember that for very large files, you might need fseeko and
ftello on some systems. Always reset the pointer if you need to
read the file after checking its size.

## Modifying File Content

Use fseek to update specific parts of a file in read-write mode.

modify_file.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r+");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Move to 10th byte
    if (fseek(fp, 10, SEEK_SET)) {
        perror("Error seeking file");
        fclose(fp);
        return 1;
    }

    // Overwrite character
    fputc('X', fp);

    fclose(fp);
    printf("File modified successfully.\n");
    return 0;
}

Opening in "r+" mode allows both reading and writing. fseek
positions the pointer at byte 10, and fputc writes an 'X' at that
location. This approach is ideal for making targeted changes without rewriting
the entire file. Ensure the file exists before opening in "r+" mode. Flushing or
closing the file ensures changes are saved to disk.

## Binary File Random Access

Access records in a binary file randomly using fseek.

binary_access.c
  

#include &lt;stdio.h&gt;

struct Record {
    int id;
    char name[20];
    float value;
};

int main() {
    FILE *fp = fopen("data.bin", "rb+");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read 3rd record (0-based index)
    if (fseek(fp, 2 * sizeof(struct Record), SEEK_SET)) {
        perror("Error seeking file");
        fclose(fp);
        return 1;
    }

    struct Record rec;
    fread(&amp;rec, sizeof(struct Record), 1, fp);
    printf("Record 3: ID=%d, Name=%s, Value=%.2f\n",
           rec.id, rec.name, rec.value);

    fclose(fp);
    return 0;
}

This example demonstrates random access in a binary file containing fixed-size
records. fseek jumps directly to the third record by calculating
the offset. Binary mode ("rb+") ensures accurate positioning and data
representation. The technique is essential for database-like operations. Always
use sizeof when calculating offsets for portability.

## Error Handling with fseek

Proper error handling ensures robust file operations when using fseek.

seek_errors.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Attempt invalid seek
    if (fseek(fp, -100, SEEK_SET)) {
        perror("Seek error");
        printf("Attempted to seek before file start\n");
    }

    // Attempt valid seek
    if (fseek(fp, 100, SEEK_SET) == 0) {
        printf("Seek successful\n");
        if (ftell(fp) == 100) {
            printf("Position verified\n");
        }
    }

    fclose(fp);
    return 0;
}

This example shows how to handle fseek errors gracefully.
Attempting to seek before the file start fails, while valid seeks succeed. The
ftell function verifies the new position. Comprehensive error
checking prevents crashes and data corruption. Always test edge cases when
working with file positioning.

## Best Practices for Using fseek

- **Check Return Values:** Always verify fseek returns 0 for success.

- **Use Binary Mode for Precision:** Text mode may alter newlines, affecting positioning.

- **Combine with ftell:** Use ftell to verify positions after seeking.

- **Handle Large Files Carefully:** Consider fseeko for files &gt; 2GB on some systems.

- **Reset Position When Needed:** Use rewind or fseek to return to start.

## Source

[C fseek Documentation](https://en.cppreference.com/w/c/io/fseek)

This tutorial has explored the versatile fseek function through
eight practical examples. From basic positioning to binary file access, you now
have the tools to navigate files efficiently. Mastering fseek
enables sophisticated file handling in your C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).