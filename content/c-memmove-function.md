+++
title = "C memmove function"
date = 2025-08-27T23:22:20.220+01:00
draft = false
description = "Learn memory moving in C with this
comprehensive memmove tutorial. Explore usage, practical examples, and safe
memory operations."
image = ""
imageBig = ""
categories = ["clang"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# C memmove function

last modified April 8, 2025

Memory operations are fundamental in C programming, and memmove is a
safe function for copying data between memory locations. This tutorial covers
memmove in depth, including its syntax, usage, and advantages over
memcpy. We'll explore practical examples showing how it handles
overlapping memory regions safely. Understanding memmove helps write
robust programs that avoid undefined behavior in memory operations.

## What Is memmove?

The memmove function copies a block of memory from one location to
another safely. It's declared in string.h and takes three parameters:
destination pointer, source pointer, and number of bytes to copy.
memmove handles overlapping memory regions correctly by checking
memory ranges before copying. Unlike memcpy, it guarantees correct
behavior even when source and destination buffers overlap.

## Basic memmove Usage

This example demonstrates copying data between two arrays using
memmove.

basic_move.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char src[] = "Hello, World!";
    char dest[20];

    // Copy 14 bytes (including null terminator)
    memmove(dest, src, 14);

    printf("Source: %s\n", src);
    printf("Destination: %s\n", dest);

    return 0;
}

Here, memmove copies 14 bytes from src to
dest, including the null terminator. The function behaves like
memcpy when buffers don't overlap. The destination buffer must be
large enough to hold the copied data. This is the safe way to copy memory when
you're unsure about potential overlaps.

## Handling Overlapping Memory Regions

This example demonstrates memmove's ability to handle overlapping
regions correctly.

overlap_move.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    char data[] = "ABCDEFGHIJ";
    
    // Move data within the same buffer (overlapping)
    memmove(data + 2, data, 5);

    printf("Result: %s\n", data);

    return 0;
}

This code safely copies data even though source and destination overlap.
memmove checks memory ranges and copies in the correct direction to
preserve data integrity. The output will be "ABABCDEFIJ" because the first 5
bytes are copied starting at position 2. This behavior is guaranteed and
portable across platforms.

## Moving Array Elements

This example shows how to shift elements within an array using
memmove.

array_shift.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

int main() {
    int nums[] = {1, 2, 3, 4, 5, 6, 7, 8};
    size_t count = sizeof(nums)/sizeof(nums[0]);
    
    // Shift elements left by 2 positions
    memmove(nums, nums + 2, (count - 2) * sizeof(int));

    printf("Shifted array: ");
    for (size_t i = 0; i &lt; count - 2; i++) {
        printf("%d ", nums[i]);
    }
    printf("\n");

    return 0;
}

Here, memmove shifts array elements left by two positions. The
function correctly handles the overlapping source and destination regions. The
size calculation uses (count - 2) * sizeof(int) to get the correct
byte count. After the move, the array contains {3,4,5,6,7,8} in its first six
positions.

## Copying Structures with memmove

memmove can safely copy structures, even when they might overlap.

struct_move.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

typedef struct {
    int id;
    char name[20];
    float score;
} Student;

int main() {
    Student students[3] = {
        {101, "Alice", 95.5},
        {102, "Bob", 88.0},
        {103, "Charlie", 91.2}
    };
    
    // Move second student to first position
    memmove(&amp;students[0], &amp;students[1], sizeof(Student));

    printf("First student is now: %s\n", students[0].name);
    return 0;
}

This example moves a Student structure within an array using
memmove. The sizeof(Student) ensures we copy the exact
number of bytes needed. Since the source and destination are in the same array,
memmove is the correct choice. After execution, the first array
element contains Bob's data.

## Implementing a Circular Buffer

This example demonstrates using memmove in a circular buffer
implementation.

circular_buffer.c
  

#include &lt;stdio.h&gt;
#include &lt;string.h&gt;

#define BUF_SIZE 16

void add_to_buffer(char *buf, size_t *count, char data) {
    if (*count == BUF_SIZE) {
        // Make room by shifting left
        memmove(buf, buf + 1, BUF_SIZE - 1);
        (*count)--;
    }
    buf[(*count)++] = data;
}

int main() {
    char buffer[BUF_SIZE] = {0};
    size_t count = 0;
    
    // Fill the buffer
    for (char c = 'A'; c &lt; 'Q'; c++) {
        add_to_buffer(buffer, &amp;count, c);
    }
    
    // Add one more, causing a shift
    add_to_buffer(buffer, &amp;count, 'Q');
    
    printf("Buffer: %.*s\n", (int)count, buffer);
    return 0;
}

This code implements a simple circular buffer using memmove to shift
elements when the buffer is full. The function maintains the most recent
BUF_SIZE characters. When adding 'Q', it shifts all characters left
to make room. The output shows "BCDEFGHIJKLMNOPQ" - the first 'A' was dropped
to maintain buffer size.

## Best Practices for Using memmove

- **Prefer over memcpy:** Use memmove when unsure about memory overlap.

- **Check buffer sizes:** Ensure destination has enough space for the moved data.

- **Use correct size:** Calculate byte counts carefully with sizeof.

- **Verify pointers:** Ensure both source and destination pointers are valid.

- **Consider performance:** memmove may be slightly slower than memcpy.

## Source

[C memmove Documentation](https://en.cppreference.com/w/c/string/byte/memmove)

This tutorial has explored the memmove function, from basic usage to
advanced memory operations. Its ability to handle overlapping regions makes it
safer than memcpy for many use cases. Always consider memory safety
when working with low-level operations in C.

## Author

My name is Jan Bodnar, and I'm a dedicated programmer with a deep passion for
coding. Since 2007, I've been sharing my expertise through over 1,400 articles
and 8 e-books. With more than a decade of teaching experience, I strive to make
programming accessible and engaging.

List [C Standard Library](/all/#clang-std).