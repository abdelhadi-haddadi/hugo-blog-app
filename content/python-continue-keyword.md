+++
title = "Python Continue Keyword"
date = 2025-08-29T20:07:52.199+01:00
draft = false
description = "Python tutorial on the continue keyword, covering loop control flow and practical usage examples."
image = ""
imageBig = ""
categories = ["python"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# Python Continue Keyword

last modified February 25, 2025

The continue keyword in Python skips the remaining code in the
current loop iteration. It moves control back to the loop's start for the next
cycle. This tutorial covers practical uses of continue for
controlling loop execution flow.

Use continue when you need to bypass specific iterations without
exiting the entire loop. Unlike break, which terminates the loop,
continue only skips one iteration. It works in both
for and while loops.

## Skipping Even Numbers

This example shows how to skip even numbers using continue in a
for loop.

skip_evens.py
  

for num in range(1, 11):
    if num % 2 == 0:
        continue
    print(num, end=' ')

# Output: 1 3 5 7 9

The loop processes numbers 1-10. When an even number is detected,
continue skips the print statement for that iteration.

## Filtering List Elements

This example processes a list of mixed data types, skipping non-integer values.

filter_list.py
  

items = [12, 'apple', 0, 4.5, 'error', 8]

for item in items:
    if not isinstance(item, int):
        continue
    print(f"Processing integer: {item}")

# Output: Processing integer: 12
#         Processing integer: 0
#         Processing integer: 8

continue avoids errors by skipping elements that aren't integers.
This pattern is useful when handling heterogeneous data structures.

## While Loop Validation

This example uses continue in a while loop to handle
invalid user input.

input_validation.py
  

while True:
    value = input("Enter positive number: ")
    if not value.isdigit():
        print("Invalid input")
        continue
    if int(value) &gt; 0:
        break

print(f"Valid number: {value}")

The loop restarts immediately when non-numeric input is detected, forcing the
user to provide valid data before proceeding.

## Nested Loop Processing

This example demonstrates continue in nested loops, skipping
specific pair combinations.

nested_loop.py
  

for i in range(3):
    for j in range(3):
        if j == i:
            continue
        print(f"({i}, {j})", end=' ')
    print()

# Output: (0, 1) (0, 2) 
#         (1, 0) (1, 2) 
#         (2, 0) (2, 1)

The inner loop skips iterations where j equals i,
avoiding diagonal pairs in a matrix pattern.

## Skipping Vowels

This example processes a string while skipping vowels using
continue.

skip_vowels.py
  

text = "Python Programming"
vowels = {'a', 'e', 'i', 'o', 'u'}

for char in text.lower():
    if char in vowels:
        continue
    print(char.upper(), end='')

# Output: P Y T H N   P R G R M M N G

The loop converts text to uppercase while skipping vowels. Note that spaces are
preserved through the continue logic.

## Best Practices

- **Enhance Readability:** Use continue to reduce nested conditions

- **Early Filtering:** Apply continue checks at loop start

- **Avoid Overuse:** Excessive continues can make flow hard to follow

- **Combine with Else:** Pair with loop-else for completion checks

## Source

[Python Loop Control Documentation](https://docs.python.org/3/tutorial/controlflow.html#break-and-continue-statements-and-else-clauses-on-loops)

This tutorial demonstrated practical uses of Python's continue
statement for controlling loop execution flow in different scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all Python tutorials](/python/).