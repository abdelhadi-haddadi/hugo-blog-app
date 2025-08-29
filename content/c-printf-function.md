+++
title = "C printf function"
date = 2025-08-27T23:22:21.326+01:00
draft = false
description = "Learn formatted output in C with this comprehensive printf tutorial. Explore format specifiers, practical examples, and best practices for efficient console output."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C printf function

last modified April 6, 2025

Formatted output is essential in C programming for displaying data clearly. The
printf function is the standard tool for printing to the console.
It supports various format specifiers to control output appearance. This tutorial
covers printf basics, format specifiers, and practical examples.
Mastering printf ensures professional and readable program output.

## What Is printf?

The printf function in C prints formatted output to stdout. It takes
a format string and optional arguments. The format string contains text and
format specifiers that define how arguments are displayed. Always include
stdio.h to use printf. For security, avoid
user-provided format strings to prevent vulnerabilities like format string
attacks.

## Basic printf Usage

This example demonstrates the simplest use of printf to display text.

basic_printf.c
  

#include &lt;stdio.h&gt;

int main() {
    printf("Hello, World!\n");  // Print a simple message
    return 0;
}

Here, printf outputs the string "Hello, World!" followed by a
newline character. The \n escape sequence moves the cursor to the
next line. This basic example shows how to print static text without variables.
The stdio.h header is required for printf to work.

## Printing Variables with printf

Learn how to display variable values using format specifiers with printf.

variable_printf.c
  

#include &lt;stdio.h&gt;

int main() {
    int age = 25;
    float height = 1.75f;
    char grade = 'A';

    printf("Age: %d\n", age);          // Integer
    printf("Height: %.2f\n", height);  // Float with 2 decimals
    printf("Grade: %c\n", grade);      // Character

    return 0;
}

This example uses format specifiers: %d for integers,
%.2f for floats with 2 decimal places, and %c for
characters. Each specifier matches the corresponding variable type. The
printf function replaces specifiers with variable values in order.
Format specifiers ensure proper data representation in the output.

## Formatting Numbers with printf

Control number formatting with width, precision, and alignment specifiers.

number_formatting.c
  

#include &lt;stdio.h&gt;

int main() {
    int num = 42;
    float pi = 3.14159f;

    printf("Default: %d\n", num);
    printf("Width 5: %5d\n", num);      // Right-aligned in 5 spaces
    printf("Left: %-5dEND\n", num);     // Left-aligned
    printf("Precision: %.3f\n", pi);    // 3 decimal places
    printf("Combined: %8.2f\n", pi);    // 8 width, 2 decimals

    return 0;
}

Number formatting controls include width (%5d), left alignment
(%-5d), and precision (%.3f). Width pads numbers with
spaces to reach the specified length. Precision controls decimal places for
floats. Combined formatting (%8.2f) sets both width and precision.
These options create neatly aligned numerical output.

## Printing Multiple Values

Display several variables in a single printf statement efficiently.

multiple_values.c
  

#include &lt;stdio.h&gt;

int main() {
    char name[] = "Alice";
    int score = 95;
    float average = 92.5f;

    printf("%s scored %d/100 (Avg: %.1f%%)\n", 
           name, score, average);

    return 0;
}

This example combines string (%s), integer (%d), and
float (%.1f) specifiers in one printf call. The
%% prints a literal percent sign. Arguments are matched to
specifiers in order. Complex output can be built efficiently with a single
formatted string. Always match specifier types to variable types.

## Advanced Formatting with printf

Explore advanced formatting options like hexadecimal and scientific notation.

advanced_formatting.c
  

#include &lt;stdio.h&gt;

int main() {
    int value = 255;
    double large = 1234567.89;

    printf("Hex: %x\n", value);         // Lowercase hexadecimal
    printf("HEX: %X\n", value);        // Uppercase hexadecimal
    printf("Scientific: %e\n", large);  // Scientific notation
    printf("Shorter: %g\n", large);     // Shorter of %f or %e
    printf("Octal: %o\n", value);       // Octal representation

    return 0;
}

Advanced specifiers include %x/%X for hexadecimal,
%e for scientific notation, %g for compact float
display, and %o for octal. These formats are useful for technical
or debugging output. Hexadecimal is common in low-level programming. Scientific
notation handles very large or small numbers efficiently.

## Best Practices for Using printf

- **Match Specifiers to Types:** Ensure format specifiers match variable types to avoid undefined behavior.

- **Use Width and Precision:** Apply formatting controls for professional-looking output alignment.

- **Avoid User-Controlled Formats:** Never use user input as the format string to prevent security vulnerabilities.

- **Include Newlines:** End format strings with \n unless you need continued output.

- **Consider Alternatives for Safety:** For user-facing output, consider puts or fputs when formatting isn't needed.

## Source

[C printf Documentation](https://en.cppreference.com/w/c/io/fprintf)

This tutorial has explored the versatile printf function in C. From
basic text output to advanced formatting, printf is essential for
clear program communication. Practice these examples to master formatted output.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).