+++
title = "C getchar function"
date = 2025-08-27T23:22:16.845+01:00
draft = false
description = "Learn character input in C with this comprehensive getchar tutorial. Explore usage, practical examples, and best practices for efficient input operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C getchar function

last modified April 6, 2025

Character input is a fundamental aspect of C programming, enabling interaction
with users through the console. The getchar function provides a
simple way to read single characters from standard input. This tutorial explores
getchar in depth, explaining its behavior and demonstrating various
use cases. Mastering character input helps build interactive programs and
efficient data processing routines.

## What Is getchar?

The getchar function reads a single character from standard input
(stdin) and returns it as an int. It waits for user input if the
buffer is empty and continues after Enter is pressed. The function returns
EOF on error or end-of-file condition. Since it returns an
int, proper type handling is essential to detect EOF
correctly. getchar is defined in the stdio.h header.

## Basic Character Input

This example demonstrates the simplest use of getchar to read and
display a single character.

basic_getchar.c
  

#include &lt;stdio.h&gt;

int main() {
    int c;  // Must be int to hold EOF
    
    printf("Enter a character: ");
    c = getchar();  // Read one character
    
    printf("You entered: ");
    putchar(c);  // Display the character
    printf("\n");
    
    return 0;
}

The program prompts the user to enter a character. getchar reads the
first character from stdin, which includes the Enter key press. The character is
stored in int c to accommodate EOF. putchar
outputs the character, followed by a newline. Note that additional characters
remain in the input buffer.

## Reading Multiple Characters

This example shows how to read multiple characters until Enter is pressed.

multi_getchar.c
  

#include &lt;stdio.h&gt;

int main() {
    int c;
    
    printf("Type several characters (press Enter to finish): ");
    
    while ((c = getchar()) != '\n' &amp;&amp;  c != EOF) {
        printf("Read: ");
        putchar(c);
        printf("\n");
    }
    
    return 0;
}

The loop continues reading characters until newline (\n) or
EOF is encountered. Each character is processed immediately after
being read. The Enter key generates the newline that terminates the loop. This
approach handles variable-length input efficiently. Always check for
EOF to prevent infinite loops.

## Counting Characters

This program counts characters entered by the user until EOF is signaled.

count_chars.c
  

#include &lt;stdio.h&gt;

int main() {
    int c;
    long count = 0;
    
    printf("Enter text (Ctrl+D/Ctrl+Z to end):\n");
    
    while ((c = getchar()) != EOF) {
        count++;
    }
    
    printf("Character count: %ld\n", count);
    return 0;
}

The program initializes a counter and enters a loop reading characters until
EOF. On Unix-like systems, EOF is triggered by
Ctrl+D; on Windows, use Ctrl+Z. Each valid character increments the counter. The
final count is displayed. This demonstrates how getchar can process
unlimited input streams.

## Echoing Input with Modification

This example reads input and echoes it back with all lowercase letters converted
to uppercase.

echo_upper.c
  

#include &lt;stdio.h&gt;
#include &lt;ctype.h&gt;

int main() {
    int c;
    
    printf("Enter text (Ctrl+D/Ctrl+Z to end):\n");
    
    while ((c = getchar()) != EOF) {
        if (islower(c)) {
            c = toupper(c);
        }
        putchar(c);
    }
    
    return 0;
}

The program processes each character immediately after reading it. The
islower function checks for lowercase letters, which are converted
using toupper. All characters are then output with
putchar. This demonstrates real-time input transformation using
getchar.

## Password Input with Asterisks

This example shows how to implement password input that displays asterisks instead
of the actual characters.

password_input.c
  

#include &lt;stdio.h&gt;
#include &lt;termios.h&gt;
#include &lt;unistd.h&gt;

void disable_echo() {
    struct termios t;
    tcgetattr(STDIN_FILENO, &amp;t);
    t.c_lflag &amp;= ~ECHO;
    tcsetattr(STDIN_FILENO, TCSANOW, &amp;t);
}

void enable_echo() {
    struct termios t;
    tcgetattr(STDIN_FILENO, &amp;t);
    t.c_lflag |= ECHO;
    tcsetattr(STDIN_FILENO, TCSANOW, &amp;t);
}

int main() {
    int c;
    char password[50];
    int i = 0;
    
    printf("Enter password: ");
    disable_echo();
    
    while ((c = getchar()) != '\n' &amp;&amp;  c != EOF &amp;&amp;  i &lt; 49) {
        password[i++] = c;
        printf("*");
    }
    
    password[i] = '\0';
    enable_echo();
    printf("\nPassword entered: %s\n", password);
    
    return 0;
}

This advanced example uses terminal control to disable character echoing. Each
character read by getchar is stored in a buffer while an asterisk
is displayed. The echo is restored after input completes. Note that this uses
Unix-specific terminal control functions. A Windows version would require
different system calls.

## Simple Menu System

This example implements a basic menu system using getchar for
single-character input.

menu_system.c
  

#include &lt;stdio.h&gt;

void display_menu() {
    printf("\nMenu:\n");
    printf("1. Option One\n");
    printf("2. Option Two\n");
    printf("3. Option Three\n");
    printf("Q. Quit\n");
    printf("Enter choice: ");
}

int main() {
    int c;
    
    while (1) {
        display_menu();
        c = getchar();
        
        // Clear input buffer
        while (getchar() != '\n' &amp;&amp;  getchar() != EOF);
        
        switch (c) {
            case '1':
                printf("Option One selected\n");
                break;
            case '2':
                printf("Option Two selected\n");
                break;
            case '3':
                printf("Option Three selected\n");
                break;
            case 'Q':
            case 'q':
                printf("Quitting...\n");
                return 0;
            default:
                printf("Invalid choice\n");
        }
    }
}

The program displays a menu and waits for single-character input. The additional
while loop clears any remaining characters (including the newline)
from the input buffer. The switch statement processes the valid
options. This pattern is useful for simple console-based interfaces.

## Reading Until Specific Character

This example reads input until a specific delimiter character is encountered.

read_until.c
  

#include &lt;stdio.h&gt;

int main() {
    int c;
    char delimiter = ';';
    
    printf("Enter text (end with '%c'):\n", delimiter);
    
    while ((c = getchar()) != delimiter &amp;&amp;  c != EOF) {
        putchar(c);
    }
    
    printf("\nEnd of input reached.\n");
    return 0;
}

The program reads and echoes characters until the specified delimiter (a semicolon
in this case) is found. The loop terminates when either the delimiter or
EOF is encountered. This technique is useful for parsing
delimited input or processing specific segments of data.

## Best Practices for Using getchar

- **Use int for storage:** Always store getchar's return value in an int to properly handle EOF.

- **Clear the input buffer:** After reading single characters, clear remaining input to prevent unintended behavior.

- **Check for EOF:** Always include EOF checks in loops to handle unexpected input termination.

- **Combine with other functions:** Use getchar with putchar for efficient character I/O.

- **Consider buffering:** Remember that input is typically line-buffered, requiring Enter to submit characters.

## Source

[C getchar Documentation](https://en.cppreference.com/w/c/io/getchar)

This tutorial has explored the versatile getchar function through
practical examples ranging from basic input to advanced applications. Mastering
character input is essential for building interactive C programs and processing
text data efficiently.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).