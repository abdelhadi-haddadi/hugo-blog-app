+++
title = "C strrchr function"
date = 2025-08-27T23:22:30.300+01:00
draft = false
description = "Learn string searching in C with this comprehensive strrchr tutorial. Explore usage, practical examples, and safer alternatives for string operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strrchr function

last modified April 8, 2025

String operations are fundamental in C programming, and strrchr is a
key function for finding the last occurrence of a character in a string. This
tutorial covers strrchr in depth, including its syntax, usage, and
potential pitfalls. We'll explore practical examples and discuss safer
alternatives for critical applications. Understanding strrchr helps
with string parsing and manipulation tasks.

## What Is strrchr?

The strrchr function locates the last occurrence of a character in
a string. It's declared in string.h and takes two parameters: the
string to search and the character to find. strrchr returns a
pointer to the found character or NULL if not found. Unlike strchr,
it searches from the end of the string. For safety-critical code, ensure the
input string is properly null-terminated.

## Basic strrchr Usage

This example demonstrates finding the last occurrence of a character in a string.

basic_search.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *str = "Hello, World!";
    char ch = 'o';
    
    char *result = strrchr(str, ch);
    
    if (result != NULL) {
        printf("Last '%c' found at position: %ld\n", ch, result - str);
        printf("Remaining string: %s\n", result);
    } else {
        printf("Character '%c' not found\n", ch);
    }

    return 0;
}

Here, strrchr searches for the last 'o' in the string. It returns
a pointer to this character, which we use to calculate its position. The
difference between the result pointer and string start gives the index. This is
a simple way to find the last occurrence of any character in a string. Always
check for NULL to handle cases where the character isn't found.

## Finding File Extensions

strrchr is commonly used to find file extensions by locating the
last dot in a filename.

file_extension.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *filename = "document.backup.pdf";
    char *dot = strrchr(filename, '.');
    
    if (dot != NULL) {
        printf("File extension: %s\n", dot + 1);
    } else {
        printf("No extension found\n");
    }

    return 0;
}

This example finds the last dot in a filename to extract the true extension.
Multiple dots are common in filenames, so strrchr is ideal here.
The function returns a pointer to the dot, so we print from the next character.
This technique works for most filename parsing scenarios. Note that it doesn't
validate the filename structure.

## Extracting Directory Paths

This example demonstrates using strrchr to separate a filename from
its directory path.

path_extraction.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *path = "/home/user/docs/report.txt";
    char *last_slash = strrchr(path, '/');
    
    if (last_slash != NULL) {
        printf("Directory: %.*s\n", (int)(last_slash - path), path);
        printf("Filename: %s\n", last_slash + 1);
    } else {
        printf("No directory found\n");
    }

    return 0;
}

Here, strrchr finds the last forward slash in a path string. We
use pointer arithmetic to print the directory portion and filename separately.
The %.*s format specifier prints a specific number of characters.
This is a common technique for path manipulation in Unix-like systems. For
Windows paths, you would search for backslashes instead.

## Finding Last Space in a Sentence

This example shows how to find the last space in a sentence to split it.

last_space.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    const char *sentence = "The quick brown fox jumps over the lazy dog";
    char *last_space = strrchr(sentence, ' ');
    
    if (last_space != NULL) {
        printf("Last word: %s\n", last_space + 1);
        printf("Rest of sentence: %.*s\n", 
               (int)(last_space - sentence), sentence);
    } else {
        printf("No spaces found\n");
    }

    return 0;
}

strrchr locates the last space in the sentence, allowing us to
split it into two parts. The first part contains everything before the last
space, and the second part contains the last word. This technique is useful for
text processing tasks. Note that it doesn't handle multiple consecutive spaces
specially. For more complex parsing, consider using strtok or
regular expressions.

## Case-Insensitive Search

This example demonstrates a case-insensitive search using strrchr.

case_insensitive.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;
#include &lt;ctype.h&gt;

char *strrchri(const char *s, int ch) {
    char *last = NULL;
    char c = tolower(ch);
    
    while (*s) {
        if (tolower(*s) == c) {
            last = (char *)s;
        }
        s++;
    }
    
    return last;
}

int main() {
    const char *text = "Hello World, hello universe";
    char *result = strrchri(text, 'H');
    
    if (result != NULL) {
        printf("Last 'H' (case-insensitive) found at: %ld\n", result - text);
        printf("Remaining text: %s\n", result);
    } else {
        printf("Character not found\n");
    }

    return 0;
}

Since strrchr is case-sensitive, we implement a custom
strrchri function. It converts both characters to lowercase before
comparison. The function scans the entire string, remembering the last match.
This approach is less efficient than strrchr but necessary for
case-insensitive searches. For production code, consider using platform-specific
case-insensitive string functions if available.

## Best Practices for Using strrchr

- **Check for NULL:** Always verify the return value before using it.

- **Null-terminated strings:** Ensure input strings are properly terminated.

- **Pointer arithmetic:** Be careful with pointer differences and casting.

- **Character encoding:** Remember it works with bytes, not multibyte characters.

- **Performance:** For long strings, consider alternative approaches if performance is critical.

## Source

[C strrchr Documentation](https://en.cppreference.com/w/c/string/byte/strrchr)

This tutorial has explored the strrchr function, from basic usage to
advanced considerations. While simple, it's powerful for string manipulation
tasks when used correctly. Always validate inputs and handle edge cases to
prevent undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).