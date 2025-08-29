+++
title = "C ungetc function"
date = 2025-08-29T19:50:18.386+01:00
draft = false
description = "Learn to use the ungetc function in C with this comprehensive tutorial. Explore practical examples and best practices for character pushback operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C ungetc function

last modified April 6, 2025

The ungetc function is a powerful tool in C programming that allows
you to push characters back into an input stream. This capability is essential
for parsing operations where you need to "peek" ahead or undo a read. This
tutorial explores ungetc in depth, explaining its behavior,
limitations, and practical applications. Through clear examples, you'll learn how
to effectively use this function in your C programs.

## What Is ungetc?

The ungetc function pushes a character back into the input stream,
making it available for subsequent read operations. It takes two parameters: the
character to push back and the stream pointer. The pushed-back character must be
read before any further input operations. Note that ungetc has
implementation-defined limits on how many characters can be pushed back
successively. Always check the return value to ensure the operation succeeded.

## Basic ungetc Example

This simple example demonstrates the fundamental usage of ungetc.

basic_ungetc.c
  

#include &lt;stdio.h&gt;

int main() {
    int ch;
    
    printf("Enter a character: ");
    ch = getchar();  // Read a character
    
    if (ch != EOF) {
        ungetc(ch, stdin);  // Push it back
        printf("You entered: ");
        putchar(getchar());  // Read it again
    }
    
    return 0;
}

This program reads a character from standard input, pushes it back using
ungetc, then reads it again. The character is effectively "peeked"
without being consumed. Note that ungetc returns the character on
success or EOF on failure. The pushed-back character must be read
before any other input operations.

## Using ungetc with File Streams

This example shows how to use ungetc with file streams.

file_ungetc.c
  

#include &lt;stdio.h&gt;

int main() {
    FILE *fp = fopen("data.txt", "r");
    if (fp == NULL) {
        perror("Error opening file");
        return 1;
    }
    
    int ch = fgetc(fp);  // Read first character
    if (ch != EOF) {
        ungetc(ch, fp);  // Push it back
        printf("First character: %c\n", fgetc(fp));
    }
    
    fclose(fp);
    return 0;
}

Here, we open a file and read its first character. The ungetc
function pushes the character back into the file stream, allowing us to read it
again. This technique is useful when you need to examine a character before
deciding how to process it. Remember that file streams must be properly opened
and closed to avoid resource leaks.

## Multiple ungetc Operations

This example demonstrates multiple pushback operations and their limitations.

multi_ungetc.c
  

#include &lt;stdio.h&gt;

int main() {
    int ch;
    
    printf("Enter a character: ");
    ch = getchar();
    
    if (ch != EOF) {
        ungetc(ch, stdin);  // First pushback
        if (ungetc('X', stdin) == EOF) {  // Second pushback
            printf("Second ungetc failed\n");
        }
        
        printf("Reading back: ");
        putchar(getchar());  // 'X'
        putchar(getchar());  // original character
    }
    
    return 0;
}

This program attempts two ungetc operations. The standard guarantees
at least one successful pushback, but multiple pushbacks are
implementation-dependent. Here, we push back the original character and then try
to push 'X'. The characters are read in reverse order of being pushed. If the
second ungetc fails, it returns EOF.

## ungetc in Number Parsing

This example shows how ungetc can help in parsing numbers.

parse_number.c
  

#include &lt;stdio.h&gt;
#include &lt;ctype.h&gt;

int main() {
    printf("Enter a number: ");
    int ch;
    int value = 0;
    
    while ((ch = getchar()) != EOF &amp;&amp; isdigit(ch)) {
        value = value * 10 + (ch - '0');
    }
    
    if (ch != EOF) {
        ungetc(ch, stdin);  // Push back non-digit
    }
    
    printf("Parsed value: %d\n", value);
    printf("Next character: %c\n", getchar());
    
    return 0;
}

This program reads digits to form a number, then pushes back the first non-digit
character encountered. This allows the non-digit to be processed separately. The
ungetc function is particularly useful in lexical analysis where
you need to "put back" characters that don't belong to the current token. The
pushed-back character is available for the next read operation.

## Error Handling with ungetc

This example demonstrates proper error handling with ungetc.

error_ungetc.c
  

#include &lt;stdio.h&gt;

int main() {
    int ch = getchar();
    
    if (ch == EOF) {
        printf("Read error or EOF\n");
        return 1;
    }
    
    if (ungetc(ch, stdin) == EOF) {
        printf("ungetc failed\n");
        return 1;
    }
    
    printf("Successfully pushed back: %c\n", getchar());
    return 0;
}

This code shows how to handle potential errors when using ungetc.
First, we check if getchar succeeded. Then we verify that
ungetc worked by checking its return value. Proper error handling
is crucial when working with input streams, as pushback operations might fail due
to various system limitations. Always check the return value of
ungetc to ensure the operation succeeded.

## ungetc with fscanf

This example combines ungetc with fscanf for flexible input.

fscanf_ungetc.c
  

#include &lt;stdio.h&gt;

int main() {
    int num;
    char ch;
    
    printf("Enter input (e.g., 123a): ");
    if (scanf("%d", &amp;num) == 1) {
        scanf("%c", &amp;ch);  // Read next character
        ungetc(ch, stdin);  // Push it back
        
        printf("Number: %d\n", num);
        printf("Next character: %c\n", getchar());
    }
    
    return 0;
}

Here, we read a number with scanf, then the following character.
The character is pushed back with ungetc and read again. This
technique is useful when you need to parse mixed input formats. The
ungetc function allows you to "undo" the read of the character
after the number, giving you more control over input processing.

## Implementing peek() with ungetc

This example shows how to create a peek function using ungetc.

peek_function.c
  

#include &lt;stdio.h&gt;

int peek(FILE *stream) {
    int ch = fgetc(stream);
    if (ch != EOF) {
        ungetc(ch, stream);
    }
    return ch;
}

int main() {
    printf("Enter text: ");
    int first = peek(stdin);
    
    if (first != EOF) {
        printf("First character will be: %c\n", first);
        printf("Actual input: %c\n", getchar());
    }
    
    return 0;
}

The peek function reads a character and immediately pushes it back,
allowing you to examine the next character without consuming it. This is a common
requirement in parsers and scanners. The function returns EOF if
the end of file is reached or an error occurs. This implementation handles both
file streams and standard input effectively.

## Best Practices for Using ungetc

- **Check Return Values:** Always verify that ungetc succeeds by checking its return value.

- **Mind the Limits:** Remember that only one character pushback is guaranteed to work portably.

- **Use Before Other Operations:** Read pushed-back characters before performing other input operations.

- **Avoid EOF Pushback:** Never try to push EOF back into the stream.

- **Combine with Parsing:** Use ungetc to simplify complex input parsing logic.

## Source

[C ungetc Documentation](https://en.cppreference.com/w/c/io/ungetc)

This tutorial has explored the ungetc function in C, demonstrating
its versatility in input processing. From basic usage to advanced parsing
techniques, ungetc provides valuable control over character input
streams. Mastering this function will enhance your ability to create robust input
processing routines in your C programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).