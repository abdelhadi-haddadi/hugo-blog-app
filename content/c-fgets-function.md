+++
title = "C fgets function"
date = 2025-08-29T19:49:53.927+01:00
draft = false
description = "Learn line input in C with this comprehensive fgets tutorial. Explore usage, practical examples, and best practices for safe input operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C fgets function

last modified April 6, 2025

The fgets function is a fundamental tool in C programming for safe
line input from files or standard input. Unlike gets, it prevents
buffer overflows by limiting input size. This tutorial explores fgets
in depth, covering its parameters, return values, and practical applications.
Mastering fgets ensures robust input handling in your C programs.

## What Is fgets?

The fgets function reads a line from a specified stream and stores
it in a buffer. It takes three parameters: the buffer to store the input, the
maximum number of characters to read, and the input stream. Unlike
gets, it includes the newline character in the buffer and always
null-terminates the string. fgets returns the buffer pointer on
success or NULL on error or end-of-file.

## Basic fgets Syntax

The function prototype for fgets is:

char *fgets(char *str, int n, FILE *stream);

str is the destination buffer, n is the maximum
characters to read (including null terminator), and stream is the
input source. The function reads until it encounters a newline, EOF, or has read
n-1 characters. The resulting string is always null-terminated.

## Reading from Standard Input

This example demonstrates using fgets to read user input from the
keyboard (stdin).

stdin_read.c
  

#include &lt;stdio.h&gt;

int main() {
    char name[50];

    printf("Enter your name: ");
    fgets(name, sizeof(name), stdin);  // Safe input with size limit

    printf("Hello, %s", name);
    return 0;
}

Here, fgets reads from stdin into the name
buffer, with a maximum of 49 characters (plus null terminator). Unlike
scanf, it safely handles spaces in input. The newline character is
included in the buffer if present in the input.

## Reading from a File

This example shows how to read a file line by line using fgets.

file_read.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp;
    char line[100];

    fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }

    while (fgets(line, sizeof(line), fp) != NULL) {
        printf("%s", line);  // Print each line
    }

    fclose(fp);
    return 0;
}

The program opens "data.txt" and reads it line by line. fgets
returns NULL when it reaches end-of-file or encounters an error.
Each line is printed as read, preserving the original formatting including
newlines. The buffer size (100) determines the maximum line length that can be
read safely.

## Handling Long Lines

This example demonstrates how to handle lines longer than the buffer size.

long_lines.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char buffer[10];
    int complete = 0;

    while (!complete) {
        fgets(buffer, sizeof(buffer), stdin);
        
        // Check if line was fully read
        if (strchr(buffer, '\n') != NULL) {
            complete = 1;
        }
        
        printf("Partial: %s", buffer);
    }
    
    return 0;
}

When a line exceeds the buffer size, fgets reads only part of it.
This code checks for newline characters to detect complete lines. The loop
continues until a newline is found, processing long input in chunks. This
technique is useful when memory is limited or for very long lines.

## Removing the Newline Character

This example shows how to remove the trailing newline that fgets
includes in its output.

strip_newline.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char input[50];
    
    printf("Enter text: ");
    fgets(input, sizeof(input), stdin);
    
    // Remove trailing newline if present
    input[strcspn(input, "\n")] = '\0';
    
    printf("You entered: '%s'\n", input);
    return 0;
}

The strcspn function finds the first newline character and replaces
it with a null terminator. This creates a cleaner string without the newline.
This technique is especially useful when comparing strings or storing user input.
Note that if the input was truncated, there may be no newline to remove.

## Comparing fgets with Other Input Functions

This example contrasts fgets with scanf and
gets.

input_comparison.c
  

#include &lt;stdio.h&gt;

int main() {
    char buffer1[20];
    char buffer2[20];
    char buffer3[20];
    
    // Unsafe gets (deprecated)
    printf("Enter text (gets): ");
    gets(buffer1);  // Dangerous - no bounds checking
    
    // scanf with %s (stops at whitespace)
    printf("Enter text (scanf): ");
    scanf("%19s", buffer2);  // Limited protection
    
    // Safe fgets
    printf("Enter text (fgets): ");
    fgets(buffer3, sizeof(buffer3), stdin);
    
    printf("\ngets: %s\n", buffer1);
    printf("scanf: %s\n", buffer2);
    printf("fgets: %s\n", buffer3);
    
    return 0;
}

gets is dangerous as it doesn't limit input size. scanf
with %s is safer but stops at whitespace. fgets is the
safest option, reading entire lines with size limits. This comparison highlights
why fgets is preferred for robust input handling in modern C code.

## Reading Multiple Lines

This example demonstrates reading multiple lines until a blank line is entered.

multi_line.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char line[100];
    
    printf("Enter lines (blank to quit):\n");
    
    while (1) {
        fgets(line, sizeof(line), stdin);
        
        // Check for blank line (just newline)
        if (strcmp(line, "\n") == 0) {
            break;
        }
        
        printf("You entered: %s", line);
    }
    
    printf("Goodbye!\n");
    return 0;
}

The program continues reading lines until it encounters a blank line (just a
newline character). Each line is processed as it's entered. This pattern is
common in interactive programs that need to accept multiple lines of input. The
blank line serves as a simple but effective termination condition.

## Error Handling with fgets

This example shows proper error handling when using fgets.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;errno.h&gt;
#include &lt;string.h&gt;

int main() {
    FILE *fp;
    char line[100];
    
    fp = fopen("nonexistent.txt", "r");
    if (fp == NULL) {
        fprintf(stderr, "Error %d: %s\n", errno, strerror(errno));
        return 1;
    }
    
    if (fgets(line, sizeof(line), fp) == NULL) {
        if (feof(fp)) {
            printf("Reached end of file\n");
        } else {
            perror("Error reading file");
        }
    } else {
        printf("First line: %s", line);
    }
    
    fclose(fp);
    return 0;
}

This code demonstrates comprehensive error handling. It checks for file opening
errors and distinguishes between end-of-file and other read errors. The
feof function tests for end-of-file condition explicitly. Proper
error handling makes programs more robust and easier to debug when problems
occur.

## Best Practices for Using fgets

- **Always specify buffer size:** Prevent buffer overflows by using sizeof(buffer) or a constant.

- **Check return value:** Verify fgets didn't return NULL before using the buffer.

- **Handle the newline:** Use strcspn or similar to remove trailing newline if needed.

- **Clear stdin when needed:** After fgets, use while(getchar()!='\n'); to clear extra input.

- **Combine with sscanf:** For parsing, use fgets followed by sscanf for safer input processing.

## Source

[C fgets Documentation](https://en.cppreference.com/w/c/io/fgets)

This tutorial has explored the fgets function in depth, from basic
usage to advanced techniques. By following these examples and best practices,
you can implement safe and reliable input handling in your C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).