+++
title = "TypeScript Loops"
date = 2025-08-29T20:14:30.484+01:00
draft = false
description = "TypeScript tutorial on loops, covering for, while, and do-while loops with practical examples."
image = ""
imageBig = ""
categories = ["typescript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# TypeScript Loops

last modified January 24, 2025

Loops in TypeScript are used to execute a block of code repeatedly until a
specified condition is met. TypeScript supports several types of loops,
including for, while, and do-while loops.
This tutorial covers the basics of loops in TypeScript with practical examples.

Loops are control structures that allow you to repeat a block of code multiple
times. They are useful for iterating over arrays, processing data, and
performing repetitive tasks. TypeScript loops are similar to JavaScript loops
but with the added benefit of type safety.

## For Loop

This example demonstrates how to use a for loop to iterate over an array.

for_loop.ts
  

let numbers: number[] = [1, 2, 3, 4, 5];

for (let i = 0; i &lt; numbers.length; i++) {
    console.log(numbers[i]);
}

The for loop is used to iterate over the numbers
array. The loop variable i is incremented on each iteration, and
the loop continues until i is less than the length of the array.

## For-Of Loop

This example demonstrates how to use a for-of loop to iterate over an array.

for_of_loop.ts
  

let fruits: string[] = ["Apple", "Banana", "Cherry"];

for (let fruit of fruits) {
    console.log(fruit);
}
// Output:
// Apple
// Banana
// Cherry

The for-of loop is used to iterate over the elements of the
fruits array. This loop is more concise and easier to read than a
traditional for loop.

## While Loop

This example demonstrates how to use a while loop to repeat a block
of code until a condition is met.

while_loop.ts
  

let count: number = 0;

while (count &lt; 5) {
    console.log(count);
    count++;
}

The while loop continues to execute as long as the condition
count &lt; 5 is true. The loop variable count is
incremented on each iteration.

## Do-While Loop

This example demonstrates how to use a do-while loop to execute a
block of code at least once.

do_while_loop.ts
  

let count: number = 0;

do {
    console.log(count);
    count++;
} while (count &lt; 5);

The do-while loop executes the block of code at least once, even if
the condition is false. The loop continues to execute as long as the condition
count &lt; 5 is true.

## Nested Loops

This example demonstrates how to use nested loops to iterate over a
multidimensional array.

nested_loops.ts
  

let matrix: number[][] = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

for (let i = 0; i &lt; matrix.length; i++) {
    for (let j = 0; j &lt; matrix[i].length; j++) {
        console.log(matrix[i][j]);
    }
}

Nested loops are used to iterate over each element of a multidimensional array.
The outer loop iterates over the rows, and the inner loop iterates over the
columns.

## Break and Continue

This example demonstrates how to use the break and
continue statements in loops.

break_continue.ts
  

for (let i = 0; i &lt; 10; i++) {

    if (i === 5) {
        break;  // Exit the loop when i is 5
    }

    if (i % 2 === 0) {
        continue;  // Skip even numbers
    }

    console.log(i);
}
// Output:
// 1
// 3

The break statement exits the loop when i is 5, and
the continue statement skips even numbers. These statements provide
additional control over loop execution.

## Best Practices for Using Loops

- **Use the Right Loop:** Choose the appropriate loop type (for, while, do-while) based on the task.

- **Avoid Infinite Loops:** Ensure that the loop condition will eventually become false to avoid infinite loops.

- **Optimize Performance:** Minimize the number of operations inside loops to improve performance.

- **Use Break and Continue Sparingly:** Use break and continue statements judiciously to maintain code readability.

## Source

[TypeScript Loops Documentation](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)

In this article, we have explored TypeScript loops and demonstrated their usage through practical examples.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all TypeScript tutorials](/all/#typescript).