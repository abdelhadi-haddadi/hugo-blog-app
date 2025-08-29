+++
title = "C strnlen function"
date = 2025-08-27T23:22:30.305+01:00
draft = false
description = "Learn safe string length calculation in C with this
comprehensive strnlen tutorial. Explore usage, practical examples, and why it's
safer than strlen for bounded operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C strnlen function

last modified April 8, 2025

String operations are fundamental in C programming, and strnlen is a
key function for safely calculating string lengths. This tutorial covers
strnlen in depth, including its syntax, usage, and advantages over
strlen. We'll explore practical examples and discuss why bounded
string operations are critical for security. Understanding strnlen
helps prevent buffer overflows while maintaining program reliability.

## What Is strnlen?

The strnlen function calculates the length of a string up to a
maximum specified size. It's declared in string.h and takes two
parameters: the string pointer and maximum length to check.
strnlen is safer than strlen as it won't read beyond
the specified bounds. It returns either the string length or the maximum size if
no null terminator is found within the bounds.

## Basic strnlen Usage

This example demonstrates calculating string length safely using
strnlen.

basic_length.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[] = "Hello, World!";
    size_t max_len = 20;
    
    size_t len = strnlen(str, max_len);

    printf("String: %s\n", str);
    printf("Length: %zu\n", len);

    return 0;
}

Here, strnlen calculates the length of str up to
max_len characters. Since the string is shorter than 20 characters,
it returns the actual length. The %zu format specifier is used for
size_t values. This is safer than strlen when dealing
with potentially untrusted input.

## Handling Unbounded Strings

This example shows how strnlen protects against unbounded string
length calculations.

unbounded_string.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char str[50] = "This is a test";
    // Intentionally missing null terminator
    str[14] = 'X';
    
    size_t max_len = sizeof(str);
    size_t len = strnlen(str, max_len);

    printf("String (may be corrupted): %s\n", str);
    printf("Length (bounded): %zu\n", len);
    printf("Max possible length: %zu\n", max_len);

    return 0;
}

This example demonstrates strnlen's protection against missing null
terminators. Without a terminator, strlen would read beyond the
buffer. strnlen stops at max_len (50 in this case).
This prevents potential buffer overflows and undefined behavior in cases of
malformed strings.

## Comparing strnlen and strlen

This example contrasts strnlen with the unsafe strlen
function.

compare_length.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char buffer[10];
    // Create a string that's too long for buffer
    strcpy(buffer, "This string is too long");
    
    size_t unsafe_len = strlen(buffer);
    size_t safe_len = strnlen(buffer, sizeof(buffer));

    printf("Unsafe length: %zu\n", unsafe_len);
    printf("Safe length: %zu\n", safe_len);

    return 0;
}

Here, strlen returns the actual string length (22), ignoring buffer
bounds. strnlen correctly returns the buffer size (10) as the
string exceeds it. This shows why strnlen is preferred for security
critical code. Buffer overflows can lead to serious vulnerabilities in C
programs.

## Processing User Input

This example demonstrates safe user input processing with strnlen.

user_input.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define MAX_INPUT 100

int main() {
    char input[MAX_INPUT + 1];
    
    printf("Enter a string: ");
    fgets(input, sizeof(input), stdin);
    
    // Remove newline if present
    input[strcspn(input, "\n")] = '\0';
    
    size_t len = strnlen(input, MAX_INPUT);

    printf("You entered: %s\n", input);
    printf("Length: %zu\n", len);

    return 0;
}

This code safely processes user input using fgets and
strnlen. The input is bounded by MAX_INPUT, preventing
buffer overflows. strnlen ensures length calculations respect this
limit. This pattern is recommended for handling untrusted input in secure
applications.

## Working with Fixed-size Buffers

This example shows strnlen with fixed-size network buffers.

network_buffer.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define PACKET_SIZE 256

void process_packet(const char *packet) {
    size_t len = strnlen(packet, PACKET_SIZE);
    
    if (len == PACKET_SIZE) {
        printf("Warning: Packet may be truncated\n");
    }
    
    printf("Processing packet of length %zu\n", len);
    // Process packet contents...
}

int main() {
    char packet1[PACKET_SIZE] = "Normal packet";
    char packet2[PACKET_SIZE];
    memset(packet2, 'A', PACKET_SIZE); // No null terminator
    
    process_packet(packet1);
    process_packet(packet2);

    return 0;
}

This example simulates network packet processing with fixed-size buffers.
strnlen safely handles both properly terminated and unterminated
packets. When the length equals the buffer size, it indicates a potential
truncation. This is crucial for network programming where packet integrity
cannot be assumed.

## Best Practices for Using strnlen

- **Always specify maximum length:** Choose a sensible bound based on your buffer size.

- **Check for truncation:** When result equals max size, string may be unterminated.

- **Prefer over strlen:** Use strnlen especially with untrusted input.

- **Combine with bounds-checked functions:** Use with strncpy, snprintf etc.

- **Consider performance:** strnlen may be slightly slower than strlen.

## Source

[C strnlen Documentation](https://en.cppreference.com/w/c/string/byte/strnlen)

This tutorial has explored the strnlen function, from basic usage to
security considerations. Always prefer bounded string operations in C to prevent
buffer overflows and undefined behavior in your programs.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).