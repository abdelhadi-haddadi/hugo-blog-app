+++
title = "PHP for Loop"
date = 2025-08-29T20:04:24.310+01:00
draft = false
description = "PHP for loop tutorial shows how to use looping in PHP. Learn for loops with practical examples."
image = ""
imageBig = ""
categories = ["php"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# PHP for Loop

last modified April 16, 2025

The PHP for loop is a fundamental control structure for repeating
code execution. It's ideal when you know exactly how many times you need to
iterate. The for loop combines initialization, condition, and increment in
one compact syntax.

## Basic Definitions

A for loop executes a block of code repeatedly until a specified
condition evaluates to false. It consists of three expressions separated by
semicolons inside parentheses.

The first expression initializes the loop counter. The second defines the
continuation condition. The third updates the counter after each iteration.

Syntax: for (init; condition; increment) { code }. All three
expressions are optional, but semicolons must remain. The loop continues
while the condition evaluates to true.

## Basic for Loop

This example demonstrates a simple for loop that counts from 1 to 5.

basic_for.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 5; $i++) {
    echo "Iteration: $i&lt;br&gt;";
}

The code initializes $i to 1. It continues while $i
is less than or equal to 5. After each iteration, $i increments
by 1. The loop body executes 5 times, printing the current iteration number.

## Counting Backwards

This example shows a for loop counting from 10 down to 1.

countdown.php
  

&lt;?php

declare(strict_types=1);

for ($i = 10; $i &gt;= 1; $i--) {
    echo "$i...&lt;br&gt;";
}
echo "Liftoff!";

The loop starts at 10 and continues while $i is greater than or
equal to 1. The decrement operator ($i--) reduces the counter
each iteration. This creates a classic countdown sequence ending with a
message.

## Stepping by Values

This example demonstrates using different step values in a for loop.

step_values.php
  

&lt;?php

declare(strict_types=1);

// Count even numbers from 0 to 10
for ($i = 0; $i &lt;= 10; $i += 2) {
    echo "$i ";
}

echo "&lt;br&gt;";

// Count by fives from 5 to 25
for ($i = 5; $i &lt;= 25; $i += 5) {
    echo "$i ";
}

The first loop counts even numbers by stepping 2 each iteration. The second
counts in increments of 5. The increment expression can use any valid
arithmetic operation. This provides flexible iteration control.

## Nested for Loops

This example shows how to nest for loops to create a multiplication table.

nested_for.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 5; $i++) {
    for ($j = 1; $j &lt;= 5; $j++) {
        echo str_pad($i * $j, 4, " ", STR_PAD_LEFT);
    }
    echo "&lt;br&gt;";
}

The outer loop controls rows, while the inner loop handles columns. Each
iteration multiplies the current row and column numbers. str_pad
formats the output for alignment. Nested loops are powerful for grid-based
operations.

## Loop Control with break

This example demonstrates using break to exit a loop prematurely.

break_loop.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 100; $i++) {
    echo "$i ";
    if ($i % 13 == 0) {
        echo "&lt;br&gt;Found a multiple of 13!";
        break;
    }
}

The loop counts to 100 but stops when it finds the first multiple of 13.
The break statement immediately terminates the loop execution.
This is useful for search operations where you can stop after finding a match.

## Loop Control with continue

This example shows using continue to skip specific iterations.

continue_loop.php
  

&lt;?php

declare(strict_types=1);

for ($i = 1; $i &lt;= 10; $i++) {
    if ($i % 2 == 0) {
        continue;
    }
    echo "$i is odd&lt;br&gt;";
}

The loop prints only odd numbers between 1 and 10. When $i is
even, continue skips the rest of the iteration. The loop then
proceeds to the next value. This filters out unwanted values without exiting.

## Infinite Loop with for

This example demonstrates creating an infinite loop using for syntax.

infinite_for.php
  

&lt;?php

declare(strict_types=1);

$count = 0;
for (;;) {
    echo "Loop iteration $count&lt;br&gt;";
    $count++;
    
    if ($count &gt;= 5) {
        break;
    }
}

By omitting all three expressions, we create an infinite loop. The code uses
a manual counter and break condition. This pattern is sometimes used with
event loops or until an external condition is met.

## Best Practices

- **Initialization:** Declare loop counters in the for statement.

- **Readability:** Keep loop bodies short and focused.

- **Complexity:** Avoid deeply nested loops when possible.

- **Performance:** Move invariant calculations outside loops.

- **Termination:** Ensure loops have clear exit conditions.

## Source

[PHP for Loop Documentation](https://www.php.net/manual/en/control-structures.for.php)

This tutorial covered PHP for loops with practical examples showing basic
usage, control flow, and various iteration patterns.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007.
To date, I have authored over 1,400 articles and 8 e-books. I possess more
than ten years of experience in teaching programming.

List [all PHP tutorials](/php/).