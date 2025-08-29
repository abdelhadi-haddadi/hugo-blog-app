+++
title = "JavaScript break keyword"
date = 2025-08-29T20:01:10.138+01:00
draft = false
description = "Understand how to use the break keyword in JavaScript to control loop execution, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript break keyword

last modified April 16, 2025

In this article we show how to control loop execution using the break
keyword in JavaScript.

## The break keyword

The break keyword is used to terminate the execution of a loop
prematurely. When encountered inside a loop, it immediately exits the loop,
regardless of the loop's condition. This provides control over loop execution.

The break statement can be used in for,
while, do...while, and switch statements.
It's particularly useful when you need to stop iteration based on some condition.

Without break, loops would always complete all iterations unless
their condition becomes false. The break statement gives more
flexibility in controlling loop execution flow.

## Basic break in a for loop

The following example demonstrates the basic usage of the break
keyword in a for loop.

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

## Break in a while loop

The break keyword works similarly in while loops.

main.js
  

let count = 0;
while (true) {
    console.log(count);
    count++;
    if (count &gt; 3) {
        break;
    }
}

This example shows an infinite while loop that's terminated using
break. Without the break statement, this loop would run forever.
The break condition checks if count exceeds 3.

$ node main.js
0
1
2
3

## Break in nested loops

When used in nested loops, break only exits the innermost loop.

main.js
  

for (let i = 0; i &lt; 3; i++) {
    for (let j = 0; j &lt; 3; j++) {
        if (j === 1) {
            break;
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

The break statement only affects the inner loop where j equals 1. The outer loop
continues to execute normally. This demonstrates that break only exits one level
of nesting.

$ node main.js
i: 0, j: 0
i: 1, j: 0
i: 2, j: 0

## Break with labeled statements

JavaScript supports labeled break statements to exit outer loops.

main.js
  

outerLoop: for (let i = 0; i &lt; 3; i++) {
    innerLoop: for (let j = 0; j &lt; 3; j++) {
        if (i === 1 &amp;&amp; j === 1) {
            break outerLoop;
        }
        console.log(`i: ${i}, j: ${j}`);
    }
}

Here we use a labeled break to exit both loops when specific conditions are met.
The label "outerLoop" identifies which loop to break out of. This is useful for
breaking out of multiple nested loops at once.

$ node main.js
i: 0, j: 0
i: 0, j: 1
i: 0, j: 2
i: 1, j: 0

## Break in a switch statement

The break keyword is also used in switch statements.

main.js
  

const fruit = 'apple';

switch (fruit) {
    case 'banana':
        console.log('Yellow fruit');
        break;
    case 'apple':
        console.log('Red fruit');
        break;
    default:
        console.log('Unknown fruit');
}

In switch statements, break prevents fall-through to the next case.
Without break, execution would continue to the next case statement. Each case
should typically end with a break statement.

$ node main.js
Red fruit

## Break vs continue

It's important to distinguish between break and continue.

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
current iteration, while break exits the loop entirely. Here,
number 2 is skipped, and the loop ends when i reaches 4.

$ node main.js
0
1
3

## Practical use case: searching an array

Here's a practical example of using break to optimize a search.

main.js
  

const numbers = [4, 9, 15, 6, 2, 12];
let found = false;

for (let num of numbers) {
    if (num &gt; 10) {
        found = true;
        console.log(`Found number greater than 10: ${num}`);
        break;
    }
}

if (!found) {
    console.log('No numbers greater than 10 found');
}

This code searches for the first number greater than 10 in an array. The loop
breaks immediately when the condition is met, improving efficiency. Without
break, it would unnecessarily check all remaining elements.

$ node main.js
Found number greater than 10: 15

## Source

[break - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break)

In this article we have demonstrated how to use the break keyword to control
loop execution in JavaScript.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)