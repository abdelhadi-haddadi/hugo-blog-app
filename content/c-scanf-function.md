+++
title = "C scanf function"
date = 2025-08-27T23:22:22.492+01:00
draft = false
description = "Learn input handling in C with this
comprehensive scanf tutorial. Explore format specifiers, practical examples, and
best practices for safe input operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C scanf function

last modified April 6, 2025

Input handling is a fundamental skill in C programming, enabling you to read user
input efficiently. The scanf function is your primary tool for
reading formatted input from standard input. This tutorial dives into the
essentials of scanf, explains its format specifiers, and provides
hands-on examples. While scanf is powerful, we'll also discuss safer
alternatives for production code where input validation is critical.

## What Is scanf?

The scanf function in C reads formatted input from standard input
(usually the keyboard). It requires a format string specifying the expected input
type and memory addresses where values should be stored. Common format
specifiers include %d for integers and %s for strings.
Always check the return value to verify successful input reading. For security,
consider alternatives like fgets with sscanf.

## Basic Integer Input

Let's start with a simple example of reading an integer using scanf.

read_int.c
  

#include &lt;stdio.h&gt;

int main() {
    int number;

    printf("Enter an integer: ");
    int result = scanf("%d", &amp;number);  // Read integer input

    if (result != 1) {  // Check if reading succeeded
        printf("Invalid input!\n");
        return 1;
    }

    printf("You entered: %d\n", number);
    return 0;
}

Here, scanf waits for user input and attempts to read an integer
using the %d format specifier. The &amp; operator provides
the memory address of number. We check the return value to ensure
one item was successfully read. This basic pattern works for all primitive data
types with their respective format specifiers.

## Reading Multiple Values

scanf can read multiple values in a single call with proper format
specifiers.

read_multiple.c
  

#include &lt;stdio.h&gt;

int main() {
    int age;
    float height;
    char initial;

    printf("Enter age, height, and initial: ");
    int count = scanf("%d %f %c", &amp;age, &amp;height, &amp;initial);

    if (count != 3) {
        printf("Expected 3 values, got %d\n", count);
        return 1;
    }

    printf("Age: %d, Height: %.2f, Initial: %c\n", 
           age, height, initial);
    return 0;
}

This example demonstrates reading an integer, float, and character in one
scanf call. The format string contains three specifiers separated
by spaces, matching the expected input format. The return value indicates how
many items were successfully read. Note that spaces in the format string match
any whitespace in the input.

## Reading Strings Safely

Reading strings with scanf requires caution to prevent buffer
overflows.

read_string.c
  

#include &lt;stdio.h&gt;

int main() {
    char name[50];  // Buffer for name

    printf("Enter your name (max 49 chars): ");
    int result = scanf("%49s", name);  // Limit input length

    if (result != 1) {
        printf("Failed to read name\n");
        return 1;
    }

    printf("Hello, %s!\n", name);
    return 0;
}

The %49s format specifier limits input to 49 characters (plus null
terminator) to prevent overflow. For production code, fgets is
safer as it provides better control over input length. Always specify maximum
width when using %s with scanf to avoid security
vulnerabilities.

## Advanced Formatting

scanf supports complex format strings for precise input parsing.

advanced_format.c
  

#include &lt;stdio.h&gt;

int main() {
    int day, month, year;
    char separator;

    printf("Enter date (dd-mm-yyyy): ");
    int count = scanf("%2d%c%2d%c%4d", 
                      &amp;day, &amp;separator, 
                      &amp;month, &amp;separator, 
                      &amp;year);

    if (count != 5) {
        printf("Invalid date format\n");
        return 1;
    }

    printf("Day: %d, Month: %d, Year: %d\n", 
           day, month, year);
    return 0;
}

This example parses a date with strict formatting. The %2d reads
exactly two digits for day and month, while %4d reads four digits
for year. The same separator character is read twice. This demonstrates
scanf's ability to parse structured input when format is strictly
controlled.

## Handling Input Errors

Proper error handling makes scanf more robust in real applications.

error_handling.c
  

#include &lt;stdio.h&gt;
#include &lt;stdlib.h&gt;

int main() {
    int number;
    char input[100];

    while (1) {
        printf("Enter a number (0 to exit): ");
        
        if (fgets(input, sizeof(input), stdin) == NULL) {
            printf("Input error\n");
            return 1;
        }

        if (sscanf(input, "%d", &amp;number) != 1) {
            printf("Invalid number, try again\n");
            continue;
        }

        if (number == 0) break;

        printf("You entered: %d\n", number);
    }

    return 0;
}

This example shows a safer approach using fgets with
sscanf. It reads the entire line first, then parses it. This method
prevents many common scanf issues like leftover input in the buffer.
The loop continues until valid input is received or the user enters 0. This
pattern is recommended for robust input handling.

## Best Practices for Using scanf

- **Check Return Values:** Always verify scanf's return value matches expected inputs.

- **Limit String Lengths:** Use width specifiers (e.g., %49s) to prevent buffer overflows.

- **Clear Input Buffer:** After errors, clear stdin to avoid leftover characters affecting next reads.

- **Consider Alternatives:** For complex input, use fgets followed by sscanf.

- **Validate Input:** Check that input values fall within expected ranges after reading.

## Source

[C scanf Documentation](https://en.cppreference.com/w/c/io/fscanf)

This tutorial has explored the scanf function in C, from basic
usage to advanced formatting. While powerful, remember that scanf
has limitations and security considerations. For production code, consider safer
alternatives like fgets with parsing functions.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).