+++
title = "C fgetc and getc functions"
date = 2025-08-29T19:49:52.816+01:00
draft = false
description = "Learn character input functions in C with this comprehensive fgetc and getc tutorial. Explore differences, practical examples, and best practices for efficient character reading."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fgetc and getc functions

last modified April 6, 2025

Character input functions are essential tools in C programming for reading data
from files or standard input. The fgetc and getc
functions provide efficient ways to read characters one by one. This tutorial
explores their differences, proper usage, and practical applications. Mastering
these functions enhances your ability to process text files and user input
effectively.

## What Are fgetc and getc?

The fgetc and getc functions read a single character
from a file stream. Both return the character as an unsigned char
cast to an int or EOF on end-of-file or error. The key
difference is that getc may be implemented as a macro while
fgetc is always a function. This makes fgetc safer for
complex expressions but slightly slower than getc in some cases.

## Basic fgetc Example

This example demonstrates reading a file character by character using
fgetc.

basic_fgetc.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("text.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int c;
    while ((c = fgetc(fp)) != EOF) {
        putchar(c);
    }

    fclose(fp);
    return 0;
}

This program opens "text.txt" in read mode and uses fgetc to read
each character until EOF. The character is stored in an int to
properly handle EOF. Each character is then printed to standard output using
putchar. Finally, the file is closed to free resources.

## Basic getc Example

This example shows the same functionality using getc instead of
fgetc.

basic_getc.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("text.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int c;
    while ((c = getc(fp)) != EOF) {
        putchar(c);
    }

    fclose(fp);
    return 0;
}

The structure is identical to the fgetc example, demonstrating how
interchangeable these functions can be. The main difference lies in their
implementation, with getc potentially being a macro expansion.
Performance may vary slightly between them in tight loops.

## Reading from Standard Input

Both functions can read from standard input when used with stdin.

stdin_example.c
  

#include &lt;stdio.h&gt;

int main() {
    printf("Type some text (Ctrl+D to end):\n");

    int c;
    while ((c = fgetc(stdin)) != EOF) {
        putchar(c);
    }

    return 0;
}

This program reads directly from standard input until EOF (Ctrl+D on Unix/Linux,
Ctrl+Z on Windows). Each character is immediately echoed back using
putchar. This demonstrates how these functions work with different
stream types, not just files.

## Counting Characters in a File

Here's a practical example counting characters in a file using fgetc.

count_chars.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("document.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int count = 0;
    while (fgetc(fp) != EOF) {
        count++;
    }

    printf("Total characters: %d\n", count);
    fclose(fp);
    return 0;
}

The program opens a file and counts each character until EOF. The count includes
all characters, including spaces, tabs, and newlines. This demonstrates how
fgetc can be used for simple file analysis tasks. Note that the
actual byte count might differ for files with multibyte characters.

## Line Counting with fgetc

This example counts lines in a file by detecting newline characters.

count_lines.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("code.c", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    int lines = 0;
    int c;
    while ((c = fgetc(fp)) != EOF) {
        if (c == '\n') {
            lines++;
        }
    }

    // Count last line if file doesn't end with newline
    if (c == EOF &amp;&amp; lines &gt; 0) {
        lines++;
    }

    printf("Total lines: %d\n", lines);
    fclose(fp);
    return 0;
}

The program scans the file for newline characters to count lines. It includes a
special case for files that don't end with a newline. This shows how
fgetc can be used for more complex text processing tasks. The logic
can be extended to count other specific characters or patterns.

## Difference Between fgetc and getc

This example highlights a key difference in how these functions can be used.

function_diff.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    // Safe with fgetc (function)
    int c1 = fgetc(fp);
    int c2 = fgetc(fp);

    // Potentially unsafe with getc (macro)
    // int c3 = getc(fp++);  // Would fail - fp++ evaluated multiple times

    printf("First two characters: %c %c\n", c1, c2);
    fclose(fp);
    return 0;
}

The commented line shows why getc can be dangerous in certain
contexts. Because it might be a macro, arguments with side effects (like
fp++) could be evaluated multiple times. fgetc is
always safe as it's a true function. This example demonstrates when to prefer one
over the other.

## Error Handling with fgetc

Proper error handling is crucial when reading files. This example demonstrates it.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;

int main() {
    FILE *fp = fopen("missing.txt", "r");
    if (fp == NULL) {
        perror("Failed to open file");
        return 1;
    }

    int c;
    while ((c = fgetc(fp)) != EOF) {
        putchar(c);
    }

    if (ferror(fp)) {
        perror("Error reading file");
        fclose(fp);
        return 1;
    }

    fclose(fp);
    return 0;
}

After the read loop, we check ferror to detect if any read errors
occurred (not just EOF). This is good practice when processing important files.
The program also checks for file opening errors initially. Comprehensive error
handling makes programs more robust and easier to debug.

## Best Practices for Using fgetc and getc

- **Store return value in int:** Always use int to store the result to properly handle EOF.

- **Prefer fgetc for complex expressions:** Use fgetc when the argument might have side effects.

- **Check for errors:** Use ferror after loops to detect read errors.

- **Consider performance:** In performance-critical loops, getc might be slightly faster.

- **Close files properly:** Always close files with fclose when done.

## Source

[C fgetc Documentation](https://en.cppreference.com/w/c/io/fgetc)

This tutorial has explored the fgetc and getc
functions in depth, showing their similarities, differences, and practical
applications. These fundamental character input functions are essential tools for
any C programmer working with text processing or file I/O.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).