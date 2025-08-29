+++
title = "C fputc and putc functions"
date = 2025-08-29T19:49:56.116+01:00
draft = false
description = "Learn character output in C with this comprehensive fputc and putc tutorial. Explore practical examples and best practices for efficient character operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fputc and putc functions

last modified April 6, 2025

Character output is a fundamental operation in C programming, enabling you to
write individual characters to files or standard output. The fputc
and putc functions are essential tools for this purpose. This
tutorial explores both functions, explains their differences, and provides
practical examples. Mastering these functions ensures precise character-level
control in your file operations and output streams.

## What Are fputc and putc?

The fputc function writes a single character to a specified output
stream. It takes two parameters: the character to write and the file pointer.
The putc function is similar but may be implemented as a macro.
Both functions return the written character on success or EOF on
failure. They are commonly used for writing to files or standard output.
Understanding their behavior is key for efficient character-level I/O operations.

## Writing a Character to Standard Output

This example demonstrates how to write a single character to standard output.

stdout_char.c
  

#include &lt;stdio.h&gt;

int main() {
    char ch = 'A';
    
    // Using fputc to write to stdout
    fputc(ch, stdout);
    fputc('\n', stdout);  // Add newline
    
    // Using putc to write to stdout
    putc(ch, stdout);
    putc('\n', stdout);  // Add newline
    
    return 0;
}

Here, we use both fputc and putc to write the
character 'A' to standard output (stdout). Each function is called
twice - once for the character and once for a newline. The output will display
'A' twice, each on a new line. Both functions work similarly for standard output.

## Writing Characters to a File

This example shows how to write multiple characters to a file using fputc.

file_chars.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("chars.txt", "w");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    char message[] = "Hello, World!";
    
    for (int i = 0; message[i] != '\0'; i++) {
        fputc(message[i], fp);  // Write each character
    }
    
    fclose(fp);
    return 0;
}

The program opens "chars.txt" in write mode and writes each character of the
string "Hello, World!" individually using fputc. The loop continues
until it encounters the null terminator. After writing all characters, the file
is closed. This demonstrates precise character-level file writing.

## Using putc for File Output

This example demonstrates using putc to write to a file.

putc_file.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("alphabet.txt", "w");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    for (char c = 'A'; c &lt;= 'Z'; c++) {
        putc(c, fp);  // Write each uppercase letter
        putc('\n', fp);  // Add newline after each
    }
    
    fclose(fp);
    return 0;
}

Here, putc writes the entire uppercase alphabet to "alphabet.txt",
with each letter on a new line. The loop runs from 'A' to 'Z', demonstrating
putc's usage in a controlled iteration. The result is a file with
26 lines, each containing one uppercase letter.

## Error Handling with fputc

This example shows proper error handling when using fputc.

fputc_error.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("output.txt", "w");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    int result = fputc('X', fp);
    
    if (result == EOF) {
        perror("Error writing character");
    } else {
        printf("Successfully wrote character\n");
    }
    
    fclose(fp);
    return 0;
}

The program attempts to write 'X' to "output.txt" and checks the return value of
fputc. If it returns EOF, an error occurred during
writing. Proper error handling ensures robustness when dealing with file
operations. This pattern should be used whenever writing critical data.

## Writing Binary Data with fputc

This example demonstrates writing binary data using fputc.

binary_fputc.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.bin", "wb");
    
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    unsigned char bytes[] = {0x48, 0x65, 0x6C, 0x6C, 0x6F};
    
    for (int i = 0; i &lt; sizeof(bytes); i++) {
        fputc(bytes[i], fp);  // Write each byte
    }
    
    fclose(fp);
    return 0;
}

The program writes a sequence of bytes (which spell "Hello" in ASCII) to a binary
file. Each byte is written individually using fputc. Note the "wb"
mode for binary writing. This technique is useful for creating or modifying
binary files at the byte level.

## Comparing fputc and putc

This example highlights the differences between fputc and putc.

compare_functions.c
  

#include &lt;stdio.h&gt;

int main() {
    // Using fputc with stdout
    printf("Using fputc: ");
    fputc('A', stdout);
    fputc('B', stdout);
    fputc('C', stdout);
    fputc('\n', stdout);
    
    // Using putc with stdout
    printf("Using putc: ");
    putc('X', stdout);
    putc('Y', stdout);
    putc('Z', stdout);
    putc('\n', stdout);
    
    // Using putc with a file
    FILE *fp = fopen("compare.txt", "w");
    if (fp) {
        putc('1', fp);
        fputc('2', fp);
        putc('3', fp);
        fclose(fp);
    }
    
    return 0;
}

The program demonstrates that fputc and putc produce
identical results when used with stdout. It also shows they can be
used interchangeably with files. The main difference is that putc
may be implemented as a macro, potentially offering better performance.

## Creating a File Copy with fputc

This example shows how to create a file copy using fputc.

file_copy.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *src = fopen("source.txt", "r");
    FILE *dest = fopen("copy.txt", "w");
    
    if (!src || !dest) {
        perror("Error opening files");
        return 1;
    }
    
    int ch;
    while ((ch = fgetc(src)) != EOF) {
        fputc(ch, dest);  // Write each character to destination
    }
    
    fclose(src);
    fclose(dest);
    return 0;
}

The program reads "source.txt" character by character using fgetc
and writes each character to "copy.txt" using fputc. This
demonstrates how these functions can be combined for file operations. The loop
continues until EOF is reached, ensuring the entire file is copied.

## Best Practices for Using fputc and putc

- **Check Return Values:** Always verify the return value is not EOF for critical writes.

- **Use putc for Performance:** Prefer putc when performance matters, as it may be a macro.

- **Choose fputc for Clarity:** Use fputc when you want to be explicit about function calls.

- **Handle Errors Gracefully:** Implement proper error handling for file operations.

- **Close Files Properly:** Always close files after operations to prevent resource leaks.

## Source

[C fputc Documentation](https://en.cppreference.com/w/c/io/fputc)

This tutorial has explored the fputc and putc
functions in C, demonstrating their usage through practical examples. These
functions provide essential character-level output capabilities for both files
and standard streams. Mastering them is crucial for precise I/O operations in C.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).