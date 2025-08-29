+++
title = "C fsetpos function"
date = 2025-08-29T19:49:58.330+01:00
draft = false
description = "Learn file positioning in C with this comprehensive fsetpos tutorial. Explore practical examples and best practices for efficient file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fsetpos function

last modified April 6, 2025

File positioning is crucial for precise file operations in C programming. The
fsetpos function allows you to set the file position indicator to a
previously saved location. This tutorial explores fsetpos in depth,
explaining its usage with practical examples. You'll learn how to combine it with
fgetpos for reliable file navigation. Mastering these functions
enables efficient random access file operations in your C programs.

## What Is fsetpos?

The fsetpos function sets the file position indicator for a stream
based on a position previously obtained with fgetpos. It takes a
FILE pointer and a pointer to a fpos_t object as
arguments. This function is particularly useful for large files where
ftell might not work correctly. Always check the return value for
errors. It returns zero on success and non-zero on failure.

## Basic fsetpos Usage

This example demonstrates the fundamental usage of fsetpos to save
and restore a file position.

basic_fsetpos.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    fpos_t position;
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Get current position
    if (fgetpos(fp, &amp;position) != 0) {
        perror("Error getting position");
        fclose(fp);
        return 1;
    }

    // Read some data
    char buffer[100];
    fgets(buffer, sizeof(buffer), fp);
    printf("First read: %s", buffer);

    // Restore position
    if (fsetpos(fp, &amp;position) != 0) {
        perror("Error setting position");
        fclose(fp);
        return 1;
    }

    // Read again from original position
    fgets(buffer, sizeof(buffer), fp);
    printf("Second read: %s", buffer);

    fclose(fp);
    return 0;
}

This code opens a file and saves the initial position using fgetpos.
After reading some data, it restores the position with fsetpos and
reads the same data again. The fpos_t type stores the position
information. Error checking is performed at each step to ensure proper operation.

## Jumping to Specific Positions

Learn how to use fsetpos to jump to different positions in a file.

jump_positions.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    fpos_t positions[3];
    char buffer[100];
    int i;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Store three different positions
    for (i = 0; i &lt; 3; i++) {
        fgetpos(fp, &amp;positions[i]);
        fgets(buffer, sizeof(buffer), fp);
    }

    // Jump back to each position
    for (i = 0; i &lt; 3; i++) {
        if (fsetpos(fp, &amp;positions[i])) {
            perror("Error setting position");
            break;
        }
        fgets(buffer, sizeof(buffer), fp);
        printf("Position %d: %s", i, buffer);
    }

    fclose(fp);
    return 0;
}

This example stores three different file positions in an array of
fpos_t objects. Later, it jumps back to each position using
fsetpos and reads the data from those points. This technique is
useful when you need to revisit multiple specific locations in a file. The code
includes error handling for each position setting operation.

## Working with Binary Files

See how fsetpos works with binary files for precise data access.

binary_fsetpos.c
  

#include &lt;stdio.h&gt;

struct Record {
    int id;
    double value;
};

int main() {
    FILE *fp = fopen("data.bin", "rb+");
    fpos_t pos;
    struct Record rec;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Save position of second record
    fseek(fp, sizeof(struct Record), SEEK_SET);
    fgetpos(fp, &amp;pos);

    // Modify second record
    rec.id = 999;
    rec.value = 3.14159;
    fwrite(&amp;rec, sizeof(struct Record), 1, fp);

    // Restore position and verify
    fsetpos(fp, &amp;pos);
    fread(&amp;rec, sizeof(struct Record), 1, fp);
    printf("Record: id=%d, value=%f\n", rec.id, rec.value);

    fclose(fp);
    return 0;
}

This example demonstrates fsetpos with binary file operations. It
saves the position of the second record in a binary file, modifies it, then
restores the position to verify the change. The fpos_t variable
works seamlessly with binary files. This approach is ideal for database-like
operations where precise record access is required.

## Error Handling with fsetpos

Proper error handling is essential when working with file positions. This example
shows robust error checking.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    fpos_t pos;

    if (fp == NULL) {
        perror("Initial open failed");
        return 1;
    }

    // Try to get position from invalid file
    if (fgetpos(fp, &amp;pos) != 0) {
        perror("fgetpos failed");
        if (errno == EBADF) {
            printf("File descriptor is invalid\n");
        }
        fclose(fp);
        return 1;
    }

    // Try to set invalid position
    if (fsetpos(fp, &amp;pos) != 0) {
        perror("fsetpos failed");
        if (errno == EINVAL) {
            printf("Invalid position specified\n");
        }
    }

    fclose(fp);
    return 0;
}

This code demonstrates comprehensive error handling for fsetpos and
related functions. It checks return values and examines errno for
specific error conditions. The example shows how to handle invalid file
descriptors and position values. Proper error handling makes your file operations
more reliable and easier to debug.

## Large File Support

fsetpos is particularly useful for large files where
ftell might not work correctly.

large_file.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp = fopen("largefile.bin", "rb");
    fpos_t pos;
    long long file_size;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Move to end to get file size
    fseek(fp, 0, SEEK_END);
    fgetpos(fp, &amp;pos);

    // Convert fpos_t to byte offset (platform-specific)
    // Note: This is just for demonstration - not portable
    file_size = *(long long *)&amp;pos;
    printf("File size: %lld bytes\n", file_size);

    // Jump to middle of file
    fseek(fp, file_size/2, SEEK_SET);
    fgetpos(fp, &amp;pos);

    // Process data from middle of file
    char buffer[1024];
    fread(buffer, sizeof(buffer), 1, fp);

    fclose(fp);
    return 0;
}

This example shows how fsetpos can handle positions in very large
files. While the conversion of fpos_t to a numeric value is
platform-specific, it demonstrates the concept. For truly portable code, use
fgetpos and fsetpos without interpreting the
fpos_t contents. This approach works reliably regardless of file
size.

## Combining with fgetpos

fsetpos is typically used with fgetpos to save and
restore positions.

fgetpos_fsetpos.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    fpos_t start_pos, end_pos;
    char buffer[100];

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Mark start position
    fgetpos(fp, &amp;start_pos);

    // Read until empty line
    while (fgets(buffer, sizeof(buffer), fp)) {
        if (buffer[0] == '\n') {
            fgetpos(fp, &amp;end_pos);
            break;
        }
    }

    // Process from start to empty line
    fsetpos(fp, &amp;start_pos);
    while (fgetpos(fp, &amp;start_pos), start_pos &lt; end_pos) {
        fgets(buffer, sizeof(buffer), fp);
        printf("%s", buffer);
    }

    fclose(fp);
    return 0;
}

This example shows a practical use case for fgetpos and
fsetpos together. It marks the start position, reads until an empty
line, marks that position, then processes the section between the two positions.
This pattern is useful for processing file segments. The positions are compared
using their internal representation.

## Text vs Binary Mode Considerations

Understand how text and binary modes affect fsetpos behavior.

text_binary.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp_text = fopen("text.txt", "r");
    FILE *fp_bin = fopen("text.txt", "rb");
    fpos_t pos_text, pos_bin;
    char ch;

    if (!fp_text || !fp_bin) {
        perror("Error opening files");
        return 1;
    }

    // Read first character in text mode
    ch = fgetc(fp_text);
    fgetpos(fp_text, &amp;pos_text);

    // Read first character in binary mode
    ch = fgetc(fp_bin);
    fgetpos(fp_bin, &amp;pos_bin);

    // Compare positions
    printf("Text mode position: %p\n", (void *)&amp;pos_text);
    printf("Binary mode position: %p\n", (void *)&amp;pos_bin);

    // Attempt cross-mode position setting (may fail)
    if (fsetpos(fp_text, &amp;pos_bin) != 0) {
        printf("Cannot set text mode stream with binary position\n");
    }

    fclose(fp_text);
    fclose(fp_bin);
    return 0;
}

This example demonstrates that positions obtained in text mode may not be
compatible with binary mode streams and vice versa. The code opens the same file
in both modes, gets positions, and shows they're different. Attempting to use a
binary mode position in a text mode stream typically fails. Always use positions
with the same stream they were obtained from.

## Best Practices for Using fsetpos

- **Always check return values:** Both fgetpos and fsetpos return zero on success.

- **Use with same stream:** Positions are only valid for the stream they were obtained from.

- **Combine with fgetpos:** Typically used together to save and restore positions.

- **Prefer for large files:** More reliable than ftell/fseek for files &gt; 2GB.

- **Consider platform differences:** fpos_t implementation varies across systems.

## Source

[C fsetpos Documentation](https://en.cppreference.com/w/c/io/fsetpos)

This tutorial has explored the fsetpos function in C, demonstrating
its use for precise file positioning. From basic usage to advanced scenarios with
large files, these examples provide a solid foundation for file handling in your
C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).