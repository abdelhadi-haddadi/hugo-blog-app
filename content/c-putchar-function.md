+++
title = "C putchar function"
date = 2025-08-27T23:22:21.322+01:00
draft = false
description = "Learn character output in C with this comprehensive putchar tutorial. Explore usage, practical examples, and best practices for efficient character output."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C putchar function

last modified April 6, 2025

Character output is a fundamental operation in C programming, enabling you to
display text efficiently. The putchar function is a simple yet
powerful tool for writing single characters to standard output. This tutorial
explores putchar in depth, covering its syntax, usage, and
practical applications. Mastering character output helps build interactive
programs and enhances your understanding of C's I/O system.

## What Is putchar?

The putchar function writes a single character to standard output
(stdout). It takes an integer argument representing the character to be written
and returns the same character as an unsigned char cast to an int. On failure,
it returns EOF. This function is declared in the stdio.h header
file. putchar is equivalent to putc with stdout as its
second argument. It's commonly used in loops for character-by-character output.

## Basic putchar Example

Let's start with a simple example demonstrating the basic usage of putchar.

basic_putchar.c
  

#include &lt;stdio.h&gt;

int main() {
    putchar('A');  // Outputs 'A'
    putchar('\n'); // Outputs newline
    putchar(66);   // Outputs 'B' (ASCII 66)
    putchar('\n');
    
    return 0;
}

This program demonstrates the simplest use of putchar. The first
call outputs the character 'A', followed by a newline. The third call shows that
putchar can accept integer values representing ASCII codes. Here, 66
is the ASCII code for 'B'. Each character is output immediately to stdout.

## Printing a String with putchar

While putchar outputs single characters, we can use it to print entire strings.

string_putchar.c
  

#include &lt;stdio.h&gt;

int main() {
    char *str = "Hello, World!";
    
    while (*str != '\0') {
        putchar(*str);
        str++;
    }
    putchar('\n');
    
    return 0;
}

This example shows how to print a string character by character using
putchar. We initialize a pointer to the string and loop until we
reach the null terminator. Each character is passed to putchar for
output. This demonstrates how higher-level functions like puts might
be implemented using putchar internally.

## Using putchar in a Loop

putchar is particularly useful when combined with loops for repetitive output.

loop_putchar.c
  

#include &lt;stdio.h&gt;

int main() {
    for (int i = 0; i &lt; 10; i++) {
        putchar('*');
    }
    putchar('\n');
    
    return 0;
}

This program uses a for loop to print 10 asterisks in a row,
followed by a newline. The compact nature of putchar makes it ideal
for such repetitive output tasks. The example demonstrates how
putchar can be used to create simple patterns or visual elements in
console output.

## Reading Input and Using putchar

We can combine getchar with putchar for basic I/O.

echo_putchar.c
  

#include &lt;stdio.h&gt;

int main() {
    int c;
    
    printf("Type some text (Ctrl+D to end):\n");
    while ((c = getchar()) != EOF) {
        putchar(c);
    }
    
    return 0;
}

This program creates a simple echo utility that reads characters from stdin and
writes them to stdout using putchar. The loop continues until
getchar returns EOF (typically triggered by Ctrl+D or Ctrl+Z). This
demonstrates how putchar can be used in interactive programs for
real-time character processing.

## Case Conversion with putchar

putchar can be used with character manipulation functions for text processing.

case_convert.c
  

#include &lt;stdio.h&gt;
#include &lt;ctype.h&gt;

int main() {
    char *str = "Hello World 123";
    
    while (*str != '\0') {
        if (isalpha(*str)) {
            putchar(toupper(*str));
        } else {
            putchar(*str);
        }
        str++;
    }
    putchar('\n');
    
    return 0;
}

This program converts all alphabetic characters in a string to uppercase while
leaving other characters unchanged. It demonstrates how putchar can
be combined with character classification and conversion functions from
ctype.h. The conditional ensures only letters are modified before
output.

## Creating a Progress Indicator

putchar is useful for creating simple console animations and progress indicators.

progress_putchar.c
  

#include &lt;stdio.h&gt;
#include &lt;unistd.h&gt;

int main() {
    printf("Processing: ");
    for (int i = 0; i &lt; 20; i++) {
        putchar('.');
        fflush(stdout);  // Ensure immediate output
        usleep(100000);  // 100ms delay
    }
    putchar('\n');
    printf("Done!\n");
    
    return 0;
}

This example creates a simple progress indicator by printing dots with delays
between them. The fflush(stdout) call ensures each dot appears
immediately rather than being buffered. This demonstrates how
putchar can be used for simple console animations and status
indicators in command-line programs.

## Printing ASCII Table with putchar

We can use putchar to display the printable ASCII character set.

ascii_table.c
  

#include &lt;stdio.h&gt;

int main() {
    printf("Printable ASCII characters:\n");
    for (int i = 32; i &lt; 127; i++) {
        putchar(i);
        putchar(' ');
        if ((i - 31) % 16 == 0) putchar('\n');
    }
    putchar('\n');
    
    return 0;
}

This program prints all printable ASCII characters (codes 32-126) in a formatted
grid. The modulo operation creates a newline every 16 characters for better
readability. This example shows how putchar can be used with
arithmetic operations to create structured output.

## Best Practices for Using putchar

- **Understand Return Value:** Check for EOF return to detect output errors in critical applications.

- **Use for Single Characters:** Prefer putchar over printf when outputting individual characters for efficiency.

- **Combine with Buffering:** For bulk output, consider buffering characters before using putchar for better performance.

- **Handle Newlines Explicitly:** Remember to output newline characters when needed, as putchar doesn't add them automatically.

- **Consider Portability:** The character encoding of putchar output depends on the execution environment's locale settings.

## Source

[C putchar Documentation](https://en.cppreference.com/w/c/io/putchar)

This tutorial has explored the putchar function in C, demonstrating
its versatility through practical examples. From basic character output to
interactive programs and text processing, putchar is a fundamental
building block for console I/O in C programming.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).