+++
title = "C fgetpos function"
date = 2025-08-27T23:22:11.138+01:00
draft = false
description = "Learn file position handling in C with this comprehensive fgetpos tutorial. Explore practical examples and best practices for efficient file operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fgetpos function

last modified April 6, 2025

File position handling is crucial in C programming when working with files. The
fgetpos function helps track and restore file positions accurately.
This tutorial explains fgetpos in detail, covering its syntax,
usage, and practical applications. You'll learn how to save and restore file
positions efficiently, ensuring precise file operations in your programs.

## What Is fgetpos?

The fgetpos function in C stores the current file position of a
stream in a fpos_t object. It takes two parameters: a file pointer
and a pointer to a fpos_t variable. This function is particularly
useful for large files where ftell might not provide enough range.
Always check the return value - zero means success, non-zero indicates an error.

## Basic fgetpos Usage

This example demonstrates the fundamental usage of fgetpos to save
a file position.

basic_fgetpos.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    fpos_t position;
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Save current position
    if (fgetpos(fp, &amp;position) {
        perror("Error getting position");
        fclose(fp);
        return 1;
    }

    printf("Position saved successfully\n");
    fclose(fp);
    return 0;
}

Here, we open a file and declare a fpos_t variable to store the
position. fgetpos saves the current position of the file pointer.
If successful, it returns 0; otherwise, it returns non-zero and sets errno. This
basic example shows how to properly check for errors when using fgetpos.

## Save and Restore Position

This example shows how to save a position and later return to it using
fgetpos and fsetpos.

save_restore.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    fpos_t saved_pos;
    char buffer[100];

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read first line
    fgets(buffer, sizeof(buffer), fp);
    printf("First line: %s", buffer);

    // Save position after first line
    if (fgetpos(fp, &amp;saved_pos)) {
        perror("Error saving position");
        fclose(fp);
        return 1;
    }

    // Read next line
    fgets(buffer, sizeof(buffer), fp);
    printf("Second line: %s", buffer);

    // Return to saved position
    if (fsetpos(fp, &amp;saved_pos)) {
        perror("Error restoring position");
        fclose(fp);
        return 1;
    }

    // Read again from saved position
    fgets(buffer, sizeof(buffer), fp);
    printf("Re-read second line: %s", buffer);

    fclose(fp);
    return 0;
}

This program demonstrates saving a file position after reading the first line,
then reading the second line, and finally returning to the saved position to
re-read the second line. The fgetpos/fsetpos pair is
more reliable than ftell/fseek for large files.

## Multiple Position Bookmarks

This example shows how to save multiple positions in a file using
fgetpos.

multiple_positions.c
  

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

    // Save three different positions
    for (i = 0; i &lt; 3; i++) {
        fgets(buffer, sizeof(buffer), fp);
        if (fgetpos(fp, &amp;positions[i])) {
            perror("Error saving position");
            fclose(fp);
            return 1;
        }
    }

    // Jump between saved positions
    for (i = 2; i &gt;= 0; i--) {
        if (fsetpos(fp, &amp;positions[i])) {
            perror("Error restoring position");
            fclose(fp);
            return 1;
        }
        fgets(buffer, sizeof(buffer), fp);
        printf("Position %d: %s", i, buffer);
    }

    fclose(fp);
    return 0;
}

This program saves three different file positions in an array of
fpos_t structures. It then demonstrates how to jump between these
saved positions in reverse order. This technique is useful when you need to
revisit multiple specific locations in a file.

## Binary File Position Handling

This example demonstrates fgetpos usage with binary files.

binary_position.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "rb");
    fpos_t position;
    int value;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Read first integer
    fread(&amp;value, sizeof(int), 1, fp);
    printf("First value: %d\n", value);

    // Save position
    if (fgetpos(fp, &amp;position)) {
        perror("Error saving position");
        fclose(fp);
        return 1;
    }

    // Read next integer
    fread(&amp;value, sizeof(int), 1, fp);
    printf("Second value: %d\n", value);

    // Return to saved position
    if (fsetpos(fp, &amp;position)) {
        perror("Error restoring position");
        fclose(fp);
        return 1;
    }

    // Read again from saved position
    fread(&amp;value, sizeof(int), 1, fp);
    printf("Re-read second value: %d\n", value);

    fclose(fp);
    return 0;
}

This example shows how fgetpos works with binary files. The program
reads integers from a binary file, saves a position, and demonstrates position
restoration. Binary mode operations often require precise position handling,
making fgetpos particularly valuable in these scenarios.

## Error Handling with fgetpos

This example focuses on proper error handling when using fgetpos.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("nonexistent.txt", "r");
    fpos_t position;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Try to get position from invalid file
    if (fgetpos(fp, &amp;position)) {
        printf("fgetpos failed with errno: %d\n", errno);
        perror("Detailed error");
        fclose(fp);
        return 1;
    }

    fclose(fp);
    return 0;
}

This example demonstrates how to handle errors when using fgetpos.
It shows how to check the return value and use errno and
perror to get detailed error information. Proper error handling is
essential when working with file positions to ensure program robustness.

## Large File Support

This example shows how fgetpos can handle large files beyond the
range of ftell.

large_file.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp = fopen("largefile.bin", "rb");
    fpos_t position;
    long ftell_result;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Seek to a large position
    if (fseek(fp, 2147483647L, SEEK_SET)) {
        perror("Error seeking in file");
        fclose(fp);
        return 1;
    }

    // Save position with fgetpos
    if (fgetpos(fp, &amp;position)) {
        perror("Error saving position");
        fclose(fp);
        return 1;
    }

    // Compare with ftell
    ftell_result = ftell(fp);
    if (ftell_result == -1L) {
        perror("ftell failed");
    } else {
        printf("ftell result: %ld\n", ftell_result);
    }

    printf("Position saved with fgetpos successfully\n");
    fclose(fp);
    return 0;
}

This example demonstrates fgetpos's advantage over ftell
for large files. While ftell might fail with very large file
positions (beyond LONG_MAX), fgetpos can handle them correctly.
This makes fgetpos essential for working with files larger than 2GB.

## Random Access with fgetpos

This example shows how to implement random file access using
fgetpos and fsetpos.

random_access.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    fpos_t *positions = NULL;
    char buffer[100];
    int line_count = 0, i;

    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // First pass: count lines and save positions
    while (fgets(buffer, sizeof(buffer), fp) {
        line_count++;
    }

    positions = malloc(line_count * sizeof(fpos_t));
    if (positions == NULL) {
        perror("Memory allocation failed");
        fclose(fp);
        return 1;
    }

    rewind(fp);
    for (i = 0; i &lt; line_count; i++) {
        if (fgetpos(fp, &amp;positions[i])) {
            perror("Error saving position");
            free(positions);
            fclose(fp);
            return 1;
        }
        fgets(buffer, sizeof(buffer), fp);
    }

    // Second pass: access lines in random order
    for (i = line_count-1; i &gt;= 0; i--) {
        if (fsetpos(fp, &amp;positions[i])) {
            perror("Error restoring position");
            free(positions);
            fclose(fp);
            return 1;
        }
        fgets(buffer, sizeof(buffer), fp);
        printf("Line %d: %s", i+1, buffer);
    }

    free(positions);
    fclose(fp);
    return 0;
}

This program demonstrates advanced random access to file contents. It first scans
the file to count lines and save their positions, then accesses them in reverse
order. This technique is useful for implementing efficient random access to file
contents without loading the entire file into memory.

## Best Practices for Using fgetpos

- **Always check return values:** fgetpos returns 0 on success and non-zero on failure.

- **Use for large files:** Prefer fgetpos over ftell for files that might exceed 2GB.

- **Pair with fsetpos:** Saved positions are meant to be used with fsetpos, not directly.

- **Consider portability:** fpos_t is opaque - don't make assumptions about its structure.

- **Combine with error handling:** Use perror or strerror to provide meaningful error messages.

## Source

[C fgetpos Documentation](https://en.cppreference.com/w/c/io/fgetpos)

This tutorial has explored the fgetpos function in depth, showing
its importance in file position handling. From basic usage to advanced random
access patterns, fgetpos provides reliable file position management
for robust file operations in C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).