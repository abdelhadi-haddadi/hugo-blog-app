+++
title = "JavaScript while keyword"
date = 2025-08-29T20:01:43.833+01:00
draft = false
description = "Understand how to use the while loop in JavaScript for controlling iteration, with examples and explanations."
image = ""
imageBig = ""
categories = ["javascript"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# JavaScript while keyword

last modified April 16, 2025

In this article we show how to use the while keyword to create
loops in JavaScript. The while loop executes a block of code as long as
a specified condition is true.

## The while keyword

The while keyword creates a loop that executes a block of code
as long as the specified condition evaluates to true. The condition is
checked before each iteration. If the condition becomes false, the loop stops.

The basic syntax of a while loop is: while (condition) { ... }.
The condition can be any expression that evaluates to a boolean value. The
loop continues as long as this condition remains true.

Unlike the for loop, the while loop doesn't have built-in initialization or
increment expressions. These must be handled manually before and within the
loop. This makes while loops more flexible but requires careful setup.

## Basic while loop

The following example demonstrates the basic usage of the while
loop in JavaScript.

main.js
  

let i = 0;
while (i &lt; 5) {
    console.log(i);
    i++;
}

This loop initializes a counter variable i to 0. The loop continues
as long as i is less than 5. Inside the loop, we log the current
value of i and then increment it. The loop runs 5 times.

$ node main.js
0
1
2
3
4

## Infinite while loop

A while loop can become infinite if the condition never becomes false.

main.js
  

let count = 0;
while (true) {
    console.log(count);
    count++;
    if (count &gt; 3) {
        break;
    }
}

This example shows a while loop with a condition that's always true. Without
the break statement, this would run forever. We use a counter and break to
exit after 4 iterations. This pattern is useful for indefinite loops.

$ node main.js
0
1
2
3

## While loop with array iteration

While loops are often used to iterate through arrays.

main.js
  

const fruits = ['apple', 'banana', 'orange'];
let index = 0;

while (index &lt; fruits.length) {
    console.log(fruits[index]);
    index++;
}

Here we use a while loop to iterate through an array of fruits. We initialize
an index variable and increment it each iteration. The loop continues until
we've processed all array elements. This is similar to a for loop but with
manual index management.

$ node main.js
apple
banana
orange

## While loop with user input

While loops are useful for processing user input until a condition is met.

main.js
  

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let answer = '';

while (answer !== 'quit') {
    answer = readline.question('Enter a command (type "quit" to exit): ');
    console.log(`You entered: ${answer}`);
}

readline.close();

This example uses a while loop to repeatedly prompt the user for input until
they type "quit". The loop condition checks the user's input. This pattern is
common in command-line applications and interactive programs.

$ node main.js
Enter a command (type "quit" to exit): hello
You entered: hello
Enter a command (type "quit" to exit): quit
You entered: quit

## While loop with complex condition

While loop conditions can be complex expressions combining multiple checks.

main.js
  

let x = 0;
let y = 10;

while (x &lt; 5 &amp;&amp; y &gt; 5) {
    console.log(`x: ${x}, y: ${y}`);
    x++;
    y--;
}

This loop continues as long as both conditions are true: x is less than 5 AND
y is greater than 5. The loop increments x and decrements y each iteration.
The loop stops when either condition becomes false.

$ node main.js
x: 0, y: 10
x: 1, y: 9
x: 2, y: 8
x: 3, y: 7
x: 4, y: 6

## Do-while loop

The do...while variant ensures the loop runs at least once.

main.js
  

let num;
do {
    num = Math.floor(Math.random() * 10);
    console.log(`Generated: ${num}`);
} while (num !== 5);

This example generates random numbers until it gets a 5. Unlike a regular while
loop, the do-while loop always executes at least once. The condition is checked
after each iteration. This is useful when you need to run code before checking.

$ node main.js
Generated: 3
Generated: 7
Generated: 2
Generated: 5

## Practical use case: processing queue

Here's a practical example of using while to process items from a queue.

main.js
  

const tasks = ['task1', 'task2', 'task3', 'task4'];

while (tasks.length &gt; 0) {
    const currentTask = tasks.shift();
    console.log(`Processing: ${currentTask}`);
    // Simulate task processing
}

This code processes tasks from a queue until all tasks are completed. The while
loop continues as long as there are tasks in the array. Each iteration removes
and processes the first task. This pattern is common in job processing systems.

$ node main.js
Processing: task1
Processing: task2
Processing: task3
Processing: task4

## Source

[while - language reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while)

In this article we have demonstrated how to use the while keyword to create
loops in JavaScript. While loops are versatile and useful for many scenarios.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all JavaScript tutorials.](/all/#js)