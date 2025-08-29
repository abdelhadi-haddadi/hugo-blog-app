+++
title = "JavaScript for keyword"
date = 2025-08-29T20:01:19.057+01:00
draft = false
description = "JavaScript for keyword tutorial shows how to use for loops in JavaScript. The tutorial provides numerous examples to demonstrate loop control in JS."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript for keyword

last modified April 16, 2025

In this article we show how to use the for loop in JavaScript.
The for statement creates a loop with three optional expressions.

## The for keyword

The for keyword creates a loop that consists of three parts:
initialization, condition, and final expression. It's one of the most
commonly used loop structures in JavaScript. The loop continues until
the condition evaluates to false.

The initialization is executed once before the loop starts. The condition
is checked before each iteration. The final expression is executed after
each iteration. All three parts are optional but semicolons must remain.

The for loop is ideal when you know how many times you want
to execute a block of code. It provides more control than while
loops for counting iterations.

## Basic for loop

The following example demonstrates the basic usage of the for
loop in JavaScript.

main.js
  

for (let i = 0; i &lt; 5; i++) {
    console.log(i);
}

This is the most common form of for loop. It initializes a counter variable
i to 0, checks if i is less than 5, and increments
i after each iteration. The loop runs 5 times, logging numbers
0 through 4.

$ node main.js
0
1
2
3
4

## For loop with array iteration

The for loop is commonly used to iterate through arrays.

main.js
  

const fruits = ['apple', 'banana', 'cherry'];

for (let i = 0; i &lt; fruits.length; i++) {
    console.log(fruits[i]);
}

This example shows how to access array elements using a for loop. The loop
condition checks against the array's length property. Each element is accessed
using the index i. This is a traditional way to process arrays.

$ node main.js
apple
banana
cherry

## For loop with break statement

The break statement can be used to exit a for loop prematurely.

main.js
  

for (let i = 0; i &lt; 10; i++) {
    if (i === 5) {
        break;
    }
    console.log(i);
}

This loop would normally run 10 times, but we use break to exit
when i equals 5. The loop stops immediately when the break statement
is executed. Numbers 0 through 4 are logged to the console.

$ node main.js
0
1
2
3
4

## For loop with continue statement

The continue statement skips the current iteration of the loop.

main.js
  

for (let i = 0; i &lt; 5; i++) {
    if (i === 2) {
        continue;
    }
    console.log(i);
}

When i equals 2, the continue statement skips the rest of that
iteration. The loop continues with the next value. This results in all numbers
from 0 to 4 being logged except 2.

$ node main.js
0
1
3
4

## For...of loop

JavaScript provides the for...of loop for iterating over iterables.

main.js
  

const colors = ['red', 'green', 'blue'];

for (const color of colors) {
    console.log(color);
}

The for...of loop is simpler than traditional for loops for
array iteration. It directly accesses each element without needing an index.
This is the preferred way to iterate over arrays in modern JavaScript.

$ node main.js
red
green
blue

## Nested for loops

For loops can be nested to handle multi-dimensional data structures.

main.js
  

for (let i = 0; i &lt; 3; i++) {
    for (let j = 0; j &lt; 2; j++) {
        console.log(`i: ${i}, j: ${j}`);
    }
}

This example shows two nested for loops. The outer loop runs 3 times, and
for each iteration, the inner loop runs 2 times. This results in a total of
6 iterations (3 × 2). Nested loops are useful for working with matrices.

$ node main.js
i: 0, j: 0
i: 0, j: 1
i: 1, j: 0
i: 1, j: 1
i: 2, j: 0
i: 2, j: 1

## For loop with multiple variables

A for loop can initialize and update multiple variables simultaneously.

main.js
  

for (let i = 0, j = 10; i &lt; j; i++, j--) {
    console.log(`i: ${i}, j: ${j}`);
}

This example demonstrates using multiple variables in a for loop. We initialize
both i and j, and update them differently in each
iteration. The loop continues until i is no longer less than
j.

$ node main.js
i: 0, j: 10
i: 1, j: 9
i: 2, j: 8
i: 3, j: 7
i: 4, j: 6

## Source

[for - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)

In this article we have demonstrated how to use the for keyword to create loops
in JavaScript. We covered basic loops, array iteration, and special cases.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)