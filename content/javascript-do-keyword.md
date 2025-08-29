+++
title = "JavaScript do keyword"
date = 2025-08-29T20:01:14.545+01:00
draft = false
description = "Learn how to use do...while loops in JavaScript for iterative control, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript do keyword

last modified April 16, 2025

In this article we show how to use the do keyword to create
do...while loops in JavaScript. The do...while loop executes a block of code
at least once before checking the condition.

## The do keyword

The do keyword is used to create a do...while loop in JavaScript.
This loop executes a block of code first, then checks the condition. Unlike
regular while loops, do...while guarantees at least one execution.

The syntax consists of the do keyword followed by a code block in
curly braces, then the while keyword with a condition. The loop
continues while the condition evaluates to true.

Do...while loops are useful when you need to execute code at least once before
checking if it should repeat. They're commonly used for input validation and
menu systems.

## Basic do...while loop

The following example demonstrates the basic usage of the do
keyword in a do...while loop.

main.js
  

let i = 0;
do {
    console.log(i);
    i++;
} while (i &lt; 5);

This loop will execute the code block first, then check if i is less than 5.
It continues looping while the condition is true. The loop runs 5 times,
logging numbers 0 through 4.

$ node main.js
0
1
2
3
4

## Do...while with false condition

This example shows that the code block executes once even when the condition
is initially false.

main.js
  

let count = 10;
do {
    console.log('This runs once');
    count++;
} while (count &lt; 5);

Despite count being 10 (which makes the condition false), the code block runs
once before checking the condition. This demonstrates the key difference
between while and do...while loops.

$ node main.js
This runs once

## Input validation with do...while

Do...while loops are perfect for input validation scenarios.

main.js
  

let userInput;
do {
    userInput = prompt('Enter a number between 1 and 10:');
} while (isNaN(userInput) || userInput &lt; 1 || userInput &gt; 10);

console.log(`Valid input: ${userInput}`);

This loop continues prompting the user until they enter a valid number between
1 and 10. The code must run at least once to get initial input, making
do...while ideal for this case.

$ node main.js
Enter a number between 1 and 10: 15
Enter a number between 1 and 10: abc
Enter a number between 1 and 10: 7
Valid input: 7

## Do...while with break

The break statement can be used to exit a do...while loop early.

main.js
  

let num = 0;
do {
    num++;
    if (num === 3) {
        break;
    }
    console.log(num);
} while (num &lt; 5);

This loop would normally run until num reaches 5, but we use break
to exit when num equals 3. The break statement immediately terminates the loop
execution.

$ node main.js
1
2

## Nested do...while loops

Do...while loops can be nested inside other loops, including other do...while
loops.

main.js
  

let i = 0;
do {
    let j = 0;
    do {
        console.log(`i: ${i}, j: ${j}`);
        j++;
    } while (j &lt; 2);
    i++;
} while (i &lt; 2);

This example shows two nested do...while loops. The inner loop completes all
its iterations for each iteration of the outer loop. The output shows all
combinations of i and j values.

$ node main.js
i: 0, j: 0
i: 0, j: 1
i: 1, j: 0
i: 1, j: 1

## Do...while with continue

The continue statement skips the current iteration in a do...while
loop.

main.js
  

let k = 0;
do {
    k++;
    if (k === 2) {
        continue;
    }
    console.log(k);
} while (k &lt; 4);

When k equals 2, the continue statement skips the rest of that iteration.
The loop continues with the next iteration after checking the condition.
Numbers 1, 3, and 4 are logged to the console.

$ node main.js
1
3
4

## Practical use case: menu system

Here's a practical example of using do...while for a simple menu system.

main.js
  

let choice;
do {
    console.log('1. Option One');
    console.log('2. Option Two');
    console.log('3. Exit');
    choice = prompt('Enter your choice:');
    
    switch(choice) {
        case '1':
            console.log('You chose Option One');
            break;
        case '2':
            console.log('You chose Option Two');
            break;
        case '3':
            console.log('Exiting...');
            break;
        default:
            console.log('Invalid choice');
    }
} while (choice !== '3');

This menu system continues displaying options until the user chooses to exit.
The do...while loop ensures the menu displays at least once and repeats until
the exit condition is met.

$ node main.js
1. Option One
2. Option Two
3. Exit
Enter your choice: 1
You chose Option One
1. Option One
2. Option Two
3. Exit
Enter your choice: 3
Exiting...

## Source

[do...while - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while)

In this article we have demonstrated how to use the do keyword to create
do...while loops in JavaScript. These loops are valuable when you need to
execute code at least once before checking a condition.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)