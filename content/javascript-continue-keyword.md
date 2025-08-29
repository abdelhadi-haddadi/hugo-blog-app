+++
title = "JavaScript continue keyword"
date = 2025-08-29T20:01:12.341+01:00
draft = false
description = "Understand how to use the continue keyword in JavaScript to control loop execution, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript continue keyword

last modified April 16, 2025

In this article we show how to control loop execution using the continue
keyword in JavaScript.

## The continue keyword

The continue keyword is used to skip the current iteration of a loop.
When encountered, it immediately jumps to the next iteration, bypassing any
remaining code in the current iteration. This provides precise control over loop
execution flow.

The continue statement can be used in for,
while, and do...while loops. It's particularly useful
when you need to skip specific iterations based on certain conditions.

Unlike break which exits the loop entirely, continue
only skips the current iteration. The loop continues executing with the next
iteration if the loop condition is still true.

## Basic continue in a for loop

The following example demonstrates the basic usage of the continue
keyword in a for loop.

main.js
  

for (let i = 0; i &lt; 5; i++) {
    if (i === 2) {
        continue;
    }
    console.log(i);
}

This loop runs 5 times, but skips the iteration when i equals 2.
The continue statement jumps to the next iteration, skipping the console.log.
Numbers 0, 1, 3, and 4 are logged to the console.

$ node main.js
0
1
3
4

## Continue in a while loop

The continue keyword works similarly in while loops.

main.js
  

let count = 0;
while (count &lt; 5) {
    count++;
    if (count === 3) {
        continue;
    }
    console.log(count);
}

This while loop increments count and skips the iteration when count equals 3.
Note that we increment before the continue to avoid infinite loops. The output
shows all numbers except 3.

$ node main.js
1
2
4
5

## Continue in nested loops

When used in nested loops, continue only affects the innermost loop.

main.js
  

for (let i = 0; i &lt; 3; i++) {
    for (let j = 0; j &lt; 3; j++) {
        if (j === 1) {
            continue;
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

The continue statement only skips the current iteration of the inner loop where
j equals 1. The outer loop continues to execute normally. This demonstrates that
continue only affects one level of nesting.

$ node main.js
i: 0, j: 0
i: 0, j: 2
i: 1, j: 0
i: 1, j: 2
i: 2, j: 0
i: 2, j: 2

## Continue with labeled statements

JavaScript supports labeled continue statements to target outer loops.

main.js
  

outerLoop: for (let i = 0; i &lt; 3; i++) {
    innerLoop: for (let j = 0; j &lt; 3; j++) {
        if (i === 1 &amp;&amp; j === 1) {
            continue outerLoop;
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

Here we use a labeled continue to skip to the next iteration of the outer loop
when specific conditions are met. The label "outerLoop" identifies which loop to
continue. This skips remaining inner loop iterations for that outer loop cycle.

$ node main.js
i: 0, j: 0
i: 0, j: 1
i: 0, j: 2
i: 1, j: 0
i: 2, j: 0
i: 2, j: 1
i: 2, j: 2

## Skipping odd numbers

A common use case for continue is skipping specific values.

main.js
  

for (let i = 0; i &lt; 10; i++) {
    if (i % 2 !== 0) {
        continue;
    }
    console.log(i);
}

This example prints only even numbers by skipping odd numbers with continue.
The condition checks if the number is odd (i % 2 !== 0), and if true, skips
to the next iteration. This is cleaner than putting all code in an else block.

$ node main.js
0
2
4
6
8

## Continue vs break

It's important to distinguish between continue and break.

main.js
  

for (let i = 0; i &lt; 5; i++) {
    if (i === 2) {
        continue;
    }
    if (i === 4) {
        break;
    }
    console.log(i);
}

This example shows both keywords in action. continue skips the
current iteration when i is 2, while break exits the loop entirely
when i reaches 4. The output demonstrates their different behaviors.

$ node main.js
0
1
3

## Practical use case: processing valid data

Here's a practical example of using continue to process valid data.

main.js
  

const data = [12, 5, 8, 130, 44, null, 3, undefined, 18];

for (let item of data) {
    if (item === null || item === undefined) {
        continue;
    }
    console.log(`Processing valid item: ${item}`);
    // Additional processing would go here
}

This code processes an array of data, skipping null or undefined values using
continue. This pattern is common when dealing with incomplete or messy data.
The continue statement makes the code more readable than nested conditionals.

$ node main.js
Processing valid item: 12
Processing valid item: 5
Processing valid item: 8
Processing valid item: 130
Processing valid item: 44
Processing valid item: 3
Processing valid item: 18

## Source

[continue - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue)

In this article we have demonstrated how to use the continue keyword to control
loop execution in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)